import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  date,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const productCategoryEnum = pgEnum("product_category", [
  "vitamins_supplements",
  "skincare",
  "fragrances",
]);

export const integrationTypeEnum = pgEnum("integration_type", ["shopify", "website"]);

export const eventTypeEnum = pgEnum("event_type", [
  "widget_opened",
  "question_answered",
  "buy_now",
  "buy_pack",
  "start_over",
  "product_displayed",
]);

export const retailers = pgTable("retailers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  contactPerson: text("contact_person"),
  phone: text("phone"),
  address: text("address"),
  googleAnalyticsConnected: boolean("google_analytics_connected").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// One row per Clerk user, always exactly one retailer (Phase 1: no multi-staff invite UI,
// but the FK shape costs nothing extra and doesn't need revisiting later).
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserId: text("clerk_user_id").notNull(),
    retailerId: uuid("retailer_id")
      .notNull()
      .references(() => retailers.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("users_clerk_user_id_idx").on(t.clerkUserId),
    index("users_retailer_id_idx").on(t.retailerId),
  ],
);

export const campaigns = pgTable(
  "campaigns",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    retailerId: uuid("retailer_id")
      .notNull()
      .references(() => retailers.id, { onDelete: "cascade" }),
    publicKey: text("public_key").notNull(),
    name: text("name").notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    categories: productCategoryEnum("categories").array().notNull(),
    // One number applied uniformly across every category the campaign covers (matches the
    // single "Max SKUs per category" field seen in the reference app, not a per-category cap).
    maxSkusPerCategory: integer("max_skus_per_category").notNull(),
    // Fee the SUPPLIER pays the retailer, per SKU, to occupy one of the campaign's slots.
    costPerSkuCents: integer("cost_per_sku_cents").notNull(),
    integrationType: integrationTypeEnum("integration_type").notNull().default("website"),
    integrationUrl: text("integration_url"),
    // Active/Upcoming/Completed are DERIVED from isDraft + dates + now(), not stored here.
    isDraft: boolean("is_draft").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("campaigns_public_key_idx").on(t.publicKey),
    index("campaigns_retailer_id_idx").on(t.retailerId),
  ],
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    category: productCategoryEnum("category").notNull(),
    name: text("name").notNull(),
    skuCode: text("sku_code").notNull(),
    brand: text("brand"),
    // Category-specific answers, validated against lib/taxonomy.ts's question list for this
    // product's category (app-layer, not a DB constraint). For vitamins_supplements:
    // { health_need: "bone_joints_muscles", ingredients: ["calcium", "collagen"], delivery_format: "tablet" }.
    // Empty/unconstrained for skincare/fragrances until their taxonomies are designed.
    attributes: jsonb("attributes").notNull().default({}),
    rrpCents: integer("rrp_cents").notNull(),
    wholesaleCents: integer("wholesale_cents").notNull(),
    promotionalRebateCents: integer("promotional_rebate_cents").notNull().default(0),
    productBiasPercent: numeric("product_bias_percent", { precision: 5, scale: 2 }).default("0"),
    // Product Margin = RRP - Wholesale + Promotional Rebate, confirmed formula, drives ranking.
    marginCents: integer("margin_cents").generatedAlwaysAs(
      sql`(rrp_cents - wholesale_cents + promotional_rebate_cents)`,
    ),
    buyNowUrl: text("buy_now_url").notNull(),
    aisleBayLocation: text("aisle_bay_location"),
    imageUrl: text("image_url"), // Phase 2 (Vercel Blob)
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("products_campaign_id_idx").on(t.campaignId),
    index("products_margin_idx").on(t.marginCents),
  ],
);

// One flat table, not five — matches the repo's existing simplicity bar.
export const widgetEvents = pgTable(
  "widget_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    eventType: eventTypeEnum("event_type").notNull(),
    // Only for question_answered — a taxonomy question id (e.g. "health_need"), category-specific,
    // not a fixed numeric index.
    questionId: text("question_id"),
    answerValue: text("answer_value"), // only for question_answered
    productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("widget_events_campaign_id_type_idx").on(t.campaignId, t.eventType, t.createdAt),
    index("widget_events_product_id_idx").on(t.productId),
  ],
);

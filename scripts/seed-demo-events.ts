// Generates a plausible event stream against a seeded demo campaign so the retailer
// dashboard/stats views have something to show before a real widget exists.
//
// Run with: npx dotenv -e .env.local -- npx tsx scripts/seed-demo-events.ts

import { eq } from "drizzle-orm";
import { getDb } from "../lib/db/client";
import { retailers, campaigns, products, widgetEvents } from "../lib/db/schema";
import { nanoid } from "nanoid";

const DEMO_RETAILER_NAME = "Demo Retailer";
const DEMO_CAMPAIGN_NAME = "Seed Demo Campaign";

const HEALTH_NEEDS = [
  "bone_joints_muscles",
  "brain_mind",
  "cold_flu_immunity",
  "digestive_health",
  "general_health_wellbeing",
];
const INGREDIENTS = ["calcium", "vitamin_d3", "magnesium", "collagen", "glucosamine_chondroitin"];
const DELIVERY_FORMATS = ["capsule", "tablet", "powder", "liquid", "gummi", "cream"];

const DEMO_PRODUCTS = [
  { name: "Blackmores Special Tablet", rrp: 2000, wholesale: 1500, rebate: 0, location: "Aisle 4, Bay 10" },
  { name: "Swisse BCDS", rrp: 3000, wholesale: 2200, rebate: 0, location: "Aisle 4, Bay 12" },
  { name: "Wagner Special Tablet", rrp: 3100, wholesale: 2100, rebate: 1000, location: "Aisle 5, Bay 1" },
  { name: "Wagner Special Tablet", rrp: 3900, wholesale: 2400, rebate: 0, location: "Aisle 4, Bay 13" },
  { name: "Cenovis Special Tablet", rrp: 4200, wholesale: 2000, rebate: 2000, location: "Aisle 4, Bay 14" },
];

function randomPast(daysAgoMax: number): Date {
  const now = Date.now();
  const past = now - Math.random() * daysAgoMax * 24 * 60 * 60 * 1000;
  return new Date(past);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  const db = getDb();

  let [retailer] = await db.select().from(retailers).where(eq(retailers.name, DEMO_RETAILER_NAME)).limit(1);
  if (!retailer) {
    [retailer] = await db.insert(retailers).values({ name: DEMO_RETAILER_NAME }).returning();
  }

  let [campaign] = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.name, DEMO_CAMPAIGN_NAME))
    .limit(1);

  if (!campaign) {
    [campaign] = await db
      .insert(campaigns)
      .values({
        retailerId: retailer.id,
        publicKey: nanoid(12),
        name: DEMO_CAMPAIGN_NAME,
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        categories: ["vitamins_supplements"],
        maxSkusPerCategory: 10,
        costPerSkuCents: 2900,
        integrationType: "shopify",
        isDraft: false,
      })
      .returning();
  }

  const existingProducts = await db.select().from(products).where(eq(products.campaignId, campaign.id));
  let seededProducts = existingProducts;

  if (seededProducts.length === 0) {
    seededProducts = await db
      .insert(products)
      .values(
        DEMO_PRODUCTS.map((p) => ({
          campaignId: campaign.id,
          category: "vitamins_supplements" as const,
          name: p.name,
          skuCode: nanoid(8),
          brand: p.name.split(" ")[0],
          attributes: {
            health_need: "bone_joints_muscles",
            ingredients: ["calcium"],
            delivery_format: "tablet",
          },
          rrpCents: p.rrp,
          wholesaleCents: p.wholesale,
          promotionalRebateCents: p.rebate,
          buyNowUrl: "https://example.com/product",
          aisleBayLocation: p.location,
        })),
      )
      .returning();
  }

  const SESSION_COUNT = 60;
  const events: (typeof widgetEvents.$inferInsert)[] = [];

  for (let i = 0; i < SESSION_COUNT; i++) {
    const sessionTime = randomPast(30);
    const advance = (ms: number) => new Date(sessionTime.getTime() + ms);

    events.push({ campaignId: campaign.id, eventType: "widget_opened", createdAt: sessionTime });
    events.push({
      campaignId: campaign.id,
      eventType: "question_answered",
      questionId: "category",
      answerValue: "vitamins_supplements",
      createdAt: advance(1000),
    });
    events.push({
      campaignId: campaign.id,
      eventType: "question_answered",
      questionId: "health_need",
      answerValue: pick(HEALTH_NEEDS),
      createdAt: advance(2000),
    });
    events.push({
      campaignId: campaign.id,
      eventType: "question_answered",
      questionId: "ingredients",
      answerValue: pick(INGREDIENTS),
      createdAt: advance(3000),
    });
    events.push({
      campaignId: campaign.id,
      eventType: "question_answered",
      questionId: "delivery_format",
      answerValue: pick(DELIVERY_FORMATS),
      createdAt: advance(4000),
    });

    const shown = [...seededProducts].sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 3));
    shown.forEach((product, idx) => {
      events.push({
        campaignId: campaign.id,
        eventType: "product_displayed",
        productId: product.id,
        createdAt: advance(5000 + idx * 100),
      });
    });

    const roll = Math.random();
    if (roll < 0.35) {
      events.push({
        campaignId: campaign.id,
        eventType: "buy_now",
        productId: pick(shown).id,
        createdAt: advance(8000),
      });
    } else if (roll < 0.45) {
      shown.slice(0, 2).forEach((product, idx) => {
        events.push({
          campaignId: campaign.id,
          eventType: "buy_pack",
          productId: product.id,
          createdAt: advance(8000 + idx * 100),
        });
      });
    } else if (roll < 0.5) {
      events.push({ campaignId: campaign.id, eventType: "start_over", createdAt: advance(6000) });
    }
  }

  await db.insert(widgetEvents).values(events);

  console.log(`Seeded ${seededProducts.length} products and ${events.length} events for "${campaign.name}".`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

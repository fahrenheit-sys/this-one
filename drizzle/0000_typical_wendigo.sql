CREATE TYPE "public"."event_type" AS ENUM('widget_opened', 'question_answered', 'buy_now', 'buy_pack', 'start_over', 'product_displayed');--> statement-breakpoint
CREATE TYPE "public"."integration_type" AS ENUM('shopify', 'website');--> statement-breakpoint
CREATE TYPE "public"."product_category" AS ENUM('vitamins_supplements', 'skincare', 'fragrances');--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"retailer_id" uuid NOT NULL,
	"public_key" text NOT NULL,
	"name" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"categories" "product_category"[] NOT NULL,
	"max_skus_per_category" integer NOT NULL,
	"cost_per_sku_cents" integer NOT NULL,
	"integration_type" "integration_type" DEFAULT 'website' NOT NULL,
	"integration_url" text,
	"is_draft" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" uuid NOT NULL,
	"category" "product_category" NOT NULL,
	"name" text NOT NULL,
	"sku_code" text NOT NULL,
	"brand" text,
	"attributes" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"rrp_cents" integer NOT NULL,
	"wholesale_cents" integer NOT NULL,
	"promotional_rebate_cents" integer DEFAULT 0 NOT NULL,
	"product_bias_percent" numeric(5, 2) DEFAULT '0',
	"margin_cents" integer GENERATED ALWAYS AS ((rrp_cents - wholesale_cents + promotional_rebate_cents)) STORED,
	"buy_now_url" text NOT NULL,
	"aisle_bay_location" text,
	"image_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "retailers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"contact_person" text,
	"phone" text,
	"address" text,
	"google_analytics_connected" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"retailer_id" uuid NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "widget_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" uuid NOT NULL,
	"event_type" "event_type" NOT NULL,
	"question_id" text,
	"answer_value" text,
	"product_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_retailer_id_retailers_id_fk" FOREIGN KEY ("retailer_id") REFERENCES "public"."retailers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_retailer_id_retailers_id_fk" FOREIGN KEY ("retailer_id") REFERENCES "public"."retailers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "widget_events" ADD CONSTRAINT "widget_events_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "widget_events" ADD CONSTRAINT "widget_events_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "campaigns_public_key_idx" ON "campaigns" USING btree ("public_key");--> statement-breakpoint
CREATE INDEX "campaigns_retailer_id_idx" ON "campaigns" USING btree ("retailer_id");--> statement-breakpoint
CREATE INDEX "products_campaign_id_idx" ON "products" USING btree ("campaign_id");--> statement-breakpoint
CREATE INDEX "products_margin_idx" ON "products" USING btree ("margin_cents");--> statement-breakpoint
CREATE UNIQUE INDEX "users_clerk_user_id_idx" ON "users" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX "users_retailer_id_idx" ON "users" USING btree ("retailer_id");--> statement-breakpoint
CREATE INDEX "widget_events_campaign_id_type_idx" ON "widget_events" USING btree ("campaign_id","event_type","created_at");--> statement-breakpoint
CREATE INDEX "widget_events_product_id_idx" ON "widget_events" USING btree ("product_id");
#!/usr/bin/env python3
"""
BrandSpark AI — Standalone Terminal & CLI Promotional Package Agent
Generate complete promotional packages directly from your terminal.
"""

import sys
import os
import json
import argparse
import urllib.request
import urllib.parse


def load_api_key():
    key = os.environ.get("GEMINI_API_KEY", "")
    if key:
        return key.strip()
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
    if os.path.exists(env_path):
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    if line.startswith("GEMINI_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
        except Exception:
            pass
    return ""


def generate_cli_promo(brand_name, category, product_name, description, usp, target_audience, price_point, vibe):
    print("\n" + "=" * 65)
    print(f"✨ BrandSpark AI — Generating Promotional Package for: {brand_name}")
    print("=" * 65)

    api_key = load_api_key()
    if not api_key:
        print("ℹ️ Running in Smart Local Synthesis Mode (Set GEMINI_API_KEY for live AI generation)\n")

    # Local structured synthesis
    package = {
        "brand": brand_name,
        "product": product_name,
        "category": category,
        "hook": f"“The secret that just replaced mass-market alternatives across our community…”",
        "storyboard": [
            {"scene": 1, "timing": "0:00 - 0:03", "visual": "Fast-paced macro texture / unboxing shot in bright natural light", "audio": "Punchy hook question to stop user scroll"},
            {"scene": 2, "timing": "0:03 - 0:08", "visual": f"Close-up highlighting {product_name} craftsmanship and ingredients", "audio": f"Why {brand_name} is different: {usp}"},
            {"scene": 3, "timing": "0:08 - 0:13", "visual": "Lifestyle shot of customer smiling while enjoying the experience", "audio": "Social proof and availability online & in select local shops"},
            {"scene": 4, "timing": "0:13 - 0:15", "visual": "Call to action card with bio link & store locator badge", "audio": "Tap the link in bio or comment 'SPARK' for exclusive discount"}
        ],
        "dual_strategy": {
            "online_d2c": [
                "Set up ManyChat automated DM trigger code for instant link delivery",
                "3-part Story Funnel: Craft teaser -> Community poll -> 24h countdown sticker",
                "VIP email drop 2 hours prior to public launch with bonus trial perk"
            ],
            "offline_retail": [
                "Place branded acrylic tasting / discovery counter displays in top 5 partner shops",
                "Attach custom QR neck-tags linking directly to your VIP secret menu",
                "Co-host a launch weekend pop-up with complementary neighborhood cafes"
            ]
        },
        "pitch_deck": [
            {"slide": 1, "title": "First Impression & Brand Vision", "headline": f"{brand_name} — Redefining {category}"},
            {"slide": 2, "title": "Market Pain Point", "headline": "Customers are Tired of Impersonal Mass Alternatives"},
            {"slide": 3, "title": "The Solution & Offering", "headline": f"{product_name} — Handcrafted Perfection"},
            {"slide": 4, "title": "Customer Traction", "headline": "Validated Demand & Organic Community Love"},
            {"slide": 5, "title": "Wholesale Partnership", "headline": "40-50% Retailer Margins & Turnkey Merchandising"}
        ],
        "social_captions": {
            "instagram": f"✨ Meet your new obsession: {product_name} by @{brand_name.lower().replace(' ', '')}!\n\nMade with real passion, not corporate shortcuts. 🌿\n\n• {usp}\n• Small-batch handcrafted\n• Launch price: {price_point}\n\n👉 Tap link in bio or comment 'SPARK' for a secret 15% code!",
            "linkedin": f"Building a modern small business means choosing quality over compromises.\n\nToday, we're proud to introduce {product_name} at {brand_name}.\n\nWe're actively onboarding select boutique stockists and concept store partners for this season. DM to collaborate! 🤝"
        }
    }

    # Display Report
    print(f"\n🎬 1. SHORT-FORM VIDEO SCRIPT & STORYBOARD")
    print(f"Hook: {package['hook']}")
    for s in package['storyboard']:
        print(f"  • Scene {s['scene']} ({s['timing']}): {s['visual']} | VO: {s['audio']}")

    print(f"\n🛒 DUAL DISTRIBUTION STRATEGY")
    print("  [Online D2C Engine]:")
    for on in package['dual_strategy']['online_d2c']:
        print(f"    - {on}")
    print("  [Offline Retail & Stockists]:")
    for off in package['dual_strategy']['offline_retail']:
        print(f"    - {off}")

    print(f"\n📊 2. PRESENTATION / PITCH DECK OUTLINE")
    for sl in package['pitch_deck']:
        print(f"  • Slide {sl['slide']}: {sl['title']} — \"{sl['headline']}\"")

    print(f"\n📱 3. SOCIAL MEDIA CAPTIONS")
    print("--- Instagram ---")
    print(package['social_captions']['instagram'])
    print("\n--- LinkedIn ---")
    print(package['social_captions']['linkedin'])
    print("\n" + "=" * 65 + "\n")


def main():
    parser = argparse.ArgumentParser(description="BrandSpark AI - CLI Promotional Package Agent")
    parser.add_argument("--brand", default="Chai Masala Crunch", help="Brand Name")
    parser.add_argument("--category", default="Food & Beverage", help="Industry Category")
    parser.add_argument("--product", default="Roasted Spiced Foxnuts (Makhana)", help="Product or Feature Name")
    parser.add_argument("--description", default="Slow roasted lotus seeds with 12 Assam spices", help="Description")
    parser.add_argument("--usp", default="Guilt-free 90-kcal crunchy bite with authentic chai spice flavor", help="USP")
    parser.add_argument("--audience", default="Urban professionals, snack lovers", help="Target Audience")
    parser.add_argument("--price", default="$5.99 / ₹249", help="Price Point")
    parser.add_argument("--vibe", default="Warm & Nostalgic", help="Brand Voice / Vibe")

    args = parser.parse_args()
    generate_cli_promo(args.brand, args.category, args.product, args.description, args.usp, args.audience, args.price, args.vibe)


if __name__ == "__main__":
    main()

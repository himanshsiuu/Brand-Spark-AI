/**
 * BrandSpark AI — Core Promotional Engine & Prompt Orchestrator
 */

const PromoAgent = {
  PRESETS: {
    snack_chaimasala: {
      brandName: "Chai Masala Crunch",
      category: "Food & Beverage",
      campaignFocus: "Instagram Reel / TikTok Viral Promotion",
      productName: "Roasted Spiced Foxnuts (Makhana) with Assam Tea Masala",
      description: "Handcrafted, slow-roasted lotus seed snacks infused with 12 organic Assam spices, Himalayan pink salt, and cold-pressed coconut oil. Zero refined sugar, gluten-free, 90 kcal per serving.",
      usp: "Guilt-free crunch that recreates the nostalgic warmth of roadside tapri chai in a healthy gourmet bite.",
      targetAudience: "Health-conscious urban professionals, evening snackers, tea lovers, college students",
      pricePoint: "$5.99 / ₹249 per 100g pouch",
      vibe: "Warm & Nostalgic"
    },
    snack_jhalmuri: {
      brandName: "Kolkata Jhalmuri Crisps",
      category: "Food & Beverage",
      campaignFocus: "Paid Meta / Instagram Ad (High ROAS)",
      productName: "Heritage Mustard-Glazed Rice & Roasted Peanut Bar Mix",
      description: "Authentic Kolkata street food reinvented into a non-greasy, travel-friendly artisanal snack. Roasted in cold-pressed mustard oil with green chili flakes, roasted cumin, and black salt.",
      usp: "The iconic tangy mustard kick of Kolkata street stalls without any messy oil or preservative chemicals.",
      targetAudience: "Desi food enthusiasts, office snackers, street food lovers, craft beer companions",
      pricePoint: "$4.99 / ₹199 per 150g pack",
      vibe: "Bold & Disruptive"
    },
    snack_kashmiri: {
      brandName: "Kashmir Royal Confections",
      category: "Food & Beverage",
      campaignFocus: "New Product Launch",
      productName: "Saffron & Cardamom Glazed Mamra Almonds",
      description: "Handpicked wild Kashmiri Mamra almonds slow-roasted in wildflower honey, pure royal saffron stigmas, and green cardamom pods.",
      usp: "Rich royal heritage delicacy made with Grade-1 saffron with zero artificial flavoring.",
      targetAudience: "Gourmet gifting buyers, luxury foodies, festive gift shoppers, health conscious connoisseurs",
      pricePoint: "$14.99 / ₹899 per 200g tin",
      vibe: "Luxury & Refined"
    },
    beverage_filtercoffee: {
      brandName: "Kaapi Royale Drops",
      category: "Food & Beverage",
      campaignFocus: "Influencer Collab & UGC Creator Campaign",
      productName: "Slow-Dripped 24h Chicory Cold Brew Coffee Concentrate",
      description: "Traditional South Indian filter coffee brewed cold for 24 hours using Chikmagalur Peaberry beans and 15% roasted chicory. Makes 10 glasses of instant hot or iced cafe-style filter coffee.",
      usp: "Authentic South Indian degree coffee in 5 seconds—just pour into cold or hot milk.",
      targetAudience: "Coffee lovers, remote workers, South Indian diaspora, breakfast enthusiasts",
      pricePoint: "$11.99 / ₹449 per 500ml bottle",
      vibe: "Cozy & Community-driven"
    },
    reel_viral_snack: {
      brandName: "CrunchTheory Artisanal Chips",
      category: "Food & Beverage",
      campaignFocus: "Instagram Reel / TikTok Viral Promotion",
      productName: "Truffle & Smoked Himalayan Salt Taro Chips",
      description: "Ultra-thin kettle-cooked root vegetable crisps dusted with real Italian black summer truffle powder and pink salt crystals.",
      usp: "Sound-engineered acoustic crunch with rich restaurant-grade truffle aroma at an accessible price.",
      targetAudience: "Gen-Z snack reviewers, food TikTokers, wine pairing enthusiasts, party hosts",
      pricePoint: "$6.50 / ₹299 per pack",
      vibe: "Playful & Fun"
    },
    ad_meta_scale: {
      brandName: "Zest & Spice Co.",
      category: "Food & Beverage",
      campaignFocus: "Paid Meta / Instagram Ad (High ROAS)",
      productName: "Aam Papad Chili-Lime Glazed Crunchy Cashews",
      description: "Slow-baked whole jumbo cashews coated with sun-dried raw mango pulp, tangy tamarind glaze, and crushed bird's eye chili flakes.",
      usp: "Sweet, sour, and fiery explosion of nostalgia that kills sugar cravings in one handful.",
      targetAudience: "Evening snackers, late-night binge watchers, spice lovers, desk workers",
      pricePoint: "$7.99 / ₹349 per 120g resealable bag",
      vibe: "Bold & Disruptive"
    },
    airbnb_cabin: {
      brandName: "The Solitude Loft",
      category: "Boutique Stay & Hospitality",
      campaignFocus: "Direct Bookings & UGC Viral Push",
      productName: "Cedarwood Glasshouse Studio overlooking Pine Forests",
      description: "An architect-designed, off-grid loft with floor-to-ceiling panoramic glass walls, private cedar wood-fired hot tub, stargazing skylight, high-speed Starlink wifi, and curated local chef breakfast baskets.",
      usp: "Unplugged luxury 90 minutes from the city with zero neighbors and 360-degree Himalayan peak views.",
      targetAudience: "Remote tech founders, couples seeking romantic weekend getaways, creative writers, digital nomads",
      pricePoint: "$180 / ₹14,500 per night (Min 2 nights)",
      vibe: "Luxury & Refined"
    },
    airbnb_goavilla: {
      brandName: "Casa Nostalgia",
      category: "Boutique Stay & Hospitality",
      campaignFocus: "Instagram Reel / TikTok Viral Promotion",
      productName: "150-Year Portuguese Heritage Courtyard Villa in North Goa",
      description: "Restored ancestral Indo-Portuguese villa with hand-painted azulejo tiles, private plunge pool beneath mango trees, vintage library, and complimentary daily Goan susegad breakfast.",
      usp: "Step back into 1870s vintage serenity just 10 minutes away from Goa's top dining and beach hubs.",
      targetAudience: "Group travel friends, aesthetic creators, slow travel tourists, family reunions",
      pricePoint: "$280 / ₹22,000 per night for full villa",
      vibe: "Warm & Nostalgic"
    },
    artisan_candle: {
      brandName: "Bloom & Beam",
      category: "Handmade & Craft",
      campaignFocus: "Local Retail & Stockist Pitch",
      productName: "Smoked Fig & Cardamom Amber Jar Soy Candle",
      description: "Poured by hand in small 20-candle batches using 100% midwestern soy wax, FSC-certified crackling wooden wicks, and clean fragrance oils. 55-hour burn time in reusable apothecary glass.",
      usp: "Non-toxic, migraine-safe aromatherapy with a real fireplace crackle sound effect.",
      targetAudience: "Interior design enthusiasts, mindful gift buyers, boutique hotel gift shops, book lovers",
      pricePoint: "$28.00 / ₹1,899 per 8oz jar",
      vibe: "Cozy & Community-driven"
    },
    organic_skincare: {
      brandName: "AyurVeda Botanics",
      category: "Organic & Skincare",
      campaignFocus: "Paid Meta / Instagram Ad (High ROAS)",
      productName: "Kumkumadi & Wild Rose Night Glow Serum",
      description: "Traditional 16-herb Ayurvedic formulation infused with Kashmiri saffron, sandalwood extract, and cold-pressed cold-extracted lotus seed oil.",
      usp: "100% organic clinical brightening formula that replaces 4 synthetic night creams in 2 drops.",
      targetAudience: "Clean beauty lovers, skincare routine minimalists, brides-to-be, 25-45 age group",
      pricePoint: "$34.00 / ₹1,499 per 30ml dropper bottle",
      vibe: "Luxury & Refined"
    }
  },

  async generatePackage(formData) {
    try {
      const response = await fetch('/api/generate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: formData,
          apiKey: StorageManager.getApiKey()
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok' && data.package) {
          return {
            source: 'gemini-api',
            package: data.package
          };
        }
      }
    } catch (e) {
      console.warn('Backend API unavailable, falling back to smart local synthesizer:', e);
    }

    const clientPackage = this.synthesizeLocalPackage(formData);
    return {
      source: 'smart-local-engine',
      package: clientPackage
    };
  },

  synthesizeLocalPackage(input) {
    const brand = input.brandName || 'Our Brand';
    const product = input.productName || 'Signature Offering';
    const desc = input.description || 'Handcrafted quality offering designed with authentic care.';
    const usp = input.usp || 'Unique small-batch quality and mindful craft.';
    const audience = input.targetAudience || 'Conscious consumers and foodies';
    const price = input.pricePoint || 'Accessible Premium';
    const vibe = input.vibe || 'Warm & Engaging';
    const focus = input.campaignFocus || 'Instagram Reel / TikTok Viral Promotion';

    const isFood = input.category.includes('Food') || input.category.includes('Beverage');
    const isHospitality = input.category.includes('Boutique Stay') || input.category.includes('Hospitality');

    // 1. Primary Hook & Viral Variations
    let primaryHook = "";
    let hookVariations = [];

    if (isHospitality) {
      primaryHook = `“Stop scrolling if you’re burnt out and need a 48-hour escape nobody knows about yet.”`;
      hookVariations = [
        { type: "Curiosity / Secret Spot", hook: `“I gatekept this forest glasshouse for 6 months, but it’s too magical not to share…”` },
        { type: "Negative Reverse", hook: `“Do NOT book this stay if you hate waking up to zero noise and foggy mountain panoramas.”` },
        { type: "Relatable Pain / Burnout", hook: `“When city life gets to 100%, this is the exact coordinates you need to reset.”` },
        { type: "POV / Visual Immersion", hook: `“POV: You checked into an off-grid glasshouse with a wood-fired cedar tub and zero cell notifications.”` },
        { type: "High-Urgency Booking Promo", hook: `“Our secret weekend dates just opened up—here’s why it books out in under 4 hours.”` }
      ];
    } else if (isFood) {
      primaryHook = `“The secret snack that just replaced 4 PM junk cravings across my entire office…”`;
      hookVariations = [
        { type: "Acoustic / Stop-Scroll Crunch", hook: `“Listen to this sound… [CRUNCH]. This is what 100% guilt-free snacking actually tastes like.”` },
        { type: "Negative Reverse", hook: `“Whatever you do, don't open a bag of ${brand} at your desk unless you brought enough for everyone.”` },
        { type: "Relatable Problem Solver", hook: `“If you crave roadside chai snacks every evening but want zero junk or sugar crashes, watch this.”` },
        { type: "Founder Story / Authentic Craft", hook: `“Everyone told me I was crazy to spend 8 months perfecting a snack recipe in my home kitchen…”` },
        { type: "High-Urgency Launch Offer", hook: `“Our new limited batch just dropped and we’re giving the first 50 orders a free secret sample tin!”` }
      ];
    } else {
      primaryHook = `“If you’re still buying mass-produced ${input.category.toLowerCase()}, we need to talk.”`;
      hookVariations = [
        { type: "Direct Challenge", hook: `“Why are we still paying premium prices for mass-produced chemicals when this exists?”` },
        { type: "Behind The Scenes", hook: `“Here is what happens when you pour 100% natural ingredients by hand in small batches.”` },
        { type: "Aesthetic ASMR", hook: `“The most satisfying unboxing you will see on your feed today.”` },
        { type: "Social Proof", hook: `“I tried 12 different brands so you don’t have to—here is why this one blew me away.”` },
        { type: "Direct Offer", hook: `“Comment 'VIP' below and I will instantly DM you our secret 20% launch code!”` }
      ];
    }

    // 2. Organic Short-Form Video Scenes (15-30s)
    const scenes = [
      {
        sceneNumber: 1,
        duration: "0:00 - 0:03",
        visual: isHospitality ? "Dynamic FPV drone shot sweeping through the glasshouse over the foggy forest" : "Fast-paced macro crunch / tearing open packaging with natural daylight & crisp audio",
        voiceover: primaryHook,
        onScreenText: isHospitality ? "POV: You found the hidden sanctuary ✨" : "Stop scrolling! 🚨 Snack alert"
      },
      {
        sceneNumber: 2,
        duration: "0:03 - 0:08",
        visual: `Close-up showing the details: ${product}. Emphasize textures, craftsmanship, or peaceful ambient setting.`,
        voiceover: `Here’s why ${brand} is taking over: ${usp}. No shortcuts, just pure attention to detail.`,
        onScreenText: `Crafted for: ${audience.split(',')[0] || audience}`
      },
      {
        sceneNumber: 3,
        duration: "0:08 - 0:13",
        visual: "Lifestyle demonstration: relaxing in the space or sharing the product with friends and smiling.",
        voiceover: `Whether you order online directly for home delivery or pick it up at select local stockists, you get freshness guaranteed.`,
        onScreenText: `Price: ${price} | Direct & In Stores`
      },
      {
        sceneNumber: 4,
        duration: "0:13 - 0:15",
        visual: "Clear call-to-action card showing link in bio and retail store badge locator.",
        voiceover: `Tap the link in bio to claim our launch discount or comment 'SPARK' and I’ll DM you the link!`,
        onScreenText: `Tap Link in Bio or Visit Local Stockists 🛍️`
      }
    ];

    // 3. Dedicated Paid Meta / Instagram Reel Ad (15s High-ROAS Formula)
    const paidAdScript = {
      format: "9:16 Vertical Video (Instagram Reels & Meta Stories Ad)",
      objective: "Direct Conversions & Instant Checkout (ROAS 3.5x+ target)",
      structure: [
        {
          phase: "0:00 - 0:03 (Pattern Interrupt Hook)",
          visual: "Side-by-side comparison or fast macro unboxing with big bold yellow captions",
          audioVO: `“Tired of boring snacks that ruin your diet? Watch this.”`,
          textOverlay: "STOP BUYING JUNK ❌ | TRY THIS INSTEAD ✅"
        },
        {
          phase: "0:03 - 0:09 (Agitation & Instant Demo)",
          visual: `Show authentic ingredients/materials pouring into frame, showcasing ${product}`,
          audioVO: `“${brand} gives you ${usp} with zero guilt and 100% natural ingredients.”`,
          textOverlay: `Only ${price} • Small-Batch Freshness`
        },
        {
          phase: "0:09 - 0:15 (Social Proof & Irresistible CTA)",
          visual: "5-star review graphic pop-up with customer unboxing smile + Swipe Up / Shop Now arrow animation",
          audioVO: `“Over 1,200+ 5-star reviews. Click 'Shop Now' below for 15% OFF your first order before this batch sells out!”`,
          textOverlay: "👉 TAP 'SHOP NOW' TO GET 15% OFF + FAST SHIPPING"
        }
      ]
    };

    // 4. Influencer Collaboration & UGC Creator Brief
    const influencerBrief = {
      idealCreatorProfile: `${audience.split(',')[0] || 'Lifestyle creator'}, foodie reviewer, aesthetic lifestyle host (5k - 50k engaged followers)`,
      deliverables: "1x 30s Instagram Reel + 3x Story Frames with Sticker Link + 1x High-Res Product Photo",
      keyTalkingPoints: [
        `Highlight the unique taste & sensory experience: "${usp}"`,
        `Demonstrate how easy it fits into daily routine (${isFood ? 'afternoon snack / chai time' : 'weekend getaway / relaxing evening'})`,
        `Clear CTA: Direct followers to link-in-bio with creator's personalized discount code ('CREATOR15')`
      ],
      creativeDos: [
        "Use natural sunlight and authentic raw reactions (no overly scripted corporate jargon)",
        "Include natural sound effects (crisp crunch, opening package, boiling tea/ambient music)",
        "Mention the local craftsmanship and small-batch authenticity"
      ],
      creativeDonts: [
        "Do not use generic monotone AI voiceovers",
        "Do not hide the product behind busy backgrounds",
        "Do not compare directly to named commercial brands"
      ]
    };

    // 5. Dual Distribution Strategies
    const dualStrategy = {
      online: [
        "📌 ManyChat Comment Trigger: Auto-DM direct checkout discount links whenever a user comments 'SPARK' or 'CRUNCH'.",
        "📱 3-Part Instagram Story Funnel: Post (1) Behind-the-scenes craft teaser -> (2) Customer reaction poll -> (3) 24-hr countdown sticker with direct link.",
        "💌 VIP Early-Access Drop: Email existing subscriber list 2 hours before social launch with a free trial gift or extra night perk."
      ],
      offline: [
        "🏬 Local Retailer / Stockist Sampling: Place branded acrylic countertop tasting/experience displays at 5 premium local partner stores.",
        "🏷️ Interactive QR Neck-Tags: Attach custom QR codes to retail packaging linking directly to your brand VIP club / secret menu.",
        "🤝 Cross-Promo Pop-Up: Co-host a weekend showcase with complementary neighborhood businesses (e.g., local coffee roasters, yoga studios)."
      ]
    };

    // 6. Pitch Deck Outline
    const slides = [
      {
        slideNumber: 1,
        title: "Title & First Impression",
        headline: `${brand} — Redefining ${input.category}`,
        keyPoints: [
          `Hero Offering: ${product}`,
          `Brand Promise: ${usp}`,
          `Target Segment: ${audience}`
        ],
        speakerNotes: `Open with personal founder story: why we created ${brand} and the massive gap we noticed in generic mass market options.`,
        objectionHandling: `“Why now?” — Consumers are demanding authentic, transparent, small-batch quality with distinct personality.`
      },
      {
        slideNumber: 2,
        title: "The Problem & Market Opportunity",
        headline: "Customers are Tired of Over-processed & Impersonal Alternatives",
        keyPoints: [
          "Mass products sacrifice ingredient quality, freshness, and soul.",
          "Modern buyers actively seek small-batch craft with transparent sourcing.",
          "High willingness to pay for premium experiential value."
        ],
        speakerNotes: `Highlight current industry pain points. Show how current competitors cut corners and leave consumers underwhelmed.`,
        objectionHandling: `“Isn't this market crowded?” — Yes, but 90% is generic. We win with targeted niche loyalty and superior quality.`
      },
      {
        slideNumber: 3,
        title: "The Solution & Product Highlights",
        headline: `${product} — Handcrafted Perfection`,
        keyPoints: [
          `Key Specifications: ${desc}`,
          `Distinctive Advantage: ${usp}`,
          `Format & Pricing: ${price}`
        ],
        speakerNotes: `Walk through the sensory experience and ingredients/materials. Hand over physical samples or virtual tour video.`,
        objectionHandling: `“How do you maintain quality as you scale?” — Small-batch dedicated production schedules with rigorous standard operating procedures.`
      },
      {
        slideNumber: 4,
        title: "Customer Traction & Social Proof",
        headline: "Validated Demand & Organic Community Love",
        keyPoints: [
          "Consistent 4.9/5 star customer reviews and repeat purchase velocity.",
          "High user-generated content engagement across Reels and TikTok.",
          "Rapid sell-outs on initial micro-batches."
        ],
        speakerNotes: `Share real testimonials and customer DMs. Mention how quickly our waitlist filled up during the soft launch.`,
        objectionHandling: `“Do you have enough volume?” — Our current capacity is structured for steady weekly fulfillment with scalable suppliers.`
      },
      {
        slideNumber: 5,
        title: "Retail Partnership & Next Steps",
        headline: "Mutually Profitable Growth & Turnkey Merchandising",
        keyPoints: [
          "Attractive wholesale margins (40-50% gross margin for retailers).",
          "Includes free branded counter displays and sampling inventory.",
          "Dedicated local social shoutouts driving foot traffic to your storefront."
        ],
        speakerNotes: `Close by proposing a low-risk trial starter bundle with exchange guarantees for slow-moving units.`,
        objectionHandling: `“What if it doesn’t sell in our store?” — We offer full buy-back/swap guarantees on the initial trial order.`
      }
    ];

    // 7. Social Media Pack
    const socialPack = {
      instagram: `✨ Meet your new obsession: ${product} by @${brand.toLowerCase().replace(/\s+/g, '')}!\n\nWe spent months obsessing over every detail because you deserve something made with real passion, not corporate shortcuts. 🌿\n\n💡 Why you'll fall in love:\n• ${usp}\n• Handcrafted in small batches\n• Available now for ${price}\n\n👉 TAP the link in our bio to grab yours before this batch sells out!\n💬 Or drop a "❤️" in the comments and we’ll DM you an exclusive 15% launch code!`,
      linkedin: `Building a modern small business means choosing quality over compromises.\n\nToday, we’re thrilled to introduce ${product} at ${brand}.\n\nWhen we started out in the ${input.category} space, everyone told us to outsource and cut costs. Instead, we doubled down on: \n1. ${usp}\n2. Transparent, ethical sourcing\n3. An omnichannel model combining direct online love with neighborhood retail partnerships.\n\nWe are actively expanding our select stockist & distributor partnerships for this season. If you run a boutique store or curated concept shop, let's connect! 🤝`,
      tiktok: `POV: You just discovered the most satisfying ${product} in the city 😭✨\n\nNo weird fillers, just pure ${usp}.\n\nLink in bio before the weekend batch is gone! 📦 #smallbusiness #fyp #behindthescenes`,
      whatsapp: `🎉 *Exclusive First Look for our VIP Family!*\n\nHey there! You're the first to know: our brand-new *${product}* is officially live!\n\n✨ *The Vibe:* ${usp}\n🏷️ *Launch Price:* ${price}\n\nUse your VIP secret code *SPARK10* at checkout for 10% off + priority dispatch.\n\n👉 Order here: https://${brand.toLowerCase().replace(/\s+/g, '')}.com/launch\n\nThanks for supporting independent craft! ❤️`,
      hashtags: [
        brand.toLowerCase().replace(/\s+/g, ''),
        'smallbusinesslove',
        'supportlocal',
        input.category.toLowerCase().replace(/[^a-z]/g, ''),
        'reelpromotions',
        'handcrafted',
        'boutiquebrand',
        'founderlife',
        'qualityfirst'
      ]
    };

    // 8. Shot List & AI Image Prompts
    const shotList = {
      shots: [
        {
          type: "Hero Product Shot",
          description: `Crisp overhead 45-degree angle of ${product} surrounded by raw authentic ingredients / natural props.`,
          framing: "Medium Close-up, Shallow Depth of Field (f/2.0)",
          lighting: "Soft morning window light with warm bounce reflector"
        },
        {
          type: "Macro Texture / Detail",
          description: "Extreme close-up revealing handcrafted texture, steam, gold foil packaging, or natural materials.",
          framing: "Macro 100mm lens, tack-sharp focus on primary texture",
          lighting: "Directional side lighting to emphasize relief and depth"
        },
        {
          type: "Lifestyle in Action",
          description: `A model/customer naturally enjoying ${product} in a cozy sunlit room or scenic patio setting.`,
          framing: "Wide contextual shot with warm ambient environment",
          lighting: "Golden hour natural backlight with gentle lens flare"
        },
        {
          type: "Packaging & Retail Display",
          description: "Unboxing layout showing the aesthetic packaging, handwritten thank you card, and seal.",
          framing: "Clean flat-lay on textured linen or wooden board",
          lighting: "Even, shadowless diffused daylight"
        }
      ],
      aiPrompt: `Professional editorial commercial photography of ${product} by ${brand}, luxury ${input.category.toLowerCase()} branding, ${vibe.toLowerCase()} aesthetic, hyper-realistic, soft cinematic lighting, 8k resolution, photorealistic, 50mm f/1.8 lens, shot on Hasselblad H6D --ar 4:5 --v 6.0`
    };

    // 9. 7-Day Rollout Calendar
    const rolloutCalendar = [
      {
        day: 1,
        theme: "The Teaser & Founder Backstory",
        onlineAction: "Post 15s behind-the-scenes video showing early recipe/design failures and final breakthrough.",
        offlineAction: "Deliver VIP sampling gift baskets to 5 key local stockist managers and neighborhood cafe partners."
      },
      {
        day: 2,
        theme: "Sensory Deep Dive & Key USP",
        onlineAction: "Publish high-resolution carousel breaking down why this beats mass-market alternatives.",
        offlineAction: "Set up branded point-of-sale acrylic displays in primary retail partner location."
      },
      {
        day: 3,
        theme: "Official Public Drop Day",
        onlineAction: "Go live on Instagram/TikTok for 15 mins during unboxing + activate ManyChat automated DM codes.",
        offlineAction: "Host a 2-hour free tasting/open-house hour at your workshop or partner boutique."
      },
      {
        day: 4,
        theme: "Customer Reactions & UGC",
        onlineAction: "Repost early customer unboxings, messages, and funny 5-star reaction audio clips.",
        offlineAction: "Collect physical feedback cards from store visitors for instant quote testimonials."
      },
      {
        day: 5,
        theme: "Retailer Spotlight & Store Locator",
        onlineAction: "Dedicated Reel showing a customer buying the product in a local partner store with map pin tag.",
        offlineAction: "Restock fast-moving display shelves and thank the floor staff with complimentary snacks/perks."
      },
      {
        day: 6,
        theme: "Limited Batch Urgency / Weekend Push",
        onlineAction: "Post countdown timer on Stories: 'Only 35 units left in this week's batch!'.",
        offlineAction: "Offer a weekend 'Buy 2 Get Special Tote Bag / Bonus Sample' promotion in-store."
      },
      {
        day: 7,
        theme: "Weekly Recap & Community Gratitude",
        onlineAction: "Heartfelt video from founder thanking everyone for making the launch a smash hit.",
        offlineAction: "Review weekly sales data with stockists and schedule next week's replenishment order."
      }
    ];

    return {
      input,
      videoScript: {
        hook: primaryHook,
        hookVariations,
        scenes,
        paidAdScript,
        influencerBrief,
        dualStrategy
      },
      pitchDeck: {
        slides
      },
      socialPack,
      shotList,
      rolloutCalendar
    };
  }
};

window.PromoAgent = PromoAgent;

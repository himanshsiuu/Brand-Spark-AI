# ✨ BrandSpark AI — Small Business Promotional Content Scaling Agent

> **Autonomous AI marketing agent** that transforms basic product launch or boutique hospitality details into a complete, high-converting 360° promotional package.

---

## 🚀 Key Capabilities

1. **🎬 Short-Form Video Script & Storyboard (15-30s):**
   - High-retention hooks engineered for the first 3 seconds (visual + audio + on-screen text).
   - Scene-by-scene camera angles, visual framing, and spoken voiceover lines.
   - **Dual Strategy Matrix:**
     - **Online D2C Sales Engine:** ManyChat comment triggers, 3-part Instagram story funnels, and VIP early access drops.
     - **Offline Retail & Distributor Placement:** Countertop tasting displays, QR code neck-tags, and local stockist co-promos.

2. **📊 Engaging Presentation & Pitch Deck Outline:**
   - 5 structured presentation slides tailored for retail buyers, client meetings, stockists, and pop-up pitches.
   - Includes speaker script, key bullet takeaways, and tactical objection handling.

3. **📱 Omnichannel Social Media Pack:**
   - Platform-optimized copy for **Instagram** (feed & carousels), **LinkedIn** (founder journey & B2B stockists), **TikTok/Shorts**, and **WhatsApp VIP Broadcasts**.
   - Curated high-engagement hashtag clouds.

4. **📸 Visual Shot-List & Midjourney AI Image Prompts:**
   - Production shot checklist (Hero angle, macro textures, lifestyle in-action, packaging).
   - Ready-to-copy AI image generator prompts for instant visual mockup generation.

5. **🗓️ 7-Day Omnichannel Rollout Calendar:**
   - Daily actionable roadmap balancing digital buzz with brick-and-mortar execution.

6. **⚡ Interactive Tools:**
   - Live Tone Refinement (Warm, Luxury, Viral Meme, High-Urgency, Eco-Conscious).
   - Markdown Export & Formatted PDF / Print View.
   - Campaign Vault (Save and load draft packages locally).
   - Google Gemini 3.7 Flash API Integration with Smart Local Synthesizer Fallback.

---

## 🛠️ Quick Start

### 1. Launch Web Application
```bash
cd /Users/priyanshudubey/Desktop/promo-spark-agent
python3 run_server.py
```
Open **[http://localhost:8082](http://localhost:8082)** in your browser.

### 2. Terminal CLI Mode
```bash
python3 python_agent/promo_agent.py --brand "Chai Masala Crunch" --category "Food & Beverage"
```

---

## 🏗️ Project Architecture

```
promo-spark-agent/
├── index.html                  # Main UI layout, forms, responsive tabs & dynamic package views
├── css/
│   ├── style.css               # Design system tokens, dark/light themes, typography, glassmorphism
│   └── components.css          # Storyboard cards, deck slides, social cards, modals, timeline
├── js/
│   ├── app.js                  # Main coordinator, DOM events, tone refiner, preset loader
│   ├── agent.js                # Core promotional engine, Gemini prompt builder, smart synthesizer
│   ├── storage.js              # LocalStorage manager for campaign vault, API keys, and drafts
│   └── export_utils.js         # Markdown exporter, PDF print view, clipboard copy utilities
├── python_agent/
│   ├── promo_agent.py          # Standalone CLI python generator
│   └── requirements.txt        # Optional backend dependencies
├── run_server.py               # Multi-threaded local Python server & API handler (Port 8082)
├── .gitignore                  # Git ignore rules
└── README.md                   # Documentation
```

---

## 🔑 Gemini API Configuration

BrandSpark AI comes with a built-in **Smart Local Synthesis Engine** that generates complete promotional packages out-of-the-box without requiring an API key. 

To enable live Google Gemini AI generation:
1. Click the **Key icon** in the top navigation bar.
2. Enter your Google Gemini API key.
3. Your key is securely stored in your local browser session and `.env`.

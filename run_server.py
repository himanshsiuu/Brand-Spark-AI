#!/usr/bin/env python3
"""
BrandSpark AI - Local Web & API Server
Serves static frontend and provides backend API endpoints for:
- Promotional Package Generation via Gemini AI (/api/generate-promo)
- API Key & Status Management (/api/status, /api/save-key)
- Campaign Vault Persistence (/api/campaigns)
"""

import http.server
import socketserver
import os
import sys
import json
import time
import urllib.request
import urllib.parse
import webbrowser

PORT = 8082
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
ENV_FILE = os.path.join(DIRECTORY, ".env")
CAMPAIGNS_FILE = os.path.join(DIRECTORY, "campaigns.json")


def load_env_api_key():
    key = os.environ.get("GEMINI_API_KEY", "")
    if key:
        return key.strip()
    if os.path.exists(ENV_FILE):
        try:
            with open(ENV_FILE, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("GEMINI_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
        except Exception:
            pass
    home_env = os.path.expanduser("~/.env")
    if os.path.exists(home_env):
        try:
            with open(home_env, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("GEMINI_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
        except Exception:
            pass
    return ""


def save_env_api_key(api_key):
    try:
        lines = []
        if os.path.exists(ENV_FILE):
            with open(ENV_FILE, "r", encoding="utf-8") as f:
                lines = [l for l in f if not l.startswith("GEMINI_API_KEY=")]
        lines.append(f"GEMINI_API_KEY={api_key.strip()}\n")
        with open(ENV_FILE, "w", encoding="utf-8") as f:
            f.writelines(lines)
        os.environ["GEMINI_API_KEY"] = api_key.strip()
        return True
    except Exception as e:
        sys.stderr.write(f"[Error saving API key] {e}\n")
        return False


def call_gemini_promo_generator(api_key, form_data):
    model = "gemini-2.5-flash"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    prompt = f"""
You are an expert Chief Marketing Officer and viral content strategist for small businesses, artisanal brands, and boutique hospitality hosts.
Generate a complete, high-converting 360-degree promotional package in strict JSON format based on the following brand input:

Brand Name: {form_data.get('brandName')}
Category: {form_data.get('category')}
Campaign Focus: {form_data.get('campaignFocus')}
Product/Feature Name: {form_data.get('productName')}
Description: {form_data.get('description')}
Unique Selling Proposition: {form_data.get('usp')}
Target Audience: {form_data.get('targetAudience')}
Price Point: {form_data.get('pricePoint')}
Vibe/Tone: {form_data.get('vibe')}

Return ONLY a JSON object matching this exact schema:
{{
  "input": {json.dumps(form_data)},
  "videoScript": {{
    "hook": "Compelling first 3 seconds hook",
    "scenes": [
      {{
        "sceneNumber": 1,
        "duration": "0:00 - 0:03",
        "visual": "Camera angle and visual action",
        "voiceover": "Spoken voiceover line",
        "onScreenText": "Text overlay"
      }},
      {{
        "sceneNumber": 2,
        "duration": "0:03 - 0:08",
        "visual": "Product/property in-depth shot",
        "voiceover": "Key benefit line",
        "onScreenText": "Text overlay"
      }},
      {{
        "sceneNumber": 3,
        "duration": "0:08 - 0:13",
        "visual": "Lifestyle & experience shot",
        "voiceover": "Social proof or pricing line",
        "onScreenText": "Text overlay"
      }},
      {{
        "sceneNumber": 4,
        "duration": "0:13 - 0:15",
        "visual": "CTA card with bio link & store badge",
        "voiceover": "Call to action line",
        "onScreenText": "Text overlay"
      }}
    ],
    "dualStrategy": {{
      "online": ["3 specific actionable online D2C tactics like comment triggers, story funnels, VIP drops"],
      "offline": ["3 specific actionable physical retail & stockist placement tactics like sample counters, store QR codes, pop-up co-hosting"]
    }}
  }},
  "pitchDeck": {{
    "slides": [
      {{
        "slideNumber": 1,
        "title": "Title & First Impression",
        "headline": "Punchy slide headline",
        "keyPoints": ["Bullet 1", "Bullet 2", "Bullet 3"],
        "speakerNotes": "What to say to the client/retailer",
        "objectionHandling": "How to answer the biggest doubt"
      }},
      {{
        "slideNumber": 2,
        "title": "Problem & Opportunity",
        "headline": "Punchy slide headline",
        "keyPoints": ["Bullet 1", "Bullet 2", "Bullet 3"],
        "speakerNotes": "What to say to the client/retailer",
        "objectionHandling": "How to answer the biggest doubt"
      }},
      {{
        "slideNumber": 3,
        "title": "Hero Offering & Highlights",
        "headline": "Punchy slide headline",
        "keyPoints": ["Bullet 1", "Bullet 2", "Bullet 3"],
        "speakerNotes": "What to say to the client/retailer",
        "objectionHandling": "How to answer the biggest doubt"
      }},
      {{
        "slideNumber": 4,
        "title": "Customer Traction & Proof",
        "headline": "Punchy slide headline",
        "keyPoints": ["Bullet 1", "Bullet 2", "Bullet 3"],
        "speakerNotes": "What to say to the client/retailer",
        "objectionHandling": "How to answer the biggest doubt"
      }},
      {{
        "slideNumber": 5,
        "title": "Partnership & Next Steps",
        "headline": "Punchy slide headline",
        "keyPoints": ["Bullet 1", "Bullet 2", "Bullet 3"],
        "speakerNotes": "What to say to the client/retailer",
        "objectionHandling": "How to answer the biggest doubt"
      }}
    ]
  }},
  "socialPack": {{
    "instagram": "Full Instagram feed caption with emojis and CTA",
    "linkedin": "Thought leadership / founder story / B2B stockist pitch caption",
    "tiktok": "Short snappy viral TikTok caption with hashtags",
    "whatsapp": "VIP customer WhatsApp broadcast / email drop snippet",
    "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"]
  }},
  "shotList": {{
    "shots": [
      {{
        "type": "Hero Product Shot",
        "description": "Visual details and styling",
        "framing": "Lens and angle advice",
        "lighting": "Lighting setup"
      }},
      {{
        "type": "Macro Texture / Detail",
        "description": "Visual details and styling",
        "framing": "Lens and angle advice",
        "lighting": "Lighting setup"
      }},
      {{
        "type": "Lifestyle in Action",
        "description": "Visual details and styling",
        "framing": "Lens and angle advice",
        "lighting": "Lighting setup"
      }},
      {{
        "type": "Packaging & Retail Display",
        "description": "Visual details and styling",
        "framing": "Lens and angle advice",
        "lighting": "Lighting setup"
      }}
    ],
    "aiPrompt": "Detailed commercial photography Midjourney prompt for this offering"
  }},
  "rolloutCalendar": [
    {{"day": 1, "theme": "The Teaser & Founder Story", "onlineAction": "Action", "offlineAction": "Action"}},
    {{"day": 2, "theme": "Sensory Deep Dive & USP", "onlineAction": "Action", "offlineAction": "Action"}},
    {{"day": 3, "theme": "Official Public Drop Day", "onlineAction": "Action", "offlineAction": "Action"}},
    {{"day": 4, "theme": "Customer UGC & Reactions", "onlineAction": "Action", "offlineAction": "Action"}},
    {{"day": 5, "theme": "Retailer Spotlight & Store Locator", "onlineAction": "Action", "offlineAction": "Action"}},
    {{"day": 6, "theme": "Limited Batch Urgency", "onlineAction": "Action", "offlineAction": "Action"}},
    {{"day": 7, "theme": "Weekly Recap & Gratitude", "onlineAction": "Action", "offlineAction": "Action"}}
  ]
}}
"""

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.4,
            "responseMimeType": "application/json"
        }
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"}, method="POST")

    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            body = resp.read().decode("utf-8")
            res_json = json.loads(body)
            text = res_json.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
            return True, json.loads(text)
    except Exception as e:
        sys.stderr.write(f"[Gemini API Call Error] {e}\n")
        return False, str(e)


class BrandSparkApiHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        sys.stderr.write(f"[BrandSpark] {self.address_string()} - {format % args}\n")

    def send_json(self, status_code, data):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/status":
            api_key = load_env_api_key()
            has_key = bool(api_key and len(api_key) > 5)
            self.send_json(200, {
                "status": "ok",
                "hasApiKey": has_key,
                "maskedKey": f"{api_key[:6]}...{api_key[-4:]}" if has_key else None,
                "model": "gemini-2.5-flash / smart-local"
            })
            return

        if path == "/api/campaigns":
            if os.path.exists(CAMPAIGNS_FILE):
                try:
                    with open(CAMPAIGNS_FILE, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        self.send_json(200, {"campaigns": data})
                        return
                except Exception:
                    pass
            self.send_json(200, {"campaigns": []})
            return

        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"

        try:
            req_data = json.loads(raw_body)
        except Exception:
            req_data = {}

        if path == "/api/save-key":
            key = req_data.get("apiKey", "")
            success = save_env_api_key(key)
            self.send_json(200, {"status": "ok" if success else "error"})
            return

        if path == "/api/generate-promo":
            form_data = req_data.get("formData", {})
            user_key = req_data.get("apiKey", "") or load_env_api_key()

            if user_key:
                ok, res = call_gemini_promo_generator(user_key, form_data)
                if ok and isinstance(res, dict):
                    self.send_json(200, {"status": "ok", "package": res, "source": "gemini-api"})
                    return

            # Fallback to local synthesizer if no key or error
            self.send_json(200, {"status": "fallback", "message": "Using local synthesizer"})
            return

        if path == "/api/campaigns":
            campaign = req_data.get("campaign", {})
            campaigns = []
            if os.path.exists(CAMPAIGNS_FILE):
                try:
                    with open(CAMPAIGNS_FILE, "r", encoding="utf-8") as f:
                        campaigns = json.load(f)
                except Exception:
                    campaigns = []
            campaigns.insert(0, {"id": f"camp_{int(time.time())}", "savedAt": time.strftime("%Y-%m-%d %H:%M:%S"), **campaign})
            with open(CAMPAIGNS_FILE, "w", encoding="utf-8") as f:
                json.dump(campaigns[:30], f, indent=2)
            self.send_json(200, {"status": "ok", "campaigns": campaigns[:30]})
            return

        self.send_json(404, {"error": "Not found"})


def find_free_port(start_port=8082, max_attempts=20):
    import socket
    for p in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(("", p)) != 0:
                return p
    return start_port


def main():
    port = find_free_port(PORT)
    url = f"http://localhost:{port}/index.html"

    print("\n" + "=" * 65)
    print("✨ BrandSpark AI — Small Business Promotional Package Agent")
    print("=" * 65)
    print(f"📁 Serving directory: {DIRECTORY}")
    print(f"🚀 Local Server running at: {url}")
    print(f"🔌 API Endpoints: /api/generate-promo, /api/status, /api/campaigns")

    api_key = load_env_api_key()
    if api_key:
        print(f"🔑 Gemini API Key: Configured ({api_key[:6]}...{api_key[-4:]})")
    else:
        print("🔑 Gemini API Key: Ready (Custom key can be set in Web UI or .env)")

    print("💡 Press Ctrl+C to stop the server anytime.")
    print("=" * 65 + "\n")

    try:
        webbrowser.open(url)
    except Exception:
        pass

    socketserver.TCPServer.allow_reuse_address = True
    server_cls = getattr(http.server, "ThreadingHTTPServer", socketserver.ThreadingTCPServer)
    with server_cls(("", port), BrandSparkApiHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Shutting down BrandSpark server.")
            httpd.server_close()


if __name__ == "__main__":
    main()

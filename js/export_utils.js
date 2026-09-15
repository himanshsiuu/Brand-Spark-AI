/**
 * BrandSpark AI - Export & Clipboard Utilities
 */

const ExportUtils = {
  copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    if (!navigator.clipboard) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      App.showToast(successMessage);
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      App.showToast(successMessage);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      App.showToast('Could not copy text.', 'error');
    });
  },

  generateMarkdownPackage(pkg) {
    if (!pkg) return '';

    const brand = pkg.input?.brandName || 'Brand';
    const focus = pkg.input?.campaignFocus || 'Product Launch';

    let md = `# 🚀 BrandSpark Promotional Package: ${brand}\n`;
    md += `**Campaign Focus:** ${focus} | **Category:** ${pkg.input?.category || 'Small Business'}\n`;
    md += `**Generated on:** ${new Date().toLocaleDateString()} via BrandSpark AI\n\n`;
    md += `---\n\n`;

    // 1. Video Script
    if (pkg.videoScript) {
      md += `## 🎬 1. Short-Form Video Script & Storyboard\n`;
      md += `**Target Platforms:** Reels, TikTok, YouTube Shorts\n`;
      md += `**Hook (First 3s):** ${pkg.videoScript.hook}\n\n`;
      md += `### Storyboard Timeline\n`;
      
      pkg.videoScript.scenes.forEach(s => {
        md += `#### Scene ${s.sceneNumber}: ${s.duration}\n`;
        md += `- **Camera & Visual:** ${s.visual}\n`;
        md += `- **Voiceover / Audio:** ${s.voiceover}\n`;
        md += `- **On-Screen Text:** \`${s.onScreenText}\`\n\n`;
      });

      md += `### Dual Distribution Strategy\n`;
      md += `#### 🛒 Online D2C Sales Engine:\n`;
      pkg.videoScript.dualStrategy.online.forEach(item => {
        md += `- ${item}\n`;
      });
      md += `\n#### 🏬 Offline Retail & Distributor Placement:\n`;
      pkg.videoScript.dualStrategy.offline.forEach(item => {
        md += `- ${item}\n`;
      });
      md += `\n---\n\n`;
    }

    // 2. Pitch Deck Outline
    if (pkg.pitchDeck) {
      md += `## 📊 2. Engaging Presentation & Pitch Deck Outline\n`;
      md += `*For customer meetings, local retailer stockists, or pop-up pitch decks.*\n\n`;
      
      pkg.pitchDeck.slides.forEach(slide => {
        md += `### Slide ${slide.slideNumber}: ${slide.title}\n`;
        md += `**Headline:** ${slide.headline}\n\n`;
        md += `**Key Points:**\n`;
        slide.keyPoints.forEach(kp => md += `- ${kp}\n`);
        md += `\n**Speaker Talking Points:** ${slide.speakerNotes}\n`;
        md += `**Objection Handling:** ${slide.objectionHandling}\n\n`;
      });
      md += `---\n\n`;
    }

    // 3. Social Media Pack
    if (pkg.socialPack) {
      md += `## 📱 3. Multi-Channel Social Media Pack\n\n`;
      
      md += `### Instagram (Feed & Carousel)\n`;
      md += `${pkg.socialPack.instagram}\n\n`;

      md += `### LinkedIn (B2B & Partnership Story)\n`;
      md += `${pkg.socialPack.linkedin}\n\n`;

      md += `### TikTok / Shorts Caption\n`;
      md += `${pkg.socialPack.tiktok}\n\n`;

      md += `### WhatsApp Broadcast / VIP Newsletter\n`;
      md += `${pkg.socialPack.whatsapp}\n\n`;

      md += `### Recommended Hashtags\n`;
      md += pkg.socialPack.hashtags.map(h => `#${h}`).join(' ') + `\n\n`;
      md += `---\n\n`;
    }

    // 4. Shot List & AI Image Prompts
    if (pkg.shotList) {
      md += `## 📸 4. Visual Shot-List & AI Image Generation Prompts\n\n`;
      md += `### Production Shot Checklist\n`;
      pkg.shotList.shots.forEach(shot => {
        md += `- **[${shot.type}]** ${shot.description} *(Framing: ${shot.framing} | Lighting: ${shot.lighting})*\n`;
      });
      md += `\n### Ready-to-Use AI Image Prompt\n`;
      md += `\`\`\`text\n${pkg.shotList.aiPrompt}\n\`\`\`\n\n`;
      md += `---\n\n`;
    }

    // 5. 7-Day Rollout Calendar
    if (pkg.rolloutCalendar) {
      md += `## 🗓️ 5. 7-Day Omnichannel Launch Calendar\n\n`;
      pkg.rolloutCalendar.forEach(day => {
        md += `### Day ${day.day}: ${day.theme}\n`;
        md += `- **Digital Channel:** ${day.onlineAction}\n`;
        md += `- **Physical / Retail Channel:** ${day.offlineAction}\n\n`;
      });
    }

    return md;
  },

  downloadMarkdownFile(pkg) {
    const md = this.generateMarkdownPackage(pkg);
    const brandName = (pkg.input?.brandName || 'brand').toLowerCase().replace(/\s+/g, '-');
    const filename = `${brandName}-promotional-package.md`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    App.showToast(`Exported ${filename}`);
  },

  printFormattedPackage(pkg) {
    const md = this.generateMarkdownPackage(pkg);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Popup blocked. Please allow popups to view printable report.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>BrandSpark Promotional Package - ${pkg.input?.brandName || 'Brand'}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; max-width: 850px; margin: 0 auto; padding: 2rem; }
          h1, h2, h3 { color: #0f172a; margin-top: 1.5rem; }
          h1 { border-bottom: 2px solid #8b5cf6; padding-bottom: 0.5rem; }
          h2 { border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem; }
          code, pre { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
          pre { padding: 1rem; overflow-x: auto; }
          blockquote { border-left: 4px solid #8b5cf6; margin: 0; padding-left: 1rem; color: #475569; }
          hr { border: none; border-top: 1px solid #e2e8f0; margin: 2rem 0; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <button onclick="window.print()" style="padding: 10px 18px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-bottom: 20px;">🖨️ Print / Save as PDF</button>
        <div>
          ${md.replace(/\n/g, '<br>').replace(/#{3} (.*?)<br>/g, '<h3>$1</h3>').replace(/#{2} (.*?)<br>/g, '<h2>$1</h2>').replace(/#{1} (.*?)<br>/g, '<h1>$1</h1>')}
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  }
};

window.ExportUtils = ExportUtils;

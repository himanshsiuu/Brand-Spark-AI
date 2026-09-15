/**
 * BrandSpark AI — Main Application Controller & UI Orchestrator
 */

const App = {
  currentPackage: null,
  activeTab: 'video',
  isGenerating: false,

  init() {
    this.setupTheme();
    this.bindEvents();
    this.initFormDraft();
    this.checkApiStatus();

    // Default load first preset if no draft
    if (!this.currentPackage) {
      this.loadPreset('snack');
    }
  },

  setupTheme() {
    const saved = StorageManager.getTheme();
    document.documentElement.setAttribute('data-theme', saved);
    const btn = document.getElementById('btn-theme-toggle');
    if (btn) {
      btn.innerHTML = saved === 'light' ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
    }
  },

  toggleTheme() {
    const curr = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = curr === 'dark' ? 'light' : 'dark';
    StorageManager.setTheme(next);
    this.setupTheme();
    if (window.lucide) lucide.createIcons();
  },

  bindEvents() {
    // Theme Toggle
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => this.toggleTheme());

    // Preset Chips
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const presetKey = e.currentTarget.dataset.preset;
        this.loadPreset(presetKey);
      });
    });

    // Form Submit / Generate Button
    document.getElementById('promo-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleGenerate();
    });

    // Tab Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = e.currentTarget.dataset.tab;
        this.switchTab(targetTab);
      });
    });

    // Action Bar Buttons
    document.getElementById('btn-download-md')?.addEventListener('click', () => {
      if (this.currentPackage) ExportUtils.downloadMarkdownFile(this.currentPackage);
      else this.showToast('Generate a package first!', 'info');
    });

    document.getElementById('btn-print-pkg')?.addEventListener('click', () => {
      if (this.currentPackage) ExportUtils.printFormattedPackage(this.currentPackage);
      else this.showToast('Generate a package first!', 'info');
    });

    document.getElementById('btn-save-vault')?.addEventListener('click', () => {
      this.handleSaveToVault();
    });

    document.getElementById('btn-view-vault')?.addEventListener('click', () => {
      this.openVaultModal();
    });

    document.getElementById('btn-api-settings')?.addEventListener('click', () => {
      this.openApiModal();
    });

    // Modal Close buttons
    document.querySelectorAll('.modal-close-trigger').forEach(el => {
      el.addEventListener('click', () => this.closeModals());
    });

    // API Key Save in Modal
    document.getElementById('btn-save-api-key')?.addEventListener('click', () => {
      this.handleSaveApiKey();
    });

    // Live Tone Refinement
    document.getElementById('btn-refine-tone')?.addEventListener('click', () => {
      this.handleRefineTone();
    });
  },

  loadPreset(presetKey) {
    const preset = PromoAgent.PRESETS[presetKey];
    if (!preset) return;

    // Update form fields
    document.getElementById('brandName').value = preset.brandName;
    document.getElementById('category').value = preset.category;
    document.getElementById('campaignFocus').value = preset.campaignFocus;
    document.getElementById('productName').value = preset.productName;
    document.getElementById('description').value = preset.description;
    document.getElementById('usp').value = preset.usp;
    document.getElementById('targetAudience').value = preset.targetAudience;
    document.getElementById('pricePoint').value = preset.pricePoint;
    document.getElementById('vibe').value = preset.vibe;

    // Highlight chip
    document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
    document.querySelector(`.preset-chip[data-preset="${presetKey}"]`)?.classList.add('active');

    // Auto generate
    this.handleGenerate();
  },

  getFormData() {
    return {
      brandName: document.getElementById('brandName')?.value.trim() || 'Brand',
      category: document.getElementById('category')?.value || 'Food & Beverage',
      campaignFocus: document.getElementById('campaignFocus')?.value || 'Product Launch',
      productName: document.getElementById('productName')?.value.trim() || 'Signature Item',
      description: document.getElementById('description')?.value.trim() || '',
      usp: document.getElementById('usp')?.value.trim() || '',
      targetAudience: document.getElementById('targetAudience')?.value.trim() || '',
      pricePoint: document.getElementById('pricePoint')?.value.trim() || '',
      vibe: document.getElementById('vibe')?.value || 'Warm & Engaging'
    };
  },

  initFormDraft() {
    const draft = StorageManager.getFormDraft();
    if (draft) {
      Object.keys(draft).forEach(key => {
        const input = document.getElementById(key);
        if (input) input.value = draft[key];
      });
    }
  },

  async handleGenerate() {
    if (this.isGenerating) return;

    const formData = this.getFormData();
    StorageManager.saveFormDraft(formData);

    this.setLoading(true);

    try {
      const result = await PromoAgent.generatePackage(formData);
      this.currentPackage = result.package;
      this.renderPackage(this.currentPackage);
      this.showToast('Promotional package generated successfully! 🚀');
    } catch (e) {
      console.error(e);
      this.showToast('Failed to generate promotional package.', 'error');
    } finally {
      this.setLoading(false);
    }
  },

  setLoading(isLoading) {
    this.isGenerating = isLoading;
    const btn = document.getElementById('btn-generate');
    const loadingState = document.getElementById('loading-state');
    const outputContent = document.getElementById('output-content-area');

    if (isLoading) {
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span class="pulse-spinner" style="width:18px;height:18px;border-width:2px;"></span> Crafting Package...`;
      }
      if (loadingState) loadingState.style.display = 'flex';
      if (outputContent) outputContent.style.display = 'none';
    } else {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="sparkles"></i> Generate Complete Package`;
      }
      if (loadingState) loadingState.style.display = 'none';
      if (outputContent) outputContent.style.display = 'block';
      if (window.lucide) lucide.createIcons();
    }
  },

  switchTab(tabId) {
    this.activeTab = tabId;

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${tabId}`);
    });

    if (window.lucide) lucide.createIcons();
  },

  renderPackage(pkg) {
    if (!pkg) return;

    // 1. Update Hero Status
    document.getElementById('hero-brand-name').textContent = pkg.input.brandName;
    document.getElementById('hero-category-badge').textContent = pkg.input.category;
    document.getElementById('hero-focus-badge').textContent = pkg.input.campaignFocus;
    document.getElementById('hero-vibe-badge').textContent = pkg.input.vibe;

    // 2. Render Video Script & Storyboard
    this.renderVideoTab(pkg.videoScript);

    // 3. Render Pitch Deck
    this.renderDeckTab(pkg.pitchDeck);

    // 4. Render Social Pack
    this.renderSocialTab(pkg.socialPack);

    // 5. Render Shot-List & AI Prompts
    this.renderShotListTab(pkg.shotList);

    // 6. Render Launch Calendar
    this.renderCalendarTab(pkg.rolloutCalendar);

    if (window.lucide) lucide.createIcons();
  },

  renderVideoTab(video) {
    const hookEl = document.getElementById('video-hook-text');
    if (hookEl) hookEl.textContent = video.hook;

    const storyboardEl = document.getElementById('storyboard-container');
    if (storyboardEl) {
      storyboardEl.innerHTML = video.scenes.map(s => `
        <div class="scene-card">
          <div class="scene-badge-col">
            <span class="scene-num">Scene ${s.sceneNumber}</span>
            <span class="scene-duration">${s.duration}</span>
          </div>
          <div class="scene-details">
            <div class="scene-row">
              <span class="scene-row-label"><i data-lucide="camera" style="width:14px;"></i> Visual:</span>
              <span class="scene-row-content">${s.visual}</span>
            </div>
            <div class="scene-row">
              <span class="scene-row-label"><i data-lucide="mic" style="width:14px;"></i> Voiceover:</span>
              <span class="scene-row-content"><strong>${s.voiceover}</strong></span>
            </div>
            <div class="scene-row">
              <span class="scene-row-label"><i data-lucide="type" style="width:14px;"></i> Text Overlay:</span>
              <span class="scene-text-overlay">${s.onScreenText}</span>
            </div>
          </div>
        </div>
      `).join('');
    }

    // 1. Hook Variations
    const hookVarsEl = document.getElementById('hook-variations-container');
    if (hookVarsEl && video.hookVariations) {
      hookVarsEl.innerHTML = video.hookVariations.map((hv, idx) => `
        <div style="background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:0.6rem 0.85rem;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
          <div style="font-size:0.85rem;color:var(--text-primary);">
            <strong style="color:var(--accent-secondary);font-size:0.75rem;text-transform:uppercase;display:block;margin-bottom:0.15rem;">[${hv.type}]</strong>
            ${hv.hook}
          </div>
          <button class="btn btn-secondary btn-sm" onclick="ExportUtils.copyToClipboard('${hv.hook.replace(/'/g, "\\'")}', 'Hook copied!')" title="Copy Hook">
            <i data-lucide="copy" style="width:13px;"></i> Copy
          </button>
        </div>
      `).join('');
    }

    // 2. Paid Meta / Instagram Reel Ad Script
    const paidAdEl = document.getElementById('paid-ad-content');
    if (paidAdEl && video.paidAdScript) {
      paidAdEl.innerHTML = `
        <div style="font-size:0.8rem;color:var(--accent-cyan);font-weight:700;margin-bottom:0.25rem;">
          🎯 ${video.paidAdScript.format} • ${video.paidAdScript.objective}
        </div>
        ${video.paidAdScript.structure.map(st => `
          <div style="background:var(--bg-secondary);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:0.75rem;font-size:0.85rem;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:0.3rem;">${st.phase}</div>
            <div style="color:var(--text-secondary);margin-bottom:0.2rem;"><strong>🎥 Visual:</strong> ${st.visual}</div>
            <div style="color:var(--text-primary);margin-bottom:0.2rem;"><strong>🎙️ Audio / VO:</strong> "${st.audioVO}"</div>
            <div style="font-family:var(--font-mono);font-size:0.78rem;color:var(--accent-amber);background:var(--bg-input);padding:0.2rem 0.4rem;border-radius:4px;display:inline-block;">${st.textOverlay}</div>
          </div>
        `).join('')}
      `;
    }

    // 3. Influencer & UGC Collaboration Brief
    const infBriefEl = document.getElementById('influencer-brief-content');
    if (infBriefEl && video.influencerBrief) {
      infBriefEl.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:0.6rem;font-size:0.85rem;">
          <div><strong>👤 Ideal Creator Profile:</strong> <span style="color:var(--text-secondary);">${video.influencerBrief.idealCreatorProfile}</span></div>
          <div><strong>📦 Deliverables:</strong> <span style="color:var(--text-secondary);">${video.influencerBrief.deliverables}</span></div>
          <div>
            <strong>💡 Key Talking Points:</strong>
            <ul style="list-style:disc;padding-left:1.2rem;color:var(--text-secondary);margin-top:0.2rem;">
              ${video.influencerBrief.keyTalkingPoints.map(tp => `<li>${tp}</li>`).join('')}
            </ul>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:0.3rem;">
            <div style="background:rgba(16, 185, 129, 0.08);border:1px solid rgba(16, 185, 129, 0.2);padding:0.6rem;border-radius:var(--radius-md);">
              <strong style="color:var(--accent-emerald);font-size:0.78rem;text-transform:uppercase;">✅ Creative DOs:</strong>
              <ul style="list-style:none;padding-left:0;margin-top:0.3rem;font-size:0.8rem;color:var(--text-secondary);">
                ${video.influencerBrief.creativeDos.map(d => `<li>• ${d}</li>`).join('')}
              </ul>
            </div>
            <div style="background:rgba(239, 68, 68, 0.08);border:1px solid rgba(239, 68, 68, 0.2);padding:0.6rem;border-radius:var(--radius-md);">
              <strong style="color:#ef4444;font-size:0.78rem;text-transform:uppercase;">❌ Creative DONTs:</strong>
              <ul style="list-style:none;padding-left:0;margin-top:0.3rem;font-size:0.8rem;color:var(--text-secondary);">
                ${video.influencerBrief.creativeDonts.map(d => `<li>• ${d}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    }

    // 4. Dual Distribution Strategy
    const onlineList = document.getElementById('strategy-online-list');
    if (onlineList) {
      onlineList.innerHTML = video.dualStrategy.online.map(item => `
        <li><i data-lucide="check-circle-2" style="width:16px;"></i> <span>${item}</span></li>
      `).join('');
    }

    const offlineList = document.getElementById('strategy-offline-list');
    if (offlineList) {
      offlineList.innerHTML = video.dualStrategy.offline.map(item => `
        <li><i data-lucide="store" style="width:16px;"></i> <span>${item}</span></li>
      `).join('');
    }
  },

  renderDeckTab(deck) {
    const container = document.getElementById('pitch-deck-container');
    if (!container) return;

    container.innerHTML = deck.slides.map(slide => `
      <div class="slide-card">
        <div class="slide-header">
          <span class="slide-number-pill">Slide ${slide.slideNumber} of ${deck.slides.length}</span>
          <span class="section-label">${slide.title}</span>
        </div>
        <h3 class="slide-headline">${slide.headline}</h3>
        
        <div class="slide-body-grid">
          <div class="slide-section">
            <span class="slide-section-title"><i data-lucide="list-checks" style="width:13px;display:inline;"></i> Key Content Bullets</span>
            <ul style="list-style:disc;padding-left:1.2rem;display:flex;flex-direction:column;gap:0.3rem;">
              ${slide.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
            </ul>
          </div>
          <div class="slide-section">
            <span class="slide-section-title"><i data-lucide="message-square" style="width:13px;display:inline;"></i> Speaker Script & Hook</span>
            <p style="font-size:0.85rem;color:var(--text-primary);">${slide.speakerNotes}</p>
          </div>
        </div>

        <div style="background:rgba(245, 158, 11, 0.08);border:1px solid rgba(245, 158, 11, 0.25);border-radius:var(--radius-md);padding:0.6rem 0.9rem;font-size:0.82rem;">
          <strong style="color:var(--accent-amber);"><i data-lucide="shield-alert" style="width:14px;display:inline;"></i> Objection Handling:</strong>
          <span style="color:var(--text-secondary);margin-left:0.3rem;">${slide.objectionHandling}</span>
        </div>
      </div>
    `).join('');
  },

  renderSocialTab(social) {
    document.getElementById('caption-instagram').textContent = social.instagram;
    document.getElementById('caption-linkedin').textContent = social.linkedin;
    document.getElementById('caption-tiktok').textContent = social.tiktok;
    document.getElementById('caption-whatsapp').textContent = social.whatsapp;

    const hashtagsContainer = document.getElementById('hashtags-cluster');
    if (hashtagsContainer) {
      hashtagsContainer.innerHTML = social.hashtags.map(h => `
        <span class="hashtag-pill">#${h}</span>
      `).join('');
    }
  },

  renderShotListTab(shotList) {
    const tbody = document.getElementById('shotlist-tbody');
    if (tbody) {
      tbody.innerHTML = shotList.shots.map(s => `
        <tr>
          <td><strong style="color:var(--accent-primary);">${s.type}</strong></td>
          <td>${s.description}</td>
          <td><span style="font-family:var(--font-mono);font-size:0.78rem;">${s.framing}</span></td>
          <td>${s.lighting}</td>
        </tr>
      `).join('');
    }

    const aiPromptEl = document.getElementById('ai-image-prompt-text');
    if (aiPromptEl) aiPromptEl.textContent = shotList.aiPrompt;
  },

  renderCalendarTab(calendar) {
    const container = document.getElementById('calendar-container');
    if (!container) return;

    container.innerHTML = calendar.map(day => `
      <div class="calendar-day-card">
        <div class="day-badge">
          <span style="font-size:0.75rem;text-transform:uppercase;">DAY</span>
          <span style="font-size:1.4rem;line-height:1;">${day.day}</span>
        </div>
        <div class="day-plan">
          <div class="day-title">${day.theme}</div>
          <div class="day-tasks">
            <span class="task-tag"><i data-lucide="globe" style="width:12px;display:inline;color:var(--accent-emerald);"></i> <strong>Digital:</strong> ${day.onlineAction}</span>
            <span class="task-tag"><i data-lucide="map-pin" style="width:12px;display:inline;color:var(--accent-cyan);"></i> <strong>Retail / Physical:</strong> ${day.offlineAction}</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  handleSaveToVault() {
    if (!this.currentPackage) {
      this.showToast('Generate a package first before saving!', 'info');
      return;
    }
    const saved = StorageManager.saveCampaign(this.currentPackage);
    if (saved) {
      this.showToast(`Saved "${this.currentPackage.input.brandName}" to Vault! 📂`);
    }
  },

  openVaultModal() {
    const campaigns = StorageManager.getSavedCampaigns();
    const listEl = document.getElementById('vault-campaign-list');
    if (listEl) {
      if (campaigns.length === 0) {
        listEl.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:2rem;">No saved campaigns yet. Generate and click "Save to Vault".</p>`;
      } else {
        listEl.innerHTML = campaigns.map(c => `
          <div style="background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1rem;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <strong style="font-size:1rem;color:var(--text-primary);">${c.input?.brandName || 'Untitled'}</strong>
              <div style="font-size:0.78rem;color:var(--text-muted);">${c.input?.campaignFocus || 'Campaign'} • ${new Date(c.savedAt).toLocaleDateString()}</div>
            </div>
            <div style="display:flex;gap:0.4rem;">
              <button class="btn btn-secondary btn-sm" onclick="App.loadSavedCampaign('${c.id}')">Load</button>
              <button class="btn btn-icon btn-sm" onclick="App.deleteSavedCampaign('${c.id}')"><i data-lucide="trash-2" style="width:15px;"></i></button>
            </div>
          </div>
        `).join('');
      }
    }
    document.getElementById('vault-modal')?.classList.add('active');
    if (window.lucide) lucide.createIcons();
  },

  loadSavedCampaign(id) {
    const campaigns = StorageManager.getSavedCampaigns();
    const found = campaigns.find(c => c.id === id);
    if (found) {
      this.currentPackage = found;
      this.renderPackage(found);
      this.closeModals();
      this.showToast(`Loaded "${found.input.brandName}" from Vault!`);
    }
  },

  deleteSavedCampaign(id) {
    if (StorageManager.deleteCampaign(id)) {
      this.openVaultModal();
      this.showToast('Campaign deleted.');
    }
  },

  openApiModal() {
    const keyInput = document.getElementById('modal-api-key-input');
    if (keyInput) keyInput.value = StorageManager.getApiKey();
    document.getElementById('api-modal')?.classList.add('active');
  },

  async handleSaveApiKey() {
    const key = document.getElementById('modal-api-key-input')?.value.trim() || '';
    StorageManager.setApiKey(key);

    try {
      await fetch('/api/save-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key })
      });
    } catch (e) {}

    this.closeModals();
    this.checkApiStatus();
    this.showToast(key ? 'Gemini API Key saved!' : 'Custom key cleared.');
  },

  async checkApiStatus() {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        const badge = document.getElementById('api-status-badge');
        if (badge) {
          if (data.hasApiKey || StorageManager.getApiKey()) {
            badge.className = 'badge badge-emerald';
            badge.innerHTML = '<i data-lucide="check-circle-2" style="width:12px;display:inline;"></i> Gemini 3.7 Flash Active';
          } else {
            badge.className = 'badge badge-brand';
            badge.innerHTML = '<i data-lucide="sparkles" style="width:12px;display:inline;"></i> Smart AI Mode';
          }
          if (window.lucide) lucide.createIcons();
        }
      }
    } catch (e) {}
  },

  handleRefineTone() {
    const tone = document.getElementById('refine-tone-select')?.value;
    if (!tone || !this.currentPackage) return;

    this.showToast(`Refining promotional package in "${tone}" tone... ✨`);
    
    // Update vibe and re-generate
    document.getElementById('vibe').value = tone;
    this.handleGenerate();
  },

  closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="${type === 'error' ? 'alert-circle' : 'check'}" style="width:16px;"></i> ${message}`;
    container.appendChild(toast);

    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

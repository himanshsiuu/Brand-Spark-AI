/**
 * BrandSpark AI - Local Storage & Campaign Vault Manager
 */

const StorageManager = {
  KEYS: {
    THEME: 'brandspark_theme',
    API_KEY: 'brandspark_gemini_api_key',
    SAVED_CAMPAIGNS: 'brandspark_saved_campaigns',
    LAST_FORM: 'brandspark_last_form'
  },

  getTheme() {
    return localStorage.getItem(this.KEYS.THEME) || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem(this.KEYS.THEME, theme);
  },

  getApiKey() {
    return localStorage.getItem(this.KEYS.API_KEY) || '';
  },

  setApiKey(key) {
    localStorage.setItem(this.KEYS.API_KEY, key.trim());
  },

  getSavedCampaigns() {
    try {
      const data = localStorage.getItem(this.KEYS.SAVED_CAMPAIGNS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading campaigns from storage:', e);
      return [];
    }
  },

  saveCampaign(campaign) {
    try {
      const campaigns = this.getSavedCampaigns();
      const newEntry = {
        id: 'camp_' + Date.now(),
        savedAt: new Date().toISOString(),
        ...campaign
      };
      campaigns.unshift(newEntry);
      // Keep last 25 campaigns
      const trimmed = campaigns.slice(0, 25);
      localStorage.setItem(this.KEYS.SAVED_CAMPAIGNS, JSON.stringify(trimmed));
      return newEntry;
    } catch (e) {
      console.error('Error saving campaign:', e);
      return null;
    }
  },

  deleteCampaign(id) {
    try {
      const campaigns = this.getSavedCampaigns().filter(c => c.id !== id);
      localStorage.setItem(this.KEYS.SAVED_CAMPAIGNS, JSON.stringify(campaigns));
      return true;
    } catch (e) {
      console.error('Error deleting campaign:', e);
      return false;
    }
  },

  saveFormDraft(formData) {
    try {
      localStorage.setItem(this.KEYS.LAST_FORM, JSON.stringify(formData));
    } catch (e) {}
  },

  getFormDraft() {
    try {
      const data = localStorage.getItem(this.KEYS.LAST_FORM);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }
};

window.StorageManager = StorageManager;

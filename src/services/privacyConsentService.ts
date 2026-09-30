import { PrivacyConsentState } from '../types';

class PrivacyConsentService {
  private consent: PrivacyConsentState = {
    shareWithDoctors: false,
    aiDataProcessing: true,
    guardianConsentGranted: true,
    dataExportRequested: false,
  };

  public getConsent(): PrivacyConsentState {
    return this.consent;
  }

  public updateConsent(updates: Partial<PrivacyConsentState>): PrivacyConsentState {
    this.consent = { ...this.consent, ...updates };
    return this.consent;
  }
}

export const privacyConsentService = new PrivacyConsentService();

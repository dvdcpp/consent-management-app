import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { consentsService } from './mockConsentService';
import { ConsentData } from '@/types/consents';
import config from '@/config/api';
import { initialConsents } from '@/mocks/initialConsents';

describe('consentsService', () => {
  beforeEach(() => {
    vi.resetModules();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getConsents', () => {
    it('should return all consents when called successfully', async () => {
      const mockResponse = {
        json: vi.fn().mockResolvedValue({ consents: initialConsents, total: initialConsents.length }),
        ok: true,
      };
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await consentsService.getConsents();

      expect(global.fetch).toHaveBeenCalledWith(`${config.API_BASE_URL}/consents`);
      expect(result).toEqual({ consents: initialConsents, total: initialConsents.length });
    });

    it('should throw an error if the request fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false });

      await expect(consentsService.getConsents()).rejects.toThrow('Failed to fetch consents');
    });
  });

  describe('addConsent', () => {
    it('should add a new consent when called with valid data', async () => {
      const newConsent: ConsentData = {
        name: 'Test User',
        email: 'test@example.com',
        permissions: {
          receiveNewsletter: true,
          showTargetedAds: false,
          contributeToStatistics: true,
        }
      };

      const mockResponse = {
        json: vi.fn().mockResolvedValue({ message: 'Consent added successfully' }),
        ok: true,
      };
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await consentsService.addConsent(newConsent);

      expect(global.fetch).toHaveBeenCalledWith(`${config.API_BASE_URL}/consents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConsent),
      });
      expect(result).toEqual({ message: 'Consent added successfully' });
    });

    it('should throw an error if the request fails', async () => {
      const newConsent: ConsentData = {
        name: 'Test User',
        email: 'test@example.com',
        permissions: {
          receiveNewsletter: true,
          showTargetedAds: false,
          contributeToStatistics: true,
        }
      };

      global.fetch = vi.fn().mockResolvedValue({ ok: false });

      await expect(consentsService.addConsent(newConsent)).rejects.toThrow('Failed to add consent');
    });
  });
});
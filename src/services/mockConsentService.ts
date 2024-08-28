import { ConsentData } from '@/types/consents';
import config from '@/config/api';
import { initialConsents } from '@/mocks/initialConsents';

const consents: ConsentData[] = [...initialConsents];

const simulateDelay = () => new Promise(resolve => setTimeout(resolve, config.API_DELAY_MS));

const mockFetch = async (url: string, options?: RequestInit): Promise<Response> => {
  await simulateDelay();

  if (url.endsWith('/consents')) {
    if (options?.method === 'POST') {
      const newConsent = JSON.parse(options.body as string) as ConsentData;
      consents.push(newConsent);
      return new Response(JSON.stringify({ message: 'Consent added successfully' }), { status: 201 });
    } else {
      return new Response(JSON.stringify({ consents, total: consents.length }), { status: 200 });
    }
  }

  return new Response(null, { status: 404 });
};

(window as Window).fetch = mockFetch;

export const consentsService = {
  getConsents: async (): Promise<{ consents: ConsentData[], total: number }> => {
    const response = await fetch(`${config.API_BASE_URL}/consents`);
    if (!response.ok) {
      throw new Error('Failed to fetch consents');
    }
    return response.json();
  },

  addConsent: async (newConsent: ConsentData): Promise<{ message: string }> => {
    const response = await fetch(`${config.API_BASE_URL}/consents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newConsent),
    });
    if (!response.ok) {
      throw new Error('Failed to add consent');
    }
    return response.json();
  }
};
import { createContext } from 'react';
import { ConsentData } from '@/types/consents';

interface ConsentContextType {
  consents: ConsentData[];
  isLoading: boolean;
  error: string | null;
  fetchConsents: () => Promise<void>;
}

export const ConsentContext = createContext<ConsentContextType | undefined>(undefined);
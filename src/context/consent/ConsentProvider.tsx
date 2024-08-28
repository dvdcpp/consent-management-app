import React, { useState, useCallback } from 'react';
import { ConsentContext } from './ConsentContext';
import { ConsentData } from '@/types/consents';
import { consentsService } from '@/services/mockConsentService';

export const ConsentProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [consents, setConsents] = useState<ConsentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await consentsService.getConsents();
      setConsents(response.consents);
    } catch (error) {
      console.error('Error fetching consents:', error);
      setError('Failed to fetch consents. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ConsentContext.Provider value={{ consents, isLoading, error, fetchConsents }}>
      {children}
    </ConsentContext.Provider>
  );
};
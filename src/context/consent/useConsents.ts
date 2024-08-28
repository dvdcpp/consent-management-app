import { useContext } from 'react';
import { ConsentContext } from './ConsentContext';

export const useConsents = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsents must be used within a ConsentProvider');
  }
  return context;
};
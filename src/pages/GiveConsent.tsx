import { Typography } from '@mui/material';
import ConsentForm from '@/components/consent-form/ConsentForm';

const GiveConsentPage = () => (
  <>
    <Typography variant="h2" fontSize="2rem" gutterBottom>
      Give Consent
    </Typography>
    <ConsentForm />
  </>
);

export default GiveConsentPage;

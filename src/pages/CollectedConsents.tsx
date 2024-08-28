import { Typography } from "@mui/material";
import ConsentList from "@/components/consent-list/ConsentList";

const CollectedConsentsPage = () => (
  <>
    <Typography variant="h2" fontSize="2rem" gutterBottom>
      Collected Consents
    </Typography>
    <ConsentList />
  </>
);

export default CollectedConsentsPage;

import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import { ConsentProvider } from "@/context/consent/ConsentProvider";
import { useResponsive } from "@/hooks/useResponsive";
import LoadingFallback from "@/components/ui/LoadingFallback";

const GiveConsent = lazy(() => import("@/pages/GiveConsent"));
const CollectedConsents = lazy(() => import("@/pages/CollectedConsents"));

const App: React.FC = () => {
  return (
    <Router>
      <ConsentProvider>
        <AppContent />
      </ConsentProvider>
    </Router>
  );
};

const AppContent: React.FC = () => {
  const { isTablet } = useResponsive();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h1" fontSize="1.5rem">
            Consent Management App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection={isTablet ? "column" : "row"} flexGrow={1}>
        <Box flexShrink={0} width={isTablet ? "100%" : "250px"}>
          <Sidebar />
        </Box>
        <Box flexGrow={1} p={2} minWidth={0}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<GiveConsent />} />
              <Route path="/consents" element={<CollectedConsents />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default App;

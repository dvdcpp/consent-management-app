import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box } from "@mui/material";
import { useConsents } from "@/context/consent/useConsents";
import { useResponsive } from "@/hooks/useResponsive";
import { usePagination } from "@/hooks/usePagination";
import ErrorCard from "@/components/ui/ErrorCard";
import ConsentListLoading from "./ConsentListLoading";

const ITEMS_PER_PAGE = 2;

const ConsentList: React.FC = () => {
  const { isTablet } = useResponsive();
  const { consents, isLoading, error, fetchConsents } = useConsents();
  const { page, totalPages, startIndex, endIndex, handleChangePage } = usePagination(consents.length, ITEMS_PER_PAGE);

  useEffect(() => {
    fetchConsents();
  }, [fetchConsents]);

  if (error) return <ErrorCard errorMessage={error} buttonText="Retry" onRetry={fetchConsents} />;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell width="25%" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell width="30%" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell width="45%" sx={{ fontWeight: "bold" }}>
                Consent given for
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <>
                <ConsentListLoading />
                <ConsentListLoading />
              </>
            ) : (
              consents.slice(startIndex, endIndex).map((consent, index) => (
                <TableRow key={index} className="truncate">
                  <TableCell width="25%">{consent.name}</TableCell>
                  <TableCell width="30%">{consent.email}</TableCell>
                  <TableCell width="45%">
                    {[
                      consent.permissions.receiveNewsletter && "Receive newsletter",
                      consent.permissions.showTargetedAds && "Be shown targeted ads",
                      consent.permissions.contributeToStatistics && "Contribute to anonymous visit statistics",
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination count={totalPages} page={page} onChange={handleChangePage} siblingCount={1} boundaryCount={1} size={isTablet ? "small" : "medium"} />
      </Box>
    </Box>
  );
};

export default ConsentList;

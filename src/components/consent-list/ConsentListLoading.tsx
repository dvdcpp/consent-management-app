import { TableRow, TableCell, Skeleton } from '@mui/material';

const ConsentListLoading: React.FC = () => (
  <TableRow>
    <TableCell width="25%"><Skeleton animation="wave" /></TableCell>
    <TableCell width="30%"><Skeleton animation="wave" /></TableCell>
    <TableCell width="45%"><Skeleton animation="wave" /></TableCell>
  </TableRow>
);

export default ConsentListLoading;
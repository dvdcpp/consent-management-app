import { Paper, Box, Typography, Button } from "@mui/material";

interface ErrorCardProps {
    errorMessage: string;
    buttonText: string;
    onRetry: () => void;
}

const ErrorCard = ({ errorMessage, buttonText, onRetry }: ErrorCardProps) => (
  <Paper>
    <Box textAlign="center" padding={4}>
      <Typography variant="h6" color="error" gutterBottom>
        {errorMessage}
      </Typography>
      <Button variant="contained" color="primary" onClick={onRetry}>
        {buttonText}
      </Button>
    </Box>
  </Paper>
);

export default ErrorCard;

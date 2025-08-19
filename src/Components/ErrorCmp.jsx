import { Box, Button, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

const ErrorCmp = ({ message }) => {
  return (
    <Box
      sx={{
        m: "auto",
        p: 4,
        textAlign: "center",
        borderRadius: 4,
      }}
    >
      <ErrorOutline color="error" sx={{ fontSize: 80, mb: 2 }} />

      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        color="error.main"
        sx={{ mb: 2 }}
      >
        Oops! Something went wrong
      </Typography>

      <Typography
        variant="body2"
        color="primary.contrastText"
        sx={{ mb: 4, fontSize: "1.1rem" }}
      >
        {message}
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => window.location.reload()}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontSize: "1rem",
          bgcolor: "secondary.main",
          color: "primary.main",
        }}
      >
        Try Again
      </Button>

    </Box>
  );
};

export default ErrorCmp;

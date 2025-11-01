import React from "react";
import { Box, Typography } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body1" color="error">
              ⚠️ Something went wrong while loading this section.
            </Typography>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

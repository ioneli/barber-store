import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box mt={10} display="flex" flexDirection="column" alignItems="center" gap={4}>
        <Typography variant="h3">Bine ai venit la Barber Shop</Typography>
        <Box display="flex" gap={4}>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate("/services")}>
            Servicii
          </Button>
          <Button variant="contained" color="secondary" size="large" onClick={() => navigate("/products")}>
            Produse
          </Button>
        </Box>
      </Box>
    </Container>
  );
}


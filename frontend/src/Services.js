import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const servicii = ["Tunsori", "Manichiură", "Vopsit păr"]; // poți adăuga mai multe

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4">Alege un serviciu</Typography>
        <Box mt={3} display="flex" flexDirection="column" gap={2}>
          {servicii.map((s, i) => (
            <Button key={i} variant="outlined" onClick={() => navigate(`/service/${s}`)}>
              {s}
            </Button>
          ))}
        </Box>
      </Box>
    </Container>
  );
}


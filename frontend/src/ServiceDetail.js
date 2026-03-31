import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  TextField
} from "@mui/material";

export default function ServiceDetail() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [barber, setBarber] = useState("");
  const [service, setService] = useState("");

  const barbers = ["Ionel", "Maria", "Alex"];

  const serviceDurations = {
    "Fast Fade": 30,
    "Low Fade + detalii": 45,
    "Consultare specialist": 60
  };

  const handleBook = async () => {
    if (!name || !phone || !barber) {
      alert("Completează toate câmpurile obligatorii!");
      return;
    }

    let duration = service ? serviceDurations[service] : 30;
    let serviceName = service || "Standard";

    const payload = {
      name,
      phone,
      barber,
      date: "2026-04-01", // temporar, mai târziu putem lua din input calendar
      hour: "10:00", // temporar
      service: serviceName,
      duration
    };

    try {
      const res = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if(res.status === 200){
        alert("Programare creată cu succes!");
        // reset inputuri
        setName("");
        setPhone("");
        setBarber("");
        setService("");
      } else {
        alert("Eroare: " + data.error);
      }

    } catch(err) {
      console.log(err);
      alert("Eroare la trimiterea programării!");
    }
  };

  return (
    <Container>
      <Box mt={5} display="flex" flexDirection="column" gap={2}>
        <Typography variant="h4">Programare</Typography>

        <TextField
          label="Nume"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <Select
          value={barber}
          onChange={(e) => setBarber(e.target.value)}
        >
          <MenuItem value="">Alege frizer</MenuItem>
          {barbers.map((b, i) => (
            <MenuItem key={i} value={b}>{b}</MenuItem>
          ))}
        </Select>

        <Select
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <MenuItem value="">Nu sunt hotărât</MenuItem>
          <MenuItem value="Fast Fade">Fast Fade</MenuItem>
          <MenuItem value="Low Fade + detalii">Low Fade + detalii</MenuItem>
          <MenuItem value="Consultare specialist">Consultare specialist</MenuItem>
        </Select>

        <Button variant="contained" onClick={handleBook}>
          Programează
        </Button>
      </Box>
    </Container>
  );
}

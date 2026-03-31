import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Card, CardContent, Button } from "@mui/material";

export default function DashboardClient() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:5000/appointments", { credentials: "include" });
    const data = await res.json();
    setAppointments(data);
  }

  const cancelAppointment = async (id) => {
    if(window.confirm("Vrei să anulezi această programare?")){
      await fetch(`http://localhost:5000/appointments/${id}`, { method: "DELETE", credentials: "include" });
      fetchAppointments();
    }
  }

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4">Programările mele</Typography>
        {appointments.length === 0 && <Typography mt={2}>Nu ai programări.</Typography>}
        {appointments.map(a => (
          <Card key={a.id} sx={{my:1}}>
            <CardContent>
              <strong>{a.barber}</strong> - {a.date} {a.hour} 
              <Button color="error" sx={{ml:2}} onClick={() => cancelAppointment(a.id)}>Anulează</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}


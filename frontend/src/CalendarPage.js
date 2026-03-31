import React, { useState, useEffect } from "react";import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField
} from "@mui/material";

export default function CalendarPage({ selectedService="Standard", duration=30 }) {
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("2026-04-01");
  const [slots, setSlots] = useState([]);
  const barbers = ["Ionel","Maria","Alex"];

  // fetch sloturi disponibile
  useEffect(() => {
    if(!barber) return;

    const fetchSlots = async () => {
      try {
        const res = await fetch("http://localhost:5000/available_slots", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({ barber, date, duration })
        });

        if(!res.ok) throw new Error(`Server error ${res.status}`);
        const data = await res.json();
        setSlots(data);
      } catch(err){
        console.log("Fetch error:", err);
        alert("Eroare la preluarea sloturilor: " + err);
      }
    };

    fetchSlots();
  }, [barber, date, duration]);

  const handleBookSlot = async (hour) => {
    const name = prompt("Nume client:");
    const phone = prompt("Telefon:");
    if(!name || !phone) return alert("Câmpuri obligatorii!");

    try {
      const res = await fetch("http://localhost:5000/appointments", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name,
          phone,
          barber,
          date,
          hour,
          service: selectedService,
          duration
        })
      });

      const data = await res.json();
      if(res.ok){
        alert("Programare creată!");
        setSlots(slots.filter(s=>s!==hour)); // blocăm slotul
      } else {
        alert("Eroare: " + data.error);
      }

    } catch(err){
      console.log(err);
      alert("Eroare la trimiterea programării!");
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={3}>Alege frizer și ora</Typography>

      <Select value={barber} onChange={(e)=>setBarber(e.target.value)} sx={{mt:2}}>
        <MenuItem value="">Alege frizer</MenuItem>
        {barbers.map((b,i)=><MenuItem key={i} value={b}>{b}</MenuItem>)}
      </Select>

      <TextField
        label="Selectează data"
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
        sx={{mt:2}}
      />

      <Typography variant="h6" mt={2}>Sloturi disponibile pentru {date}</Typography>
      {slots.length === 0 && <p>Alege frizer pentru a vedea sloturile</p>}
      {slots.map((s,i)=>(
        <Button key={i} variant="outlined" sx={{m:0.5}} onClick={()=>handleBookSlot(s)}>
          {s}
        </Button>
      ))}
    </Container>
  );
}



import React, { useEffect, useState } from "react";import { Container, Typography, Box, Button, TextField, Card, CardContent } from "@mui/material";

export default function DashboardAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");

  // Încarcă datele la montarea componentei
  useEffect(() => {
    fetchAppointments();
    fetchProducts();
  }, []);

  // ----------------- PROGRAMĂRI -----------------
  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:5000/appointments", { credentials: "include" });
    const data = await res.json();
    setAppointments(data);
  }

  const deleteAppointment = async (id) => {
    if(window.confirm("Vrei să ștergi această programare?")){
      await fetch(`http://localhost:5000/appointments/${id}`, { method: "DELETE", credentials: "include" });
      fetchAppointments();
    }
  }

  // ----------------- PRODUSE -----------------
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products", { credentials: "include" });
    const data = await res.json();
    setProducts(data);
  }

  const addProduct = async () => {
    if(!productName || !productPrice) return alert("Completează nume și preț!");
    await fetch("http://localhost:5000/products", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: productName, price: productPrice, description: productDesc })
    });
    setProductName(""); setProductPrice(""); setProductDesc("");
    fetchProducts();
  }

  const deleteProduct = async (id) => {
    if(window.confirm("Vrei să ștergi acest produs?")){
      await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE", credentials: "include" });
      fetchProducts();
    }
  }

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4">Dashboard Admin</Typography>

        {/* --- Programări --- */}
        <Box mt={3}>
          <Typography variant="h5">Programări</Typography>
          {appointments.map(a => (
            <Card key={a.id} sx={{my:1}}>
              <CardContent>
                <strong>{a.client}</strong> - {a.barber} - {a.date} {a.hour}
                <Button color="error" sx={{ml:2}} onClick={() => deleteAppointment(a.id)}>Șterge</Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* --- Produse --- */}
        <Box mt={5}>
          <Typography variant="h5">Produse</Typography>
          {products.map(p => (
            <Card key={p.id} sx={{my:1}}>
              <CardContent>
                <strong>{p.name}</strong> - {p.price} lei - {p.description}
                <Button color="error" sx={{ml:2}} onClick={() => deleteProduct(p.id)}>Șterge</Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* --- Adaugă produs --- */}
        <Box mt={3} display="flex" alignItems="center" gap={1}>
          <TextField label="Nume" value={productName} onChange={e => setProductName(e.target.value)} />
          <TextField label="Preț" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
          <TextField label="Descriere" value={productDesc} onChange={e => setProductDesc(e.target.value)} />
          <Button variant="contained" color="primary" onClick={addProduct}>Adaugă</Button>
        </Box>
      </Box>
    </Container>
  );
}


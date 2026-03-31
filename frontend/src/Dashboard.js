
import React, { useEffect, useState } from "react";
export default function DashboardAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");

  useEffect(() => {
    fetchAppointments();
    fetchProducts();
  }, []);

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:5000/appointments", { credentials: "include" });
    const data = await res.json();
    setAppointments(data);
  }

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products", { credentials: "include" });
    const data = await res.json();
    setProducts(data);
  }

  const deleteAppointment = async (id) => {
    await fetch(`http://localhost:5000/appointments/${id}`, { method: "DELETE", credentials: "include" });
    fetchAppointments();
  }

  const addProduct = async () => {
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
    await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE", credentials: "include" });
    fetchProducts();
  }

  return (
    <div>
      <h2>Dashboard Admin</h2>

      <h3>Programări</h3>
      {appointments.map(a => (
        <div key={a.id}>
          {a.client} - {a.barber} - {a.date} {a.hour}
          <button onClick={() => deleteAppointment(a.id)}>Șterge</button>
        </div>
      ))}

      <h3>Produse</h3>
      {products.map(p => (
        <div key={p.id}>
          {p.name} - {p.price} lei - {p.description}
          <button onClick={() => deleteProduct(p.id)}>Șterge</button>
        </div>
      ))}

      <h4>Adaugă produs</h4>
      <input placeholder="Nume" value={productName} onChange={e => setProductName(e.target.value)} />
      <input placeholder="Preț" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
      <input placeholder="Descriere" value={productDesc} onChange={e => setProductDesc(e.target.value)} />
      <button onClick={addProduct}>Adaugă produs</button>
    </div>
  );
}


import React, { useEffect, useState } from "react";
export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products", { credentials: "include" })
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2>Produse disponibile</h2>
      {products.map(p => (
        <div key={p.id}>
          {p.name} - {p.price} lei - {p.description}
        </div>
      ))}
    </div>
  );
}



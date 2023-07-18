import React, { useState, useEffect } from "react";
import './informacionstyle.css';

const InformacionProducto = () => {
  const [producto, setProducto] = useState([]);

  const obtenerProducto = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/1");
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setProducto(data);
      } else {
        console.error("Error al obtener los fabricantes");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };
  useEffect(() => {
    obtenerProducto();
    console.log(producto);
  }, []);
  return (
    <div style={{ margin: '10px 0 0 20%' }}>
      <div class="container"style={{ margin: '10% 0 0 15%' }}>
        <div class="images">
          <img src={producto.image} />
        </div>
        <div class="product">
          <p> {producto.category}</p>
          <h1> {producto.title}</h1>
          <h2>$ {producto.price}</h2>
          <p class="desc"> Descripcion:</p>
          <p class="desc"> {producto.description}</p>
        </div>
      </div>

    </div>
  )
}

export default InformacionProducto
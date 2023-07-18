import React, { useState, useEffect } from "react";

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
    <div style={{ margin: '10px 0 0 20%'}}>    {producto.title}
          
    </div>
  )
}

export default InformacionProducto
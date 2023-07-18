import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

export const Productos = () => {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProductos(data);
      } else {
        console.error("Error al obtener los fabricantes");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
    console.log(productos);
  }, []);

  return (
    <div>
      <div style={{margin: "10px 0 0 20%", textAlign:"center"}}>
        <h1>Productos Disponibles</h1>
        {<i style={{
              fontSize: "3rem",
              position: "fixed",
              top: 0,
              right: 0,
              transform: "revert-layer"}} 
              className="fa fa-shopping-cart fa-5"></i>}
      </div>
      <div
        style={{
          margin: "10px 0 0 20%",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent:"center"
        }}
      >
        {productos.map((producto) => (
          <Card sx={{ maxWidth: 400, flex: "1 0 30%" }}>
            <CardHeader title={producto.title} />
            <CardMedia
              component="img"
              height="180"
              style={{objectFit: "contain"}}
              image={producto.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="h6" color="gray">
                Precio: ${producto.price}
              </Typography>
              {<i style={{fontSize: "1.8rem",}} className="fa fa-info-circle"></i>}
            </CardContent>
            <CardActions disableSpacing></CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Productos;

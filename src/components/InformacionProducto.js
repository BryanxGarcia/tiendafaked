import React, { useState, useEffect } from "react";
import styles from './informacionstyle.module.css';
import { useParams } from 'react-router-dom';

const InformacionProducto = () => {
  const [producto, setProducto] = useState([]);
  const { id } = useParams();
  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate); // Número de estrellas completas
    const hasHalfStar = rate % 1 !== 0; // Si tiene media estrella

    // Estrellas completas
    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="fas fa-star"></i>);
    }
    // Media estrella
    if (hasHalfStar) {
        stars.push(<i key={fullStars} className="fas fa-star-half-alt"></i>);
    }
    // Estrellas vacías
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<i key={fullStars + (hasHalfStar ? 1 : 0) + i} className="far fa-star"></i>);
    }

    return stars;
};
  const obtenerProducto = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setProducto(data);
      } else {
        console.error("Error al obtener el producto");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };
  useEffect(() => {
    obtenerProducto();
  }, [id]);
  return (
      <div style={{ margin: '10px 0 0 20%' }}>
        <div className={styles.container} style={{ margin: '10% 0 0 15%' }}>
          <div className={styles.images}>
            <img src={producto.image} alt="Imagen del producto" />
          </div>
          <div className={styles.product}>
            <p>{producto.category}</p>
            <h1>{producto.title}</h1>
            {/* <div className="producto-rating">{renderStars(producto.rating.rate)}</div> */}
            <h2>$ {producto.price}</h2>
            <p className={styles.desc}>Descripcion:</p>
            <p className={styles.desc}>{producto.description}</p>
          </div>
        </div>
      </div>
    );
}

export default InformacionProducto
import React, { useState, useEffect } from "react";
import './Productos.css';
import { useNavigate } from 'react-router-dom';


export const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const navigate = useNavigate();

    const obtenerProductos = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (response.ok) {
                const data = await response.json();
                setProductos(data);
            } else {
                console.error("Error al obtener los productos");
            }
        } catch (error) {
            console.error("Error al comunicarse con la API", error);
        }
    };
    const obtenerCategorias = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products/categories");
            if (response.ok) {
                const data = await response.json();
                setCategorias(data);
            } else {
                console.error("Error al obtener los productos");
            }
        } catch (error) {
            console.error("Error al comunicarse con la API", error);
        }
    };


    const comprar = async (producto) => {
        try {
            // Envía una solicitud POST a la API para agregar un nuevo fabricante
            fetch('https://fakestoreapi.com/carts', {
                method: "POST",
                body: JSON.stringify({
                    userId: 5,
                    date: "2020-02-03",
                    products: [{ productId: producto.id, quantity: 1 }]
                })
            }).then(res => res.json())
                .then(json => console.log(json))
        } catch (error) {
            console.error("Error al comunicarse con la API", error);
        }
    };

    const handleClick = (id) => {
        navigate(`/informacion/${id}`);
    };

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
    useEffect(() => {
        obtenerProductos();
        obtenerCategorias();
    }, []);
    const buscarxCategoria =async (categoria) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${categoria}`);
            if (response.ok) {
                const data = await response.json();
                setProductos(data);
            } else {
                console.error("Error al obtener los productos");
            }
        } catch (error) {
            console.error("Error al comunicarse con la API", error);
        }};
    return (
        <div>
            <div style={{ margin: "10px 0 0 20%", textAlign: "center" }}>
                <h2>Categorias</h2>
                <div className="lista-cat">
                    {categorias.map((categoria) => (
                        <div className="cardCat" onClick={() => buscarxCategoria(categoria)}>
                            <h3 className="card-titleCat">{categoria}</h3>
                        </div>
                    ))}
                </div>

                <h2>Todos los Producto</h2>
                <div className="lista-productos">
                    {productos.map((producto) => (
                        <div className="producto" >
                            <img src={producto.image} alt={producto.title} className="producto-imagen" />
                            <div className="producto-info">
                                <h3 className="producto-nombre">{producto.title}</h3>
                                <div className="producto-rating">{renderStars(producto.rating.rate)}</div>

                                <p className="producto-precio">${producto.price}</p>
                            </div>
                            <div className="producto-botones">
                                <button className="producto-boton-compra" onClick={() => comprar(producto)}>Comprar</button>
                                <button className="producto-boton-detalles" onClick={() => handleClick(producto.id)}>
                                    Detalles
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Productos;

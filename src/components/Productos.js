import React, { useState, useEffect } from "react";
export const Productos = () => {

    const [productos, setProductos] = useState([]);

    const obtenerProductos = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (response.ok) {
                const data = await response.json();
                console.log(data)
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
        <div>Productos
            {productos.map(producto => (
                <div className="col-sm-6 col-md-4 col-lg-3" style={{ paddingBottom: "30px" }}>
                    <li key={producto.id}>
                        {producto.title}
                    </li>
                </div>
            ))}
        </div>

    )
}

export default Productos
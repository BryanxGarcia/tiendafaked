import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Modal from "react-modal";
import './TableProductos.css';

const TableProductos = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        title: "",
        price: "",
        category: "",
        description: ""
    });
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const abrirModal = (producto) => {
        setProductoSeleccionado(producto);
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setProductoSeleccionado(null);
        setMostrarModal(false);
    };
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

    const eliminarProducto = async (id) => {
        try {
            await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: "DELETE"
            }).then(res => res.json())
                .then(json => {
                    if (json) {
                        toast.success(
                            `El producto con id ${json.id} fue eliminado correctamente`,
                            {
                                duration: 6000,
                            }
                        );
                    } else {
                        console.error("Error al eliminar el producto");
                    }
                });

        } catch (error) {
            console.error("Error al comunicarse con la API", error);
        }
    };

    const actualizarProducto = () => {
        fetch(`https://fakestoreapi.com/products/${productoSeleccionado.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productoSeleccionado)
        })
            .then(res => res.json())
            .then(json => {
                cerrarModal();
                toast.success(
                    `El producto con id ${json.id} fue actualizado correctamente`,
                    {
                        duration: 6000,
                    }
                );
            })
            .catch(error => {
                console.error("Error al comunicarse con la API", error);
            });
    };

    const agregarProducto = async () => {
        try {
            await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoProducto)
            }).then(res => res.json())
                .then(json => {
                    if (json) {
                        toast.success(
                            `El producto ${json.title} se creo correctamente con el id  ${json.id}  `,
                            {
                                duration: 6000,
                            });
                        setNuevoProducto({
                            title: "",
                            price: "",
                            category: "",
                            description: ""
                        });
                    } else {
                        console.error("Error al eliminar el producto");
                    }
                });
        } catch (error) {
            console.error("Error al comunicarse con la API", error);
        }
    };

    useEffect(() => {
        obtenerProductos();
        obtenerCategorias();
    }, []);

    return (
        <div className="container">
            <Toaster />
            <h2>Agregar Producto</h2>
            <div className="productos-form">
                <input
                    type="text"
                    placeholder="Título"
                    value={nuevoProducto.title}
                    onChange={(e) =>
                        setNuevoProducto({ ...nuevoProducto, title: e.target.value })
                    }
                    required
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={nuevoProducto.price}
                    onChange={(e) =>
                        setNuevoProducto({ ...nuevoProducto, price: e.target.value })
                    }
                    required
                />
                <select
                    value={nuevoProducto.category}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, category: e.target.value })}
                >
                    {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Descripción"
                    value={nuevoProducto.description}
                    onChange={(e) =>
                        setNuevoProducto({ ...nuevoProducto, description: e.target.value })
                    }
                    required
                />
                <button onClick={agregarProducto}>Agregar</button>
            </div>
            <h2>Tabla de productos</h2>
            <div className="productos-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.title}</td>
                                <td>{producto.price}</td>
                                <td>{producto.category}</td>
                                <td>{producto.description}</td>
                                <td>
                                    <button className="buttonDelete" onClick={() => eliminarProducto(producto.id)}>
                                        Eliminar
                                    </button>
                                    <button className="buttonUpdate"
                                        onClick={() => abrirModal(producto)}
                                    >
                                        Actualizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={mostrarModal}
                onRequestClose={cerrarModal}
                contentLabel="Modal de Actualización"
            >
                {productoSeleccionado && (
                    <>
                        <h2>Actualizar Producto</h2>
                        <div className="productos-form">
                            <input
                                type="text"
                                placeholder="Título"
                                value={productoSeleccionado.title}
                                onChange={(e) =>
                                    setProductoSeleccionado({
                                        ...productoSeleccionado,
                                        title: e.target.value
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Precio"
                                value={productoSeleccionado.price}
                                onChange={(e) =>
                                    setProductoSeleccionado({
                                        ...productoSeleccionado,
                                        price: e.target.value
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Categoría"
                                value={productoSeleccionado.category}
                                onChange={(e) =>
                                    setProductoSeleccionado({
                                        ...productoSeleccionado,
                                        category: e.target.value
                                    })
                                }
                            />
                            <textarea
                                placeholder="Descripción"
                                value={productoSeleccionado.description}
                                onChange={(e) =>
                                    setProductoSeleccionado({
                                        ...productoSeleccionado,
                                        description: e.target.value
                                    })
                                }
                            />
                            <button className="buttonUpdate" classonClick={cerrarModal}>Cerrar</button>
                            <button onClick={actualizarProducto}>Guardar</button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default TableProductos;
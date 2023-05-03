import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import swal from 'sweetalert2';

function List() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // fetchProducts();
        axios.get('/api/products').then((res) => {
            if (res.status === 200) {
                setProducts(res.data.products);
            }
        });
    }, []);

    // const fetchProducts = async () => {
    //     await axios.get('http://localhost:80/api/products').then(({ data }) => {
    //         setProducts(data);
    //     })
    // }

    return (

        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <Link className='btn btn-primary' to={'/product/create'}>Create</Link>
                </div>
                <div className='col-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <table className='table table-border' border={1}>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.title}</td>
                                            <td>{product.description}</td>
                                            <td >
                                                <img src={`http://localhost:8000/storage/product/image/${product.image}`} alt={product.title} style={{ width: "50px" }} />
                                            </td>
                                            <td>
                                                <Link to={`/product/edit/${product.id}`} className='btn btn-success'>Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;

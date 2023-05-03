import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function Create() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState();
    const [validationError, setValidationError] = useState({});

    const createProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        axios.post('/api/products', formData).then(({ data }) => {
            Swal.fire({ icon: 'success', text: data.message });
            navigate('/')
        }).catch((error) => {
            if (error.response.status === 422) {
                setValidationError(error.response.data.errors);
            } else {
                Swal.fire({ text: error.response.data.message, icon: 'error' });
            }
        })

        // .catch(({ res }) => {
        //     if (res.status === 422) {
        //         setValidationError(res.data.errors);
        //     } else {
        //         Swal.fire({ text: res.data.message, icon: 'error' });
        //     }
        // })

    }

    const changeHandler = (e) => {
        setImage(e.target.files[0]);
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='card-title'>Create Product</h4>
                            <Form onSubmit={createProduct}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='title'>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type='text' value={title} onChange={(e) => {
                                                setTitle(e.target.value);
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group controlId='description'>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as='textarea' value={description} onChange={(e) => {
                                                setDescription(e.target.value);
                                            }} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group controlId='image'>
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control type='file' onChange={changeHandler} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button type="submit">Submit</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create
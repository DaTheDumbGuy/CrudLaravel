import './App.css';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ProductList from './components/product/ProductList';
import Create from './components/product/Create';
axios.defaults.baseURL = 'http://localhost:8000';

function App() {

  return (
    <Router>
      <Navbar bg="primary" >
        <Container>
          <Link className='Navbar-brand text-white text-decoration-none' to={'/'} >Reynald Company</Link>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Row>
          <Col md="12">
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route exact path="/product/create" element={<Create />} />
              {/* <Route exact path="/api/products" element={<List />} /> */}
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;

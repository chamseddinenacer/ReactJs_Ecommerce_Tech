import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../CartProvider'; // Importer le contexte

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Fonction pour ajouter au panier

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error('Erreur de chargement:', error));
  }, [id]);

  if (!product) return <div>Chargement...</div>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid rounded shadow-lg"
          />
        </Col>
        <Col md={6}>
          <h1 className="mb-3">{product.name}</h1>
          <h2 className="text-primary mb-4">{product.price} €</h2>
          <p className="lead text-muted mb-4">{product.description}</p>

          <div className="d-flex gap-3">
            <Button
              variant="primary"
              size="lg"
              disabled={!product.inStock}
              onClick={() => addToCart(product)} 
            >
              Ajouter au Panier
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailPage;

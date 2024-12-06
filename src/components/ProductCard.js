import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted">
          {product.description.substring(0, 100)}...
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <h5 className="mb-0">{product.price} €</h5>
          <Badge bg={product.inStock ? "success" : "danger"}>
            {product.inStock ? "En Stock" : "Rupture"}
          </Badge>
        </div>
        <div className="d-flex mt-3">
          <Link 
            to={`/product/${product.id}`} 
            className="btn btn-outline-primary me-2"
          >
            Détails
          </Link>
          <Button 
            variant="primary" 
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            Ajouter au Panier
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
import React from 'react';
import { useCart } from '../CartProvider';
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap';

function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Votre Panier</h1>
      {cartItems.length > 0 ? (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row className="align-items-center">
                <Col md={6}>
                  <h5>{item.name}</h5>
                  <p className="text-muted">Prix : {item.price} €</p>
                </Col>
                <Col md={3}>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <Col md={3} className="text-end">
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    Supprimer
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="text-end">
            <h4>Total : {totalPrice.toFixed(2)} €</h4>
            <Button variant="success" className="mt-2">
              Passer à la caisse
            </Button>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <p className="text-muted">Votre panier est vide.</p>
      )}
    </Container>
  );
}

export default CartPage;

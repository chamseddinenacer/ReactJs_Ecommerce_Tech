import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Isimg E-com</h5>
            <p>Votre destination de confiance pour l'électronique moderne.</p>
          </Col>
          <Col md={4}>
            <h5>Liens Rapides</h5>
            <ul className="list-unstyled">
              <li>À Propos</li>
              <li>Contact</li>
              <li>Politique de Retour</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contactez-nous</h5>
            <p>Email: chamseddine.nacer@isimg.tn</p>
            <p>Téléphone: +216 29225523
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            © 2024 isimg . Tous droits réservés.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
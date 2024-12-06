import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Carousel, ListGroup } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Tous', 'Phones', 'Audio', 'Télévisions']);
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Fetch products from API
  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erreur de chargement:', error));
  }, []);

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'Tous' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    console.log('Ajouté au panier:', product);
  };

  return (
    <Container fluid className="py-5">
      {/* Slider Section */}
      <Carousel className="mb-5">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://ma.jumia.is/cms/000_2024/0000_Aout/Revamp_cat_Informatique/1168x384_copy_7.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Découvrez les dernières innovations</h3>
            <p>Explorez notre collection de produits technologiques tendance.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://ma.jumia.is/cms/000_2024/000011_Novembre/BlackFriday24/BO/Xiaomi/A3xsliderxiaomi.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Smartphones et Gadgets Modernes</h3>
            <p>Des designs élégants et des performances haut de gamme.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://ma.jumia.is/cms/000_2024/0000_Aout/Revamp_cat_Informatique/1168x384_copy_9.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Profitez d'une qualité d'image exceptionnelle</h3>
            <p>Nos téléviseurs 4K offrent des détails incroyables.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Main Content */}
      <Row>
        {/* Sidebar Section */}
        <Col md={2} style={{ marginTop: '6%' }}>
          <div className="bg-light p-4 rounded">
            <h4>Catégories</h4>
            <ListGroup>
              {categories.map(category => (
                <ListGroup.Item
                  key={category}
                  action
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      
        {/* Product Grid Section */}
        <Col md={9} style={{ marginLeft: '3%' }}>
        <div className="text-center mb-5">
            <h1 className="display-4 mb-3">Tech E-com</h1>
            <p className="lead text-muted">
              Découvrez les dernières innovations technologiques
            </p>
          </div>

          <Row xs={1} md={3} className="g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Col key={product.id}>
                  <ProductCard 
                    product={product} 
                    onAddToCart={addToCart} 
                  />
                </Col>
              ))
            ) : (
              <Col>
                <div className="text-center">
                  <p className="text-muted">Aucun produit trouvé dans cette catégorie.</p>
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

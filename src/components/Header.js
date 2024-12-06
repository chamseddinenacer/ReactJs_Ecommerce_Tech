import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../CartProvider'; // Importer le contexte du panier

function Header() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer l'utilisateur depuis le localStorage dès que le composant est monté
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Ajouter un événement pour écouter les changements dans le localStorage
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Nettoyer l'événement lors du démontage du composant
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    // Effacer l'utilisateur du localStorage
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Isimg E-com
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white">
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/produits" className="text-white">
              Produits
            </Nav.Link>
            <Nav.Link as={Link} to="/categories" className="text-white">
              Catégories
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/cart" className="position-relative d-flex align-items-center text-white">
              <FaShoppingCart size={20} className="me-1" aria-label="Panier" />
              Panier
              {cartItemCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  aria-label={`${cartItemCount} articles dans le panier`}
                >
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <Nav.Link className="d-flex align-items-center text-white ms-3">
                <FaUser size={20} className="me-1" aria-label="Utilisateur connecté" />
                {user.username}
                <button onClick={handleLogout} className="btn btn-link text-white ms-3">
                  Déconnexion
                </button>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="d-flex align-items-center text-white ms-3">
                <FaUser size={20} className="me-1" aria-label="Connexion utilisateur" />
                Connexion
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

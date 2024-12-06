import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importer axios

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fonction pour gérer la connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
    
      const response = await axios.get('http://localhost:3001/users');
      const user = response.data.find(user => user.email === email && user.password === password);

      if (user) {
       
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
        window.location.reload();   
         // Rediriger vers la page d'accueil
      } else {
        // Sinon, afficher un message d'erreur
        setError('Identifiants invalides. Veuillez réessayer.');
      }
    } catch (err) {
      // Si une erreur se produit lors de la requête
      console.error(err);
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Connexion</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}  {/* Afficher un message d'erreur */}

      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Se connecter
        </Button>
      </Form>

      <div className="text-center mt-3">
        <p>Vous n'avez pas de compte ? <a href="/register">Inscrivez-vous ici</a></p>
      </div>
    </Container>
  );
}

export default Login;

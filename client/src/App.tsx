import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

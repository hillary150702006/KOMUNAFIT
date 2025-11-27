import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './routes/Routing'
 import Navbar from './components/Navbar'; 
  import Footer from './components/Footer';

function App() {
  return (
   <Router>
      <Navbar />
      <main>
        <Routing />
      </main>
      <Footer />
  </Router>
  )
}

export default App

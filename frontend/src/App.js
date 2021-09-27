import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteDistance from './components/RouteDistance';
import Navigation from './components/Navigation';
import Home from './components/Home';

function App() {
    return (
      <Router>
        <Navigation/>
            <Route exact path="/" component={Home}/>
            <Route path="/cotizador" component={RouteDistance}/>   
      </Router>
    );
  }
  
  export default App;
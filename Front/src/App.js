import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Home from './components/Home';
import About from './components/About';
import Agents from './components/Agents';
import Properties from './components/Properties';
import Property from './components/Property';
import Footer from './shared/Footer';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Details from './components/Details';
import Login from './components/Login';
// import CreateAccount from './components/CreateAccount';

function App() {
  const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/agents">
            <Agents />
          </Route>
          <Route exact path="/properties">
            <Properties />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/details">
            <Details />
          </Route>
          <Route exact path="/property">
            <Property />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
          
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>  
  );
}

export default App;

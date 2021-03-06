import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Script from './components/Script';
import Properties from './components/Properties';
import Property from './components/Property';
import Footer from './shared/Footer';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Details from './components/Details';
import Login from './components/Login';
import Register from './components/Register';
import LoginAdmin from './components/LoginAdmin';
import PrivateRoute from './PrivateRoute';
// import CreateAccount from './components/CreateAccount';
import Funding from './components/Funding';

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
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute exact path="/funding" component={Funding} authed={localStorage.getItem('user')} />
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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/loginAdmin">
            <LoginAdmin />
          </Route>
          <Route exact path="/script">
            <Script />
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

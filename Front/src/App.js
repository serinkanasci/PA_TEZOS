import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Home from './components/Home';
import About from './components/About';
import Agents from './components/Agents';
import Property from './components/Property';
import Footer from './shared/Footer';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/agents">
            <Agents />
          </Route>
          <Route exact path="/property">
            <Property />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

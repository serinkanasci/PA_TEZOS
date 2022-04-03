import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return {
      
    }
  }, []);

  return (
    <>
      <nav>
        <img className="logo" src="/assets/LOGO.png" alt="Logo" />
        {
          button && <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes size='30' /> : <FaBars size='30' />}
          </div>
        }
        <div className='nav-menu'>
          <Link className="nav-item" to="/" onClick={closeMobileMenu}>HOME</Link>
          <Link className="nav-item" to="/about" onClick={closeMobileMenu}>ABOUT</Link>
          <Link className="nav-item" to="/agents" onClick={closeMobileMenu}>AGENT</Link>
          <Link className="nav-item" to="/property" onClick={closeMobileMenu}>PROPERTY</Link>
          <Link className="nav-item" to="/contact" onClick={closeMobileMenu}>CONTACT</Link>
        </div>
      </nav>
      <div className={click ?   'nav-menu-open':'nav-menu-close'}>
          <Link className="nav-item" to="/" onClick={closeMobileMenu}>HOME</Link>
          <Link className="nav-item" to="/about" onClick={closeMobileMenu}>ABOUT</Link>
          <Link className="nav-item" to="/agents" onClick={closeMobileMenu}>AGENT</Link>
          <Link className="nav-item" to="/property" onClick={closeMobileMenu}>PROPERTY</Link>
          <Link className="nav-item" to="/contact" onClick={closeMobileMenu}>CONTACT</Link>
      </div>
    </>
  );
}

export default Navbar;
import Navbar from "./components/Navbar";
import ManageFund from "./components/ManageFund";
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

class Funding extends Component {

  render() {

     if (jwt_decode(localStorage.getItem('usertoken')).exp < Date.now() / 1000) {
      localStorage.setItem('user',false);
      window.location.href=process.env.REACT_APP_BACK+"/login";
    } 

    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="container pt-10 mx-auto">
          <div className="flex justify-center">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
            
            </h1>
          </div>
          <div className="mt-20 flex justify-center">
            <ManageFund />
          </div>
        </div>
      </div>
    );
    
    
    }
  }

export default Funding;

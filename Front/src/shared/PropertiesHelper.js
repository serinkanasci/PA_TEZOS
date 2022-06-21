import '../styles/propertieshelper.css';
import React, { Component } from 'react';

class PropertiesHelper  extends Component {
   handleClick(nft_id){
      console.log("HANDLE CLICK");
      console.log(nft_id)
      //this.state.nftclicked = nft_id;
      //this.state.detail = true;
    }
    render() {
      return ( 
         <div>
            <img className="image" src={this.props.image} alt=""/>    
            <h2 className="info">{this.props.info}</h2>
         </div>
      );
    }
    
}
 
export default PropertiesHelper;
import Navbar from "./Navbar";
import ManageNFT from "./ManageNFT";
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { getEtpsName, getNFTs, customGet } from '../api/functions';
import config from "../config";
import '../styles/properties.css';
import '../styles/property.css';
import PropertiesHelper from '../shared/PropertiesHelper'
const preferredNetwork = "ithacanet";
const options = {
name: "NFT",
iconUrl: "https://tezostaquito.io/img/favicon.png",
preferredNetwork: preferredNetwork,
};
const wallet = new BeaconWallet(options);
const rpcURL = "https://ithacanet.ecadinfra.com";
const tezos = new TezosToolkit(rpcURL);

class Details extends Component {
    _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      entreprise: '',
      nft:[],
      valid:"",
      varTab:[],
      detail:false,
      nftclicked:1,
      name:"DEFAULT",
      attr1:"DEFAULT",
      image:"assets/home3.png"
    }


    this.isAgent = this.isAgent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderNFTs = this.renderNFTs.bind(this);
  }

  checkIfWalletConnected = async (wallet) => {
    await wallet
    .requestPermissions({ network: { type: 'ithacanet' } })
    .then((_) => wallet.getPKH())
    .then((address) => console.log(`Your address: ${address}`));
    tezos.setWalletProvider(wallet);
};


handleClick(nft_id){
  console.log("HANDLE CLICK");
  console.log(nft_id)
  //this.state.nftclicked = nft_id;
  //this.state.detail = true;
  this.setState({detail:true});
  this.setState({nftclicked:nft_id});
}

 getDetails (nft){
   console.log("getNfts");
  tezos.contract.at(config.contractAddress).then((myContract) => {
      return myContract
        .storage()
        .then((myStorage) => {
          const nftT = myStorage["nfts"].get(''+this.props.nft_id+'');
          console.log("NFT T ", nftT);
          if(typeof nftT !== 'undefined'){
            if(nftT.address_uri.startsWith("https")){
              console.log("URI", nftT.address_uri);

              customGet(nftT.address_uri).then( res =>{
                console.log("RES  ", res);
                if (typeof res !== "undefined"){
                    console.log("details1",res);
                    console.log("details",res.name,res.image);
                  this.setState({name:res.name, image:res.image});
                 // return(<PropertiesHelper image="assets/home3.png" info="Housing 3"/>);
                   // this.setState({entreprise:agent.agency}); <PropertiesHelper image={imageT} info={res.name}/>
              }
              else{
                return null;
              }
            });
            }
            else{
              return null;
            }
            
          }
        })
      }     )
 }

      renderNFTs(){
        console.log("render nfts");
       // await this.checkIfWalletConnected(wallet);
        const tezos = new TezosToolkit(rpcURL);
        tezos.setWalletProvider(wallet);
        console.log(config.contractAddress);
          if(typeof this.props.nft !== "undefined"){
            return this.props.nft.map((nft,index) => {
              console.log("RENDER NFTS", this.state.varTab[index]);
              let imageT= this.state.varTab[index];
              if(typeof imageT !== "undefined"){
                return(<div className="card" onClick={() => this.handleClick(nft.id)} ><PropertiesHelper image={imageT[0]} info={imageT[1]}  /></div>);
              }
              else{
                return(<PropertiesHelper image={""} info={""}/>);
              }
              
              
                // console.log(nft.creator_etps);
                // tezos.contract.at(config.contractAddress).then((myContract) => {
                //   return myContract
                //     .storage()
                //     .then((myStorage) => {
                //       const nftT = myStorage["nfts"].get(''+nft.id+'');
                //       if(typeof nftT !== 'undefined'){
                //         if(nftT.address_uri.startsWith("http")){
                //           customGet(nftT.address_uri).then( res =>{
                //             console.log(res)
                //             if (typeof res !== "undefined"){
                //             if(res.length === 1){
                //               const imageT = res.image;
                //               return(<PropertiesHelper image="assets/home3.png" info="Housing 3"/>);
                //                // this.setState({entreprise:agent.agency}); <PropertiesHelper image={imageT} info={res.name}/>
                //             }
                //           }
                //           else{
                //             return null;
                //           }
                //         });
                //         }
                //         else{
                //           return null;
                //         }
                        
                //       }
                //     })
                  
                //     //.catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`) );
                //   })
                
                
            });
          }

          return null;
      
          
    }



    isAgent = async () => {
        await this.checkIfWalletConnected(wallet)
        const account = await wallet.client.getActiveAccount();
        console.log("avant")
        if (account) {
          const tezos = new TezosToolkit(rpcURL);
          tezos.setWalletProvider(wallet);
          console.log(config.contractAddress);
          tezos.contract.at(config.contractAddress).then((myContract) => {
            return myContract
              .storage()
              .then((myStorage) => {
                console.log("acc addr : ");
                console.log(account.address)
                const agent = myStorage["mapping_agent"].get(account.address);
                if(typeof agent === 'undefined'){
                    window.location.href = process.env.REACT_APP_FRONT+"/login";
                }
                if (agent.is_ban !== false){
                    window.location.href = process.env.REACT_APP_FRONT+"/login";
                }
                
                getEtpsName(agent.agency).then( res =>{
                    console.log("length",res.length );
                    if(res.length === 1){
                        this.setState({entreprise:agent.agency});
                    }
                    else{
                        window.location.href=process.env.REACT_APP_FRONT+"/login";
                    }
                });

                
                this.setState({page:true});
              })
              .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`) );
          })
        }
      };
    componentDidMount() {
        this._isMounted = true;
        if (jwt_decode(localStorage.getItem('usertoken')).exp < Date.now() / 1000) {
            localStorage.setItem('user',false);
            window.location.href=process.env.REACT_APP_FRONT+"/login";
          } 
          console.log("details1",this.props.var.attributes[0]["trait_type"]+" "+this.props.var.attributes[0]["value"]);
          var txt = this.props.var.attributes[0]["trait_type"]+" : "+this.props.var.attributes[0]["value"];
         this.setState({name:this.props.var.name, image:this.props.var.image, attr1:txt});
        
      }
    
       componentWillUnmount() {
        this._isMounted = false;
      }

  render() {
      return (
        <div className="bg-black min-h-screen">
           <div>
            <img className="image" src={this.state.image} alt=""/>    
            <h2 className="info">{this.state.name}</h2>
            <h2 className="info">{this.state.attr1}</h2>
         </div>
        </div>
      );
    
    
    }
  }

export default Details;

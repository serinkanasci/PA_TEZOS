import Navbar from "./Navbar";
import ManageNFT from "./ManageNFT";
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { getEtpsName, getNFTs } from '../api/functions';
import config from "../config";
import '../styles/properties.css';
import '../styles/property.css';
import PropertiesHelper from '../shared/PropertiesHelper';

const preferredNetwork = "ithacanet";
const options = {
name: "NFT",
iconUrl: "https://tezostaquito.io/img/favicon.png",
preferredNetwork: preferredNetwork,
};
const wallet = new BeaconWallet(options);
const rpcURL = "https://ithacanet.ecadinfra.com";
const tezos = new TezosToolkit(rpcURL);

class Agent extends Component {
    _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      entreprise: '',
      nft:[],
      valid:""
    }


    this.isAgent = this.isAgent.bind(this);
    this.renderNFTs = this.renderNFTs.bind(this);
  }



  renderNFTs(){
      console.log("nft",this.props.nft);
      if(typeof this.props.nft !== "undefined"){
        return this.props.nft.map((nft,index) => {
            console.log("on rentre");
            return(<div><PropertiesHelper image="assets/home3.png" info={nft.creator_etps}/><PropertiesHelper image="assets/home3.png" info={nft.creator_etps}/><PropertiesHelper image="assets/home3.png" info={nft.creator_etps}/><PropertiesHelper image="assets/home3.png" info={nft.creator_etps}/></div>);
            
        });
      }

      return null;
   
      
}

    checkIfWalletConnected = async (wallet) => {
        await wallet
        .requestPermissions({ network: { type: 'ithacanet' } })
        .then((_) => wallet.getPKH())
        .then((address) => console.log(`Your address: ${address}`));
        tezos.setWalletProvider(wallet);
    };

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
        this.isAgent()
        
      }
    
       componentWillUnmount() {
        this._isMounted = false;
      }

  render() {

    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="container pt-10 mx-auto">
          <div className="flex justify-center">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
            
            </h1>
          </div>
          <div className="mt-20 flex justify-center">
            <ManageNFT creator_etps={this.state.entreprise} />
          </div>
          <div className="all-cards">
           {this.renderNFTs()}
        </div>
        </div>
      </div>
    );
    
    
    }
  }

export default Agent;

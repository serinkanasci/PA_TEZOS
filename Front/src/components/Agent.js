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
import PropertiesHelper from '../shared/PropertiesHelper';
import Details from './Details';
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
      valid:"",
      varTab:[],
      detail:false,
      nftclicked:1,
      detailT:[]
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

 getNfts (nft){
   console.log("getNfts");
  tezos.contract.at(config.contractAddress).then((myContract) => {
      return myContract
        .storage()
        .then((myStorage) => {
          const nftT = myStorage["nfts"].get(''+nft.id+'');
          console.log("NFT T ", nftT);
          if(typeof nftT !== 'undefined'){
            if(nftT.address_uri.startsWith("https")){
              console.log("URI", nftT.address_uri);

              customGet(nftT.address_uri).then( res =>{
                console.log("RES  ", res);
                if (typeof res !== "undefined"){
                  const imageT = res.image;
                  const name = res.name;
                  var tabTemp = this.state.varTab;
                  tabTemp[nft.id -1] = [imageT, name];
                  console.log("TAB TEMP: ", tabTemp);
                  this.setState({varTab:tabTemp});
                  this.setState({detailT:res});
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
                return(<div className="card" onClick={() => this.handleClick(this.state.detailT)} ><PropertiesHelper image={imageT[0]} info={imageT[1]}  /></div>);
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
        this.isAgent()
        this.props.nft.forEach((nft,index) => {
          console.log("constructor");
          this.getNfts(nft);
          var temp = this.state.varTab;
          temp.push(('assets/home3.png',"DEFAULT"));

          temp[temp.length-1] = ['assets/home3.png',"DEFAULT"];
         // console.log("TEMP ",temp);

          this.setState({ varTab: temp })
        });
        
      }
    
       componentWillUnmount() {
        this._isMounted = false;
      }

  render() {

    if(this.state.detail){
      return (
      <Details var={this.state.nftclicked}/>);
    }
    else{
      return (
        <div className="bg-black min-h-screen">
          <Navbar />
          <div className="container pt-10 mx-auto">
            <div className="flex justify-center">
              <h1 onClick={(event) => this.handleClick(1)} className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
              
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
  }

export default Agent;

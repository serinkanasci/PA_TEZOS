import Navbar from "./Navbar";
import ManageFund from "./ManageFund";
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { getEtpsName, upload, customGet, getNFT } from '../api/functions';
import config from "../config";
import '../styles/properties.css';
import '../styles/property.css';
import Details from './DetailsF';

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

class Funding extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      entreprise: '',
      nft: [],
      valid: "",
      varTab: [],
      detail: false,
      nftclicked: 1,
      detailT: [],
      selectedFile: null,
      nftP:{}
    }


    this.isAgent = this.isAgent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderNFTs = this.renderNFTs.bind(this);
    this.handler = this.handler.bind(this);
    this.getNfts = this.getNfts.bind(this);
    this.getNftsS = this.getNftsS.bind(this);
  }

  checkIfWalletConnected = async (wallet) => {
    await wallet
      .requestPermissions({ network: { type: 'ithacanet' } })
      .then((_) => wallet.getPKH())
      .then((address) => console.log(`Your address: ${address}`));
    tezos.setWalletProvider(wallet);
  };


  handleClick(index) {
    console.log("HANDLE CLICK");
    //this.state.nftclicked = nft_id;
    //this.state.detail = true;
    this.getNftsS(index);
  }

  getNfts(nft) {
    console.log("getNfts");
    console.log(nft)
    tezos.contract.at(config.contractAddress).then((myContract) => {
      return myContract
        .storage()
        .then((myStorage) => {
          const nftT = myStorage["nfts"].get('' + nft.id + '');
          console.log("NFT T ", nftT);
          if (typeof nftT !== 'undefined') {
            if (nftT.address_uri.startsWith("https")) {
              console.log("URI", nftT.address_uri);

              customGet(nftT.address_uri).then(res => {
                console.log("RES  ", res);
                if (typeof res !== "undefined") {
                  const imageT = res.image;
                  const name = res.name;
                  var tabTemp = this.state.varTab;
                  tabTemp[nft.id - 1] = [imageT, name];
                  console.log("TAB TEMP: ", tabTemp);
                  this.setState({ varTab: tabTemp });
                  this.setState({ detailT: res });
                  // return(<PropertiesHelper image="assets/home3.png" info="Housing 3"/>);
                  // this.setState({entreprise:agent.agency}); <PropertiesHelper image={imageT} info={res.name}/>
                }
                else {
                  return null;
                }
              });
            }
            else {
              return null;
            }

          }
        })
    })
  }

  getNftsS(nft) {
    console.log("getNfts");
    console.log(nft)
    tezos.contract.at(config.contractAddress).then((myContract) => {
      return myContract
        .storage()
        .then((myStorage) => {
          console.log("NFT A ",);
          var n = nft+1;
          const nftT = myStorage["nfts"].get('' + n + '');
          console.log("NFT T ", nftT.address_uri);
          if (typeof nftT !== 'undefined') {
            if (nftT.address_uri.startsWith("https")) {
              console.log("URI", nftT);

              customGet(nftT.address_uri).then(res => {
                console.log("RESS  ", nftT);
                if (typeof res !== "undefined") {
                  this.setState({ nftclicked: res });
                  getNFT(n).then(res => {
                    console.log(res);
                    this.setState({ nftP: res[0] }); 
                    this.setState({ detail: true });       
                  });
                  // return(<PropertiesHelper image="assets/home3.png" info="Housing 3"/>);
                  // this.setState({entreprise:agent.agency}); <PropertiesHelper image={imageT} info={res.name}/>
                }
                else {
                  return null;
                }
              });
            }
            else {
              return null;
            }

          }
        })
    })
  }

  renderNFTs() {
    console.log("render nfts");
    // await this.checkIfWalletConnected(wallet);
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    console.log(config.contractAddress);
    console.log("nft funct");
    console.log(this.props.nft);
    if (typeof this.props.nft !== "undefined") {
      return this.props.nft.map((nft, index) => {
        console.log("RENDER NFTS", this.state.varTab[nft.id-1]);
        let imageT = this.state.varTab[nft.id-1];
        if (typeof imageT !== "undefined") {
          console.log("test user");
          console.log(this.props.user);
          return (<div className="card" onClick={() => this.handleClick(nft.id-1)} ><PropertiesHelper image={imageT[0]} info={imageT[1]} info2={nft.price} /></div>);
          
        }
        else {
          return (<PropertiesHelper image={""} info={""} />);
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
            if (typeof agent === 'undefined') {
              window.location.href = process.env.REACT_APP_FRONT + "/login";
            }
            if (agent.is_ban !== false) {
              window.location.href = process.env.REACT_APP_FRONT + "/login";
            }

            getEtpsName(agent.agency).then(res => {
              console.log("length", res.length);
              if (res.length === 1) {
                this.setState({ entreprise: agent.agency });
              }
              else {
                window.location.href = process.env.REACT_APP_FRONT + "/login";
              }
            });


            this.setState({ page: true });
          })
          .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
      })
    }
  };


  componentDidMount() {
    this._isMounted = true;
    if (jwt_decode(localStorage.getItem('usertoken')).exp < Date.now() / 1000) {
      localStorage.setItem('user', false);
      window.location.href = process.env.REACT_APP_FRONT + "/login";
    }
    this.props.nft.forEach((nft, index) => {
      console.log("constructor");
      this.getNfts(nft);
      var temp = this.state.varTab;
      temp.push(('assets/home3.png', "DEFAULT"));

      temp[temp.length - 1] = ['assets/home3.png', "DEFAULT"];
      // console.log("TEMP ",temp);

      this.setState({ varTab: temp })

      
    });
    console.log("clicked");
    console.log(this.state.nftclicked);

    

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handler() {
    this.setState({
      detail: false
    })
  }

   // On file select (from the pop up)
   onFileChange = event => {
    
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  
  };
  
  // On file upload (click the upload button)
  onFileUpload = () => {
  
    // Details of the uploaded file
    console.log(this.state.selectedFile);
    console.log(this.props.user[0].mail_addr);

    const myNewFile = new File(
      [this.state.selectedFile],
      this.props.user[0].mail_addr,
      { type: this.state.selectedFile.type }
    );

    console.log(myNewFile.name);

    upload(myNewFile).then(res => {
      console.log("length", res);
    });
  
    // Request made to the backend api
    // Send formData object
    //axios.post("api/uploadfile", formData);
  };

  render() {

     if (jwt_decode(localStorage.getItem('usertoken')).exp < Date.now() / 1000) {
      localStorage.setItem('user',false);
      window.location.href=process.env.REACT_APP_BACK+"/login";
    } 

    if (this.state.detail) {
      return (
        <Details user={this.props.user} nftP={this.state.nftP} handler={this.handler} var={this.state.nftclicked} />);
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
            <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
          </div>
          <div className="all-cards">
              {this.renderNFTs()}
            </div>
        </div>
      </div>
    );
    
    
    }
  }

export default Funding;

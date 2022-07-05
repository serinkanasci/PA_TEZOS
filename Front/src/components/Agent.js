import Navbar from "./Navbar";
import ManageNFT from "./ManageNFT";
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { getEtpsName, getNFTs, customGet, validateFPlan } from '../api/functions';
import config from "../config";
import '../styles/properties.css';
import '../styles/property.css';
import PropertiesHelper from '../shared/PropertiesHelper';
import Details from './Details';

const preferredNetwork = "jakartanet";
const options = {
  name: "NFT",
  iconUrl: "https://tezostaquito.io/img/favicon.png",
  preferredNetwork: preferredNetwork,
};
const wallet = new BeaconWallet(options);
const rpcURL = "https://jakartanet.ecadinfra.com";
const tezos = new TezosToolkit(rpcURL);

class Agent extends Component {
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
      etpsS:0
    }


    this.isAgent = this.isAgent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderNFTs = this.renderNFTs.bind(this);
    this.renderV = this.renderV.bind(this);
    this.handler = this.handler.bind(this);
    this.getNfts = this.getNfts.bind(this);
    this.getNftsS = this.getNftsS.bind(this);
  }

  checkIfWalletConnected = async (wallet) => {
    await wallet
      .requestPermissions({ network: { type: 'jakartanet' } })
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
          console.log("NFT A ", nft);
          var n = nft+1;
          const nftT = myStorage["nfts"].get('' + n + '');
          console.log("NFT T ", nftT);
          if (typeof nftT !== 'undefined') {
            if (nftT.address_uri.startsWith("https")) {
              console.log("URI", nftT.address_uri);

              customGet(nftT.address_uri).then(res => {
                console.log("RESS  ", res);
                if (typeof res !== "undefined") {
                  this.setState({ nftclicked: res });
                  this.setState({ detail: true });
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
    if (typeof this.props.nft !== "undefined") {
      return this.props.nft.map((nft, index) => {
        console.log("RENDER NFTS", this.state.varTab[nft.id-1]);
        let imageT = this.state.varTab[nft.id-1];
        if (typeof imageT !== "undefined") {
          console.log("test user");
          console.log(this.props.user);
          if(nft.creator_etps.localeCompare(this.props.user[0].entreprise) === 0){
            return (<div className="card" onClick={() => this.handleClick(nft.id-1)} ><PropertiesHelper image={imageT[0]} info={imageT[1]} info2={nft.price} /></div>);
          }
          else{
            return null;
          }
          
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

  handleV = async (fi) => {
    console.log("VVV");
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const fii={
      id:fi.id,
      validate: 1
    }
    await tezos.wallet
    .at(config.contractAddress)
    .then((contract) => {
      console.log("math", Math.ceil(fi.monthly_loan))
        return contract.methods.validationFinancingPlan( fi.user_id, true, fi.etps, fi.contribution*1000000/*Math.ceil(fi.contribution)*/, 12,/*Math.ceil(fi.monthly_loan)*/fi.monthly_loan*1000000, fi.nft_id ).send();
    })
    .then((op) => {
      validateFPlan(fii).then( res =>{
            console.log(res);
        });
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(3).then(() => op.hash);

    })
    .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));

    
    


  }


  renderV() {
    console.log("render nftsss");
    // await this.checkIfWalletConnected(wallet);
    console.log("there",this.props.finance);
    if (typeof this.props.finance !== "undefined") {
      return this.props.finance.map((fi, index) => {
        if(fi.etps.localeCompare(this.props.user[0].entreprise) === 0 && !fi.validate){
          return (<p>{"Contribution : "+fi.contribution+" "+"Housing price : "+fi.housing_price+" "+"Monthly loan : "+fi.monthly_loan+" "+"NFT ID : "+fi.nft_id+" "+"Insurance rate : "+fi.rate_insurance+" "+"Interest rate : "+fi.rate_interest+" "+"USER ID : "+fi.user_id+" "+"User risk : "+fi.user_risk+" "}<button onClick={() => this.handleV(fi)}>Validate</button></p>);
        }
        else{
          return null;
        }
        
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
    this.isAgent()
    this.props.nft.forEach((nft, index) => {
      console.log("constructor");
      this.getNfts(nft);
      var temp = this.state.varTab;
      temp.push(('assets/home3.png', "DEFAULT"));

      temp[temp.length - 1] = ['assets/home3.png', "DEFAULT"];
      // console.log("TEMP ",temp);

      this.setState({ varTab: temp });

      if (typeof this.props.nft !== "undefined") {
        this.props.nft.forEach((nft, index) => {
          console.log("RENDER NFTS", this.state.varTab[nft.id-1]);
          let imageT = this.state.varTab[nft.id-1];
          if (typeof imageT !== "undefined") {
            console.log("test user");
            console.log(this.props.user);
            if(nft.creator_etps.localeCompare(this.props.user[0].entreprise) === 0){
              tezos.contract.at(config.contractAddress).then((myContract) => {
              return myContract
                  .storage()
                  .then((myStorage) => {
                      console.log("Statistiques ", myStorage);
                      const validation = myStorage["mapping_user"].get(''+this.props.user[0].id+'');
                      console.log('validation,', validation)
                      console.log(validation["validation"]["active"]);
                      const month_price = validation["validation"]["mensualities_price"];
                      const month_nb = validation["validation"]["mensualities_months"];
                      this.setState({etpsS:this.state.etpsS + (month_price * (12-month_nb) + nft.price*0.15)});
  
                  });
              });
            }
            
          }
        });
      }
    });



   

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handler() {
    this.setState({
      detail: false
    })
  }

  render() {

    console.log('avant ok ');
    console.log(this.state.nftclicked);

    if (this.state.detail) {
      return (
        <Details handler={this.handler} var={this.state.nftclicked} />);
    }
    else {
      return (
        <div className="bg-black min-h-screen">
          <Navbar />
          <p>{"Sales : "+this.state.etpsS}</p>
          {this.renderV()}
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

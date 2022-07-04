import Navbar from "./Navbar";
import ManageNFT from "./ManageNFT";
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { getEtpsName, getNFTs, customGet, createFPlan } from '../api/functions';
import config from "../config";
import '../styles/properties.css';
import '../styles/property.css';
import {
    TextField,
    Button
} from "@material-ui/core";
import PropertiesHelper from '../shared/PropertiesHelper'
const preferredNetwork = "jakartanet";
const options = {
    name: "NFT",
    iconUrl: "https://tezostaquito.io/img/favicon.png",
    preferredNetwork: preferredNetwork,
};
const wallet = new BeaconWallet(options);
const rpcURL = "https://jakartanet.ecadinfra.com";
const tezos = new TezosToolkit(rpcURL);

class DetailsF extends Component {
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
            name: "DEFAULT",
            attr1: "DEFAULT",
            attr2: "DEFAULT",
            attr3: "DEFAULT",
            attr4: "DEFAULT",
            attr5: "DEFAULT",
            image: "assets/home3.png",
            rate_interest: 0.1,
            rate_insurance: 0.05,
            contribution: 0,
            monthly_loan: 0,
            housing_price: 0,
            user_risk: 0,
            user_id: 0,
            nft_id: 0,
            balance: 0,
            validate:0
        }


        this.isAgent = this.isAgent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderNFTs = this.renderNFTs.bind(this);
    }

    checkIfWalletConnected = async (wallet) => {
        await wallet
            .requestPermissions({ network: { type: 'jakartanet' } })
            .then((_) => wallet.getPKH())
            .then((address) => console.log(`Your address: ${address}`));
        tezos.setWalletProvider(wallet);
    };


    handleClick(nft_id) {
        console.log("HANDLE CLICK");
        console.log(nft_id)
        //this.state.nftclicked = nft_id;
        //this.state.detail = true;
        this.setState({ detail: true });
        this.setState({ nftclicked: nft_id });
    }

    getDetails(nft) {
        console.log("details getNfts");
        console.log(this.props.nft_id)
        tezos.contract.at(config.contractAddress).then((myContract) => {
            return myContract
                .storage()
                .then((myStorage) => {
                    const nftT = myStorage["nfts"].get('' + this.props.nft_id + '');
                    console.log("NFT T ", nftT);
                    if (typeof nftT !== 'undefi2ned') {
                        if (nftT.address_uri.startsWith("https")) {
                            console.log("URI", nftT.address_uri);

                            customGet(nftT.address_uri).then(res => {
                                console.log("RES  ", res);
                                if (typeof res !== "undefined") {
                                    console.log("details1", res);
                                    console.log("details", res.name, res.image);
                                    this.setState({ name: res.name, image: res.image });
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
                console.log("RENDER NFTS", this.state.varTab[index]);
                let imageT = this.state.varTab[index];
                if (typeof imageT !== "undefined") {
                    return (<div className="card" onClick={() => this.handleClick(nft.id)} ><PropertiesHelper image={imageT[0]} info={imageT[1]} /></div>);
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
        console.log("test");
        console.log(this.props.var);
        console.log("details1", this.props.var.attributes[0]["trait_type"] + " " + this.props.var.attributes[0]["value"]);
        var txt = this.props.var.attributes[0]["trait_type"] + " : " + this.props.var.attributes[0]["value"];
        var txt2 = this.props.var.attributes[1]["trait_type"] + " : " + this.props.var.attributes[1]["value"];
        var txt3 = this.props.var.attributes[2]["trait_type"] + " : " + this.props.var.attributes[2]["value"];
        var txt4 = this.props.var.attributes[3]["trait_type"] + " : " + this.props.var.attributes[3]["value"];
        var txt5 = this.props.var.attributes[4]["trait_type"] + " : " + this.props.var.attributes[4]["value"];
        this.setState({ name: this.props.var.name, image: this.props.var.image, attr1: txt, attr2: txt2, attr3: txt3, attr4: txt4, attr5: txt5 });
        console.log("didmount", this.props.user[0].verified);

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handler2 = async () => {

        const FP = {
            rate_interest: this.state.rate_interest,
            rate_insurance: this.state.rate_insurance,
            contribution: this.state.contribution,
            monthly_loan: this.state.monthly_loan,
            housing_price: this.state.housing_price,
            user_risk: this.state.user_risk,
            user_id: this.state.user_id,
            nft_id: this.state.nft,
            validate: this.state.validate,
            etps: this.props.nftP.creator_etps
        }

        console.log(this.props.nftP.creator_etps);//agency
        console.log(this.props.user[0].yearly_income);//yearly_income
        const tezos = new TezosToolkit(rpcURL);
        tezos.setWalletProvider(wallet);
        console.log(config.contractAddress);
        const account = await wallet.client.getActiveAccount();
        await tezos.contract.at(config.contractAddress).then((myContract) => {
          return myContract
            .storage()
            .then((myStorage) => {
              const balance = myStorage["balances"].get(account.address);
              this.setState({ balance: balance / 1000000});
              console.log("BALANCE ",this.state.balance);
            })
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
        })
        console.log(this.props);
        FP.housing_price = this.props.nftP.price*(1+this.state.rate_insurance+this.state.rate_interest);
        console.log("housing price",FP.housing_price );
        FP.contribution = FP.housing_price * 15/100;
        console.log(FP.contribution, this.state.balance);
        if (FP.contribution < this.state.balance) {
            FP.monthly_loan = (FP.housing_price / 12) * (this.state.rate_insurance+this.state.rate_interest);
            console.log(FP.monthly_loan, (this.props.user[0].yearly_income / 12));
            if (FP.monthly_loan < (this.props.user[0].yearly_income / 12)){
                FP.user_id = this.props.user[0].id; // this.props.user
                FP.nft_id = this.props.nftP.id; 
                const current = new Date();
                const birthdate = new Date(this.props.user[0].birth_date);
                console.log(current.getFullYear());
                console.log(birthdate.getFullYear());

                const age = current.getFullYear() - birthdate.getFullYear();
                console.log(age);
                const user_risk = this.props.user[0].yearly_income / ( age* FP.housing_price);
                console.log(user_risk);
                FP.user_risk = user_risk;
                console.log(FP)
                
                createFPlan(FP).then(res => {
                   console.log(res);
                });
            }
        }
    }

    render() {
        return (
            <div className="bg-black min-h-screen">
                <div>
                    <Button onClick={() => this.props.handler()} style={{ marginLeft: "25%" }} variant="contained" color="primary">
                        BACK
                    </Button>
                    <img className="image" src={this.state.image} alt="" />
                    <h2 className="info">{this.state.name}</h2>
                    <h2 className="info">{this.state.attr1}</h2>
                    <h2 className="info">{this.state.attr2}</h2>
                    <h2 className="info">{this.state.attr3}</h2>
                    <h2 className="info">{this.state.attr4}</h2>
                    <h2 className="info">{this.state.attr5}</h2>
                    <h2 className="info">{"PRICE : " + this.props.nftP.price + " TEZ"}</h2>
                    {this.props.user[0].verified ? <Button onClick={() => this.handler2()} style={{ marginLeft: "25%" }} variant="contained" color="primary">
                        Make a financial plan request
                    </Button> : null}
                </div>
            </div>
        );


    }
}

export default DetailsF;

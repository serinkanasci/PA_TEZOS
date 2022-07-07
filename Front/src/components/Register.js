import React, { Component } from 'react';
import { register, getUser, getEtpsId } from '../api/functions';
import '../styles/navbar.css';
import { TezosToolkit } from "@taquito/taquito";
import {
    TextField,
    Button
  } from "@material-ui/core";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from "../config";

const preferredNetwork = "jakartanet";
const options = {
name: "NFT",
iconUrl: "https://tezostaquito.io/img/favicon.png",
preferredNetwork: preferredNetwork,
};
const wallet = new BeaconWallet(options);
const rpcURL = "https://jakartanet.ecadinfra.com";
const tezos = new TezosToolkit(rpcURL);
const bcrypt = require('bcryptjs');

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
        value_res: '',
        firstname: '',
        lastname: '',
        birth_date: '',
        post_addr: '',
        country: '',
        yearly: 0,
        verif: 0,
        city: '',
        street_addr: '',
        phone_number: '',
        mail_addr: '',
        pwd : '',
        entreprise: 'DEFAULT',
        is_banned: '',
        id_int: 0

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    checkIfWalletConnected = async (wallet) => {
        await wallet
        .requestPermissions({ network: { type: 'jakartanet' } })
        .then((_) => wallet.getPKH())
        .then((address) => console.log(`Your address: ${address}`));
        tezos.setWalletProvider(wallet);
    };

    onSubmit = async (e) =>{
        e.preventDefault();
        await this.checkIfWalletConnected(wallet);
        
        if(this.state.mail_addr.localeCompare("")!==0 && this.state.pwd.localeCompare("")!==0){
            console.log("ok2");
            const user = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                birth_date: this.state.birth_date,
                post_addr: this.state.post_addr,
                country: this.state.country,
                city: this.state.city,
                street_addr: this.state.street_addr,
                phone_number: this.state.phone_number,
                mail_addr: this.state.mail_addr,
                pwd : this.state.pwd,
                entreprise: this.state.entreprise,
                yearly_income: this.state.yearly,
                verified: this.state.verif,
                is_banned: 0,
            }
   
            await register(user).then(res => {
                console.log("keys11");
                var keys = Object.keys(res);
                
                console.log("keys1",keys);
                if(keys[0].localeCompare("error")==0){
                    this.setState({value_res:"Error, this email already exists"});
                }
                else{
                    console.log("keys",keys);
                    this.setState({value_res:"User "+this.state.mail_addr+" has been added !"});
                }
                
                getUser(this.state.mail_addr).then(res => {
                    this.setState({id_int:res[0].id});
                });

                
            });
            

            const account = await wallet.client.getActiveAccount();

            var result;

            await getEtpsId(this.state.entreprise).then(res=>{
                result = res;
            });

            if(result.length===1){
                await tezos.wallet
                .at(config.contractAddress)
                .then((contract) => {
                    const pk = account.address;
                    
                    return contract.methods.createAgent(result[0].entreprise, pk).send();
                })
                .then((op) => {
                    console.log(`Waiting for ${op.hash} to be confirmed...`);
                    window.location.href = process.env.REACT_APP_FRONT+"/login"
                    return op.confirmation(3).then(() => op.hash);
                })
                .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
                .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
            }
            else{
                await tezos.wallet
                .at(config.contractAddress)
                .then((contract) => {
                    const pk = account.address;
                    console.log("ok5");
                    console.log(contract.methods);
                    console.log(this.state.id_int, pk);
                    
                    return contract.methods.createUser(this.state.id_int, pk).send();
                })
                .then((op) => {
                    console.log(`Waiting for ${op.hash} to be confirmed...`);
                    window.location.href = process.env.REACT_APP_FRONT+"/login"
                    return op.confirmation(3).then(() => op.hash);
                })
                .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
                .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
            }
            
            
        }
        else{
            this.setState({value_res:"Please fulfill the email and password"});
        }
    }
    

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFileChange = event => { 
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
    }; 



    render() {
        return (
            <div className="create_user">
                <div id="block1">
                    <div id='img_p'>
                        <form className="form_profile" id="profile2" onSubmit={this.onSubmit} centered>
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="firstname"
                            label="First name"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            />
                            <br />
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="lastname"
                            label="Last name"
                            value={this.state.lastname}
                            onChange={this.onChange}
                            />
                            <br />
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            variant="outlined"
                            type="email"
                            name="mail_addr"
                            label="Email"
                            value={this.state.mail_addr}
                            onChange={this.onChange}
                            />
                            <br />
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            variant="outlined"
                            type="password"
                            name="pwd"
                            label="Password"
                            value={this.state.pwd}
                            onChange={this.onChange}
                            />
                            <br />
                            <p>Birthdate :</p>
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="date"
                            variant="outlined"
                            name="birth_date"
                            value={this.state.birth_date}
                            onChange={this.onChange}
                            />
                            <br />
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="post_addr"
                            label="Postal address"
                            value={this.state.post_addr}
                            onChange={this.onChange}
                            />
                            <br />
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="country"
                            label="Country"
                            value={this.state.country}
                            onChange={this.onChange}
                            />
                            <br />
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="city"
                            label="City"
                            value={this.state.city}
                            onChange={this.onChange}
                            />
                            <br />
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="street_addr"
                            label="Street address"
                            value={this.state.street_addr}
                            onChange={this.onChange}
                            />
                            <br />
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="phone_number"
                            label="Phone number"
                            value={this.state.phone_number}
                            onChange={this.onChange}
                            />
                            <br />
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="yearly"
                            label="Yearly income"
                            value={this.state.yearly}
                            onChange={this.onChange}
                            />
                            <br />
                            {/* <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="date"
                            variant="outlined"
                            name="mensuality"
                            value={this.state.mensuality}
                            onChange={this.onChange}
                            />
                            <br /> */}
                            <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="entreprise"
                            label="Entreprise"
                            value={this.state.entreprise}
                            onChange={this.onChange}
                            />
                            <br />
                            {/* <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            variant="outlined"
                            name="is_banned"
                            label="Ban status"
                            value={this.state.is_banned}
                            onChange={this.onChange}
                            />
                            <br /> */}
                            <Button type="submit" style={{ marginLeft:"25%" }} variant="contained" color="primary">
                                save
                            </Button>
                            <p >{this.state.value_res}</p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
  }
export default Register;



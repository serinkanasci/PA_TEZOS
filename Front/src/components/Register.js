import React, { Component } from 'react';
import { register, getUser } from '../api/functions';
import '../styles/navbar.css';
import { TezosToolkit } from "@taquito/taquito";
import {
    TextField,
    Button
  } from "@material-ui/core";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from "../config";

const preferredNetwork = "ithacanet";
const options = {
name: "NFT",
iconUrl: "https://tezostaquito.io/img/favicon.png",
preferredNetwork: preferredNetwork,
};
const wallet = new BeaconWallet(options);
const rpcURL = "https://ithacanet.ecadinfra.com";
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
        city: '',
        street_addr: '',
        phone_number: '',
        mail_addr: '',
        pwd : '',
        mensuality: '',
        entreprise: '',
        is_banned: '',
        error: ''

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    checkIfWalletConnected = async (wallet) => {
        await wallet
        .requestPermissions({ network: { type: 'ithacanet' } })
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
                mensuality: this.state.mensuality,
                entreprise: this.state.entreprise,
                is_banned: 0,
            }

            const id_int = 0;
   
            register(user).then(res => {
                var keys = Object.keys(res);
                if(keys[0].localeCompare("error")==0){
                    this.setState({value_res:"Erreur, l'email inscrit existe déjà"});
                }
                else{
                    this.setState({value_res:"L'utilisateur "+this.state.mail_addr+" a bien été enregistré"});
                }
                
                getUser(this.state.mail_addr).then(res => {
                    id_int = res[0].id;
                });

                
            });
            

            const account = await wallet.client.getActiveAccount();
            console.log(account.address);

            await tezos.wallet
            .at(config.contractAddress)
            .then((contract) => {
                const pk = account.address;
                console.log("ok5");
                console.log(contract.methods);
                console.log(3, pk);
                
                return contract.methods.createUser(id_int, pk).send();
            })
            .then((op) => {
                console.log(`Waiting for ${op.hash} to be confirmed...`);
                return op.confirmation(3).then(() => op.hash);
            })
            .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
            
            
        }
        else{
            this.setState({error:"Please fulfill the email and password"})
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
                            <p style={{color:"red"}} >{this.state.error}</p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
  }
export default Register;



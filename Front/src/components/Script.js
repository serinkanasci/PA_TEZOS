import React, { Component } from 'react';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from "../config";
import { banUser, banEtps, createEtps, verify, getF } from '../api/functions';
import { deposit, withdraw, banAdmin, banAgent } from "../utils/wallet";
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

class Script extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: false,
            deposit: 0,
            withdraw: 0,
            pk: "",
            ban_pk_admin: "",
            ban_pk_agent: "",
            mail_agent: "",
            mail_user: "",
            entreprise: "",
            entrepriseC: "",
            entrepriseCode: "",
            verify: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onBanAgent = this.onBanAgent.bind(this);
        this.onBanUser = this.onBanUser.bind(this);
        this.onBanEtps = this.onBanEtps.bind(this);
    }


    onBanAgent = event => {
        event.preventDefault();

        if (this.state.mail_agent.localeCompare("") !== 0 && this.state.ban_pk_agent.localeCompare("") !== 0) {
            banAgent(this.state.ban_pk_agent);

            const user = {
                mail_addr: this.state.mail_agent,
                is_banned: 1,
            }

            banUser(user).then(res => {
            });

        }
    };

    onBanUser = event => {
        event.preventDefault();

        const user = {
            mail_addr: this.state.mail_user,
            is_banned: 1,
        }

        banUser(user).then(res => {
        });
    };

    onBanEtps = event => {
        event.preventDefault();

        const user = {
            entreprise: this.state.entreprise,
            is_banned: 1,
        }

        banEtps(user).then(res => {
        });
    };


    verifyUser = event => {
        event.preventDefault();
        const user = {
            verified: 1,
            id: this.state.verify,
        }

        verify(user).then(res => {
            console.log(res);
        });
    };

    onCreateEtps = event => {
        event.preventDefault();
        console.log(Math.random() * (99999 - 10000) + 10000);
        const etps = {
            entreprise: this.state.entrepriseC,
            access_code: Math.random() * (99999 - 10000) + 10000,
            is_banned: false
        }

        createEtps(etps).then(res => {
        });
    };


    checkIfWalletConnected = async (wallet) => {
        await wallet
            .requestPermissions({ network: { type: 'jakartanet' } })
            .then((_) => wallet.getPKH())
            .then((address) => console.log(`Your address: ${address}`));
        tezos.setWalletProvider(wallet);
    };


    isAdmin = async () => {
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
                        const admins = myStorage["mapping_admin"].get(account.address);
                        console.log(admins);
                        if (admins !== false) {
                            window.location.href = process.env.REACT_APP_FRONT + "/login"
                        } else {
                            this.setState({ page: true });
                        }

                    })
                    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
            })
        }
    };

    

    componentDidMount() {
        this._isMounted = true;
        this.isAdmin()
        setInterval(() => {
            console.log("every 30seconds");
            getF().then( res =>{
                console.log(res);
                res.forEach((FP, index) => {
                    if(FP.validate){
                        console.log("it's true");
                        const tezos = new TezosToolkit(rpcURL);
                        tezos.setWalletProvider(wallet);
                        console.log(config.contractAddress);
                        tezos.contract.at(config.contractAddress).then((myContract) => {
                        return myContract
                            .storage()
                            .then((myStorage) => {
                                console.log(myStorage);
                                const validation = myStorage["mapping_user"].get(''+FP.user_id+'');
                                console.log('validation,', validation)
                                console.log(validation["validation"]["active"]);
                                if (validation["validation"]["active"]){
                                    tezos.wallet
                                    .at(config.contractAddress)
                                    .then((contract) => {
                                        console.log("OK VALIDATION TRUE ", FP.user_id);
                                        return contract.methods.payValidation(FP.user_id).send();
                                    })
                                    .then((op) => {
                                        console.log(`Waiting for ${op.hash} to be confirmed...`);
                                        return op.confirmation(3).then(() => op.hash);
                                    })
                                    .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
                                    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
                                    
                                }
                            });
                        });
                    }
                });
            });
        },
        10000);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFileChange = event => {
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });
    };


    render() {
        if (this.state.page) {
            return (
                <p>The script is launched</p>
            );
        }
        else {
            return null;
        }

    }
}
export default Script;



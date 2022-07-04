import React, { Component } from 'react';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from "../config";
import { banUser, banEtps, createEtps, verify } from '../api/functions';
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

class LoginAdmin extends Component {
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
            verify:""
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
                            window.location.href = process.env.REACT_APP_FRONT+"/login"
                        }else{
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
                <div className="flex">
                    <div id="block1">
                        <div id='img_p'>
                            <input
                                type="text"
                                name="value"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    this.setState({ deposit: e.target.value });
                                    console.log(this.state.deposit)
                                }}
                                value={this.state.deposit}
                            />
                            <button
                                onClick={() => {
                                    deposit(this.state.deposit)
                                }}
                            >
                                Deposit
                            </button>
                            <br />
                            <input
                                type="text"
                                name="value_to_recup"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    this.setState({ withdraw: e.target.value });
                                    console.log(this.state.withdraw)
                                }}
                                value={this.state.withdraw}
                            />
                            <button
                                onClick={() => {
                                    withdraw(this.state.withdraw)
                                }}
                            >
                                Withdraw
                            </button>
                            <br />
                            <input
                                type="text"
                                name="ban_pk_admin"
                                onChange={this.onChange}
                                value={this.state.ban_pk_admin}
                            />
                            <button
                                onClick={() => {
                                    banAdmin(this.state.ban_pk_admin)
                                }}
                            >
                                banAdmin
                            </button>
                            <br />
                            <input
                                type="text"
                                name="ban_pk_agent"
                                onChange={this.onChange}
                                value={this.state.ban_pk_agent}
                            />
                            <input
                                type="text"
                                name="mail_agent"
                                onChange={this.onChange}
                                value={this.state.mail_agent}
                            />
                            <button
                                onClick={(event) => this.onBanAgent(event)}
                            >
                                banAgent
                            </button>
                            <br />
                            <input
                                type="text"
                                name="mail_user"
                                onChange={this.onChange}
                                value={this.state.mail_user}
                            />
                            <button
                                onClick={(event) => this.onBanUser(event)}
                            >
                                banUser
                            </button>
                            <br />
                            <input
                                type="text"
                                name="entreprise"
                                onChange={this.onChange}
                                value={this.state.entreprise}
                            />
                            <button
                                onClick={(event) => this.onBanEtps(event)}
                            >
                                banEtps
                            </button>
                            <br />
                            <input
                                type="text"
                                name="entrepriseC"
                                onChange={this.onChange}
                                value={this.state.entrepriseC}
                            />
                            <button
                                onClick={(event) => this.onCreateEtps(event)}
                            >
                                createEtps
                            </button>
                            <br />
                            <input
                                type="text"
                                name="verify"
                                onChange={this.onChange}
                                value={this.state.verify}
                            />
                            <button
                                onClick={(event) => this.verifyUser(event)}
                            >
                                verifyUser
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="log_admin">
                    <div id="block1">
                        <div id='img_p'>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default LoginAdmin;



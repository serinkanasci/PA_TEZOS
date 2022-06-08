import React, { Component } from 'react';
import { login } from '../api/UserFunctions';
import '../styles/login.css';
import Auth from '../auth/Auth';
import { connect } from "react-redux";

class Connected_LogAdm extends Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      ok:0,
      style_forget:{display:"none"},
      style_incorrect:{display:"none"},
      style_incorrect2:{display:"none"},
      style_incorrect3:{display:"none"},
      style_incorrect4:{display:"none"},
      page:false,
      errors: {}
    }


    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleConnexion=this.handleConnexion.bind(this);
    this.logout=this.logout.bind(this);
  }


  componentDidMount() {
    this._isMounted = true;
  }

   componentWillUnmount() {
    this._isMounted = false;
  }

  handleForget(){
    this.setState({style_forget:{display:"block"}});
    this.setState({page:true});
  }
  handlePage(event){
    const target = event.target;
    if (target.id !== 'modal') {
    return ;
    }
    this.setState({style_forget:{display:"none"}});
    this.setState({page:false});
  }

  handleConnexion(){
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      ok:this.state.ok
    }
    
    login(user).then(res => {

      this._isMounted = true;

    })
  }


  login(){
  Auth.authenticate();
  }
  logout(){
  Auth.signout();
  }

  updateState() {
        this.setState({ error_msg: true });
    }

  render() {

      

      return (
        <div id="page_connexion_adm"> 
          <div id="design1">
            <div id="decor_adm">
              <img id="logo_proviso_adm" alt="logo de Kanpai"/>
            </div>
          </div>
          <div id="connexion">
            <div id="formulaire">
              <div id="titre">
                <h3>Identifiant</h3>
              </div>
              <form className="form_connexion" onSubmit={this.onSubmit}>
                <input
                  id="form_email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  />
                <br/>
                <input
                  id="form_mdp"
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <br/>
                <div id="this_button">
                   <button id="form_button" type="submit" onClick={(event) => this.redirectToHome}>SE CONNECTER</button>
                  <p id="incorrect" style={this.state.style_incorrect}>Email incorrect</p>
                  <p id="incorrect2" style={this.state.style_incorrect2}>Mot de passe incorrect</p>
                  <p id="incorrect3" style={this.state.style_incorrect3}>Trop de tentatives, veuillez réessayer dans 5 minutes</p>
                  <p id="incorrect4" style={this.state.style_incorrect4}>Compte non admin</p>
                </div>
              </form>
            </div>
          </div>
        </div>


        );
    
    
    
    }
  }
const LogAdm = connect(
  null,
)(Connected_LogAdm);

export default LogAdm;

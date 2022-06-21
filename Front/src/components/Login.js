import React, { Component } from 'react';
import { login, getEtpsId, getUser, getNFTs } from '../api/functions';
import '../styles/login.css';
import Auth from '../auth/Auth';
import Agent from './Agent';

class Login extends Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      email_forgot:'',
      forget:{display:"block"},
      ok:0,
      style_forget:{display:"none"},
      style_incorrect:{display:"none"},
      style_incorrect2:{display:"none"},
      style_incorrect3:{display:"none"},
      msg_forget:'',
      page:false,
      errors: {},
      test:true,
      nft:[]
    }


    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.logout=this.logout.bind(this);
  }


  componentDidMount() {
    this._isMounted = true;
  }

   componentWillUnmount() {
    this._isMounted = false;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();
    const user = {
      mail_addr: this.state.email,
      pwd: this.state.password,
      ok:this.state.ok
    }

    //console.log(this.state.email,this.state.password);

    
    
    login(user).then(res => {

      this._isMounted = true;
      if (res) {
        getUser(this.state.email).then(resUser =>{
          localStorage.setItem('user',true);
          console.log("user",resUser);
          getEtpsId(resUser[0].entreprise).then(res=>{
            console.log("etps",res.length);
            if(res.length===1){
              getNFTs().then(res =>{
                this.setState({nft:res, test:false});
            });
              //window.location.href = process.env.REACT_APP_FRONT+"/agent";
            }
            else{
              window.location.href = process.env.REACT_APP_FRONT+"/funding";
          }
      });
        })
        
        
      }
      else{

        if(user.ok === 400){
          this.setState({style_incorrect:{display:"block"}});
          this.setState({style_incorrect3:{display:"none"}});
          this.setState({style_incorrect2:{display:"none"}});

        }
        if(user.ok === 401){
          this.setState({style_incorrect2:{display:"block"}});
          this.setState({style_incorrect:{display:"none"}});
          this.setState({style_incorrect3:{display:"none"}});

        }
        if(user.ok === 429){
          this.setState({style_incorrect3:{display:"block"}});
          this.setState({style_incorrect:{display:"none"}});
          this.setState({style_incorrect2:{display:"none"}});

        }
      }
      

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

    if(this.state.test){
      return (
        <div>
        <div>
          <div class="login-page">
          <div class="form">
              <form class="login-form" onSubmit={this.onSubmit}>
              <input type="email"
                placeholder="Email"
                name="email"
                value={this.state.email} onChange={this.onChange} />
              <input type="password"
                placeholder="Password"
                name="password"
                value={this.state.password} onChange={this.onChange} />
              <button type="submit">login</button>
              <p id="incorrect" style={this.state.style_incorrect}>Email incorrect</p>
              <p id="incorrect2" style={this.state.style_incorrect2}>Mot de passe incorrect</p>
              <p id="incorrect3" style={this.state.style_incorrect3}>Trop de tentatives, veuillez réessayer dans 5 minutes</p>
              <p class="message">Not registered? <a href="http://localhost:3000/register">Create an account</a></p>
              </form>
          </div>
          </div>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script><script src="./script.js"></script>
        </div>
      </div>

      );
    }
    else{
      return (
        <Agent nft={this.state.nft}/>

      );
    }

      

      
    
    
    }
  }

export default Login;








 
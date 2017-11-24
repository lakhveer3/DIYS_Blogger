import React, {Component} from 'react';
import { Input,TextArea,Label,Icon,Segment,Form,Button,Radio, Grid} from 'semantic-ui-react';
import request from 'superagent';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Cookies from 'universal-cookie';
const ReactToastr = require("react-toastr");
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const cookies = new Cookies();
//import createBrowserHistory from 'history/createBrowserHistory';
//let myApp = { history: createBrowserHistory() };
export default class Login extends React.Component {
  constructor(){
    super();
    this.state={
      username:'',
      password:'',
	    typeForLogin:'',
      typeForRegister:''
    }
    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
	  this.handleChange =this.handleChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }
  handleChangeType(event,{value}){
    this.setState({ typeForRegister:value });
  }
  handleUser(event){
    let val = event.target.value;
    this.setState({username:val});
  }
  handlePassword(event){
    let val = event.target.value;
    this.setState({password:val});
  }
  handleChange(e, { value }){
	  this.setState({ typeForLogin:value });
  }

  // checkLoginSuccessAlert(){
  // alert("Successfully logged in");
  // }
  submitLogin(){

	  var Usertype = this.state.typeForLogin;
    var Username = this.state.username;
    var Password = this.state.password;
    request.get('/checkVerification')
    .query({username:this.state.username})
    .set('X-API-Key', 'foobar')
    .set('Accept', 'application/json')
    .end(function(err, res){
      // this.checkLoginSuccessAlert().bind(this);
      console.log("res verification",res);
      if((err || !res.ok)){
        alert('Incorrect username or password');
      } else if(res.body.user[0].verificationStatus == true){

          request.post('/login')
          .query({username:Username,password:Password,typeForLogin:Usertype})
          .set('X-API-Key', 'foobar')
          .set('Accept', 'application/json')
          .end(function(err, res){
            console.log("**********",res);
            if ((err || !res.ok)){
              alert('Incorrect username or password');
            }
            else if((Usertype == "Blogger")){
              console.log(res,"response");
              cookies.set('email',res.body.email);
              hashHistory.push('/bloggerPage');
            }
      	   else
      		   alert("Incorrect user type")
          });
        }
        else{
          hashHistory.push({
            pathname: `/verify`,
            query: {email:res.body.user[0].email }
          })

        }
      });
  }
 submitRegister(){
   console.log(this.state.typeForRegister,"user type for login");
   if(this.state.typeForRegister == "Retailer"){
     hashHistory.push('/registerRetailer');
   }
   else
   hashHistory.push('/register');

  }
render() {
  console.log('state : ',this.state);
	var abc;
	if(!cookies.get('email')){
		abc =(<div>
      <ToastContainer ref="toaster"
            toastMessageFactory = {ToastMessageFactory}
            className = "toast-top-center"/>
  <Segment>
   <h1 style={{textAlign:'left'}}>ADD TO CART LOGIN</h1>

    <Form>
    <Form.Field>
      <Grid centered columns={4}><Grid.Column><label className="loginlabel">Username</label></Grid.Column>
      <Grid.Column><input style={{backgroundColor:'#333f50',color:'#fce9dd',borderColor:'#fce9dd',fontFamily: 'Poor Richard',fontSize:'12pt'}} placeholder='Username' onChange={this.handleUser}/></Grid.Column>
    </Grid>
    </Form.Field>
    <Form.Field>
      <Grid centered columns={4}><Grid.Column><label className="loginlabel">Password</label></Grid.Column>
        <Grid.Column><input style={{backgroundColor:'#333f50',color:'#fce9dd',borderColor:'#fce9dd',fontFamily: 'Poor Richard',fontSize:'12pt'}}  placeholder='Password' type="password" onChange={this.handlePassword} />  </Grid.Column>
      </Grid>
    </Form.Field>
	<Form.Field>
          <Grid centered columns={4}><Grid.Column className="loginlabel">Select User </Grid.Column>
          <Grid.Column ><Radio
            label='Blogger'
            name='radioGroup1'
            value='Blogger'
            checked={this.state.typeForLogin === 'Blogger'}
            onChange={this.handleChange}
          />
          </Grid.Column>
          <Grid.Column>
          <Radio
            label='Retailer'
            name='radioGroup1'
            value='Retailer'
            checked={this.state.typeForLogin === 'Retailer'}
            onChange={this.handleChange}
          /></Grid.Column>
        </Grid>
        </Form.Field>
  <Grid centered columns={2}><Grid.Column><Button color="#e78c6f" type='submit' onClick={this.submitLogin}>Login</Button>
<Button color="#e78c6f" type='submit' >Cancel</Button></Grid.Column>
</Grid>
<br /><div style={{float:'left',width: '44%'}}><hr/></div>
<div style={{float:'right',width: '44%'}}><hr/></div>
<span style={{color:'#fce9dd'}}>New User?</span>
<br />
<br />
<Grid centered columns={4}><Grid.Column className="loginlabel">Select User </Grid.Column>
<Grid.Column ><Radio
  label='Blogger'
  name='radioGroup'
  value='Blogger'
  checked={this.state.typeForRegister === 'Blogger'}
  onChange={this.handleChangeType}
/>
</Grid.Column>
<Grid.Column>
<Radio
  label='Retailer'
  name='radioGroup'
  value='Retailer'
  checked={this.state.typeForRegister === 'Retailer'}
  onChange={this.handleChangeType}
/></Grid.Column></Grid>
<Grid centered columns={4}><Grid.Column>
<Button color="#e78c6f" type='submit' onClick={this.submitRegister.bind(this)}>New User</Button>
</Grid.Column></Grid>
</Form>
  </Segment>
      </div>)
	}
	else
	{
		hashHistory.push('/bloggerPage')
		location.reload();
	}
    return (
	abc
      )
    }
  }

import React, {Component} from 'react';
import { Input,TextArea,Label,Icon,Segment,Form,Button,Checkbox,Radio, Grid} from 'semantic-ui-react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import "../styles/style.css";
export default class RegisterRetailer extends React.Component {
  constructor(){
    super();
    this.state={
      name:'',
      username:'',
      password:'',
	    rePassword:'',
      email:'',
      disable:true,
	    checked:false,
      YouTubeId:'',
      Subscribers:''
    }
  this.handleUser = this.handleUser.bind(this);
  this.handleUsername = this.handleUsername.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
  this.handleRePassword =  this.handleRePassword.bind(this);
  this.handleEmail = this.handleEmail.bind(this);
  this.submitRegister = this.submitRegister.bind(this);
  this.handleCheck = this.handleCheck.bind(this);
  this.handleChange =this.handleChange.bind(this);

  }
  validateForm() {
    if (this.state.name == '' || this.state.name == null ||
        this.state.username == '' || this.state.username == null ||
        this.state.email == '' || this.state.email == null ||
        this.state.password == '' || this.state.password == null||
		    this.state.rePassword == '' || this.state.rePassword == null||
        this.state.YouTubeId == ''||this.state.YouTubeId ==null||
        this.state.checked == 'false'||this.state.checked == '')
        {
          this.setState({disable: true})
        } else {
            this.setState({disable: false})
          }
  }
  handleChange(e, { value }){
	  this.setState({ value:value });
  }
  handleUser(event){
    let val = event.target.value;
    this.setState({name:val});
    this.validateForm();
  }
  handleUsername(event){
    let val = event.target.value;
    this.setState({username:val});
    this.validateForm();
  }
  handlePassword(event){
    let val = event.target.value;
    this.setState({password:val});
    this.validateForm();
  }
  handleCheck(event){
	this.setState({checked: !this.state.checked});
  }
  handleRePassword(event){
	let val = event.target.value;
    this.setState({rePassword:val});
    this.validateForm();
  }
  handleEmail(event){
    let val = event.target.value;
    this.setState({email:val});
    this.validateForm();
  }

  submitRegister(){
    console.log(this.state.checked,"checked");
	   if((this.state.password == this.state.rePassword)){
    		console.log("&&&&")
        request.post('/register')
           .query({username:this.state.username,password:this.state.password,email:this.state.email,name:this.state.name,YouTubeId:this.state.YouTubeId,Subscribers:this.state.Subscribers})
           .end(function(err, res){
             console.log("res",res);
             if (err || !res.ok) {
               alert('Oh no! error');
             }
             else if(res.text == "User already registered"){
               alert("User already registered");
               hashHistory.push('/');
             }
             else {
               console.log("res",res);
               console.log("vcode:"+res.body.email);
               alert("Confirmation mail has been sent to you");
               {/*hashHistory.push({
                  pathname: '/verifiy',
                  data: {vCode:res.verificationCode,email:res.email}
                })*/}
                hashHistory.push({
                  pathname: `/verify`,
                  query: {email:res.body.email }
                })

             }
      });
    }
    else{
        alert('Password and confirm password should be same');
    }
}

  render(){
    var option = [ { key: 'below 1000', text: 'below 1000', value: 'below 1000'  },
                    { key: '1000 to 10,000', text: '1000 to 10,000', value: '1000 to 10,000'  },
                    { key: 'above 10,000', text: 'above 10,000', value: 'above 10,000'  },

        ];
    return(
      <div className="registrationPage">
      <Segment id="qwe">
       <h1>Retailer ACCOUNT REGISTRATION</h1>
       <div style={{marginLeft:'10%',marginRight:'10%'}}>
       <Form onSubmit={this.submitRegister}>
       <Form.Field>
         <label>Name</label>
         <input style={{borderColor:'#fce9dd',backgroundColor:'#333f50',color:'#fbe5d6'}} type="text" placeholder='Name' required="true" onChange={this.handleUser}/>
       </Form.Field>
       <Form.Field>
         <label>Username</label>
         <input style={{borderColor:'#fce9dd',backgroundColor:'#333f50',color:'#fbe5d6'}} placeholder='Username' type="text" required="true" onChange={this.handleUsername} />
       </Form.Field>
       <Form.Field>
         <label>Password</label>
         <input style={{borderColor:'#fce9dd',backgroundColor:'#333f50',color:'#fbe5d6'}} placeholder='Password' type="password" required="true" onChange={this.handlePassword} />
       </Form.Field>
	   <Form.Field>
         <label>Confirm Password</label>
         <input style={{borderColor:'#fce9dd',backgroundColor:'#333f50',color:'#fbe5d6'}} placeholder='Confirm Password' type="password" required="true" onChange={this.handleRePassword} />
       </Form.Field>
       <Form.Field>
         <label>Email</label>
         <input style={{borderColor:'#fce9dd',backgroundColor:'#333f50',color:'#fbe5d6'}} placeholder='Email' name="email" type="text" required="true" onChange={this.handleEmail} />
       </Form.Field>
     <p><Checkbox checked={this.state.checked} onChange={this.handleCheck} />     I Agree <a href="terms" >all terms and conditions</a></p><br /><br/>
     <Button color="orange" type='submit' disabled={this.state.disable} >Submit</Button>
     </Form>
     </div>
     </Segment>
      </div>
    );
  }
}

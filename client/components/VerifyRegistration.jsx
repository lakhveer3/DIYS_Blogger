import React, {Component} from 'react';
import { Input,TextArea,Label,Icon,Segment,Form,Button,Message, Grid,Header} from 'semantic-ui-react';
import request from 'superagent';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import ReactInterval from 'react-interval';


export default class VerifyRegistration extends React.Component {
  constructor(props){
    super(props);
    this.state={
      verificationCode:0,
      buttonStatus:true
    }
    this.handleVerificationCode = this.handleVerificationCode.bind(this);
    this.submitVerification = this.submitVerification.bind(this);
    this.resendCode = this.resendCode.bind(this);
    this.verificationSuccess = this.verificationSuccess.bind(this);
  }
  handleVerificationCode(event){
    let val = event.target.value;
    this.setState({verificationCode:val});
  }

  submitVerification(){
    var that = this;
    var vCode = that.state.verificationCode;
    request.post('/verify')
    .query({email:that.props.location.query.email})
    .end(function(err, res){
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
          var checkVcode = res.body.user[0].verificationCode;
          console.log("res:",res);
          if(vCode == checkVcode){
            that.verificationSuccess();
            hashHistory.push('/bloggerPage');
          }
          else{
            alert("Incorrect code");
            that.setState({buttonStatus:false});
          }
      }
    });
  }

  resendCode(){
    var that = this;
    request.post('/resendCode')
    .query({email:that.props.location.query.email})
    .end(function(err, res){
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
          alert("Code resended ");
          that.setState({buttonStatus:true});
      }
    });
  }

  verificationSuccess(){
    var that = this;
    request.post('/verificationStatus')
    .query({email:that.props.location.query.email})
    .end(function(err, res){
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        alert("Your account activated successfully");
      }
    });
  }

render() {
    return (
      <div>
        <Grid  centered columns={2} style={{marginTop:'6%'}}>
          <Grid.Column>

        <ReactInterval timeout={15000} enabled={true}
          callback={() => this.setState({buttonStatus:false})} />
        <Segment style={{width:'80%',textAlign:'center'}}>
          <h1>ACTIVATE YOUR ADD TO CARD ACCOUNT</h1>
          <div>
            <p>A verification code has been sent to your e-mail ID. Please enter the code below to verify your account and complete the registration process </p><br/>
          </div>
          <Form>
          <Form.Field>
            <label>Enter the verification code</label>
            <input placeholder='Verification code' onChange={this.handleVerificationCode}/>
          </Form.Field>
          {/* <div>
            <Header as='h4' color='blue'>Verify with the OTP sent to your mail</Header>
          </div> */}
          <br/>
          <div>
            <Button type='submit' color='orange' style={{align:"middle"}} onClick={this.submitVerification}>Verify</Button>
            {this.state.buttonStatus?<Button disabled content='Resend' icon='mail outline' labelPosition='right'/>:
              <Button  content='Resend' title="Resend the verification mail" icon='mail outline' labelPosition='right' onClick = {this.resendCode}/>
            }
          </div>
        </Form>

      </Segment>
      </Grid.Column>

      </Grid>

      </div>);
    }
  }

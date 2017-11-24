import React, {Component} from 'react';
import { Input,TextArea,Button,Form} from 'semantic-ui-react'
import Child from './child.jsx';
import Essential from './Essential.jsx';
import request from 'superagent';
import { Segment } from 'semantic-ui-react'
import {hashHistory} from 'react-router';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
// const ReactToastr = require('react-toastr');
// const {ToastContainer} = ReactToastr;
// const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      url:'',
      procedure:'',
      title:'',
      MainIngredient:[{
        name:'',
        quantity:'',
        unit:'',
              },
      ],
      EssentialIngredient:[{
        name:''
      }],
    }

this.onChangeUrl= this.onChangeUrl.bind(this);
this.handleTextarea = this.handleTextarea.bind(this);
this.addFields =this.addFields.bind(this);
this.updateNames= this.updateNames.bind(this);
this.updateQuantity = this.updateQuantity.bind(this);
this.updateUnit = this.updateUnit.bind(this);
this.updateEssential = this.updateEssential.bind(this);
this.addEssentialfield = this.addEssentialfield.bind(this);
this.handlelogout =this.handlelogout.bind(this);
this.handleTitle =this.handleTitle.bind(this);

  }
  LogoutSuccessfullyAlert() {
      this.refs.container.success(
        'Question Posted Successfully',
        '', {
        timeOut: 3000,
        extendedTimeOut: 10000
      });
    }
  handleTextarea(event){
    let val = event.target.value;
    this.setState({procedure:val});

  }

  handleSubmit()
  {
    request
 .post('/userIngredientDetails') //http://localhost:3000
 .query({details:JSON.stringify(this.state)})
 .set('X-API-Key', 'foobar')
 .set('Accept', 'application/json')
 .end(function(err, res){
   if (err || !res.ok) {
     alert('Oh no! error');
   } else {
     var confirmation = confirm('Are you sure to submit the details' );
     if(confirmation){
       alert("details are submitted");
     }
     else {
       hashHistory.push('/bloggerPage');
     }
   }
 });
  }
  handlelogout(){
    console.log(cookies.get('email'),"cookie before logout");
    cookies.remove('email');
     request.post('/logout')
     .query({email: cookies.get('email')})
     .end((err, res) => {
       if (err)
         console.log(err);
         else
         console.log(res,'response')
	 alert('Logged out successfully');
      hashHistory.push('/');
	  location.reload();
     });
  }
  onChangeUrl(event){
    let val1 = event.target.value;
    this.setState({url:val1});
    console.log('url : ',this.state.url);
  }
  handleTitle(event){
    let val1 = event.target.value;
    this.setState({title:val1});
  }
  addFields(){
    console.log('click***********',this.state.MainIngredient);
    let copy = this.state.MainIngredient;
    console.log(copy,"copy");
    let newField = {
      name:'',
      quantity:'',
      unit:'gm',
    }
    copy.push(newField);
    this.setState({copy});

  }
  addEssentialfield(){
    let copy = this.state.EssentialIngredient;
    let newField = {
      name:''
    }
    copy.push(newField);
    this.setState({copy});
  }
  updateNames(value,index){
    console.log(this.state.MainIngredient);
    let ingredientname =  this.state.MainIngredient[index];
    ingredientname.name= value;
    console.log(ingredientname,"name");
    //this.setState({MainIngredient:ingredientname});

  }
  updateUnit(value,index){
	  let ingredient = this.state.MainIngredient[index];
	  ingredient.unit = value;
  }
  updateQuantity(value,index){
    let ingredient =  this.state.MainIngredient[index];
    ingredient.quantity = value;
    console.log(ingredient,"quantity");
    console.log(this.state.MainIngredient,"inside update quantity");
  //  this.setState({MainIngredient:ingredient});

  }
  updateEssential(value,index){
    let mainIng = this.state.EssentialIngredient[index];
    mainIng.name=value;
    console.log(mainIng,"essentialing=====");

    //this.setState({EssentialIngredient:mainIng});
  }
  render() {
	  var abc;
	  if(cookies.get('email')){
		console.log("inside if");
	  abc=(<div>
      <Segment>
      <Button color='red' type='submit'style={{float:'right',marginRight:'5%',marginTop:'0%'}} onClick={this.handlelogout}>logout</Button>
      <br />
      <h1>ENTER DETAILS FOR YOUR DIY VIDEO</h1>
	     <br />
	      <br />
      <Form style={{marginLeft:'5%',marginRight:'5%'}}>
      <Form.Input style={{color:'#fbe5d6',fontSize:'12pt'}} placeholder='Enter url of your DIY video' type="text" required="true" onChange={this.onChangeUrl}/>
      <Form.Input style={{fontFamily: 'Poor Richard',color:'#fbe5d6'}} placeholder='Enter the title of your DIY video' type="text" required="true" onChange={this.handleTitle}/>
      <Form.TextArea style={{fontSize:'14pt',
      fontFamily: 'Poor Richard',
      borderColor:'#fce9dd',
      backgroundColor:'#333f50',color:'#fbe5d6'}} rows={2} placeholder='Procedure to make' required="true" onChange={this.handleTextarea}/>

      <p><b>ENTER MAIN INGREDIENTS </b></p>

      <Child MainIngred = {this.state.MainIngredient} addfield= {this.addFields} changeName ={this.updateNames} changeQuantiy={this.updateQuantity} changeUnit={this.updateUnit}/>

      <p><b>ENTER ESSENTIAL INGREDIENTS</b></p>
      <br/>

      <Essential EssentialIngredient = {this.state.EssentialIngredient} addEssential={this.addEssentialfield} changeEssential = {this.updateEssential}/>
      <hr></hr>


      <Button color='#e78c6f' floated='right' style={{marginRight:'0%'}} onClick={this.handleSubmit.bind(this)}>Submit</Button>
      <br/>
      <br/>
      </Form>
      </Segment>
      {/* <ToastContainer ref='container'
      toastMessageFactory={ToastMessageFactory}
      className='toast-top-center' /> */}
      </div>)
	  }
	  else{
		  console.log("in else ");
	  hashHistory.push('/');
	   location.reload();
	  }
      return(
		abc
	  )
    }

}

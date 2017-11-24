import React, {Component} from 'react';
import { Input,TextArea,Form,Select } from 'semantic-ui-react'

class Essential extends React.Component {

constructor(props){
super(props);
}
changeName(i,event){
  let val = event.target.value;
  let res = val.charAt(0).toUpperCase() + val.substr(1,val.length -1).toLowerCase();
  console.log(res,i,'value in child');

  this.props.changeEssential(res,i);
}
render() {
var component = this.props.EssentialIngredient.map((item,i) =>{
return(
<div key={i}>
<Form  >
<Form.Group>
<Form.Input required={true} placeholder='Name' width={7} onBlur={this.changeName.bind(this,i)}/>
<Form.Button color="#e78c6f" width={4} style={{marginLeft:'180%'}} onClick={this.props.addEssential}>Add</Form.Button >
</Form.Group>

</Form>
</div>
)
});
  return (

    <div>
    {component}
    </div>
  );

}
}
module.exports = Essential;

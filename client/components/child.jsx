import React, {Component} from 'react';
import { Input,TextArea,Form,Select,Grid,Button} from 'semantic-ui-react'

class child extends React.Component {

constructor(props){
super(props);
this.changeUnit=this.changeUnit.bind(this);
}
changeName(i,event){
  let val = event.target.value;
  let res = val.charAt(0).toUpperCase() + val.substr(1,val.length -1).toLowerCase();
  console.log(res,i,'value in child');
  this.props.changeName(res,i);
}
changeQuantity(i,event){
  let val = event.target.value;
  this.props.changeQuantiy(val,i);
}
 changeUnit(i,data){
   console.log(data,"dataaaaa******");

  // console.log(`event.target.value: ${JSON.stringify(event.target.value)}`);
  //
  // console.log(`data : ${JSON.stringify(data, null, 2)}`);
  var value=data.value
	, indexOfValue = data.options.findIndex(x => x.value==value)
	, indexOfMap = data.options[indexOfValue].index;
  console.log(value, ' -- ',indexOfMap);
this.props.changeUnit(value,indexOfMap);
}
render() {
var component = this.props.MainIngred.map((item,i) =>{

  var option = [ { key: 'ounce', text: 'Ounce', value: 'Ounce',index:i  },
                  { key: 'pound', text: 'Pound', value: 'pound',index:i  },
                  { key: 'li', text: 'litres', value: 'li',index:i  },
				  { key: 'Number', text: 'Number', value: 'number',index:i  }
      ];
return(
<div key={i}>
<Form  >
<Grid columns={4}>
  <Grid.Row>
  <Grid.Column><input style={{color:'#fce9dd',backgroundColor:'#333f50',borderColor:'#fce9dd'}} placeholder='Name' type="text" required="true" onBlur={this.changeName.bind(this,i)} /></Grid.Column>
  <Grid.Column><input style={{color:'#fce9dd',backgroundColor:'#333f50',borderColor:'#fce9dd'}} placeholder='Quantity' type="number" required="true" onBlur={this.changeQuantity.bind(this,i)} /></Grid.Column>
  <Grid.Column><Select style={{backgroundColor:'#333f50',borderColor:'#fce9dd'}} placeholder='Unit' onChange={this.changeUnit} options={option} /></Grid.Column>
  <Grid.Column><Button color="#e78c6f" style={{marginLeft:'36%',marginTop:'7%',marginRight:'17%'}} onClick={this.props.addfield}>Add</Button></Grid.Column>
</Grid.Row>
</Grid>
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
module.exports = child;

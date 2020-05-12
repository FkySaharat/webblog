import React, { Component} from 'react';
import Blogs from './components/blogs';
import CreateForm from './components/form';

export default class extends Component {
  constructor(){
    super();
    this.state={
      visible:'hidden'
    }
    this.showCreateForm=this.showCreateForm.bind(this);
  
  }

  showCreateForm(){
    
    this.setState({visible:'visible'})
    console.log("app",this.state.visible)
  }
  
  render(){
     return (
    <div className="App"  >
      
      <CreateForm show={this.state.visible}/>
      
      
     <div>{this.state.message}</div>
     <button onClick={()=>this.showCreateForm()}>create</button>

      
    
    </div>
  );
  }

 


}


import React, { Component} from 'react';
import Blogs from './components/blogs';
import CreateForm from './components/form';

export default class extends Component {
  constructor(){
    super();
    this.state={
      isShow:'hidden'
    }
    this.showCreateForm=this.showCreateForm.bind(this);
  
  }

  showCreateForm(){
     this.setState({isShow:'visible'})
  }
  
  render(){
    console.log("isShow",this.state.isShow) 
    return (
    <div className="App"  >

       <CreateForm show={this.state.isShow}/>
      
      
      
     <div>{this.state.message}</div>
     <button onClick={()=>this.showCreateForm()}>create</button>

      
    
    </div>
  );
  }

 


}


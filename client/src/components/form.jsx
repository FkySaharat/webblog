import React,{ Component } from "react";
import {TextField,Button} from '@material-ui/core';
import './form.css';

class CreateForm extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:this.props.show
        }
        this.closeform=this.closeform.bind(this);
    }
    componentDidMount() {
        console.log("willmount ",this.state.visible,this.props.show)
        if(this.state.visible !=this.props.show ){
            this.setState({visible:this.props.show})
            
        }
        
        
      }
    
    componentWillReceiveProps(){
        this.setState({visible:this.props.show})
    }
    

    closeform(){
        this.setState({visible:'hidden'})
    }

    render(){
        console.log(this.state.visible,this.props.show)
        return(
            <div className="Container" style={{visibility:this.state.visible}}>
                <form className="form">
                    <TextField className="title" id="standard-basic" label="Blog name" defaultValue="Hello World" fullWidth style={{margin:8}}/>
                    <TextField
                        className="content"
                        id="standard-multiline-static"
                        multiline
                        rows={25}
                        placeholder="Create your content here!!"
                        style={{margin:8}}
                    />
                </form>
                <Button className="create" variant="contained" color="secondary" style={{margin:8}}>
                    create
                </Button>
                <Button  onClick={()=>{this.closeform()}} color="primary" style={{margin:8}}>
                    cancle
                </Button>

            </div>
        );
    }

}

export default CreateForm; 
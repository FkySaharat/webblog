import React,{ Component } from "react";
import {TextField,Button} from '@material-ui/core';
import './form.css';

class CreateForm extends Component{
    constructor(props){
        super(props);
        this.state={
          
        }
        
        
    }
    render(){
        
        return(
            <div className="Container" style={{visibility:this.props.show}}>
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
                <Button  color="primary" style={{margin:8}}>
                    cancle
                </Button>

            </div>
        );
    }

}

export default CreateForm; 
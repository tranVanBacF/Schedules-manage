import React from 'react'
import { Input } from 'reactstrap';

const InputField = (props) =>{

    return (
        <Input
        type={props.type}
        placeholder= {props.placeholder}
        value={props.value}
        onChange={(e) => {
            this.handleChange("email", e.target.value.trim())
        }}
        style={{ marginBottom: '10px' }}
        
        />
    )
}

export default InputField;
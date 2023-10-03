import React from 'react';
import { Alert } from 'react-bootstrap';


function MessageBox(props){
    return(
        <Alert variant={props.variant}>{props.children}</Alert>
    )
}

export default MessageBox;
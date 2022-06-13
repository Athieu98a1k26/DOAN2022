import React, { Component } from 'react';
import TextField from './input2';
class TextArea extends Component {
    render() {
        return (
            <TextField multiline {...this.props}/>
        );
    }
}
export default TextArea;
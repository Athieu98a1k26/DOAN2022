import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Label extends Component {
    render() {
        const { children, className, ...attributes} = this.props;
        return (
            <label className="form-control-label" {...attributes} >{children}</label>
        );
    }
}
Label.defaultProps = {
    className:'',
    children :''
}
Label.propTypes = {
    className:PropTypes.string,
    children:PropTypes.oneOfType([PropTypes.string,PropTypes.node]),
};

export default Label;
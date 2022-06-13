import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Editable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            html: this.props.html
        }
    }

    componentWillReceiveProps(props) {
        if (props.html != this.state.html) {
            this.setState({ html: props.html });
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.html != this.state.html || nextProps.tagName != this.props.tagName;
    }

    onBlur = (e) => {
        this.setState({ focused: false });
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    onFocus = (e) => {
        this.setState({ focused: true });
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    onChange = (e) => {
        this.setState({ html: e.target.innerHTML });
        if (this.props.onChange) {
            this.props.onChange(e.target.innerHTML);
        }
    }


    render() {

        const tag = this.props.tagName || 'div';

        const style = !this.state.focused ? this.props.style : {
            ...this.props.style,
            ...this.props.focusStyle
        };

        const className = classNames(this.props.className, {
            [this.props.focusClassName]: this.state.focused
        });
        const props = {
            style,
            className,
            dangerouslySetInnerHTML: { __html: this.state.html },
            contentEditable: !this.props.disabled,
            onFocus: this.onFocus,
            onInput: this.onChange,
            onBlur: this.onBlur
        }

        return React.createElement(tag, props);
    }
}

Editable.propTypes = {
    tagName: PropTypes.string,
    html: PropTypes.string,
    style: PropTypes.object,
    focusStyle: PropTypes.object,
    className: PropTypes.string,
    focusClassName: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
}
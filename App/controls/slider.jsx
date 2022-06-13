import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSlider from 'rc-slider';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue || 0,
        }
    }

    handleChange(value) {
        this.setState({ value });
        if (this.props.hasOwnProperty('onChange')) {
            this.props.onChange(value);
        }
    }
    render() {
        const { color, name, ...attributes } = this.props;
        const { value } = this.state;
        if (attributes.hasOwnProperty('handleStyle')) {
            attributes.handleStyle.background = color;
        } else {
            attributes.handleStyle = {
                background: color,
                'borderColor': color,
            }
        }
        if (attributes.hasOwnProperty('trackStyle')) {
            attributes.trackStyle.background = color;
        } else {
            attributes.trackStyle = {
                background: color,
                trackStyle: '2px'
            }
        }
        return (
            <div className="form-group">
                <ReactSlider
                    onChange={this.handleChange.bind(this)}
                    {...attributes} />
            </div>

        );
    }
}

Slider.defaultProps = {
    color: "red",
}
Slider.propTypes = {
    color: PropTypes.string,
    'onChange': PropTypes.func,
};

export default Slider;
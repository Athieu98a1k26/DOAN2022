import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { formatColor } from '../lib/color';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from './input2';

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: this.props.show,
            color: this.props.color,
            value: this.props.value,
        };
    }

    open = () => {
        this.setState({ displayColorPicker: true });
    };

    close = () => {
        this.setState({ displayColorPicker: false });
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb, value: formatColor(color.rgb) });
        if (this.props.onChange) {
            this.props.onChange(formatColor(color.rgb));
        }
    };

    render() {
        const { className, onChange, color, value, show, showType, showPicker , ...inputProps } = this.props;
        const classes = classNames(
            'color-picker',
            `type-${showType}`,
            className,
        )
        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                    marginTop: '-2rem'
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div className={classes}>
                {
                    showType == "input" ? <Input
                        {...inputProps} value={value}
                        className="input--color"
                        onFocus={this.open}
                        onChange={this.handleChange}
                        append={
                            showPicker ? <div className="color-picker--icon" onClick={() => this.setState({ displayColorPicker: !this.state.displayColorPicker })}>
                                <div className="pointer color-picker--color"
                                    style={{ backgroundColor: value, height: "100%" }}> </div>
                                <div className="color-picker-img"></div>
                            </div> : null
                        }
                    /> :
                        <div className="color-picker--icon" onClick={() => this.setState({ displayColorPicker: !this.state.displayColorPicker })}>
                            <div className="pointer color-picker--color"
                                style={{ backgroundColor: value, height: "100%" }}> </div>
                            <div className="color-picker-img"></div>
                        </div>
                }
                {
                    this.state.displayColorPicker && (
                        <div style={styles.popover}>
                            <div style={styles.cover} onClick={this.close} />
                            <SketchPicker color={this.state.color} onChange={this.handleChange} />
                        </div>
                    )
                }
            </div>

        )
    }
}

ColorPicker.defaultProps = {
    color: {
        r: '0',
        g: '0',
        b: '0',
        a: '1',
    },
    value: '#000',
    show: false,
    showType: "input",
    showPicker:false,
}

ColorPicker.propTypes = {
    color: PropTypes.shape({
        r: PropTypes.string,
        g: PropTypes.string,
        b: PropTypes.string,
        a: PropTypes.string,
    }),
    show: PropTypes.bool,
    showType: PropTypes.oneOf(["color", "input"]),
    showPicker: PropTypes.bool,
    ...Input.propTypes
}


export default ColorPicker
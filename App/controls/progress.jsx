import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
class Progess extends Component {
    barStyle = (value) => {
        const percent = value * this.props.max / 100;
        return { "width": `${percent}%` };
    }
    barClass = (bar) => {
        return classnames(
            'progress-bar',
            bar.color !== '' ? `bg-${bar.color}` : false,
            {
                'progress-bar-striped': bar.striped,
            }
        );
    }
    render() {
        const { className, max, min, height, bars, style, ...attributes } = this.props;
        const classes = classnames(
            'progress',
            className,
        );
        if (bars instanceof Array && bars.length === 0) {
            console.warn('Attributes of Progess is empty');
        }
        return (
            <div className={classes} onChange={this.handleChange} style={{ height, ...style }}>
                {
                    (bars instanceof Array) ? (
                        bars.map((bar, index) => {
                            return (
                                <div key={index} className={this.barClass(bar)} role="progressbar" style={this.barStyle(bar.value)}></div>
                            );
                        })
                    ) : (
                            <div className={this.barClass(bars)} role="progressbar" style={this.barStyle(bars.value)}></div>
                        )
                }

            </div>
        );
    }
}

Progess.defaultProps = {
    className: '',
    max: 100,
    min: 0,
    bars: {
        value: 0,
        color: '',
        striped: false,
    },
}

Progess.propTypes = {
    striped: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    height: PropTypes.number, //height of bar in pixel
    bars: PropTypes.oneOfType([
        PropTypes.shape({
            value: PropTypes.number.isRequired,
            color: PropTypes.oneOf['success', 'warning', 'danger', 'info', ''],
            striped: PropTypes.bool,
        }),
        PropTypes.array,
    ])
};

export default Progess;
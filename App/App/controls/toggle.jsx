import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Toggle extends React.Component {
    constructor(props) {
        super(props);
    }

    toggle = () => {
        if (this.props.hasOwnProperty('onChange')) {
            this.props.onChange(!this.props.on);
        }
    }

    render() {
        const { color, label, className, column, on } = this.props;

        const wrapControl = classNames({
            'wrap-form-control': true,
            [`col-md-${column}`]: column
        })

        const classes = classNames('toggle-switch', {
            [`toggle-switch--${color}`]: color,
            'active': this.props.on,
        });

        const wrapClasses = classNames(className,
            column ? 'row' : null,
            {
                'form-group': label,
            });

        const labelClass = classNames({
            'form-control--label': true,
            [`col-md-${12 - column} col-form-label`]: column
        })

        return (
            <div className={wrapClasses}>
                {label && <label className={labelClass}>{label}</label>}
                {
                    <div className={wrapControl}>
                        <div className={classes}>
                            <input type="checkbox" className="toggle-switch__checkbox" onChange={this.toggle} checked={on} />
                            <i className="toggle-switch__helper"></i>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


Toggle.propTypes = {
    color: PropTypes.oneOf([null, 'red', 'blue', 'green', 'amber', 'cyan', 'purple']),
    on: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default Toggle;
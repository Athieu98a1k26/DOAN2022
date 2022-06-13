import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import loadingImage from '../asset/img/fb-loading.gif';

export default class Loading extends React.Component {
    render() {
        const { type, padding: pad, background, show, className, ...props } = this.props;
        const classes = classNames(className, {
            'page-loader': type == 'full',
            'card-loader': type == 'card',
            'box-loader': type == 'block',
            'inline-loader': type == 'inline'
        });

        let backgroundColor = background;

        if (!background) {
            if (type == 'full') backgroundColor = 'rgba(0,0,0,.1)';
            if (type == 'card') backgroundColor = 'rgba(0,0,0,.01)';
        }
        const padding = pad || (type == 'block' ? 60 : 10);

        if (show) {
            if (type == 'full') {
                return (
                    <div className={classes} style={{ backgroundColor }}>
                        <div className="page-loader__spinner">
                            <svg viewBox="25 25 50 50">
                                <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"></circle>
                            </svg>
                        </div>
                    </div>
                )
            }
            else if (type == 'card') {
                return (
                    <div className={classes} style={{ backgroundColor }}>
                        <svg viewBox="25 25 50 50">
                            <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"></circle>
                        </svg>
                    </div>
                )
            }
            else if (type == 'block') {
                return (
                    <div className={classes} style={{ padding, backgroundColor }}>
                        <svg viewBox="25 25 50 50">
                            <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"></circle>
                        </svg>
                    </div>
                )
            }
            else {
                return (
                    <div className=" align-center">
                        <img src={loadingImage} className={classes} style={{ padding, width: 50, height: 50 }} />
                    </div>
                )
            }
        }
        return null;
    }
}

Loading.propTypes = {
    type: PropTypes.oneOf(['block', 'inline', 'card', 'full']),
    background: PropTypes.string,
    padding: PropTypes.number,
    show: PropTypes.bool
}

Loading.defaultProps = {
    type: 'block'
}
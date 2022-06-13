import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';
import classnames from 'classnames';
class QuickStats extends Component {
    render() {
        const { background, title, subTitle, icon, className, iconSize, ...atts } = this.props;
        const classes = classnames(
            "quick-stats__item",
            `bg-${background}`,
            className
        )
        return (
            <div className={classes} {...atts}>
                <div className="quick-stats__info">
                    <h2>{title}</h2>
                    <small>{subTitle}</small>
                </div>
                <div className="quick-stats__chart">
                    <Icon name={icon} size={iconSize} color="#fff" />
                </div>
            </div>
        );
    }
}

export default QuickStats;

QuickStats.defaultProps = {
    background: "red",
    iconSize: 48,
}

QuickStats.propTypes = {
    background: PropTypes.oneOf(["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "grey", "blue-grey", "black"]).isRequired,
    icon: PropTypes.string.isRequired,
    iconSize: PropTypes.number.isRequired,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]).isRequired,
    subTitle: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
}
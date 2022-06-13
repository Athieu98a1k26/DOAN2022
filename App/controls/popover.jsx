import React from 'react';
import PropTypes from 'prop-types';

export default class Popover extends React.Component {
    componentDidMount() {
        $('[data-toggle="popover"]:not([data-original-title])').popover();
    }
    render() {
        const { title, content, html, placement, trigger, animation, delay, container, ...props } = this.props;
        const child = React.Children.only(this.props.children);
        return React.cloneElement(child, {
            ...props,
            "data-toggle": 'popover',
            "title": title,
            "data-content": content,
            "data-placement": placement,
            "data-html": html,
            "data-animation": animation,
            "data-trigger": trigger,
            "data-delay": delay,
            "data-container": container,
        }, child.props.children);
    }
}

Popover.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    trigger: PropTypes.oneOf(['focus', 'hover', 'click', 'manual']),
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    animation: PropTypes.bool,
    delay: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            show: PropTypes.number,
            hide: PropTypes.number
        })
    ]),
    html: PropTypes.bool,
    container: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    children: PropTypes.element
}

Popover.defaultProps = {
    animation: true,
    delay: 0,
    html: false,
    placement: 'right',
    trigger: 'focus',
    container: false
}
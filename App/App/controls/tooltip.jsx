import React from 'react';
import PropTypes from 'prop-types';

export default class Tooltip extends React.Component {
    componentDidMount() {
        $(this.node).tooltip();
    }

    componentDidUpdate() {
        $(this.node).attr('data-original-title', this.props.title).removeAttr('title');
    }

    componentWillUnmount() {
        $(this.node).tooltip('dispose');
    }

    render() {
        const { title, html, placement, trigger, animation, delay, container, offset, ...props } = this.props;
        const child = React.Children.only(this.props.children);
        return React.cloneElement(child, {
            ...props,
            ref: (node) => {
                this.node = node;
                if (typeof child.ref === 'function') {
                    child.ref(node);
                }
            },
            "data-toggle": 'tooltip',
            "title": title,
            "data-placement": placement,
            "data-html": html,
            "data-animation": animation,
            "data-trigger": trigger,
            "data-delay": delay,
            "data-container": container,
            "data-offset": offset,
            "data-boundary": 'viewport'
        }, child.props.children)
    }
}

Tooltip.propTypes = {
    title: PropTypes.string,
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
    offset: PropTypes.number,
    children: PropTypes.element
}

Tooltip.defaultProps = {
    animation: true,
    html: false,
    placement: 'top',
    trigger: 'hover',
    offset: 0,
    container: false
}
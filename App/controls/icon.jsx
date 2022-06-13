import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';


export default class Icon extends React.Component {
    componentDidMount() {
        if (this.props.tooltip) {
            $(this.icon).tooltip();
        }
    }

    componentDidUpdate(preProps) {
        if (this.props.tooltip && this.props.tooltip != preProps.tooltip) {
            $(this.icon).attr('data-original-title', this.props.tooltip).removeAttr('title');
        }
    }

    componentWillUnmount() {
        if (this.props.tooltip) {
            $(this.icon).tooltip('dispose');
        }
    }

    render() {
        const { tagName, className, name, color, size: fontSize, href, link, style, tooltip, ...props } = this.props;
        const TagName = (tagName || 'i');

        const classes = classNames('mdi', className, `mdi-${name}`);

        const istyle = { ...style, color, fontSize };

        const attrs = {
            className: classes
        };

        if (tooltip) {
            attrs['title'] = tooltip;
            attrs['data-toggle'] = 'tooltip';
            attrs['data-placement'] = 'top';
            attrs['data-container'] = 'body';
            attrs['data-boundary'] = 'viewport';
        }


        if (href && link !== false) {
            <Link to={href} {...attrs} ref={ref => this.icon = ref} />
        }

        if (href) {
            return <a ref={ref => this.icon = ref} {...props} href={href}  {...attrs} style={istyle} />
        }

        return <TagName {...props} {...attrs} style={istyle} ref={ref => this.icon = ref} />
    }
}

Icon.propTypes = {
    tagName: PropTypes.string,
    href: PropTypes.string,
    tooltip: PropTypes.string,
    link: PropTypes.bool,
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number, // font size in pixel
    onClick: PropTypes.func
}
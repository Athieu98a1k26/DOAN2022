import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './icon';
import { Link } from 'react-router-dom';
export default class Button extends React.Component {

    componentDidMount() {
        if (this.props.tooltip) {
            $(this.button).tooltip();
        }
    }

    componentDidUpdate(preProps) {
        if (this.props.tooltip && this.props.tooltip != preProps.tooltip) {
            $(this.button).attr('data-original-title', this.props.tooltip).removeAttr('title');
        }
    }

    componentWillUnmount() {
        if (this.props.tooltip) {
            $(this.button).tooltip('dispose');
        }
    }

    render() {
        const { name, tagName, className, text, type, active,
            href, tooltip, tooltipPlacement, tooltipContainer, outline,
            size, block, icon, rightIcon, radio, checkbox, link, disabled, children, waves, ...props } = this.props;

        const allClass = classNames('btn', className, {
            ['btn-' + (outline ? 'outline-' : '') + type]: type,
            'btn-lg': size == 'large',
            'btn-sm': size == 'small',
            'btn-block': block,
            'waves-effect': waves,
            'btn--icon': (icon || rightIcon) && !text,
            'btn--icon-text': (icon || rightIcon) && text,
            'active': active,
            'disabled': disabled
        });

        const attrs = {
            ...props,
            className: allClass
        };

        if (tooltip) {
            attrs['title'] = tooltip;
            attrs['data-toggle'] = 'tooltip';
            attrs['data-placement'] = tooltipPlacement;
            attrs['data-container'] = tooltipContainer;
        }

        let TagName = tagName;

        if (link !== false && href) {
            TagName = Link;
            attrs["to"] = href;
        }
        else if (radio || checkbox) {
            TagName = 'label';
        }
        else if (!TagName) {
            TagName = href ? 'a' : 'button';
        }

        if (TagName == 'button') {
            attrs.type = 'button';
        }

        if (TagName == 'a' && href) {
            attrs.href = href;
        }

        const inputAttrs = {};

        if (active) {
            inputAttrs.defaultChecked = "checked";
        }
        if (disabled) {
            inputAttrs.disabled = 'disabled';
            attrs.disabled = 'disabled';
        }

        return (
            <TagName {...attrs} ref={ref => this.button = ref}>
                {
                    icon && <Icon name={icon} />
                }
                {
                    (radio || checkbox) && (
                        <input type={radio ? "radio" : "checkbox"}
                            name={name || 'noname'} value='0' autoComplete="off" {...inputAttrs} />
                    )
                }
                {text} {children}
                {
                    rightIcon && <Icon name={rightIcon} />
                }
            </TagName>
        )
    }
}

Button.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    tooltip: PropTypes.string,
    tooltipPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    tooltipContainer: PropTypes.string,
    href: PropTypes.string,
    link: PropTypes.bool,
    name: PropTypes.string,
    tagName: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf([
        null, 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link',
        'green', 'blue', 'red', 'orange', 'teal', 'cyan', 'blue-grey', 'purple', 'indigo', 'lime'
    ]),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    block: PropTypes.bool,
    outline: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    radio: PropTypes.bool,
    checkbox: PropTypes.bool,
    waves: PropTypes.bool,
    icon: PropTypes.string,
    onClick: PropTypes.func
}

Button.defaultProps = {
    type: 'primary',
    waves: true
}
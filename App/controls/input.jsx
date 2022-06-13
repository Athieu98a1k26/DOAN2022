import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextArea from './textarea';
import { isEmail } from '../lib/helpers';
import validateMsg from '../constants/validate';
export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || '',
            validate: {},
            validated: true,
            validOnChange: this.props.validOnChange,
        }
    }
    callback = () => {
        if (this.props.hasOwnProperty('onValidate')) {
            this.props.onValidate(this.state.validated);
        }
    }

    handleValidate = () => {
        this.setState({
            validated: true,
        })
        const { validatePattern, type } = this.props;

        if (this.props.required && this.input.value === '') {
            this.setState({
                validate: validateMsg.required,
                validated: false,
                validOnChange: true,
            });
            this.callback();
            return false;
        }
        if (type === 'email' && !isEmail(this.input.value)) {
            this.setState({
                validate: validateMsg.emailType,
                validated: false,
                validOnChange: true,
            });
            this.callback();
            return false;
        }
        if (validatePattern) {
            if (validatePattern instanceof Array && validatePattern.length > 0) {
                for (let _i = 0; _i < validatePattern.length; _i++) {
                    const valid = validatePattern[_i];
                    let pattern = new RegExp(valid.pattern);
                    if (!pattern.test(this.input.value)) {
                        this.setState({
                            validate: {
                                message: valid.message,
                                type: valid.type || 'danger',
                            },
                            validated: false,
                            validOnChange: true,
                        });
                        break;
                    }
                }
            } else if (!validatePattern.pattern.test(this.input.value)) {
                this.setState({
                    validate: {
                        message: validatePattern.message,
                        type: validatePattern.type || 'danger',
                    },
                    validated: false,
                    validOnChange: true,
                });
            }
            this.callback();
        }
    }
    handleChange = () => {
        this.setState({ value: this.input.value });
        if (this.state.validOnChange || this.input.value === '') {
            this.handleValidate();
        }
    }

    render() {
        const hooks = ['onValidate', 'validOnChange', 'validatePattern'];

        let { className, size, label, value, children, material, ...attributes } = this.props;
        let { validated, validate } = this.state;
        //remove props
        hooks.forEach((hook, index) => {
            if (attributes.hasOwnProperty(hook)) {
                delete attributes[hook];
            }
        });



        if (attributes.hasOwnProperty('multiline')) {
            delete attributes['value'];
            return (
                <TextArea {...attributes}>{children}</TextArea>
            )
        } else {
            const float = this.props.float;
            delete attributes['float'];
            const classes = classNames(
                'form-control',
                className,
                size !== '' ? `form-control-${size}` : false,
                !validated ? `form-control-${validate.type}` : false,
                {
                    'form-control--float': float,
                    'form-control--active': this.state.value !== '',
                    'form-control-default': !material,
                }
            );
            const wrapClasses = classNames(
                'form-group',
                label !== '' && float ? 'form-group--float' : false,
                !validated ? `has-${validate.type}` : false,
            );
            return (
                <div className={wrapClasses}>
                    {
                        (label !== '' && !float) &&
                        <label className="form-control--label">{label}</label>
                    }
                    <div className="wrap-form-control">
                        <input ref={(ref) => this.input = ref}
                            className={classes}
                            onChange={this.handleChange}
                            {...attributes}
                            defaultValue={value}
                        />
                        {
                            (label !== '' && float) &&
                            <label className="label-float">{label}</label>
                        }
                        {float && <i className="form-group__bar" ></i>}

                    </div>
                    {
                        !validated ? (<small className="invalid-feedback">{validate.message}</small>) : null
                    }
                </div>
            )

        }
    }
}

Input.defaultProps = {
    value: '',
    type: 'text',
    className: '',
    size: '',
    label: '',
    children: '',
    float: false,
    validOnChange: false,
}

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email', 'password', 'file', 'tel', 'url', 'hidden', 'image', 'date', 'number', 'textarea']),
    size: PropTypes.string,
    label: PropTypes.string,
    float: PropTypes.bool,
    validOnChange: PropTypes.bool,
    validatePattern: PropTypes.oneOfType([
        PropTypes.shape({
            pattern: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['success', 'warning', 'danger', '']),
        }),
        PropTypes.array,
    ])
}


export class InputGroup extends React.Component {
    render() {
        const { tag, size, className, children, ...attributes } = this.props;
        const Tag = tag;
        const classes = classNames(
            'input-group',
            size !== '' ? `input-group-${size}` : false,
            className
        );
        return (
            <Tag className={classes} {...attributes}>
                {children}
            </Tag>
        );
    }
}
InputGroup.defaultProps = {
    tag: 'div',
    'size': ''
}

InputGroup.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['lg', 'md', 'sm', '']),
    tag: PropTypes.string.isRequired,
};

export class InputAddon extends React.Component {
    render() {
        const { tag, className, children, ...attributes } = this.props;
        const classes = classNames(className, 'input-group-addon');
        const Tag = tag;
        return (
            <Tag className={classes} {...attributes}>{children}</Tag>
        );
    }
}
InputAddon.defaultProps = {
    tag: 'span'
}

InputAddon.propTypes = {
    tag: PropTypes.string.isRequired,
    className: PropTypes.string
};

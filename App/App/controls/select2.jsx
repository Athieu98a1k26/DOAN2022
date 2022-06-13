import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from 'react-select';
import SelectWidthCheckbox from './select-with-checkbox';
import { components as selectComponents } from "react-select";

class ReactSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
        this.value = this.props.value;
    }

    componentDidUpdate(prevProps) {
        if(this.props.value && prevProps.value != this.props.value && this.props.autoValidate) {
            this.validate();
        }
        setTimeout(() => {
            // Nếu select tồn tại nhưng bị ẩn -> xóa trạng thái lỗi
            if($(this.selectWrap).length && !$(this.selectWrap).is(':visible') && this.state.error) {
                this.setState({ error: null });
            }
        }, 500);
    }

    componentDidMount() {
        if(this.props.hotKey) {
            document.addEventListener('keydown', this.onKeyup)
        }
    }

    componentWillUnmount() {
        if(this.props.hotKey) {
            document.removeEventListener('keydown', this.onKeyup)
        }
    }

    onKeyup = (e) => {
        if(e.key == this.props.hotKey) {
            e.preventDefault();
            this.select.focus();
        }
    }


    validate = () => {
        const { required, requiredMessage, onValidate, multi, checkbox, value } = this.props;

        if(checkbox) {
            return this.selectCheckbox.validate();
        }

        let error = null, msgType = 'danger';
        if(required && ((value === null || value === undefined || value === '') || ((multi || checkbox) && value.length == 0))) {
            error = requiredMessage;
        }

        if(onValidate) {
            onValidate(!!error);
        }

        if(error) {
            this.setState({ error, msgType });
            return false;
        } else {
            this.setState({ error: null });
            return true;
        }
    };


    handleChange = (value) => {
        let currentValue = value;
        let model = null;

        if(this.props.multi || this.props.multiple) {
            model = [],
                value = value || [],
                currentValue = value.map(item => {
                    model.push(item.model || null);
                    return item.value;
                });
        } else if(value) {
            currentValue = value.value;

            const find = this.options.find(item => item.value === value.value);
            model = find && find.model ? find.model : null;
        }

        this.value = currentValue;


        if(this.props.hasOwnProperty('onChange')) {
            this.props.onChange(currentValue, model);
        }
        if(this.props.autoValidate) {
            this.validate();
        }
    }

    getChildOption = (option) => {
        let options = [];
        if(option.options) {
            option.options.forEach(op => {
                if(op.options) {
                    options = [
                        ...options,
                        ...this.getChildOption(op)
                    ]
                } else {
                    options.push(op);
                }
            })
        }
        return options;
    }

    getValues = () => {
        let options = [];
        this.options.map(op => {
            if(op.options) {
                options = options.concat(this.getChildOption(op));
            } else {
                options.push(op);
            }
        });
        if(this.props.multiple || this.props.multi) {
            return options.filter(item => {
                return item.value && this.props.value.contains(item.value);
            }).uniqueObj("value")
        } else {
            return options.find(item => {
                return this.props.value == item.value;
            })
        }
    }

    render() {
        if(this.props.checkbox) {
            return <SelectWidthCheckbox
                {...this.props}
                ref={ref => this.selectCheckbox = ref}
                required={this.props.required}
            />
        }

        const {
            label, className, material, column, required, onChange, loading, isLoading,
            noResultsText, onValidate, autoValidate, requiredMessage, onCreate, controlClass,
            validation, value, showMessage, type, multiple, multi, borderHidden, description,
            prepend, append, size, noMargin, onAppendClick, style, components, ...attributes
        } = this.props;

        attributes.isMulti = multiple || multi;
        attributes.isDisabled = attributes.disabled;
        //enable clearable for multiple by default
        if(attributes.clearable || attributes.multi) {
            attributes.isClearable = true;
        }
        this.options = attributes.options;

        let defaultValue = value;
        if(value) {
            if(attributes.isMulti) {
                if(value instanceof Array) {
                    if(attributes.options) {
                        defaultValue = this.getValues();
                    }
                } else {
                    defaultValue = this.getValues().first();
                }
            } else {
                if(attributes.options && value) {
                    defaultValue = this.getValues();
                }
            }
        }

        this.value = defaultValue;


        const wrapClasses = classnames(className, {
            'row': column,
            'form-group from-group-has-label': label,
            'form-group-default': !material,
            [`has-${this.state.msgType}`]: this.state.error
        });

        const labelClass = classnames('form-control--label', {
            [`col-md-${12 - column} col-form-label`]: column
        })

        const wrapControl = classnames('wrap-form-control wrap-react-select-control', controlClass, {
            [`col-md-${column}`]: column,
            'empty-label': (!label && !noMargin),
            "m-0": noMargin,
            "control-required": required
        })

        const GroupHeading = (props) => (
            <div onClick={() => this.props.onGroupClick(props.children)}>
                <selectComponents.GroupHeading  {...props} />
            </div>
        );

        const hasAddOn = (prepend || append);

        const inputGroupClasses = classnames('input-group', {
            'input-group-sm': size == 'small',
            'input-group-lg': size == 'large',
            'm-0': true
        });

        const selectClass = classnames({
            'border-hidden': borderHidden,
            'flex-1 has-addon': hasAddOn,
            'has-error': this.state.error
        })

        const selectControl = <Select
            classNamePrefix={"react-select"}
            className={selectClass}
            isOptionDisabled={(option) => option.disabled}
            styles={customStyles}
            onSelectResetsInput={false}
            ref={ref => this.select = ref}
            value={defaultValue}
            isLoading={isLoading || loading}
            onChange={this.handleChange}
            noResultsText={noResultsText}
            {...attributes}
            components={{ GroupHeading, ...components }}
        />;

        return (
            <div className={wrapClasses} style={style}>
                {
                    label && <label className={labelClass}>{label}
                        {
                            required && <small className="text-danger required-icon">(*)</small>
                        }
                    </label>
                }
                {
                    <div className={wrapControl} ref={ref => this.selectWrap = ref}>
                        {
                            hasAddOn && (
                                <div className={inputGroupClasses}>
                                    {
                                        prepend && (
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">{prepend}</span>
                                            </div>
                                        )
                                    }
                                    {selectControl}
                                    {
                                        append && (
                                            <div
                                                className={classnames('input-group-append', { pointer: !!onAppendClick })}
                                                onClick={onAppendClick}>
                                                <span className="input-group-text">{append}</span>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            !hasAddOn && selectControl
                        }

                        {
                            (this.state.error && showMessage) && (
                                <small className="invalid-feedback d-block">{this.state.error}</small>
                            )
                        }
                        {
                            description && <small className="text-muted input-description">{description}</small>
                        }
                    </div>
                }

            </div>
        );
    }
};

ReactSelect.defaultProps = {
    value: '',
    requiredMessage: __('This filed is required'),
    autoValidate: true,
    noResultsText: __("There are no matching results"),
    showMessage: true,
    childPrefix: '-',
    placeholder: __("Choose"),
    excludedValues: [],
    type: "value",//object
    onGroupClick: () => {
    },
    borderHidden: false
}
ReactSelect.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    clearable: PropTypes.bool,
    noResultsText: PropTypes.string,
    autoValidate: PropTypes.bool,
    requiredMessage: PropTypes.string,
    column: PropTypes.number,
    disabled: PropTypes.bool,
    onGroupClick: PropTypes.func,
    borderHidden: PropTypes.bool,
    multi: PropTypes.bool,
    description: PropTypes.string,
}
export default ReactSelect;


const customStyles = {
    container: (base, state) => {

    },
    control: (base, state) => {
        return {
            ...base,
            minHeight: 0,
            backgroundColor: "#fff",
            border: state.selectProps.className.match(/error/) ? "1px solid #ff6b68" : "1px solid rgba(0, 0, 0, 0.15)",
            borderRadius: 2,
            fontSize: "1rem",
            padding: state.hasValue && state.isMulti ? "0.354rem 0.65rem" : "0.475rem 0.65rem",
            color: "#495057",
            boxShadow: state.isFocused ? 'inset 0 1px 1px rgba(0, 0, 0, 0.075)' : 'inset 0 0.5px 0.5px rgba(0,0,0,0.15)',
            '&:hover': {
                borderColor: state.selectProps.className.match(/error/) ? "#ff6b68" : "rgba(0,0,0,0.15)",
            }
        }
    },
    multiValue: (base) => {
        return {
            ...base,
            margin: '0 2px'
        }
    },
    valueContainer: (base, state) => {
        return {
            ...base,
            lineHeight: 1.5,
            padding: 0,
            maxWidth: "100%",
            overFlow: "hidden"
        }
    },
    clearIndicator: (base, state) => {
        return {
            ...base,
            padding: "0 8px",
        }
    },
    dropdownIndicator: (base, state) => {
        return {
            ...base,
            padding: "0 8px",
        }
    },
    menu: (base, state) => {
        return {
            ...base,
            zIndex: state.selectProps.zIndex || 4,
            border: "1px solid rgba(0, 0, 0, 0.15)",
            borderRadius: 0,
            width: state.selectProps.menuWidth || base.width,
            left: state.selectProps.menuLeft ? 'auto' : base.left,
            right: state.selectProps.menuLeft ? 0 : base.right
        }
    },
    group: (base, state) => {
        return {
            ...base,
            padding: 0,
        }
    },
    groupHeading: (base, state) => {
        return {
            ...base,
            color: "#000",
            fontWeight: 700,
            padding: "8px 12px",
            margin: 0,
            fontSize: "80%"
        }
    },
    indicatorSeparator: () => {
        return {
            display: 'none'
        }
    }
}

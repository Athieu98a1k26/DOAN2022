import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from 'react-select';
import Checkbox from './checkbox';
import { components } from "react-select";
import { isEqual } from 'lodash';

const Option = props => {
    return (
        <div className={props.value == allOption.value ? "border-bottom mb-1 pb-1" : ""}>
            <components.Option {...props}>
                <Checkbox
                    checked={props.isSelected}
                    onChange={() => null}
                    label={props.label}
                />
            </components.Option>
        </div>
    );
};

const allOption = {
    label: "Selected all",
    value: "*"
};
const ValueContainer = ({ children, ...props }) => {
    const currentValues = props.getValue();
    let toBeRendered = children;
    if (currentValues.length == 1) {
        toBeRendered = children[0][0].props.data.label;
    } else if (currentValues.some(val => val.value === allOption.value)) {
        if (currentValues.length == 2) {
            toBeRendered = children[0][1].props.data.label;
        } else {
            toBeRendered = 'Selected all'
        }
    } else if (currentValues.length > 1) {
        toBeRendered = 'Selected ' + currentValues.length;
    } else {
        return (
            <components.ValueContainer {...props}>
                {toBeRendered}
            </components.ValueContainer>
        );
    }

    return (
        <components.ValueContainer {...props}>
            {toBeRendered}
            {React.Children.map(children[1], (child) => (child && [components.SingleValue].indexOf(child.type) === -1) ? child : null)}
        </components.ValueContainer>
    );
};


class ReactSelectCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            selectedAll: false,
            menuIsOpen: false,
        }
        this.value = this.props.value;
    }

    componentDidUpdate(prevProps) {
        const isUpdateValue = !isEqual(prevProps.value, this.props.value);
        if (isUpdateValue && this.props.autoValidate) {
            this.validate();
        }
        if (isUpdateValue || !isEqual(this.props.options, prevProps.options)) {
            this.toggleSelectAll()
        }
        setTimeout(() => {
            // Nếu select tồn tại nhưng bị ẩn -> xóa trạng thái lỗi
            if ($(this.selectWrap).length && !$(this.selectWrap).is(':visible') && this.state.error) {
                this.setState({ error: null });
            }
        }, 500);

    }

    toggleSelectAll = () => {
        const values = this.props.value || [];
        let allOptions = this.getAllOptions();
        if (allOptions.length > 0 && values.length === allOptions.uniqueObj("value").length) {
            this.setState({ selectedAll: true })
        } else {
            this.setState({ selectedAll: false })
        }
    }

    componentDidMount() {
        this.toggleSelectAll()
        if (this.props.hotKey) {
            document.addEventListener('keydown', this.onKeyup)
        }
        document.addEventListener('click', this.onClick)
    }

    componentWillUnmount() {
        if (this.props.hotKey) {
            document.removeEventListener('keydown', this.onKeyup)
        }
        document.removeEventListener('click', this.onClick)
    }


    onClick = (e) => {
        if (!$(e.target).is("[class*='-container']")
            && !$(e.target).is("[class*='-container'] *")
        ) {
            this.setState({ menuIsOpen: false })
        }

    }

    onKeyup = (e) => {
        if (e.key == this.props.hotKey) {
            e.preventDefault();
            this.select.focus();
        }
    }


    validate = () => {
        const { required, requiredMessage, onValidate } = this.props;
        let error = null, msgType = 'danger';

        if (required && (this.value === undefined || this.value === null || this.value === "" || this.value === '' || this.value.length == 0)) {
            error = requiredMessage;
        }
        if (onValidate) {
            onValidate(!!error);
        }

        if (error) {
            this.setState({ error, msgType });
            return false;
        } else {
            this.setState({ error: null });
            return true;
        }
    };

    groupClick = (key) => {
        const options = this.props.options;
        const group = options.find(option => option.label === key);

        const value = this.props.value || [];

        const selecteds = this.getAllOptions().filter(x => value.contains(x.value));

        const groupVal = group.options;
        const newValue = selecteds.concat(groupVal).uniqueObj("value");
        this.handleChange(newValue, {
            action: "select-option"
        })
    };

    handleChange = (selected, event) => {
        if (selected !== null && selected.length > 0) {
            if (event.action === "select-option"
                && !this.state.selectedAll
                && selected.any(s => s.value === allOption.value)) { // select all
                selected = [...this.getAllOptions()];
                this.setState({ selectedAll: true })
            } else {
                let allOptions = this.getAllOptions();
                if (selected.length === allOptions.uniqueObj("value").length) {
                    if (selected.any(s => s.value === allOption.value)) {
                        this.setState({ selectedAll: false })
                    } else if (event.action === "select-option") {
                        this.setState({ selectedAll: true })
                    } else if (event.action === "deselect-option") {
                        selected = [];
                        this.setState({ selectedAll: false })
                    }
                }
            }
        } else {
            this.setState({ selectedAll: false })
        }

        console.log('selectedAll', selected)


        let currentValue = selected;
        let models = [];

        if (selected) {
            currentValue = selected.filter(item => item.value != allOption.value).map(item => item.value)
            models = selected.filter(item => item.value != allOption.value).map(item => item.model)
        }

        this.value = currentValue;

        if (this.props.onChange) {
            this.props.onChange(currentValue, models);
        }
        if (this.props.autoValidate) {
            this.validate();
        }
    }

    getChildOption = (option) => {
        let options = [];
        if (option.options) {
            option.options.forEach(op => {
                if (op.options) {
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

    getAllOptions = () => {
        let options = [];
        this.props.options.map(op => {
            if (op.options) {
                options = options.concat(this.getChildOption(op));
            } else {
                options.push(op);
            }
        });
        return options;
    }

    getValues = () => {
        if (!this.props.value && this.props.value !== 0) return [];

        let options = this.getAllOptions();

        return options.filter(item => {
            return (item.value || item.value === 0) && this.props.value.length > 0 && this.props.value.contains(item.value);
        }).uniqueObj("value")
    }


    render() {
        const {
            label, className, material, column, required, onChange, loading, isLoading,
            noResultsText, onValidate, autoValidate, requiredMessage, onCreate, controlClass,
            validation, value, showMessage, type, borderHidden, onGroupClick,
            prepend, append, size, noMargin, onAppendClick, options, style, ...attributes
        } = this.props;

        attributes.isMulti = true;
        attributes.isDisabled = attributes.disabled;

        //enable clearable for multiple by default
        if (attributes.clearable == undefined) {
            //attributes.clearable = true;
        }

        let defaultValue = this.getValues();

        if (this.state.selectedAll) {
            defaultValue = [allOption, ...defaultValue];
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

        const wrapControl = classnames('wrap-form-control', controlClass, {
            [`col-md-${column}`]: column,
            'empty-label': (!label && noMargin === false),
            "m-0": noMargin,
            "control-required": required
        })

        const GroupHeading = (props) => (
            <div onClick={() => this.groupClick(props.children)}>
                <components.GroupHeading  {...props} />
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
            'flex-1': hasAddOn,
            'has-error': this.state.error
        })

        const selectControl =
            <Select
                onGroupClick={this.groupClick}
                classNamePrefix={"react-select"}
                className={selectClass}
                styles={customStyles}
                onSelectResetsInput={false}
                hideSelectedOptions={false}
                menuIsOpen={this.state.menuIsOpen}
                onMenuOpen={() => this.setState({ menuIsOpen: true })}
                onMenuClose={() => this.setState({ menuIsOpen: false })}
                ref={ref => this.select = ref}
                value={defaultValue}
                isLoading={isLoading || loading}
                onChange={this.handleChange}
                noResultsText={noResultsText}
                closeMenuOnSelect={false}
                components={{
                    Option,
                    ValueContainer,
                    GroupHeading
                }}
                options={[allOption, ...options]}
                {...attributes}
            />;

        // console.log(value,'value');

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
                    </div>
                }

            </div>
        );
    }
}
;

ReactSelectCheckbox.defaultProps = {
    value: '',
    requiredMessage: __('Trường này là bắt buộc'),
    autoValidate: true,
    noResultsText: __("Không có kết quả nào phù hợp"),
    showMessage: true,
    childPrefix: '-',
    placeholder: __("Lựa chọn"),
    excludedValues: [],
    type: "value",//object
    onGroupClick: () => {
    },
    borderHidden: false
}
ReactSelectCheckbox.propTypes = {
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
}
export default ReactSelectCheckbox;


const customStyles = {
    control: (base, state) => {
        return {
            ...base,
            minHeight: 35,
            backgroundColor: "#fff",
            border: state.selectProps.className.match(/error/) ? "1px solid #ff6b68" : "1px solid rgba(0, 0, 0, 0.15)",
            borderRadius: 2,
            fontSize: "1rem",

            padding: state.hasValue && state.isMulti ? "0.354rem 0.65rem" : "0.5rem 0.65rem",
            color: "#495057",
            boxShadow: state.isFocused ? 'inset 0 1px 1px rgba(0, 0, 0, 0.075)' : 'inset 0 0.5px 0.5px rgba(0,0,0,0.15)',
            '&:hover': {
                borderColor: state.selectProps.className.match(/error/) ? "#ff6b68" : "rgba(0,0,0,0.15)",
            }
        }
    },
    valueContainer: (base, state) => {
        return {
            ...base,
            flexWrap: "nowrap",
            lineHeight: 1.5,
            textOverflow: 'ellipsis',
            padding: 0,
            whiteSpace: 'nowrap',
            maxWidth: "90%",
            overFlow: "hidden"
        }
    },
    clearIndicator: (base, state) => {
        return {
            ...base,
            padding: "0",
        }
    },
    indicatorSeparator: () => {
        return {
            display: 'none'
        }
    },
    dropdownIndicator: (base, state) => {
        return {
            ...base,
            padding: "0 0 0 8px",
        }
    },
    input: (base, state) => {
        return {
            ...base,
            height: 20,
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
    }
}
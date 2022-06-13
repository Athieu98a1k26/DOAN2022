import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import validatePattern from '../constants/validate';
import Icon from './icon';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    componentDidMount() {
        if (!this.props.disabled && !this.props.readOnly && !this.props.hasOwnProperty("onChange")) {
            console.warn("Thiếu sự kiện onChange");
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value != this.props.value && this.props.autoValidate) {
            this.validate();
        }
        setTimeout(() => {
            // Nếu input tồn tại nhưng bị ẩn -> xóa trạng thái lỗi
            if ($(this.input).length && !$(this.input).parent().is(':visible') && this.state.error) {
                this.setState({ error: null });
            }
        }, 500);
    }

    focus = () => {
        if (this.input) this.input.focus();
    }

    blur = () => {
        if (this.input) this.input.blur();
    }

    validate = () => {
        const value = this.input.value;
        const { required, validation, invalidMessage, requiredMessage, onValidate, type } = this.props;
        let error = null, msgType = 'danger';

        if (required && /^\s*$/.test(value)) {
            error = requiredMessage;
        }
        if (value) {
            if (validatePattern[type] && !validatePattern[type].pattern.test(value)) {
                error = invalidMessage || validatePattern[type].message;
                msgType = validatePattern[type].type || 'danger';
            }
            else if (validation) {
                if (validation.equal) {
                    if (validation.equal != value) {
                        error = validation.message || invalidMessage;
                        msgType = validation.type || 'danger';
                    }
                }
                if (validation.pattern) { //signle
                    if (!validation.pattern.test(value)) {
                        error = validation.message || invalidMessage;
                        msgType = validation.type || 'danger';
                    }
                }
                else if (validation.find) { //array
                    const found = validation.find(item => !item.pattern.test(value));
                    if (found) {
                        error = found.message || invalidMessage;
                        msgType = found.type || 'danger';
                    }
                }
            }
        }

        if (onValidate) {
            onValidate(!!error);
        }

        if (error) {
            this.setState({ error, msgType });
            return false;
        }
        else {
            this.setState({ error: null });
            return true;
        }
    }

    handleChange = (e) => {
        //only number
        if (this.props.type === "number" || this.props.type === "money") {
            if (validatePattern["number"]
                && !validatePattern["number"].pattern.test(this.input.value)) {
                return false;
            }
            if (this.props.min || this.props.max || this.props.range) {
                if (this.inputTimer) {
                    clearTimeout(this.inputTimer);
                }
                if (this.input.value) {
                    this.inputTimer = setTimeout(() => {
                        if (this.props.min && this.input.value < this.props.min) {
                            this.input.value = this.props.min;
                        }
                        if (this.props.max && this.input.value > this.props.max) {
                            this.input.value = this.props.max;
                        }
                        if (this.props.range && this.props.range instanceof Array && this.props.range.length === 2) {
                            if (this.input.value < this.props.range[0]) {
                                this.input.value = this.props.range[0]
                            }
                            if (this.input.value > this.props.range[1]) {
                                this.input.value = this.props.range[1]
                            }
                        }
                        if (this.props.onChange) {
                            this.props.onChange(this.input.value);
                        }
                        if (this.props.autoValidate) {
                            this.validate();
                        }
                    }, 300)
                }
            }
        }
        if (this.props.onChange) {
            this.props.onChange(this.input.value);
        }

        if (this.props.autoValidate) {
            this.validate();
        }
    }

    clear = () => {
        this.input.value = "";
        this.handleChange();
    }

    render() {
        const { className, alignCenter, material, float, size, placeholder, prepend, append, onAppendClick, clearable,
            inputClass, onChange, onValidate, autoValidate, invalidMessage, requiredMessage, validation,
            label, type, multiline, value, rows, autoHeight, required, column, disabled, readOnly,
            showMessage, description, showCarret, preendClass, ...props } = this.props;

        let inputValue = value;


        const hasAddOn = !multiline && (prepend || append);

        const inputGroupClasses = classNames('input-group', {
            'input-group-sm': size == 'small',
            'input-group-lg': size == 'large'
        });

        const inputClasses = hasAddOn ?
            classNames('form-control form-control-default ', inputClass, {
                'input-group-sm': size == 'small',
                'input-group-lg': size == 'large',
                'is-invalid': this.state.error
            }) :
            classNames('form-control', inputClass, {
                'form-control-sm': size == 'small',
                'form-control-lg': size == 'large',
                'form-control--float': float,
                'form-control--active': this.state.value,
                'form-control-default': !material,
                'textarea-autosize': multiline && autoHeight,
                'is-invalid': this.state.error,
                [`form-control-${this.state.errorType}`]: this.state.error
            });

        const labelClass = classNames(
            'form-control--label',
            column ? `col-md-${12 - column} col-form-label` : null
        )

        const wrapClasses = classNames(className,
            column ? 'row' : null,
            {
                'form-group': label,
                'form-group-default': !material,
                'form-group--has-addon': hasAddOn,
                'form-group--float': label && float,
                'form-group--centered': alignCenter,
                [`has-${this.state.msgType}`]: this.state.error,

            });

        const wrapControlClasses = classNames(
            'wrap-form-control',
            column ? `col-md-${column}` : null,
            label ? null : 'empty-label'
        )

        return (
            <div className={wrapClasses} {...props}>
                {
                    label && (!float || multiline) && (
                        <label className={labelClass}>{label}
                            {required && <small className="text-danger required-icon">(*)</small>}
                        </label>
                    )
                }
                <div className={wrapControlClasses}>
                    {
                        multiline && (
                            <textarea
                                disabled={disabled}
                                readOnly={readOnly}
                                ref={ref => this.input = ref}
                                className={inputClasses}
                                onChange={this.handleChange}
                                placeholder={placeholder}
                                rows={rows}
                                value={value || ""}
                            />
                        )
                    }
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
                                {
                                    <input
                                        disabled={disabled}
                                        readOnly={readOnly}
                                        ref={ref => this.input = ref}
                                        data-type={type}
                                        type={type == 'password' ? type : type == "number" && showCarret ? "number" : 'text'}
                                        className={inputClasses}
                                        onChange={this.handleChange}
                                        placeholder={placeholder}
                                        value={inputValue || ""}
                                    />
                                }
                                {
                                    append && (
                                        <div className={classNames('input-group-append', { pointer: !!onAppendClick })} onClick={onAppendClick}>
                                            <span className="input-group-text">{append}</span>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        !hasAddOn && !multiline && (
                            <input
                                disabled={disabled}
                                readOnly={readOnly}
                                ref={ref => this.input = ref}
                                data-type={type}
                                type={type == 'password' ? type : type == "number" && showCarret ? "number" : 'text'}
                                className={inputClasses}
                                onChange={this.handleChange}
                                placeholder={placeholder}
                                value={inputValue || ""}
                            />
                        )
                    }

                    {
                        label && float && !multiline && (
                            <label className="form-control--label">{label}</label>
                        )
                    }
                    {
                        float && material && (
                            <i className="form-group__bar" ></i>
                        )
                    }
                    {
                        description && <small className="text-muted input-description">{description}</small>
                    }
                    {
                        (this.state.error && showMessage) && (
                            <small className="invalid-feedback d-inline">{this.state.error}</small>
                        )
                    }
                    {
                        clearable && !!value && (
                            <Icon name="close" className="btn-clear-input" onClick={this.clear} />
                        )
                    }
                </div>
            </div>
        )
    }
}

const validationShape = PropTypes.shape({
    pattern: PropTypes.instanceOf(RegExp).isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'warning', 'danger', '']),
});

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url', 'number', 'money']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    float: PropTypes.bool, //Float label
    alignCenter: PropTypes.bool, //Căn giữa
    material: PropTypes.bool, // Giao diện bootstrap hay material
    multiline: PropTypes.bool,  //multiline = textarea
    rows: PropTypes.number,  //Số dòng mặc định của textarea
    autoHeight: PropTypes.bool, //Tự động thay đổi chiều cao textarea
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func, //Gọi sau khi thay đổi dữ liệu

    autoValidate: PropTypes.bool, //Tự động validate khi thay đổi dữ liệu
    onValidate: PropTypes.func, //Gọi sau khi validate dữ liệu
    errorMessage: PropTypes.string, //Thông báo khi nhập sai kiểu dữ liệu
    requiredMessage: PropTypes.string, //Thông báo khi không nhập dữ liệu
    validation: PropTypes.oneOfType([
        validationShape,
        PropTypes.arrayOf(validationShape)
    ]), // Các rule validate khác
    column: PropTypes.oneOf(range(1, 12)),//[1-12]sử dụng để label nằm cùng hàng với input (layout 12 cột)
    // add on
    prepend: PropTypes.node,
    append: PropTypes.node,
    clearable: PropTypes.bool,
    //number type
    min: PropTypes.number,
    max: PropTypes.number,
    range: PropTypes.arrayOf(PropTypes.number) //[0,100]

}

Input.defaultProps = {
    type: 'text',
    invalidMessage: null, //Thông báo sẽ lấy trong contranst,
    requiredMessage: 'This field is required',
    rows: 3,
    autoValidate: true,
    showMessage: true,
}
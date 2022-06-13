import React, { forwardRef, useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import validatePattern from '../constants/validate';
import Icon from './icon';

let number = 0;

export default /**
* @extends {React.Component<{type:oneOf(['text', 'email', 'password', 'tel', 'url', 'number', 'money']), size:oneOf(['default', 'small', 'large']), label:oneOfType([string, node]), float:boolean, //FloatlabelalignCenter:boolean, //Căngiữamaterial:boolean, //Giaodiệnbootstraphaymaterialmultiline:boolean, //multiline=textarearows:number, //SốdòngmặcđịnhcủatextareaautoHeight:boolean, //Tựđộngthayđổichiềucaotextarearequired:boolean, placeholder:string, onChange:Function, //Gọisaukhithayđổidữliệu//tooltiptooltip:string, tooltipPlacement:oneOf(['top', 'bottom', 'left', 'right']), tooltipContainer:string, autoValidate:boolean, //TựđộngvalidatekhithayđổidữliệuonValidate:Function, //GọisaukhivalidatedữliệuerrorMessage:string, //ThôngbáokhinhậpsaikiểudữliệurequiredMessage:string, //Thôngbáokhikhôngnhậpdữliệuvalidation:oneOfType([validationShape, arrayOf(validationShape)]), //Cácrulevalidatekháccolumn:oneOf(range(1, 12)), //[1-12]sửdụngđểlabelnằmcùnghàngvớiinput(layout12cột)//addonprepend:node, append:node, clearable:boolean, //numbertypemin:number, maxLength:number, max:number, range:arrayOf(number), //[0, 100]labelWarning:string, //labelnằmdướiinput(nhằmcảnhbáo, nhắcnhở)inputClass:string, description:string, lpignore:boolean//bỏquảlastpass}>}
*/
    class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            listId: 'input-list-' + (number++)
        }
    }

    componentDidMount() {
        if (!this.props.disabled && !this.props.readOnly && !this.props.hasOwnProperty("onChange")) {
            console.warn("Thiếu sự kiện onChange");
        }
        if (this.props.tooltip) {
            $(this.input).tooltip();
        }
        if (this.props.hotKey) {
            document.addEventListener('keydown', this.onKeyup)
        }
    }

    componentWillUnmount() {
        if (this.props.hotKey) {
            document.removeEventListener('keydown', this.onKeyup)
        }
        if (this.props.tooltip) {
            $(this.input).tooltip('dispose');
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.value != prevProps.value) {
            this.input.value = this.props.value;
        }
        if (this.props.value && prevProps.value != this.props.value && this.props.autoValidate) {
            this.validate();
        }
        if (this.props.tooltip && this.props.tooltip != prevProps.tooltip) {
            $(this.input).attr('data-original-title', this.props.tooltip).removeAttr('title');
        }
        setTimeout(() => {
            // Nếu input tồn tại nhưng bị ẩn -> xóa trạng thái lỗi
            if ($(this.input).length && !$(this.input).parent().is(':visible') && this.state.error) {
                // this.setState({ error: null });
            }
        }, 500);

    }

    onKeyup = (e) => {
        if (e.key == this.props.hotKey) {
            e.preventDefault();
            this.focus();
        }
    }

    focus = () => {
        if (this.input) this.input.focus();
    }

    blur = () => {
        if (this.input) this.input.blur();
    }

    validate = () => {
        let value = this.input.value.trim() || "";
        let error = null, msgType = 'danger';
        const {
            required, validation, invalidMessage, requiredMessage, min, max, range,
            onValidate, type, maxLength, minLength, minDate, checkUrlShopee, checkText, checkMail, checkEspecially
        } = this.props;
        if (this.props.type === "number" || this.props.type === "money") {
            value = value.replace(/\./g, '').replace(/,/g, '.'); // khôi phục định dạng chuẩn
            var floatValue = parseFloat(value) || 0;
            if (!isNaN(this.props.min) || !isNaN(this.props.max) || this.props.range) {
                if (value) {
                    if (!isNaN(this.props.min) && floatValue < min) {
                        error = "Giá trị nhập không được bé hơn " + min?.toLocaleString();
                    }
                    if (!isNaN(this.props.max) && floatValue > max) {
                        error = "Giá trị nhập không được lớn hơn " + max?.toLocaleString();
                    }
                    if (this.props.range && range instanceof Array && range.length === 2) {
                        if (floatValue < range[0] || floatValue > range[1]) {
                            error = "Giá trị nhập phải từ " + min?.toLocaleString() + " tới " + max?.toLocaleString();
                        }
                    }
                }
            }
        }

        if (required && /^\s*$/.test(value)) {
            error = requiredMessage;
        }

        if (minDate) {
            var floatValue = moment(value).format('L, hh:mm');
            const diffDays = Math.round(moment(value).diff(minDate, 'seconds', true));
            if (value) {
                if (diffDays < 0) {
                    error = "Giá trị nhập phải lớn hơn " + moment(minDate).format('L, hh:mm');
                }
            }
        }

        if (value) {
            if (validatePattern[type] && !validatePattern[type].pattern.test(value)) {
                error = invalidMessage || validatePattern[type].message;
                msgType = validatePattern[type].type || 'danger';
            } else if (validation) {
                if (validation.pattern) { //signle
                    if (!validation.pattern.test(value)) {
                        error = validation.message || invalidMessage;
                        msgType = validation.type || 'danger';
                    }
                } else if (validation.find) { //array
                    const found = validation.find(item => !item.pattern.test(value));
                    if (found) {
                        error = found.message || invalidMessage;
                        msgType = found.type || 'danger';
                    }
                }
            }
            if (maxLength && value.length > maxLength) {
                error = __("Bạn chỉ được phép nhập tối đa {0} ký tự", maxLength);
                msgType = 'danger';
            }
            if (minLength && value.length < minLength) {
                error = __("Bạn phải nhập tối thiểu {0} ký tự", minLength);
                msgType = 'danger';
            }
            if (checkUrlShopee) {
                let checkUrrl = value.match(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/g)
                if (checkUrrl) {
                    let urlShope = value.match(/(http|https):\/\/([a-zA-Z]+.)?(shopee.(vn|ph))+(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/g)
                    if (!urlShope || urlShope?.length < checkUrrl?.length) {
                        error = __(`Bạn không được phép nhập đường dẫn(Link) khác ngoài Shopee`);
                    }
                }
            }
            if (checkText) {
                let textValue = value.toLowerCase();
                checkText.forEach((item) => {
                    if (textValue.indexOf(item.toLowerCase()) >= 0) {
                        error = __(`Nội dung không được chứa từ khóa "${item}"`);
                    }
                })
            }
            if (checkMail && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                error = __("Định dạng mail không hợp lệ");
                msgType = 'danger';
            }
            if (checkEspecially && !/^[a-zA-Z0-9-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/.test(value)) {
                error = __("Không được phép nhập ký tự đặc biệt");
                msgType = 'danger';
            }
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
    }

    handleChange = (e) => {
        let value = e ? e.target.value : this.input.value;
        //bỏ qua nếu handleNumberFormatInputChange đã gọi
        if (value != this.value || value != this.props.value) {
            this.onInputChange(value);
        }
    }

    handleNumberFormatInputChange = values => {
        if (values.value != this.props.value) {
            this.onInputChange(values.value)
        }
    }

    onInputChange = value => {
        const { isZero } = this.props;
        this.value = value;

        if (this.props.type === "phone") {
            value = value.replace(/\D+/g, '');
        }

        if (this.props.maxLength && value.length > this.props.maxLength) {
            value = value.substring(0, this.props.maxLength);
        }

        if (this.props.type === "number" || this.props.type === "money") {
            value = value.replace(/\./g, '').replace(/,/g, '.'); // khôi phục định dạng chuẩn
            if (!!this.props.qty) {
                value = value.replace(/-/g, '');
            }
            let floatValue = null
            if (isZero) {
                if (value.length === 1) {
                    floatValue = value
                } else {
                    floatValue = parseFloat(value);
                }
            } else {
                floatValue = parseFloat(value);
            }
            value = isNaN(floatValue) ? '' : floatValue;

            if (validatePattern["number"] && !validatePattern["number"].pattern.test(value)) {
                return false;
            }
        }

        if (this.props.onChange) {
            this.props.onChange(value);
        }

        if (this.props.autoValidate) {
            this.validate();
        }
    }

    onNumberFormatInputBlur = (e) => {
        if (this.props.zeroIfNull && this.props.value == '') {
            if (this.props.onChange) {
                this.props.onChange(0);
            }
        }
        if (this.props.onBlur) {
            this.props.onBlur(e)
        }
    }

    clear = () => {
        this.input.value = "";
        if(this.props.onClear){
            this.props.onClear()
        }
        this.handleChange();
    }

    render() {
        const {
            className, alignCenter, material, size, prepend, append, clearable, disabled,
            label, multiline, value, required, column, float, inputStyle, inputGroupClass,
            showMessage, description, noMargin, style, dataList, onAppendClick,
            appendClass, prependClass, appendStyle, onPrependClick, prependStyle, wrapControlStyle,
            help, errorClass, controlClass,errorStyle
        } = this.props;
        const hasAddOn = !multiline && (prepend || append);

        const inputGroupClasses = classNames('input-group', inputGroupClass, {
            'input-group-sm': size == 'small',
            'input-group-lg': size == 'large',
            'm-0': noMargin
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

        const wrapControlClasses = classNames('wrap-form-control', controlClass, {
            [`col-md-${column}`]: column,
            'empty-label': !label,
            'control-required': required,
            'm-0': noMargin
        })
        const errorClasses = classNames('invalid-feedback d-inline', errorClass)

        return (
            <div className={wrapClasses} style={style}>
                {
                    label && (!float || multiline) && (
                        <label className={labelClass}>{label}
                            {help &&
                                <Icon tooltip={help} name={"info"} className={"pointer ml-1"} />}
                            {required && <small className="text-danger required-icon">(*)</small>}
                        </label>
                    )
                }
                <div className={wrapControlClasses} style={wrapControlStyle}>
                    {
                        hasAddOn && (
                            <div className={inputGroupClasses}>
                                {
                                    prepend && (
                                        <div
                                            className={classNames('input-group-prepend', { pointer: !!onPrependClick })}
                                            onClick={onPrependClick}>
                                            <span style={prependStyle}
                                                className={classNames("input-group-text", prependClass)}> {prepend}</span>
                                        </div>
                                    )
                                }
                                {
                                    this.renderInput()
                                }
                                {
                                    append && (
                                        <div
                                            className={classNames('input-group-append', { pointer: !!onAppendClick })}
                                            onClick={onAppendClick}>
                                            <span style={appendStyle}
                                                className={classNames("input-group-text", appendClass)}>{append}</span>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        !hasAddOn && this.renderInput()
                    }

                    {
                        label && float && !multiline && (
                            <label className="form-control--label">{label} {help &&
                                <Icon tooltip={help} name={"info"} className={"pointer text-primary"} />}</label>
                        )
                    }
                    {
                        float && material && (
                            <i className="form-group__bar"></i>
                        )
                    }
                    {
                        description && <small className="text-muted input-description">{description}</small>
                    }
                    {
                        (this.state.error && showMessage) && (
                            <small className={errorClasses} style={errorStyle}>{this.state.error}</small>
                        )
                    }
                    {
                        !disabled && clearable && !!value && (
                            <Icon name="close" className="btn-clear-input" onClick={this.clear} />
                        )
                    }
                </div>
                {
                    dataList &&
                    <DataList data={dataList} listId={this.state.listId} />
                }
            </div>
        )
    }

    renderInput = () => {
        const {
            rows, hasAddOn, inputClass, size, material, tooltip, tooltipPlacement, tooltipContainer,
            disabled, readOnly, type, placeholder, step, lpignore, float, inputStyle, inputGroupClass,
            showCarret, labelWarning, multiline, autoHeight, dataList,
            onKeyPress, onFocus, onBlur, tabIndex, autoFocus, max, min, textCenter,inputProps,required
        } = this.props;
        
        
       

        let { value } = this.props;

        if (typeof value === "undefined" || value === null) {
            value = "";
        }

        //fix input địa chỉ trong tab order/form
        //Khi input địa chỉ required = true =>nhập địa chỉ => xóa text ô địa chỉ => báo lỗi "Trường này bắt buộc" do inputClasses = "form-control form-control-default"
        //Nhưng khi required = false thì error "Trường này bắt buộc" không bị mất đi
        if(required === false && value === '' && placeholder =='Không nhập xã, huyện, tỉnh'){
            this.state.error = null;
        }

        let extendProps = {
            onKeyPress, onFocus, onBlur, tabIndex, autoFocus, max, min
        };

        const inputClasses = hasAddOn ?
            classNames('form-control form-control-default', inputClass, {
                'input-group-sm': size == 'small',
                'input-group-lg': size == 'large',
                'text-right': (type == 'money' || type == 'number') && !textCenter,
                'text-center': (type == 'money' || type == 'number') && textCenter,
                'is-invalid': this.state.error,
                'pr-4': this.state.error && type == 'number'
            }) :
            classNames('form-control', inputClass, {
                'form-control-sm': size == 'small',
                'form-control-lg': size == 'large',
                'text-right': (type == 'money' || type == 'number') && !textCenter,
                'text-center': (type == 'money' || type == 'number') && textCenter,
                'form-control--float': float,
                'form-control--active': this.state.value,
                'form-control-default': !material,
                'textarea-autosize': multiline && autoHeight,
                'is-invalid': this.state.error,
                [`form-control-${this.state.errorType}`]: this.state.error,
                'pr-4': this.state.error && type == 'number'
            });

        if (multiline) {
            return (
                <textarea
                    style={inputStyle}
                    disabled={disabled}
                    readOnly={readOnly}
                    ref={ref => this.input = ref}
                    className={inputClasses}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                    rows={rows}
                    value={"" + value}
                    {...inputProps}
                    {...extendProps}
                />
            )
        }

        let Input = 'input';

        if (tooltip) {
            extendProps['title'] = tooltip;
            extendProps['data-toggle'] = 'tooltip';
            extendProps['data-placement'] = tooltipPlacement;
            extendProps['data-container'] = tooltipContainer;
        }

        if (type == 'number' || type == 'money') {
            extendProps = {
                ...extendProps,
                onBlur: this.onNumberFormatInputBlur,
                thousandSeparator: ".",
                decimalSeparator: ",",
                // allowLeadingZeros:true,
                getInputRef: ref => this.input = ref,
                ref: undefined,
                onValueChange: this.handleNumberFormatInputChange
            }
            Input = NumberFormat
        }

        if (dataList) {
            extendProps.list = this.state.listId;
        }

        return (
            <React.Fragment>
                <Input
                    disabled={disabled}
                    readOnly={readOnly}
                    ref={ref => this.input = ref}
                    data-type={type}
                    type={type == 'password' ? type : type == "number" && showCarret ? "number" : 'text'}
                    className={inputClasses}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                    value={value}
                    step={step}
                    style={inputStyle}
                    data-lpignore={lpignore ? "true" : null}
                    {...inputProps}
                    {...extendProps}
                />
                {(labelWarning) && (
                    <small className='text-secondary font-italic font-weight-light'>{labelWarning}</small>)}
            </React.Fragment>
        )
    }
}

const validationShape = PropTypes.shape({
    pattern: PropTypes.instanceOf(RegExp).isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'warning', 'danger', '']),
});

TextField.propTypes = {
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
    checkUrlShopee: PropTypes.bool,//kiểm tra thuộc url không
    placeholder: PropTypes.string,
    onChange: PropTypes.func, //Gọi sau khi thay đổi dữ liệu
    checkText: PropTypes.arrayOf(PropTypes.string), //kiểm tra dữ liệu nhạp khác với ký tự
    //tooltip
    tooltip: PropTypes.string,
    tooltipPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    tooltipContainer: PropTypes.string,

    autoValidate: PropTypes.bool, //Tự động validate khi thay đổi dữ liệu
    onValidate: PropTypes.func, //Gọi sau khi validate dữ liệu
    errorMessage: PropTypes.string, //Thông báo khi nhập sai kiểu dữ liệu
    requiredMessage: PropTypes.string, //Thông báo khi không nhập dữ liệu
    validation: PropTypes.oneOfType([
        validationShape,
        PropTypes.arrayOf(validationShape)
    ]), // Các rule validate khác
    column: PropTypes.oneOf(range(1, 12)),//[1-12]sử dụng để label nằm cùng hàng với
    // input (layout 12 cột)
    // add on
    prepend: PropTypes.node,
    append: PropTypes.node,
    clearable: PropTypes.bool,
    //number type
    min: PropTypes.number,
    maxLength: PropTypes.number,
    max: PropTypes.number,
    range: PropTypes.arrayOf(PropTypes.number), //[0,100]
    labelWarning: PropTypes.string, //label nằm dưới input (nhằm cảnh báo, nhắc nhở)
    inputClass: PropTypes.string,
    description: PropTypes.string,
    lpignore: PropTypes.bool, //bỏ quả last pass
    isZero: PropTypes.bool,//cho phép nhập không khi type = number || money
};

TextField.defaultProps = {
    type: 'text',
    invalidMessage: null, //Thông báo sẽ lấy trong contranst,
    requiredMessage: 'Trường này là bắt buộc',
    rows: 3,
    autoValidate: true,
    showMessage: true,
    labelWarning: '',
    lpignore: true
}


const DataList = (props) => {
    const [listId, setListId] = useState(props.listId)
    const [data, setData] = useState(props.data)
    useEffect(() => {
        setListId(props.listId);
        setData(props.data);
    }, [props.listId, props.data]);
    return <datalist id={listId}>
        {data.map(v => (<option key={v} value={v} />))}
    </datalist>
}


import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'flatpickr';
import TextField from './input2';
// import { Vietnamese } from "flatpickr/dist/l10n/vn.js";
import { English } from 'flatpickr/dist/l10n/es.js';
// Vietnamese.rangeSeparator = ' - ';


const hooks = [
    // 'onChange',
    'onOpen',
    'onClose',
    'onMonthChange',
    'onYearChange',
    'onReady',
    'onValueUpdate',
    'onDayCreate'
]

class DateTimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStr: props.value ? props.value.toString() : ''
        }
        this.wrapper = undefined;
    }

    componentDidUpdate(preProps) {
        if (this.flatpickr) {
            const props = this.props;
            if (props.hasOwnProperty('value') && props.value !== preProps.value) {
                this.flatpickr.setDate(props.value);
                if (!props.value && this.props.jumpToDate) {
                    this.flatpickr.jumpToDate(this.props.jumpToDate, true);
                }
            }
            if (props.options && props.options.minDate && preProps.options.minDate !== props.options.minDate) {
                this.flatpickr.set("minDate", props.options.minDate)
            }
            if (preProps.mode != props.mode) {
                this.flatpickr.set("mode", props.mode);
                this.flatpickr.set("onReady", this.onReady(this.ready.instance))
            }
        }
    }

    onReady = (instance) => {
        if (!instance.calendarContainer) return;

        if (this.wrapper) {
            this.wrapper.remove();
        }

        var allButtons = [];
        if (instance.config.mode == "range") {
            allButtons = [
                {
                    key: "prevWeek", label: __("Tuần trước"), onClick: () => {
                        const today = new Date();
                        const toWeekSubtract = moment(today).subtract(7, 'days');
                        const startDate = moment(toWeekSubtract).startOf('isoWeek');
                        let endDate = moment(toWeekSubtract).endOf('isoWeek');
                        if (instance.config.minDate) {
                            const minDate = moment(instance.config.minDate);
                            if (minDate.diff(endDate, "days")) {
                                return;
                            }
                            const diff = startDate.diff(minDate, "days");
                            if (diff < 0) {
                                endDate = minDate;
                            }
                        }
                        instance.setDate([startDate.toDate(), endDate.toDate()], true);
                        instance.close();
                    },
                },
                {
                    key: "currentWeek", label: __("Tuần này"), onClick: () => {
                        const today = new Date();
                        let startDate = moment(today).startOf('isoWeek');
                        let endDate = moment(today).endOf('isoWeek');
                        if (instance.config.maxDate) {
                            const maxDate = moment(instance.config.maxDate);
                            const diff = endDate.diff(maxDate, "days");
                            if (diff > 0) {
                                endDate = maxDate;
                            }
                        }
                        if (instance.config.minDate) {
                            const minDate = moment(instance.config.minDate);
                            const diff = startDate.diff(minDate, "days");
                            if (diff > 0) {
                                startDate = minDate;
                            }
                        }
                        instance.setDate([startDate.toDate(), endDate.toDate()], true);
                        instance.close();
                    }
                },
                {
                    key: "nextWeek", label: __("Tuần sau"), onClick: () => {
                        const today = new Date();
                        const toWeekAdd = moment(today).add(7, 'days');
                        let startDate = moment(toWeekAdd).startOf('isoWeek');
                        let endDate = moment(toWeekAdd).endOf('isoWeek');

                        if (instance.config.maxDate) {
                            const maxDate = moment(instance.config.maxDate);
                            if (startDate.diff(maxDate, "days")) {
                                return;
                            }
                            const diff = endDate.diff(maxDate, "days");
                            if (diff > 0) {
                                endDate = maxDate;
                            }
                        }
                        instance.setDate([startDate.toDate(), endDate.toDate()], true);
                        instance.close();
                    },
                }, {
                    key: "prevMonth", label: __("Tháng trước"), onClick: () => {
                        const today = new Date();
                        const toMonthSubtract = moment(today).subtract(1, 'months');
                        const startDate = moment(toMonthSubtract).startOf('month');
                        let endDate = moment(toMonthSubtract).endOf('month');
                        if (instance.config.minDate) {
                            const minDate = moment(instance.config.minDate);
                            if (minDate.diff(endDate, "days")) {
                                return;
                            }
                            const diff = startDate.diff(minDate, "days");
                            if (diff < 0) {
                                endDate = minDate;
                            }
                        }
                        instance.setDate([startDate.toDate(), endDate.toDate()], true);
                        instance.close();
                    },
                },
                {
                    key: "currentMonth", label: __("Tháng này"), onClick: () => {
                        const today = new Date();
                        let startDate = moment(today).startOf('month');
                        let endDate = moment(today).endOf('month');
                        if (instance.config.maxDate) {
                            const maxDate = moment(instance.config.maxDate);
                            const diff = endDate.diff(maxDate, "days");
                            if (diff > 0) {
                                endDate = maxDate;
                            }
                        }
                        if (instance.config.minDate) {
                            const minDate = moment(instance.config.minDate);
                            const diff = startDate.diff(minDate, "days");
                            if (diff > 0) {
                                startDate = minDate;
                            }
                        }
                        instance.setDate([startDate.toDate(), endDate.toDate()], true);
                        instance.close();
                    },
                },
                {
                    key: "nextMonth", label: __("Tháng sau"), onClick: () => {
                        const today = new Date();
                        const toMonthAdd = moment(today).add(1, 'months');
                        let startDate = moment(toMonthAdd).startOf('month');
                        let endDate = moment(toMonthAdd).endOf('month');

                        if (instance.config.maxDate) {
                            const maxDate = moment(instance.config.maxDate);
                            if (startDate.diff(maxDate, "days")) {
                                return;
                            }
                            const diff = endDate.diff(maxDate, "days");
                            if (diff > 0) {
                                endDate = maxDate;
                            }
                        }
                        instance.setDate([startDate.toDate(), endDate.toDate()], true);
                        instance.close();
                    },
                },
                {
                    key: "today", label: __("Hôm nay"), onClick: () => {
                        let startDate = moment().startOf('day');
                        let endDate = moment().endOf('day');

                        if (instance.config.maxDate) {
                            const maxDate = moment(instance.config.maxDate);
                            if (startDate.diff(maxDate, "days")) {
                                return;
                            }
                            const diff = endDate.diff(maxDate, "days");
                            if (diff > 0) {
                                endDate = maxDate;
                            }
                        }
                        instance.setDate([startDate.toDate(), endDate.toDate()], true);
                        instance.close();
                    },
                },
                {
                    key: "prevDay", label: __("Hôm qua"), onClick: () => {
                        let startDate = moment().startOf('day').add(-1, 'days');
                        let endDate = moment().endOf('day').add(-1, 'days');

                        if (instance.config.maxDate) {
                            const maxDate = moment(instance.config.maxDate);
                            if (startDate.diff(maxDate, "days")) {
                                return;
                            }
                            const diff = endDate.diff(maxDate, "days");
                            if (diff > 0) {
                                endDate = maxDate;
                            }
                        }
                        instance.setDate([startDate.toDate(), endDate.toDate()], true);
                        instance.close();
                    }
                },
                {
                    key: "clear", label: __F("Xóa lọc"), onClick: () => {
                        instance.setDate(null, true);
                        instance.close();
                    }
                }
            ];
        } else {
            allButtons = [
                {
                    key: "prevDay", label: __("Hôm qua"), onClick: () => {
                        instance.setDate(moment().subtract(1, "days").toDate(), true);
                        instance.close();
                    }
                },
                {
                    key: "today", label: __("Hôm nay"), onClick: () => {
                        instance.setDate(new Date(), true);
                        instance.close();
                    }
                },
                {
                    key: "nextDay", label: __F("Ngày mai"), onClick: () => {
                        instance.setDate(moment().add(1, "days").toDate(), true);
                        instance.close();
                    }
                }
            ]
        }

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('buttons-flatpickr-wrapper');
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.classList.add('shortcut-buttons-flatpickr-buttons');

        var allKeys = allButtons.map(b => b.key);
        var buttons = this.props.buttons || [];
        if (buttons.contains("all")) {
            buttons = [...allKeys];
        }
        else {
            if (buttons.contains("day")) {
                let allDays = allKeys.filter(b => b.match(/day/i) && !buttons.contains(b));
                buttons = [...buttons, ...allDays];
            }
            if (buttons.contains("week")) {
                let allWeeks = allKeys.filter(b => b.match(/week/i) && !buttons.contains(b));
                buttons = [...buttons, ...allWeeks];
            }
            if (buttons.contains("month")) {
                let allMonths = allKeys.filter(b => b.match(/month/i) && !buttons.contains(b));
                buttons = [...buttons, ...allMonths];
            }
        }
        if (this.props.excludedButtons) {
            buttons = buttons.filter(b => !this.props.excludedButtons.contains(b));
        }
        console.log('button', buttons, allButtons)
        buttons.forEach(name => {
            let btn = allButtons.find(bb => bb.key == name);
            console.log('button', name, btn)

            if (btn) {
                const b = document.createElement('button');
                b.className = "btn btn-sm";
                b.classList.add(name == 'clear' ? 'btn-red' : 'btn-primary');
                b.textContent = btn.label;
                buttonsWrapper.appendChild(b);
                b.addEventListener("click", btn.onClick);
            }
        })

        this.wrapper.appendChild(buttonsWrapper);
        instance.calendarContainer.appendChild(this.wrapper);
    }


    componentDidMount() {
        const dnow = moment().add(1, 'm');

        const plugins = [];
        if (!this.props.options.noCalendar) {
            const currentYear = moment().year();
            const maxDate = this.props.options.maxDate;
            const maxYear = maxDate ? moment(maxDate).year() : currentYear;
            const endYear = maxYear < currentYear ? (maxYear - currentYear) : (this.props.birthdate ? 0 : 2);
            plugins.push(new yearDropdownPlugin({
                date: this.props.value || this.props.jumpToDate,
                yearStart: this.props.birthdate ? 100 : 20,
                yearEnd: endYear
            }))
        }

        const options = {
            onClose: (selectedDates, dateStr, instance) => {
                this.node.input.blur && this.node.input.blur();
                if (this.props.mode == 'range' && selectedDates.length == 1) {
                    this.validate();
                    if (this.props.onChange) {
                        this.props.onChange(dateStr, [selectedDates[0], selectedDates[0]], instance)
                    }
                };
                this.setState({ dateStr });
            },
            onChange: (selectedDates, dateStr, instance) => {
                console.log('change date time picker ', dateStr, selectedDates)
                if (this.props.mode == 'range' && selectedDates.length == 1) return;
                this.validate();
                if (this.props.onChange) {
                    this.props.onChange(dateStr, selectedDates, instance)
                }
                this.setState({ dateStr });
            },
            onReady: (ateObj, dateStr, instance) => {
                this.ready = { ateObj, dateStr, instance };
                this.onReady(instance);
            },
            onDestroy: () => {
                this.wrapper && this.wrapper.remove();
            },
            ...DateTimePicker.defaultProps.options,
            enableTime: this.props.enableTime,
            defaultHour: (this.props.enableTime || this.props.options.enableTime) ? dnow.hour() : 0,
            defaultMinute: (this.props.enableTime || this.props.options.enableTime) ? dnow.minute() : 0,
            mode: this.props.mode,
            ...this.props.options,

            plugins: [
                ...plugins
            ]
        }

        // Add prop hooks to options
        hooks.forEach(hook => {
            if (this.props[hook]) {
                options[hook] = this.props[hook]
            }
        })

        this.flatpickr = Flatpickr(this.node.input, options)

        if (this.props.jumpToDate) {
            this.flatpickr.jumpToDate(this.props.jumpToDate, true);
        }

        if (this.props.value) {
            this.flatpickr.setDate(this.props.value)
        }
    }

    componentWillUnmount() {
        if (this.flatpickr) {
            this.flatpickr.destroy()
        }
    }

    validate = () => {
        return this.node.validate();
    }

    handleChange = (value) => {
        if (!value) {
            this.clear();
        }
    }

    clear = () => {
        this.flatpickr.setDate(null, true);

        if (this.props.onChange) {
            this.props.onChange(null, [], this.flatpickr)
        }
    }

    render() {
        const { options, onChange, value, excludedButtons, buttons, jumpToDate, ...props } = this.props

        // Don't pass hooks to dom node
        hooks.map(hook => {
            delete props[hook];
        })
        return (
            <TextField
                ref={ref => this.node = ref}
                value={this.state.dateStr}
                {...props}
                onChange={this.handleChange}
            />
        )
    }
}

DateTimePicker.defaultProps = {
    buttons: [],
    excludedButtons: [],
    options: {
        nextArrow: '<i class="mdi mdi-arrow-right" />',
        prevArrow: '<i class="mdi mdi-arrow-left" />',
        altInput: true,
        altFormat: 'd/m/Y HH:mm:ss',
        dateFormat: 'Z', // Chuẩn ISO format (timezone UTC). Định dạng này để lưu trữ trên c#, không được thay đổi
        allowInput: false,
        locale: English,
        time_24hr: true,
        static: true,
    },
    className: '',
    clearable: true,
    mode: "single", //"single", "multiple", or "range"
}

DateTimePicker.propTypes = {
    ...TextField.propTypes,
    options: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onMonthChange: PropTypes.func,
    onYearChange: PropTypes.func,
    onReady: PropTypes.func,
    onValueUpdate: PropTypes.func,
    onDayCreate: PropTypes.func,
    enableTime: PropTypes.bool,
    jumpToDate: PropTypes.any,
    buttons: PropTypes.arrayOf(PropTypes.oneOf([
        "month", "all", "week", "date", "today", "prevDay", "nextDay", "prevMonth",
        "nextMonth", "currentMonth", "nextWeek", "currentWeek", "prevWeek", "clear"
    ])),
    excludedButtons: PropTypes.arrayOf(PropTypes.oneOf([
        "month", "all", "week", "date", "today", "prevDay", "nextDay", "prevMonth",
        "nextMonth", "currentMonth", "nextWeek", "currentWeek", "prevWeek"
    ])),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object,
        PropTypes.number
    ]),
    className: PropTypes.string
}

export default DateTimePicker


///
// plugin js file
/**
* Flatpickr Year Select Plugin.
* @author Labi Romabravo
*/

/**
 *
 * @returns {Function}
 */
const yearDropdownPlugin = function (pluginConfig) {
    var config = {
        text: '',
        theme: "light",
        date: new Date(),
        yearStart: 100,
        yearEnd: 2,
        ...pluginConfig
    };

    var currYear = moment().year();
    var selectedYear = moment(config.date).year() || currYear;

    var yearDropdown = document.createElement("select");

    var createSelectElement = function (year) {
        var start = currYear - config.yearStart;
        var end = currYear + config.yearEnd;

        for (var i = end; i >= start; i--) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            yearDropdown.appendChild(option);
        }
        yearDropdown.value = selectedYear;
    };

    return function (fp) {
        fp.yearSelectContainer = fp._createElement(
            "div",
            "flatpickr-year-select " + config.theme + "Theme",
            config.text
        );

        fp.yearSelectContainer.tabIndex = -1;
        createSelectElement(selectedYear);

        yearDropdown.addEventListener('change', function (evt) {
            var year = evt.target.options[evt.target.selectedIndex].value;
            fp.changeYear(year);
        });

        fp.yearSelectContainer.append(yearDropdown);

        var onChange = function (selDates, dateStr, instance) {
            var el = fp.yearSelectContainer.firstChild;
            el.value = instance.currentYear;
        }

        return {
            onReady: function onReady() {
                var name = 'flatpickr-current-month';
                const yearInputCollection = fp.calendarContainer.getElementsByClassName(name);
                const el = yearInputCollection[0];
                el.insertBefore(fp.yearSelectContainer, el.lastChild);
            },
            onChange: onChange,
            onValueUpdate: onChange,
            onYearChange: onChange
        };
    };
}
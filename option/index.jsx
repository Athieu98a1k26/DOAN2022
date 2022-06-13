import React from 'react';
import * as actions from '../../actions/app';
import Button from '../../controls/button';
import ButtonGroup from '../../controls/buttongroup';
import Card from '../../controls/card2';
import TextField from '../../controls/input2';
import Loading from '../../controls/loading';
import PageHeader from '../../controls/pageheader';
import Select from '../../controls/select2';
import Tabs from '../../controls/tabs';
import Toggle from '../../controls/toggle';
import { connect } from '../../lib/connect';

class UserPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
            tabIndex: 0,
            options: {
                ...this.props.options
            }
        }


    }

    componentWillReceiveProps(props) {
        this.setState({
            options: {
                ...props.options
            }
        });
    }

    setValue = (name, value) => {
        console.log('set option', name, value);
        this.setState({
            options: {
                ...this.state.options,
                [name]: value || ""
            }
        });
    }

    save = () => {
        this.setState({ loading: true })
        this.props.actions.updateOptions(this.state.options)
            .then(() => {
                this.setState({ loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
                alert(error.error, error.message);
            })
    }

    changeTheme = theme => {
        this.setValue('theme', theme);
        $('body').attr('data-ma-theme', theme);
        setTimeout(() => this.save(), 200);
    }


    render() {
        const tabs = [
            {
                key: 'general',
                title: 'Cài đặt chung',
                fields: [
                    {
                        name: "maxSitesPerApp",
                        type: "number",
                        label: 'Max size per app',
                        defaultValue: '10'
                    }
                ]
            },
            //tab admin để cuối cùng
            {
                key: 'admin',
                title: 'admin',
                fields: [
                    {
                        name: "systemNotify",
                        type: "textarea",
                        label: 'System Notify',
                    }
                ]
            },
        ]

        return (
            <div>
                <PageHeader title='Thiết lập hệ thống' />

                <Card
                    padding={0}
                    renderFooter={() => (
                        <div>
                            <hr />
                            <div className="p-4 align-center">
                                <Button text='lưu thiết lập' onClick={this.save} />
                            </div>
                        </div>
                    )} >
                    <Tabs
                        routes={tabs}
                        index={this.state.tabIndex}
                        onIndexChange={(index) => this.setState({ tabIndex: index })}
                        renderScene={this.renderTabScene}
                    />
                    <Loading type="card" show={this.state.loading} />
                </Card>
            </div>
        );
    }

    renderTabScene = tab => {
        if (tab.fields) {
            return (
                <div className="p-4">
                    <div className="row">
                        {
                            tab.fields.map(field => {
                                if (field.type == 'devider') {
                                    return <div className="clear"><hr /></div>;
                                }
                                return (
                                    <div key={field.name} className="col-md-4 col-sm-6">
                                        {
                                            this.renderField(field)
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            );
        }
        return null;
    }

    renderField = (field) => {
        const value = this.state.options[field.name] || field.defaultValue;

        switch (field.type) {
            case 'theme-select':
                let color = value || 'green';
                return (
                    <div className="form-group">
                        <label className="form-control--label">{field.label}</label>
                        <div>
                            <ButtonGroup className="btn-group--colors mt-2">
                                {
                                    ['green', 'blue', 'red', 'orange', 'teal', 'cyan', 'blue-grey', 'purple', 'indigo', 'lime'].map(type => (
                                        <Button key={type}
                                            className={'bg-' + type}
                                            type={null}
                                            active={type == color}
                                            onClick={() => this.changeTheme(type)} />
                                    ))
                                }
                            </ButtonGroup>
                        </div>
                    </div>
                )
            case 'toggle':
                return <React.Fragment>
                    <label>{field.label} </label>
                    <Toggle
                        on={value}
                        onChange={text => this.setValue(field.name, text)}
                        color="red">{field.label} </Toggle>
                </React.Fragment>
            case 'text':
            case 'number':
            case 'email':
            case 'url':
            case 'phone':
            case 'tel':
                return <TextField
                    {...field}
                    value={value}
                    ref={field.name}
                    onChange={text => this.setValue(field.name, text)}
                />
            case 'textarea':
                return <TextField
                    {...field}
                    value={value}
                    ref={field.name}
                    onChange={text => this.setValue(field.name, text)}
                    multiline
                />
            case 'select':
                return <Select
                    ref={field.name}
                    value={value}
                    options={field.options}
                    onChange={text => this.setValue(field.name, text)}
                    label={field.label}
                />
            case 'currency':
                var listCurrency = [{ country: 'Việt Nam', currency: 'Việt Nam đồng', syntax: '₫', code: 'VND' },
                { country: 'Euro', currency: 'Euro', syntax: '€', code: 'EUR' },
                { country: 'dollar Mỹ', currency: 'dollar Mỹ', syntax: '$', code: 'USD' }];

                listCurrency = listCurrency.map(item => ({ value: item.code, label: item.currency + ' (' + item.syntax + ')' }));
                return <Select
                    ref={field.name}
                    value={value}
                    options={listCurrency}
                    onChange={text => this.setValue(field.name, text)}
                    label={field.label}
                />
            default:
                return null;
        }
    }
}


export default connect(UserPage, state => ({
    options: state.app.options
}), actions);
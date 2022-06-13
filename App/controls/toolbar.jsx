import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';
import classNames from 'classnames';
import Actions from './actions';
import { NavLink } from 'react-router-dom';
class Toolbar extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            search: props.search,
            searchOpen: false
        }
    }

    componentWillReceiveProps(props) {
        if (props.search != this.props.search) {
            this.setState({ search: props.search });
        }
    }

    openSearch = () => {
        this.setState({ searchOpen: true });
        $(this.toolbar).find('.toolbar__search').fadeIn(200);
        $(this.toolbar).find('.toolbar__search input').focus();
    }

    closeSearch = () => {
        this.setState({ searchOpen: false, search: "" });
        $(this.toolbar).find('.toolbar__search').fadeOut(200);
    }

    handleSearchChange = () => {
        // console.log('search', this.input.value)
        this.setState({ search: this.input.value });

        if (this.props.onSearch) {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
            }
            this.searchTimer = setTimeout(() => {
                this.props.onSearch(this.input.value);
            }, this.props.timer);
        }
    }

    handleSearchPress = (event) => {
        if (event.key == "Enter") {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
            }
            if (this.props.onSearch) {
                this.props.onSearch(this.state.search);
            }
        }
    }

    render() {
        let { actions, allowSearch, searchInline, navItems, buttons, inner, title,
            searchPlacehoder, search, onSearch, className, icon, timer, searchForm, ...props } = this.props;

        if (allowSearch && !searchInline && actions) {
            actions = [
                {
                    icon: 'search',
                    onClick: this.openSearch
                },
                ...actions
            ];
        }

        const hasActionsDropdown = actions && actions.find(action => action.menuItems);

        const classes = classNames('toolbar',
            className, {
                'toolbar__has-dropdown': hasActionsDropdown,
                'toolbar__has-search': allowSearch,
                'toolbar--inner': inner,
                'mb-0': inner
            }
        );

        return (
            <div
                {...props}
                ref={ref => this.toolbar = ref}
                className={classes} >
                {
                    title && (
                        <div className="toolbar__label">{title}</div>
                    )
                }
                <div className="toolbar__right">
                    <div className="toolbar__nav" ref={ref => this.nav = ref}>
                        {
                            navItems && navItems.map((item, index) => {
                                return item.link ?
                                    (
                                        <NavLink activeClassName='active' to={item.href}>
                                            {
                                                icon && <Icon name={icon} />
                                            }
                                            {item.text}
                                        </NavLink>
                                    ) :
                                    (
                                        <a href={item.href}>
                                            {
                                                icon && <Icon name={icon} />
                                            }
                                            {item.text}
                                        </a>
                                    )
                            })
                        }
                        {
                            buttons && buttons.map((button, index) =>
                                React.cloneElement(button, { key: index }))
                        }
                    </div>
                    {
                        searchInline && searchForm && (
                            <div className="toolbar__search-inline">
                                {searchForm()}
                            </div>
                        )
                    }
                    {
                        searchInline && !searchForm && allowSearch && (
                            <div className="toolbar__search-inline">
                                <input type="text"
                                    ref={ref => this.input = ref}
                                    className="form-control form-control-default"
                                    value={this.state.search}
                                    onChange={this.handleSearchChange}
                                    onKeyPress={this.handleSearchPress}
                                    placeholder={searchPlacehoder} />
                            </div>
                        )
                    }
                    {
                        actions && (
                            <Actions actions={actions} />
                        )
                    }
                    {
                        !searchInline && searchForm && (
                            <div className="toolbar__search">
                                {searchForm()}
                            </div>
                        )
                    }
                    {
                        !searchInline && !searchForm && allowSearch && (
                            <div className="toolbar__search">
                                <input type="text"
                                    value={this.state.search}
                                    onChange={this.handleSearchChange}
                                    onKeyPress={this.handleSearchPress}
                                    placeholder={searchPlacehoder} />
                                <Icon
                                    className="toolbar__search__close"
                                    name="long-arrow-left"
                                    onClick={this.closeSearch} />
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

Toolbar.propTypes = {
    title: PropTypes.string,
    inner: PropTypes.bool,
    allowSearch: PropTypes.bool,
    searchInline: PropTypes.bool,
    searchForm: PropTypes.func,
    searchPlacehoder: PropTypes.string,
    onSearch: PropTypes.func,
    navItems: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        href: PropTypes.string,
        link: PropTypes.bool,
        onClick: PropTypes.func
    })),
    buttons: PropTypes.arrayOf(PropTypes.element),
    timer: PropTypes.number,
    actions: Actions.propTypes.actions
}

Toolbar.defaultProps = {
    timer: 800,
    allowSearch: true,
    searchInline: true,
    searchPlacehoder: __('Tìm kiếm...')
}

export default Toolbar;
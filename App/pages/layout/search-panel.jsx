import React, { Component } from 'react';
import { connect } from '../../lib/connect';
import * as actions from '../../actions/site';
import Icon from '../../controls/icon';

class SearchPanel extends Component {
    state = {
        loading: false,
        search: '',
        searchFocus: false,
        searchOpen: false
    }

    componentDidMount() {
        const _this = this;
        $(document).on('click', function (e) {
            if (!$(e.target).is("form.search") && !$(e.target).is("form.search *")) {
                _this.setState({ searchOpen: false })
            }
        });
    }

    handleSearch = (event) => {
        event.preventDefault();
    }

    handleSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search });
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(this.loadData, 500);
    }

    loadData = () => {
        let search = this.state.search;
        if (search) {
            if (this.abortController) {
                this.abortController.abort();
            }
            this.abortController = new AbortController();
            this.setState({ loading: true })
            this.props.actions.search({ search, allServer: true }, this.abortController)
                .then(() => this.setState({ loading: false }))
                .catch(() => this.setState({ loading: false }))
        }
    }


    render() {
        return (
            <React.Fragment>
                <form
                    className={`search ${this.state.searchFocus && 'search--focus'} ${this.state.searchOpen && 'search--toggled'}`}
                    onSubmit={this.handleSearch}>
                    <div className="search__inner">
                        <input type="text"
                            className="search__text"
                            onFocus={() => this.setState({ searchFocus: true, searchOpen: true })}
                            onBlur={() => this.setState({ searchFocus: false })}
                            value={this.state.search}
                            placeholder={'Tìm kiếm...'}
                            onChange={this.handleSearchChange} />
                        <Icon name="magnify" className="search__helper" />
                    </div>

                    {
                        !!this.state.search && this.state.searchOpen &&
                        <div className="search-panel eff eff--fadeIn in">
                            Search results here
                        </div>
                    }
                </form>
                <EditForm
                    open={!!this.state.editItem}
                    model={this.state.editItem}
                    key={this.state.editItem ? this.state.editItem.id : null}
                    onRequestClose={this.closeEdit} />
            </React.Fragment>
        );
    }
}

export default connect(SearchPanel, state => ({
}), actions);

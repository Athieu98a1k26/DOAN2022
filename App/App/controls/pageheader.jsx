import React from 'react';
import PropTypes from 'prop-types';
import Actions from './actions';
import classNames from 'classnames';

export default class PageHeader extends React.Component {
    render() {
        const { title, content, actions, className, ...props } = this.props;
        return (
            <header className={classNames("content__title", className)} {...props}>
                <h1>{title}</h1>
                {
                    content && (
                        <small>{content}</small>
                    )
                }
                {
                    actions && (
                        <Actions actions={actions} />
                    )
                }
            </header>
        )
    }
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    actions: Actions.propTypes.actions
}
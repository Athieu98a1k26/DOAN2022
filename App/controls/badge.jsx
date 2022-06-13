import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Badge extends React.Component {

    render() {
        const { tagName, className, pill, type, ...props } = this.props;
        const TagName = tagName || 'span';

        return (
            <TagName {...props} className={classNames("badge", className, (' badge-' + type), { 'badge-pill': pill })}>
                {this.props.children}
            </TagName>
        );
    }
}

Badge.propTypes = {
    tagName: PropTypes.string,
    type: PropTypes.string,  //default, primary, success, info, warning, danger
    pill: PropTypes.bool,
}

Badge.defaultProps = {
    content: 'Default',
    type: 'primary',
    pill: false,
} 
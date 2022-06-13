import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Icon from './icon';
export default class Breadcrumb extends React.Component {

    render() {
        const { tagName, className, links, ...props } = this.props;
        const TagName = tagName || 'nav';

        var active = '';
        var elementLinks = '';
        if (links) {
            elementLinks = links.map((link, index) => {
                if (links.length === 1 || (index === (links.length - 1))) {
                    return (
                        <span key={index} className={"breadcrumb-item active" + (link.classlink || '')}>
                            {link.icon && <Icon style={{marginRight:5}} name={link.icon} />}
                            {link.text}
                        </span>
                    );
                }
                return (
                    <Link key={index}
                        to={link.href || '#'}
                        className={"breadcrumb-item " + (link.classlink || '') + ' ' + (active || '')}>
                        {link.icon && <Icon style={{ marginRight: 5 }} name={link.icon} />}
                        {link.text}
                    </Link>
                )
            });
        }

        return (
            <TagName {...props} className={classNames('breadcrumb', className)}>
                {
                    elementLinks
                }
            </TagName>
        );
    }
}

Breadcrumb.propTypes = {
    tagName: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
        href: PropTypes.string,
        classlink: PropTypes.string,
        onClick: PropTypes.func
    }))
}

Breadcrumb.defaultProps = {
    links: [{ icon: '', text: 'Home', href: '#' }]
} 
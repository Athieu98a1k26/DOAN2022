import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Nav extends React.Component {

    render() {
        const { tagName, className, align, links, ...props } = this.props;
        const TagName = tagName || 'nav';
        console.log('links: ', links);
        return (
            <TagName {...props} className={classNames('nav', className, ('justify-content-' + (align == 'right' ? 'end' : align)))}>
                {
                    links &&
                    (links.map((link, index) =>
                        ((TagName !== 'nav') && (
                            <li className="nav-item" key={index}>
                                <a className={"nav-link" + ((link.status) ? ' active' : ' disabled')} href={link.href}>{link.text}</a>
                            </li>
                        ))
                        ||
                        ((TagName === 'nav') && (
                            <a key={index} className={"nav-link" + ((link.status) ? ' active' : ' disabled')} href={link.href}>{link.text}</a>
                        ))
                    ))
                }
            </TagName>
        );
    }
}

Nav.propTypes = {
    tagName: PropTypes.string, //nav, ul 
    align: PropTypes.string, // left, center, right
    links: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
        href: PropTypes.string,
        status: PropTypes.bool,
        classlinks: PropTypes.string,
        onClick: PropTypes.func
    }))

}

Nav.defaultProps = {
    tagName: 'nav',
    align: 'left',
} 
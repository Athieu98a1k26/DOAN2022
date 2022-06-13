import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Actions from './actions';

export default class Card extends React.Component {
    render() {
        const { title, subTitle, actions, links, topImage, bottomImage,
            renderHeader, renderFooter, imageOverlay,
            noBodyWrap, flex, flexColumn,
            outline, inverse, type, children, className, ...props } = this.props;

        let padding = this.props.padding;

        if (!title && !padding && !renderHeader && !renderFooter) {
            padding = 0;
        }

        const classes = classNames('card', className, {
            'card--inverse': inverse,
            ['bg-' + type]: type && !outline,
            ['border-' + type]: type && outline
        });

        const imgClasses = classNames({
            'card-img-top': topImage && !imageOverlay,
            'card-img': topImage && imageOverlay
        });

        const bodyClasses = classNames('card-block card-body', {
            'd-flex': flex,
            'flex-column': flexColumn
        });

        return (
            <div className={classes} {...props}>
                {
                    topImage && (
                        <img className={imgClasses} src={topImage} />
                    )
                }

                {
                    renderHeader && (
                        <div className="card-header" style={{ padding }}>
                            {
                                renderHeader(title, subTitle, actions)
                            }
                        </div>
                    )
                }

                {
                    !renderHeader && title && (
                        <div className="card-header" style={{ padding }}>
                            <h4 className="card-title">{title}</h4>
                            {
                                subTitle && (
                                    <h6 className="card-subtitle">{subTitle}</h6>
                                )
                            }
                            {
                                actions && (
                                    <Actions actions={actions} style={{ top: padding, right: padding }} />
                                )
                            }
                        </div>
                    )
                }
                {
                    noBodyWrap ? children : (
                        <div className={bodyClasses} style={{ padding }}>
                            {children}
                        </div>
                    )
                }
                {
                    renderFooter && (
                        <div className="card-footer" style={{ padding }}>
                            {
                                renderFooter(links)
                            }
                        </div>
                    )
                }

                {
                    !renderFooter && links && (
                        <div className="card-footer" style={{ padding }}>
                            {
                                links.map((link, index) => {
                                    let { text, ...attr } = link;
                                    return (
                                        <a key={index} {...attr} className="card-link">{text}</a>
                                    )
                                })
                            }
                        </div>
                    )
                }

                {
                    bottomImage && !imageOverlay && (
                        <img className="card-img-bottom" src={bottomImage} />
                    )
                }
            </div>
        )
    }
}

Card.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    topImage: PropTypes.string,
    bottomImage: PropTypes.func,
    imageOverlay: PropTypes.bool,
    padding: PropTypes.number,
    noBodyWrap: PropTypes.bool, //Không wrap body
    flex: PropTypes.bool, // display flex
    flexColumn: PropTypes.bool, //flex direction column
    outline: PropTypes.bool,
    inverse: PropTypes.bool,
    actions: Actions.propTypes.actions,
    links: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        href: PropTypes.string,
        onClick: PropTypes.func
    })),
    type: PropTypes.oneOf([null, 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func
}
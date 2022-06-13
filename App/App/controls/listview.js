import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Actions from './actions';

export default class ListView extends React.Component {
    componentDidMount() {
        if (this.props.scrollable) {
            $(this.refs.scrollbar).scrollbar({
                onScroll: this.props.onScroll
            }).scrollLock();
        }
    }
    componentWillUnmount() {
        if (this.props.scrollable) {
            $(this.refs.scrollbar).scrollbar('destroy');
        }
    }

    render() {
        const { data, renderItem, renderHeader, renderFooter, scrollable,
            title, hover, bordered, actions, className, headerClass, ...props } = this.props;

        const allClass = classNames('listview', className, {
            'listview--hover': !!hover,
            'listview--bordered': !!bordered
        });

        const headerClasses = classNames(
            'listview__header',
            headerClass
        )

        return (
            <div className={allClass} {...props}>
                {
                    renderHeader && (
                        <div className={headerClasses}>
                            {renderHeader({ title, actions })}
                        </div>
                    )
                }
                {
                    !renderHeader && title && (
                        <div className={headerClasses}>
                            {title}
                            {
                                actions && (
                                    <Actions actions={actions} />
                                )
                            }
                        </div>
                    )
                }
                <div className="listview__scroll scrollbar-inner" ref="scrollbar">
                    {
                        data && data.map((item, i) => {
                            if (renderItem) {
                                return React.cloneElement(renderItem(item), { key: i })
                            }
                        })
                    }
                </div>
                {
                    renderFooter && (
                        <div className="listview__footer">
                            {renderFooter()}
                        </div>
                    )
                }
            </div>
        )
    }
}

ListView.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    renderItem: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    hover: PropTypes.bool,
    bordered: PropTypes.bool,
    actions: Actions.propTypes.actions,
    scrollable: PropTypes.bool,
    onScroll: PropTypes.func
}

export class ListViewItem extends React.Component {
    render() {
        const { image, title, subTitle, content, attrs,
            checkbox, actions, className, ...props } = this.props;
        return (
            <div className={classNames('listview__item', className)} {...props}>
                {
                    checkbox && React.cloneElement(checkbox, {
                        className: classNames(checkbox.props.className, "align-self-start")
                    })
                }
                {
                    image && (
                        <img src={image} className="listview__img" alt="" />
                    )
                }
                <div className="listview__content">
                    {
                        title && (
                            <div className="listview__heading">
                                {title}
                                {
                                    subTitle && <small>{subTitle}</small>
                                }
                            </div>
                        )
                    }
                    <div>{content}</div>
                    {
                        attrs && (
                            <div className="listview__attrs">
                                {
                                    attrs.map((item, index) => (
                                        <span key={index}>{item}</span>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                {
                    actions && (
                        <Actions actions={actions} />
                    )
                }
            </div>
        )
    }
}

ListViewItem.propTypes = {
    image: PropTypes.any,
    checkbox: PropTypes.node,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    content: PropTypes.element,
    attrs: PropTypes.arrayOf(PropTypes.string),
    actions: Actions.propTypes.actions,
}

ListView.Item = ListViewItem;
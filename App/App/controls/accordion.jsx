import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Collapse from './collapse';
import Icon from './icon';

class Accordion extends React.Component {

    onTitleClick = (event, index, route, curentIndex) => {
        event.preventDefault();
        if (curentIndex == index) {
            this.props.onIndexChange(-1, null);
        }
        else {
            this.props.onIndexChange(index, route);
        }
    }

    render() {
        const { routes, index, renderScene, onIndexChange, cardClassName, collapseClassName, padding, ...props } = this.props;

        return (
            <div className="accordion" {...props}>
                {
                    routes.map((item, i) => (
                        <div className={classnames('card', cardClassName)} key={item.key}>
                            <div className="card-header" onClick={e => this.onTitleClick(e, i, item, index)} style={{ padding }}>
                                <a className="card-title d-block">
                                    {
                                        item.icon && (
                                            <Icon name={item.icon} style={{ marginRight: 10 }} />
                                        )
                                    }
                                    {item.title}
                                    {
                                        item.iconRight && (
                                            <Icon name={item.iconRight} className="float-right" style={{ marginLeft: 10 }} />
                                        )
                                    }
                                </a>
                            </div>
                            <Collapse show={i == index} className={collapseClassName || 'card-body'} style={{ padding }}>
                                {
                                    renderScene(item)
                                }
                            </Collapse>
                        </div>
                    ))
                }
            </div>
        )
    }
}

Accordion.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string,
        key: PropTypes.string.isRequired
    })).isRequired, //mảng định tuyến accordion
    index: PropTypes.number, //current routes index
    onIndexChange: PropTypes.func.isRequired, // khi tab thay đổi
    renderScene: PropTypes.func.isRequired, // render nội dung tab
    collapseClassName: PropTypes.string,
    cardClassName: PropTypes.string
}

export default Accordion;
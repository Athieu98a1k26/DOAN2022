import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import flow from 'lodash/flow';
import { findDOMNode } from 'react-dom';

/**
 * Component for context
 */
class ContextComponent extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export const Context = DragDropContext(HTML5Backend)(ContextComponent);


/**
 * Component for container
 */
class ContainerComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: props.data.map((item, i) => ({
                ...item,
                ddKey: props.id + "-" + item.id + (item.ddFrom ? "-from-" + item.ddFrom : ""),
            })),
            placeholderIndex: null,
            placeholder: null
        };
    }

    componentDidMount() {
        if (this.props.scrollable) {
            $(this.scrollbar).scrollbar({
                autoUpdate: false
            });
        }
    }

    componentWillReceiveProps(props) {
        if (!this.state.placeholder) {
            this.setState({
                items: props.data.map((item, i) => ({
                    ...item,
                    ddKey: props.id + "-" + item.id + (item.ddFrom ? "-from-" + item.ddFrom : ""),
                }))
            });
        }
        if (this.props.isOver && !props.isOver) {
            this.setState({ placeholder: null });
        }
    }

    componentDidUpdate() {
        if (this.props.scrollable) {
            $(this.scrollbar).scrollbar({
                autoUpdate: false
            });
        }
    }

    setPlaceholder = (item, index) => {
        this.setState({
            placeholderIndex: index,
            placeholder: item
        });
    }

    pushItem = (item, index, from) => {
        item.ddFrom = from;
        const { items } = this.state;
        items.splice(index, 0, item);

        this.setState({ items, placeholder: null, placeholderIndex: null });

        if (this.props.onItemAdded) {
            this.props.onItemAdded(item);
        }
        if (this.props.onChange) {
            this.props.onChange(items);
        }
    }

    removeItem = (index) => {
        if (this.props.mode != 'copy') {
            const { items } = this.state;
            items.splice(index, 1);

            this.setState({ items, placeholder: null, placeholderIndex: null });

            if (this.props.onChange) {
                this.props.onChange(items);
            }
        }
    }

    moveItem = (dragIndex, hoverIndex) => {
        if (dragIndex < 0 || hoverIndex < 0) return;
        if (dragIndex < hoverIndex) hoverIndex--;

        const { items } = this.state;

        const dragItem = items.splice(dragIndex, 1)[0];
        items.splice(hoverIndex, 0, dragItem);

        this.setState({ items: items, placeholder: null, placeholderIndex: null });

        if (this.props.onChange) {
            this.props.onChange(items);
        }
    }

    render() {
        const { source, sourceFilter, preventDuplicate, connectDropTarget, id } = this.props;
        let { droppable } = this.props;

        if (source && source.listId != id) {
            if (sourceFilter && !sourceFilter.test(source.listId)) {
                droppable = false;
            }

            if (preventDuplicate && source.item && this.state.items.find(item => item.id == source.item.id)) {
                droppable = false;
            }
        }

        return droppable ? connectDropTarget(this.renderItems(droppable)) : this.renderItems(droppable);
    }

    renderItems = (droppable) => {
        const { draggable, canDrop, isOver, overStyle, renderItem, renderPlaceholder, id, className, style, height } = this.props;

        const isActive = droppable && canDrop && isOver;

        const activeStyle = isActive ? overStyle : null;

        const { items, placeholder, placeholderIndex } = this.state;

        return (
            <div style={{ height }}>
                <div className={classnames(className, 'scrollbar-inner')}
                    ref={ref => this.scrollbar = ref}
                    style={{ ...style, ...activeStyle }}>
                    {
                        placeholder && placeholderIndex == -1 && renderPlaceholder(placeholder, 0)
                    }
                    {
                        items.map((item, i) => item ? (
                            <Item
                                key={item.ddKey}
                                index={i}
                                item={item}
                                listId={id}
                                droppable={droppable}
                                draggable={draggable}
                                removeItem={this.removeItem}
                                moveItem={this.moveItem}
                                setPlaceholder={this.setPlaceholder}
                                renderItem={renderItem}
                                placeholder={placeholderIndex == i ? placeholder : null}
                                renderPlaceholder={renderPlaceholder} />
                        ) : null)
                    }
                </div>
            </div>
        )
    }
}

ContainerComponent.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object, //style container
    overStyle: PropTypes.object, // style khi mouseover
    height: PropTypes.number, // chiều cao của list
    scrollable: PropTypes.bool,

    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    renderPlaceholder: PropTypes.func.isRequired,

    mode: PropTypes.oneOf(['copy', 'move']),
    droppable: PropTypes.bool,
    draggable: PropTypes.bool,
    sourceFilter: PropTypes.instanceOf(RegExp), //container id filters
    preventDuplicate: PropTypes.bool, // bỏ qua nếu trùng item id\\

    onChange: PropTypes.func,
    onItemAdded: PropTypes.func
}

ContainerComponent.defaultProps = {
    droppable: true,
    draggable: true,
    sourceFilter: /.*/,
    preventDuplicate: true,
    scrollable: true,
    mode: 'move'
}


const containerItemTarget = {
    hover(props, monitor, component) {
        if (component.state.placeholder == null && monitor.getItem().listId != props.id) {
            component.setPlaceholder(monitor.getItem(), -1);
        }
    },
    drop(props, monitor, component) {
        const { id } = props;
        const sourceObj = monitor.getItem();

        const index = sourceObj.dragIndex >= -1 ? (sourceObj.dragIndex + 1) : sourceObj.index;

        if (id !== sourceObj.listId) {
            component.pushItem(sourceObj.item, index, sourceObj.listId);
        }
        else {
            component.moveItem(sourceObj.index, index);
        }
        //component.setPlaceholder(null, null);

        return {
            listId: id
        };
    }
}


export const Container = DropTarget("CARD", containerItemTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    source: monitor.getItem()
}))(ContainerComponent);


/**
 * component for item
 */

class ItemComponent extends Component {

    render() {
        const { droppable, draggable, isDragging, connectDragSource, connectDropTarget,
            renderItem, placeholder, renderPlaceholder, item, index } = this.props;

        if (isDragging) {
            return placeholder ? renderPlaceholder(item, index) : null;
        }

        let com = renderItem(item, index, isDragging);

        if (droppable) {
            com = connectDropTarget(com);
        }

        if (draggable) {
            com = connectDragSource(com);
        }

        if (placeholder) {
            com = (
                <div>
                    {com}
                    {renderPlaceholder(placeholder, index)}
                </div>
            )
        }


        return com;
    }
}

const itemSource = {

    beginDrag(props) {
        //console.log(props);
        return {
            index: props.index,
            listId: props.listId,
            item: props.item
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        //console.log(props, monitor, item, dropResult)

        if (dropResult && dropResult.listId !== item.listId) {
            props.removeItem(item.index);
        }

        props.setPlaceholder(null, null);
    }
};

const itemTarget = {

    hover(props, monitor, component) {
        const item = monitor.getItem();
        const dragIndex = item.dragIndex || item.index;
        let hoverIndex = props.index;
        const sourceListId = item.listId;

        // Determine rectangle on screen
        const dom = findDOMNode(component);

        const hoverBoundingRect = dom.draggable ? dom.getBoundingClientRect() : dom.children[0].getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            //hoverIndex -= 1;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            //return;
        }

        if (hoverClientY < hoverMiddleY) {
            // console.log('-------1')
            hoverIndex -= 1;
        }

        //console.log(hoverIndex);

        // Don't replace items with themselves
        if (dragIndex === hoverIndex && props.listId === sourceListId) {
            //console.log('same same same')
            return null;
        }

        //Time to actually perform the action
        // if (props.listId === sourceListId) {
        //     if (hoverIndex < 0) {
        //         return;
        //     }
        //     props.moveItem(dragIndex, hoverIndex);
        // }
        // else {
        //     props.setPlaceholder(item, hoverIndex);
        // }
        if (hoverIndex < -1) {
            return;
        }
        props.setPlaceholder(item.item, hoverIndex);

        // console.log(props, dragIndex, hoverIndex);
        // props.setPlaceholder(item, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.dragIndex = hoverIndex;
    }
};

const Item = flow(
    DropTarget("CARD", itemTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource("CARD", itemSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(ItemComponent);

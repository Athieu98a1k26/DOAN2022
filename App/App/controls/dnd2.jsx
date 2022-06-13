import React, { Component } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const ChangeTypes = {
    REORDER: 'REORDER',
    ADDED: 'ADDED',
    REMOVED: 'REMOVED'
}

export class Context extends Component {

    static childContextTypes = {
        data: PropTypes.object,
        dragTarget: PropTypes.object,
        sourceId: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            dragTarget: null,
            sourceId: null
        }
    }

    getChildContext() {
        return {
            data: this.props.data,
            dragTarget: this.state.dragTarget,
            sourceId: this.state.sourceId
        };
    }

    getSourceItem = (sourceId, itemIndex) => {
        const source = this.props.data[sourceId];
        if (source) {
            return source[itemIndex];
        }
        return null;
    }

    onDragStart = result => {
        if (!result.source) {
            return;
        }
        const target = this.getSourceItem(result.source.droppableId, result.source.index);
        if (target) {
            this.setState({ dragTarget: target, sourceId: result.source.droppableId });
        }
    }

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }
        this.update(result);
    }

    update = result => {
        console.log(result);
        const { source, destination } = result;
        const { onChange, data } = this.props;

        const sourceList = [...data[source.droppableId]];

        // nếu cùng danh sách -> sắp xếp lại thứ tự
        if (source.droppableId === destination.droppableId) {
            const [removed] = sourceList.splice(source.index, 1);
            sourceList.splice(destination.index, 0, removed);

            // update list
            if (onChange) {
                onChange(source.droppableId, sourceList, removed, ChangeTypes.REORDER);
            }
        }
        // nếu khác danh sách -> gỡ khỏi source, thêm vào destination
        else {
            const destinationList = [...(data[destination.droppableId] || [])];
            const target = { ...sourceList[source.index] };

            const count = destinationList.count(item => item.id == target.id);
            console.log('count', count);
            if (count > 0) {
                target.draggableId = destination.droppableId + '-' + target.id + '-' + count;
            }

            sourceList.splice(source.index, 1);
            destinationList.splice(destination.index, 0, target);

            if (onChange) {
                onChange(source.droppableId, sourceList, target, ChangeTypes.REMOVED);
                onChange(destination.droppableId, destinationList, target, ChangeTypes.ADDED);
            }
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                {
                    this.props.children
                }
            </DragDropContext>
        )
    }
}

Context.defaultProps = {
}

Context.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export class Container extends Component {
    static contextTypes = {
        data: PropTypes.object,
        dragTarget: PropTypes.object,
        sourceId: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = {
            targetExist: false,
            visibleStartIndex: 0,
            visibleEndIndex: 20
        }
    }

    componentWillReceiveProps(props, context) {
        if (context && context.dragTarget && context.sourceId != props.id) {
            const list = context.data[props.id] || [];
            const count = list.count(item => item.id == context.dragTarget.id);
            this.setState({
                targetExist: count > 0
            });
        }
        else {
            this.setState({
                targetExist: false
            });
        }
    }

    componentDidMount() {
        if (this.props.scrollable) {
            $(this.scrollbar).scrollbar({
                onScroll: (x) => {
                    if (this.setVisibleTimer) {
                        clearTimeout(this.setVisibleTimer)
                    }
                    this.setVisibleTimer = setTimeout(() => {
                        this.setVisibleArea(x);
                    }, 150);
                }
            });
        }
    }

    componentWillUnmount() {
        if (this.props.scrollable) {
            $(this.scrollbar).scrollbar('destroy');
        }
    }

    setVisibleArea = ({ scroll }) => {
        let top = 0, start = 0, end = 0;
        if (this.props.itemHeight) {
            const list = this.context.data[this.props.id] || [];
            if (list.length > 200) {
                const itemHeight = this.props.itemHeight;
                const isHeightFunc = typeof itemHeight == 'function';

                for (let i = 0; i < list.length; i++) {
                    top += isHeightFunc ? itemHeight(list[i]) : itemHeight;
                    if (top > scroll) {
                        start = i - 1;
                        break;
                    }
                }
                end = start + 20;
            }
        }

        this.setState({
            visibleStartIndex: start,
            visibleEndIndex: end
        });
    }

    render() {
        const { id, className, style, overStyle, listStyle,
            title, subTitle, renderHeader, renderFooter, renderItem, itemHeight,
            padding, height, scrollable, droppable, draggable, sortable, preventDuplicate } = this.props;

        const { dragTarget, sourceId, data: { [id]: data } } = this.context;

        const canDrop = droppable && (!preventDuplicate || !this.state.targetExist) && (sortable || sourceId != id);
        const list = data || [];

        return (
            <Droppable droppableId={'' + id} isDropDisabled={!canDrop}>
                {(provided, snapshot) => (
                    <Card
                        className={classnames(className, { 'has-scrollbar': scrollable })}
                        padding={padding}
                        title={title}
                        flex flexColumn
                        subTitle={subTitle}
                        renderHeader={renderHeader}
                        renderFooter={renderFooter}
                        style={snapshot.isDraggingOver ? { ...style, ...overStyle } : style}
                    >
                        <div style={{ flex: 1, height, ...listStyle }} ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                <div ref={ref => this.scrollbar = ref} style={{ minHeight: height }} className={classnames({ 'scrollbar-inner': scrollable })}>
                                    <InnerList
                                        listId={id}
                                        list={list}
                                        draggable={draggable}
                                        renderItem={renderItem}
                                        visibleStartIndex={this.state.visibleStartIndex}
                                        visibleEndIndex={this.state.visibleEndIndex}
                                        itemHeight={itemHeight}
                                    />
                                    {provided.placeholder}
                                </div>
                            }
                        </div>
                    </Card>
                )
                }
            </Droppable>
        )
    }
}

Container.defaultProps = {
    droppable: true,
    draggable: true,
    sortable: true,
    preventDuplicate: true,
    scrollable: false
}

Container.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    className: PropTypes.string,
    style: PropTypes.any,
    overStyle: PropTypes.any,

    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]), //card title
    subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]), //card subtitle
    renderHeader: PropTypes.func, //card render header, (list) => {}
    renderFooter: PropTypes.func, //card render footer, (list) => {}

    padding: PropTypes.number, //card padding
    scrollable: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    renderItem: PropTypes.func.isRequired,
    droppable: PropTypes.bool, // cho phép thả
    draggable: PropTypes.bool, // cho phép kép
    sortable: PropTypes.bool, //cho phép sắp xếp trong danh sách
    preventDuplicate: PropTypes.bool,

    virtualized: PropTypes.bool //sử dụng danh sách ảo hóa
}


class InnerList extends React.PureComponent {
    render() {
        const { list, listId, draggable, renderItem, itemHeight, visibleStartIndex, visibleEndIndex } = this.props;
        const isHeightFunc = typeof itemHeight == 'function';
        const fixedHeight = itemHeight && list.length > 200;

        let top = 0, bottom = 0, start = 0, end = 0, height = null;

        if (fixedHeight) {
            start = visibleStartIndex > 5 ? visibleStartIndex - 5 : 0;
            end = visibleEndIndex < (list.length - 6) ? visibleEndIndex + 5 : list.length - 1;
            height = 50;

            for (let i = 0; i < start; i++) {
                top += isHeightFunc ? itemHeight(list[i]) : itemHeight;
            }

            for (let i = start; i < end; i++) {
                height += isHeightFunc ? itemHeight(list[i]) : itemHeight;
            }

            for (let i = end; i < list.length; i++) {
                bottom += isHeightFunc ? itemHeight(list[i]) : itemHeight;
            }
        }

        const range = fixedHeight ? list.slice(start, end + 1) : list;

        // if (itemHeight) {
        //     height += 50;
        //     range.forEach(item => {
        //         height += isHeightFunc ? itemHeight(item) : itemHeight
        //     });
        // }

        return (
            <div style={{ paddingTop: top, paddingBottom: bottom }}>
                <div style={{ height, overflow: 'visible' }}>
                    {
                        range.map((item, index) => (
                            <Draggable
                                key={item.draggableId || (listId + '-' + item.id)}
                                draggableId={item.draggableId || (listId + '-' + item.id)}
                                index={index}
                                isDragDisabled={!draggable || item.disabled}>
                                {(provided, snapshot) => (
                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps.style,
                                                paddingBottom: 1,
                                                //minHeight: fixedHeight ? (isHeightFunc ? itemHeight(item) : itemHeight) : null
                                            }}>
                                            {renderItem(item, snapshot, index)}
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Draggable>
                        ))
                    }
                </div>
            </div>
        )
    }
}


/* Từ đây trở xuống là demo */

import Card from './card2';

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

class Demo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items1: getItems(5),
            items2: getItems(10).splice(5)
        };
    }

    onChange = (id, list, target, type) => {
        if (type == 'ADDED') {
            this.setState({ [id]: list });
        }
        // console.log(id, type, list)
    }

    render() {
        return (

            <Context data={this.state}
                onChange={this.onChange}>
                <div className="d-flex">
                    <Container
                        id="items1"
                        title='List 1'
                        className="step-item"
                        padding={10}
                        renderItem={this.renderItem}
                    />
                    <Container
                        id="items2"
                        title='List 2'
                        className="step-item"
                        padding={10}
                        renderItem={this.renderItem}
                    />
                </div>
            </Context>
        );
    }


    renderItem = (item, snapshot, provided) => {
        //console.log('renderItem', item, snapshot,provided);
        const style = {
            border: '1px solid #e8e8e8',
            backgroundColor: snapshot.isDragging ? '#f2f2f2' : '#fff',
            marginBottom: 5,
            userSelect: 'none'
        }

        return (
            <Card padding={5}
                title={item.content}
                style={style}>
                {item.content}
            </Card>
        )
    }
}

export default Demo;

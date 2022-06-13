import React, { Component } from 'react';
import classnames from 'classnames';
class Table extends Component {


    render() {
        const { className, sm, striped, inverse, bordered, children, hover } = this.props;
        const classNames = classnames(
            className,
            "table",
            "table-responsive-sm",
            {
                "table-striped": striped,
                "table-inverse": inverse,
                "table-bordered": bordered,
                "table-hover": hover,
                "table-sm": sm,
            }
        )
        return (
            <div className="scrollbar-inner" ref={ref => this.scrollbar = ref}>
                <table className={classNames}>
                    {children}
                </table>
            </div>
        );
    }
}

export default Table;
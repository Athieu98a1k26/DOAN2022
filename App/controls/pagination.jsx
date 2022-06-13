import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Pagination extends React.Component {

    handleChange = page => {
        if (this.props.onChange) {
            this.props.onChange(page);
        }
    }

    getRange = (start, end, total) => {
        return Array(total + 1).fill(1).map((v, i) => i).slice(start, end + 1);
    }

    getPager = (total, page, pageSize, buttonCount) => {

        // mặc định trang hiện tại là đầu tiên
        page = page || 1;

        // mặc định 1 trang có 10 items
        pageSize = pageSize || 10;

        // tính toán số trang
        var totalPages = Math.ceil(total / pageSize);

        var start, end;

        start = page - Math.floor(buttonCount / 2);
        start = start < 1 ? 1 : start;

        end = buttonCount + start - 1;
        end = end > totalPages ? totalPages : end;

        start = end - buttonCount + 1;
        start = start < 1 ? 1 : start;

        var pages = this.getRange(start, end, totalPages);

        return {
            total: totalPages,
            start: start,
            end: end,
            pages: pages
        };
    }



    render() {
        const { className, align, showFull, showFirstLast, showPrevNext, alwayDisplay,
            page, total, pageSize, onChange, numberButtons, showLabel, block, style, ...props } = this.props;

        const pager = this.getPager(total, page, pageSize, numberButtons);

        if (!alwayDisplay && pager.total < 2) return null;

        var divClass = classNames(className, {
            'p-3': block,
            'd-flex': !block,
            'align-items-center': !block
        })

        var ulClasses = classNames('pagination m-0', {
            'justify-content-end': align == 'right',
            'justify-content-center': align == 'center'
        });

        var start = pageSize * (page - 1) + 1;
        var end = start + pageSize - 1;
        end = end > total ? total : end;

        return (
            <div className={divClass} style={{ minHeight: 34, ...style }}  {...props}>
                {
                    // total > 0 && showLabel && (
                    //     block ?
                    //         <div className="text-center mb-1">
                    //             {`Đang hiện thị từ ${start} đến ${end} trong tổng số ${total} bản ghi`}
                    //         </div> :
                    //     <div className="mr-4">
                    //         {`${start} - ${end} / ${total}`}
                    //     </div>
                    // )
                }
                {
                    pager.total > 1 &&
                    <nav>
                        <ul className={`${ulClasses} d-flex`} >
                            {
                                showFirstLast && (
                                    <li className={`page-item pagination-first ${page == 1 ? 'disabled' : ''}`}>
                                        <a className='page-link' onClick={() => this.handleChange(1)} tabIndex={0}></a>
                                    </li>
                                )
                            }
                            {
                                showPrevNext && (
                                    <li className={`page-item pagination-prev ${page == 1 ? 'disabled' : ''}`}>
                                        <a className='page-link' onClick={() => this.handleChange(page - 1)} tabIndex={0}></a>
                                    </li>
                                )
                            }


                            {
                                pager.pages.map(num =>
                                    <li key={num} className={classNames('page-item', { 'active': (page === num) })}>
                                        <a className='page-link' onClick={() => this.handleChange(num)} tabIndex={0}>{num}</a>
                                    </li>
                                )
                            }

                            {
                                showPrevNext && (
                                    <li className={`page-item pagination-next ${page == pager.total ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => this.handleChange(page + 1)} tabIndex={0}></a>
                                    </li>
                                )
                            }

                            {
                                showFirstLast && (
                                    <li className={`page-item pagination-last ${page == pager.total ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => this.handleChange(pager.total)} tabIndex={0}></a>
                                    </li>
                                )
                            }

                        </ul>
                    </nav>
                }
            </div >
        );
    }
}

Pagination.propTypes = {
    className: PropTypes.string,
    total: PropTypes.number.isRequired, //số record items
    pageSize: PropTypes.number.isRequired, //Tổng số items trên 1 trang
    page: PropTypes.number, // page hiện tại
    numberButtons: PropTypes.number, // số buttons hiện thị
    align: PropTypes.oneOf(["left", "center", "right"]),
    showPrevNext: PropTypes.bool,
    showFirstLast: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    showLabel: PropTypes.bool,
    alwayDisplay: PropTypes.bool,
    block: PropTypes.bool
};

Pagination.defaultProps = {
    page: 1,
    block: true,
    align: 'center',
    showPrevNext: true,
    showFirstLast: false,
    showLabel: true,
    alwayDisplay: false,
    numberButtons: 5
};

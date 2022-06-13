import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './icon';

class Modal extends Component {

    componentDidMount() {
        const { onShow, onShown, onHide, onHidden, onRequestClose } = this.props;

        $(this.modal)
            .on('show.bs.modal', function (e) {
                $(this).css('background', 'rgba(0,0,0,.2)');
                if (onShow) onShow();
            })
            .on('shown.bs.modal', function (e) {
                if (onShown) onShown();
            })
            .on('hide.bs.modal', function (e) {
                if (onHide) onHide();
            })
            .on('hidden.bs.modal', function (e) {
                if ($('.modal.show').length > 0) {
                    $('body').addClass('modal-open');
                    if ($('body').height() > $(window).height()) {
                        $('body').css('padding-right', 17);
                    }
                }
                if (onHidden) onHidden();
            })
            .on('click', function (e) {
                if ($(e.target).is('.modal')) {
                    if (onRequestClose) onRequestClose();
                }
            })
            .modal(this.props.show ? 'show' : 'hide');

        $(document).on('keydown', this.onKeyDown);
    }

    componentWillReceiveProps(props) {
        $(this.modal).modal(props.show ? 'show' : 'hide');
    }

    componentWillUnmount() {
        $(document).off('keydown', this.onKeyDown);
        $(this.modal).modal('hide');
    }

    onKeyDown = e => {
        if (e.key == "Escape" && this.props.show) {
            if (this.props.onRequestClose) this.props.onRequestClose();
        }
    }

    handleUpdate = () => {
        $(this.modal).modal('handleUpdate');
    }

    render() {
        const { onShow, onShown, onHide, onHidden, show,
            animation, backdrop, size, focus, className, style,
            renderHeader, renderFooter, onRequestClose,
            title, buttons, children, maxWidth, preload, closeIcon, ...props } = this.props;

        const classes = classnames('modal', 'fade', className)

        const dialogClasses = classnames('modal-dialog modal-dialog-centered', {
            'modal-lg': size == "large",
            'modal-sm': size == "small",
            'modal-full': size == "full",
        });

        return (
            <div ref={ref => this.modal = ref}
                {...props}
                style={style}
                className={classes}
                data-keyboard={false}
                data-focus={focus}
                data-backdrop={false}
                aria-hidden="true">
                <div className={dialogClasses} style={{ maxWidth }}>
                    {
                        (preload || this.props.show) && (
                            <div className="modal-content">

                                <div className="modal-header">
                                    {
                                        renderHeader && (
                                            renderHeader(title)
                                        )
                                    }
                                    {
                                        !renderHeader && title && (
                                            <h5 className="modal-title pull-left">{title}</h5>
                                        )
                                    }
                                    {
                                        closeIcon && <Icon size={25} color="#fff" className="pointer close-btn" name="close-circle-o" onClick={onRequestClose} />
                                    }

                                </div>
                                <div className="modal-body">
                                    {children}
                                </div>
                                {
                                    renderFooter && (
                                        <div className="modal-footer">
                                            {
                                                renderFooter(buttons)
                                            }
                                        </div>
                                    )
                                }
                                {
                                    !renderFooter && buttons && (
                                        <div className="modal-footer">
                                            {
                                                buttons.map((button, index) =>
                                                    React.cloneElement(button, { key: index }))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    animation: PropTypes.bool,
    backdrop: PropTypes.bool,
    preload: PropTypes.bool, //cho phép load nội dung khi chưa hiện thị
    focus: PropTypes.bool,
    closeIcon: PropTypes.bool,
    show: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small', 'large', 'full']),
    maxWidth: PropTypes.number,
    buttons: PropTypes.arrayOf(PropTypes.element),
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    onRequestClose: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func
}
Modal.defaultProps = {
    animation: true,
    backdrop: true,
    closeIcon: true,
    focus: true,
    show: false,
    preload: false,
    size: 'default'
}

export default Modal;
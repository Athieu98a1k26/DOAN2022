import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactModal from 'react-modal';
import Icon from './icon';
class Modal extends Component {

    // componentDidMount() {
    //     const { onShow, onShown, onHide, onHidden, onRequestClose } = this.props;

    //     $(this.modal)
    //         .on('show.bs.modal', function (e) {
    //             $(this).css('background', 'rgba(0,0,0,.2)');
    //             if (onShow) onShow();
    //         })
    //         .on('shown.bs.modal', function (e) {
    //             if (onShown) onShown();
    //         })
    //         .on('hide.bs.modal', function (e) {
    //             if (onHide) onHide();
    //         })
    //         .on('hidden.bs.modal', function (e) {
    //             if ($('.modal.show').length > 0) {
    //                 $('body').addClass('modal-open');
    //                 if ($('body').height() > $(window).height()) {
    //                     $('body').css('padding-right', 17);
    //                 }
    //             }
    //             if (onHidden) onHidden();
    //         })
    //         .on('click', function (e) {
    //             if ($(e.target).is('.modal')) {
    //                 if (onRequestClose) onRequestClose();
    //             }
    //         })
    //         .modal(this.props.show ? 'show' : 'hide');

    //     $(document).on('keydown', this.onKeyDown);
    // }

    // componentWillReceiveProps(props) {
    //     $(this.modal).modal(props.show ? 'show' : 'hide');
    // }

    // componentWillUnmount() {
    //     $(document).off('keydown', this.onKeyDown);
    //     $(this.modal).modal('hide');
    // }

    onKeyDown = e => {
        // if (e.key == "Escape" && this.props.show) {
        //     if (this.props.onRequestClose) this.props.onRequestClose();
        // }
    }

    handleUpdate = () => {
        //$(this.modal).modal('handleUpdate');
    }

    render() {
        const { onShow, show, focus, size, className, renderHeader, renderFooter,
            bodyStyle, headerStyle, footerStyle, contentStyle, style, overlayStyle,
            onRequestClose, title, buttons, children, maxWidth, closeIcon, padding, ...props } = this.props;
        const classes = classnames('modal-dialog modal-dialog-centered', className, {
            'modal-lg': size == "large",
            'modal-sm': size == "small",
            'modal-full': size == "full",
        });

        const modalStyle = {
            ...style,
            maxWidth
        }

        const backdropStyle = {
            ...overlayStyle,
            backgroundColor: 'rgba(0,0,0,.2)',
            display: 'block'
        }

        return (
            <ReactModal
                isOpen={show}
                onAfterOpen={onShow}
                contentLabel={title}
                onRequestClose={onRequestClose}
                style={{ overlay: backdropStyle, content: modalStyle }}
                className={classes}
                overlayClassName='modal'
                shouldFocusAfterRender={focus}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                bodyOpenClassName='modal-open'
                ariaHideApp={false}
            >
                <div className="modal-content" style={contentStyle}>
                    {renderHeader || title &&
                        <div className="modal-header" style={headerStyle}>
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
                                closeIcon && (
                                    <Icon size={25} color="#fff" className="pointer close-btn" name={closeIcon} onClick={onRequestClose} />
                                )
                            }
                        </div>
                    }
                    <div className="modal-body" style={bodyStyle ? { ...bodyStyle, padding } : { padding }}>
                        {children}
                    </div>
                    {
                        renderFooter && (
                            <div className="modal-footer" style={footerStyle}>
                                {
                                    renderFooter(buttons)
                                }
                            </div>
                        )
                    }
                    {
                        !renderFooter && buttons && (
                            <div className="modal-footer" style={footerStyle}>
                                {
                                    buttons.map((button, index) =>
                                        React.cloneElement(button, { key: index }))
                                }
                            </div>
                        )
                    }
                </div>
            </ReactModal>
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    focus: PropTypes.bool,
    show: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small', 'large', 'full']),
    maxWidth: PropTypes.number,
    buttons: PropTypes.arrayOf(PropTypes.element),
    onShow: PropTypes.func,
    closeIcon: PropTypes.string,
    onRequestClose: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    style: PropTypes.object, //style của modal
    overlayStyle: PropTypes.object, //style của backdrop
    contentStyle: PropTypes.object, //style của modal-content
    headerStyle: PropTypes.object, //style của modal-header
    bodyStyle: PropTypes.object, //style của modal-body
    footerStyle: PropTypes.object, //style của modal-footer
    padding: PropTypes.number,
}
Modal.defaultProps = {
    focus: true,
    show: false,
    closeIcon: 'close-circle-o',
    size: 'default'
}

export default Modal;
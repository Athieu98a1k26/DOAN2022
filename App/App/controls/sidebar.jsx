import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


export default class Sidebar extends React.Component {

    componentDidMount() {
        $(this.refs.scrollbar).scrollbar().scrollLock();
        if (this.props.show) {
            $('body').addClass('modal-open')
        }
    }

    componentWillUnmount() {
        $('body').removeClass('modal-open')
    }

    componentDidUpdate() {
        if (this.props.show) {
            $('body').addClass('modal-open')
        }
        else {
            $('body').removeClass('modal-open')
        }
    }

    close = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    render() {
        const { right, show, mini, backdrop, onRequestClose,
            width, padding, backgroundColor, backdropColor, className, style, ...props } = this.props;


        const classes = classnames('sidebar', className, {
            'sidebar-right': right,
            'sidebar--hidden': !show
        });

        return (
            <React.Fragment>
                <aside className={classes} style={{ ...style, width, padding, backgroundColor }}>
                    <div className="scrollbar-inner" ref="scrollbar">
                        {this.props.children}
                    </div>
                </aside>
                {
                    show && backdrop && (
                        <div onClick={this.close}
                            className="ma-backdrop"
                            style={{ backgroundColor: backdropColor }} />
                    )
                }
            </React.Fragment>
        );
    }
}

Sidebar.propTypes = {
    width: PropTypes.number,
    padding: PropTypes.number,
    show: PropTypes.bool,
    backdrop: PropTypes.bool,
    backdropColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    right: PropTypes.bool,
    onRequestClose: PropTypes.func
}

Sidebar.defaultProps = {
    right: true,
    width: 400,
    backdrop: true,
    backdropColor: 'rgba(0,0,0,.1)',
    backgroundColor: '#fff'
}

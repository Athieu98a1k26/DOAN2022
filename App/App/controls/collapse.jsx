import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Collapse extends React.Component {
    componentDidMount() {
        const { show, onShow, onShown, onHide, onHidden } = this.props;
        $(this.collapse)
            .on('show.bs.collapse', function () {
                if (onShow) onShow();
            })
            .on('shown.bs.collapse', function () {
                if (onShown) onShown();
            })
            .on('hide.bs.collapse', function () {
                if (onHide) onHide();
            })
            .on('hidden.bs.collapse', function () {
                if (onHidden) onHidden();
            })
            .collapse(show ? 'show' : 'hide');
    }

    componentWillReceiveProps(props) {
        $(this.collapse).collapse(props.show ? 'show' : 'hide');
    }

    render() {
        const { show, onShow, onShown, onHide, onHidden, className, ...props } = this.props;

        return (
            <div ref={ref => this.collapse = ref} className={classnames('collapse', className)} aria-expanded={!!show} {...props}>
                {this.props.children}
            </div>
        )
    }
}

Collapse.propTypes = {
    show: PropTypes.bool,
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
}

export default Collapse;
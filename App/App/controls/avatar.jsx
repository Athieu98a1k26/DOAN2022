import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import request from '../lib/request';

export default class Avatar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ok: true
        }
    }

    componentWillReceiveProps(props) {
        if(props.src != this.props.src){
            this.setState({ ok: true });
        }
    }

    onError = () => {
        this.setState({ ok: false });
    }

    render() {
        const { name, src, size, style, className, backgroundColor, ...props } = this.props;
        const url = request.url(src);

        const imgStyle = {
            ...style,
            width: size,
            height: size,
            backgroundColor
        }

        const classes = classNames("avatar", className, {
            'avatar-text': !this.state.ok
        });

        const firstLetter = (name || "")[0];
        if (this.state.ok) {
            return <img {...props} src={url} onError={this.onError} style={imgStyle} className={classes} />
        }
        else {
            return <div {...props} style={imgStyle} className={classes}>{firstLetter}</div>
        }
    }
}

Avatar.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    backgroundColor: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    size: PropTypes.number, //width and height in pixel
}

Avatar.defaultProps = {
    backgroundColor: 'rgba(0,0,0,.1)',
    size: 36
}
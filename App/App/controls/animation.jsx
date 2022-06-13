import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Animation extends React.Component {


    componentWillMount() {
        if (this.props.in && this.props.onStart) {
            this.props.onStart();
        }
    }

    componentDidMount() {
        if (this.props.onFinish && this.props.iterationCount > 0) {
            const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            const { type, onFinish } = this.props;
            $(this.refs.div).one(animationEnd, function () {
                $(this).removeClass('animated ' + type);
                onFinish();
            });
        }
    }

    componentWillReceiveProps(props) {
        if (!this.props.in && props.in) {
            props.onStart();
        }
    }

    render() {
        const { in: inProp, type, duration, delay, iterationCount, onStart, onFinish, className, ...props } = this.props;

        let classes = classnames('animated', className, {
            [type]: inProp,
            infinite: iterationCount == -1,
        })

        let style = {
            WebkitAnimationFillMode: 'none',
            AnimationFillMode: 'none',
        };

        if (delay) {
            style.animationDelay = delay + 's';
        }
        if (duration) {
            style.animationDuration = duration + 's';
        }
        if (iterationCount > 1) {
            style.animationIterationCount = iterationCount;
        }

        return (
            <div
                {...props}
                ref="div"
                style={style}
                className={classes} >
                {
                    this.props.children
                }
            </div>
        )
    }
}

export const animationTypes = {
    "bounce": "bounce",
    "flash": "flash",
    "pulse": "pulse",
    "rubberBand": "rubberBand",
    "shake": "shake",
    "headShake": "headShake",
    "swing": "swing",
    "tada": "tada",
    "wobble": "wobble",
    "jello": "jello",
    "bounceIn": "bounceIn",
    "bounceInDown": "bounceInDown",
    "bounceInLeft": "bounceInLeft",
    "bounceInRight": "bounceInRight",
    "bounceInUp": "bounceInUp",
    "bounceOut": "bounceOut",
    "bounceOutDown": "bounceOutDown",
    "bounceOutLeft": "bounceOutLeft",
    "bounceOutRight": "bounceOutRight",
    "bounceOutUp": "bounceOutUp",
    "fadeIn": "fadeIn",
    "fadeInDown": "fadeInDown",
    "fadeInDownBig": "fadeInDownBig",
    "fadeInLeft": "fadeInLeft",
    "fadeInLeftBig": "fadeInLeftBig",
    "fadeInRight": "fadeInRight",
    "fadeInRightBig": "fadeInRightBig",
    "fadeInUp": "fadeInUp",
    "fadeInUpBig": "fadeInUpBig",
    "fadeOut": "fadeOut",
    "fadeOutDown": "fadeOutDown",
    "fadeOutDownBig": "fadeOutDownBig",
    "fadeOutLeft": "fadeOutLeft",
    "fadeOutLeftBig": "fadeOutLeftBig",
    "fadeOutRight": "fadeOutRight",
    "fadeOutRightBig": "fadeOutRightBig",
    "fadeOutUp": "fadeOutUp",
    "fadeOutUpBig": "fadeOutUpBig",
    "flipInX": "flipInX",
    "flipInY": "flipInY",
    "flipOutX": "flipOutX",
    "flipOutY": "flipOutY",
    "lightSpeedIn": "lightSpeedIn",
    "lightSpeedOut": "lightSpeedOut",
    "rotateIn": "rotateIn",
    "rotateInDownLeft": "rotateInDownLeft",
    "rotateInDownRight": "rotateInDownRight",
    "rotateInUpLeft": "rotateInUpLeft",
    "rotateInUpRight": "rotateInUpRight",
    "rotateOut": "rotateOut",
    "rotateOutDownLeft": "rotateOutDownLeft",
    "rotateOutDownRight": "rotateOutDownRight",
    "rotateOutUpLeft": "rotateOutUpLeft",
    "rotateOutUpRight": "rotateOutUpRight",
    "hinge": "hinge",
    "jackInTheBox": "jackInTheBox",
    "rollIn": "rollIn",
    "rollOut": "rollOut",
    "zoomIn": "zoomIn",
    "zoomInDown": "zoomInDown",
    "zoomInLeft": "zoomInLeft",
    "zoomInRight": "zoomInRight",
    "zoomInUp": "zoomInUp",
    "zoomOut": "zoomOut",
    "zoomOutDown": "zoomOutDown",
    "zoomOutLeft": "zoomOutLeft",
    "zoomOutRight": "zoomOutRight",
    "zoomOutUp": "zoomOutUp",
    "slideInDown": "slideInDown",
    "slideInLeft": "slideInLeft",
    "slideInRight": "slideInRight",
    "slideInUp": "slideInUp",
    "slideOutDown": "slideOutDown",
    "slideOutLeft": "slideOutLeft",
    "slideOutRight": "slideOutRight",
    "slideOutUp": "slideOutUp"
}

Animation.propTypes = {
    type: PropTypes.oneOf(Object.keys(animationTypes)),
    duration: PropTypes.number, //seconds
    iterationCount: PropTypes.number, //-1 = infinite
    delay: PropTypes.number, //seconds
    in: PropTypes.bool,
    onStart: PropTypes.func,
    onFinish: PropTypes.func
}

Animation.defaultProps = {
    type: animationTypes.bounceInDown,
    iterationCount: 1,
    in: true
}

Animation.types = animationTypes;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from './card2';
const icons = {
    post: require('../asset/img/empty/post.png'),
    job: require('../asset/img/empty/job.png'),
    media: require('../asset/img/empty/media.png'),
    process: require('../asset/img/empty/process.png'),
    event: require('../asset/img/empty/event.png'),
}

class Empty extends Component {
    render() {
        const { className, type, text, width, customRenderText, ...props } = this.props;
        const classes = classnames(className,
            "empty-state",
            "text-center",
            `empty-state--${type}`
        )
        return (
            <Card className={classes} padding={20}>
                <img style={{ maxWidth: width }} src={icons[type]} />
                {
                    customRenderText &&
                    <div className="empty-text mt-4">
                        <h4>
                            {customRenderText(text)}
                        </h4>
                    </div>
                }
                {
                    text && !customRenderText &&
                    <div className="empty-text mt-4">
                        <h4>
                            {text}
                        </h4>
                    </div>
                }

            </Card>
        );
    }
}

Empty.defaultProps = {
    type: "post",
    width: 400,
}
Empty.propTypes = {
    type: PropTypes.oneOf(["post", "job", "process", "media", "event"]).isRequired,
    className: PropTypes.string,
    text: PropTypes.string,
    customRenderText: PropTypes.func,
    width:PropTypes.number
}

export default Empty;

import PropTypes from 'prop-types';
import classNames from 'classnames';
import React,{Component} from 'react';
class Card extends Component {
    render() {
        const { tag: Tag, className, type, children, ...attributes } = this.props;
        const classes = classNames(
            className,
            'card',
            type ? `car-${type}` : false
        )
        return (
            <Tag className={classes} {...attributes}> {children}</Tag>
        );
    }
}
Card.defaultProps = {
    type: false,
    tag: 'div',
}
Card.propTypes = {
    tag: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'danger', 'success', 'info', 'warning', false])
};

export default Card;

/**
 * Card Overlay
 */
export class CardOverlay extends Component {
    render() {
        const { tag: Tag, className, children, ...attributes } = this.props;
        const classes = classNames(
            className,
            'card-img-overlay',
        )
        return (
            <Tag className={classes} {...attributes}>
                {children}
            </Tag>
        );
    }
}
CardOverlay.defaultProps = {
    tag: 'div'
}
CardOverlay.propTypes = {
    tag: PropTypes.string,
};

/**
 * Card Header
 */
export class CardHeader extends Component {
    render() {
        const { tag: Tag, className, children, ...attributes } = this.props;
        const classes = classNames(
            className,
            'card-header',
        )
        return (
            <Tag className={classes} {...attributes}>
                {children}
            </Tag>
        );
    }
}
CardHeader.defaultProps = {
    tag: 'div'
}
CardHeader.propTypes = {
    tag: PropTypes.string,
};

/**
 * CardFooter
 */
export class CardFooter extends Component {
    render() {
        const { tag: Tag, className, children, ...attributes } = this.props;
        const classes = classNames(
            className,
            'card-footer',
        )
        return (
            <Tag className={classes} {...attributes}> {children}</Tag>
        );
    }
}
CardFooter.defaultProps = {
    tag: 'div'
}
CardFooter.propTypes = {
    tag: PropTypes.string,
};



/**
 * CardContent
 */
export class CardContent extends Component {
    render() {
        const { tag: Tag, className, children, ...attributes } = this.props;
        const classes = classNames(
            className,
            'card-body',
        )
        return (
            <Tag className={classes} {...attributes}> {children}</Tag>
        );
    }
}
CardContent.defaultProps = {
    tag: 'div'
}
CardContent.propTypes = {
    tag: PropTypes.string,
};


/**
 * CardTitle
 */
export class CardTitle extends Component {
    render() {
        const { tag: Tag, className, children, ...attributes } = this.props;
        const classes = classNames(
            className,
            'card-title',
        )
        return (
            <Tag className={classes} {...attributes}> {children}</Tag>
        );
    }
}
CardTitle.defaultProps = {
    tag: 'h2'
}
CardTitle.propTypes = {
    tag: PropTypes.string,
};


/**
 * CardSubTitle
 */
export class CardSubTitle extends Component {
    render() {
        const { tag: Tag, className, children, ...attributes } = this.props;
        const classes = classNames(
            className,
            'card-subtitle',
        )
        return (
            <Tag className={classes} {...attributes}> {children}</Tag>
        );
    }
}
CardSubTitle.defaultProps = {
    tag: 'small'
}
CardSubTitle.propTypes = {
    tag: PropTypes.string,
};

/**
 * CardSubTitle
 */
export class CardLink extends Component {
    render() {
        const { tag: Tag, className, children, ...attributes } = this.props;
        const classes = classNames(
            className,
            'card-link',
        )
        return (
            <Tag className={classes} {...attributes}> {children}</Tag>
        );
    }
}
CardLink.defaultProps = {
    tag: 'small'
}
CardLink.propTypes = {
    tag: PropTypes.string,
};

export class CardImage extends Component {
    render() {
        const { position, className, overlay, ...attributes } = this.props;
        const classes = classNames(
            className,
            overlay ? `card-img` : false,
            overlay === false && position ? `card-img-${position}` : false,
        )
        return (
            <img className={classes} {...attributes} />
        );
    }
}

// export class CardActions extends Component {
//     render() {
//         const { tag, inverse,actions, ...attributes } = this.props;
//         const classes = classNames(
//             className,
//             'actions',
//             inverse ? 'actions--inverse' ? false,
//         )
//         return (
//             <div className={classes}>
//                 {
//                     actions.map((item,index)=>{
//                         if (item.menuItems) {
                            
//                         }else{
//                             <Icon
//                         }
//                     })
//                 }
//                 <a href="" class="actions__item mdi mdi-trending-up"></a>
//                 <a href="" class="actions__item mdi mdi-check-all"></a>
//                 <div class="dropdown actions__item">
//                     <i data-toggle="dropdown" class="mdi mdi-more-vert"></i>
//                     <div class="dropdown-menu dropdown-menu-right">
//                         <a href="" class="dropdown-item">Refresh</a>
//                         <a href="" class="dropdown-item">Manage Widgets</a>
//                         <a href="" class="dropdown-item">Settings</a>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// CardImage.defaultProps = {
//     overlay: false,
//     position: 'top',
// }
// CardImage.propTypes = {
//     position: PropTypes.oneOf(['top', 'bottom', false]),
//     overlay: PropTypes.bool,
// };


CardHeader.Title = CardTitle;
CardHeader.SubTitle = CardSubTitle;

Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Content = CardContent;
Card.Overlay = CardOverlay;
Card.Image = CardImage;
Card.Link = CardLink;



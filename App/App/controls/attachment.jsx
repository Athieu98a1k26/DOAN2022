import React from 'react';
import PropTypes from 'prop-types';
import request from '../lib/request';
import {filters,thumbnails} from './upload';

export default class Attachment extends React.Component {
    
    fullUrl = (url, viewOnline, ext) => {
        url = request.url(url);
        if (viewOnline && this.props.previewOnline && !request.isLocal) {
            if (/doc|docx|xls|xlsx|ppt|pptx/.test(ext)) {
                url = request.decode(url);
                url = "https://view.officeapps.live.com/op/view.aspx?src=" + url;
            }
        }

        return url;
    }

    getDefaultThumbnail = ext => {
        for (let key in filters) {
            var reg = new RegExp("^(" + filters[key] + ")$", "i");
            if (reg.test(ext)) {
                return thumbnails[key] || thumbnails['default'];
            }
        }
        return thumbnails['default'];
    }

    componentDidMount(){
        $(this.link).tooltip();
    }

    render() {
        const { attachment, width, height, showTitle, previewOnline, style, ...props } = this.props;
        if(!attachment) return null;

        if(showTitle){

        }

        return(
            <a {...props} 
                style={{display:'inline-block', ...style}}
                ref={ref=>this.link = ref}
                href={this.fullUrl(attachment.url, true, attachment.extension)} 
                title={attachment.title + '.' + attachment.extension}
                target="_blank">
                {
                    showTitle ? attachment.title :
                    (
                        attachment.thumbnail ?
                            <img style={{width, height}} src={this.fullUrl(attachment.thumbnail)} /> :
                            attachment.type.indexOf('image') == 0 ?
                                <img style={{width, height}} src={this.fullUrl(attachment.url)} /> :
                                <img style={{width, height}} src={this.getDefaultThumbnail(attachment.extension)} />
                    )
                }
            </a>
        )
    }
}

Attachment.defaultProps={
    previewOnline: true
}

Attachment.propTypes = {
    attachment: PropTypes.object,
    previewOnline: PropTypes.bool, // xem trực tiếp file online nếu có thể 
    showTitle: PropTypes.bool, // hiện thị tiêu đề thay vì ảnh đại diện
    className: PropTypes.string,
    style: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number, 
    onClick: PropTypes.func
}
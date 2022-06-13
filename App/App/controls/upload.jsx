import React from 'react';
import { EventEmitter } from 'events';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './button';
import Icon from './icon';
import Dropzone from 'react-dropzone';
import request from '../lib/request';
import color from '../constants/color';
import Progress from './progress';
import Loading from './loading';

import { connect } from '../lib/connect';
import * as actions from '../actions/attachment';

export const thumbnails = {
    default: require('../asset/img/media/default.png'),
    archive: require('../asset/img/media/archive.png'),
    audio: require('../asset/img/media/audio.png'),
    code: require('../asset/img/media/code.png'),
    document: require('../asset/img/media/document.png'),
    interactive: require('../asset/img/media/interactive.png'),
    spreadsheet: require('../asset/img/media/spreadsheet.png'),
    text: require('../asset/img/media/text.png'),
    video: require('../asset/img/media/video.png'),
}

export const filters = {
    archive: 'rar|zip|cab|arj|lzh|ace|7zip|tar|gzip|uue|bz2|jar|z',
    audio: 'mp3|aac|ac3|wma|wav|arc|midi',
    code: 'cs|cshtml|php|js|jsx|css|scss|htm|html|json|c|h|m|a|java',
    document: 'doc|docx|odd|odc|odt|svg|sxd|pdf|prc|epub|txt|ogg|rtf',
    interactive: 'ppt|pptx|odp|sda|sdd|sdp|vor',
    spreadsheet: 'xls|xlsx|ods|csv|xlsm|xlsb',
    text: 'txt|rtf|log',
    video: 'mp4|avi|wmv|flv|ogg|mpg|mpeg',
    image: 'jpg|gif|png|bmp|jpeg'
}

const styles = {
    container: {
        display: 'inline-block'
    },
    item: {
        border: '1px solid #cccccc5c',
        padding: '5px',
        margin: '5px 0',
        overflow: 'auto'
    },
    itemList: {
        border: '1px solid #cccccc5c',
        padding: '5px',
        margin: '5px 0',
        overflow: 'auto'
    },
    itemThumbnail: {
        margin: 5,
        width: 40,
        height: 40,
        position: 'relative'
    },
    thumbnail: {
        float: 'left',
        width: 40,
        height: 40
    },
    info: {
        marginLeft: 50,
        display: 'flex'
    },
    meta: {
        color: '#ccc'
    },
    remove: {
        padding: '2px 4px',
        cursor: 'pointer'
    },
    removeThumbnail: {
        position: 'absolute',
        top: -5,
        right: -5,
        border: '1px solid #ccc',
        display: 'inline-block',
        cursor: 'pointer',
        padding: '1px 3px',
        borderRadius: 10,
        height: 16,
        width: 16,
        background: '#000'
    }
}

class Upload extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.proxy = new EventEmitter();

        var state = {
            files: [],
            started: true,
            removeUrl: null,
            errors: null,
            count: 0,
            totalUploadedSize: 0,
            totalAddedSize: 0
        }

        if (props.attachments) {
            state.files = props.attachments.map(attach => {
                state.totalUploadedSize += attach.size;
                return {
                    attach, id: 'at-' + attach.id,
                    started: true,
                    uploaded: true,
                    progress: 100
                }
            });
        }

        this.state = state;
    }

    static getDerivedStateFromProps(props, state) {
        if (props.attachments) {
            var totalUploadedSize = 0;

            let ats = props.attachments.map(attach => {
                totalUploadedSize += attach.size;
                return {
                    attach,
                    id: 'at-' + attach.id,
                    started: true,
                    uploaded: true,
                    progress: 100,

                }
            });

            let files = state.files.filter(item => !item.attach);

            return {
                files: [...ats, ...files],
                totalUploadedSize
            };
        }
        return null;
    }

    validate = () => {
        const { required, requiredMessage, onValidate } = this.props;

        let error = null, msgType = 'danger';

        if (required && (
            this.state.files.length == 0 ||
            this.state.files.filter(item => !item.started).length == 0
            && this.state.files.filter(item => item.uploaded).length == 0)) {
            error = requiredMessage;
        }

        if (onValidate) {
            onValidate(!!error);
        }

        if (error) {
            this.setState({ error, msgType });
            return false;
        } else {
            this.setState({ error: null });
            return true;
        }
    }

    getMaxTotalSize = () => {
        //max 150mb = 157286400
        let maxTotalSize = this.props.options.maxTotalSize;
        if (!maxTotalSize || maxTotalSize > 157286400) {
            maxTotalSize = 157286400;
        }
        return maxTotalSize;
    }

    start = () => {
        const options = { ...Upload.defaultProps.uploadOptions, ...this.props.uploadOptions }

        this.setState({ started: true });
        this.state.files.filter(item => !item.uploaded && !item.error).forEach(item => {
            this.doUpload(item, options);
        })
    }

    onDrop = (files) => {
        const max = this.props.options.maxFiles;

        const count = this.state.files.length;

        if (max > 0) {
            files = files.splice(0, max - count);
        }
        const maxTotalSize = this.getMaxTotalSize();
        if (files.length > 0) {
            let newFiles = [];

            files.forEach((file, i) => {
                if (maxTotalSize > this.state.totalUploadedSize + this.state.totalAddedSize + file.size) {
                    newFiles.push({
                        file,
                        id: 'file-' + (this.state.count + i),
                        started: false,
                        progress: 0,
                        error: null,
                        uploaded: false
                    });
                    this.state.totalAddedSize += file.size;
                }
            });

            this.state.count += newFiles.length;

            this.setState({
                files: this.state.files.concat(newFiles),
                started: false
            }, () => {
                if (this.props.autoUpload) {
                    this.start();
                }
            });

            if (this.props.onFileAdded) {
                newFiles.forEach(file => {
                    this.props.onFileAdded(file);
                })
            }
        }
    }

    removeFile = item => {
        if (item.attach) {
            confirm(__('Bạn có chắc chắn muốn xóa không?')).then(ok => {
                if (ok) {
                    this.setState({ removeUrl: item.attach.url });

                    this.props.actions.remove(item.attach.id, item.attach.url)
                        .then(() => {
                            let files = this.state.files.filter(f =>
                                f.attach && f.attach.id != item.attach.id
                            ).map(item => item.attach);

                            this.handleChange(files);

                            this.setState({
                                removeUrl: null,
                                totalUploadedSize: this.state.totalUploadedSize - item.attach.size
                            });
                            this.removeFileState(item);

                            if (this.props.onRemoveSuccess) {
                                this.props.onRemoveSuccess(item);
                            }
                        })
                        .catch((error) => {
                            this.setState({ removeUrl: null });
                            this.setError(item, 'Error server ' + error.message);
                            if (this.props.onRemoveError) {
                                this.props.onRemoveError(item, 'Error server ' + error.message);
                            }
                        })
                } else {
                    this.setState({ removeUrl: null });
                }
            })
        } else {
            this.removeFileState(item);
        }
    }

    removeFileState = item => {
        if (item.file) {
            this.state.totalAddedSize -= item.file.size;
        }
        this.setState({
            files: this.state.files.filter(f => f.id != item.id),
        });

        if (this.props.onFileRemoved) {
            this.props.onFileRemoved(item);
        }

        if (this.props.autoValidate) {
            this.validate();
        }
    }

    removeAttachment = attach => {
        return this.props.actions.remove(attach.id, attach.url);
    }

    setProgress = (item, percent) => {
        item.progress = percent;

        this.forceUpdate();

        if (this.props.onUploadProgress) {
            this.props.onUploadProgress(item);
        }
    }

    setError = (item, error) => {
        item.error = error;

        this.forceUpdate();

        if (this.props.onUploadError) {
            this.props.onUploadError(item);
        }

        if (this.props.autoValidate) {
            this.validate();
        }
    }

    onSuccess = (item, attach) => {
        item.attach = attach;
        item.uploaded = true;

        if (this.props.onUploadSuccess) {
            this.props.onUploadSuccess(item);
        }

        let files = this.state.files.filter(f => f.attach).map(item => item.attach);

        this.handleChange(files);

        if (this.props.autoValidate) {
            this.validate();
        }

        this.forceUpdate();
    }

    doUpload = (item, options) => {
        item.started = true;
        this.forceUpdate();

        if (this.props.onUploadStart) {
            this.props.onUploadStart(item);
        }

        var form = new FormData();
        form.append('file', item.file);

        for (let key in options) {
            form.append(key, options[key]);
        }

        const req = new XMLHttpRequest();
        req.open('POST', request.url('/api/attachments'));
        req.setRequestHeader("authorization", 'Bearer ' + this.props.token);

        req.addEventListener('load', (e) => {
            this.proxy.removeAllListeners(['abort']);
            if (req.status >= 200 && req.status <= 299) {
                let attach = JSON.parse(req.response);
                this.onSuccess(item, attach);
            } else {
                this.setError(item, 'Error server ' + req.status);
            }
        }, false);

        req.addEventListener('error', (e) => {
            this.setError(item, 'Error upload ' + req.status);
        }, false);

        req.upload.addEventListener('progress', (e) => {
            let progress = 0;
            if (e.total !== 0) {
                progress = parseInt((e.loaded / e.total) * 100, 10);
            }
            this.setProgress(item, progress);
        }, false);

        req.addEventListener('abort', (e) => {
            this.setError(item, 'File bị hủy');
        }, false);

        this.proxy.once('abort', () => {
            req.abort();
        });

        req.send(form);
    }

    handleChange = (files) => {
        if (this.props.onChange) {
            this.props.onChange(files);
        }
    }

    formatSize = size => {
        var units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        var power = size > 0 ? Math.floor(Math.log(size) / Math.log(1024)) : 0;
        var rsize = size / Math.pow(1024, power);
        return rsize.toFixed(1) + units[power];
    }

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

    open = () => {
        console.log('open digalog', this.refs.dropzone)
        this.refs.dropzone.open();
    }

    onDropRejected = (files) => {
        const options = this.props.options;
        const errors = []
        files.map(file => {
            if (file.size > options.maxSize) {
                errors.push(__("{0} bị bỏ qua do vượt quá dung lượng cho phép", file.name));
            }
            console.log(file);
        })
        this.setState({
            errors
        })
        console.log(errors);
    }

    render() {
        const {
            className, style, children, showList, autoUpload, clickable,
            required, label, column, listStyle, listClassName, disabled,
        } = this.props;
        const { maxFiles, ...options } = this.props.options;
        let maxTotalSize = this.getMaxTotalSize();
        const allowUpload = !disabled
            && (!maxFiles || maxFiles > this.state.files.length)
            && (maxTotalSize > this.state.totalAddedSize + this.state.totalUploadedSize);

        const labelClass = classNames(
            'form-control--label',
            column ? `col-md-${12 - column} col-form-label` : null
        )

        const wrapClasses = classNames(className,
            {
                'form-group': label,
                'form-group-default': true
            });

        const wrapControlClasses = classNames(
            'form-control__wrap',
            column ? `col-md-${column}` : null,
        )

        const upClasses = classNames('rs-upload', {
            invalid: this.state.error
        })

        const dropzoneStyle = {
            ...styles.container,
            marginBottom: showList && this.state.files.length > 0 && children && 20,
            ...style
        };

        return (
            <div className={wrapClasses}>
                {
                    label && (
                        <label className={labelClass}>{label}
                            {required && <small className="text-danger required-icon">(*)</small>}
                        </label>
                    )
                }
                <div className={wrapControlClasses} style={{ position: 'static' }}>
                    <div className={upClasses}>
                        {
                            allowUpload && (
                                <Dropzone
                                    onDropRejected={this.onDropRejected}
                                    ref="dropzone"
                                    onDrop={this.onDrop}
                                    noClick={!clickable}
                                    {...Upload.defaultProps.options}
                                    {...options}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({
                                            style: dropzoneStyle
                                        })} >
                                            <input {...getInputProps({ disabled: !!options.disabled })} />
                                            {children}
                                        </div>
                                    )}
                                </Dropzone>
                            )
                        }
                        {
                            showList && this.state.files.length > 0 && (
                                <div style={listStyle} className={listClassName}>
                                    {this.renderList()}
                                </div>
                            )
                        }
                        {
                            allowUpload && !autoUpload && !this.state.started && (
                                <Button icon="upload" text={__('Tải lên')} onClick={this.start} />
                            )
                        }
                        {
                            this.state.error && (
                                <small className="invalid-feedback d-block">{this.state.error}</small>
                            )
                        }
                        {
                            this.state.errors && (
                                this.state.errors.map(err =>
                                    <small style={{ textAlign: 'center' }}
                                        className="invalid-feedback d-block mt-1">{err}</small>
                                )

                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
    renderList = () => {
        const { disabled, listLayout } = this.props;
        const isDisplayThumb = listLayout == 'thumbnail';
        const wrapClass = isDisplayThumb ? 'd-flex flex-wrap' : '';
        return (
            <div className={wrapClass}>
                {
                    this.state.files.map(item => {
                        let style = {
                            ...(isDisplayThumb ? styles.itemThumbnail : styles.itemList),
                            borderColor: item.error ? color.red : '#eee'
                        }
                        if (item.uploaded) {
                            return (
                                <div style={style} key={item.id} title={item.attach.title}>
                                    {
                                        item.attach.thumbnail ?
                                            <img style={styles.thumbnail}
                                                src={this.fullUrl(item.attach.thumbnail)} /> :
                                            item.attach.type.indexOf('image') == 0 ?
                                                <img style={styles.thumbnail}
                                                    src={this.fullUrl(item.attach.url)} /> :
                                                <img style={styles.thumbnail}
                                                    src={this.getDefaultThumbnail(item.attach.extension)} />
                                    }
                                    {
                                        isDisplayThumb ? (
                                            !disabled &&
                                            <Icon style={styles.removeThumbnail}
                                                name="close"
                                                color='#fff'
                                                onClick={() => this.removeFile(item)} />
                                        ) : (
                                            <div style={styles.info}>
                                                <div className="mr-auto">
                                                    <a href={this.fullUrl(item.attach.url, true, item.attach.extension)}
                                                        target="_blank">{item.attach.title}</a>
                                                    <div
                                                        style={styles.meta}>{item.attach.extension.toUpperCase()} | {this.formatSize(item.attach.size)}</div>
                                                </div>
                                                {
                                                    !disabled && (
                                                        <div className="align-self-center">
                                                            {
                                                                this.state.removeUrl == item.attach.url ?
                                                                    <Loading type="inline" show={true} /> :
                                                                    <Icon style={styles.remove}
                                                                        name="delete"
                                                                        onClick={() => this.removeFile(item)} />
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }

                                </div>
                            )
                        }
                        if (item.error) {
                            return (
                                <div style={style} key={item.id}>
                                    {
                                        isDisplayThumb ? (
                                            <div>
                                                <span title={item.error}>Error</span>
                                                <Icon style={styles.removeThumbnail}
                                                    color='#fff'
                                                    name="close"
                                                    onClick={() => this.removeFile(item)} />
                                            </div>
                                        ) : (
                                            <div className="d-flex">
                                                <div>{item.file.name} <span
                                                    className="text-danger">({item.error})</span></div>
                                                <div className="ml-auto">
                                                    <Icon style={styles.remove} name="delete"
                                                        onClick={() => this.removeFile(item)} />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        return (
                            <div style={style} key={item.id} >
                                {
                                    isDisplayThumb ? (
                                        <div>
                                            <span>{item.progress + '%'}</span>
                                            <Icon style={styles.removeThumbnail}
                                                color='#fff'
                                                name="close"
                                                onClick={() => this.removeFile(item)} />
                                        </div>
                                    ) : (
                                        <div className="d-flex">
                                            <div className="mr-auto">{item.file.name}</div>
                                            <div>{item.started ? item.progress + '%' :
                                                <Icon style={styles.remove} name="delete"
                                                    onClick={() => this.removeFile(item)} />}</div>
                                        </div>
                                    )
                                }
                                <Progress bars={{ value: item.progress }} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

Upload.propTypes = {
    label: PropTypes.string,
    column: PropTypes.number,
    className: PropTypes.object, //classname của dropzone
    style: PropTypes.object, //style của dropzone
    listStyle: PropTypes.object,
    listClassName: PropTypes.string,
    children: PropTypes.node, // nút chọn file
    showList: PropTypes.bool, // hiện thị danh sách upload và tiến trình
    autoUpload: PropTypes.bool, // tự động upload sau khi chọn file
    attachments: PropTypes.array, // danh sách file đã upload (trong trường hợp edit)
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    autoValidate: PropTypes.bool,
    onValidate: PropTypes.func,
    previewOnline: PropTypes.bool, // xem tài liệu word, excel, pp online
    disabled: PropTypes.bool,
    clickable: PropTypes.bool,

    //dropzone options
    options: PropTypes.shape({
        multiple: PropTypes.bool, // cho phép chọn nhiều file một lúc
        accept: PropTypes.string, // bộ lọc file https://www.w3schools.com/tags/att_input_accept.asp
        maxSize: PropTypes.number, // dung lượng tối đa một file (bytes)
        minSize: PropTypes.number, // dung lượng tối thiểu một file (bytes)
        maxTotalSize: PropTypes.number, // dung lượng tối đa toàn bộ file
        maxFiles: PropTypes.number, // số lượng file tối đa
        disabled: PropTypes.bool,
    }).isRequired,

    //upload options
    uploadOptions: PropTypes.shape({
        overwrite: PropTypes.bool, // cho phép ghi đè nếu trùng tên trên server
        insertDb: PropTypes.bool, // cho phép chèn bản ghi vào cơ sở dữ liệu, nếu không chỉ trả về đường dẫn file
        createThumbnail: PropTypes.bool, // cho phép tạo thumbnail đối với file ảnh
        path: PropTypes.string, //thư mục con trong thư mục upload
        changeNameTo: PropTypes.string, // đổi tên file thành tên mới
        thumbnailWidth: PropTypes.number, //chiều rộng thumbnail
        thumbnailHeight: PropTypes.number, //chiều cao thumbnail,
        imageWidth: PropTypes.number, // resize chiều rộng hình ảnh
        imageHeight: PropTypes.number, // resize chiều cao hình ảnh
        imageQuality: PropTypes.number, // chất lượng ảnh (1->100), ko truyền sẽ lấy mạc định trong appsettings
        resizeMode: PropTypes.oneOf(['cover', 'contain', 'strech']), // chế độ resize ảnh
        optimize: PropTypes.bool //Tối ưu dung lượng file hình ảnh khi không thiết lập kích thước
    }),

    /**
     * event param: file_data{ file, id, progress, started, error, uploaded, attach}
     * file: file content từ input
     * id: id file trên hàng đợi
     * progress: % upload
     * error: Error nếu có
     * started: đã bắt đầu upload
     * uploaded: đã upload thành công
     * attach: attachment model từ cơ sở dữ liệu
     */

    //event hàng đợi (file chưa up)
    onFileAdded: PropTypes.func,  // gọi khi file được thêm vào hàng đợi
    onFileRemoved: PropTypes.func, // gọi khi file bị xóa khỏi hàng đợi

    //event cho file đang up và đã up
    onUploadStart: PropTypes.func, // gọi khi file bắt đầu upload
    onUploadSuccess: PropTypes.func, // gọi khi file upload xong
    onUploadError: PropTypes.func, // gọi khi file upload Error
    onUploadProgress: PropTypes.func, // gọi trong quá trình % upload thay đổi
    onRemoveSuccess: PropTypes.func, // gọi khi xóa file upload thành công
    onRemoveError: PropTypes.func, // gọi khi xóa file upload Error

    //event cho danh sách file đã up
    onChange: PropTypes.func // gọi khi có sự thay đổi danh sách file đã up, tham số là list attachments
}

Upload.defaultProps = {
    clickable: true,
    dragAndDrop: true,
    autoUpload: true,
    showList: true,
    previewOnline: true,
    options: {
        multiple: true
    },
    uploadOptions: {
        overwrite: false,
        insertDb: true,
        createThumbnail: true,
        optimize: true,
        resizeMode: 'cover'
    },
    autoValidate: true,
    requiredMessage: 'Trường này là bắt buộc'
}

export default connect(Upload, state => ({
    token: state.account.token
}), actions);

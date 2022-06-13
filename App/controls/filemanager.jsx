import PropTypes from 'prop-types';
import React from 'react';
import * as actions from '../actions/attachment';
import { connect } from '../lib/connect';
import request from '../lib/request';
import Button from './button';
import Icon from './icon';
import Modal from './modal2';
import Progress from './progress';
import Upload, { filters, thumbnails } from './upload';

const styles = {
    tabs: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    tabWrap: {
        marginTop: 15,
        position: 'relative',
        flex: 1
    },
    tabContent: {
        display: 'flex',
        position: 'absolute',
        top: 24,
        bottom: 0,
        left: 30,
        right: 30,
        width: 'auto',
        border: '1px solid #eee',
        marginBottom: 0
    },
    infoWrap: {
        padding: '15px 0',
        background: '#f9f9f9',
        borderLeft: '1px solid #eee',
    },
    info: {
        padding: '0 15px',
        overflow: 'auto',
        textAlign: 'center',
    },
    infoTitle: {
        marginTop: 20,
        wordBreak: 'break-all'
    },
    infoThumb: {
        maxWidth: '100%'
    },
    gallery: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'auto',
    },
    fileWrap: {
        padding: 1,
        border: '3px solid transparent',
        width: 138,
        height: 138,
        margin: '0 7px 7px 0'
    },
    fileWrapSelected: {
        border: '3px solid #0C83E2',
        background: '#fff'
    },
    file: {
        position: 'relative',
        height: 130,
        border: '1px solid #ccc',
        textAlign: 'center',
        overflow: 'hidden',
        background: '#EEEEEE',
    },
    fileError: {
        border: '1px solid red',
        color: 'red'
    },
    fileName: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        background: 'rgba(255,255,255,.8)',
        padding: 5,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    thumb: {
        height: '100%'
    },
    thumbDefault: {
        marginTop: 21
    },
    progress: {
        height: 10,
        margin: '45px auto',
        width: '90%'
    },
    item: {
        border: '1px solid #cccccc5c',
        padding: '5px',
        margin: '5px 0',
        overflow: 'auto'
    },
    thumbnail: {
        float: 'left',
        width: 40,
        height: 40
    },
    finfo: {
        marginLeft: 50,
        display: 'flex'
    },
    meta: {
        color: '#ccc'
    },
    remove: {
        padding: '2px 4px',
        cursor: 'pointer'
    }
}

class FileManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            addedFiles: [],
            currentItem: null,
            offset: 0,
            pagesize: 100,
            selectedIds: props.selectedFiles ? props.selectedFiles.map(item => item.id) : [],
            totalSize: props.selectedFiles ? props.selectedFiles.sum(item => item.size) : 0,
        }
    }

    componentDidMount() {
        this.loadFiles();
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (this.props.show && !props.show) {
            this.setState({
                selectedIds: props.selectedFiles ? props.selectedFiles.map(item => item.id) : [],
                totalSize: props.selectedFiles ? props.selectedFiles.sum(item => item.size) : 0,
                addedFiles: this.state.addedFiles.filter(item => !item.error),
                currentItem: null
            });
        } else if (!this.props.show && props.show) {
            const accept = this.props.options.accept || "*";
            const path = this.props.rootPath || "/upload";

            this.props.actions.getList(path, accept, 0, this.state.pagesize);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.show && !prevProps.show && this.refs.gallery) {
            $(this.refs.gallery).scrollbar({
                onScroll: this.onScroll
            }).scrollLock();

            $(this.refs.info).scrollbar().scrollLock();
        }
    }

    loadFiles = (offset) => {
        const accept = this.props.options.accept || "*";
        const path = this.props.rootPath || "/upload";

        this.props.actions.getList(path, accept, offset, this.state.pagesize)
            .then(data => {
                console.log(data)
                this.state.files.splice(offset, this.state.pagesize, ...data.items);
                this.setState({
                    files: this.state.files,
                    offset: offset < this.state.offset ? this.state.offset : offset + data.items.length,
                    total: data.total
                });
            })
            .catch(error => {
                alert(error.error, error.message);
            })

    }

    onScroll = ({ maxScroll, scroll }) => {
        if (Math.round(maxScroll) <= scroll) {
            if (this.state.offset < this.state.total) {
                this.loadFiles(this.state.offset);
            }
        }
    }

    openUploader = () => {
        this.refs.uploader.open();
    }

    handleFileAdded = file => {
        this.setState({ addedFiles: [file, this.state.addedFiles] });
        this.refs.gallery.scrollTo(0, 0);
    }

    handleFileChange = file => {
        let index = this.state.addedFiles.findIndex(item => item.id == file.id);
        this.state.addedFiles[index] = file;
        this.forceUpdate();
    }

    handleUploadSuccess = file => {
        this.state.addedFiles = this.state.addedFiles.filter(item => item.id != file.id);
        this.setState({
            files: [file.attach, ...this.state.files],
            offset: this.state.offset + 1
        });
        if (this.state.selectedIds.length == 0) {
            this.setState({
                selectedIds: [file.attach.id],
                totalSize: file.attach.size
            });
        }
        if (this.props.onUploadSuccess) {
            this.props.onUploadSuccess(file.attach);
        }
    }

    toggleSelected = (file, event) => {
        const { multiple, maxFiles, maxSize, maxTotalSize } = this.props.options;
        let ids = this.state.selectedIds;
        if (multiple) {
            if (ids.contains(file.id)) {
                ids = ids.filter(id => id != file.id);
                this.setState({
                    selectedIds: ids,
                    totalSize: this.state.totalSize - file.size
                });
            } else {
                if (!maxFiles || ids.length < maxFiles) {
                    if (!maxSize || file.size <= maxSize) {
                        if (!maxTotalSize || maxTotalSize >= this.state.totalSize + file.size) {
                            this.setState({
                                selectedIds: [...this.state.selectedIds, file.id],
                                totalSize: this.state.totalSize + file.size
                            });
                        }
                    }
                }
            }
        } else {
            let state = {
                selectedIds: [],
                totalSize: 0
            }
            if (!maxFiles || maxFiles > 0) {
                if (!maxSize || file.size <= maxSize) {
                    if (!maxTotalSize || file.size <= maxTotalSize) {
                        state = {
                            selectedIds: [file.id],
                            totalSize: file.size
                        };
                    }
                }
            }
            this.setState(state);
        }
        this.setState({ currentItem: file })
    }

    removeSelected = file => {
        this.setState({
            selectedIds: this.state.selectedIds.filter(id => id != file.id),
            totalSize: this.state.totalSize - file.size
        }, this.handleUpdate);
    }

    removeAllSelected = () => {
        this.setState({
            selectedIds: [],
            totalSize: 0
        });
    }

    deleteSelected = () => {
        confirm(__('Bạn có chắc chắn muốn xóa files được chọn không?')).then(ok => {
            if (ok) {
                this.state.selectedIds.forEach(id => {
                    this.props.actions.remove(id)
                        .catch(error => {
                            alert(error.error, error.message);
                        })
                        .then(() => {
                            this.state.selectedIds = this.state.selectedIds.filter(ii => ii !== id);
                            this.state.files = this.state.files.filter(item => item.id != id);
                            this.state.offset -= 1;
                            this.forceUpdate();
                        })
                    if (this.props.onRemoveFile) {
                        this.props.onRemoveFile(id)
                    }
                })
            }
        })

    }


    handleUpdate = () => {
        if (this.props.onInsert) {
            const ids = this.state.selectedIds;
            const files = this.state.files.filter(item => ids.contains(item.id));
            this.props.onInsert(files);
        }
    }

    render() {

        const {
            show, title, insertButtonText, closeButtonText, uploadButtonText, deleteButtonText,
            uploadable, editable, onRequestClose, selectedFiles, showSelectedFiles, disabled,
            disabledInsert,
        } = this.props;

        const { deleteable, uploadOptions, rootPath, accept, minSize, maxSize } = this.props;

        const { maxFiles, maxTotalSize, multiple, ...options } = this.props.options;

        const { currentItem, selectedIds } = this.state;

        const buttons = selectedIds.length > 0 && deleteable ?
            [
                <Button text={uploadButtonText} onClick={this.openUploader} icon="upload" />,
                <Button text={deleteButtonText} onClick={this.deleteSelected} icon="delete" type="danger" />,
                <Button text={__('Remove selected all')} onClick={this.removeAllSelected} icon="close" type="secondary" />,
                <div className="mr-auto">
                    {selectedIds.length}/{!multiple ? 1 : maxFiles >= 0 ? maxFiles :
                        <sub style={{ fontSize: 20, bottom: -3 }}>∞</sub>} |&nbsp;
                    {this.formatSize(this.state.totalSize)}/{maxTotalSize ? this.formatSize(maxTotalSize) :
                        <sub style={{ fontSize: 20, bottom: -3 }}>∞</sub>}
                </div>,
                <Button disabled={disabledInsert} text={insertButtonText} onClick={this.handleUpdate} />,
                <Button text={closeButtonText} type='secondary' onClick={onRequestClose} />
            ] :
            [
                <Button text={uploadButtonText} onClick={this.openUploader} className="mr-auto" icon="upload" />,
                <Button disabled={disabledInsert} text={insertButtonText} onClick={this.handleUpdate} />,
                <Button text={closeButtonText} type='secondary' onClick={onRequestClose} />
            ];

        return (
            <React.Fragment>
                {
                    showSelectedFiles && selectedFiles && <div>
                        {
                             
                            selectedFiles.map(item => {
                         
                                return (
                                    <div style={styles.item} key={item.id}>
                                        {
                                            item.thumbnail ?
                                                <img style={styles.thumbnail} src={this.fullUrl(item.thumbnail)} /> :
                                                item.type.indexOf('image') == 0 ?
                                                    <img style={styles.thumbnail} src={this.fullUrl(item.url)} /> :
                                                    <img style={styles.thumbnail}
                                                        src={this.getDefaultThumbnail(item.extension)} />
                                        }
                                        <div style={styles.finfo}>
                                            <div className="mr-auto">
                                                <a href={this.fullUrl(item.url, item.size < 5242880, item.extension)}
                                                    target="_blank">{item.title}</a>
                                                <div
                                                    style={styles.meta}>{item.extension.toUpperCase()} | {this.formatSize(item.size)}</div>
                                            </div>
                                            <div className="align-self-center">
                                                {
                                                    this.props.onInsert &&
                                                    <Icon style={styles.remove} name="close"
                                                        onClick={() => this.removeSelected(item)} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <Modal
                    show={show}
                    size="full"
                    title={title}
                    onRequestClose={onRequestClose}
                    style={{ height: '90%' }}
                    contentStyle={{ height: '100%' }}
                    bodyStyle={{ 'display': 'flex', flexDirection: 'column' }}
                    buttons={buttons}>

                    <Upload
                        ref="uploader"
                        clickable={false}
                        style={{ ...styles.tabContent }}
                        showList={false}
                        onFileAdded={this.handleFileAdded}
                        onUploadSuccess={this.handleUploadSuccess}
                        onUploadError={this.handleFileChange}
                        onUploadProgress={this.handleFileChange}
                        options={options}
                        uploadOptions={{
                            path: rootPath,
                            ...uploadOptions,
                            insertDb: true,
                            overwrite: false,
                            createThumbnail: true
                        }}>

                        <div className="col-md-9 col-sm-12" style={{ padding: '15px 0 15px 15px' }}>
                            <div className="scrollbar-inner" ref="gallery" style={styles.gallery}>
                                {
                                    this.state.addedFiles.map(item => {
                                        if (item.file) {
                                            if (item.error) {
                                                return (
                                                    <div style={styles.fileWrap} key={item.id}>
                                                        <div style={{ ...styles.file, ...styles.fileError }}
                                                            key={item.id}>
                                                            <span style={styles.thumbDefault}>{item.error}</span>
                                                            <div style={styles.fileName}>{item.file.name}</div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div style={styles.fileWrap} key={item.id}>
                                                    <div style={styles.file}>
                                                        <Progress bars={{ value: item.progress }}
                                                            style={styles.progress} />
                                                        <div style={styles.fileName}>{item.file.name}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                                {
                                    this.state.files.map(item => {
                                        let selected = this.state.selectedIds.contains(item.id);
                                        let wrapStyle = selected ? { ...styles.fileWrap, ...styles.fileWrapSelected } : styles.fileWrap;
                                        return (
                                            <div style={wrapStyle} key={item.id}
                                                onClick={(e) => this.toggleSelected(item, e)}>
                                                {
                                                    item.type.indexOf('image') == 0 ?
                                                        (
                                                            <div style={styles.file}>
                                                                {
                                                                    item.thumbnail ?
                                                                        <img style={styles.thumb}
                                                                            src={this.fullUrl(item.thumbnail)} /> :
                                                                        <img style={styles.thumb}
                                                                            src={this.fullUrl(item.url)} />
                                                                }
                                                            </div>
                                                        ) :
                                                        (
                                                            <div style={styles.file}>
                                                                <img style={styles.thumbDefault}
                                                                    src={this.getDefaultThumbnail(item.extension)} />
                                                                <div style={styles.fileName}>{item.title}</div>
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        )
                                    })

                                }
                            </div>
                        </div>
                        <div className="col-md-3 d-none d-md-block" style={styles.infoWrap}>
                            <div className="scrollbar-inner" ref="info" style={styles.info}>
                                {
                                    currentItem && (
                                        <div>
                                            {
                                                currentItem.type.indexOf('image') == 0 ?
                                                    <img style={styles.infoThumb}
                                                        src={this.fullUrl(currentItem.url)} /> :
                                                    <img style={styles.thumbDefault}
                                                        src={this.getDefaultThumbnail(currentItem.extension)} />
                                            }
                                            <h5 style={styles.infoTitle}>{currentItem.title}</h5>
                                            <div
                                                style={styles.meta}>{currentItem.extension.toUpperCase()} | {this.formatSize(currentItem.size)}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </Upload>
                </Modal>
            </React.Fragment>
        )
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

}

FileManager.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool, // hiện thị

    selectedFiles: PropTypes.array, //danh sách file đang được chọn
    showSelectedFiles: PropTypes.bool,//hiện thị danh sách file đang được chọn

    insertButtonText: PropTypes.string,
    closeButtonText: PropTypes.string,
    uploadButtonText: PropTypes.string,
    deleteButtonText: PropTypes.string,

    onRequestClose: PropTypes.func, // khi đóng modal
    onInsert: PropTypes.func, // khi file được chọn

    uploadable: PropTypes.bool, // cho phép upload
    deleteable: PropTypes.bool, // cho phép xóa
    editable: PropTypes.bool, // cho phép sửa (tên),

    rootPath: PropTypes.string, // thư mục gốc chứa file và thư mục con

    // dropzone options
    options: PropTypes.shape({
        multiple: PropTypes.bool, // cho phép chọn nhiều file một lúc
        accept: PropTypes.string, // bộ lọc file https://www.w3schools.com/tags/att_input_accept.asp
        maxSize: PropTypes.number, // dung lượng tối đa một file (bytes)
        minSize: PropTypes.number, // dung lượng tối thiểu một file (bytes)
        maxTotalSize: PropTypes.number, // dung lượng tối đa toàn bộ file
        maxFiles: PropTypes.number, // số lượng file tối đa được chọn
    }).isRequired,

    //upload options
    uploadOptions: PropTypes.shape({
        thumbnailWidth: PropTypes.number, //chiều rộng thumbnail
        thumbnailHeight: PropTypes.number, //chiều cao thumbnail,
        path: PropTypes.string, //thư mục con của rootPath
        imageWidth: PropTypes.number, // resize chiều rộng hình ảnh
        imageHeight: PropTypes.number, // resize chiều cao hình ảnh
        imageQuality: PropTypes.number, // chất lượng ảnh (1->100), ko truyền sẽ lấy mạc định trong appsettings
        resizeMode: PropTypes.oneOf(['cover', 'contain', 'strech']), // chế độ resize ảnh
        optimize: PropTypes.bool //Tối ưu dung lượng file hình ảnh khi không thiết lập kích thước
    }),
}

FileManager.defaultProps = {
    insertButtonText: __U('Chèn file'),
    closeButtonText: __U('Đóng'),
    uploadButtonText: __('Upload file...'),
    deleteButtonText: __('Xóa files được chọn'),
    uploadable: true,
    deleteable: true,
    editable: true,
    options: {},
    uploadOptions: {}
}

export default connect(FileManager, null, actions);
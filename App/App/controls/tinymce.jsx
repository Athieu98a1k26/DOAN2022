import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FileManager from './filemanager';
import request from '../lib/request';

var count = 0;

export default class Tinymce extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inited: false,
            showImageManager: false
        }

        this.name = "tinymce-editor-" + ++count;

        this.config = {
            plugins: 'preview paste autolink code fullscreen image link media table hr pagebreak nonbreaking anchor lists imagetools textpattern noneditable emoticons print ',
            //toolbar_sticky: true,
            menubar: false,
            toolbar1: "bold italic strikethrough underline bullist numlist alignleft aligncenter alignright alignjustify link unlink outdent indent table image print preview code fullscreen",
            toolbar2: "formatselect fontselect fontsizeselect forecolor backcolor",
            entities: "38,amp,60,lt,62,gt",
            entity_encoding: "raw",
            statusbar: false,
            height: 350,
            paste_data_images: true,
            paste_auto_cleanup_on_paste: true,
            language_url: "//olli-suutari.github.io/tinyMCE-4-translations/vi_VN.js",
            file_picker_callback: (props.uploadPath || props.imagePath) ? (callback, value, meta) => {
                if (meta.filetype == 'image') {
                    this.openImageManager(value, callback);
                }
                else if (meta.filetype == 'file') {
                    this.openFileManager(value, callback);
                }
            } : null,
            rsupload: true,
            resize: true,
            ...this.props.config,
            selector: '#' + this.name,
            relative_urls: false,
            remove_script_host: false,
            convert_urls: true,
            document_base_url: request.host
        };

        this.value = this.props.value || "";
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnMount() {
        this.remove();
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (props.value != null && props.value != this.value) {
            this.setContent(props.value);
        }
    }

    init = () => {
        if (tinymce) {
            if (this.inited) {
                this.remove();
            }

            if (this.props.syntaxs && this.props.syntaxs.length > 0) {
                this.config.toolbar2 += " | syntaxsButton";
            }

            this.config.setup = (editor) => {
                editor.on('change', (e) => {
                    this.handleEvent('change', editor, e);
                });

                editor.on('keypress', (e) => {
                    this.handleEvent('keypress', editor, e);
                });

                editor.on('init', () => {
                    editor.setContent(this.props.value || "");
                });

                editor.on('fullscreenstatechanged', function ({ state }) {
                    if (state) {
                        document.body.className = document.body.className.replace('modal-open', 'modal-open-x');
                    }
                    else {
                        document.body.className = document.body.className.replace('modal-open-x', 'modal-open');
                    }
                });

                if (this.props.syntaxs && this.props.syntaxs.length > 0) {

                    editor.ui.registry.addMenuButton('syntaxsButton', {
                        text: __('Chèn dữ liệu động'),
                        fetch: callback => callback(this.getSyntaxMenu(this.props.syntaxs))
                    });
                }

                this.editor = editor;
            }

            tinymce.init(this.config);

            this.inited = true;
        }
    }

    getSyntaxMenu = (items) => {
        var menu = [];
        if (items) {
            items.forEach(item => {
                var obj = {
                    text: item.label
                };
                if (item.items) {
                    obj.type = 'nestedmenuitem';
                    obj.getSubmenuItems = () => this.getSyntaxMenu(item.items);
                }
                else if (item.value) {
                    obj.type = 'menuitem';
                    obj.onAction = () => this.editor.insertContent(item.value)
                }
                if (item.label) {
                    menu.push(obj);
                }
            })
        }
        return menu;
    }

    validate = () => {
        const { required, requiredMessage, onValidate } = this.props;

        let error = null, msgType = 'danger';

        if (required && this.value == "") {
            error = requiredMessage;
        }

        if (onValidate) {
            onValidate(!!error);
        }

        if (error) {
            this.setState({ error, msgType });
            return false;
        }
        else {
            this.setState({ error: null });
            return true;
        }
    }

    handleEvent = (name, editor, event) => {
        if (name == "change") {
            if (this.props.onChange) {
                this.value = editor.getContent();

                if (this.props.autoValidate) {
                    this.validate();
                }

                this.props.onChange(this.value);
            }
        }
        else if (name == 'keypress') {
            if (this.props.onKeyPress) {
                this.value = editor.getContent();
                this.props.onKeyPress(this.value);
            }
        }
    }

    remove = () => {
        if (this.inited) {
            this.editor.remove();
            this.inited = false;
        }
    }

    openImageManager = (field_name) => {
        this.editor.windowManager.close();
        this.setState({ showImageManager: true, fieldName: field_name });
    }

    openFileManager = (field_name) => {
        console.log(this.editor.windowManager.getWindows())
        this.editor.windowManager.close();
        this.setState({ showFileManager: true, fieldName: field_name });
    }

    insertImage = files => {
        files.forEach(item => {
            this.editor.insertContent(`<img alt="${item.title}" src="${request.url(item.url)}" style="max-width:100%"/>`);
        });
        this.setState({ showImageManager: false });
    }

    insertFile = files => {
        let content = this.editor.selection.getContent() || files[0].title;
        this.editor.insertContent(`<a href="${request.url(files[0].url)}">${content}</a>`);
        //this.editor.execCommand("mceLink");
        this.setState({ showFileManager: false });
    }

    setContent = content => {
        this.editor.setContent(content);
        this.value = content;
        if (this.props.autoValidate) {
            this.validate();
        }
        if (this.props.onChange) {
            this.props.onChange(this.value);
        }
    }

    render() {
        const { label, column, className, required } = this.props;

        const labelClass = classNames(
            'form-control--label',
            column ? `col-md-${12 - column} col-form-label` : null
        )

        const wrapClasses = classNames(className, {
            'form-group': label,
            'form-group-default': true,
            [`has-${this.state.msgType}`]: this.state.error
        });

        const wrapControlClasses = classNames(
            'wrap-form-control',
            column ? `col-md-${column}` : null,
        )

        const mceClasses = classNames('rs-tinymce', {
            invalid: this.state.error
        })

        return (
            <div className={wrapClasses}>
                {
                    label && (
                        <label className={labelClass}>{label}
                            {required && <small className="text-danger required-icon">(*)</small>}
                        </label>
                    )
                }
                <div className={wrapControlClasses}>
                    <div className={mceClasses} id={this.name + '-wrapper'}>
                        <textarea name={this.name} className="rs-tinymce-textarea" id={this.name} />
                    </div>
                    {
                        this.state.error && (
                            <small className="invalid-feedback d-block">{this.state.error}</small>
                        )
                    }
                </div>
                {
                    (this.props.uploadPath || this.props.imagePath) && (
                        <React.Fragment>
                            <FileManager
                                show={this.state.showImageManager}
                                onRequestClose={() => this.setState({ showImageManager: false })}
                                rootPath={this.props.imagePath}
                                options={{
                                    multiple: false,
                                    accept: "image/*",
                                }}
                                uploadOptions={{
                                    path: this.props.uploadPath || this.props.imagePath
                                }}
                                onInsert={files => this.insertImage(files)}
                                title={__U('Hình ảnh')} />

                            <FileManager
                                show={this.state.showFileManager}
                                onRequestClose={() => this.setState({ showFileManager: false })}
                                rootPath={this.props.imagePath}
                                options={{
                                    multiple: false
                                }}
                                uploadOptions={{
                                    path: this.props.uploadPath || this.props.imagePath
                                }}
                                onInsert={files => this.insertFile(files)}
                                insertButtonText={__U('Chèn liên kết')}
                                title={__U('File')} />
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

Tinymce.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    config: PropTypes.object,
    label: PropTypes.string,
    column: PropTypes.number,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    autoValidate: PropTypes.bool,
    onValidate: PropTypes.func,
    syntaxs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        group: PropTypes.string // nhóm, vd: customer, general, contract...
    })),
    imagePath: PropTypes.string, //thư mực chứa hình ảnh dùng để chèn vào nội dung
}

Tinymce.defaultProps = {
    autoValidate: true,
    requiredMessage: __('Trường này là bắt buộc'),
}
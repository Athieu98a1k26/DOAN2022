import App from '../../start';
import { filter } from 'lodash';
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Avatar from '../../controls/UserAvatar';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
const styles = {
    iconButton: {
        width: 130,
        height: 130
    },
    file: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: -20,
        opacity: 0,
        cursor: 'pointer',
        zIndex: 4000
    },
    loading: {
        position: 'absolute',
        top: 45,
        left: 45
    }
}

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    onUploadChange = (e) => {
        let allow = /(png|jpeg|jpg|gif)$/i;
        let file = e.target.files && e.target.files[0];
        if (file && file.type.match(allow)) {
            this.setState({ loading: true });
            this.props.upload(this.props.user.id, file).then(data => {
                this.setState({ loading: false });
                if (data.error) {
                    App.showMessage(data.messag || data.error);
                }
            });
        }
    }

    render() {
        const user = this.props.user;
        const profile = this.props.user;
        return (
            <IconButton style={styles.iconButton}
                tooltip="Click to edit"
                tooltipPosition="bottom-right"
                tooltipStyles={{ marginTop: 70, marginLeft: 20 }}>
                <div>
                    <Avatar avatar={profile.avatar} name={profile.fullName} size={100} />
                    <input type="file" onChange={this.onUploadChange} style={styles.file} accept="image/*" title=" " />
                    {
                        this.state.loading && <CircularProgress style={styles.loading} color="rgb(156, 39, 176)" />
                    }
                </div>
            </IconButton>
        );
    }
}
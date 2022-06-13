import moment from "moment";
import React, { Component } from "react";
import Card from "../../controls/card2";
import Header from "../../controls/pageheader";
import Icon from "../../controls/icon";
import Button from "../../controls/button";
import Upload from "../../controls/upload";
import Progress from "../../controls/progress";

import { connect } from "../../lib/connect";
import * as actions from "../../actions/account";

import ChangePassword from "./change-password";
import EditProfile from "./edit";

import { Route, Link, Switch } from "react-router-dom";

const defaultAvatar = require("../../asset/img/avatar.png");

const styles = {
  button: {
    margin: "10px 10px 0 0",
  },
};

class AccountPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      uploading: false,
      progress: 0,
    };
  }

  componentWillMount() {
    console.log("profile init");
  }

  handleUploadSuccess = (file) => {
    console.log(file);
    this.props.actions
      .updateAvatar(this.context.user.id, file.attach.url)
      .then((data) => {
        this.setState({ uploading: false, progress: 0 });
      })
      .catch(() => {
        this.handleUploadError(file);
      });
  };

  handleUploadError = (file) => {
    this.setState({ uploading: false, progress: 0 });
    alert("Upload image profile err, please try again");
  };

  render() {
    const profile = this.context.user;

    if (!profile) return null;

    const avatar = profile.avatar
      ? this.context.request.url(profile.avatar)
      : defaultAvatar;
    const uploadOptions = {
      options: {
        multiple: false,
        accept: "image/*",
      },
      uploadOptions: {
        path: "/avatar",
        insertDb: false,
        overwrite: true,
        createThumbnail: false,
        imageWidth: 200,
        imageHeight: 200,
        changeNameTo: "user-" + profile.id + "-" + moment().format("hhmmss"),
      },
    };

    return (
      <div className="row justify-content-center">
        <div className="col col-md-8">
          <Header
            title={profile.fullName}
            content={profile.roles.map((r) => r.positionName).join(", ")}
          />
          <Card className="profile" noBodyWrap>
            <div className="profile__img" style={{ width: 200 }}>
              <img src={avatar} alt="" />
              <Upload
                {...uploadOptions}
                onUploadStart={() => this.setState({ uploading: true })}
                onUploadProgress={({ progress }) => this.setState({ progress })}
                onUploadSuccess={this.handleUploadSuccess}
                onUploadError={this.handleUploadError}
                showList={false}
              >
                <Icon name="camera" className="profile__img__edit" />
              </Upload>
              {this.state.uploading && (
                <Progress bars={{ value: this.state.progress }} />
              )}
            </div>

            <div className="profile__info">
              <p>{profile.description}</p>

              <ul className="icon-list">
                <li>
                  <Icon name="phone" />{" "}
                  {profile.phone || "Chưa thêm điện thoại"}
                </li>
                <li>
                  <Icon name="email" /> {profile.email || "Chưa thêm email"}
                </li>
                <li>
                  <Icon name="male-female" />{" "}
                  {getEnumLabel(profile.gender, this.props.gender) ||
                    "Chưa thêm giới tính"}
                </li>
                <li>
                  <Icon name="calendar" />{" "}
                  {profile.birthdate
                    ? moment(profile.birthdate).format("DD-MM-YYYY")
                    : "Chưa thêm ngày sinh"}
                </li>
              </ul>

              <Button
                text="Update account"
                style={styles.button}
                href="/account/edit"
                link
              />

              <Button
                text="Đổi mật khẩu"
                style={styles.button}
                href="/account/password"
                link
              />
            </div>
          </Card>
        </div>

        <Switch>
          <Route path="/account/password" element={<ChangePassword />} />
          <Route path="/account/edit" element={<EditProfile />} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  AccountPage,
  (state) => ({
    gender: state.app.enums.gender,
  }),
  actions
);

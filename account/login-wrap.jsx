import React from 'react';

class LoginWrap extends React.PureComponent {
    render() {
        return (
            <div className="login-page">
                {this.props.children}
            </div>
        );
    }
}
export default LoginWrap;
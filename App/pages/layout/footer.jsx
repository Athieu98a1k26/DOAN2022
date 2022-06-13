import React from 'react';
import moment from 'moment';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer hidden-xs-down">
                <p>Copyright &copy; {moment().year()} <a href="https://Rws.vn">Rws</a>. All rights reserved.</p>
            </footer>
        )
    }
}
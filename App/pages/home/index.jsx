import React from 'react';
import { connect } from '../../lib/connect';

class HomePage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return (
            <div>Home</div>
        )
    }

}

export default connect(HomePage)
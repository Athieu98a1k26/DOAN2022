import React, { Component } from 'react';
import Tourist from 'reactour';
const optionsKey = 'tour';

class Tour extends Component {

    disableFeature = () => {
        const tour = _getOptions(optionsKey, {});
        tour[this.props.type] = false;
        _setOptions(optionsKey, tour);
    }

    beforeClose = () => {
        // confirm(__("Đóng bảng hướng dẫn"), __("Không hiện bảng này trong tương lai")).then(ok => {
        //     if (ok && this.props.type) {
        //         this.disableFeature();
        //     }
        // });
    }

    render() {
        const { type, onChange, stepIndex, ...atts } = this.props;
        const tour = _getOptions(optionsKey, {});
        if (tour[type] && tour[type] == false) {
            return null;
        }
        if (onChange) {
            atts.getCurrentStep = onChange;
        }
        if (stepIndex) {
            atts.goToStep = stepIndex;
        }
        return (
            <Tourist
                onBeforeClose={this.beforeClose}
                {...atts}
            />
        );
    }
}

export default Tour;
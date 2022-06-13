import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
// import axios from "axios";
import moment from "moment";

import MultiColor from "highcharts-multicolor-series";
MultiColor(Highcharts);

export default class Chart extends React.Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            start: 0,
            interval: 0
        };
    }
    componentDidMount() {

    }

    render() {
        const config = {
            chart: {
                zoomType: "x",
                type: "column",
                marginTop: 40
            },

            plotOptions: {
                column: {
                    allowPointSelect: false,
                    color: "#d7d7d7",
                    states: {
                        hover: {
                            color: "#d7d7d7"
                        }
                    }
                }
            },

            rangeSelector: {
                enabled: false
            },

            scrollbar: {
                enabled: false
            },

            navigator: {
                enabled: false
            },
            xAxis: {
                showLastLabel: false,
                labels: {
                    style: {
                        color: "#9b9b9b"
                    }
                },
                title: {
                    align: "high",
                    rotation: 0,
                    margin: 10,
                    offset: 8,
                    style: {
                        color: "#767676"
                    }
                },
                crosshair: {
                    color: "#ffe100"
                }
            },
            series: [
                {
                    name: "NEW",
                    data: [
                        { y: 1, color: "#0F0", segmentColor: "red" },
                        { y: 2, color: "#00F", segmentColor: "#00F" },
                        { y: 1, color: "#00F", segmentColor: "red" }
                    ],
                    // pointStart: Date.UTC(2010, 2, 1),
                    // pointInterval: 24 * 3600 * 1000,
                    // tooltip: {
                    //     valueDecimals: 1,
                    //     valueSuffix: "KWH"
                    // },
                    type: "coloredline"
                }
            ]
        };
        return (
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={config}
            />
        );
    }
}

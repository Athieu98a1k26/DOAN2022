import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

import PropTypes from 'prop-types';
const defaultOptions = {
    title: {},
    chart: {
        renderTo: 'container',
        marginTop: 70,
        marginLeft: 40,
        marginRight: 60
    },
    xAxis: {
        categories: []
    },
    // yAxis: {
    //     title: {
    //         text: ''
    //     }
    // },
    yAxis: {
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        gridLineColor: 'transparent',
        labels: {
            enabled: false
        },
        title: {
            text: ''
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true,
                // enabled: false
            }
        }
    },
    series: []
}
class LineChart extends React.PureComponent {

    componentDidMount() {
        this.chart = this.refs.chart.getChart();
    }

    render() {
        const { title, legend, data, config, color, backgroundColor, lineWidth, height, categories } = this.props;
        const options = { ...defaultOptions };
        if (height) {
            options.chart.height = height;
        }
        options.title.text = title;

        options.plotOptions.line.lineWidth = lineWidth;
        options.plotOptions.line.color = color;

        options.xAxis.categories = categories;
        options.series = [
            ...data,
        ];
        options.chart.backgroundColor = backgroundColor;
        options.legend = legend;


        const chartConfig = {
            ...options,
            ...config,
        }
        return (
            <ReactHighcharts ref="chart" config={chartConfig} />
        );
    }
}
LineChart.defaultProps = {
    title: '',
    legend: {
        enabled: true,
        align: 'center',
        layout: 'horizontal',
        verticalAlign: 'bottom',
    },
    config: {},
    lineWidth: 2,
}

LineChart.propTypes = {
    title: PropTypes.string,
    lineWidth: PropTypes.number,
    config: PropTypes.object,
    categories: PropTypes.arrayOf(PropTypes.string),
    legend: PropTypes.shape({
        layout: PropTypes.oneOf(['vertical', 'horizontal']),
        verticalAlign: PropTypes.oneOf(['top', 'bottom', 'middle']),
        enabled: PropTypes.bool,
        align: PropTypes.oneOf(['center', 'left', 'right']),
    }),
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        color: PropTypes.string,
    })).isRequired,
}
export default LineChart;
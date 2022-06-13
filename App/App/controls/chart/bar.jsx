// import React, { Component } from 'react';
// import ReactHighcharts from 'react-highcharts';

// import PropTypes from 'prop-types';
// const defaultOptions = {
//     chart: {
//         type: 'bar'
//     },
//     title: {},
//     xAxis: {
//         categories: [],
//         title: {
//             text: null
//         }
//     },
//     yAxis: {
//         min: 0,
//         title: {
//             text: '',
//             align: 'high'
//         },
//         labels: {
//             overflow: 'justify'
//         }
//     },
//     tooltip: {

//     },
//     plotOptions: {
//         bar: {
//             dataLabels: {
//                 enabled: true
//             }
//         }
//     },
//     legend: {
//         layout: 'vertical',
//         align: 'right',
//         verticalAlign: 'top',
//         x: -40,
//         y: 80,
//         floating: true,
//         borderWidth: 1,
//         backgroundColor: '#FFFFFF',
//         shadow: true
//     },
//     credits: {
//         enabled: false
//     },
//     series: []
// }
// class BarChart extends Component {

//     render() {
//         const { title, legend, data, config, categories } = this.props;
//         const options = { ...defaultOptions };
//         options.title.text = title;

//         options.xAxis.categories = categories;
//         options.series = [
//             ...data,
//         ];
//         options.legend = legend;

//         const chartConfig = {
//             ...config,
//             ...options,
//         }
//         return (
//             <ReactHighcharts config={chartConfig} />
//         );
//     }
// }
// BarChart.defaultProps = {
//     title: '',
//     legend: {
//         enabled: true,
//         align: 'center',
//         layout: 'horizontal',
//         verticalAlign: 'bottom',
//     },
//     config: {},
//     lineWidth: 2,
// }

// BarChart.propTypes = {
//     title: PropTypes.string,
//     config: PropTypes.object,
//     categories: PropTypes.arrayOf(PropTypes.string),
//     legend: PropTypes.shape({
//         layout: PropTypes.oneOf(['vertical', 'horizontal']),
//         verticalAlign: PropTypes.oneOf(['top', 'bottom', 'middle']),
//         enabled: PropTypes.bool,
//         align: PropTypes.oneOf(['center', 'left', 'right']),
//         x: PropTypes.number,
//         y: PropTypes.number,
//         floating: PropTypes.bool,
//         borderWidth: PropTypes.number,
//         backgroundColor: PropTypes.string,
//         shadow: PropTypes.bool
//     }),
//     data: PropTypes.arrayOf(PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         data: PropTypes.arrayOf(PropTypes.number).isRequired,
//         color: PropTypes.string,
//     })).isRequired,
// }
// export default BarChart;
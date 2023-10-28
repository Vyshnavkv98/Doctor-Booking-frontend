import React from "react";
import ReactApexChart from 'react-apexcharts'

const dates=[
  // Sample data (you can replace this with your actual data)
  { x: new Date("2023-01-01").getTime(), y: 100 },
  { x: new Date("2023-01-02").getTime(), y: 120 },
  { x: new Date("2023-01-03").getTime(), y: 110 },
  { x: new Date("2023-01-04").getTime(), y: 130 },
  { x: new Date("2023-01-05").getTime(), y: 130 },
  { x: new Date("2023-01-06").getTime(), y: 100 },
  { x: new Date("2023-01-07").getTime(), y: 130 },
  { x: new Date("2023-01-08").getTime(), y: 170 },
  { x: new Date("2023-01-09").getTime(), y: 100 },
  { x: new Date("2023-01-10").getTime(), y: 130 },
  { x: new Date("2023-01-11").getTime(), y: 110 },
  { x: new Date("2023-01-12").getTime(), y: 130 },
  { x: new Date("2023-01-13").getTime(), y: 100 },
  { x: new Date("2023-01-14").getTime(), y: 130 },
  { x: new Date("2023-01-15").getTime(), y: 130 },
  { x: new Date("2023-01-16").getTime(), y: 100 },
  { x: new Date("2023-01-17").getTime(), y: 130 },
  { x: new Date("2023-01-18").getTime(), y: 120 },
  // Add more data points as needed
]
const datess=[
  // Sample data (you can replace this with your actual data)
  { x: new Date("2023-01-01").getTime(), y: 10 },
  { x: new Date("2023-01-02").getTime(), y: 11 },
  { x: new Date("2023-01-03").getTime(), y: 12 },
  { x: new Date("2023-01-04").getTime(), y: 15 },
  { x: new Date("2023-01-05").getTime(), y: 10 },
  { x: new Date("2023-01-06").getTime(), y: 13 },
  { x: new Date("2023-01-07").getTime(), y: 18 },
  { x: new Date("2023-01-08").getTime(), y: 19 },
  { x: new Date("2023-01-09").getTime(), y: 12 },
  { x: new Date("2023-01-10").getTime(), y: 19 },
  { x: new Date("2023-01-11").getTime(), y: 25 },
  { x: new Date("2023-01-12").getTime(), y: 21 },
  { x: new Date("2023-01-13").getTime(), y: 16 },
  { x: new Date("2023-01-14").getTime(), y: 23 },
  { x: new Date("2023-01-15").getTime(), y: 12 },
  { x: new Date("2023-01-16").getTime(), y: 18 },
  { x: new Date("2023-01-17").getTime(), y: 12 },
  { x: new Date("2023-01-18").getTime(), y: 20 },
  // Add more data points as needed
]

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'online',
          data: dates, // First set of data
        },
        {
          name: 'offline',
          data: datess, // Second set of data
        },
      ],
      options: {
        chart: {
          type: 'area',
          stacked: false,
          height: 300,
          outerWidth:'100%',
          innerWidth:'100%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: 'zoom',
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Stock Price Movement',
          align: 'left',
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            },
          },
          title: {
            text: 'count',
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
      </div>
    );
  }
}

export default ApexChart;
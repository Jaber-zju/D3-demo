import React, {Component} from 'react';
import * as d3 from "d3";
import {observer} from "mobx-react";

@observer
class BarChart_2 extends Component {
  constructor(props) {
    super(props)
    this.chartState = this.props.chartState
  }

  drawChart(data) {
    const padding = this.chartState.padding
    const height = this.chartState.height
    const width = this.chartState.width

    //x轴宽度
    let xAxisWidth = 300;
    //y轴宽度
    let yAxisWidth = 300;

    const xScale = d3.scaleBand()
      .domain(d3.range(0, data.length))
      .range([0, xAxisWidth])

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, yAxisWidth])

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", this.chartState.width)
                  .attr("height", this.chartState.height)
                  .style('padding-left', padding.left)
                  .style('padding-bottom', padding.bottom)

    const bars = svg.selectAll('rect').data(data).enter().append('rect')
    bars.attr("x", (d, i) => padding.left + xScale(i))
        .attr('y', (d, i) => this.chartState.height - padding.bottom - yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', (d, i) => yScale(d))
        .attr('fill', 'green')
        .on('mouseover', function(d, i) {
          d3.select(this).style('fill', 'orange')
          let xPosition = parseFloat(d3.select(this).attr("x")) + (width/data.length) / 2;
          let yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;

          d3.select('#tooltip')
            .style('left', xPosition+'px')
            .style('top', yPosition+'px')
            .classed('hidden', false)

          d3.select('#value')
            .text(d)
        })
        .on('mouseout', function () {
          d3.select(this).style('fill', 'green')
          d3.select('#tooltip').classed('hidden', true)
        })

    const text = svg.selectAll('text').data(data).enter().append('text')
    text.text((d, i) => d)
        .attr('fill', 'blue')
        .attr("font-size", 12)
        .attr("text-anchor","middle")
        .attr('x', (d, i) => padding.left + xScale(i) + 15)
        .attr('y', (d, i) => this.chartState.height - padding.bottom - yScale(d) - 5)


    const xAxis = d3.axisBottom(xScale)
    svg.append("g")
      .attr("transform",(d, i) => "translate(" + padding.left + "," + (this.chartState.height - padding.bottom) + ")")
      .call(xAxis)

    yScale.range([yAxisWidth, 0])
    const yAxis = d3.axisLeft(yScale)

    svg.append("g")
      .attr("transform","translate(" + (padding.left) + "," + (height - padding.bottom - yAxisWidth) + ")")
      .call(yAxis)
  }

  timer = () => {
    setInterval(() => {
      d3.select("svg").remove()
      this.drawChart(this.props.chartState.dataSet)
      this.props.chartState.changeData()
    }, 3000)
  }

  componentDidMount() {
    this.timer()
  }
  render() {
    return (
      <div id="tooltip" className="hidden">
        <p><strong>Important Label Heading</strong></p>
        <p><span id="value"></span></p>
      </div>
    )
  }
}

export default BarChart_2

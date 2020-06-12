import React from 'react';
import * as d3 from 'd3'
export default class BarChart extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      dataset: [ 5, 10, 15, 20, 25, 30, 35],
      count: 0,
      width: 400,
      height: 200,

    }
  }
  drawBar = () => {
    // const xScale = d3.scaleLinear()
    //   .domain([0, d3.max(this.state.dataset)])
    //   .range([0, 500]);

    let svg = d3.select("#box1")
      .append("svg")
      .attr("width", this.state.width)
      .attr("height", this.state.height)

    let bars = svg.selectAll('rect')
      .data(this.state.dataset)
      .enter()
      .append('rect')

    bars.attr("x", (d, i) => i * 40 + 40)
      .attr('y', d => this.state.height - d * 4)
      .attr('width', 30)
      .attr("height", d => d * 4)
      .attr('fill','green')
      .on("mouseover",function(d,i){
        d3.select(this)
          .transition()
          .duration(1000)
          .style("fill","red");
      })
      .on("mouseout",function(d,i){
        d3.select(this)
          .transition()
          .duration(1000)
          .style("fill","green");
      })
      // .transition()
      // .duration(1000)
      // .delay(function(d,i){
      //   return 50*i;
      // })
      // .attr('fill', 'blue')

    //加标签
    svg.selectAll('text')
      .data(this.state.dataset)
      .enter()
      .append('text')
      .text(d => d)
      .attr("x", (d,i) => i * 40 + 50)
      .attr("y",d => this.state.height-(d*4) - 6)
      .attr('font-family','sans-serif')
      .attr('font-size','11px')
      .attr('fill','blue')
  }

  drawAxis = () => {
    console.log('axis')
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(this.state.dataset)])
      .range([0, 500]);

    let axis = d3.axisLeft(xScale)

    d3.select("#box1").append("svg")
      .attr("width", 1440)
      .attr("height", 30)
      .append("g")
      .attr("transform", 'translate(' + this.state.width/10 + ',' + this.state.height/10 + ')')
      .call(axis);
  }

  componentDidMount() {
    this.drawAxis()
    this.drawBar()

  }


  render() {

    return (
      <div id='box1'>
      </div>
    )
  }
}


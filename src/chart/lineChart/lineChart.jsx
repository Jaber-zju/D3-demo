import React,{Component} from "react";
import * as d3 from 'd3'
import './lineChart.css'

class LineChart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawLine (data) {
    const padding = this.data.padding
    const width = this.data.width
    const pieHeight = this.data.pieHeight
    const radius = this.data.radius

    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", pieHeight)
      .style('padding-left', padding.left)
      .style('padding-top', padding.top)

    // 比例尺
    let xScale = d3.scaleBand()
                    .domain(['1月', '2月', '3月', '4月', '5月', '6月'])
                    .range([0, width - padding.left - padding.right])
    let yScale = d3.scaleLinear()
                    .domain([d3.min(data), d3.max(data)])
                    .range([pieHeight - padding.top - padding.bottom, 0]) // 值域取反

    let xAxis = d3.axisBottom()
                  .scale(xScale)
    let yAxis = d3.axisLeft(yScale)

    // 添加x轴
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding.left + ',' + (pieHeight - padding.bottom) + ')')
      .call(xAxis)

    // 添加y轴
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
      .call(yAxis)

    // 设置折线
    let line = d3.line()
      .x(function (d, i) {
        return padding.left + (width - padding.left - padding.right) / data.length * (i + 0.5)
      })
      .y(function (d, i) {
        return yScale(d)
      })
      .curve(d3.curveBasis)

    // 绘制折现路径
    svg.append('path')
      .attr('d', line(data))
      .attr('stroke', 'red')
      .attr('stroke-width', '4px')
      .attr('fill', 'none')  // 设置折线与直线之间区域的填充颜色
      .attr('class', 'line') // 添加动画

  }

  // 这里必须是箭头函数，不能是function声明，否则不能正确绑定this的指向
  changeData = () => {
    this.props.chartState.changeLineData()
    d3.select("svg").remove()
    this.drawLine(this.data.lineData)
  }

  componentDidMount() {
    this.drawLine(this.data.lineData)
  }

  render() {
    return <div><button onClick={this.changeData}>change data</button></div>
  }

}

export default LineChart
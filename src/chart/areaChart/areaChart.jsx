import React,{Component} from "react";
import * as d3 from 'd3'
import './areaChart.css'

class AreaChart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawArea (data) {
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

    // 颜色渐变
    let defs = svg.append('defs')
    let linearGradient = defs.append('linearGradient')
      .attr('id', 'linearColor')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '0%')
      .attr('y2', '100%')
    let a = d3.rgb(235, 0, 233)
    let b = d3.rgb(133, 0, 187)
    linearGradient.append('stop')
      .attr('offset', '0%')
      .style('stop-color', 'white')
      .transition().duration(2000)
      .style('stop-color', a.toString())
    linearGradient.append('stop')
      .style('stop-color', 'white')
      .transition().duration(2000)
      .attr('offset', '100%')
      .style('stop-color', b.toString())

    // 设置区域
    let area = d3.area()
      .x(function (d, i) { return padding.left + (width - padding.left - padding.right) / data.length * (i + 0.5) })
      .y(function (d, i) { return pieHeight - padding.bottom })
      .y1(function (d, i) { return yScale(d) })
      .curve(d3.curveBasis)

    // 绘制区域图
    svg.append('path')
      .attr('d', area(data))
      .style('fill', 'url(#' + linearGradient.attr('id') + ')')
  }

  // 这里必须是箭头函数，不能是function声明，否则不能正确绑定this的指向
  changeData = () => {
    this.props.chartState.changeAreaData()
    d3.select("svg").remove()
    this.drawArea(this.data.areaData)
  }

  componentDidMount() {
    this.drawArea(this.data.areaData)
  }

  render() {
    return <div><button onClick={this.changeData}>change data</button></div>
  }

}

export default AreaChart
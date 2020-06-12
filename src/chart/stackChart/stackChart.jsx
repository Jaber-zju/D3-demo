import React,{Component} from "react";
import * as d3 from 'd3'
import {toJS} from "mobx";

class StackChart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawStack (data) {
    const padding = this.data.padding
    const width = this.data.width
    const pieHeight = this.data.pieHeight

    const margin = 10

    const stack = d3.stack()
      .keys(["apples", "bananas", "cherries", "dates"])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackData = stack(data)
    console.log(stackData)

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", pieHeight)
      .style('padding-left', padding.left)
      .style('padding-top', padding.top)

    // x比例尺
    let xScale = d3.scaleBand()
      .range([0, width - padding.left - padding.right])

    // x值域，其实就是月份
    xScale.domain(data.map(d => d.month))

    let yScale = d3.scaleLinear()
      .range([pieHeight - padding.top - padding.bottom, 0])
    // y值域，求的是转化后的数组的最后一个数组中的各个分数组中第二个元素的最大值，绕的我都有点晕，最大值怎么求可以自己写function
    yScale.domain([0, d3.max(stackData[stackData.length - 1], (item) => item[1])])

    // x轴和y轴
    let xAxis = d3.axisBottom().scale(xScale)
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

    // 将二维数组的第一维剥离，打散成n列
    let rectContainer = svg.selectAll('rectContainer')
      .data(stackData)
      .enter()
      .append('g')
      .attr('class', 'rectContainer')
      .attr('fill', (d, i) => { return color(i) })

    // 渲染每一列
    rectContainer.selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => { return xScale(d.data.month) + padding.left + margin / 2 })
      .attr('y', (d) => { return yScale(d[1]) + padding.top })
      .attr('width', (d) => { return xScale.bandwidth() - margin })
      .attr('height', (d) => { return pieHeight - padding.top - padding.bottom - yScale(d[1] - d[0]) })
      .attr('stroke', '#ccc')

    // 添加图例圆圈
    svg.selectAll('circle')
      .data(['apples', 'bananas', 'cherries', 'oranges'])
      .enter()
      .append('g')
      .append('circle')
      .attr('cx', (d) => { return width - padding.right - 80 })
      .attr('cy', (d, i) => { return padding.top + 25 * i })
      .attr('r', '6')
      .attr('fill', (d, i) => { return color(i) })

    // 添加图例文字
    let texts = svg.selectAll('textContainer')
      .data(['apples', 'bananas', 'cherries', 'oranges'])
      .enter()
      .append('g')
      .attr('class', 'textContainer')
    texts.append('text')
      .attr('x', (d) => { return width - padding.right - 60 })
      .attr('y', (d, i) => { return padding.top + 25 * i })
      .attr('dy', '0.32em')
      .text((d) => d)
      .attr('fill', (d, i) => color(i))

  }

  componentDidMount() {
    this.drawStack(this.data.stackData)
  }

  render() {
    return <div></div>
  }

}

export default StackChart
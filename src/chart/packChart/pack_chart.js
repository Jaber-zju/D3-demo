import React,{Component} from "react";
import * as d3 from 'd3'

class Pack_chart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawPack (data) {
    const padding = this.data.padding
    const width = this.data.width
    const pieHeight = this.data.pieHeight

    const svg = d3.select("body")
      .append("svg")
      .attr("width", this.data.width)
      .attr("height", this.data.pieHeight)
      .style('padding-left', padding.left)
      .style('padding-top', padding.top)

    // 生成颜色，随机
    const color = d3.scaleSequential(d3.interpolateMagma)
      .domain([-4, 4])
    // const color = d3.schemeSet2

    // 打包生成器，设置大小的各个节点的内边距
    const pack = d3.pack()
      .size([width - 10, pieHeight - 10])
      .padding(10)

    // 将给定的有层次结构的数据转成符合绘图要求的数组
    const root = d3.hierarchy(data)
      // 这一步对于treeMap非常重要，必不可少，在这里是可以省略的
      .sum(function (d) { return d.value })  // 每个节点的value都是自身和所有后代节点的value之和
      .sort(function (a, b) { return b.value - a.value }) // 降序
    let nodes = pack(root).descendants()

    // 画圆
    svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .style('fill', function (d) { return color(d.depth) })
      // .style('fill', function (d) { return color[d.depth] })
      .attr('cx', function (d) { return d.x })
      .attr('cy', function (d) { return d.y })
      .attr('r', function (d) { return d.r })
      .on('mouseover', function (d) {
        d3.event.target.style.stroke = 'yellow'
        // d3.select(this).style('stroke', 'white')
        d3.event.target.style.strokeWidth = '2px'
        svg.append('text')
          .style('fill', 'black')
          .style('opacity', '0.5')
          .attr('class', 'hello')
          .attr('x', d3.event.offsetX + 20)
          .attr('y', d3.event.offsetY - 10)
          .text(d.data.name)
      })
      .on('mouseout', function (d) {
        svg.selectAll('.hello').remove()
        d3.event.target.style.strokeWidth = '0px'
      })

    // 文字
    svg.selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .style('fill', 'black')
      .style('fill-opacity', function (d) { return d.children ? 0 : 1 }) // 设置包含子节点的文字不显示
      .attr('x', function (d) { return d.x })
      .attr('y', function (d) { return d.y })
      .attr('dy', '.3em')
      .attr('dx', function (d) { return '-' + d.data.name.length / 2 + 'em' }) // 设置文字居中，通过dx 负文字个数的二分之一
      .text(function (d) { return d.data.name })
      .style('font-size', function (d) { return 12 - d.depth + 'px' })


  }

  componentDidMount() {
    this.drawPack(this.data.packData)
  }

  render() {
    return <div></div>
  }

}

export default Pack_chart
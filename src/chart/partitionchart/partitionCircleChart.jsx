import React,{Component} from "react";
import * as d3 from 'd3'

class PartitionCircleChart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawPartition (data) {
    const padding = this.data.padding
    const width = this.data.width
    const pieHeight = this.data.pieHeight
    const radius = this.data.radius

    // 初始化树状图数据获取器
    const partition = d3.partition()
                        .size([2 * Math.PI, radius * radius])

    // 初始化json数据转成一棵树，这个步骤是非常必要的！！
    // 将给定的有层次结构的数据转成符合绘图要求的数组
    const root = d3.hierarchy(data)
      // 分区图中不能sum
      // .sum(function (d) { return d.value })  // 每个节点的value都是自身和所有后代节点的value之和

    // 初始化分区图
    let partitionData = partition(root)
    console.log(partitionData)
    // 获取分区
    let block = partitionData.descendants()

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const svg = d3.select("body")
      .append("svg")
      .attr("width", this.data.width)
      .attr("height", this.data.pieHeight)
      .style('padding-left', padding.left)
      .style('padding-top', padding.top)

    // 创建弧生成器
    const arc = d3.arc()
                  .innerRadius(function (d) { return Math.sqrt(d.y0) })
                  .outerRadius(function (d) { return Math.sqrt(d.y1) })
                  .startAngle(function (d) { return d.x0 })
                  .endAngle(function (d) { return d.x1 })

    let g = svg.selectAll('g')
      .data(block)
      .enter()
      .append('g')
      .attr('transform', 'translate(' + 200 + ',' + 200 + ')')

    // 画弧线
    g.append('path')
      // 是否绘制中心,留白好看一些,'none'时不会绘制中心颜色，即留白
      .attr('display', function (d) {
        return d.depth ? null : 'none'
      })
      .attr('d', arc)
      .style('stroke', '#ccc')
      .style('fill', function (d) { return color(d.data.name) })

    // 添加文字
    g.append('text')
      .attr('transform', function (d, i) {
        if (i !== 0) {
          let r = (d.x0 + d.x1) / 2
          let angle = Math.PI / 2
          r += r < Math.PI ? (angle - Math.PI) : angle
          r *= 180 / Math.PI
          return 'translate(' + arc.centroid(d) + ')' + 'rotate(' + r + ')'
        }
      })
      .text(function (d) { return d.data.name })
      .attr('font-size', function (d) { return 12 - d.depth + 'px' }) // 文字按深度缩小
      .attr('dy', '.5em')
      .attr('dx', function (d) { return -d.data.name.length / 2 + 'em' }) // 文字居中
  }

  componentDidMount() {
    this.drawPartition(this.data.packData)
  }

  render() {
    return <div></div>
  }

}

export default PartitionCircleChart
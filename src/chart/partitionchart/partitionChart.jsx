import React,{Component} from "react";
import * as d3 from 'd3'

class PartitionChart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawPartition (data) {
    const padding = this.data.padding
    const width = this.data.width
    const pieHeight = this.data.pieHeight

    const svg = d3.select("body")
      .append("svg")
      .attr("width", this.data.width)
      .attr("height", this.data.pieHeight)
      .style('padding-left', padding.left)
      .style('padding-top', padding.top)

    // 初始化树状图数据获取器
    const partition = d3.partition().size([width, pieHeight])

    // 初始化json数据转成一棵树，这个步骤是非常必要的！！
    // 将给定的有层次结构的数据转成符合绘图要求的数组
    const root = d3.hierarchy(data)
      // 分区图中不能sum
      // .sum(function (d) { return d.value })  // 每个节点的value都是自身和所有后代节点的value之和

    // 初始化树状图
    let partitionData = partition(root)
    console.log(partitionData)
    // 获取分区
    let block = partitionData.descendants()

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    let g = svg.selectAll('g')
      .data(block)
      .enter()
      .append('g')

    g.append('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1-d.x0)
      .attr('height', d => d.y1-d.y0)
      .style('stroke', '#ccc')
      .style('fill', (d, i) => color(i))

    g.append('text')
      .attr('x', function (d) { return d.x0 })
      .attr('y', function (d) { return d.y0 })
      .attr('dx', function (d) { return (d.x1 - d.x0) / 2 }) // 文字水平居中
      .attr('dy', function (d) { return (d.y1 - d.y0) / 2 - d.data.name.length / 2 * 12 }) // 文字垂直居中,有点瑕疵
      .attr('font-size', function (d) { return 12 - d.depth + 'px' }) // 文字按深度缩小
      .attr('writing-mode', 'tb') // 文字从上往下书写
      .text(function (d) { return d.data.name })
  }

  componentDidMount() {
    this.drawPartition(this.data.packData)
  }

  render() {
    return <div></div>
  }

}

export default PartitionChart
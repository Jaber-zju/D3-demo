import React,{Component} from "react";
import * as d3 from 'd3'

class TreeMapChart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawTreeMap (data) {
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

    const treeMap = d3.treemap().size([width, pieHeight])
    const root = d3.hierarchy(data)
                    .sum(function (d) { return d.value })  // 每个节点的value都是自身和所有后代节点的value之和

    const tree = treeMap(root) // 获取treemap结构树
    const leaves = tree.leaves() // 将生成的树形结构转化成叶子节点数组

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const g = svg.selectAll('g')
                  .data(leaves)
                  .enter()
                  .append('g')

    g.append('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1-d.x0)
      .attr('height', d => d.y1-d.y0)
      // 此处的填充颜色是根据父节点来设置的，父节点一致时填充颜色一样
      .style('fill', (d) => color(d.parent.data.name))
      .style('stroke', '#cccccc')


    g.append('text')
      .attr('x', function (d) { return d.x0 })
      .attr('y', function (d) { return d.y0 })
      // .attr('dx', (d) => { return -d.data.name.length / 2 + 'em' })
      // .attr('dy', (d) => { return '-0.5em' })
      .attr('dx', function (d) { return (d.x1 - d.x0) / 2 }) // 文字水平居中
      .attr('dy', function (d) { return (d.y1 - d.y0) / 2 - d.data.name.length / 2 * 12 }) // 文字垂直居中,有点瑕疵
      .attr('font-size', function (d) { return 12 - d.depth + 'px' }) // 文字按深度缩小
      // .attr('writing-mode', 'tb') // 文字从上往下书写
      .text(function (d) { return d.data.name })
      .attr('fill', '#f0f0f0')

    g.append('text')
      .attr('x', (d) => (d.x1 - d.x0) / 2 + d.x0)
      .attr('y', (d) => (d.y1 - d.y0) / 2 + d.y0)
      .attr('dx', (d) => { return -(d.value.toString().length + 2) / 4 + 'em' })
      .attr('dy', (d) => { return '1em' })
      .text((d) => { return '(' + d.value + ')' })
      .attr('font-size', (d) => { return 14 - d.depth + 'px' })
      .attr('fill', '#ffffff')


  }

  componentDidMount() {
    this.drawTreeMap(this.data.treeMapData)
  }

  render() {
    return <div></div>
  }

}

export default TreeMapChart
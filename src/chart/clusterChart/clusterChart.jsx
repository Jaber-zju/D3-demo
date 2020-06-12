import React,{Component} from "react";
import * as d3 from 'd3'

class Cluster_chart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawCluster (data) {
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
    let cluster = d3.cluster()
      .size([width, pieHeight - 80])
      .separation(function (a, b) {
        return (a.parent === b.parent ? 1 : 2)
        // return (a.parent === b.parent ? 1 : 2) / a.depth
      })

    // 初始化json数据转成一棵树，这个步骤是非常必要的！！
    let root = d3.hierarchy(data)
      .sum(function (d) {
        return d.value  //value都是0？？？
      })
    // 初始化树状图
    let clusterData = cluster(root)
    // 获取节点
    let nodes = clusterData.descendants()
    // 获取边,也就是连线
    let links = clusterData.links()
    console.log(links)

    // 绘制线
    let g = svg.append('g').attr('transform', 'translate(' + 40 + ',' + 0 + ')')
    g.selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .style('fill', '#cccccc')
      .attr('d', d3.linkHorizontal()
        .x(function (d) { return d.y })
        .y(function (d) { return d.x }))


    // 绘制文本和节点
    g.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', function (d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf') })
      .attr('transform', function (d) { return 'translate(' + d.y + ',' + d.x + ')' })
    g.selectAll('.node').append('circle')
      .attr('r', 5)
      .style('fill', 'green')
    g.selectAll('.node').append('text')
      .attr('dy', 3)
      .attr('x', function (d) { return d.children ? -8 : 8 })
      .style('text-anchor', function (d) { return d.children ? 'end' : 'start' })
      .text(function (d) {
        return d.data.name
      })
      .style('font-size', '11px')

  }

  componentDidMount() {
    this.drawCluster(this.data.treeData)
  }

  render() {
    return <div></div>
  }

}

export default Cluster_chart
import React,{Component} from "react";
import * as d3 from 'd3'

class ForceChart extends Component{
  constructor(props) {
    super(props)
    this.data = props.chartState
  }

  drawForceChart (nodes, edges) {
    const padding = this.data.padding
    const width = this.data.width
    const pieHeight = this.data.pieHeight

    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", pieHeight)
      .style('padding-left', padding.left)
      .style('padding-top', padding.top)

    const g = svg.append('g'); // 则svg中创建g

    const simulation = d3.forceSimulation(nodes)// 指定被引用的nodes数组
      // 此处绑定数据不能写 .nodes(nodes)，会报错
      .force('link', d3.forceLink(edges).distance(200))
      .force('charge', d3.forceManyBody().strength(-100).distanceMax(400))
      .force('center', d3.forceCenter((width - padding.left - padding.right) / 2, (pieHeight - padding.top - padding.bottom) / 2))

    let color = d3.scaleOrdinal(d3.schemeCategory10)

    // 添加节点
    const nodesCircle = svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle') // 创建圆
      .attr('r', 20) // 半径
      .style('fill', (d) => d3.rgb(color(d.name))) // 填充颜色
      .style('stroke', '#9FF') // 边框颜色
      .style('stroke-width', 1) // 边框粗细
      // 添加圆圈的拖拽事件，同时他会触发simulation的tick事件，重新布局该区域
      .call(d3.drag()
        .on('start', function (d) {
          if (!d3.event.active) {
            simulation.alphaTarget(0.5).restart() // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
                                                  // 拖拽节点后，重新启动模拟
          }
          d.fx = d.x   // d.x是当前位置，d.fx是静止时位置
          d.fy = d.y
        })
        .on('drag', function (d) {
          d.fx = d3.event.x   // d.event.x是拖拽节点时节点的实时位置，d.fx是静止时位置
          d.fy = d3.event.y
        })
        .on('end', function (d) {
          if (!d3.event.active) {
            simulation.alphaTarget(0)
          }
          d.fx = null         // 解除dragged中固定的坐标
          d.fy = null
        })
      )

    // 添加描述
    svg.selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .style('font-size', '12px')
      .style('fill', '#000')
      .attr('dx', 0)
      .attr('dy', 0)
      .text(function (d) { return d.name })

    // 添加relation
    svg.selectAll('.relation')
      .data(edges)
      .enter()
      .append('text')
      .style('fill', 'red')
      .style('font-size', '11px')
      .attr('class', 'relation')
      .attr('dx', 0)
      .attr('dy', 0)
      .text(function (d) { return d.relation })

    // 添加连线
    svg.selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .style('stroke', '#ccc')
      .style('stroke-width', 1)
      .style('opacity', 0.5)

    // 鼠标移入移出圆点的变化
    nodesCircle.on('mouseover', function () {
                  d3.select(this).style('fill', 'green').attr('stroke', 'green')
                  nodesCircle.append('title')
                    .text((node) => { // .text设置气泡提示内容
                      return node.name; // 气泡提示为node的名称
                    });
                })
                .on('mouseout', function () {
                  d3.select(this).style('fill', (d) => d3.rgb(color(d.name)))
                })

    // simulation.on("tick", function(){
    //   edgesLine.attr("x1",function(d){ return d.source.x; });
    //   edgesLine.attr("y1",function(d){ return d.source.y; });
    //   edgesLine.attr("x2",function(d){ return d.target.x; });
    //   edgesLine.attr("y2",function(d){ return d.target.y; });
    //
    //   nodesCircle.attr("cx",function(d){ return d.x; });
    //   nodesCircle.attr("cy",function(d){ return d.y; });
    // });

    //数据重绘
    simulation.on('tick', function () {
      svg.selectAll('circle')
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })
      svg.selectAll('text')
        .attr('x', function (d) { return d.x })
        .attr('y', function (d) { return d.y })
      svg.selectAll('line')
        .attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })
      svg.selectAll('.relation')
        .attr('x', function (d) { return (d.source.x + d.target.x) / 2 })
        .attr('y', function (d) { return (d.source.y + d.target.y) / 2 })
    })
  }

  componentDidMount() {
    this.drawForceChart(this.data.nodes, this.data.links)
  }

  render() {
    return (
      <div></div>
    )
  }

}

export default ForceChart
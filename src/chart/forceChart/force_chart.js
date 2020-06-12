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

    const simulation = d3.forceSimulation(nodes) // 指定被引用的nodes数组
      .force('link', d3.forceLink(edges).distance(100))
      .force('collision', d3.forceCollide(0.5).strength(0.7))
      .force('center', d3.forceCenter(width / 2, pieHeight / 2)) // 向心力
      .force('charge', d3.forceManyBody().strength(-100).distanceMax(400)); // 电荷相互作用力，+为相对，-为相反

    const edgesLine = svg.selectAll('line')
      .data(edges) // 绑定数据
      .enter() // 为数据添加对应数量的占位符
      .append('line') // 在占位符上面生成折线（用path画）
      .attr('d', (d) => { return d && 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y; }) //遍历所有数据。d表示当前遍历到的数据，返回绘制的贝塞尔曲线
      .attr('id', (d, i) => { return i && 'edgepath' + i; }) // 设置id，用于连线文字
      .attr('marker-end', 'url(#arrow)') // 根据箭头标记的id号标记箭头
      .style('stroke', '#000') // 颜色
      .style('stroke-width', 1); // 粗细

    const nodesCircle = svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle') // 创建圆
      .attr('r', 20) // 半径
      .style('fill', '#9FF') // 填充颜色
      .style('stroke', '#9FF') // 边框颜色
      .style('stroke-width', 1) // 边框粗细
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

    // 鼠标移入移出圆点的变化
    nodesCircle
      .on('mouseover', function () {
        d3.select(this).style('fill', 'green').attr('stroke', 'green')
        nodesCircle.append('title')
          .text((node) => { // .text设置气泡提示内容
            return node.name; // 气泡提示为node的名称
          });
      })
      .on('mouseout', function () {
        d3.select(this).style('fill', '#7efffe').attr('stroke', '#7efffe')
      })

    simulation.on("tick", function(){
      edgesLine.attr("x1",function(d){ return d.source.x; });
      edgesLine.attr("y1",function(d){ return d.source.y; });
      edgesLine.attr("x2",function(d){ return d.target.x; });
      edgesLine.attr("y2",function(d){ return d.target.y; });

      nodesCircle.attr("cx",function(d){ return d.x; });
      nodesCircle.attr("cy",function(d){ return d.y; });
    });
  }

  componentDidMount() {
    this.drawForceChart(this.data.forceNodes, this.data.forceEdges)
  }

  render() {
    return (
      <div></div>
    )
  }

}

export default ForceChart
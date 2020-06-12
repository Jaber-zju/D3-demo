import React,{Component} from "react";
import * as d3 from 'd3'

class ChordChart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawChord (data, continent) {
    const padding = this.data.padding
    const width = this.data.width
    const pieHeight = this.data.pieHeight
    const radius = this.data.radius

    const svg = d3.select("body")
      .append("svg")
      .attr("width", this.data.width)
      .attr("height", this.data.pieHeight)
      .style('padding-left', padding.left)
      .style('padding-top', padding.top)

    const chord = d3.chord()
                    // .padAngle(0.03)
                    // .sortSubgroups(d3.ascending)
    console.log(chord)

    // 获取节点,也就是最后那个group,即五大洲对应的角度参数值,这里必须要这么做，否则取不到对应的角度值
    const nodes = chord(data)['groups']

    // 获取弦,需要剔除最后的那个group
    const arcs = chord(data).map((item) => {
      return item
    })

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const g = svg.append('g')
                  .attr('transform', 'translate(' + width/2 + ',' + pieHeight/2 + ')')

    //装节点的外部圆环g,之后所有的绘图都在这个容器里面画
    const gOuter = g.selectAll('.gNodes')
                      .data(nodes)
                      .enter()
                      .append('g')
                      .attr('class', 'gNodes')

    // 绘制外部圆环弧线
    const innerRadius = width / 2 * 0.7;
    const outerRadius = innerRadius * 1.2

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    gOuter.append('path')
          .attr('class', 'outerPath')
          .style('fill', function (d) { return color(d.index) })
          // .style('stroke', function (d) { return d3.rgb(color(d.index)).darker() })
          .attr('d', arc)

    // 节点文字绘制
    gOuter.append('text')
          .each(function (d, i) { // 为绑定的数据添加变量
            d.angle = (d.startAngle + d.endAngle) / 2 // 弧的中心角度
            d.name = continent[i]
          })
          .attr('class', 'outerText')
          .attr('dy', '.35em')
          .attr('transform', function (d) {
            let result = 'rotate(' + (d.angle * 180) / Math.PI + ')' // 旋转
            result += 'translate(-15,' + -1.0 * (outerRadius + 10) + ')' // 平移
            // 对下方文字做旋转180度处理
            if (d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) {
              result += 'rotate(180)'
            }
            return result
          })
          .text(function (d) {
            return d.name
          })

    // 添加内部的弦
    let ribbon = d3.ribbon()
                    .radius(innerRadius)

    g.append('g')
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('class', 'innerPath')
      .attr('d', ribbon)
      .style('fill', function (d) { return color(d.target.index) })
      .style('stroke', function (d) { return d3.rgb(color(d.target.index)).darker() })
      .on('mouseover', (d, i) => {
        // d3.event.target.style.fill = d3.rgb(color(d.target.index)).darker()
        d3.event.target.style.fill = d3.rgb(color(d.target.index)).brighter()
      })
      .on('mouseout', (d, i) => {
        d3.event.target.style.fill = color(d.target.index)
      })


    // 添加鼠标移入动画
    gOuter.selectAll('.outerPath')
          .on('mouseover', function (data) {
            let i = data.index
            // 选取所有的内部弦，过滤得到所有与当前圆环块没有关系的弦
            svg.selectAll('.innerPath')
              .filter(function (d) {
                return d.source.index !== i && d.target.index !== i
              })
            // 得到所有的没有关系的弦后，将其透明度变为0，不用display可避免操作DOM
              .transition()
              .duration(500)
              .style('opacity', 0)
          })
          .on('mouseout', function (data) {
            let i = data.index
            svg.selectAll('.innerPath')
              .filter(function (d) {
                return d.source.index !== i && d.target.index !== i
              })
              .transition()
              .duration(500)
              .style('opacity', 1)
          })
  }

  componentDidMount() {
    this.drawChord(this.data.matrix, this.data.continent)
  }

  render() {
    return <div></div>
  }

}

export default ChordChart
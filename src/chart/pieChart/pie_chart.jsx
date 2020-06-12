import React,{Component} from "react";
import * as d3 from 'd3'

class Pie_chart extends Component{
  constructor(props) {
    super(props);
    this.data = props.chartState
  }

  drawPie (data) {
    const padding = this.data.padding

    const svg = d3.select("body")
      .append("svg")
      .attr("width", this.data.width)
      .attr("height", this.data.pieHeight)
      .style('padding-left', padding.left)
      .style('padding-top', padding.top)

    // 将数据转化成圆环图需要的数据结构
    // const pie = d3.pie().padAngle(0.02)(data)
    const pie = d3.pie()(data)

    // 设置圆环内外半径大小
    const outerRadius = this.data.width / 4;
    const innerRadius = this.data.pieHeight / 6;

    // 以半径大小创建圆环的圆弧
    const arc = d3.arc()
                  .innerRadius(innerRadius)
                  .outerRadius(outerRadius)
                  // .cornerRadius(20)   // 环的圆角

    // 根据前面的圆环图数据来创建一个组合，这个组合用来包含之后的圆弧线
    const arcs = svg.selectAll("g")
                    .data(pie)  // 只能在这里绑定数据才有用，先绑定数据再去画线
                    .enter()
                    .append("g")
                    .attr("transform","translate(" + (outerRadius*1.2) + "," + (outerRadius*1.2) + ")");

    const color = d3.schemeSet2
    console.log(color)


    // 这一步是画图的关键，画线
    arcs.append("path")
      .attr("fill", (d, i) => {
        return color[d.index]
      })
      // 这一步必不可少
      .attr("d",function(d){
        return arc(d)
      })
      // .attr('stroke', 'black')
      // .attr('stroke-width', 1)

    // 添加文字
    arcs.append("text")
      .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")"
      })
      .attr("text-anchor","middle")
      .text(function(d){
        return d.value
      })



    // // 设置圆环内外半径大小
    // const outerRadius2 = outerRadius*1.2
    // const innerRadius2 = outerRadius
    //
    // // 以半径大小创建圆环的圆弧
    // const arc2 = d3.arc()
    //   .innerRadius(innerRadius2)
    //   .outerRadius(outerRadius2)
    // // .cornerRadius(20)   // 环的圆角
    //
    // const color2 = d3.schemeSet1
    // console.log(color2)
    //
    //
    // // 这一步是画图的关键，画线
    // arcs.append("path")
    //   .attr("fill", (d, i) => {
    //     return color2[d.index]
    //   })
    //   // 这一步必不可少
    //   .attr("d",function(d){
    //     return arc2(d)
    //   })
    // // .attr('stroke', 'black')
    // // .attr('stroke-width', 1)
    //
    // // 添加文字
    // arcs.append("text")
    //   .attr("transform",function(d){
    //     return "translate(" + arc2.centroid(d) + ")"
    //   })
    //   .attr("text-anchor","middle")
    //   .text(function(d){
    //     return d.value
    //   })
  }

  componentDidMount() {
    this.drawPie(this.data.pieData)
  }

  render() {
    return <div></div>
  }

}

export default Pie_chart
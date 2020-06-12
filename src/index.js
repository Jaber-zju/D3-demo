import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import BarChart from './barChart';
// import BarChart_2 from './barChart_2.jsx';
import Pie_chart from "./chart/pieChart/pie_chart";
import Force_chart from "./chart/forceChart/force_chart";
import Pack_chart from "./chart/packChart/pack_chart";
import Tree_chart from "./chart/treeChart/tree_chart";
import CircleClusteChart from "./chart/clusterChart/circleClusterChart";
import Cluster_chart from "./chart/clusterChart/clusterChart";
import PartitionCircleChart from "./chart/partitionchart/partitionCircleChart";
import PartitionChart from "./chart/partitionchart/partitionChart";
import StackChart from "./chart/stackChart/stackChart";
import TreeMapChart from "./chart/treeMapChart/treeMapChart";
import ForceChart from "./chart/forceChart/forceChart";
import ChordChart from "./chart/chordChart/chordChart";

import * as serviceWorker from './serviceWorker';
import chartState from './store/store'

ReactDOM.render(
  <React.StrictMode>
    {/*<BarChart_2 chartState={chartState}/>*/}
    {/*<Force_chart chartState={chartState}/>*/}
    {/*<Pack_chart chartState={chartState}/>*/}
    {/*<Tree_chart chartState={chartState}/>*/}
    {/*<Cluster_chart chartState={chartState}/>*/}
    {/*<CircleClusteChart chartState={chartState}/>*/}
    {/*<Pie_chart chartState={chartState}/>*/}
    {/*<PartitionChart chartState={chartState}/>*/}
    {/*<PartitionCircleChart chartState={chartState}/>*/}
    {/*<StackChart chartState={chartState}/>*/}
    {/*<ChordChart chartState={chartState}/>*/}
    {/*<TreeMapChart chartState={chartState}/>*/}
    <ForceChart chartState={chartState}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

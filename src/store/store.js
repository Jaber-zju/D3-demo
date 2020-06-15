import {action, observable} from "mobx";

class chartState {
  width = 700
  height = 500
  pieHeight = 700
  padding = { top:20, right:20, bottom:100, left:100 }

  @observable dataSet = [50,43,120,87,99,167,142]

  pieData = [30 , 10 , 43 , 55 , 13, 65]

  forceNodes = [
    { name: "GuiLin"    },
    { name: "GuangZhou" },
    { name: "XiaMen"    },
    { name: "HangZhou"   },
    { name: "ShangHai"   },
    { name: "QingDao"    },
    { name: "TianJin"    },
    { name: "BeiJing"    },
    { name: "ChangChun"  },
    { name: "XiAn"       },
    { name: "WuluMuQi"  },
    { name: "LaSa"       },
    { name: "ChengDu"    } ];

  forceEdges = [
      { source : 0  , target: 1 } ,
      { source : 1  , target: 2 } ,
      { source : 2  , target: 3 } ,
      { source : 3  , target: 4 } ,
      { source : 4  , target: 5 } ,
      { source : 5  , target: 6 } ,
      { source : 6  , target: 7 } ,
      { source : 7  , target: 8 } ,
      { source : 8  , target: 9 } ,
      { source : 9  , target: 10 } ,
      { source : 10 , target: 11 } ,
      { source : 11 , target: 12 } ,
      { source : 12 , target: 0 }
    ];

  packData = {
    'name': '中国',
    'value': '950',
    'children': [
      {
        'name': '浙江',
        'value': '450',
        'children':
          [
            {'name': '杭州', 'value': '120'},
            {'name': '宁波', 'value': '100'},
            {'name': '温州', 'value': '100'},
            {'name': '绍兴', 'value': '130'}
          ]
      },
      {
        'name': '广西',
        'value': '200',
        'children': [
          {'name': '桂林', 'value': '80'},
          {'name': '南宁', 'value': '50'},
          {'name': '柳州', 'value': '30'},
          {'name': '防城港', 'value': '40'}
        ]
      },
      {
        'name': '黑龙江',
        'value': '200',
        'children': [
          {'name': '哈尔滨', 'value': '50'},
          {'name': '齐齐哈尔', 'value': '40'},
          {'name': '牡丹江', 'value': '60'},
          {'name': '大庆', 'value': '50'}
        ]
      },
      {
        'name': '新疆',
        'value': '100',
        'children':
          [
            {'name': '乌鲁木齐', 'value': '30'},
            {'name': '克拉玛依', 'value': '20'},
            {'name': '吐鲁番', 'value': '25'},
            {'name': '哈密', 'value': '25'}
          ]
      }
    ]
  }

  treeData = {
    'name': '中国',
    'children': [
      {
        'name': '浙江',
        'children':
          [
            {'name': '杭州'},
            {'name': '宁波'},
            {'name': '温州'},
            {'name': '绍兴'}
          ]
      },
      {
        'name': '广西',
        'children': [
          {
            'name': '桂林',
            'children':
              [
                {'name': '秀峰区'},
                {'name': '叠彩区'},
                {'name': '象山区'},
                {'name': '七星区'}
              ]
          },
          {'name': '南宁'},
          {'name': '柳州'},
          {'name': '防城港'}
        ]
      },
      {
        'name': '黑龙江',
        'children': [
          {'name': '哈尔滨'},
          {'name': '齐齐哈尔'},
          {'name': '牡丹江'},
          {'name': '大庆'}
        ]
      },
      {
        'name': '新疆',
        'children':
          [
            {'name': '乌鲁木齐'},
            {'name': '克拉玛依'},
            {'name': '吐鲁番'},
            {'name': '哈密'}
          ]
      }
    ]
  }

  radius = 200
  stackData = [
    {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
    {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
    {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, dates: 400},
    {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, dates: 400}
  ]

  // 弦图所用数据
  // 五大洲人口组成数据
  continent = ['亚洲', '欧洲', '非洲', '美洲', '大洋洲']
  // 模拟矩阵
  matrix = [
    [11975, 5871, 8916, 2868, 3241],
    [1951, 10048, 2060, 6171, 1323],
    [8010, 16145, 8090, 8045, 4456],
    [1013, 990, 940, 6907, 3245],
    [2344, 2333, 940, 3654, 7526]
  ]

  // 矩阵树状图所用数据
  treeMapData = {
    'name': '中国',
    'children': [
      {
        'name': '浙江',
        'children':
          [
            {'name': '杭州', 'value': 1234},
            {'name': '宁波', 'value': 3334},
            {'name': '温州', 'value': 2000},
            {'name': '绍兴', 'value': 1002}
          ]
      },
      {
        'name': '广西',
        'children': [
          {
            'name': '桂林',
            'children':
              [
                {'name': '秀峰区', 'value': 2131},
                {'name': '叠彩区', 'value': 2015},
                {'name': '象山区', 'value': 988},
                {'name': '七星区', 'value': 756}
              ]
          },
          {'name': '南宁', 'value': 3699},
          {'name': '柳州', 'value': 4511},
          {'name': '防城港', 'value': 2325}
        ]
      },
      {
        'name': '黑龙江',
        'children': [
          {'name': '哈尔滨', 'value': 784},
          {'name': '齐齐哈尔', 'value': 885},
          {'name': '牡丹江', 'value': 1254},
          {'name': '大庆', 'value': 3240}
        ]
      },
      {
        'name': '新疆',
        'children':
          [
            {'name': '乌鲁木齐', 'value': 2456},
            {'name': '克拉玛依', 'value': 1015},
            {'name': '吐鲁番', 'value': 998},
            {'name': '哈密', 'value': 654}
          ]
      }
    ]
  }

  // 力导向图数据
  // 人物节点 name表示名称
  nodes = [
    {name: '谢大脚'},
    {name: '王长贵'},
    {name: '王大拿'},
    {name: '谢小梅'},
    {name: '谢广坤'},
    {name: '刘能'},
    {name: '赵四'},
    {name: '刘大脑袋'},
    {name: '赵玉田'},
    {name: '刘英'},
    {name: '王老七'},
    {name: '王小蒙'},
    {name: '谢永强'}
  ]
  // 人物关系，source和target表示连线两端的节点，节点的序号从0开始，relation是自己随便加的
  links = [
    {source: 0, target: 1, relation: '两口子'},
    {source: 0, target: 2, relation: '曾爱慕'},
    {source: 0, target: 3, relation: '亲戚'},
    {source: 0, target: 4, relation: '曾爱慕'},
    {source: 2, target: 7, relation: '上下属'},
    {source: 4, target: 5, relation: '死对头'},
    {source: 4, target: 10, relation: '亲家'},
    {source: 5, target: 9, relation: '父女'},
    {source: 5, target: 6, relation: '亲家'},
    {source: 10, target: 11, relation: '妇女'},
    {source: 11, target: 12, relation: '两口子'},
    {source: 4, target: 12, relation: '父子'},
    {source: 8, target: 9, relation: '两口子'}
  ]

  // 折线图数据
  lineData = [10, 30, 25, 12, 43, 25, 18, 36]

  // 区域图数据
  areaData = [10, 30, 25, 12, 43, 25, 18, 12]

  // 捆图数据
  cities = {
    name: "",
    children:[
      {name: "北京"},{name: "上海"},{name: "杭州"},
      {name: "广州"},{name: "桂林"},{name: "昆明"},
      {name: "成都"},{name: "西安"},{name: "太原"}
    ]
  }
  railway = [
    {source: "北京", target: "上海"},
    {source: "北京", target: "广州"},
    {source: "北京", target: "杭州"},
    {source: "北京", target: "西安"},
    {source: "北京", target: "成都"},
    {source: "北京", target: "太原"},
    {source: "北京", target: "桂林"},
    {source: "北京", target: "昆明"},
    {source: "北京", target: "成都"},
    {source: "上海", target: "杭州"},
    {source: "昆明", target: "成都"},
    {source: "西安", target: "太原"}
  ]

  @action.bound changeData = () => {
    this.dataSet.shift()
    this.dataSet.push(Math.floor(Math.random() * 100))
  }

  @action.bound changeLineData = () => {
    this.lineData.sort((a ,b) => {
      return a - b
    })
  }

  @action.bound changeAreaData = () => {
    this.areaData.sort((a ,b) => {
      return a - b
    })
  }

}

export default new chartState()
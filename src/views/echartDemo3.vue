<template>
    <div class="echartDemo3">
      <div class="top" v-if="visitorNumList.length != 0">
        <div>
          <p>月额度</p> 
          <p>{{visitorNumList[0].value > 10000 ? (visitorNumList[0].value/10000) : visitorNumList[0].value}}</p> 
        </div>
        <div>
          <p>单品数量</p>
          <p>{{visitorNumList[1].value > 10000 ? (visitorNumList[1].value/10000) : visitorNumList[1].value}}</p>
        </div>
        <div>
          <p>差评率</p>
          <p>{{visitorNumList[2].value}}%</p>
        </div>
        <div>
          <p>月销量</p>
          <p>{{visitorNumList[3].value > 10000 ? (visitorNumList[3].value/10000) : visitorNumList[3].value}}</p>
        </div>
        <div>
          <p>好评率</p>
          <p>{{visitorNumList[4].value}}%</p>
        </div>
        <div>
          <p>评论数</p>
          <p>{{visitorNumList[5].value > 10000 ? (visitorNumList[5].value/10000) : visitorNumList[5].value}}</p>
        </div>
      </div>
      <div class="left">
        <div>
          <div id="left1" style="width:100%;height:100%;"></div>
        </div>
        <div>
          <p class="titleStyle">分类销量TOP10</p>
          <div id="left2" style="width:100%;height:100%;"></div>
        </div>
        <div>
          <p class="titleStyle">销售价格段分布</p>
          <div id="left3" style="width:100%;height:100%;"></div>
        </div>
      </div>
      <div class="right">
        <div>
          <p class="titleStyle">分类销额TOP10</p>
          <div id="right1" style="width:100%;height:100%;"></div>
        </div>
        <div>
          <p class="titleStyle">商品价格段分布</p>
          <div id="right2" style="width:100%;height:100%;"></div>
        </div>
        <div>
          <p class="titleStyle">日销售趋势</p>
          <div id="right3" style="width:100%;height:100%;"></div>
        </div>
        <div>
          <div>
            <div id="right4" style="width:100%;height:100%;">
              <div>
                <p>评论数</p>
                <div title="5564" style="width:50%"></div>
              </div>
              <div>
                <p>差评数</p>
                <div title="522564" style="width:60%"></div>
              </div>
              <div>
                <p>好评数</p>
                <div title="5221564" style="width:70%"></div>
              </div>
            </div>
          </div>
          <div>
            <p class="titleStyle">差评原因</p>
            <div id="right5" style="width:100%;height:85%;margin-top: 10%;"></div>
          </div>
        </div>
        <div>
          <p class="titleStyle">库存销量关联分析</p>
          <div id="right6" style="width:100%;height:100%;"></div>
        </div>
      </div>



      
    </div>
</template>

<script>
import echarts from 'echarts';
import china from './../assets/map/china';
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import common from './../assets/js/common'
export default {
    data(){
      return{      
        visitorNumList:[
          {
            name:'月额度',
            value:1991,
          },
          {
            name:'单品数量',
            value:1991,
          },
          {      
            name:'差评率',
            value:'3.30',
          },
          {      
            name:'月销量',
            value:'15999100',
          },
          {
            name:'好评率',
            value:'46.14',
          },
          {
            name:'评论数',
            value:'8384741',
          }
        ]
      }
    },
    mounted(){
      this.loadInit();
    },
    methods:{
        loadInit(){ //初始化
          this.left1echartFn();
          this.left2echartFn();
          this.left3echartFn();
          this.right1echartFn();
          this.right2echartFn();
          this.right3echartFn();
          this.right5echartFn();
          this.right6echartFn();
        },
        left1echartFn(){
          let option = {
            title: {
                text: '商品类型分布',
                left: 'center',
                textStyle: {
                    fontSize:13  
                },
                top:'center'
            },
            tooltip: {},
            series: [
                {
                    name: '商品类型分布',
                    type: 'pie',
                    radius: [55, 90],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: [
                        {value: 10, name: '商品1'},
                        {value: 5, name: '商品2'},
                        {value: 15, name: '商品3'},
                        {value: 25, name: '商品4'},
                        {value: 20, name: '商品5'},
                        {value: 35, name: '商品6'},
                        {value: 30, name: '商品7'},
                        {value: 40, name: '商品8'}
                    ]
                }
            ]
          };
          let mapEcharts = document.getElementById('left1');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        left2echartFn(){
          let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '-5%',
                top:'19%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                show:false
            },
            yAxis: {
                type: 'category',
                splitLine: {
                  show:false,
                },
                axisTick: {
                  show: false
                },
                axisLabel:{
                  // rotate:60,
                  interval: 0,    // {number}表示隔几个标签显示一个标签
                },
                data: ['个护化妆', '厨具', '汽车用品', '营养保健', '服饰内衣', '运动户外', '珠宝首饰', '电子', '鞋靴', '教育音像']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20
                        },
                    },
                    data: [18203, 23489, 29034, 104970, 131744, 630230, 29034, 104970, 131744, 630230]
                }
            ]
          };
          let mapEcharts = document.getElementById('left2');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        left3echartFn(){
          let option = {
            tooltip: {},
            grid: {
                bottom: '10%',
            },
            legend: {
                data: ['月销量'],
                right:10,
                icon: "circle",
                top:20,
                itemGap: 10,
                itemWidth:10,
            },
            xAxis: [{
                type: 'category',
                data: ['x≤100', '', '1500<X≤2000', '', '1000<X≤1500'],
                axisPointer: {
                    type: 'shadow'
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
            }],
            yAxis: [{
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    show: false
                },
                {
                    show: false,
                    type: 'value',
                    axisLabel: {
                        formatter: ''
                    }
                },
            ],
            series: [{
                    name: '月销量',
                    type: 'bar',
                    color: '#ca8516',
                    barWidth: 10,
                    data: [2.0, 7.0, 23.2, 25.6, 76.7],
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius: [10, 10, 10, 10]
                        }
                    },
                }
            ]
          };
          let mapEcharts = document.getElementById('left3');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        right1echartFn(){
          let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '-5%',
                top:'19%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                show:false
            },
            yAxis: {
                type: 'category',
                splitLine: {
                  show:false,
                },
                axisTick: {
                  show: false
                },
                axisLabel:{
                  interval: 0,    // {number}表示隔几个标签显示一个标签
                },
                data: ['电脑IT', '乐器', '钟表', '电脑/办公', '珠宝首饰', '厨具', '电子', '营养保健', '家用电器', '个护化妆']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: function(params){
                                let colorList = ['#cca272','#74608f','#d7a02b','#c8ba23','#cca272','#74608f','#d7a02b','#c8ba23','#cca272','#74608f'];
                                return colorList[params.dataIndex];
                            }
                        },

                    },
                    data: [18203, 23489, 29034, 104970, 131744, 630230, 29034, 104970, 131744, 630230]
                }
            ]
          };
          let mapEcharts = document.getElementById('right1');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        right2echartFn(){
          let option = {
            tooltip: {
                trigger: 'axis'
            },
            radar: [
                {
                    indicator: [
                        {text: 'X≤100', max: 100},
                        {text: '100<X≤500', max: 100},
                        {text: '1500<X≤2000', max: 100},
                        {text: '500<X≤1000', max: 100},
                        {text: '1000<X≤1500', max: 100},
                    ],
                    center: ['50%', '58%'],
                    radius: 60
                },
            ],
            splitArea: {
                areaStyle: {
                    // color: ['rgba(114, 172, 209, 0.1)',
                    //     'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)',
                    //     'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)'
                    // ], //圆环颜色
                    // shadowColor: 'yellow', // 圆颜色
                    // shadowBlur: 10
                }
            },
                              
            series: [
                
                {
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    areaStyle: {
                        normal: {
                          color: '#d9a95b', // 选择区域颜色
                        }
                    },
                    itemStyle: {
                        normal: {
                            color : "#c9871c", // 图表中各个图区域的边框线拐点颜色
                            lineStyle: {
                                color:"#c9871c" // 图表中各个图区域的边框线颜色
                            },
                        }
                    },
                    data: [
                        {
                            value: [60, 73, 85, 40, 40],
                            name: '商品价格段分布'
                        },
                    ]
                }
            ]
          };
          var mapEcharts = document.getElementById('right2');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        right3echartFn(){
          let option = {
            tooltip: {},
            grid: {
                bottom: '10%',
            },
            legend: {
                data: ['日销量'],
                right:10,
                icon: "circle",
                top:20,
                itemGap: 10,
                itemWidth:10,
            },
            xAxis: [{
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6','7', '8', '9', '10', '11', '12','13', '14'],
                axisPointer: {
                    type: 'shadow'
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
            }],
            yAxis: [{
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    show: false
                },
                {
                    show: false,
                    type: 'value',
                    axisLabel: {
                        formatter: ''
                    }
                },
            ],
            series: [{
                    name: '日销量',
                    type: 'bar',
                    color: '#ca8516',
                    barWidth: 10,
                    data: [2.0, 7.0, 23.2, 25.6, 76.7,2.0, 4.9, 7.0, 23.2, 25.6, 76.7,2.0, 4.9, 7.0],
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius: [10, 10, 10, 10]
                        }
                    },
                }
            ]
          };
          var mapEcharts = document.getElementById('right3');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        right5echartFn(){
          let dataArr =[];
          for(let i=0; i<100; i++){
              dataArr.push({
                  name: " 质量问题",
                  value: i,
              })
          }
          let option = {
              // tooltip: {
              //     show: true
              // },
              series: [{
                  type: "wordCloud",
                  gridSize:6,
                  shape:'diamond',
                  sizeRange: [12, 50],
                  textStyle: {
                      normal: {
                          color: function() {
                              return 'rgb(' + [
                                  Math.round(Math.random() * 160),
                                  Math.round(Math.random() * 160),
                                  Math.round(Math.random() * 160)
                              ].join(',') + ')';
                          }
                      },
                      emphasis: {
                          shadowBlur: 10,
                          shadowColor: '#333'
                      }
                  },
                  data: dataArr,
              }]

          };
          var mapEcharts = document.getElementById('right5');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        right6echartFn(){
          let option = {
            color:'#d59d45',
            xAxis: {
                splitLine: {
                  show:false,
                },
                axisTick: {
                  show: false
                },
            },
            yAxis: {
                show:false,
            },
            legend: {
                orient: 'vertical',
                left: '90%',
                top:'5%',
                data: ['库存量']
            },
            tooltip:{},
            series: [{
                name: '库存量',
                symbolSize: 8,
                data: [
                    [5000, 1],
                    [10000, 10],
                    [15000, 15],
                    [20000, 20],
                    [25000, 25],
                    [30000, 30],
                    [1, 1],
                    [10.0, 8.04],
                    [9.0, 6.95],
                    [14.0, 7.58],
                    [8.0, 6.95],
                    [13.0, 7.58],
                    [9.0, 8.81],
                    [11.0, 8.33],
                    [14.0, 9.96],
                    [6.0, 7.24],
                    [4.0, 4.26],
                    [12.0, 10.84],
                    [7.0, 4.82],
                    [5.0, 5.68]
                ],
                type: 'scatter'
            }]
          };
          var mapEcharts = document.getElementById('right6');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        }
    }
}
</script>
<style lang="scss" scoped>
  .echartDemo3{
    p.titleStyle{
      padding-left: 0.5rem;
      padding-top: 0.5rem;
      position: absolute;
      font-weight: bold;
      font-size: 0.7rem;
    }
    .top{
      height:10vh;
      border-bottom:1px solid #ededed;
      box-sizing: border-box;
      display: flex;
      >div{
        width:20%;
        text-align:center;
        padding-top:1vh;
        box-sizing: border-box;
        >p:first-child{
          margin-top:0.5vh;
          font-size: 0.65rem;
        }
        >p:last-child{
          margin-top:0.25rem;
          color:#cc881c;
        }
      }
    }
    .left{
      position: fixed;
      left:0;
      width:33.66vw;
      height:88vh;
      margin-top:1vh;
      >div{
        height:32.333%;
        margin-top:1vh;
        border:1px solid #ededed;
      }
      >div:first-child{
        margin-top:0;
      }
    }
    .right{
      position: fixed;
      right:0;
      width:65.66vw;
      height:88vh;
      margin-top:1vh;
      display: flex;
      flex-flow: wrap;
      >div{
        border:1px solid #ededed;
        width:50%;
        box-sizing: border-box;
        margin-top:1vh;
        height: 32.333%;
      }
      >div:first-child{
        margin-top:0;
        width:49%;
        margin-right:1%;
      }
      >div:nth-child(2){
        margin-top:0;
      }
      >div:nth-child(3){
        width:49%;
        margin-right:1%;
      }
      >div:nth-child(4){
        display: flex;
        >div{
          width:50%;
        }
        >div:first-child{
          border-right:1px solid #ededed;
        }
      }
      >div:last-child{
        width:100%;
      }
      div#right4{
        >div{
          padding:0 0.5rem;
          box-sizing: border-box;
          border-bottom:1px solid #e6e6e6;
          height:33.333%;
          padding-top:0.5rem;
          p{
            text-align:left;
            font-size: 0.65rem;
          }
          >div{
            background:#394858;
            width:50%;
            height:40%;
            margin-top:0.2rem;
            cursor: pointer;
          }
        }
        >div:last-child{
          border-bottom:none;
        }
      }
    }
  }
</style>



<template>
    <div class="echartDemo1">
      <div class="left">
        <div>
          <p class="titleStyle">访客用户构成</p>
          <div id="left1" style="width:100%;height:100%;"></div>
        </div>
        <div>
          <p class="titleStyle">访客转化率</p>
          <div id="left2" style="width:100%;height:100%;"></div>
        </div>
        <div>
          <p class="titleStyle">每日咨询成交额</p>
          <div id="left3" style="width:100%;height:100%;"></div>
        </div>
      </div>
      <div class="center">
        <div>
          <p class="titleStyle">访客数量</p>
          <div>
            <div v-for="(item,index) in visitorNumList" :key="index">
              <p>{{item.name}}</p>
              <!-- {{common.formatNum(32621.00)}} -->
              <p>{{item.value}}</p>
            </div>
           
          </div>
        </div>
        <div>
          <p class="titleStyle">访客地理分布</p>
          <div id="mapEcharts" style="width:100%;height:100%;"></div>
        </div>
      </div>
      <div class="right">
        <div>
          <div id="right1" style="width:100%;height:100%;"></div>
        </div>
        <div class="systemBox">
          <p class="systemText">使用系统</p>
          <div id="right2" style="width:100%;height:70%"></div>
          <div><span>访客数量</span></div>
        </div>
        <div>
          <p class="titleStyle">常用浏览器</p>
          <div id="right3" style="width:100%;height:100%;"></div>
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
            name:'访客数量',
            value:32621.00,
          },
          {
            name:'新用户数',
            value:3023.00,
          },
          {      
            name:'新用户比率',
            value:'9.27%',
          },
          {      
            name:'咨询率',
            value:'10.88%',
          },
          {
            name:'下单率',
            value:'6.03%',
          },
          {
            name:'支付率',
            value:'5.72%',
          },
          {
            name:'平均访问次数',
            value:401.00,
          },
          {
            name:'平均访问页数',
            value:5.51,
          },
          {
            name:'平均停留时间',
            value:'1354.29s',
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
          this.echartMapFn();
          this.right1echartFn();
          this.right2echartFn();
          this.right3echartFn();
          this.visitorNumList.forEach((item,index) => {
            if(String(item.value).indexOf('%') == '-1'){
              if(String(item.value).indexOf('s') != '-1'){
                item.value = common.formatNum(item.value) + 's';
              }else{
                item.value = common.formatNum(item.value);
              }
            }
          });
        },
        left1echartFn(){
          let option = {
            color:'#394858',
            tooltip: {},
            xAxis: {
                type: 'category',
                data: ['22', '23', '24', '25', '26', '27', '28'],
                splitLine: {
                  show:false,
                },
                axisTick: {
                  show: false
                },
            },
            yAxis: {
                type: 'value',
                splitLine: {
                  show:false
                },
                show: false,
                axisTick: {
                  show: false
                },
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: '#ca8516'
                }
            }]
          };
          var mapEcharts = document.getElementById('left1');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        left2echartFn(){
          let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}"
            },
            series: [
                {
                    name:'漏斗图',
                    type:'funnel',
                    left: '10%',
                    top: 35,
                    bottom: 20,
                    width: '80%',
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    // sort: 'ascending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    data: [
                        {value: 8694, name: '下单数量\n\n8694'},
                        {value: 20000, name: '咨询数量\n\n20000'},
                        {value: 8323, name: '支付数量\n\n8323'},
                        {value: 20000, name: '访客数量\n\n20000'},
                    ]
                }
            ]
          };
          var mapEcharts = document.getElementById('left2');
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
                  data: ['咨询人数', '支付人数', '咨询平均成交额'],
                  right:10,
                  icon: "circle",
                  top:30,
                  itemGap: 5,
                  itemWidth:10
              },
              xAxis: [
                  {
                      type: 'category',
                      data: ['22', '23', '24', '25', '26', '27'],
                      axisPointer: {
                          type: 'shadow'
                      },
                      splitLine: {
                        show:false,
                      },
                      axisTick: {
                        show: false
                      },
                  }
              ],
              yAxis: [
                  {
                      type: 'value',
                      splitLine: {
                        show:false,
                      },
                      axisTick: {
                        show: false
                      },
                      show:false
                  },
                  {
                      show:false,
                      type: 'value',
                      axisLabel: {
                          formatter: ''
                      }
                  },
              ],
              series: [
                  {
                      name: '咨询人数',
                      type: 'bar',
                      color:'#394858',
                      barWidth:10,
                      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7],
                      itemStyle: {
                      //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                        normal: {
                            //柱形图圆角，初始化效果
                              barBorderRadius:[10, 10, 10, 10]
                        }
                      },
                  },
                  {
                      name: '支付人数',
                      type: 'bar',
                      color:'#ca8516',
                      barWidth:10,
                      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7],
                      itemStyle: {
                      //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                        normal: {
                            //柱形图圆角，初始化效果
                              barBorderRadius:[10, 10, 10, 10]
                        }
                      },
                  },
                  {
                      name: '咨询平均成交额',
                      type: 'line',
                      yAxisIndex: 1,
                      smooth:true,  //这个是把线变成曲线
                      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2]
                  }
              ]
          };
          var mapEcharts = document.getElementById('left3');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        echartMapFn(){
          var nameColor = " rgb(255, 215, 0)"
          var name_fontFamily = '宋体'
          var name_fontSize = 35
          var mapName = 'china'
          var data = [
            {
              name: "陕西",
              value: 145
            },
            {
              name: "甘肃",
              value: 66
            },
            {
              name: "青海",
              value: 24
            },
            {
              name: "北京",
              value: 25
            },
            {
              name: "台湾",
              value: 10000
            },
            {
              name: "新疆",
              value: 10006
            },
            {
              name: "广东",
              value: 10006
            },
          ];
          var geoCoordMap = {};
          /*获取地图数据*/
          var mapFeatures = echarts.getMap(mapName).geoJson.features;
          mapFeatures.forEach(function (v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;
          });
          var max = 480,
            min = 9; // todo 
          var maxSize4Pin = 150,
            minSize4Pin = 20;

          var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value),
                });
              }
            }
            return res;
          };
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                // console.log(params)
                if (typeof (params.value)[2] == "undefined") {
                  return params.name + ' : ' + params.value;
                } else {
                  return params.name + ' : ' + params.value[2];
                }
              }
            },

            legend: {
              orient: 'vertical',
              y: 'bottom',
              x: 'right',
              data: ['credit_pm2.5'],
              textStyle: {
                color: '#fff'
              }
            },
            visualMap: {
              show: false,
              min: 0,
              max: 500,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'], // 文本，默认为数值文本
              calculable: true,
              seriesIndex: [1],
              inRange: {
                // color: ['#3B5077', '#031525'] // 蓝黑
                //   color: ['#ffc0cb', '#800080'] // 红紫
                // color: ['#3C3B3F', '#605C3C'] // 黑绿
                //   color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                // color: ['#23074d', '#cc5333'] // 紫红
                color: ['#00467F', '#A5CC82'] // 蓝绿
                //   color: ['#1488CC', '#2B32B2'] // 浅蓝
                //  color: ['#00467F', '#A5CC82', '#ffc0cb'] // 蓝绿红
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿

              }
            },

            geo: {
              show: true,
              map: mapName,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#ededed',
                  borderColor: '#097bba',
                },
                emphasis: {
                  areaColor: '#2B91B7',
                }
              }
            },
            series: [
              //气泡
              {
                // name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                // symbolSize: function (val) {
                //   return 20;
                // },
                // showEffectOn: 'render',
                rippleEffect: {
                  brushType: 'stroke'
                },
                // hoverAnimation: true,
                // label: {
                //   normal: {
                //     formatter: '{b}',
                //     position: 'right',
                //     show: false //bug：设置为true造成top5的省份名称重影
                //   }
                // },
                itemStyle: {
                  normal: {
                    color: 'red',
                    shadowBlur: 10,
                    shadowColor: 'yellow'
                  }
                },
                zlevel: 1
              },

            ]
          };
              
          var mapEcharts = document.getElementById('mapEcharts');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        right1echartFn(){
          let placeHolderStyle = {
              normal: {
                  color: '#fff',
                  opacity: .1
              },
              emphasis: {
                  color: '#fff',
                  opacity: .1
              }
          }
          let option = {
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} : {c} ({d}%)"
              },
              title: {
                  text: '访客来源',
                  x: 'center',
                  y: 'center',
                  textStyle: {
                      fontWeight: 'normal',
                      fontSize: 13,
                      color: "#333",
                      fontWeight:"bold"
                  }
              },
              series: [{
                  name: '客户经理',
                  type: 'pie',
                  radius: ['30%', '40%'],
                  label: false,
                  startAngle: 180,
                  clockWise: true, //顺时加载
                  hoverAnimation: true,
                  hoverOffset: 3,
                  data: [{
                          value: 300,
                          name: '客户经理',
                          itemStyle:'#b42929'
                      },
                      {
                          value: 400,
                          hoverAnimation: false, //鼠标移入变大
                          itemStyle: placeHolderStyle
                      }

                  ]
              }, {
                  name: '发货人',
                  type: 'pie',
                  radius: ['45%', '55%'],
                  label: false,
                  startAngle: 180,
                  clockWise: true,
                  hoverAnimation: true,
                  hoverOffset: 3,
                  data: [{
                          value: 600,
                          name: '发货人',
                          itemStyle: "#ca8516",
                          // itemStyle: {
                          //     color: { // 完成的圆环的颜色
                          //         colorStops: [{
                          //             offset: 0,
                          //             color: '#A568FF' // 0% 处的颜色
                          //         }, {
                          //             offset: 1,
                          //             color: '#006CFF' // 100% 处的颜色
                          //         }]
                          //     }
                          // }
                      },
                      {
                          value: 900,
                          hoverAnimation: false,
                          itemStyle: placeHolderStyle
                      }
                  ]
              }, {
                  name: '收货人',
                  type: 'pie',
                  radius: ['60%', '70%'],
                  label: false,
                  startAngle: 180,//从哪里开始
                  clockWise: true,
                  hoverAnimation: true,
                  hoverOffset: 3,
                  data: [{
                          value: 1000,
                          name: '收货人',
                          itemStyle: "#394858",
                      },
                      {
                          value: 500,
                          hoverAnimation: false,
                          itemStyle: placeHolderStyle
                      }
                  ]
              } ]
          };
          var mapEcharts = document.getElementById('right1');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        right2echartFn(){
          let testData = [
            {
                name: "window10",
                value: 41.52,
            },
            {
                name: "mac",
                value: 41.52,
            },
            {
                name: "android",
                value: 41.52,
            },
            {
                name: "ios",
                value: 9.51,
            }, {
                name: "window7",
                value: 10.5,
                itemStyle: {
                    color: {
                        type: 'linear',
                        colorStops: [{
                            offset: 0,
                            color: '#FFBF4A' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#FFBF4A' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                },
            },
          ]
          let option = {
            calculable: false,
            tooltip: {},
            series: [{
                type: 'treemap',
                left: '0',
                right: '0',
                top: '0',
                bottom: 'o',
                label: {
                    show: true,
                    formatter: '{b}',
                    fontSize: 17,
                    ellipsis: true
                },
                breadcrumb: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        //borderColor: '#EFEFEF',
                        borderColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#F8F8F8' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#EFEFEF' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                    }
                },
                data: testData,
                roam: false,
                nodeClick: false,
                breadcrumb: {
                    show: false
                },
            }]
          } 
          var mapEcharts = document.getElementById('right2');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        },
        right3echartFn(){
          let dataArr =[];
          for(let i=0; i<100; i++){
              dataArr.push({
                  name: " 没有",
                  value: 30,
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
          var mapEcharts = document.getElementById('right3');
          let node = echarts.init(mapEcharts);
          node.setOption(option)
        }
    }
}
</script>
<style lang="scss" scoped>
  .echartDemo1{
    display:flex;
    div{
      box-sizing: border-box;
    }
    p.titleStyle{
      padding-left: 0.5rem;
      padding-top: 0.5rem;
      position: absolute;
      font-weight: bold;
      font-size: 0.7rem;
    }
    p.systemText{
      height:15%;
      padding:0 0.5rem;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 0.7rem;
      line-height: 1.8rem;
    }
    .left{
      position:fixed;
      left:0;
      width:24vw;
      >div:nth-child(1){
        width:100%;
        height:32.33vh;
        border:1px solid #ededed;
      }
      >div:nth-child(2){
        width:100%;
        height:32.33vh;
        border:1px solid #ededed;
        margin-top:1vh;
      }
      >div:nth-child(3){
        width:100%;
        height:32.33vh;
        margin-top:1vh;
        border:1px solid #ededed;
      }
    }
    .center{
      position:fixed;
      left:25vw;
      width:50vw;
      >div:nth-child(1){
        width:100%;
        height:32.33vh;
        border-bottom:1px solid #ededed;
        >div{
          display: flex;
          flex-wrap: wrap;
          position: relative;
          top:1.5rem;
          >div{
            width:33.333%;
            text-align: center;
            margin-top:0.75rem;
            >p:nth-child(1){
              font-size:0.6rem;
              // position: relative;
              // right: 1.25rem;
            }
            >p:nth-child(2){
              color:#cc881c;
              font-size: 1rem;
              margin-top:0.25rem;
            }
          }
        }
      }
      >div:nth-child(2){
        width:100%;
        height:66.66vh;
      }
    }
    .right{
      position: fixed;
      right: 0;
      width:24vw;
        .systemBox{
          >div:nth-child(3){
            width:100%;
            height:15%;
            text-align: center;
            span{
              font-size: 0.5rem;
              padding: 0.25rem 1rem;
              color:#fff;
              background: #3390ff;
              border-radius: 0.15rem;
              cursor: pointer;
            }
          }
        }
      >div:nth-child(1){
        width:100%;
        height:32.33vh;
        border:1px solid #ededed;
      }
      >div:nth-child(2){
        margin-top:1vh;
        width:100%;
        height:32.33vh;
        border:1px solid #ededed;
      }
      >div:nth-child(3){
        margin-top:1vh;
        width:100%;
        height:32.33vh;
        border:1px solid #ededed;
      }
    }
  }
</style>



<template>
    <div class="echartDemo3">
      <div class="top">111</div>
      <div class="left">
        <div>1111</div>
        <div>222</div>
        <div>3333</div>
      </div>
      <div class="right">
        <div>111</div>
        <div>222</div>
        <div>333</div>
        <div>444</div>
        <div>555</div>
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
        },
    }
}
</script>
<style lang="scss" scoped>
  .echartDemo3{
    .top{
      height:10vh;
      border-bottom:1px solid #ededed;
      box-sizing: border-box;
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
      >div:last-child{
        width:100%;
      }
    }
  }
</style>



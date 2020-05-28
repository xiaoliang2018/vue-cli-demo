<style lang="less" scoped>
  @windowWidth:1280px;
  .twoBoxCnt{
    display:flex;
    flex-wrap: wrap;
    >div{
      width: 23%;
      margin: 0 1%;
      padding: 0.25rem 0px;
      border: 1px solid #f3f3f3;
      box-sizing: border-box;
      text-align: center;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }
    >div.active{
      border:1px solid red;
    }
  }
  .selectQueryCnt{

    .one{
      width:@windowWidth;
      margin:0 auto;
      >p{
        font-size: 0.75rem;
        padding:0.5rem 0;
      }
      >div{
        display: flex;
        >.left{
          width:10%;
          padding:0.5rem;
          box-sizing: border-box;
          font-size:0.8rem;
          background:#f3f3f3;
        }
        >.center{
          width:85%;
          display: flex;
          flex-flow: wrap;
          >div{
            // width:6.5%;
            width:4rem;
            border:1px solid #f3f3f3;
            cursor: pointer;
            img{
              width:100%;
            }
          }
          >div.active{
            border:1px solid red;
          }
        }
        >.right{
          width:5%;
          >div{
            font-size:0.65rem;
            border:1px solid #f3f3f3;
            padding:0.2rem 0;
            text-align: center;
            cursor: pointer;
          }
          >div.allAcitve{
            border:1px solid red;
          }

        }
      }


    }
    .two{
      width:@windowWidth;
      margin:0 auto;
      >p{
        font-size: 0.75rem;
        padding:0.5rem 0;
      }
      >div:nth-child(2){
        display: flex;
        border-bottom:1px solid #eee;
        padding-bottom:0.5rem;
        >.left{
          width:10%;
          padding:0.5rem;
          box-sizing: border-box;
          font-size:0.7rem;
          // background:#f3f3f3;
        }
        >.right{
          width:90%;
          display: flex;
          >div{
            margin-left:1rem;
          }
          >div:nth-child(3){
            >span.spanButtton{
              display: inline-block;
              font-size: 0.7rem;
              border:1px solid #c6e2ff;
              // border-right:none;
              color:#606266;
              padding:5px 0.5rem;
              position: relative;
              top: 1px;
              cursor: pointer;
            }
            >span.spanButtton.active{
              border:1px solid red;
            }
          }
        }
      }
      >div:nth-child(3){
        display: flex;
        margin-top:0.5rem;
        border-bottom:1px solid #eee;
        padding-bottom:0.5rem;
        >.left{
          width:10%;
          padding:0.5rem;
          box-sizing: border-box;
          font-size:0.7rem;
          // background:#f3f3f3;
        }
        >.right{
          width: 90%;
          display: flex;
          height: 2rem;
          line-height: 2rem;
          >div{
            >span{
              cursor: pointer;
              font-size: 0.7rem;
              border: 1px solid #c6e2ff;
              color: #606266;
              padding: 5px 0.5rem;
              margin-left:0.5rem;
            }
            >span.active{
              border:1px solid red;
            }
          }
        }
      }
      >div:nth-child(4){
        display: flex;
        margin-top:0.5rem;
        border-bottom:1px solid #eee;
        padding-bottom:0.5rem;
        margin-bottom:1rem;
        >.left{
          width:10%;
          padding:0.5rem;
          box-sizing: border-box;
          font-size:0.7rem;
          // background:#f3f3f3;
        }
        >.right{
          width: 90%;
          height: 2rem;
          line-height: 2rem;
        }
      }
    }
  }
</style>

<template>
   <div class="selectQueryCnt">
     
     <div class="one">
       <p>查询条件</p>
       <div>
        <div class="left">品牌</div>
        <div class="center">
          <div v-for="(item,index) in oneDataList" :key="index" 
          :class="oneActiveIndex.includes(index) ? 'active' : ''" @click="onequeryActive(index)">
            <img :src="item.image" alt="">
          </div>
        </div>
        <div class="right">
          <div @click="toggleIsAll" :class="isAllActive ? 'allAcitve' : ''">是否多选</div>
        </div>
       </div>

     </div>
     <div class="two">
       <p>高级选项{{oneActiveIndex}}</p>
       <div>
         <div class="left">分组显示</div>
         <div class="right">
           <div>
            <el-select v-model="twoValue1" placeholder="请选择">
              <el-option
                v-for="item in twoOptions1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
           </div>
           <div>
            <el-select v-model="twoValue2" placeholder="请选择">
              <el-option
                v-for="item in twoOptions2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
           </div>
           <div>
            <span @click="marketAll" :class="marketIsAll ? 'spanButtton active' : 'spanButtton'">Market</span>
            <el-popover
              placement="bottom"
              width="400"
              trigger="click">
              <div class="twoBoxCnt">
                <div :class="twoActiveIndex.includes(index) ? 'active' : ''" @click="twoqueryActive(index)" v-for="(item,index) in twoBoxDataList" :key="index">{{item.name}}</div>
              </div>
              <el-button slot="reference"><i class="el-icon-bottom"></i></el-button>
            </el-popover>
           </div>
         </div>
       </div>
       <div>
         <div class="left">统计指标</div>
         <div class="right">
           <div @click="statisticsIndex(index)" v-for="(item,index) in twoDataList2" :key="index">
             <span :class="index==twoActiveIndex2? 'active':''">{{item.name}}</span>
           </div>
         </div>
       </div>
       <div>
         <div class="left">多选</div>
         <div class="right">    
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="Spending"></el-checkbox>
              <el-checkbox label="CPUV"></el-checkbox>
              <el-checkbox label="Market"></el-checkbox>
              <el-checkbox label="Cpm"></el-checkbox>
              <el-checkbox label="CPC"></el-checkbox>
            </el-checkbox-group>
         </div>
       </div>
       <div>
         <el-button type="default">查询</el-button>
       </div>
     </div>
       
   </div>
</template>
<script>
export default {
    data(){
      return{
        oneDataList:[
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
          {image:require('./../assets/logo.png')},
        ],
        oneActiveIndex:[0],  //one当前选了多少个的数组
        isAllActive:false,  //one数据单选和多选的切换
        twoBoxDataList:[ //下拉框内容列表
          {name:'内容1'},
          {name:'内容2'},
          {name:'内容3'},
          {name:'内容4'},
          {name:'内容5'},
          {name:'内容6'},
          {name:'内容7'}
        ],
        twoActiveIndex:[], //two当前选了多少个的数组
        marketIsAll:false, //分组显示market是否全选的状态
        twoOptions1:[{
          value: 'Campaign',
          label: 'Campaign'
        }],
        twoValue1:'Campaign',
        twoOptions2:[{
          value: 'PDB/PD',
          label: 'PDB/PD'
        }],
        twoValue2:'PDB/PD',
        twoDataList2:[
          {name:"Spending"},
          {name:"CPUV"},
          {name:"IVT"}
        ],
        twoActiveIndex2:"0",//统计指标当前选择索引
        checkList:[]
      }
    },
    methods:{
      onequeryActive(index){ //one当前选择了什么
        let isAllActive = this.isAllActive;
        if(isAllActive){
          // console.log(this.oneActiveIndex);
          if(this.oneActiveIndex.includes(index)){ //多选切换
            // console.log('未选中')
            for(let i=0; i<this.oneActiveIndex.length; i++){
              if(index == this.oneActiveIndex[i]){
                this.oneActiveIndex.splice(i,1);
              }
            }
          }else{
            // console.log('选中');
            this.oneActiveIndex.push(index);
          }
          // console.log('多选')
        }else{
          this.oneActiveIndex = [];
          this.oneActiveIndex.push(index);
          // console.log('单选')
        }
      },
      toggleIsAll(){ //多选与单选的切换
        this.isAllActive = !this.isAllActive;
        this.oneActiveIndex = [];
      },
      twoqueryActive(index){//two当前选择了什么
        if(this.twoActiveIndex.includes(index)){ //多选切换
          for(let i=0; i<this.twoActiveIndex.length; i++){
            if(index == this.twoActiveIndex[i]){
              this.twoActiveIndex.splice(i,1);
            }
          }
          this.marketIsAll = false;
        }else{
          this.twoActiveIndex.push(index);
          if(this.twoBoxDataList.length == this.twoActiveIndex.length){
            this.marketIsAll = true;
          }
        }
      },
      marketAll(){ //市场选择操作
        this.marketIsAll = !this.marketIsAll;
        if(this.marketIsAll){
          for(let i=0; i<this.twoBoxDataList.length; i++){
            this.twoActiveIndex.push(i)
          }
        }else{
          this.twoActiveIndex = [];
        }
      },
      statisticsIndex(index){ //统计指标单选
        this.twoActiveIndex2 = index;
      }

    }
}
</script>


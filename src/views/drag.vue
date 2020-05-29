<template>
    <div class="dragCnt">
      <div class="container">
        <div class="topSelect">
            <ul id="ul1" data-type="top">
              <li v-for="(item,index) in topData" :key="index"><span>{{item.name}}</span></li>
            </ul>
        </div>
        <div class="leftSelect">
          <ul id="ul2" data-type="left">
            <div v-for="(item,index) in leftData" :key="index">
              <li>
                <span>{{item.name}}</span>
              </li>
              <div>
                <el-button class="showDialog" size="small" @click="selectLeftCondFn(item,index)">选择条件</el-button>
              </div>
            </div>
          </ul>
        </div>
        <div class="bottomCnt">
          <ul class="content">
            <div>
              <el-button v-for="(item,index) in leftDialogList" :key="index" 
              @click="selectLeftCondFn(item,index)">
                {{item.name}}的弹出框
              </el-button>
            </div>
            <li class="tagList" v-for="(item,index) in bottomTagData" :key="index" data-type="top">
              <span>{{item.name}}</span>
              <span title='取消' class='tagClose' @click="closeFn(item,index)">×</span>
            </li>

            <!-- <hr>
            <div>
              <p>请求的条件</p>
              <div>
                <span v-for="(item,index) in updateData" :key="index">{{item}}</span>
              </div>
            </div> -->
          </ul>
        </div>
      </div>

      <el-dialog
        title="选择条件"
        :visible.sync="dialogVisible"
        :show-close="false"
        width="30%">
        <div v-if="okSelectData.length != 0">
          <el-checkbox-group v-model="okSelectData.optipns.selectCondition">
            <el-checkbox :label="item" v-for="(item,index) in okSelectData.optipns.condition" :key="index"></el-checkbox>
          </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="checkboxOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>


<script>
  export default {
      data(){
          return{
            dialogVisible:false,
            leftData:[  //左边数据
              {
                name:'a',
                type:'left',
                optipns: {name:'条件',condition:['aa','aaa','aaaa','aaaaa'],selectCondition:[]} //selectCondition 已选择的条件
              },
              {
                name:'b',
                type:'left',
                optipns: {name:'条件',condition:['bb','bbb','bbbb','bbbbb'],selectCondition:[]} //selectCondition 已选择的条件
              },
            ],
            leftDialogList:[],
            topData:[ //上边数据
              {
                name:'1',
                optipns:{name:'条件',type:'top',condition:['11']}
              },
              {
                name:'2',
                optipns: {name:'条件',type:'top',condition:['22']}
              },
              {
                name:'3',
                optipns: {name:'条件',type:'top',condition:['33']}
              },
            ],
            bottomTagData:[
              // {name:'111',type:'top',options:[{name:'条件',condition:['11']}]},
              // {name:'222',type:'left',options:[{name:'条件',condition:['aa','aaa','aaaa','aaaaa']}]}
            ],
            okSelectData:[],//确定选择时候的数据
            class_name : null,  //允许放置的容器
            permitDrag : false,	//是否允许移动标识
            _x : 0,             //节点x坐标
            _y : 0,			    //节点y坐标
            _left : 0,          //光标与节点坐标的距离
            _top : 0,           //光标与节点坐标的距离
            old_elm : null,     //拖拽原节点
            tmp_elm : null,     //跟随光标移动的临时节点
          }
      },
      methods:{
        // handleClose(){
        //   this.dialogVisible = false;
        // },
        dragInit(className){
            //允许拖拽节点的父容器的classname(可按照需要，修改为id或其他)
            let self = this;
            self.class_name = className;
            //监听鼠标按下事件，动态绑定要拖拽的节点（因为节点可能是动态添加的）
            $('.' + self.class_name).on('mousedown', ' #ul1 li,#ul2 li', function(event){
                //当在允许拖拽的节点上监听到点击事件，将标识设置为可以拖拽
                self.permitDrag = true;
                //获取到拖拽的原节点对象
                self.old_elm = $(this);
                //执行开始拖拽的操作
                self.mousedown(event);
                return false;
            });

            //监听鼠标移动
            $(document).mousemove(function(event){
                //判断拖拽标识是否为允许，否则不进行操作
                if(!self.permitDrag) return false;
                //执行移动的操作
                self.mousemove(event);
                return false;
            });

            //监听鼠标放开
            $(document).mouseup(function(event){
                //判断拖拽标识是否为允许，否则不进行操作
                if(!self.permitDrag) return false;
                //拖拽结束后恢复标识到初始状态
                self.permitDrag = false;
                //执行拖拽结束后的操作
                self.mouseup(event);
                return false;
            });

        },
        //按下鼠标 执行的操作
        mousedown (event){
              //1.克隆临时节点，跟随鼠标进行移动
              this.tmp_elm = $(this.old_elm).clone();

              //2.计算 节点 和 光标 的坐标
              this._x = $(this.old_elm).offset().left;
              this._y = $(this.old_elm).offset().top;

              let e = event || window.event;
              this._left = e.pageX - this._x;
              this._top = e.pageY - this._y;

              //3.修改克隆节点的坐标，实现跟随鼠标进行移动的效果
              $(this.tmp_elm).css({
                  'position' : 'absolute',
                  'background-color' : '#FF8C69',
                  'zIndex':'999',
                  'left' : this._x,
                  'top' : this._y,
              });

              //4.添加临时节点
              let tmp = $(this.old_elm).parent().append(this.tmp_elm);
              this.tmp_elm = $(tmp).find(this.tmp_elm);
              $(this.tmp_elm).css('cursor', 'move');

        },
        //移动鼠标 执行的操作
        mousemove (event){
              let self = this;
              //2.计算坐标
              let e = event || window.event;
              let x = e.pageX - self._left;
              let y = e.pageY - self._top;
              let maxL = $(document).width() - $(self.old_elm).outerWidth();
              let maxT = $(document).height() - $(self.old_elm).outerHeight();
              //不允许超出浏览器范围
              x = x < 0 ? 0: x;
              x = x > maxL ? maxL: x;
              y = y < 0 ? 0: y;
              y = y > maxT ? maxT: y;

              //3.修改克隆节点的坐标
              $(self.tmp_elm).css({
                  'left' : x,
                  'top' : y,
              });

              //判断当前容器是否允许放置节点
              $.each($('.' + self.class_name + ' ul'), function(index, value){

                  //获取容器的坐标范围 (区域)
                  let box_x = $(value).offset().left;     //容器左上角x坐标
                  let box_y = $(value).offset().top;      //容器左上角y坐标
                  let box_width = $(value).outerWidth();  //容器宽
                  let box_height = $(value).outerHeight();//容器高
                  if($(value).data('type') != undefined){  //禁止上左修改背景颜色
                    return;
                  }
                  //给可以放置的容器加背景色
                  if(e.pageX > box_x && e.pageX < box_x-0+box_width && e.pageY > box_y && e.pageY < box_y-0+box_height){
                      //判断是否不在原来的容器下（使用坐标进行判断：x、y任意一个坐标不等于原坐标，则表示不是原来的容器）
                      if($(value).offset().left !== self.old_elm.parent().offset().left 
                      || $(value).offset().top !== self.old_elm.parent().offset().top){
                          $(value).css('background-color', '#FFEFD5');
                      }
                  }else{
                      //恢复容器原背景色
                      $(value).css('background-color', '#fff');
                  }

              });

        },
        //放开鼠标 执行的操作
        mouseup (event){
          let self = this;
            //移除临时节点
            $(self.tmp_elm).remove();

            //判断所在区域是否允许放置节点
            let e = event || window.event;
          
            $.each($('.' + self.class_name + ' ul'), function(index, value){
                //获取容器的坐标范围 (区域)
                let box_x = $(value).offset().left;     //容器左上角x坐标
                let box_y = $(value).offset().top;      //容器左上角y坐标
                let box_width = $(value).outerWidth();  //容器宽
                let box_height = $(value).outerHeight();//容器高
                if($(value).data('type') != undefined){ //禁止上左互相赋值
                  return;
                }
                //判断放开鼠标位置是否想允许放置的容器范围内
                if(e.pageX > box_x && e.pageX < box_x-0+box_width && e.pageY > box_y && e.pageY < box_y-0+box_height){

                    //判断是否不在原来的容器下（使用坐标进行判断：x、y任意一个坐标不等于原坐标，则表示不是原来的容器）
                    if($(value).offset().left !== self.old_elm.parent().offset().left 
                    || $(value).offset().top !== self.old_elm.parent().offset().top){
                        //向目标容器添加节点并删除原节点
                        if($(self.old_elm).parent().data('type') == undefined){ //左边的布局
                          let type = $(self.old_elm).parent().parent().data('type');  //获取用户类型
                          // let inText = $(self.old_elm).find("span").html();
                          let index = $(self.old_elm).parent().index();
                          self.bottomTagData.push(self.leftData[index]);
                          self.leftDialogList.push(self.leftData[index])
                          self.updateAjaxData(self.leftData,index);  //左边需要提交到后端的数据
                          self.leftData.splice(index,1)
                        }else{
                          let type = $(self.old_elm).parent().data('type');  //获取用户类型
                          // let inText = $(self.old_elm).find("span").html();
                          let index = $(self.old_elm).index();
                          self.bottomTagData.push(self.topData[index]);
                          self.updateAjaxData(self.topData,index);  //上面需要提交到后端的数据
                          self.topData.splice(index,1)
                        }
                        // drag.upData($(drag.old_elm).context.innerHTML); //移动了什么东西出去
                        //获取新添加节点的对象
                        // drag.new_elm = $(newObj).find(tmp);
                    }
                }
                //恢复容器原背景色
                $(value).css('background-color', '#fff');
            });

        },
        closeFn(item,index){  //关闭标签
          if(item.optipns.type == 'top'){  //属于头部的标签
            this.topData.push(item);
          }else{ //属于左边的标签
            this.leftData.push(item);
          }
          this.bottomTagData.splice(index,1);
          this.leftDialogList.splice(index,1);
        },
        updateAjaxData(data,index){//需要发送的数据
          // console.log(data[index],index);
          this.serachAJAX(data[index]);
          // let updateData = this.updateData;
          // updateData.push(data[index]);
        },
        //打开dialog
        selectLeftCondFn(item,index){
          // this.dialogCondCheckboxs = item.optipns.condition; //赋值
          this.okSelectData = item;
          this.dialogVisible = true;
        },
        //确定dialog
        checkboxOk(){
          //判断是否拉进去了 是否立即加载数据进去
          let isInSerach = false;
          let okSelectData = this.okSelectData;
          this.bottomTagData.forEach((item,index) => {
            if(item.name == okSelectData.name){
              isInSerach = true;
            }
          });

          if(isInSerach){//立即搜索
            this.serachAJAX(this.okSelectData)
            // console.log('立即搜索');
          }

          //先拿到他的是哪里来的 选择了什么
          // console.log(this.okSelectData);

          this.dialogVisible = false;
        },
        serachAJAX(item){
          if(item.optipns.type == 'top'){  //上面拉入
            console.log(`追加条件：${item.optipns.name}：${item.optipns.condition}`)
          }else{  //左边拉入
            console.log(`追加条件：${item.optipns.name}：${item.optipns.selectCondition}`)
          }
          
        }
      },
      beforeRouteLeave(to, form, next){
        window.location.reload();
        next();
      },
      mounted(){
        let self = this;
        $(function(){
            //出入允许拖拽节点的父容器，一般是ul外层的容器
            self.dragInit('container');
        });
      }
  }
</script>


<style lang="less">
  .dragCnt{
      .container {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        .topSelect{
            position: fixed;
            height:10vh;
            top:0;
            width: 100vw;
            border-bottom:1px solid red;
            box-sizing: border-box;
            >ul{
              li{
                display: block;
                float: left;
                width: 5rem;
                margin: 0 auto;
                border-radius: 4px;
                margin: 0;
                padding: 0;
                padding: 0 0.5rem;
                box-sizing: border-box;
                list-style: none;
                background-color: #EED2EE;
                color: #555;
              }
            }
        }
        .leftSelect{
            // position: fixed;
            width:15vw;
            // left:0;
            // top:10vh;
            margin-top:10vh;
            box-sizing: border-box;
            padding: 1rem;
            display: block;
            border-right:1px solid red;
            height:90vh;
            ul{
              >div{
                // display: flex;
                margin-bottom:0.5rem;
                li{
                  display: block;
                  float: left;
                  width: 5rem;
                  margin:0 auto;
                  height: 1.75rem;
                  line-height: 1.75rem;
                  border-radius: 4px;
                  margin: 0;
                  padding: 0;
                  padding:0 0.5rem;
                  box-sizing: border-box;
                  list-style: none;
                  background-color:#EED2EE;
                  color: #555;
                  // position:relative;
                  .showDialog{
                    // display: inline-block;
                    // width: 2rem;
                    // height: 2rem;
                    // font-size: 0.6rem;
                  }
                }
              }
            }
        }
        .bottomCnt{
          display: flex;
          position: fixed;
          width:85vw;
          left:15vw;
          top:10vh;
          z-index: -1;
          ul.content{
            width:85vw;
            height:90vh;
            box-sizing: border-box;
            li{
              display: block;
              float: left;
              width: 5rem;
              margin: 0 auto;
              border-radius: 4px;
              margin: 0;
              padding: 0;
              padding: 0 0.5rem;
              box-sizing: border-box;
              list-style: none;
              background-color: #EED2EE;
              color: #555;
            }
          }
        }
      }
      .tagList{
          position: relative;
          .tagClose{
            position:absolute;
            right:0;
            background:red;
            cursor: pointer;
          }
      }
  }

</style>
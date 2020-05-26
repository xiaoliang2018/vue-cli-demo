<template>
    <div class="dragCnt">
      <div class="container">
        <ul id="ul1" data-type="top" class="topSelect">
          <li><span>a</span></li>
          <li><span>B</span></li>
          <li><span>C</span></li>
          <li><span>e</span></li>
          <li><span>f</span></li>
          <li><span>g</span></li>
        </ul>
        <div class="bottomCnt">
          <ul id="ul2" data-type="left" class="leftSelect">
            <div v-for="(item,index) in leftData" :key="index">
              <li>
                <span>{{item.name}}</span>
              </li>
              <span class="showDialog">打开弹框</span>
            </div>
            <!-- <li><span>B</span></li>
            <li><span>C</span></li>
            <li><span>e</span></li>
            <li><span>f</span></li>
            <li><span>g</span></li> -->
          </ul>
          <ul class="content">
          </ul>
        </div>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>


<script>
  //拖拽
  let drag = {

      class_name : null,  //允许放置的容器
      permitDrag : false,	//是否允许移动标识

      _x : 0,             //节点x坐标
      _y : 0,			    //节点y坐标
      _left : 0,          //光标与节点坐标的距离
      _top : 0,           //光标与节点坐标的距离

      old_elm : null,     //拖拽原节点
      tmp_elm : null,     //跟随光标移动的临时节点
      // new_elm : null,     //拖拽完成后添加的新节点

      //初始化
      init : function (className){
          //允许拖拽节点的父容器的classname(可按照需要，修改为id或其他)
          drag.class_name = className;
          //监听鼠标按下事件，动态绑定要拖拽的节点（因为节点可能是动态添加的）
          $('.' + drag.class_name).on('mousedown', ' #ul1 li,#ul2 li', function(event){
              //当在允许拖拽的节点上监听到点击事件，将标识设置为可以拖拽
              drag.permitDrag = true;
              //获取到拖拽的原节点对象
              drag.old_elm = $(this);
              //执行开始拖拽的操作
              drag.mousedown(event);
              return false;
          });

          //监听鼠标移动
          $(document).mousemove(function(event){
              //判断拖拽标识是否为允许，否则不进行操作
              if(!drag.permitDrag) return false;
              //执行移动的操作
              drag.mousemove(event);
              return false;
          });

          //监听鼠标放开
          $(document).mouseup(function(event){
              //判断拖拽标识是否为允许，否则不进行操作
              if(!drag.permitDrag) return false;
              //拖拽结束后恢复标识到初始状态
              drag.permitDrag = false;
              //执行拖拽结束后的操作
              drag.mouseup(event);
              return false;
          });

      },

      //按下鼠标 执行的操作
      mousedown : function (event){

            //1.克隆临时节点，跟随鼠标进行移动
            drag.tmp_elm = $(drag.old_elm).clone();

            //2.计算 节点 和 光标 的坐标
            drag._x = $(drag.old_elm).offset().left;
            drag._y = $(drag.old_elm).offset().top;

            var e = event || window.event;
            drag._left = e.pageX - drag._x;
            drag._top = e.pageY - drag._y;

            //3.修改克隆节点的坐标，实现跟随鼠标进行移动的效果
            $(drag.tmp_elm).css({
                'position' : 'absolute',
                'background-color' : '#FF8C69',
                'left' : drag._x,
                'top' : drag._y,
            });

            //4.添加临时节点
            let tmp = $(drag.old_elm).parent().append(drag.tmp_elm);
            drag.tmp_elm = $(tmp).find(drag.tmp_elm);
            $(drag.tmp_elm).css('cursor', 'move');

      },

      //移动鼠标 执行的操作
      mousemove : function (event){
            //2.计算坐标
            var e = event || window.event;
            var x = e.pageX - drag._left;
            var y = e.pageY - drag._top;
            var maxL = $(document).width() - $(drag.old_elm).outerWidth();
            var maxT = $(document).height() - $(drag.old_elm).outerHeight();
            //不允许超出浏览器范围
            x = x < 0 ? 0: x;
            x = x > maxL ? maxL: x;
            y = y < 0 ? 0: y;
            y = y > maxT ? maxT: y;

            //3.修改克隆节点的坐标
            $(drag.tmp_elm).css({
                'left' : x,
                'top' : y,
            });

            //判断当前容器是否允许放置节点
            $.each($('.' + drag.class_name + ' ul'), function(index, value){

                //获取容器的坐标范围 (区域)
                var box_x = $(value).offset().left;     //容器左上角x坐标
                var box_y = $(value).offset().top;      //容器左上角y坐标
                var box_width = $(value).outerWidth();  //容器宽
                var box_height = $(value).outerHeight();//容器高
                // console.log(event.target.parentNode.dataset.type,'drag.class_name')
                if($(value).data('type') != undefined){  //禁止上左修改背景颜色
                  return;
                }
                //给可以放置的容器加背景色
                if(e.pageX > box_x && e.pageX < box_x-0+box_width && e.pageY > box_y && e.pageY < box_y-0+box_height){
                    //判断是否不在原来的容器下（使用坐标进行判断：x、y任意一个坐标不等于原坐标，则表示不是原来的容器）
                    if($(value).offset().left !== drag.old_elm.parent().offset().left 
                    || $(value).offset().top !== drag.old_elm.parent().offset().top){
                        $(value).css('background-color', '#FFEFD5');
                    }
                }else{
                    //恢复容器原背景色
                    $(value).css('background-color', '#FFFFF0');
                }

            });

      },

      //放开鼠标 执行的操作
      mouseup : function (event){
          //移除临时节点
          $(drag.tmp_elm).remove();

          //判断所在区域是否允许放置节点
          var e = event || window.event;
        
          $.each($('.' + drag.class_name + ' ul'), function(index, value){
              //获取容器的坐标范围 (区域)
              var box_x = $(value).offset().left;     //容器左上角x坐标
              var box_y = $(value).offset().top;      //容器左上角y坐标
              var box_width = $(value).outerWidth();  //容器宽
              var box_height = $(value).outerHeight();//容器高
              if($(value).data('type') != undefined){ //禁止上左互相赋值
                return;
              }
              //判断放开鼠标位置是否想允许放置的容器范围内
              if(e.pageX > box_x && e.pageX < box_x-0+box_width && e.pageY > box_y && e.pageY < box_y-0+box_height){

                  //判断是否不在原来的容器下（使用坐标进行判断：x、y任意一个坐标不等于原坐标，则表示不是原来的容器）
                  if($(value).offset().left !== drag.old_elm.parent().offset().left 
                  || $(value).offset().top !== drag.old_elm.parent().offset().top){
                      //向目标容器添加节点并删除原节点
                      if($(drag.old_elm).parent().data('type') == undefined){ //左边的布局
                        let type = $(drag.old_elm).parent().parent().data('type');  //获取用户类型
                        var tmp = "<li class='tagList' data-type="+type+"><span>"+  $(drag.old_elm).context.innerHTML +"</span><span title='取消' class='tagClose'>×</span></li>";
                        var newObj = $(value).append(tmp);
                        $(drag.old_elm).parent().remove();
                      }else{
                        let type = $(drag.old_elm).parent().data('type');  //获取用户类型
                        var tmp = "<li class='tagList' data-type="+type+"><span>"+  $(drag.old_elm).context.innerHTML +"</span><span title='取消' class='tagClose'>×</span></li>";
                        var newObj = $(value).append(tmp);
                        $(drag.old_elm).remove();
                      }
                      // drag.upData($(drag.old_elm).context.innerHTML); //移动了什么东西出去
                      //获取新添加节点的对象
                      // drag.new_elm = $(newObj).find(tmp);
                  }
              }
              //恢复容器原背景色
              $(value).css('background-color', '#FFFFF0');
          });

      }
  };
  export default {
      data(){
          return{
            dialogVisible:false,
            leftData:[
              {name:'a',optipns:['aa','aaa','aaaa','aaaaa']},
              {name:'b',optipns:['bb','bbb','bbbb','bbbbb']}
            ]
          }
      },
      methods:{
        handleClose(){
          console.log('111')
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
            drag.init('container');
            $(document).on("click",".tagList .tagClose",function(event){
                let _this = $(this);
                let text = _this.parent().find("span").eq(0).text();
                let type = _this.parent().data("type");
                // console.log(type,'typetype')
                if(type == 'top'){
                  $(".container #ul1").html($(".container #ul1").html() + '<li><span>'+text+'</span></li>');
                }else if(type == 'left'){
                  $(".container #ul2").html($(".container #ul2").html() + '<div><li><span>'+text+'</span></li><span class="showDialog">打开弹框</span></div>');
                }
                // console.log(nodeStr,'nodeStr')
               
                _this.parent().remove();
            })
            $(document).on("click",".showDialog",function(){
              self.dialogVisible = true;
            })
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
        ul{
          width:15vw;
          box-sizing: border-box;
          padding: 1rem;
          background-color:#FFFFF0;
          display: block;
          li{
            display: block;
            float: left;
            width: 10vw;
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
            margin-bottom:0.5rem;
            -moz-user-select: none;
            user-select: none;
            color: #555;
          }
        }
        ul.content{
          width:85vw;
          height:90vh;
          box-sizing: border-box;
        }
        .topSelect{
          width:100vw;
          height:10vh;
          border-bottom:1px solid red;
        }
        .bottomCnt{
          display: flex;
          .leftSelect{
            border-right:1px solid red;
            height:90vh;
            >div{
              display: flex;
              >li{
                position: relative;
              }
              .showDialog{
                display: inline-block;
                width: 2rem;
                height: 2rem;
                font-size: 0.6rem;
              }
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
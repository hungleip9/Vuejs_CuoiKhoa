<template> 
<div class="main">     
        <div class="card">
          <h1>hello</h1>
          <div class="list-card u-fancy-scrollbar" id="style-3">
            <draggable v-model="myArray" ghost-class="ghost" @start="drag=true" @end="drag=false">
            <transition-group>
                <div class="sortable" v-for="element in myArray" :key="element.id" @click="centerDialogVisible = true">
                    {{element.name}}
                </div>
               
            </transition-group>
            </draggable>           
          </div>
           <div class="add-card" slot="footer">
                  <i class="el-icon-plus"></i>Thêm mới
            </div>          
        </div>

        <div class="card">
          <h1>hello2</h1>
          <div class="list-card u-fancy-scrollbar" id="style-3">
            <draggable v-model="myArray" ghost-class="ghost" @start="drag=true" @end="drag=false">
            <transition-group>
                <div class="sortable" v-for="element in myArray" :key="element.id">
                    {{element.name}}
                </div>
               
            </transition-group>
            </draggable>           
          </div>
           <div class="add-card" slot="footer">
                  <i class="el-icon-plus"></i>Thêm mới
            </div>          
        </div>

        <!-- <el-button type="text" @click="centerDialogVisible = true">Click to open the Dialog</el-button> -->
      <el-dialog
        title="test dialog"
        :visible.sync="centerDialogVisible"
        :modalAppendToBody="false"
        :custom-class="dialog-test"
        width="768px">
        <el-row>
          <el-col :span="14">
            <div class="right">
              <div><i class="el-icon-share"></i>Mô tả</div>
              <div>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="Thêm mô tả chi tiết hơn..."
                  v-model="textarea2">
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="10"><div class="left">hi</div></el-col>
      </el-row>
      </el-dialog>
     
</div>
 
</template>

<script> 
import draggable from 'vuedraggable'
export default {
  components: {
            draggable,
  },
  data () {
      return {
        myArray: [
          { name: "1" , id: 0},
          { name: "2" , id: 1},
          { name: "3" , id: 2},
          
        ],
        centerDialogVisible: false,
      }
  },
  methods: {
    
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  display: flex;
  text-align: left;
  line-height: 17px;
  // height: 100%;
  // overflow-x: scroll;
 
}
.card {
  background-color: #ebecf0;
  width: 272px;
  // height: 200px;
  max-height: 100%;
  // border: 1px solid black;
  margin-left: 8px;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.title {
  height: 51px;
  border: 1px solid black  !important;
}
.body-card{
  border: 1px solid blue;
}
.sortable{
  background-color: white;
  cursor: pointer;
  margin: 0 4px;
  padding: 0 4px;
  margin-bottom: 10px;
  border-radius: 3px;
  height: 60px;
  
}
.add-card {
  background-color: #ebecf0;
  cursor: pointer;
  margin: 0 4px;
  padding: 0 4px;
  margin-bottom: 10px;
  height: 42px;
  color: #5e6c84 ;
  font-size: 14px;
  line-height: 52px;
  font-weight: 400;
  margin-left: 20px;
}
.main .sortable-drag {
  opacity: 1;
}
.list-card {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100%;
  height: 500px;
}
.u-fancy-scrollbar::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}
.left{
  text-align: center;
}
.dialog-test{
  background-color: red;
}
</style>

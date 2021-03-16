<template>
  <div>
    <el-dialog
        :visible.sync="dialogVisible"
        width="40%"
        style="text-align: left;"
    >
      <el-row>
        <el-col :span="18">
          <div class="detail-card-header">
            <i class="el-icon-bank-card"></i>
            <input type="text" v-model="card.title" class="detail-card-title" @keydown.enter="updateCardName">
          </div>
          <el-row>
            <el-col :span="2" style="color:white">a</el-col>
            <el-col :span="22">
              <div v-if="card.labels" class="">
                <div>Nhãn</div>
                <div class="list-box-label-mini">
                  <div class="box-label-mini box-label-mini-green" ref="miniGreen"></div>
                  <div class="box-label-mini box-label-mini-orange" ref="miniOrange"></div>
                  <div class="box-label-mini box-label-mini-yellow" ref="miniYellow"></div>
                  <div class="box-label-mini box-label-mini-red" ref="miniRed"></div>
                  <div class="box-label-mini box-label-mini-purple" ref="miniPurple"></div>
                  <div class="box-label-mini box-label-mini-blue" ref="miniBlue"></div>
                  <div class="box-label-mini box-label-mini-plus" @click="openBoxLabel"><i class="el-icon-plus"></i></div>
                </div>
                <el-tag v-for="(label, index) in card.labels" :key="index"
                        :color="label.color"
                        effect="dark"
                        style="margin-right: 5px; border: 0">
                  {{label.name}}
                </el-tag>
              </div>
            </el-col>
          </el-row>
          <el-row style="" class="card-info">
            <el-col :span="2" style="font-size: 20px">
              <i class="el-icon-tickets"></i>
            </el-col>
            <el-col :span="22" style="padding-right: 18px" id="description">
              <div class="card-info-title">
                Mô tả
                <el-button size="small" style="padding: 5px 10px; margin-left: 5px" @click="openEditCardDescription" plain>Chỉnh sửa</el-button>
              </div>
              <div v-if="carDescription" class="card-description">
                {{ card.description }}
              </div>
              <div v-else class="add-card-description" ref="cardDescriptionBtn" @click="openEditCardDescription">
                Thêm mổ tả chi tiết...
              </div>
              <textarea ref="cardDescription" v-model="carDescription" class="add-card-description-textarea"
                        @blur="updateCardDescription"></textarea>
            </el-col>
          </el-row>
          <el-row style="" class="card-info" v-for="(checkList, index) in card.check_lists" :key="index">
            <el-col :span="2" style="font-size: 20px">
              <i class="el-icon-s-claim"> </i>
            </el-col>
            <el-col :span="22" style="padding-right: 18px">
              <div class="card-info-title">
                {{checkList.title}}
                <el-button size="small" style="padding: 5px 10px; margin-left: 5px; float: right" @click="handleDeleteCheckList(checkList.id)" plain>Xóa</el-button>
              </div>
              <el-progress :percentage="0" style="margin-bottom: 15px"></el-progress>
              <div class="check-list-childs" v-for="(child, index) in checkList.check_list_childs" :key="index">
                <el-checkbox v-if="child.status == 1" v-model="child.status" checked @change="changeStatusCheckListChild(child.id, child.status)">{{child.title}}</el-checkbox>
                <el-checkbox v-else v-model="child.status" @change="changeStatusCheckListChild(child.id, child.status)">{{child.title}}</el-checkbox>
              </div>
              <input v-if="addSubCheckList" type="text" class="input-sub-check-list" placeholder="Thêm một mục" ref="inputSubCheckList" v-model="subCheckListName">
              <div v-if="addSubCheckList" ref="btnSubCheckList">
                <el-button size="small" @click="closeAddSubCheckList">Hủy</el-button>
                <el-button type="success" size="small" @click="handleCreateSubCheckList(checkList.id)">Thêm</el-button>
              </div>
              <div v-if="!addSubCheckList" class="card-action-btn" ref="btnAddSubCheckList" style="width: 110px" @click="openAddSubCheckList">
                Thêm một mục
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="card-info">
          <div style="margin-bottom: 7px">THÊM VÀO THẺ</div>
          <el-popover
              placement="bottom"
              width="300"
              trigger="click">
            <div class="add-labels">
              <div class="add-labels-header">
                Thêm nhãn
              </div>
              <div class="form-add-labels">
                <p style="margin: 0 0 5px 0">Nhãn</p>
                <div class="box-color-label green" @click="green">
                 <i class="el-icon-check" ref="iconCheckGreen"></i>
               </div>
               <div class="box-color-label yellow" @click="yellow">
                 <i class="el-icon-check" ref="iconCheckYellow"></i>
               </div>
               <div class="box-color-label orange" @click="orange">
                 <i class="el-icon-check" ref="iconCheckOrange"></i>
               </div>
               <div class="box-color-label red" @click="red">
                 <i class="el-icon-check" ref="iconCheckRed"></i>
               </div>
               <div class="box-color-label purple" @click="purple">
                 <i class="el-icon-check" ref="iconCheckPurple"></i>
               </div>
               <div class="box-color-label blue" @click="blue">
                 <i class="el-icon-check" ref="iconCheckBlue"></i>
               </div>
                <!-- <el-button class="btn-save-label" type="success" size="small" @click="addLabel">Tạo mới</el-button> -->
              </div>
            </div>
            <div class="card-action-btn" slot="reference">
              <i class="el-icon-collection-tag" style="margin-right: 7px"> </i>
              Nhãn
            </div>
          </el-popover>
          <el-popover
              placement="bottom"
              width="300"
              trigger="click">
            <div class="add-labels">
              <div class="add-labels-header">
                Thêm danh sách công việc
              </div>
              <div class="form-add-labels">
                Tiêu đề
                <br>
                <input type="text" class="label-name" v-model="checkListName">
                <el-button class="btn-save-label" type="success" size="small" @click="addCheckList">Thêm</el-button>
              </div>
            </div>
            <div class="card-action-btn" slot="reference">
              <i class="el-icon-s-claim" style="margin-right: 7px"> </i>
              Việc cần làm
            </div>
          </el-popover>
          <div class="card-action-btn">
            <i class="el-icon-time" style="margin-right: 7px"> </i>
            <el-date-picker
                v-model="deadline"
                type="datetime"
                default-time="12:00:00"
                size="mini">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <draggable class="drag-cards"
               group="card"
    >
      <div class="card" ref="card" @mouseover="cardHover" @mouseleave="cardHoverOut">
        <div class="card-more" ref="cardMore" @click="openCardAction" slot="reference"><i class="el-icon-edit"></i></div>
        <div class="card-content" @click="openDetailCard">
          <div class="card-labels">
            <el-tag v-for="(label, index) in card.labels" :key="index"
                    :color="label.color"
                    effect="dark"
                    style="margin-right: 5px; border: 0">
            </el-tag>
          </div>
          <div class="card-name">
            {{card.title}}
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import api from "@/api";
import draggable from 'vuedraggable'

export default {
  props: ['cardId'],
name: "Card",
  components: {
    draggable
  },
  data () {
    return {
      cardName: '',
      newCard: [],
      dialogVisible: false,
      carDescription: false,
      labels: [],
      labelName: '',
      labelColor: '',
      cards: [],
      deadline: '',
      card: [],
      checkListName: '',
      subCheckListName: '',
      addSubCheckList: false,
    }
  },
  methods: {
    green(){
      let css =this.$refs.miniGreen.style.display
      let mini = this.$refs.iconCheckGreen.style.display
      if(css == 'inline-block' && mini == 'inline-block'){
          this.$refs.miniGreen.style.display = 'none';
          this.$refs.iconCheckGreen.style.display = 'none';
      }else{
          this.$refs.miniGreen.style.display = 'inline-block';
          this.$refs.iconCheckGreen.style.display = 'inline-block';
      }
    },
    yellow(){
      let mini =this.$refs.miniYellow.style.display
      let css =this.$refs.iconCheckYellow.style.display
      if(css == 'inline-block' && mini == 'inline-block'){
          this.$refs.miniYellow.style.display = 'none';
          this.$refs.iconCheckYellow.style.display = 'none';
      }else{
          this.$refs.miniYellow.style.display = 'inline-block';
          this.$refs.iconCheckYellow.style.display = 'inline-block';
      }
    },
    orange(){
      let mini =this.$refs.miniOrange.style.display
      let css =this.$refs.iconCheckOrange.style.display
      if(css == 'inline-block' && mini == 'inline-block'){
        this.$refs.miniOrange.style.display = 'none';
          this.$refs.iconCheckOrange.style.display = 'none';
      }else{
        this.$refs.miniOrange.style.display = 'inline-block';
          this.$refs.iconCheckOrange.style.display = 'inline-block';
      }
    },
    red(){
      let mini =this.$refs.miniRed.style.display
      let css =this.$refs.iconCheckRed.style.display
      if(css == 'inline-block' && mini == 'inline-block'){
        this.$refs.miniRed.style.display = 'none';
          this.$refs.iconCheckRed.style.display = 'none';
      }else{
        this.$refs.miniRed.style.display = 'inline-block';
          this.$refs.iconCheckRed.style.display = 'inline-block';
      }
    },
    purple(){
      let mini =this.$refs.miniPurple.style.display
      let css =this.$refs.iconCheckPurple.style.display
      if(css == 'inline-block' && mini == 'inline-block'){
        this.$refs.miniPurple.style.display = 'none';
          this.$refs.iconCheckPurple.style.display = 'none';
      }else{
        this.$refs.miniPurple.style.display = 'inline-block';
          this.$refs.iconCheckPurple.style.display = 'inline-block';
      }
    },
    blue(){
      let mini =this.$refs.miniBlue.style.display
      let css =this.$refs.iconCheckBlue.style.display
      if(css == 'inline-block' && mini == 'inline-block'){
        this.$refs.miniBlue.style.display = 'none';
          this.$refs.iconCheckBlue.style.display = 'none';
      }else{
        this.$refs.miniBlue.style.display = 'inline-block';
          this.$refs.iconCheckBlue.style.display = 'inline-block';
      }
    },
    openDetailCard() {
      this.dialogVisible = true
      api.getLabels().then((response) => {
        this.labels = response.data.data
      })
    },
    updateCardName() {
      let data = {
        title: this.card.title
      }
      api.editCard(this.card.id, data).then(() => {
        this.$message({
          message: 'Thành công!',
          type: 'success'
        });
      })
    },
    openEditCardDescription() {
      if (!this.carDescription) {
        this.$refs.cardDescriptionBtn.style.display = 'none'
      }
      this.$refs.cardDescription.style.display = 'block'
    },
    updateCardDescription() {
      let data = {
        description: this.carDescription
      }
      api.editCard(this.card.id, data).then(() => {
        this.$message({
          message: 'Thành công!',
          type: 'success'
        });
        this.getDetailCard()
      })
    },
    selectlabelColor(color) {
      this.$refs.inputLabel.style.background = color
      this.$refs.inputLabel.style.color = '#ffffff'
      this.$refs.inputLabel.style.border = '#ffffff'
      this.labelColor = color
    },
    addLabel() {
      if (this.labelName && this.labelColor) {
        let data = {
          name: this.labelName,
          color: this.labelColor
        }
        api.createLabel(this.card.id, data).then((response) => {
          console.log(response)
          this.labelName = ''
          this.labelColor = ''
          this.$refs.inputLabel.style.background = '#ffffff'
          this.$refs.inputLabel.style.color = '#000000'
          this.getDetailCard()
          this.dialogVisible = true
        })
      }
    },
    addCheckList() {
      let data = {
        title: this.checkListName,
        card_id: this.card.id
      }
      api.createChecklist(data).then(() => {
        this.getDetailCard()
      })
    },
    handleDeleteCheckList(id) {
      api.deleteCheckList(id).then(() => {
        this.getDetailCard()
      })
    },
    openAddSubCheckList() {
      this.addSubCheckList = true
      console.log(this.card.check_lists)
    },
    handleCreateSubCheckList(id) {
      if (this.subCheckListName != '') {
        let data = {
          title: this.subCheckListName,
          check_list_id: id
        }
        api.createSubCheckList(data).then(() => {
          this.getDetailCard()
          this.addSubCheckList = false
          this.subCheckListName = ''
        })
      }
    },
    closeAddSubCheckList() {
      this.addSubCheckList = false
    },
    changeStatusCheckListChild(id, status) {
      if (status) {
        status = 1
      } else {
        status = 0
      }
      api.updateStatusCheckListChild(id, status).then((response) => {
        console.log(response)
      })
    },
    getDetailCard() {
      api.detailCard(this.cardId).then((response) => {
        this.card = response.data.data
        this.carDescription = response.data.data.description
      })
    },
    cardHover() {
      this.$refs.cardMore.style.display = 'block'
    },
    cardHoverOut() {
      this.$refs.cardMore.style.display = 'none'
    },
    openCardAction() {
      console.log('action')
    }
  },
  mounted() {
    this.getDetailCard()
  }
}
</script>

<style lang="scss" scoped>
  .detail-card-header {
    width: 95%;
    position: absolute;
    top: -40px;
    font-size: 20px;
    .detail-card-title {
      margin-left: 15px;
      font-size: 20px;
      border: none;
      height: 30px;
      width: 90%;
      outline: none;
    }
  }
  #description {
    position: relative;
  }
  .card-info {
    margin-top: 20px;
    .card-info-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .card-description {
      width: 100%;
      max-height: 100px;
      overflow: auto;
      box-sizing: border-box;
    }
    .add-card-description {
      width: 100%;
      height: 56px;
      padding: 10px;
      box-sizing: border-box;
      background-color: rgba(9,30,66,.04);
      cursor: pointer;
      border-radius: 3px;
    }
    .add-card-description:hover {
      background-color: rgb(22 23 25 / 12%);
    }
    .add-card-description-textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      box-sizing: border-box;
      font-family: Arial;
      font-size: 14px;
      display: none;
      outline: none;
    }
    .input-sub-check-list {
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
    }
    .check-list-childs {
      margin-bottom: 15px;
    }
  }
  .add-labels {
    height: auto;
    .add-labels-header {
      display: flex;align-items: center;
      justify-content: center;
      height: 30px;
      border-bottom: 1px solid rgb(9 30 66 / 16%);
      margin-bottom: 10px;
    }
    .form-add-labels {
      font-family: Arial;
      .label-name {
        width: 98%;
        height: 30px;
        display: block;
        margin: 5px 0 10px 0;
        box-sizing: border-box;
        padding-left: 10px;
        border-radius: 5px;
      }
      .labels-color {
        width: 55px;
        height: 32px;
        margin: 0 5px 5px 0;
        float: left;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        .check-color {
          display: none;
        }
      }
      .btn-save-label {
        margin-top: 10px;
      }
    }
  }
  .card-action-btn {
    width: 100%;
    height: 32px;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 7px;
    background-color: rgba(9,30,66,.04);
    margin-bottom: 7px;
    cursor: pointer;
  }
  .card-action-btn:hover {
    background-color: rgb(22 23 25 / 12%);
  }
  .drag-cards {
    overflow: auto;
    max-height: 400px;
    .card {
      padding-bottom: 7px;
      cursor: pointer;
      position: relative;
      .card-content {
        min-height: 32px;
        height: auto;
        background-color: #ffffff;
        padding: 0 0 0 10px;
        border-radius: 3px;
        box-shadow: 0 1.2px 0px 0px;
        align-items: center;
        .card-labels {
          width: 100%;
          .el-tag {
            height: 10px;
            width: 40px;
          }
        }
        .card-name {
          width: 100%;
          display: flex;
          align-items: center;
          height: 32px
        }
      }
      .card-content:hover {
        background-color: #f1f3fd;
      }
      .card-more {
        padding: 3px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        position: absolute;
        right: 2px;
        top: 2px;
        display: none;
        z-index: 100;
      }
      .card-more:hover {
        background-color: #ebecf0;
      }
    }
  }
  .box-color-label {
        width: 88%;
        height: 25px;
        border-radius: 3px;
        cursor: pointer;
        font-weight: 700;
        color: white;
        text-align: right;
        margin-bottom: 4px;
        i {
          height: 20px;
          font-size: 16px;
          line-height: 20px;
          width: 20px;
          padding: 5px 10px 0 0 ;
          font-weight: 700;
          display: none;
          padding-left: 220px;
        }
      }
  .green{
    background-color: #61bd4f;
  }
  .green:hover {
    box-shadow: -8px 0 #519839;
  }
  .yellow {
    background-color: #f2d600;
    
  }
  .yellow:hover {
    box-shadow: -8px 0 #d9b51c;
  }
  .orange {
    background-color: #ff9f1a;
  }
  .orange:hover {
    box-shadow: -8px 0 #cd8313;
  }
  .red {
    background-color: #eb5a46;
  }
  .red:hover {
    box-shadow: -8px 0 #b04632;
  }
  .purple {
    background-color: #c377e0;
  }
  .purple:hover {
    box-shadow: -8px 0 #89609e;
  }
  .blue {
    background-color: #0079bf;
  }
  .blue:hover {
    box-shadow: -8px 0 #055a8c;
  }
  .list-box-label-mini {
        width: 100%;
        height: 30px;
        .box-label-mini {
            width: 40px;
            height: 30px;
            margin-right: 10px;
            display: inline-block;
            cursor: pointer;
            border-radius: 5px;
        }
        .box-label-mini-red {
            background-color: red;
            display: none;
        }
        .box-label-mini-orange {
            background-color: #ff9f1a;
            display: none;
        }
        .box-label-mini-yellow {
            background-color: #f2d600;
            display: none;
        }
        .box-label-mini-green {
            background-color: #61bd4f;
            display: none;
        }
        .box-label-mini-purple {
          background-color: #c377e0;
          display: none;
        }
        .box-label-mini-blue {
            background-color: #0079bf;
            display: none;
        }
        .box-label-mini-plus {
          background-color: rgba(9,30,66,.04);
          color: #42526e;
          font-size: 16px;
          height: 16px;
          line-height: 16px;
          padding: 8px;
          width: 26px;
          text-align: center;
          position: absolute;
        }
        .box-label-mini-plus:hover {
          background-color: #dee0e2;
        }
    }
</style>
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
              <div v-if="card.labels" class="" style="margin-bottom: 10px">
                <div style="margin-bottom: 5px">NHÃN</div>
                <el-tag v-for="(label, index) in card.labels" :key="index"
                        :color="label.color"
                        effect="dark"
                        style="margin-right: 5px; border: 0">
                  {{label.name}}
                </el-tag>
              </div>
              <div class="deadline" v-if="card.deadline">
                <div style="margin-bottom: 5px">NGÀY HẾT HẠN</div>
                <el-checkbox v-model="deadlineStatus" @change="handleChangeDeadlineStatus">
                  <div class="card-action-btn" style="padding-right: 7px">
                    {{formatDate(card.deadline)}}
                    <div class="status-deadline-fail" v-if="formatDate(deadline) < moment(new Date()).format('YYYY-MM-DD HH:mm:ss') && card.status == 0">QUÁ HẠN</div>
                    <div class="status-deadline-success" v-else-if="card.status === 1">HOÀN TẤT</div>
                  </div>
                </el-checkbox>
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
              </div>
              <div v-if="card.description" class="card-description" ref="description" @click="openEditCardDescription">
                {{ card.description }}
              </div>
              <div v-else class="add-card-description" ref="cardDescriptionBtn" @click="openEditCardDescription">
                Thêm mổ tả chi tiết...
              </div>
              <div class="card-description" ref="descriptionBtn" @click="openEditCardDescription" style="display:none">
                {{ card.description }}
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
                <p @click="openUpdateCheckList(index)" ref="openUpdateCheckList">{{checkList.title}}</p>
                <textarea ref="updateCheckList" v-model="checkList.title" class="edit-check-list-title"
                        @blur="updateCheckList(checkList.id, index, checkList.title)" style="display:none; width:400px"></textarea>
                <el-button size="small" style="padding: 5px 10px; margin-left: 5px; float: right" @click="handleDeleteCheckList(checkList.id)" plain>Xóa</el-button>
              </div>
              <el-progress :percentage="checkPercentComplete(checkList.check_list_childs)" style="margin-bottom: 15px"></el-progress>
              <div class="check-list-childs" v-for="(child, index) in checkList.check_list_childs" :key="index">
                <el-checkbox v-if="child.status == 1" v-model="child.status" checked @change="changeStatusCheckListChild(child.id, child.status)" ref="checkListChildTitle1">{{child.title}}</el-checkbox>
                <el-checkbox v-else v-model="child.status" @change="changeStatusCheckListChild(child.id, child.status)" ref="checkListChildTitle0">{{child.title}}</el-checkbox>
                <el-popover
                  placement="bottom"
                  title="Sửa công việc con"
                  width="200"
                  trigger="click">
                  <el-input ref="updateCheckListChild" v-model="child.title"
                        style="width:200px"
                        type="text">
                  </el-input>
                  <div class="btn-edit-child" @click="updateCheckListChild(child.id, child.title)"><i class="fa fa-pencil" aria-hidden="true"></i> Sửa</div>
                  <div class="btn-edit-child" @click="deleteCheckListChild(child.id)"><i class="el-icon-delete"></i> Xoá</div>
                  <i class="fa fa-ellipsis-v edit-check-list-child" style="margin-left:400px;cursor: pointer;" slot="reference"></i>
                </el-popover>
                
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
          <el-row style="" class="card-info">
            <el-col :span="2" style="font-size: 20px">
              <i class="el-icon-paperclip"></i>
            </el-col>
            <el-col :span="22" style="padding-right: 18px">
              <div class="card-info-title">
                Các tập tin đính kèm
              </div>
              <div class="file-item" v-for="(file, index) in card.files" :key="file.id">
                <img class="card-files" :src="baseFileUrl + file.path" alt="">
                <div class="card-files-info">
                  <div class="file-name" @click="openEditFileName(index)" ref="openEditFileName">{{file.name}}</div>
                  <textarea ref="editFileName" v-model="file.name" class="" style="display:none" @blur="editFileName(file.id, index, file.name)">
                  </textarea>
                  <el-popover
                      placement="top"
                      width="160"
                      v-model="deleteFilePop">
                    <p>Bạn có chắn chắn muốn xóa?</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="info" @click="deleteFilePop = false">Hủy</el-button>
                      <el-button type="danger" size="mini" @click="handleDeleteFile(file.id)">Xóa</el-button>
                    </div>
                    <el-link type="info" slot="reference">Xóa</el-link>
                  </el-popover>
                  <el-popover
                      placement="top-start"
                      width="300"
                      trigger="click"
                      >
                    <div class="add-labels">
                      <div class="add-labels-header">
                        Sửa tệp đính kèm
                      </div>
                      <div class="form-add-labels">
                        Tên liên kết
                        <br>
                        <input type="text" class="label-name" ref="inputLabel" v-model="fileName" >
                        <el-button type="success" size="small" @click="handleChangeFileName(file.id)">Cập nhật</el-button>
                      </div>
                    </div>
                  </el-popover>
                </div>
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
              <div class="add-labels-header" ref="searchLabel">
                <el-input placeholder="TÌm theo tên nhãn" v-model="search"></el-input>
              </div>
              <div ref="listLabel">
                <div class="card-action-btn" style="justify-content: center; margin-top: 10px" @click="openFromAddlabel">
                  Thêm nhãn mới
                </div>
                <div v-for="label in labels" :key="label.id">
                  <el-tag
                      :color="label.color"
                      style="width: 87%; margin: 0 12px 3px 0; color: #ffffff; font-family: Arial; cursor: pointer"
                      @click="addExitsLabel(label.id)">{{label.name}}</el-tag>
                  <i class="el-icon-edit" style="cursor: pointer" @click="openFromEditlabel(label.name, label.id)"></i>
                </div>
              </div>
              <div class="form-add-labels form-add-labels-add" ref="formAddLabel">
                Tên
                <br>
                <input type="text" class="label-name" ref="inputLabel" v-model="labelName">
                <p style="margin: 0 0 5px 0">Chọn một màu</p>
                <div class="labels-color" style="background-color: #61bd4f" @click="selectlabelColor('#61bd4f')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #f2d600" @click="selectlabelColor('#f2d600')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #ff9f1a" @click="selectlabelColor('#ff9f1a')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #eb5a46" @click="selectlabelColor('#eb5a46')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #c377e0" @click="selectlabelColor('#c377e0')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #0079bf" @click="selectlabelColor('#0079bf')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #00c2e0" @click="selectlabelColor('#00c2e0')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #51e898" @click="selectlabelColor('#51e898')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #ff78cb" @click="selectlabelColor('#ff78cb')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #344563" @click="selectlabelColor('#344563')"><i class="check-color el-icon-check"></i></div>
                <el-button class="btn-save-label" type="success" size="small" @click="addLabel">Tạo mới</el-button>
                <el-button class="btn-save-label" type="info" size="small" @click="cancelFromAddlabel">Hủy</el-button>
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
            Ngày hết hạn
            <el-date-picker
                v-model="deadline"
                type="datetime"
                size="mini"
                @change="updateDeadline">
            </el-date-picker>
          </div>
          <label for="file">
            <div class="card-action-btn">
              <i class="el-icon-link" style="margin-right: 7px"> </i>
              Đính kèm
            </div>
          </label>
          <input style="display: none" ref="file" type="file" accept="image/*" id="file" @change="handleUploadFile">
        </el-col>
      </el-row>
    </el-dialog>
    <div class="card" ref="card" @mouseover="cardHover" @mouseleave="cardHoverOut">
      <div class="card-more" ref="cardMore" @click="handleDeleteCard" slot="reference"><i class="el-icon-delete"></i></div>
      <div class="card-content" @click="openDetailCard">
        <div class="card-labels">
          <el-tag v-for="(label, index) in card.labels" :key="index"
                  :color="label.color"
                  effect="dark"
                  style="margin-right: 5px; border: 0">
          </el-tag>
        </div>
        <div class="card-name">
          <div style="width: 100%;">{{card.title}}</div>
        </div>
        <div class="status-deadline-fail" style="width: 64px; display:inline-block; margin: 0 0 4px 0; font-size: 14px" v-if="formatDate(deadline) < moment(new Date()).format('YYYY-MM-DD HH:mm:ss') && card.status == 0"><i class="el-icon-time"></i> {{fomatDateCard(card.deadline)}}</div>
        <div class="status-deadline-success" style="width: 64px; display:inline-block; margin: 0 0 4px 0; font-size: 14px" v-else-if="card.status ==1"><i class="el-icon-time"></i> {{fomatDateCard(card.deadline)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import moment from 'moment'

export default {
  props: ['cardId'],
name: "Card",
  components: {
  },
  data () {
    return {
      cardName: '',
      newCard: [],
      dialogVisible: false,
      carDescription: false,
      labels: [],
      labelName: '',
      labelNameEdit: '',
      labelId: '',
      labelColor: '',
      cards: [],
      deadline: '',
      search: '',
      card: [],
      checkListName: '',
      subCheckListName: '',
      addSubCheckList: false,
      deadlineStatus: '',
      baseFileUrl: 'http://vuecourse.zent.edu.vn/storage/',
      fileName: '',
      popoverFile: false,
      popoverLabel: false,
      deleteFilePop: false
    }
  },
  methods: {
    submitSearch() {
      api.search(this.search).then((response) => {
          this.labels = response.data.data
      })
    },
    updateCheckListChild(id, title){
      let data = {
        title: title
      }
      api.editSubCheckList(id, data).then(() => {
        this.$message({
            message: 'Sửa Thành công!',
            type: 'success'
          });
          this.getDetailCard()
      })
    },
    deleteCheckListChild(id) {
      api.deleteSubCheckList(id).then(()=> {
          this.$message({
            message: 'Xoá Thành Công!',
            type: 'success'
          });
          this.getDetailCard()
      })
    },
    openUpdateCheckList(index) {
      this.$refs.openUpdateCheckList[index].style.display = 'none'
      this.$refs.updateCheckList[index].style.display = 'block'
    },
    updateCheckList(id, index, title) {
      this.$refs.openUpdateCheckList[index].style.display = 'block'
      this.$refs.updateCheckList[index].style.display = 'none'
      let data = {
        title : title
      }
      api.editChecklist(id,data).then(() => {
        this.$message({
            message: 'Thành công!',
            type: 'success'
          });
          this.getDetailCard()
      })
    },
    openEditFileName(index) {
      this.$refs.openEditFileName[index].style.display = 'none'
      this.$refs.editFileName[index].style.display = 'block'
    },
    editFileName(id, index, fileName){
      this.$refs.openEditFileName[index].style.display = 'block'
      this.$refs.editFileName[index].style.display = 'none'
      let data = {
        name : fileName
      }
      api.changeFileName(id, data).then(() => {
          this.$message({
            message: 'Thành công!',
            type: 'success'
          });
          this.getDetailCard()
        })
    },
    test() {
      console.log('test')
    },
    openDetailCard() {
      this.dialogVisible = true
      console.log(this.card)
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
      if (!this.card.description) {
        this.$refs.cardDescriptionBtn.style.display = 'none'
      }
      if (this.card.description) {
        this.$refs.description.style.display = 'none'
        this.$refs.descriptionBtn.style.display = 'none'
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
        this.$refs.cardDescription.style.display = 'none'
        this.$refs.descriptionBtn.style.display = 'block'
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
          this.$refs.inputLabel.style.border = '#000000'
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
      let data = {
        status: status
      }
      api.updateStatusCheckListChild(id, data).then(() => {

      })
    },
    checkPercentComplete(arr) {
      let totalChildrenWork = arr.length;
      let a = 0;
      if(arr.length !== 0) {
        arr.forEach((item) => {
          if(item.status == 1) {
            a = a + 1;
          }
        })
        return Math.ceil(a / totalChildrenWork * 100)
      } else {
        return 0
      }
    },
    getDetailCard() {
      api.detailCard(this.cardId).then((response) => {
        this.card = response.data.data
        this.carDescription = response.data.data.description
        if (this.card.status == 1) {
          this.deadlineStatus = true
        } else {
          this.deadlineStatus = false
        }
      })
    },
    cardHover() {
      this.$refs.cardMore.style.display = 'block'
    },
    cardHoverOut() {
      this.$refs.cardMore.style.display = 'none'
    },
    updateDeadline() {
      let data = {
        deadline: this.formatDate(this.deadline)
      }
      api.cardDeadline(this.card.id, data).then(() => {
        this.getDetailCard()
      })
    },
    formatDate (dateString) {
      return moment(dateString).format('YYYY-MM-DD HH:mm:ss')
    },
    fomatDateCard(date) {
      return moment(date).format('DD - MM')
    },
    handleChangeDeadlineStatus(e) {
      let data
      if (e) {
        data = {
          status: 1
        }
      } else {
        data = {
          status: 0
        }
      }
      api.updateCardStatus(this.card.id, data).then(() => {
        this.getDetailCard()
      })
    },
    handleUploadFile(e) {
      if (e.target.files.length) {
        const data = new FormData()
        data.append('file', e.target.files[0])
        api.uploadFile(this.card.id, data).then(() => {
          this.getDetailCard()
        })
      }
    },
    handleChangeFileName(id) {
      let data = {
        name: this.fileName
      }
      api.changeFileName(id, data).then(() => {
        this.getDetailCard()
        this.popoverFile = false
      })
    },
    moveCard(e) {
      console.log(e)
      console.log('ok')
    },
    handleDeleteCard() {
      this.$confirm('Bạn có chắc chắn muốn xóa không?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonClass: 'btn-delete-list',
        type: 'warning'
      }).then(() => {
        api.deleteCard(this.card.id).then(() => {
          this.$message({
            message: 'Xóa thẻ thành công!',
            type: 'success'
          });
          this.$emit('reload')
        }).catch(() => {
          this.$message({
            message: 'Xóa thẻ thất bại!',
            type: 'error'
          });
        })
      }).catch(() => {})
    },
    openFromAddlabel() {
      this.$refs.formAddLabel.style.display = 'block'
      this.$refs.listLabel.style.display = 'none'
    },
    cancelFromAddlabel() {
      this.$refs.formAddLabel.style.display = 'none'
      this.$refs.listLabel.style.display = 'block'
    },
    addExitsLabel(label_id) {
      let check = false
      this.card.labels.forEach((label) => {
        if(label.id === label_id) {
          check = true
        }
      })
      if (!check) {
        let data = {
          label_id: label_id
        }
        api.addLabel(this.card.id, data).then(() => {
          this.getDetailCard()
        })
      } else if (check) {
        let data = {
          label_id: label_id
        }
        api.removeLabelFromCard(this.card.id, data).then(() => {
          this.getDetailCard()
        })
      }
    },
    openFromEditlabel(labelName, labelId) {
      this.labelNameEdit = labelName
      this.$refs.formEditLabel.style.display = 'block'
      this.$refs.listLabel.style.display = 'none'
      this.labelId = labelId
    },
    cancelFromEditlabel() {
      this.$refs.formEditLabel.style.display = 'none'
      this.$refs.listLabel.style.display = 'block'
    },
    handleDeleteLabel(id) {
      api.deleteLabel(id).then(() => {
        this.getDetailCard()
        api.getLabels().then((response) => {
          this.labels = response.data.data
        })
        this.cancelFromEditlabel()
      })
    },
    handleDeleteFile(id) {
      this.deleteFilePop = false
      api.deleteFile(id).then(() => {
        this.getDetailCard()
      })
    },
  },
  watch: {
        search: function(){
            this.submitSearch()
        }
  },
  mounted() {
    this.getDetailCard()
  }
}
</script>

<style lang="scss" scoped>
.btn-edit-child {
    margin-top: 10px;
    padding-left: 10px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    i {
      margin-right: 10px;
    }
}
.btn-edit-child:hover{
  background-color: rgba(22, 23, 25, 0.12);
}
.btn-edit-delete {
        margin-top: 10px!important;
        margin-left: 25px;
    }
  .edit-check-list-child {
    position: absolute;
    right: 30px;
  }
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
    }
  }
  #description {
    position: relative;
  }
  .status-deadline-fail {
    color: #ffffff;
    padding: 1px;
    font-size: 12px;
    background-color: #ec9488;
    border-radius: 3px;
    margin-left: 7px;
  }
  .status-deadline-success {
    color: #ffffff;
    padding: 1px;
    font-size: 12px;
    background-color: #61bd4f;
    border-radius: 3px;
    margin-left: 7px;
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
    }
    .input-sub-check-list {
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
    }
    .check-list-childs {
      margin-bottom: 15px;
    }
    .card-files {
      width: 80px;
      height: 80px;
      border-radius: 3px;
    }
    .file-item {
      position: relative;
      margin-bottom: 10px;
      height: 81px;
      .card-files-info {
        width: 200px;
        position: absolute;
        top: 10px;
        left: 130px;
        .file-name {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 25px;
        }
      }
    }
    .file-item:hover {
      background-color: rgb(22 23 25 / 12%);
    }
  }
  .add-labels {
    height: auto;
    .search-label {
      display: none!important;
    }
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
    .form-add-labels-add {
      display: none;
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
    .el-date-editor {
      opacity: 0;
      position: absolute;
      width: 167px;
    }
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
</style>
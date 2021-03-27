<template>
  <div>
    <div class="listWrap" id="list2">
      <div class="list-header">
        <input type="text" class="list-name" v-model="directoryName" ref="directoryName"
               @click="handleEditName"
               @blur="cancelEditName"
               @keydown.enter="updateDirectoryName"
        >
        <el-button class="list-more-action" size="mini" style="border: 0; background-color: #ebecf0">
          <i class="el-icon-close" @click="deleteList"></i>
        </el-button>
      </div>
      <draggable class="drag-cards"
                 group="cards"
                 :list="directory.cards"
                 :move="moveCard">
        <Card v-for="(card) in directory.cards" :key="card.id" :cardId="card.id" @reload="reloadDirectories"/>
      </draggable>
      <div class="btn-add-card" ref="btnAddCard">
        <el-button type="info" size="small" class="add-card" @click="addCard()">
          <i class="el-icon-plus"></i>
          Thêm thẻ mới
        </el-button>
      </div>
      <div class="form-add-card" ref="formAddCard">
        <el-input placeholder="Nhập tiêu đề cho thẻ này..." v-model="cardName"></el-input>
        <el-button type="success" size="small" @click="storeCard">Thêm thẻ</el-button>
        <i class="fa fa-times-circle close-add-card" aria-hidden="true" @click="cancelAddCard()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import api from '../api'
import Card from "@/components/Card";
import draggable from 'vuedraggable'

export default {
  props: ['directory'],
  name: "Directory",
  components: {
    Card,
    draggable
  },
  computed: {
    ...mapState('home', [

    ]),
  },
  data () {
    return {
      directoryName: this.directory.title,
      cardName: '',
      newCard: [],
      dialogVisible: false,
      a: 'abc',
      card: [],
      carDescription: false,
      labels: [],
      labelName: '',
      labelColor: '',
      cards: [],
      deadline: ''
    }
  },
  methods: {
    ...mapMutations('home', [
      'addNewCard', 'removeList'
    ]),
    handleEditName() {
      this.$refs.directoryName.style.background = '#ffffff'
    },
    cancelEditName() {
      this.$refs.directoryName.style.background = '#ebecf0'
    },
    updateDirectoryName() {
      let data = {
        title: this.directoryName
      }
      api.editDirectoryName(this.directory.id, data).then(() => {
        this.$message({
          message: 'cập nhật danh sách thành công!',
          type: 'success'
        });
        this.reloadDirectories()
        this.cancelEditName()
      }).catch(() => {
        this.$message({
          message: 'cập nhật danh sách thành công!',
          type: 'error'
        });
      })
    },
    addCard() {
      this.$refs.btnAddCard.style.display = 'none'
      this.$refs.formAddCard.style.display = 'block'
    },
    cancelAddCard() {
      this.$refs.btnAddCard.style.display = 'block'
      this.$refs.formAddCard.style.display = 'none'
      this.cardName = ''
    },
    deleteList() {
      this.$confirm('Bạn có chắc chắn muốn xóa không?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonClass: 'btn-delete-list',
        type: 'warning'
      }).then(() => {
        api.deleteDirectory(this.directory.id).then(() => {
          this.$message({
            message: 'Xóa danh sách thành công!',
            type: 'success'
          });
          this.reloadDirectories()
        }).catch(() => {
          this.$message({
            message: 'Xóa danh sách thất bại!',
            type: 'error'
          });
        })
      }).catch(() => {})
    },
    storeCard() {
      let data = {
        title: this.cardName,
        index: this.directory.cards.length + 1,
        directory_id: this.directory.id
      }
      api.createCard(data).then(() => {
        this.$message({
          message: 'Thêm thẻ thành công!',
          type: 'success'
        });
        this.reloadDirectories()
        this.cancelAddCard()
      }).catch(() => {
        this.$message({
          message: 'Thêm thẻ không thành công!',
          type: 'error'
        });
        this.cancelAddCard()
      })
    },
    reloadDirectories() {
      this.$emit('reloadDirectories')
    },
    moveCard(e) {
      let id = e.draggedContext.element.id
      let index = e.draggedContext.futureIndex
      let a = e.to.parentElement
      let data = {
        index: index,
        directory_id: a.parentElement.getAttribute('id')
      }
      console.log(data)
      api.changeCardDirectory(id, data).then(() => {

      })
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .listWrap {
    padding: 6px 8px;
    text-align: left;
    background: #ebecf0;
    border-radius: 4px;
    width: 272px;
    box-sizing: border-box;
    color: #5e6c84;
    float: left;
    margin-right: 10px;
    min-height: 80px;
    .close-add-card{
      cursor: pointer;
      margin-left: 10px;
    }
    .list-header {
      position: relative;
      font-size: 14px;
      font-weight: bold;
      height: 30px;
      padding: 5px 20px 5px 5px;
      .list-name {
        width: 90%;
        height: 20px;
        background: #ebecf0;
        border: none;
        font-size: 14px;
        font-weight: bold;
        color: #455167;
      }
      .list-more-action {
        position: absolute;
        right: 0;
        top: 4px;
        padding: 4px;
        cursor: pointer;
      }
    }
    .add-card {
      width: 100%;
      padding-left: 10px;
      text-align: left;
      color: #5e6c84;
      background-color: #ebecf0;
      border-color: #ebecf0
    }
    .form-add-card {
      display: none;
      .el-input {
        margin-bottom: 7px;
      }
    }
  }
</style>
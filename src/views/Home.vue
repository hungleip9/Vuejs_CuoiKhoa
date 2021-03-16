<template>
  <div class="homeWrap">
    <div class="page-header">
      <div class="page-title">
        Bảng chính
      </div>
    </div>
    <div class="main-content">
      <draggable
          class="drag-wrap"
        :list="directories"
          group="directories"
      >
        <List class="directory" v-for="(directory, index) in directories" :key="index"
              :directory="directory"
              @reloadDirectories="getData"
        />
      </draggable>
      <div class="listWrap" ref="addListBtn" @click="createListForm()">
        <i class="el-icon-plus"></i>
        Thêm danh sách khác
      </div>
      <div class="listWrap" id="addWrap" ref="addListWrap">
        <el-input placeholder="Nhập tiêu đề danh sách..." v-model="directoryName"></el-input>
        <el-button type="success" class="add-list" @click="createList">Thêm danh sách</el-button>
        <i class="el-icon-close close-add-list" @click="cancelCreateList()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/List";
import { mapState, mapMutations } from 'vuex'
import api from '../api'
import draggable from 'vuedraggable'

export default {
  name: 'Home',
  components: {
    List,
    draggable
  },
  data () {
    return {
      dynamicValidateForm: {
        directoryName: ''
      },
      directoryName: '',
      newList: [],
      directories: [],
      cards: []
    }
  },
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapMutations('home', [
       'addList'
    ]),
    createListForm() {
      this.$refs.addListBtn.style.display = 'none'
      this.$refs.addListWrap.style.display = 'block'
    },
    cancelCreateList() {
      this.$refs.addListBtn.style.display = 'block'
      this.$refs.addListWrap.style.display = 'none'
      this.directoryName = ''
    },
    createList() {
      let data = {
        title: this.directoryName,
        index: this.directories.length + 1
      }
      console.log(data)
      api.createDirectory(data).then(() => {
        this.$message({
          message: 'Thêm mới thành công!',
          type: "success",
        })
        this.getData()
        this.cancelCreateList()
      }).catch(() => {
        this.$message({
          message: 'Thêm mới thất bại!',
          type: "error"
        })
      })
    },
    getData() {
      api.getDirectories().then((response) => {
        this.directories = response.data.data
        console.log(response.data.data)
      })
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
  .homeWrap {
    height: 95vh;
    overflow-x: auto;
    //white-space: nowrap;
    .page-header {
      height: auto;
      overflow: hidden;
      .page-title {
        margin: 7px;
        padding: 7px;
        float: left;
        background: rgba(220 203 211 / 47%);
        color: #ffffff;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    .main-content {
      margin: 0 7px;
      .drag-wrap {
        height: auto;
        display: flex;
        width: auto;
        .directory {
          //display: inline-block;
        }
      }
      .listWrap {
        padding: 10px 8px;
        text-align: left;
        background: rgba(220 203 211 / 47%);
        border-radius: 4px;
        width: 272px;
        box-sizing: border-box;
        color: #ffffff;
        float: left;
        margin-right: 15px;
        cursor: pointer;
        //display: inline-block;
      }
      #addWrap {
        background: #ffffff !important;
        color: #5e6c84;
        display: none;
        .add-list {
          padding: 7px 10px;
          margin: 4px 10px 0 0;
        }
        .close-add-list {
          font-size: 16px;
        }
      }
    }
  }
</style>

<template>
  <div class="homeWrap">
    <div class="page-header">
      <div class="page-title">
        LÊ QUANG HÙNG
      </div>
    </div>
    <div class="main-content">
      <div class="content">
        <draggable
            class="drag-wrap"
            :list="directories"
            group="directories"
            :move="moveDirectory"
        >
          <List class="directory" v-for="(directory) in directories" :key="directory.id" :id="directory.id"
                :directory="directory"
                @reloadDirectories="getData"
          />
          <div class="listWrap add-directory-btn" ref="addListBtn" @click="createListForm()">
            <i class="el-icon-plus"></i>
            Thêm danh sách khác
          </div>
          <div class="listWrap add-directory-form" id="addWrap" ref="addListWrap">
            <el-input placeholder="Nhập tiêu đề danh sách..." v-model="directoryName"></el-input>
            <el-button type="success" class="add-list" @click="createList">Thêm danh sách</el-button>
            <i class="fa fa-times-circle close-add-list" @click="cancelCreateList()"></i>
          </div>
        </draggable>
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
      api.createDirectory(data).then(() => {
        this.$message({
          message: 'Thêm mới thành công!',
          type: "success",
          center: true
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
    moveDirectory(e) {
      let id = e.draggedContext.element.id
      let data = {
        index: e.draggedContext.futureIndex
      }
      api.changeIndexDirectory(id, data)
    },
    getData() {
      api.getDirectories().then((response) => {
        this.directories = response.data.data
      })
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
  .homeWrap::-webkit-scrollbar {
    width: 8px;
  }
  .homeWrap::-webkit-scrollbar-track {
    border-radius: 7px;
    background-color: #4a4a727d;
  }
  .homeWrap::-webkit-scrollbar {
    height: 10px;
    //width: 98%;
  }
  .homeWrap::-webkit-scrollbar-thumb:hover {
    background: #d3d3d87d;
  }
  .homeWrap::-webkit-scrollbar-track {
    border-radius: 7px;
    background-color: #4f4f5073;
  }
  .homeWrap::-webkit-scrollbar-thumb {
    background: #bcbcbe63;
    border-radius: 7px;
  }
  .homeWrap {
    height: 95vh;
    overflow-x: auto;
    //white-space: nowrap;
    .page-header {
      height: auto;
      overflow: hidden;
      position: fixed;
      .page-title {
        margin: 7px;
        padding: 7px;
        float: left;
        color: #5e6c84;
        border-radius: 4px;
        cursor: pointer;
        background-color: $colorGray;
        font-weight: bold;
      }
    }
    .main-content {
      position: relative;
      outline: none;
      margin: 0 7px;
      .content {
        position: absolute;
        overflow-x: auto;
        top: 45px;
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
          background-color: $colorGray;
          border-radius: 4px;
          width: 272px;
          box-sizing: border-box;
          color: #5e6c84;
          float: left;
          margin-right: 15px;
          font-weight: bold;
          cursor: pointer;
          //display: inline-block;
        }
        .add-directory-btn {
          height: 38px;
        }
        .add-directory-form {
          height: 90px;
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
  }
</style>

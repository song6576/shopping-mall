<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        ref="form"
        :inline="true"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form :inline="true" :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>

    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm";
import CommonTable from "../../components/CommonTable";
import { getUser } from "../../api/data";
export default {
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      tableData: [
        {
          date: "2017-05-04",
          name: "小小",
          address: "浙江省杭州市千岛湖镇 阳光路",
        },
        {
          date: "1956-05-04",
          name: "爷爷",
          address: "浙江省杭州市千岛湖镇 清波花园",
        },
        {
          date: "1958-05-04",
          name: "奶奶",
          address: "浙江省杭州市千岛湖镇 冬瓜乌",
        },
      ],
    };
  },
  mounted(){
    console.log(11)
  },
  methods: {
    getList(name = "") {
      console.log(name);
      this.config.loading = true;
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : "";
      // this.$http.get("/api/user/getUser", {
      //   params: {
      //     page: this.config.page,
      //     name,
      //   },
      // });
      console.log(this.config);
      getUser({
        page: this.config.page,
        name,
      }).then((res) => {
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    addUser() {
      this.operateForm = {};
      this.operateType = "add";
      this.isShow = true;
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    confirm() {
      if (this.operateType === "edit") {
        console.log(this.operateForm);
        this.$http.post("/api/user/edit", this.operateForm).then((res) => {
          console.log(res.data);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$http.post("/api/user/add", this.operateForm).then((res) => {
          console.log(res.data);
          this.isShow = false;
          this.getList();
        });
      }
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = row.id;
          this.$http
            .get("/api/user/del", {
              params: {
                id,
              },
            })
            .then((res) => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>

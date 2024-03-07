
<template>
<!-- 手动线选择文件,然后最后再 去上传 -->
  <el-dialog title="新增通知" width="600px" :close-on-click-modal="false" :visible.sync="visible" :before-close="resetData">
    <el-form ref="form" size="small" :model="form" :rules="dataRule" label-width="120px" class="el-form-fixed">
      <el-form-item label="通知名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入通知名称"></el-input>
      </el-form-item>

      <el-form-item label="通知内容" prop="content">
        <el-input v-model="form.content" placeholder="请输入通知内容" :rows="5" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="附件" prop="files">
        <el-upload
          ref="upload"
          :action="uploadUrl"
          :on-remove="handleRemove"
          :limit="1"
          :headers="headers"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-change="handleChange"
          :file-list="form.files"
          :auto-upload="false"
          :data="uploadData"
        >
          <el-button size="small" type="primary" slot="trigger">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传 1 个 文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>

    <template slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm()">确 定</el-button>
      <el-button @click="resetData()">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getToken } from "@/utils/auth";
import { addNotice, getInfo } from "@/api/user";
import { mapGetters } from "vuex";

export default {
  created() {},
  data() {
    return {
      visible: false,
      headers: {
        token: getToken(),
      },
      uploadUrl: process.env.VUE_APP_BASE_API + "/system/noticeFile/add",
      uploadData: {},
      form: {
        name: undefined, //
        content: undefined, //
        files: [], // 赛届
      },
      dataRule: {
        name: [{ required: true, message: "请输入通知名称", trigger: "change" }],
        content: [{ required: true, message: "请输入通知内容", trigger: "change" }],
        files: [{ required: true, message: "请上传附件", trigger: "blur" }],
      },
      userInfo: null,
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    init(info) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.form.files = [];
        this.$refs.upload.clearFiles();
        this.uploadData = {};

        // init user
        getInfo(this.token)
          .then((res) => {
            this.userInfo = res.data || {};
            console.log("4444444444", this.userInfo);
          })
          .catch(() => {});
      });
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.upload.submit();

          // const { name: noticeTitle, content: noticeText } = this.form;
          // const fileInfo = this.form.files[0] || {};
          // const data = {
          //   noticeTitle,
          //   noticeText,
          //   filePath: fileInfo.filePath || "",
          //   fileName: fileInfo.fileName || "",
          // };
          // l(this.form.files, data);
          // // const ajaxFunc = this.updateId ? saveOrganizer : addOrganizer;
          // const ajaxFunc = addNotice;
          // ajaxFunc(data)
          //   .then((res) => {
          //     this.visible = false;
          //     this.$message.success(`${this.updateId ? "修改" : "新增"}成功`);
          //     this.$emit("refreshDataList");
          //   })
          //   .catch((err) => {
          //     this.$emit("refreshDataList");
          //   });
        }
      });
    },
    beforeUpload(file) {
      console.log("beforeUpload", file);
      return true;
    },
    handleExceed() {},
    handleChange(file, fileList) {
      console.log("handleChange", file, fileList);

      const currentFiles = this.form.files.map((v) => v.name);
      if (!currentFiles.includes(file.name)) {
        // 在这一步添加文件,
        this.form.files.push({ ...file });
        this.uploadData = {
          noticeFile: JSON.stringify({
            noticeTitle: this.form.name,
            noticeText: this.form.content,
            userId: this.userInfo.id,
            userName: this.userInfo.userName,
          },)
        };
      }
    },
    handleSuccess(response, file, fileList) {
      console.log("handleSuccess", response, file);

      this.$message.success(`上传成功`);
      this.resetData();
      this.$emit("refreshDataList");
    },
    handleError(err, file, fileList) {
      console.log("handleError", err, file);

      this.$message.success(`上传失败,请重试!`);
      this.resetData();
      this.$emit("refreshDataList");
    },
    handleRemove(file, fileList) {
      this.form.files = fileList;
      this.uploadData = {};
    },
    resetData() {
      this.visible = false;
      this.$refs.form.resetFields();
      this.form.files = [];
      this.uploadData = {};
      this.$refs.upload.clearFiles();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  font-size: 24px;
  margin-right: 10px;
}
</style>

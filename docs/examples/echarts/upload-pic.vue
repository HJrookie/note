<template>
  <el-dialog :title="title" width="600px" :modal-append-to-body="false" :close-on-click-modal="false" :visible.sync="visible" :before-close="resetDialogData">
    <el-row>
      <!--      <el-form label-width="100px" :model="form" :rules="rules" ref="form">-->
      <!--        &lt;!&ndash;        <el-input type="textarea" :rows="4" placeholder="请输入" v-model="item.value"> </el-input>&ndash;&gt;-->

      <!--        &lt;!&ndash;        <input type="file" style="display: none" ref="file" @change="handleCcc"></input>&ndash;&gt;-->
      <!--        &lt;!&ndash;        <el-form-item label="Excel文件" prop="wenjian">&ndash;&gt;-->
      <!--        &lt;!&ndash;          <el-row type="flex">&ndash;&gt;-->
      <!--        &lt;!&ndash;            <el-input v-model="form.name" disabled></el-input>&ndash;&gt;-->
      <!--        &lt;!&ndash;            <el-button style="margin-left: 20px;" @click="hhhh">选择文件</el-button>&ndash;&gt;-->
      <!--        &lt;!&ndash;          </el-row>&ndash;&gt;-->
      <!--        &lt;!&ndash;        </el-form-item>&ndash;&gt;-->
      <!--      </el-form>-->

      <div class="note">请粘贴图片 或 拖拽图片至此</div>

      <el-upload :action="uploadUrl" :data="uploadData" :show-file-list="false" drag accept="image/*" :on-success="(...v) => handleSuccess(...v, info)">
        <template v-if="img">
          <img :src="img" alt="" />
          <!--                <span class="upload-action">-->
          <!--                  <i class="el-icon-delete"></i>-->
          <!--                </span>-->
        </template>
        <template v-else>
          <i class="el-icon-upload"></i>
        </template>
        <!--              <i v-if="item.imgSrc" slot="default" class="el-icon-plus"></i>-->
        <!--              <div slot="file" slot-scope="{ file }">-->
        <!--                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />-->
        <!--                <span class="el-upload-list__item-actions">-->
        <!--                  <span class="el-upload-list__item-delete" @click="handleRemove(item, file)">-->
        <!--                    <i class="el-icon-delete"></i>-->
        <!--                    &lt;!&ndash;                  &ndash;&gt;-->
        <!--                  </span>-->
        <!--                </span>-->
        <!--              </div>-->
      </el-upload>

      <div class="tips">{{ tip }}</div>

      <div id="preview"></div>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="resetDialogData">取 消</el-button>
      <el-button type="primary" @click="subbbbbbbbbb">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addFabu, getFabuData, getkuData, getNianjis, submitStuTask, uploadImg } from "@/api/user";
import moment from "moment";
// import  XLSX from "https://cdn.sheetjs.com/xlsx-0.19.2/xlsx-0.19.2.tgz"
export default {
  props: {},
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/uploader",
      uploadData: {
        userid: JSON.parse(localStorage.getItem("stuInfo") ?? "{}")?.userid,
      },
      visible: false,
      isUpdate: false,
      id: undefined,
      info: {},
      title: "",
      tip: "",
      img: "",
    };
  },
  watch: {},
  created() {},
  beforeDestroy() {},
  mounted() {
    window.addEventListener("paste", this.uploadFile);
  },
  destroyed() {
    window.removeEventListener("paste", this.uploadFile);
  },
  methods: {
    uploadFile(event) {
      let preview = document.getElementById("preview");
      var items = (event.clipboardData || window.clipboardData).items;
      var file = null;
      if (items && items.length) {
        // 搜索剪切板items
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
      } else {
        this.tip = "当前浏览器不支持";
        // log.innerHTML = '<span style="color:red;">当前浏览器不支持</span>';
        return;
      }
      if (!file) {
        this.tip = "粘贴内容非图片";
        // log.innerHTML = '<span style="color:red;">粘贴内容非图片</span>';
        return;
      }
      // 此时file就是我们的剪切板中的图片对象
      // 如果需要预览，可以执行下面代码
      var reader = new FileReader();
      // reader.onload = function (event) {
      //   preview.innerHTML = '<img src="' + event.target.result + '" width="400" class="upload-image">';
      // };
      reader.readAsDataURL(file);
      // 如果不需要预览，上面这段可以忽略
      let data = new FormData();
      data.set("file", file);
      data.set("userid", JSON.parse(localStorage.getItem("stuInfo") ?? "{}")?.userid);
      uploadImg(data)
        .then((res) => {
          l(99999, res);
          // 图片地址赋值给 img
          this.img = res?.result ?? "";
        })
        .catch((err) => {
          this.$message.error("上传失败,请重试");
        });
      // 这里是上传
      // var xhr = new XMLHttpRequest();
      // // 上传进度
      // if (xhr.upload) {
      //   xhr.upload.addEventListener(
      //     "progress",
      //     function (event) {
      //       log.innerHTML = "正在上传，进度：" + Math.round((100 * event.loaded) / event.total) / 100 + "%";
      //     },
      //     false
      //   );
      // }
      // // 上传结束
      // xhr.onload = function () {
      //   var responseText = xhr.responseText;
      //   log.innerHTML = "上传成功，地址是：" + responseText;
      // };
      // xhr.onerror = function () {
      //   log.innerHTML = '<span style="color:red;">网络异常，上传失败</span>';
      // };
      // xhr.open("POST", "./upload.php", true);
      // xhr.setRequestHeader("FILENAME", encodeURIComponent(file.name));
      // xhr.send(file);
    },
    dragFile(event) {
      let file = event.target;
      l(8888888, file);
    },
    sub() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
        }
      });
    },
    init(info) {
      console.log("info", info);
      this.visible = true;
      this.isUpdate = info ? true : false;
      this.title = "上传图片";
      this.info = info ?? {};
      this.$nextTick(() => {
        this.$refs.form?.resetFields();
      });
    },
    hhhh() {
      this.$refs.file.click();
    },
    resetDialogData() {
      this.id = undefined;
      this.isUpdate = false;
      this.visible = false;
      this.tip = "";
      this.img = "";
    },
    subbbbbbbbbb() {
      // 提交数据
      let data = {
        id: this.info.id,
        dept_id: JSON.parse(localStorage.getItem("stuInfo") ?? "{}")?.dept_id?.[0],
        task_type: "image",
        content: this.img,
      };
      submitStuTask(data)
        .then((res) => {
          this.$message.success("提交成功");
          this.resetDialogData();
        })
        .catch((err) => {
          this.$message.error("提交成功");
          this.resetDialogData();
        });
    },
    handleSuccess(response, file, files, item) {
      l("sssssssssss", response, file, files, item);
      // item.id = response?.id;
      // 图片地址赋值给 img
      this.img = response?.result;
      // URL.createObjectURL(file.raw);
      // this.form.pics.push({
      //   file: file,
      //   response,
      // });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tasks {
}
.note {
  height: 50px;
  line-height: 50px;
  //border: 1px solid #bbb;
}
.tbl1 {
  margin-top: 10px;
}
.tips {
  color: #e6a23c;
}
.el-dialog ::v-deep {
  .upload-image {
    width: 400px;
  }
}

.el-upload-list__item-thumbnail {
  width: 100%;
  height: 100%;
}

.el-upload--picture-card {
  height: 100px;
  width: 100px;
  line-height: 100px;
}
.el-upload-list--picture-card .el-upload-list__item {
  height: 100px;
  width: 100px;
  line-height: 100px;
}
.el-upload-dragger {
  width: 100%;
  height: 100%;
  .el-icon-upload {
    font-size: 24px;
    line-height: 100px;
    margin: 0;
  }
  img {
    height: 100%;
  }
}

.ack {
  width: 160px;
}
#preview {
  width: 560px;
  height: 400px;
  overflow: auto;
}
</style>

<template>
  <div class="compass-form" v-loading="loading">
    <el-form
      :ref="data.formConfig.ref || 'defaultRef'"
      :model="data.model"
      :rules="data.rules"
      :inline="data.formConfig.inline"
      :disabled="disabled"
      size="small"
      :label-width="data.formConfig.labelWidth"
      :label-position="data.formConfig.labelPosition"
      :hide-required-asterisk="hideRequiredAsterisk"
      :style="data.formConfig.style"
    >
      <el-form-item
        v-for="(item, i) of data.items"
        :label="item.label"
        :prop="'items.' + i + '.value'"
        :key="'items.' + i + '.value'"
        :label-width="item.labelWidth"
      >
        <template v-if="item.inputType === 'select'">
          <el-select
            v-model="item.value"
            filterable
            value-key="value"
            :multiple="item.multiple"
            :placeholder="formatPlaceholder(item)"
            :style="item.style"
            clearable
            :disabled="item.disabled"
          >
            <el-option
              v-for="(option, j) of getOptions(item.options)"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>

        <template v-else-if="item.inputType === 'input'">
          <el-input
            v-model="item.value"
            :placeholder="formatPlaceholder(item)"
            :style="item.style"
            clearable
          />
        </template>

        <template v-else-if="item.inputType === 'inputNumber'">
          <el-input-number
            v-model="item.value"
            :min="1000"
            :max="9999"
            :label="formatPlaceholder(item)"
          ></el-input-number>
        </template>

        <template v-else-if="item.inputType === 'date'">
          <el-date-picker
            v-model="item.value"
            style="width: 100%"
            :value-format="formatDateValue(item.format)"
            :type="item.dateType"
            :placeholder="formatPlaceholder(item)"
            :range-separator="item.dateRangeSeparator"
            :start-placeholder="item.dateStartPlaceholder"
            :end-placeholder="item.dateEndPlaceholder"
          />
        </template>
        <template v-else-if="item.inputType === 'check'">
          <!--            todo  这个是单选,多选的代码没来得及写-->
          <el-checkbox v-model="item.value" />
        </template>

        <template v-else-if="item.inputType === 'input-textarea'">
          <el-input
            v-model="item.value"
            type="textarea"
            :placeholder="formatPlaceholder(item)"
            :style="item.style"
          />
        </template>
      </el-form-item>

      <template>
        <slot name="buttons" />
      </template>
    </el-form>

    <!--  图片预览  -->
    <el-dialog title="图片预览" width="800px" :visible.sync="picturePreviewVisible" append-to-body>
      <img :src="picturePreviewUrl" class="preview-img" alt="图片预览" />
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { uuid } from "@/utils";
import { mapGetters } from "vuex";

export default {
  name: "MyForm",
  dicts: [
    "sys_contest_years",
    "sys_contest_groups",
    "sys_contest_rule",
    "sys_contest_items",
    "sys_role_others",
    "sys_apply_status",
  ],
  filters: {
    getDefaultReportName(value) {
      return value ?? "-";
    },
    getReportTime(time) {
      return time.split(" ")?.[0] ?? "-";
    },
  },
  props: {
    data: {
      type: Object,
    },
    hideRequiredAsterisk: {
      type: Boolean,
      require: false,
    },
    disabled: {
      type: Boolean,
      require: false,
    },
    companyId: {
      type: Number,
    },
  },
  data() {
    return {
      uploadImgUrl: process.env.VUE_APP_BASE_API + "/report/single/file",
      fileInfoUrl: process.env.VUE_APP_BASE_API + "/",
      uploadImgHeaders: {
        JSESSIONID: getToken(),
      },
      current: [],
      picturePreviewVisible: false,
      picturePreviewUrl: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["dicts"]),  // 字典
  },
  created() {
    const allAsyncOptions = [];
    this.data.items.forEach((item, i) => {
      this.data.rules = {
        ...this.data.rules,
        [`items.${i}.value`]: [
          {
            message: this.formatPlaceholder(item),
            required: item.required ?? false,
            trigger: item.trigger ?? "change",
          },
        ],
      };
      // 初始化选项
      if (
        item.inputType === "select" &&
        Object.prototype.toString.call(item.options) === "[object Object]"
      ) {
        allAsyncOptions.push(item);
      }
    });
    this.data.model = {
      items: [...this.data.items],
    };
    // 如果有就开始获取那些异步加载的选项
    if (allAsyncOptions.length) {
      this.loading = true;
      Promise.all(
        allAsyncOptions.map((item) => {
          return new Promise((resolve, reject) => {
            const { options } = item;
            if (options.ajax) {
              const dictKey = options.dictName;
              this[dictKey] = [];

              // 默认的分页参数
              const defaultParams = {
                pageNum: 1,
                pageSize: 100,
              };

              options
                .ajax(defaultParams)
                .then((res) => {
                  // 格式化结果, 修改 loading 状态,则组件重新渲染, getOptions 可获取最新数据
                  this.dict.type[dictKey] = (res?.rows || []).reduce((prev, cur) => {
                    prev.push({
                      label: cur?.[options.labelKey] || "",
                      value: cur?.[options.valueKey],
                    });
                    return prev;
                  }, []);
                  resolve();
                })
                .catch((err) => {
                  console.log("err", err);
                  reject();
                });
            }
          });
        })
      )
        .then((res) => {
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
        });
    }
  },
  methods: {
    getOptions(options) {
      if (!options) {
        return [];
      }
      if (typeof options === "string" && !options?.trim()) {
        return [];
      }
      // 可以是一个数组,如果是数组,就用里面的选项
      if (Array.isArray(options)) {
        return [...options];
      }
      if (Object.prototype.toString.call(options) === "[object Object]") {
        // l(33, this.dict?.type[options.dictName], options.dictName);

        if (options.ajax) {
          if (this.loading) {
            return [];
          }
          return this.dict?.type[options.dictName] ?? [];
        }
        return [];
      }
      // 如果包含下划线 , 代表是维护在字典表里(也就是数据库中的),
      if (options.includes("_")) {
        return (
          this.dict?.type[options]?.map((v) => ({
            label: v.label,
            value: v.value,
          })) ?? []
        );
      }
      // 从 vuex 中取的数据, 在 src/store/modules/user.js
      return this.dicts[options] ?? [];
    },
    formatPlaceholder(item) {
      if (!item || item.blankPlaceholder) {
        return "";
      }
      if (item.placeholder) {
        return item.placeholder;
      }
      const map = {
        select: "请选择",
        input: "请输入",
        date: "请选择",
      };
      return `${map[item.inputType] ?? ""}${item.label}`;
    },
    getFormData() {
      return this.data.items.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.prop]: cur.value,
        }),
        {}
      );
    },
    formatDateValue(format) {
      const defaultValue = "yyyy-MM-dd HH:mm:ss";
      return format || defaultValue;
    },
    resetFormData() {
      const formName = this.data.formConfig.ref || "defaultRef";
      this.$refs[formName].resetFields();
    },
    submitForm(callback) {
      const formName = this.data.formConfig.ref || "defaultRef";
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback ? callback() : undefined;
        } else {
          return false;
        }
      });
    },
  },
};
</script>

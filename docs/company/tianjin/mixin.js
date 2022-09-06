export default {
  data() {
    /* eslint-disable */
    return {
      // 设置属性
      mixinOptions: {
        activatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        createdIsNeed: true, // 此页面是否在创建时，调用查询数据列表接口？
        hasLoading: true,
        getDataListAjax: null, // 数据列表接口
        queryDataFormatter: null, // 对表单数据进行转换,得到查询时所需要的参数
        deleteAjax: null, // 删除接口
        deleteIsBatch: false, // 删除接口，是否需要批量？
        deleteKey: "id", // 删除接口，批量状态下由那个key进行标记操作？比如：pid，uid...
        updateKey: "id", // 编辑对应的id
        exportUrl: "",
        clearSelection: true, // 重置操作的时候是否清空列表checkbox
        clearSort: true, // 重置操作的时候是否清空排序状态
        dateRangeStartKey: "startDate",
        dateRangeEndKey: "endDate",

        formRefName: "form",
      },
      // 默认属性
      form: {}, // 查询条件
      dateRange: [], // 时间区间
      tableData: [], // 数据列表
      isAsc: false, // 排序方式 true／false
      orderByCol: "", // 排序字段 可为空
      page: 1, // 当前页码
      pageSize: 10, // 每页数
      total: 0, // 总条数
      ids: [],
      loading: false, // 数据列表，loading状态
      dataListSelections: [], // 数据列表，多选项
      addOrUpdateVisible: false, // 新增／更新，弹窗visible状态
      detailVisible: false, // 详情 弹框visible状态
      importFileVis: false,

      yearTypeMap: {
        "今年": 1,
        "往年": 2,
      },
    };
  },
  activated() {

  },
  created() {
    if (this.mixinOptions.createdIsNeed) {
      this.query();
    }
  },
  methods: {
    // 重置
    resetHandle(refName = "form") {
      this.page = 1;
      this.pageSize = 10;
      this.total = 0;
      if (this.$refs[refName] && "resetFormData" in this.$refs[refName]) {
        this.$refs[refName]?.resetFormData();
      } else {
        this.$refs[refName]?.resetFields();
      }
      this.query();
    },

    // 获取数据列表
    query(data) {
      if (!this.mixinOptions.getDataListAjax) {
        return false;
      }
      if (this.mixinOptions.hasLoading) {
        this.loading = true;
      }
      // 初始化查询接口所需数据
      if (!data) {
        let formData = {};
        const formRef = this.$refs[this.mixinOptions.formRefName];
        if (formRef && "getFormData" in formRef) {
          formData = this.$refs[this.mixinOptions.formRefName].getFormData();
        } else {
          formData = this.form;
        }
        const pagination = {
          pageNum: this.page,
          pageSize: this.pageSize,
        };
        // console.log("formData", formData);
        if (this.mixinOptions.queryDataFormatter) {
          data = this.mixinOptions.queryDataFormatter(formData, pagination);
        } else {
          data = { ...formData };
        }
      }
      this.mixinOptions
        .getDataListAjax(data)
        .then((res) => {
          this.loading = false;
          this.tableData = res?.rows || [];
          this.total = res?.total ?? 0;
          resolve(res);
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      if (id === true) {
        this.$nextTick(() => {
          let ids = this.dataListSelections.map((item) => item[this.mixinOptions.updateKey]);
          this.$refs.addOrUpdate.init(ids.length > 0 ? ids[0] : undefined);
        });
      } else {
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id);
        });
      }
    },
    // 详情
    detailHandle(id) {
      this.detailVisible = true;
      this.$nextTick(() => {
        this.$refs.detail.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      let type = Object.prototype.toString.call(id).match(/\[object (\w+)\]/)[1];
      let isOnly = ["String", "Number"].includes(type);
      this.$confirm(`是否确认删除${isOnly ? "该" : "选中的"}数据项`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.mixinOptions.deleteAjax) {
            let ids = isOnly ? [id] : this.dataListSelections.map((item) => item[this.mixinOptions.deleteKey]);
            return this.mixinOptions.deleteAjax(ids);
          }
        })
        .then(() => {
          this.page = 1;
          this.pageSize = 10;
          this.total = 0;
          this.query();
          this.$message({ message: "删除成功", type: "success" });
        })
        .catch(() => { });
    },
    importFile() {
      this.importFileVis = true;
      this.$nextTick(() => {
        this.$refs.importFileRef.init();
      });
    },
  },
};

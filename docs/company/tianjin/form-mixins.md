#### 以上讲的 mixins 以及 form 封装可以用在同一个代码中
如下所示,这样子可以很大程度上减少多余的代码
```vue
<template>
  <div class="app-container">
    <div class="query-form">
      <my-form :data="form" ref="form">
        <template v-slot:buttons>
          <el-form-item style="margin-left: 0px">
            <el-button icon="el-icon-search"  @click="query()">查 询</el-button>
            <el-button icon="el-icon-refresh"  @click="resetHandle()">重 置</el-button>
          </el-form-item>
        </template>
      </my-form>
    </div>

    <div class="table-wrapper">
      <el-row style="margin-bottom: 8px">
        <el-button plain icon="el-icon-plus"  @click="addNew()">新增</el-button>
      </el-row>

      <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip min-width="80"> </el-table-column>
        <el-table-column label="操作" width="200px" align="center" fixed="right">
          <template slot-scope="{ row }">
            <div class="tbl-col-hover table-col-operations">
              <el-button icon="el-icon-edit" @click="edit(row)">修改</el-button>
              <el-button icon="el-icon-delete" @click="deleteHandle(row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="end" class="table-pagination">
        <el-pagination
          background
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="page"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </div>
    <add-or-update @refreshDataList="query" ref="addOrUpdateRef" v-if="addOrUpdateVisible"></add-or-update>
  </div>
</template>

<script>
export default {
  components: {
    AddOrUpdate,
  },
  mixins: [FormTableMixins],
  data() {
    const queryDataFormatter = (formData, pagination) => {
      const { name: competitionName, status } = formData;
      return {
        status,
        competitionName,
        ...pagination,
      };
    };
    return {
      mixinOptions: {
        deleteAjax: deleteContestInfo,
        getDataListAjax: getContestInfoOne,
        "queryDataFormatter": queryDataFormatter,
      },
      form: {
        formConfig: {
          inline: true,
          ref: "test-form-ref", // form的 ref
          labelWidth: "75px",
        },
        items: [
          {
            prop: "name",
            value: undefined,
            label: "赛事名称",
            inputType: "input",
            blankPlaceholder: false,
          },
          {
            prop: "status",
            value: undefined,
            label: "状态",
            inputType: "select",
            options: "contestStatus",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["dicts"]),
  },
  methods: {
    addNew(rowInfo) {
      console.log("rowInfo", rowInfo);
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdateRef.init(rowInfo);
      });
    },
    edit(rowInfo) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdateRef.init(rowInfo);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.query();
    },
  },
};
</script>
```
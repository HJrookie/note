#### mixins 
mixins 作为一种灵活的重用功能的方式,有其自身优点和缺点.综合来论,其优点在于灵活,易用,方便复用逻辑,
但是最大的缺点也来源于此,多人合作项目中陌生的 mixins 相当于是一种黑盒,不清楚其内部实现,并且其具有侵入性,可能会带来问题  
如果合理使用,也有其价值,例如,单人开发某个项目时,或者大家的水平都比较好,写出的代码简单易懂,mixins 非常易读  

#### 使用场景
本项目中大量存在 上方为表单筛选项,下方为表格,并且有数据的增删改查的基本逻辑,由此,增加适用于该场景的 mixins

#### data 部分
这里抽象出了 常用的一些功能要用到的字段,例如 table,loading,分页,新增/修改弹窗 flag,deleteKey,
@[code{2-44} js](./mixin.js)

#### methods 部分
@[code{54-160} js](./mixin.js)

#### 使用 mixins 的例子
```vue
<template>
  <div class="app-container">
    <div class="query-form">
      <my-form :data="form" ref="form">
        <template v-slot:buttons>
          <el-form-item style="margin-left: 0px">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="query()">查 询</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetHandle()">重 置</el-button>
          </el-form-item>
        </template>
      </my-form>
    </div>

    <div class="table-wrapper">
      <el-row style="margin-bottom: 8px">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="addNew()">新增</el-button>
      </el-row>

      <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="操作" width="200px" align="center" fixed="right">
          <template slot-scope="{ row }">
            <div class="tbl-col-hover table-col-operations">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)">修改</el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="deleteHandle(row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="end" class="table-pagination">
        <el-pagination
          :page-size.sync="pageSize"
          :current-page.sync="page"
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
    // 这个函数会在 query 的时候被调用
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
    };
  },
  computed: {
    ...mapGetters(["dicts"]),
  },
  methods: {
    addNew(rowInfo) {
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
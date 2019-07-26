<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="楼宇名称：">
            <el-input v-model="listQuery.id" class="input-width" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="楼宇状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="楼宇主管：">
            <el-input v-model="listQuery.handleMan" class="input-width" placeholder="全部"></el-input>
          </el-form-item>
          
          <el-form-item label="操作人员：">
            <el-input v-model="listQuery.handleMan" class="input-width" placeholder="全部"></el-input>
          </el-form-item>
          <el-form-item label="处理时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.handleTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addBuilding()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="图片" width="140%">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      
      <el-table-column label="楼宇名称" width="240%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="240%" align="center">
        <template slot-scope="scope">
          {{ scope.row.localtion }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="主管责任人" width="140%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.managerName}} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" width="160%">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="状态" width="140%">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="140%">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)"></i>
          <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></i>
          </template>
      </el-table-column>
    </el-table>
    <div class="el-pagination">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 200, 300, 400]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form>
        <el-form-item>
          <span>ssss</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/building'

const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    orderSn: null,
    receiverKeyword: null,
    status: null,
    orderType: null,
    sourceType: null,
    createTime: null,
  };

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      listQuery: Object.assign({}, defaultListQuery),
      dialogVisible: false,
      dialogTitle:'',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    addBuilding() {
      this.$router.push({path:'/real-estate/addBuilding'});
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.fetchData();
    }
  }
}
</script>

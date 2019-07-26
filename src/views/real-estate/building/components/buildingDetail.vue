<template>
  <div class="app-container">
    <el-card class="form-container" shadow="never" >
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="建筑信息"></el-step>
        <el-step title="联系信息"></el-step>
      </el-steps>
      <building-basic-detail
        v-show="showStatus[0]"
        v-model="buildingParam"
        :is-edit="isEdit"
        @nextStep="nextStep"
      ></building-basic-detail>
      <product-sale-detail
        v-show="showStatus[1]"
        v-model="buildingParam"
        :is-edit="isEdit"
        @nextStep="nextStep"
        @prevStep="prevStep"
      ></product-sale-detail>
      <product-relation-detail
        v-show="showStatus[2]"
        v-model="buildingParam"
        :is-edit="isEdit"
        @prevStep="prevStep"
        @finishCommit="finishCommit"
      ></product-relation-detail>
    </el-card>
  </div>
</template>
<script>
import buildingBasicDetail from "./buildingBasicDetail";



const defaultbuildingParam = {
  albumPics: "",
  buildingName: ""
};
export default {
  name: "buildingDetail",
  components: { buildingBasicDetail, buildingBasicDetail, buildingBasicDetail },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      buildingParam: Object.assign({}, defaultbuildingParam),
      showStatus: [true, false, false]
    };
  },
  methods: {
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    finishCommit(isEdit) {
      this.$confirm("是否要提交该楼宇信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (isEdit) {
          updateBuilding(this.$route.query.id, this.buildingParam).then(
            response => {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.$router.back();
            }
          );
        } else {
          addBuilding(this.buildingParam).then(response => {
            this.$message({
              type: "success",
              message: "提交成功",
              duration: 1000
            });
            location.reload();
          });
        }
      });
    }
  }
};
</script>
<style>
.form-container {
  width: 100%;
}
</style>



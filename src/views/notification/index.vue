<template>
  <el-card>
    <el-table
        :data="tableData"
        style="width: 100%"
    >
      <el-table-column fixed prop="nid" label="#ID" width="120" />
      <el-table-column prop="image" label="公告详情" width="150" >
        <template v-slot="scope">
          <img :src="'http://localhost:8080/appletImages/'+scope.row.image" width="100" height="100">
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="公告描述" width="150"/>
      <el-table-column fixed="right" label="管理公告" >
        <template #default>
          <el-button type="primary" >删除该公告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" >添加新公告</el-button>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/util/axios'

const tableData =ref([])

const initNotification=async ()=>{
  const res = await axios.get("/notification/findSwiper")
  tableData.value=res.data.data
}

initNotification();

</script>

<style lang="scss" scoped>
.header{
  padding-bottom: 16px;
  box-sizing: border-box;
}
.el-pagination{
  padding-top: 15px;
  box-sizing: border-box;
}
.el-button--primary{
  margin-top: 15px;
  margin-bottom: 0px;
}
</style>
<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px" class="sidebar-container"><Menu/></el-aside>
      <el-container>
        <el-header>
          <div class="navbar">
            <Breadcrumb/>
            <div class="navbar-right">
              <Avatar/>
            </div>
          </div>
        </el-header>
        <el-main><router-view/></el-main>
        <el-footer><Footer/></el-footer>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Menu from '../../views/layout/menue';
import Breadcrumb from '@/views/layout/header/breadcrumb'
import Avatar from '@/views/layout/header/avatar'
import Footer from '@/views/layout/footer'
</script>

<style lang="scss" scoped>

.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px #2d364b;//
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    :deep(.navbar-item) {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #2d364b;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}

:deep(.el-header){

  padding: 0px;
}

.app-wrapper {
  position: relative;

  width: 100%;
  height: 100%;
}
.sidebar-container{
  background-color: #9A2B1EFF;
  height: 100%;
}
:deep(.el-container){

  height: 100%;
}
:deep(ul.el-menu){
  background-color: #9A2B1EFF;
  border-right-width: 0px;
}
</style>
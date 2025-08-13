<template>
  <div class="container-fluid">
    <div class="inner-main-content">
      <ProjectProgress />

      <div class="revenue-progress-roadmap-area">
        <div class="row">
          <div class="col-lg-6 col-xxl-3">
            <ProjectProgressChart />
          </div>

          <div class="col-lg-6 col-xxl-4">
            <BrowserStats />
          </div>

          <div class="col-lg-12 col-xxl-5">
            <!-- <ChatProjectUser /> -->
            <ToDoList />
          </div>

          <ProjectTable />

        </div>
      </div>      

      <MainFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectProgress from "../../components/Widgets/ProjectProgress.vue";
import ProjectProgressChart from "../../components/Dashboard/ProjectManagement/ProjectProgressChart.vue";
// import ChatProjectUser from "../../components/Dashboard/CRM/ChatProjectUser.vue";
import ToDoList from "../../components/Dashboard/ProjectManagement/ToDoList/index.vue";
import BrowserStats from "../../components/Dashboard/Analytics/BrowserStats/index.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";
import ProjectTable from "../../components/Dashboard/ProjectManagement/ProjectTable/index.vue";

</script>
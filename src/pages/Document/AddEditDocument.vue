<template>
  <div class="container-fluid">
    <div class="inner-main-content">
      <div
        class="card-title d-flex justify-content-between align-items-center mb-3"
      >
        <h3 class="fw-medium fs-18 mb-0">Document Details</h3>
      </div>

      <DocumentForm />

      <MainFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import DocumentForm from "../../components/Document/DocumentForm.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";

</script>

<script lang="ts">
export default {
  name: "AddEditDocumentPage",
};
</script>
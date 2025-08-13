<template>
  <div class="container-fluid">
    <div class="inner-main-content">
      <div
        class="card-title d-flex justify-content-between align-items-center mb-3"
      >
        <h3 class="fw-medium fs-18 mb-0">Products Details</h3>
      </div>
      <ProductsDetails />

      <MainFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductsDetails from "../../components/Ecommerce/ProductsDetails/ProductsDetails.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";

export default defineComponent({
  name: "ProductsDetailsPage",
  components: {
    ProductsDetails,
    MainFooter,
  },
});
</script>
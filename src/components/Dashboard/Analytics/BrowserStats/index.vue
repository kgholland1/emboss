<template>
  <div
    class="card border-0 box-shadow border-radius-10 mb-4 transaction browser-stats"
  >
    <div class="card-body p-4 mb-4">
      <div
        class="card-title d-flex justify-content-between align-items-center mb-4"
      >
        <h3 class="fw-medium fs-18 mb-0">Regional Stats</h3>

        <select
          class="form-select border-0"
          aria-label="Default select example"
        >
          <option selected>30 Days</option>
          <option value="1">25 Days</option>
          <option value="2">20 Days</option>
          <option value="3">15 Days</option>
        </select>
      </div>

      <ul class="ps-0 mb-0 list-unstyled scroll-bar h-608">
        <li
          class="d-flex align-items-center justify-content-between border-bottom border-color pb-3 mb-3"
          v-for="reg in topRegionalStats"
          :key="reg.id"
        >
          <div class="d-flex align-items-center">
            <!-- <img
              :src="require(`../../../../assets/images/${browser.image}`)"
              alt="Browser"
            /> -->
            <h4 class="ms-3 fs-14 fw-medium text-body mb-0">
              {{ reg.region }}
            </h4>
          </div>
          <span class="fw-medium fs-14 text-body">{{ reg.fees }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">

import useSearch from '@/Use/useDocumentList'
import { type DocumentData } from "@/data/document-data"

type RegionFee = { id: number; region: string; fees: number }

const { searchResults } = useSearch()

const getTopRegions = (docs: DocumentData[]): RegionFee[] =>
  Object.entries(
    docs.reduce<Record<string, number>>((acc, { region, fee }) => {
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([region, total]) => ({ region, fees: parseFloat(total.toFixed(2)) }))
    .sort((a, b) => b.fees - a.fees)
    .slice(0, 6)
    .map((item, index) => ({ id: index + 1, ...item }))

    const topRegionalStats = getTopRegions(searchResults.value)

</script>
<script lang="ts">
import { defineComponent } from "vue";
import browserStats from "./browserStats.json";

export default defineComponent({
  name: "BrowserStats",
  data() {
    return {
      browsers: browserStats,
    };
  },
});
</script>

<style lang="scss" scoped>
.browser-stats {
  ul {
    li {
      &:last-child {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
        border-bottom: 0 !important;
      }
    }
  }
}
</style>
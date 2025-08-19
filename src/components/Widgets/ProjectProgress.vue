<template>
  <div class="row justify-content-center">
    <div class="col-xxl-4 col-md-6">
      <div class="card border-0 box-shadow border-radius-10 mb-4">
        <div class="card-body p-4">
          <div class="d-flex">
            <div class="flex-grow-1 me-3">
              <h3 class="fw-medium fs-18">Pending: {{ pendingDocs.length }}</h3>
              <span class="text-body">Awaiting processing</span>
              <h1 class="fw-medium fs-30 mb-3">{{ pendingDocs.length }}</h1>
              <div
                class="progress rounded-0 mb-0 progress-width"
                role="progressbar"
                aria-label="Basic example"
                :aria-valuenow="pendingPercent"
                aria-valuemin="0"
                aria-valuemax="100"
                style="height: 10px; background-color: #f4f6fa; width: 210px"
              >
                <div
                  class="progress-bar bg-danger rounded-0"
                  :style="{ width: pendingPercent + '%', height: '10px' }"
                ></div>
              </div>
              <p class="fs-12 text-dark lh-1 mt-2">
                <span class="text-danger">{{ pendingPercent }}%</span> is waiting for processing 
              </p>
            </div>
            <div class="flex-shrink-0">
              <img
                src="../../assets/images/icons/project-icon-4.svg"
                alt="project-icon-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xxl-4 col-md-6">
      <div class="card border-0 box-shadow border-radius-10 mb-4">
        <div class="card-body p-4">
          <div class="d-flex">
            <div class="flex-grow-1 me-3">
              <h3 class="fw-medium fs-18">Processing: {{ processingDocs.length }}</h3>
              <span class="text-body">In-Progress</span>
              <h1 class="fw-medium fs-30 mb-3">{{ processingDocs.length }}</h1>
              <div
                class="progress rounded-0 mb-0 progress-width"
                role="progressbar"
                aria-label="Basic example"
                :aria-valuenow="processingPercent"
                aria-valuemin="0"
                aria-valuemax="100"
                style="height: 10px; background-color: #f4f6fa; width: 210px"
              >
                <div
                  class="progress-bar bg-warning rounded-0"
                  :style="{ width: processingPercent + '%', height: '10px' }"
                ></div>
              </div>
              <p class="fs-12 text-dark lh-1 mt-2">
                <span class="text-warning">{{ processingPercent }}%</span> is in process
              </p>
            </div>
            <div class="flex-shrink-0">
              <img
                src="../../assets/images/icons/project-icon-3.svg"
                alt="project-icon-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xxl-4 col-md-6">
      <div class="card border-0 box-shadow border-radius-10 mb-4">
        <div class="card-body p-4">
          <div class="d-flex">
            <div class="flex-grow-1 me-3">
              <h3 class="fw-medium fs-18">Total Documents: {{ searchResults.length }}</h3>
              <span class="text-body">Complete project</span>
              <h1 class="fw-medium fs-30 mb-3">{{ completeDocs.length }}</h1>
              <div
                class="progress rounded-0 mb-0 progress-width"
                role="progressbar"
                aria-label="Basic example"
                :aria-valuenow="completePercent"
                aria-valuemin="0"
                aria-valuemax="100"
                style="height: 10px; background-color: #f4f6fa; width: 210px"
              >
                <div
                  class="progress-bar bg-success rounded-0"
                  :style="{ width: completePercent + '%', height: '10px' }"
                ></div>
              </div>
              <p class="fs-12 text-dark lh-1 mt-2">
                <span class="text-success">{{ completePercent }}%</span> of the total project is
                complete
              </p>
            </div>
            <div class="flex-shrink-0">
              <img
                src="../../assets/images/icons/project-icon-2.svg"
                alt="project-icon-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-xxl-3 col-md-6">
      <div class="card border-0 box-shadow border-radius-10 mb-4">
        <div class="card-body p-4">
          <div class="d-flex">
            <div class="flex-grow-1 me-3">
              <h3 class="fw-medium fs-18">Productivity: ₵{{ productivity }}</h3>
              <span class="text-body">Revenue</span>
              <h1 class="fw-medium fs-30 mb-3">₵{{ totalFees }}</h1>
              <div
                class="progress rounded-0 mb-0 progress-width"
                role="progressbar"
                aria-label="Basic example"
                :aria-valuenow="productivityPercent"
                aria-valuemin="0"
                aria-valuemax="100"
                style="height: 10px; background-color: #f4f6fa; width: 210px"
              >
                <div
                  class="progress-bar bg-primary rounded-0"
                  :style="{ width: productivityPercent + '%', height: '10px' }"
                ></div>
              </div>
              <p class="fs-12 text-dark lh-1 mt-2">
                Revenue earned this week
                <span class="text-primary">{{ productivityPercent }}%</span>
              </p>
            </div>
            <div class="flex-shrink-0">
              <img
                src="../../assets/images/icons/project-icon-1.svg"
                alt="project-icon-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import useSearch from '@/Use/useDocumentList'
import { type DocumentData } from "@/data/document-data"

const { searchResults, loadDocs } = useSearch()

const completeDocs = ref<DocumentData[]>(loadDocs("Complete"))

const completePercent = computed<number>(() => {
  if (!searchResults) return 0 
    return Math.ceil(completeDocs.value.length / searchResults.value.length * 100)
  })

const processingDocs = ref<DocumentData[]>(loadDocs("Processing"))

const processingPercent = computed<number>(() => {
  if (!searchResults) return 0 
    return Math.floor(processingDocs.value.length / searchResults.value.length * 100)
  })

const pendingDocs = ref<DocumentData[]>(loadDocs("Pending"))

const pendingPercent = computed<number>(() => {
  if (!searchResults) return 0 
    return Math.floor(pendingDocs.value.length / searchResults.value.length * 100)
  })

// const totalFees = computed<number>(() => Math.trunc(searchResults.value.reduce((prev, cur) => prev += cur.fee, 0)))

// const productivity = computed<number>(() => Math.trunc(completeDocs.value.reduce((prev, cur) => prev += cur.fee, 0)))

// const productivityPercent = computed<number>(() => {
//   if (!searchResults) return 0 
//     return Math.floor(productivity.value / totalFees.value * 100)
//   })

</script>

<script lang="ts">
export default {
  name: "ProjectProgress",
};
</script>
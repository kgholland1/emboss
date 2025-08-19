<template>
  <div class="card border-0 box-shadow border-radius-10 mb-4">
    <div class="card-body p-4">
      <div class="card-title d-flex justify-content-between mb-3">
        <h3 class="fw-medium fs-18 mb-0">Documents Progress</h3>

        <ul class="ps-0 mb-0 list-unstyled legend-list">
          <li class="text-body">Pending</li>          
          <li class="text-body mb-1">In Progress</li>
          <li class="text-body mb-1">Complete</li>
        </ul>
      </div>

      <div id="project_progress"></div>
      <apexchart
        type="donut"
        height="252"
        :options="projectProgress"
        :series="documents"
      ></apexchart>

      <ul
        class="d-flex justify-content-between ps-0 mb-0 list-unstyled progress-list mt-3"
      >
          <li>
          <span class="d-block text-body mb-2">Pending</span>
          <span class="d-block text-danger">{{ pendingPercent }}%</span>
        </li>
        <li>
          <span class="d-block text-body mb-2">In Progress</span>
          <span class="d-block text-warning">{{ processingPercent }}%</span>
        </li>
        <li>
          <span class="d-block text-body mb-2">Complete</span>
          <span class="d-block text-success">{{ completePercent }}%</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import useSearch from '@/Use/useDocumentList'
import { type DocumentData } from "@/data/document-data"
//const searchItem = ref<string>("")
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


const documents = [pendingDocs.value.length, processingDocs.value.length, completeDocs.value.length, ]

const projectProgress = {
        labels: ["Pending", "In Progress", "Complete"],
        chart: {
          height: 252,
          type: "donut",
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
          fontSize: "12px",
          fontFamily: "Inter",
          position: "right",
          labels: {
            colors: ["#919AA3"],
          },
          markers: {
            radius: 0,
            width: 7,
            height: 7,
          },
          itemMargin: {
            horizontal: 0,
            vertical: 5,
          },
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "round",
          colors: "#fff",
          width: 0,
          dashArray: 0,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: "70%",
              background: "transparent",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "20px",
                  color: "#495057",
                  offsetY: -4,
                },
                value: {
                  show: true,
                  fontSize: "18px",
                  color: undefined,
                  offsetY: 8,
                  // color: "#2ED47E",
                  fontWeight: 500,
                  formatter: function (val: string) {
                    return val + "%";
                  },
                },
                total: {
                  show: true,
                  showAlways: true,
                  label: "Total Progress",
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  color: "#171825",
                },
              },
            },
          },
        },
        colors: ["#ED4C5C", "#FFBA5C", "#2ED47E"],
      }
</script>
<script lang="ts">
export default {
  name: "ProjectProgressChart",
};
</script>
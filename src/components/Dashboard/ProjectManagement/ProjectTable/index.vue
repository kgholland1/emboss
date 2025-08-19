<template>
  <div class="card border-0 box-shadow border-radius-10 mb-4">
    <div class="card-body p-4">
      <div
        class="card-title d-flex justify-content-between align-items-center mb-3"
      >
        <h3 class="fw-medium fs-18 mb-0">Recent Documents</h3>

      </div>

      <div class="all-table scroll-bar h-524">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th class="text-dark fw-medium pt-0 pb-2 fs-14 ps-0" scope="col">
                Reference
              </th>
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col">
                Fee
              </th>              
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col">
                Issuance Date
              </th>             
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col">
                Created
              </th>
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col">
                Region
              </th>
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col">
                Status
              </th>
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="doc in recentOrders" :key="doc.id">
              <td class="ps-0">
                <span class="text-start text-dark">{{ doc.uniqueReference }}</span>
              </td>              
              <td>
                <span class="d-block text-dark">₵{{ doc.fee.toFixed(2) }}</span>
              </td>
              <td>
                <span class="text-dark">{{ doc.stamp_date }}</span>
              </td>              
              <td>
                <span class="text-dark">{{ doc.created }}</span>
              </td>
              <td>
                <span class="text-dark">{{ doc.region }}</span>
              </td>
              <td>
                <span :class="computeClass(doc.status)">
                  {{ doc.status }}
                </span>
              </td>
              <td class="text-end text-center">
                <div class="dropdown action-opt">
                  <button
                    class="btn bg-transparent p-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <vue-feather type="more-horizontal"></vue-feather>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="javascript:;" @click="viewDocument(doc.id)">
                        <vue-feather type="eye"></vue-feather>
                        View/Edit
                      </a>
                    </li>
                    <li v-if="doc.status === 'Complete'">
                      <a class="dropdown-item" href="javascript:;"           
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                        @click="printStamp(doc)">
                        <vue-feather type="printer"></vue-feather>
                        Print
                      </a>
                    </li>                   
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

        <!-- Start Default Offcanvas From Area -->
      <div
        class="offcanvas offcanvas-custom offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header border-bottom">
          <h5 class="offcanvas-title fs-18" id="offcanvasRightLabel">
            {{ printHeader }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <StampList v-if="stampData" :stampData="stampData" />
        </div>
      </div>
      <!-- End Default Offcanvas From Area -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import useSearch from '@/Use/useDocumentList'
import { type DocumentData } from "@/data/document-data"
import StampList from "@/components/Stamp/StampList.vue"
import formatDate from "@/utils/helper";

const router = useRouter()

const { searchResults } = useSearch()
const stampData = ref<DocumentData | null>(null)
const printHeader = ref<string>("")

const recentOrders = computed(() => {
  if (!searchResults.value) return []

  return searchResults.value
    // .filter(doc => doc.status !== "Complete")
    .slice(0, 30)
    .map((item, index) => ({
      ...item,
      created: formatDate(item.created),
      stamp_date: item.stamp_date ? formatDate(item.stamp_date) : item.stamp_date,
      fees: item.fee.toFixed(2)
    }))
})

  const wordPending = ref("Pending")
  const wordProcessing = ref("Processing")
    const wordComplete = ref("Complete")


const computeClass = (classValue: string) => {
  return {
    "text-danger": wordPending.value === classValue,
    "text-warning": wordProcessing.value === classValue,
    "text-success": wordComplete.value === classValue 
  }
}

const viewDocument = (docId: string) => {
  router.push({
    name: "AddEditDocument",
    params: {
      docId
    }
  })
}

const printStamp = (document: DocumentData) => {
  stampData.value = document
  printHeader.value = `Reference - ${document.uniqueReference}`
}

</script>
<script lang="ts">
export default {
  name: "ProjectTable",
}

</script>

<style>
.normal-class {
  color: red;
}

.special-class {
  color: #00ff2a;
}

.high-class {
  color: red;
}
.highlight-class {
  color: green;
}
.offcanvas-custom {
  width: 600px !important;
}

.all-table {
  overflow-y: auto;
  max-height: 524px; /* same as your h-524 */
}

.all-table thead th {
  position: sticky;
  top: 0;
  background-color: white; /* or whatever your table header bg color is */
  z-index: 10; /* make sure it stays on top */
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1); /* optional shadow for clarity */
}
</style>
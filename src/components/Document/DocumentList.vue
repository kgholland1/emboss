<template>
  <div class="card border-0 box-shadow border-radius-10 mb-4">
    <div class="card-body p-4">
      <div
        class="card-title d-flex justify-content-between align-items-center mb-3"
      >
        <h3 class="fw-medium fs-18 mb-0">Search Results</h3>

      </div>

      <div class="all-table scroll-bar h-624">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th class="text-dark fw-medium pt-0 pb-2 fs-14 ps-0" scope="col">
                Reference
              </th>
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col">
                Service
              </th>
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col">
                Description
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
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col">
                Fee
              </th>
              <th class="text-dark fw-medium pt-0 pb-2 fs-14" scope="col"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="project in pagedResults" :key="project.id">
              <td class="ps-0">
                <span class="text-start text-dark">{{ project.uniqueReference }}</span>
              </td>              
              <td>
                <span class="text-dark">{{ project.serviceType }}</span>
              </td>
              <td>
                <span class="text-dark">{{ project.description }}</span>
              </td>              
              <td>
                <span class="text-dark">{{ project.created }}</span>
              </td>
              <td>
                <span class="text-dark">{{ project.region }}</span>
              </td>
              <td>
                <span :class="computeClass(project.status)">
                  {{ project.status }}
                </span>
              </td>
              <td>
                <span class="d-block text-dark">₵{{ project.fee }}</span>
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
                      <a class="dropdown-item" href="javascript:;" @click="viewDocument(project.id)">
                        <vue-feather type="eye"></vue-feather>
                        View/Edit
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="javascript:;"           
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                        @click="printStamp(project)">
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
      <div class="card border-0 box-shadow border-radius-10 my-5">
          <div class="card-body p-4">
              <div class="col-lg-6 col-sm-6">
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item">
                      <button class="page-link" href="javascript:void(0);" aria-label="Previous" @click="prevPage()" :disabled="currentStartIndex === 1">
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="javascript:void(0);" > 
                      <span class="fs-6">Showing {{ currentStartIndex }} to {{ currentEndIndex }} of {{ resultCount }} results</span></a>
                    </li>
                    <li class="page-item">
                      <button class="page-link" href="javascript:void(0);" aria-label="Next" @click="nextPage()" :disabled="currentEndIndex === resultCount">
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
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
          <EmbossStamp v-if="stampData" :stampData="stampData" />
        </div>
      </div>
      <!-- End Default Offcanvas From Area -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed} from "vue"
import { type DocumentData } from "@/data/document-data"
import EmbossStamp from "@/components/Stamp/EmbossStamp.vue";
import formatDate from "@/utils/helper";
import usePagination from '@/Use/usePagination'
import { useRouter } from "vue-router"

const props = defineProps<{
  filteredDocs: DocumentData[]
}>()

const router = useRouter()

const stampData = ref<DocumentData | null>(null)
const printHeader = ref<string>("")

const recentOrders = computed(() => {

  return props.filteredDocs
    .map((item) => ({
      ...item,
      created: formatDate(item.created),
      fees: item.fee.toFixed(2)
    }))
})

const {
  nextPage,
  prevPage,
  currentStartIndex,
  currentEndIndex,
  pagedResults,
} = usePagination(recentOrders)

const resultCount = computed(() => recentOrders.value.length)

  const wordPending = ref("Pending");
  const wordProcessing = ref("Processing");
  const wordComplete = ref("Complete");


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
  printHeader.value = `${document.serviceType} - ${document.uniqueReference}`
}

</script>
<script lang="ts">
export default {
  name: "DocumentList",
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
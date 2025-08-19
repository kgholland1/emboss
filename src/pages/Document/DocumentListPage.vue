<template>
  <div class="container-fluid">
    <div class="inner-main-content">
      <div
        class="card-title d-flex justify-content-between align-items-center mb-3"
      >
        <h3 class="fw-medium fs-18 mb-0">Documents</h3>
      </div>

      <div class="card border-0 box-shadow border-radius-10 mb-4">
        <div class="card-body p-4">
          <div
            class="card-title d-flex justify-content-between align-items-center mb-3"
          >
            <div>
              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <h3 class="fw-medium fs-18 mb-0">All Documents</h3>
                <ul class="list-unstyled ps-0 mb-0 d-flex">
                  <li class="text-body ms-sm-3 ms-2">
                    All (<span class="text-primary">{{ searchResults.length }}</span>)
                  </li>
                  <li class="text-body ms-sm-3 ms-2">
                    Complete (<span class="text-primary">{{ completeDocs.length }}</span>)
                  </li>
                  <li class="text-body ms-sm-3 ms-2">
                    Processing (<span class="text-primary">{{ processingDocs.length }}</span>)
                  </li>
                  <li class="text-body ms-sm-3 ms-2">
                    Pending (<span class="text-primary">{{ pendingDocs.length }}</span>)
                  </li>                  
                </ul>
              </div>
            </div> 

            <router-link to="/add-document/new" custom v-slot="{ navigate }">
              <button @click="navigate" class="btn btn-primary default-btn" type="button">
                Add Document
              </button>
            </router-link>
          </div>

          <div class="d-flex justify-content-between align-items-center my-5">
            <div>
              <div class="d-flex">
              <select
                class="form-select form-control h-40 py-1 custom-select"
                aria-label="Status" v-model="statusSelected"
              >
                <option value="" disabled selected>Select Status</option>
                  <option
                    v-for="option in statusOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.text }}
                  </option>
              </select>
              <select
                  class="form-select form-control h-40 py-1 ms-3 custom-select"
                  aria-label="Region" v-model="regionSelected"
                >
                <option value="" disabled selected>Select Region</option>
                <option
                    v-for="option in regionOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.text }}
                  </option>             
              </select>              
              </div>
            </div>
            <div>
              <div class="d-flex align-items-center m-lg-0">
                <select
                  class="form-select form-control h-40 py-1 custom-select me-3" style="width: 250px;"
                  aria-label="Status" v-model="searchType"
                >
                  <option value="" disabled selected>Select...</option>
                  <option value="qrCode">QR Code</option>                  
                  <option value="uniqueReference">Reference</option>
                  <option value="created">Created date</option>
                  <option value="stamp_date">Stamp date</option>
                </select>

                <form class="src-form position-relative me-3" style="width: 250px;">
                  <input v-if="searchType === 'uniqueReference' || 'qrCode' || searchType === ''"
                    type="text"
                    class="form-control h-40"
                    placeholder="Search here..."
                    v-model="inputText"
                  />
                  <input v-if="searchType === 'created' || searchType === 'stamp_date'"
                    type="date"
                    class="form-control"
                    placeholder="Enter name"
                    v-model="inputDate"
                  />
                </form>

                <button
                  class="btn btn-outline-primary rounded-pill ps-5"
                  type="button" @click="searchDocument()"
                >
                  <vue-feather
                    type="search"
                    class="position-absolute top-50 start-0 translate-middle-y ms-2"
                  ></vue-feather>
                  Search
                </button>
                <button
                  class="btn btn-outline-danger rounded-pill ms-2"
                  type="button" @click="clearFilter"
                >
                  Clear
                </button>                
              </div>
            </div>
          </div>
          <AllDocuments v-if="filteredResults.length > 0" :filteredDocs="filteredResults" />
        </div>
      </div>
      <MainFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import AllDocuments from "../../components/Document/DocumentList.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";
import { ref } from "vue"
import useSearch from '@/Use/useDocumentList'
import { type DocumentData } from "@/data/document-data"
import { type DocumentFilter } from "@/data/document-data"


/*
  Look ups
*/
const statusOptions = ref<{ value: string; text: string }[]>([
  { value: 'Pending', text: 'Pending' },
  { value: 'Processing', text: 'Processing' },
  { value: 'Complete', text: 'Complete' }
])

const regionOptions = ref<{ value: string; text: string }[]>([
  { value: 'Ahafo', text: 'Ahafo' },
  { value: 'Ashanti', text: 'Ashanti' },
  { value: 'Bono', text: 'Bono' },
  { value: 'Bono East', text: 'Bono East' },
  { value: 'Central', text: 'Central' },
  { value: 'Eastern', text: 'Eastern' },
  { value: 'Greater Accra', text: 'Greater Accra' },
  { value: 'North East', text: 'North East' },
  { value: 'Northern', text: 'Northern' },
  { value: 'Oti', text: 'Oti' },
  { value: 'Savannah', text: 'Savannah' },
  { value: 'Upper East', text: 'Upper East' },
  { value: 'Upper West', text: 'Upper West' },
  { value: 'Volta', text: 'Volta' },
  { value: 'Western', text: 'Western' },
  { value: 'Western North', text: 'Western North' }  
])

const { searchResults, loadDocs, searchDocs } = useSearch()

const filteredResults = ref<DocumentData[]>([...searchResults.value])

const completeDocs = ref<DocumentData[]>(loadDocs("Complete"))

const processingDocs = ref<DocumentData[]>(loadDocs("Processing"))

const pendingDocs = ref<DocumentData[]>(loadDocs("Pending"))

/*
  Search / filter
*/
const searchItem = ref<DocumentFilter | null>(null)
const searchType = ref<string>("")
const statusSelected = ref<string>("")
const regionSelected = ref<string>("")

const inputText = ref<string>("")
const inputDate = ref<string>("")

const searchDocument = () => {
  searchItem.value = {
    uniqueReference: "",
  }
  if (statusSelected.value)
    searchItem.value.status = statusSelected.value

  if (regionSelected.value)
    searchItem.value.region = regionSelected.value

  if (searchType.value === "uniqueReference" || searchType.value === "qrCode")
    searchItem.value[searchType.value] = inputText.value  

  if (searchType.value === "created" || searchType.value === "stamp_date")
    searchItem.value[searchType.value] = inputDate.value    

    filteredResults.value = [...searchDocs(searchItem)]
}

const clearFilter = () => {
  searchType.value = ""
  statusSelected.value = ""
  regionSelected.value = ""
  inputDate.value = ""
  inputText.value = ""  
  searchDocument()
}

</script>

<script lang="ts">
export default {
  name: "DocumentsPage",
};
</script>
<style scoped>
  select option[disabled] {
    color: #6c757d;
  }

  .custom-select {
    padding-left: 8px;   /* space before text */
    padding-right: 34px; /* space before arrow */
  }
</style>
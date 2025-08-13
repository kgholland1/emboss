<template>
  <div class="card border-0 box-shadow border-radius-10 mb-4">
    <div class="card-body p-4 pb-0">
      <h4 class="text-dark fs-18 fw-medium mb-3">{{ isNewMode? "Add": "Edit" }} Document</h4>

      <form>
        <div class="row">
          <div class="col-lg-4">
            <div class="form-group mb-4">
              <label class="label">Reference</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter reference"
                v-model="document.uniqueReference"
              />
            </div>
          </div>
          <div class="col-lg-4">
            <div class="form-group mb-4">
              <label class="label">Service Type</label>
              <select
                class="form-select form-control"
                aria-label="Default select example"
                v-model="document.serviceType"
              >
                <option value="" selected>Select Service</option>
                  <option
                    v-for="option in serviceOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.text }}
                  </option>
              </select>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="form-group mb-4">
              <label class="label">Status</label>
              <select
                class="form-select form-control"
                aria-label="Default select example"
                v-model="document.status"
              >
                <option value="" selected>Select Status</option>
                  <option
                    v-for="option in statusOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.text }}
                  </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <div class="form-group mb-4">
              <label class="label">Region</label>
              <select
                class="form-select form-control"
                aria-label="Default select example"
                v-model="document.region"
              >
                <option value="" selected>Select Region</option>
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
          <div class="col-lg-4">
            <div class="form-group mb-4">
              <label class="label">File name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter filename"
                v-model="document.filename"
              />
            </div>
          </div>
          <div class="col-lg-4">
            <div class="form-group mb-4">
              <label class="label">Service Fee</label>
              <input
                type="number"
                class="form-control"
                placeholder="Enter fee"
                v-model="document.fee"
              />
            </div>
          </div>
        </div>        
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group mb-4">
              <label class="label">Description</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter short description"
                v-model="document.description"
              />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group mb-4">
              <label class="label">Stamp Date</label>
              <input
                type="date"
                class="form-control"
                placeholder="Enter Stamp date"
                v-model="document.stamp_date"
              />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group mb-4">
              <label class="label">Stamped By</label>
              <select
                class="form-select form-control"
                aria-label="Default select example"
                v-model="document.stamped_by"                
              >
                <option selected>Select agent</option>
                <option value="Robert Appiah">Robert Appiah</option>
                <option value="Yaw Sarpong">Yaw Sarpong</option>
                <option value="Adwoa Afriyie">Adwoa Afriyie</option>
              </select>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="mb-3">
              <label for="validationTextarea" class="form-label label"
                >Note</label
              >
              <textarea
                class="form-control"
                id="validationTextarea"
                placeholder="Enter Note"
                rows="4"
                v-model="document.note"  
              ></textarea>
            </div>
          </div>
        </div>
        <div v-if="!isNewMode" class="row">
          <div class="col-lg-3">
            <div class="form-group mb-4">
              <label class="label">Created</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter created"
                v-model="document.created"
              />              
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group mb-4">
              <label class="label">Created By</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter created by"
                v-model="document.created_by"
              /> 
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group mb-4">
              <label class="label">Updated</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter created"
                v-model="document.updated_date"
              />  
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group mb-4">
              <label class="label">Stamped By</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter created"
                v-model="document.updated_by"
              />  
            </div>
          </div>
        </div> 
        <div
            class="card-title d-flex justify-content-between align-items-center mb-3"
          >
            <div class="form-group mb-4">
              <button type="button" class="btn ms-3 py-2 px-4 btn-primary" @click="saveDocument()">
                Save
              </button>               
              <button type="button" class="ms-3 btn py-2 px-4 btn-outline-danger" @click="cancel">
                Cancel
              </button>             
            </div>   
            <div class="form-group mb-4">              
              <a v-if="!isNewMode" class="btn ms-3 py-2  px-4 btn-secondary" href="javascript:;"           
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                @click="printStamp()">
                <vue-feather class="pt-1" type="printer"></vue-feather>
                Print
              </a>            
            </div>                   
          </div>      
      </form>
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
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { type DocumentData } from "@/data/document-data"
import formatDate from "@/utils/helper"
import useSearch from '@/Use/useDocumentList'
import EmbossStamp from "@/components/Stamp/EmbossStamp.vue";

const route = useRoute()
const router = useRouter()

const { allDocuments } = useSearch()
const stampData = ref<DocumentData | null>(null)
const printHeader = ref<string>("")

/*
  Look ups
*/
const statusOptions = ref<{ value: string; text: string }[]>([
  { value: 'Pending', text: 'Pending' },
  { value: 'Processing', text: 'Processing' },
  { value: 'Complete', text: 'Complete' }
])

const serviceOptions = ref<{ value: string; text: string }[]>([
  { value: 'Cadastral Mapping', text: 'Cadastral Mapping' },
  { value: 'Site Plan Approval', text: 'Site Plan Approval' },
  { value: 'Property Valuation', text: 'Property Valuation' },
  { value: 'Land Use Permit', text: 'Land Use Permit' },
  { value: 'Boundary Demarcation', text: 'Boundary Demarcation' },
  { value: 'Land Lease Renewal', text: 'Land Lease Renewal' },
  { value: 'Property Ownership Transfer', text: 'Property Ownership Transfer' }
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


const isNewMode = computed(() => route.params.docId === "new")

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

const document = ref<DocumentData>({
  id: generateUniqueId(),
  uniqueReference: "",
  fee: 0.00,
  serviceType: "",
  description: "",
  status: "Pending",
  created: formatDate(new Date().toISOString()),
  created_by: "Jane Doe",
  stamp_date: "",
  stamped_by: "Jane Doe",
  region: "",
  filename: "",
  note: "",
  updated_date: formatDate(new Date().toISOString()),
  updated_by: "Ama Serwaa"
})

  onMounted(() => {
    if (!isNewMode.value) {
      const fetchDoc = allDocuments.value.find((doc) => doc.id === route.params.docId)

      if(fetchDoc) {
        document.value = JSON.parse(JSON.stringify(fetchDoc))
        document.value.created = formatDate(document.value.created)
        document.value.updated_date = formatDate(document.value.updated_date)        
        document.value.stamp_date = new Date(document.value.stamp_date)
            .toISOString()
            .split("T")[0]
      }
    }
  })

  const cancel = () => {
    router.push("/document-list") 
  }

  const saveDocument = () => {
    allDocuments.value.push(document.value)
    router.push("/document-list")
  }

  const printStamp = () => {
    stampData.value = document.value
    printHeader.value = `${document.value.serviceType} - ${document.value.uniqueReference}`
  }


</script>
<script lang="ts">
export default {
  name: "CustomStyles",
};
</script>

<style>

.offcanvas-custom {
  width: 600px !important;
}
</style>
import { ref, computed, type Ref } from "vue"
import documentData from "../data/document-data"
import { type DocumentData } from "../data/document-data"
import { type DocumentFilter } from "@/data/document-data"

const allDocuments = ref<DocumentData[]>(documentData)


export default function useSearch() {
  const results = computed<DocumentData[]>(() => {
    return [...allDocuments.value];
  })

const searchDocs = (searchItem: Ref<DocumentFilter | null> = ref(null)) => {
  if (!searchItem.value) {
    return [...results.value];
  }


  let filteredResults = [...results.value];

  // status
  if (searchItem.value?.status) {
    filteredResults = filteredResults.filter(
      doc => { 
        return doc.status === searchItem.value?.status 
      }
    );
  }

  // region
  if (searchItem.value?.region) {
    filteredResults = filteredResults.filter(
      doc => doc.region === searchItem.value?.region
    );
  }

  // reference
  if (searchItem.value?.uniqueReference) {
    filteredResults = filteredResults.filter(
      doc => doc.uniqueReference === searchItem.value?.uniqueReference
    );
  }

  // qr code
  if (searchItem.value?.qrCode) {
    filteredResults = filteredResults.filter(
      doc => doc.qrCode === searchItem.value?.qrCode
    )
  }


  // created
  if(searchItem.value?.created) {
    filteredResults = filteredResults.filter((document: DocumentData) => {
      if(searchItem.value?.created) {
          const searchDate = new Date(searchItem.value.created);
          const start = new Date(searchDate);
          start.setHours(0, 0, 0, 0);

          // End of day
          const end = new Date(searchDate);
          end.setHours(23, 59, 59, 999);

          const docDate = new Date(document.created);

          return docDate >= start && docDate <= end;
      }      
    }) 
  }

  // stamp date
  if(searchItem.value?.stamp_date) {
    filteredResults = filteredResults.filter((document: DocumentData) => {
      if (!document.stamp_date) {
        return false
      }
      if(searchItem.value?.stamp_date) {
          const searchDate = new Date(searchItem.value.stamp_date);
          const start = new Date(searchDate);
          start.setHours(0, 0, 0, 0);

          // End of day
          const end = new Date(searchDate);
          end.setHours(23, 59, 59, 999);

          const docDate = new Date(document.stamp_date);

          return docDate >= start && docDate <= end
      }
    })  
  }

  return filteredResults;
};
  const loadDocs = (statusType: 'Pending' | 'Processing' | 'Complete') => {
    return results.value.filter((document: DocumentData) =>
      document.status === statusType
    )
  }

  return {
    allDocuments,
    searchResults: results,
    loadDocs,
    searchDocs
  };
}
import { ref, Ref, computed, watch } from 'vue'
import { type DocumentData } from "../data/document-data"

export default function usePagination(filteredSearchResults: Ref<DocumentData[]>) {
  const pageSize = 25
  const currentPage = ref(1)
  const nextPage = () => { currentPage.value += 1 }
  const prevPage = () => { currentPage.value -= 1 }

    // Watch for changes to the list and reset to first page
  watch(filteredSearchResults, () => {
    currentPage.value = 1
  })

  const currentStartIndex = computed(
    () => (currentPage.value - 1) * pageSize + 1,
  )

  const currentEndIndex = computed(() => {
    const end = currentStartIndex.value - 1 + pageSize
    return end > filteredSearchResults.value.length
      ? filteredSearchResults.value.length
      : end
  })

  const pagedResults = computed(() => {
    const startIndex = currentStartIndex.value - 1
    const endIndex = currentEndIndex.value
    return filteredSearchResults.value.slice(startIndex, endIndex)
  })

  return {
    currentPage,
    nextPage,
    prevPage,
    pageSize,
    currentStartIndex,
    currentEndIndex,
    pagedResults,
  }
}
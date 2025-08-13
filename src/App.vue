<template>
  <PreLoader v-if="isLoading" />

  <MainHeader v-if="signInState" />
<div
  :class="[
    'main-content expanded js-container',
    { collapsed: stateStoreInstance.open },
  ]"
  :style="!signInState ? { paddingLeft: '0', paddingTop: '101px' } : {}"
>
  <MainSidebar v-if="signInState" />

  <router-view />
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import PreLoader from "./components/Layouts/PreLoader.vue";
import MainHeader from "./components/Layouts/MainHeader.vue";
import MainSidebar from "./components/Layouts/MainSidebar.vue";
import stateStore from "./utils/store";
import useAuth from '@/Use/useAuthentication'

const isLoading = ref<boolean>(true)
const stateStoreInstance = stateStore
const { signInState } = useAuth()

onMounted(() => {
  setTimeout(() => {
      isLoading.value = false;
    }, 2000)
})

</script>
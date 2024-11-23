<template>
  <div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <button type="button" @click="setTab('clockin')" href="#" :class="[currentTab == 'clockin' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:text-gray-700']" class="rounded-md px-3 py-2 text-sm font-medium ">Clock In</Button>
        <button type="button" @click="setTab('clockout')" href="#" :class="[currentTab == 'clockout' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:text-gray-700']" class="rounded-md px-3 py-2 text-sm font-medium ">Clock Out</Button>
      </nav>
    </div>
  </div>

    <div class="block mx-auto h-screen">
      <CustomTable v-if="currentTab == 'clockin' && clockinURL" :url="clockinURL" :headers="detailedTableHeaders"></CustomTable>
      <CustomTable v-else :url="clockoutURL" :headers="detailedTableHeaders"></CustomTable>
    </div>
    

</template>

<script setup>
import { onMounted, reactive, ref, watch, computed, provide, inject, onUpdated, nextTick   } from "vue";
import CustomTable from "@/components/table/Table.vue";
import {userAuthStore} from '@/stores/auth';

const currentTab = ref('clockin')
const locationID = ref('')
const clockinURL = ref('')
const clockoutURL = ref('')

const detailedTableHeaders = reactive([
    { title: 'Employee Code', onSet: true, sortable: true, query: 'employee_id', date_filtered: false, searchable: true, checked: true, hasInlineEdit: false, textAlign: 'left', hide:true },
    { title: 'Employee Number', onSet: true, sortable: true, query: 'employee_number', date_filtered: false, searchable: true, checked: true, hasInlineEdit: false, textAlign: 'left'},
    { title: 'Employee Name', onSet: true, sortable: true, query: 'employee_name', date_filtered: false, searchable: true, checked: true, hasInlineEdit: false, textAlign: 'left' },
]);


function setTab(tab){
  currentTab.value = tab
}

onMounted(() => {
  locationID.value = userAuthStore().getLocation
  clockinURL.value = import.meta.env.VITE_API_URL+'/get-employees-for-clockin?location='+userAuthStore().getLocation
  clockoutURL.value = import.meta.env.VITE_API_URL+'/get-employees-for-clockout?location='+userAuthStore().getLocation
})



</script>
<template>
    <div class="block mx-auto h-screen">
      <CustomTable :url="'/'"></CustomTable>
    </div>
    

</template>

<script setup>
import { onMounted, reactive, ref, watch, computed, provide, inject, onUpdated, nextTick   } from "vue";
import CustomTable from "@/components/table/Table.vue";


const detailedTableHeaders = reactive([
    { title: 'Employee Code', onSet: true, sortable: true, query: 'employee_id', date_filtered: false, searchable: true, checked: true, hasInlineEdit: false, textAlign: 'left', hide:true },
    { title: 'Employee Number', onSet: true, sortable: true, query: 'employee_number', date_filtered: false, searchable: true, checked: true, hasInlineEdit: false, textAlign: 'left'},
    { title: 'Employee Name', onSet: true, sortable: true, query: 'employee_name', date_filtered: false, searchable: true, checked: true, hasInlineEdit: false, textAlign: 'left', freeze: true },

]);
</script>
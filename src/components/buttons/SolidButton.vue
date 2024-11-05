<template>
    <button
      :type="type"
      :disabled="isLoading && disabled"
      :class="[disabled ? 'bg-slate-500 hover:bg-slate-400' : 'bg-emsBlue hover:bg-hoverAside'], customClass"
      class="flex w-full justify-center items-center rounded-md  px-3 py-2.5 border border-blue-200 text-md font-semibold leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      v-bind="$attrs"
    >
    <div v-if="isLoading" class="flex items-center justify-center gap-2 ">
        <ArrowPathIcon class="animate-spin h-5 w-5 shrink-0" />
        <span class="animate-pulse">Processing...</span>
    </div>
      
        <div v-else class="flex justify-center items-center gap-x-2">
            <component :is="icon" class="-ml-0.5 h-5 w-5 shrink-0" />
            {{ label }}
        </div>
    </button>
  </template>
  
  <script setup>
  import { ArrowPathIcon } from '@heroicons/vue/24/outline';
    const props = defineProps({
        isLoading: {
            type: Boolean,
            default: false
        },
        type:{
            type: String,
            default: 'submit'
        },
        label: {
            type: String,
            default: ''
        },
        customClass: {
            type: String,
            default: 'text-white'
        },
        icon: {
            type: Object,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }

    });

  </script>
  
<template>
    <div class="dp-search form-floating border-gray" ref="dropdownSelect">
      <label for="application">{{ label }}</label>
      <input type="text" class="form-control bg-white text-uppercase" :value="selectedOptions" placeholder="SELECT" @focus="slideUpFloater" @input="performSearch" >
      <div class="floater" :class="{ 'floater-up': isFloaterUp, 'hidden': !isFloaterVisible }">
        <div class="form-check" v-for="item in filteredOptions" :key="item.value">
          <label v-if="isEmptySearch" class="form-check-label w-100"> NO DATA FOUND </label>
          <input :name="item.value" @change="setItemCheck($event)" class="form-check-input" type="checkbox" :value="item.label" :id="item.value" :checked="queryList.includes(item.label)" >
          <!-- @click="checkCheckbox(item.label)"  -->
          <label class="form-check-label w-100" :for="item.value"> 
            {{ item.label }}
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script>export default {
    name: "DropdownWithSearch",
    props: {
      options: {
        type: Array,
        default: [],
      },
      label: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        queryList: [],
        isFloaterUp: false,
        isFloaterVisible: false,
        searchText: "",
        isEmptySearch: false,
      };
    },
    computed: {
      filteredOptions() {
        return this.options.filter((item) =>
          item.label.toLowerCase().includes(this.searchText.toLowerCase())
        );
      },
      selectedOptions() {
        // Check if 'ALL' is present in queryList
        if (this.queryList.some(item => item.toUpperCase() === 'ALL')) {
          return 'ALL';
        } else {
          let options = [];
          this.queryList.forEach((item, index) => {
            options.push(item);
            // Add comma and space if it's not the last item
            if (index < this.queryList.length - 1) {
              options.push(', ');
            }
          });
          return options.join('');
        }
      }
    },
    mounted() {
      document.addEventListener("click", this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
      setItemCheck(evt) {
        const value = evt.target.value;
        if (evt.target.checked) {
          if (value.toLowerCase() === "all") {
            this.queryList = this.options.map((item) => item.label);
          } else {
            this.queryList.push(value);
          }
        } else {
          if (value.toLowerCase() === "all") {
            this.queryList = [];
          } else {
            const index = this.queryList.indexOf(value);
            if (index !== -1) {
              this.queryList.splice(index, 1);
            }
          }
        }
        console.log(this.queryList);
        this.$emit("setItemCheck", this.queryList);
      },
      slideUpFloater() {
        this.isFloaterUp = true;
        this.isFloaterVisible = true;
      },
      performSearch(evt) {
        this.searchText = evt.target.value;
        this.isFloaterVisible = true;
      },
      handleClickOutside(event) {
        if (!this.$refs.dropdownSelect || !this.$refs.dropdownSelect.contains(event.target)) {
          this.isFloaterVisible = false;
        }
      },
      checkCheckbox(value) {
        const checkbox = this.$refs.dropdownSelect.querySelector(`input[value="${value}"]`);
        console.log(checkbox)
        checkbox.checked = !checkbox.checked;
        this.setItemCheck({ target: checkbox });
      },
    },
  };
  </script>
  

<style scoped>
    .dp-search{
        position: relative;
    }
    .dp-search label{
      background-color: #fff;
      height: 20px;
      width: calc(100% * var(--hex-parent-height));
      font-size: 11px;
      margin: 0;
      padding: 0 6px;
      top: -22px;
      font-weight: 600;
    }
    .floater-up {
        transition: transform 0.3s ease;
        position: absolute;
        width: 100%;
        top: 35px;
        background: #fff;
        z-index: 10;
    }
    .floater{
        padding: 10px;
        border: 1px solid #ced4da;
        height: 150px;
        overflow: auto;
    }
    .floater .form-check-label {
        text-transform: uppercase;
    }
    .hidden {
      display: none;
    }

</style>

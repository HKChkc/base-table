<template>
  <div class="search-input-test">
    <sum-search-input
      placeholder="代码/简称"
      style="width: 150px"
      @on-change="handleSearchInputChange"
      @search="handleSearch"
      @clear-search="handleClearSearch"
    ></sum-search-input>
  </div>
</template>

<script>
import SumSearchInput from '../../common/base/sumSearchInput';
export default {
  name: 'search-input-test',

  components: {
    'sum-search-input': SumSearchInput,
  },

  methods: {
    handleSearchInputChange(val) {
      console.log('input change', val);
    },

    handleSearch() {
      console.log('call search api');
    },

    handleClearSearch() {
      console.log('clear search input text');
    },
  },
};
</script>

<style></style>

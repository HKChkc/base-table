<template>
  <div class="home-container">
    <icon-test></icon-test>

    <!-- <search-input-test></search-input-test> -->

    <!-- <sum-select-test></sum-select-test> -->

    <!-- <sum-date-picker-test></sum-date-picker-test> -->

    <!-- <resize-detecter-test></resize-detecter-test> -->

    <!-- <table-test></table-test> -->

    <!-- <sum-text-tooltip-test></sum-text-tooltip-test> -->
  </div>
</template>

<script>
import IconTest from '../components/iconTest/IconTest';
// import SearchInputTest from '../components/searchInputTest/SearchInputTest';
// import SumSelectTest from '../components/sumSelectTest/SumSelectTest.vue';
// import SumDatePickerTest from '../components/sumDatePicker/SumDatePickerTest';
// import TableTest from '../components/tableTest/TableTest';
// import ResizeDetecterTest from '../components/resizeDetecter/ResizeDetecterTest';
import SumTextTooltipTest from '../components/sumTextTooltipTest/SumTextTooltipTest';
export default {
  name: 'home',

  components: {
    'icon-test': IconTest,
    // 'search-input-test': SearchInputTest,
    // 'sum-select-test': SumSelectTest,
    // 'sum-date-picker-test': SumDatePickerTest,
    // 'resize-detecter-test': ResizeDetecterTest,
    // 'table-test': TableTest,
    // 'sum-text-tooltip-test': SumTextTooltipTest,
  },
};
</script>

<style></style>

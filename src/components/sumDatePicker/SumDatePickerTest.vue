<template>
  <div class="sum-date-picker-test">
    <sum-date-picker :selectedDate="params.date" @dateChange="handleDateChange"></sum-date-picker>
  </div>
</template>

<script>
import SumDatePicer from '../../common/base/sumDatePicker';
export default {
  name: 'sum-date-picker-test',

  components: {
    'sum-date-picker': SumDatePicer,
  },

  data() {
    return {
      params: {
        date: Date.now(),
      },
    };
  },

  methods: {
    handleDateChange(val) {
      console.log(`val`, val);
      this.params.date = val;
    },
  },
};
</script>

<style></style>

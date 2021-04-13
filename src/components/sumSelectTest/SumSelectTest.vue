<template>
  <div class="sum-selected-test">
    <sum-select
      :value="params.group"
      field="group"
      :params="params"
      :options="options"
      align="center"
      @on-select="handleSelectionChange"
      style="width: 60px"
    ></sum-select>
  </div>
</template>

<script>
import SumSelect from '../../common/base/sumSelect';
const OPTIONS = [
  {
    label: '全部',
    value: 'all',
  },
  {
    label: '一',
    value: '1',
  },
  {
    label: '二',
    value: '2',
  },
];
export default {
  name: 'sum-select-test',

  components: {
    'sum-select': SumSelect,
  },

  data() {
    return {
      options: OPTIONS,
      params: {
        group: 'all',
      },
    };
  },

  methods: {
    handleSelectionChange({ field, val }) {
      console.log(`field`, field);
      console.log(`val`, val);
      this.params[field] = val;
    },
  },
};
</script>

<style></style>

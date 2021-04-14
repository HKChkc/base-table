<template>
  <div class="icon-test">
    icon-test
    <sum-icon type="download" :disabled="false" @on-click="handleClick"></sum-icon>
  </div>
</template>

<script>
// import SumIcon from '../../common/base/sumIcon';
import { SumIcon } from '../../../lib/sum-comp.umd.min';
export default {
  name: 'icon-test',

  components: {
    'sum-icon': SumIcon,
  },

  methods: {
    handleClick() {
      console.log('click - icon');
    },
  },
};
</script>

<style></style>

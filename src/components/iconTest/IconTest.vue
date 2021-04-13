<template>
  <div class="icon-test">
    <sum-icon type="download" :disabled="false" @on-click="handleClick"></sum-icon>
  </div>
</template>

<script>
import SumIcon from '../../common/base/sumIcon';
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

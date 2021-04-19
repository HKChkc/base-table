<template>
  <div class="-sum-text-tooltip-test">
    <div class="content" style="width: 100px">
      <sum-text-tooltip :text="msg"></sum-text-tooltip>
    </div>
  </div>
</template>

<script>
import SumTextTooltip from '../../common/base/sumTextTooltip';

export default {
  name: 'sum-text-tooltip-test',

  components: {
    'sum-text-tooltip': SumTextTooltip,
  },
  data() {
    return {
      msg: 'hhhhhhhhhhhhhhh',
    };
  },
};
</script>

<style></style>

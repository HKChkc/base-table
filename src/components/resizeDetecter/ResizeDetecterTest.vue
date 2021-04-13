<template>
  <div class="resize-detecter-container">
    <sum-resize-detecter @notify="handleResize"></sum-resize-detecter>
  </div>
</template>

<script>
import SumResizeDetecter from '../../common/base/sumResizeDetecter';
export default {
  name: 'resize-detecter-test',

  components: {
    'sum-resize-detecter': SumResizeDetecter,
  },

  methods: {
    handleResize({ width, height }) {
      console.log(`width`, width);
      console.log(`height`, height);
    },
  },
};
</script>

<style></style>

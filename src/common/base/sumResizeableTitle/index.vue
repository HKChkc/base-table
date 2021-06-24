<template>
  <div
    class="resizeable-title"
    :style="{ width: resizeWidth }"
    tabindex="0"
    @mouseup="onTitleMouseUp"
  >
    <vue-draggable-resizable
      :w="4"
      :z="1"
      class="table-draggable-handle"
      class-name-dragging="table-draggable-handle-dragging"
      :draggable="true"
      :resizable="false"
      @dragging="onDrag"
      @dragstop="onDragStop"
      :onDragStart="onDragStartCallback"
      axis="x"
      ref="thDom"
      @dblclick.native="onDbClick"
    ></vue-draggable-resizable>
    <slot></slot>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';

export default {
  name: 'sum-resizeable-title',
  components: {
    'vue-draggable-resizable': VueDraggableResizable,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
  },

  computed: {
    resizeWidth() {
      return this.column.width;
    },
  },
  data() {
    return {
      x: 0,
      move: 0,
      clientX: 0,
      prevTime: null,
      timer: null,
    };
  },
  methods: {
    onDragStartCallback(event) {
      event.preventDefault();
      let curTime = new Date().getTime();
      if (this.prevTime && curTime - this.prevTime < 500) {
        this.onDbClick();
      }
      this.prevTime = curTime;
      this.clientX = event.clientX;
      this.$emit('onDragStart', this.clientX);
    },

    onDrag(x) {
      this.$emit('onDragHandler', x, this.clientX, this.column);
    },

    onDragStop(x) {
      this.$refs.thDom.$data.left = 0;
      this.$emit('onResize', { ...this.column, move: x });
      this.$emit('onDropHander');
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.prevTime = null;
        this.timer = null;
      }, 500);
    },

    onDbClick() {
      this.$emit('resizeCol', this.column);
    },

    // 处理客户端点击拖拽线未触发onDragStop事件
    onTitleMouseUp() {
      this.$emit('onMouseUpToDrop');
    },
  },

  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
};
</script>
<style lang="scss">
.resizeable-title {
  display: flex;
  &:focus {
    outline: none;
  }
  .table-draggable-handle {
    height: 9px !important;
    width: 4px !important;
    position: static !important;
    margin-top: 5px;
    padding-right: 3px;
    left: auto !important;
    right: -5px;
    cursor: col-resize;
    touch-action: none;
    border-left: 1px solid #646464;
    &:hover {
      border-left: 1px solid #039e86;
    }
  }

  .table-draggable-handle-dragging {
    // border-left: 1px solid #039e86;
    border-left: 1px solid transparent;
  }

  div {
    color: #646464;
  }
}
</style>

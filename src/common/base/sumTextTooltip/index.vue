<template>
  <div class="ss-theme" ref="node" style="position: relative; max-width: 100%">
    <span
      ref="textWrap"
      style="position: absolute; top: 0; left: 0; white-space: nowrap; opacity: 0; z-index: -1"
      >{{ text }}</span
    >
    <Tooltip v-if="show" placement="top" class="ss-tooltip">
      <template slot="title">
        <span>{{ text }}</span>
      </template>
      <span
        @mouseleave.self="onMouseLeave"
        @mouseenter.self="onMouseEnter"
        class="ss-text-tooltip"
        >{{ text }}</span
      >
    </Tooltip>

    <span
      v-if="!show"
      class="ss-text-tooltip"
      @mouseleave.self="onMouseLeave"
      @mouseenter.self="onMouseEnter"
      >{{ text }}</span
    >
  </div>
</template>

<script>
import { Tooltip } from 'ant-design-vue';
export default {
  name: 'sum-text-tooltip',
  components: {
    Tooltip,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      mouseEnter: false,
      width: '100%',
    };
  },

  methods: {
    onMouseEnter() {
      if (this.mouseEnter) {
        return;
      }
      if (!this.mouseEnter) {
        this.mouseEnter = true;
      }
      if (this.$refs.node && this.$refs.textWrap) {
        const thisWidth = this.$refs.node.getBoundingClientRect().width;
        const wrapWidth = this.$refs.textWrap.getBoundingClientRect().width;
        this.width = thisWidth;
        this.show = thisWidth <= wrapWidth;
      }
    },
    onMouseLeave() {
      this.mouseEnter = false;
    },
  },
  mounted() {
    if (this.$refs.textWrap) {
      const thisWidth = this.$refs.node.getBoundingClientRect().width;
      const wrapWidth = this.$refs.textWrap.getBoundingClientRect().width;
      this.width = thisWidth;
      this.show = thisWidth < wrapWidth;
    }
  },
};
</script>

<style lang="scss">
.ss-theme {
  .ss-text-tooltip {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
    display: block;
  }
}

.ant-tooltip {
  .ant-tooltip-content {
    .ant-tooltip-arrow {
      display: none;
    }
    .ant-tooltip-inner {
      background: #ffffff;
      font-size: 12px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      color: #000000;
      padding: 0px 8px;
      line-height: 24px;
      min-height: initial;
    }
  }
}
</style>

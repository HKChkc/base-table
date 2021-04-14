<template>
  <span :class="classname" @click="handleClick"></span>
</template>

<script>
export default {
  name: 'sum-icon',
  props: {
    type: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },

  computed: {
    classname() {
      let classname = `sumscope-icon icon-${this.type}`;
      return this.disabled ? `${classname} disabled` : classname;
    },
  },

  methods: {
    handleClick() {
      if (this.disabled) return;
      this.$emit('on-click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/common.scss';
.sumscope-icon {
  color: $icon-normal-color;
  font-size: 18px;

  &:hover {
    color: $icon-hover-color;
  }
  &:active {
    color: $icon-active-color;
  }
}
.sumscope-icon.disabled {
  color: $icon-disabled-color;
}
</style>

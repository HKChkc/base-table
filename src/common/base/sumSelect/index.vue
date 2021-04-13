<template>
  <div class="s-select-container">
    <a-select
      :value="value"
      @change="handleSelect"
      :defaultOpen="defaultOpen"
      :disabled="disabled"
      dropdownClassName="s-select-dropdown"
    >
      <a-select-option
        v-for="item in options"
        :key="item[optionConfig.val]"
        :value="item[optionConfig.val]"
        :class="{
          'selected-item': sourceData[field] === item[optionConfig.val],
          'selected-item-text-center': align === 'center',
          'pressed-field': labelText === item[optionConfig.label],
        }"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
      >
        <span slot="label">{{ item[optionConfig.label] }}</span>
        <sum-icon
          slot="menuItemSelectedIcon"
          type="check"
          v-show="sourceData[field] === item[optionConfig.val] && align !== 'center'"
        ></sum-icon>
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { Select } from 'ant-design-vue';
import SumIcon from '../sumIcon';
export default {
  name: 'sum-select',

  props: {
    field: String,
    row: Object,
    params: Object,
    value: String,
    options: Array,
    type: {
      type: String,
      default: () => 'params', // row: 行内选择框；params: 筛选条件
    },
    align: {
      type: String,
      default: () => 'between', // center: 居中；between: 两侧
    },
    optionConfig: {
      type: Object,
      default: () => {
        // 配置 选项的label和值，因为options字段可能定义不同
        return {
          label: 'label',
          val: 'value',
        };
      },
    },
    defaultOpen: {
      type: Boolean,
      default: () => false,
    },

    disabled: {
      type: Boolean,
      default: () => false,
    },
  },

  components: {
    'a-select': Select,
    'a-select-option': Select.Option,
    'sum-icon': SumIcon,
  },

  computed: {
    sourceData() {
      return this.type === 'params' ? this.params : this.row;
    },
  },

  data() {
    return {
      labelText: '',
    };
  },

  methods: {
    handleSelect(val) {
      const emitData = {
        [this.type]: this.sourceData,
        field: this.field,
        val,
      };
      this.$emit('on-select', emitData);
    },

    handleMouseDown(e) {
      const text = e.target.innerText;
      if (text) {
        this.labelText = text.trim();
      }
    },

    handleMouseUp() {
      this.labelText = '';
    },
  },
};
</script>

<style lang="scss">
@import '../../style/common.scss';
.s-select-container {
  height: 24px;
  .ant-select {
    width: 100%;
  }
  .ant-select-open,
  .ant-select-focus {
    .ant-select-selection {
      box-shadow: none !important;
      border-color: $SELF-bgcolor !important;
      &:focus,
      &:active {
        box-shadow: none;
        border-color: $SELF-bgcolor;
      }
    }
  }
  .ant-select-selection--single {
    height: 24px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    border: 1px solid $border-color;
    border-radius: 2px;
    outline: none;
    box-shadow: none;
    font-size: 12px;
    &:hover {
      color: $font-color-green;
      border: 1px solid $font-color-green;
      .ant-select-arrow-icon {
        color: $font-color-green;
      }
    }
    .ant-select-selection__rendered {
      line-height: inherit;
      margin: 0;
      .ant-select-selection-selected-value {
        font-size: 12px;
      }
    }
    .ant-select-arrow {
      right: 4px;
    }
    .icon-check {
      display: none;
    }
  }
}
.s-select-dropdown {
  .ant-select-dropdown-menu {
    padding: 0;
    .ant-select-dropdown-menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 24px;
      padding: 4px;
      font-size: 12px;
      .icon-check {
        font-size: 12px;
        color: $SELF-bgcolor;
      }
      &:hover {
        background: $menu-hover;
      }
    }
    .selected-item {
      color: $SELF-bgcolor;
    }
    .selected-item-text-center {
      justify-content: center;
    }
    .pressed-field {
      background: $pressed-color !important;
    }
    .ant-select-dropdown-menu-item-selected {
      color: $menu-font-color;
      font-weight: normal;
    }
  }
}
</style>

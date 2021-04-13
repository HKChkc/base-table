<template>
  <div class="basic-input-container">
    <a-input
      :placeholder="placeholder"
      v-model="searchText"
      @change="onChange"
      @pressEnter="onSearch"
    >
      <a-icon slot="prefix" type="search" class="search-focus" @click="onSearch" />
      <a-icon slot="suffix" type="close" v-show="searchText.length" @click="onClear"></a-icon>
    </a-input>
  </div>
</template>

<script>
import { Input, Icon } from 'ant-design-vue';
export default {
  name: 'sum-search-input',
  data() {
    return {
      searchText: '',
    };
  },
  props: {
    placeholder: {
      type: String,
    },
  },

  methods: {
    onChange(e) {
      this.$emit('on-change', e.target.value);
    },

    onSearch() {
      this.$emit('search', this.searchText);
    },

    onClear() {
      this.searchText = '';
      this.$emit('clear-search');
    },
  },
  components: {
    'a-input': Input,
    'a-icon': Icon,
  },
};
</script>

<style lang="scss">
@import '../../style/common.scss';
.basic-input-container {
  height: 24px;
  .ant-input-affix-wrapper {
    font-size: $min-font-size;
    border: none;

    &:hover {
      .ant-input {
        border: 1px solid $SELF-bgcolor;
        &:not(.ant-input-disabled) {
          border: 1px solid $SELF-bgcolor;
        }
      }
      .ant-input-prefix {
        .anticon {
          svg {
            color: $SELF-bgcolor;
          }
        }
      }
    }
    &:focus {
      .ant-input-prefix {
        display: none;
      }
      .ant-input {
        padding-left: 4px;
      }
    }
    .ant-input-prefix {
      width: 12px;
      height: 12px;
      left: 4px;
      cursor: pointer;
    }
    .ant-input {
      height: 24px !important;
      font-size: $min-font-size;
      padding: 0 20px 0 20px !important;
      outline: none;
      &:hover {
        border: 1px solid $SELF-bgcolor;
      }
      &:focus {
        border: 1px solid $SELF-bgcolor;
        box-shadow: none;
      }
    }
    .ant-input-suffix {
      right: 4px;
      cursor: pointer;
      &:hover {
        background: #e4e4e4;
        border-radius: 2px;
      }
      .ant-input-clear-icon {
        color: #969696;
        font-size: 6px;
      }
      .anticon {
        & > svg {
          transform: scale(0.75);
        }
      }
    }
  }
}
</style>

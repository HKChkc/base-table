<template>
  <div class="sum-date-picker-container">
    <a-date-picker
      :value="formatSelectedDate"
      :locale="locale"
      :allowClear="false"
      @change="handleDateChange"
      :format="format"
      :valueFormat="valueFormat"
      :size="size"
      :dropdownClassName="dropdownClassName"
      :getCalendarContainer="getCalendarContainer"
    >
      <sum-icon type="calendar" slot="suffixIcon"></sum-icon>
    </a-date-picker>
  </div>
</template>

<script>
import { DatePicker } from 'ant-design-vue';
import moment from 'moment';
import SumIcon from '../sumIcon';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
export default {
  name: 'sum-date-picker',
  props: {
    selectedDate: [String, Number, Object, Date],
    dateChange: {
      type: Function,
    },
    format: {
      type: String,
      default: 'yyyy-MM-DD',
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-DD',
    },
    size: {
      type: String,
      default: 'small',
    },
    dropdownClassName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      locale,
    };
  },

  computed: {
    formatSelectedDate() {
      const isValid = moment(this.selectedDate).isValid();
      return isValid
        ? moment(this.selectedDate).format(this.format)
        : moment(parseInt(this.selectedDate)).format(this.format);
    },
  },

  methods: {
    handleDateChange(date) {
      const newDate = moment(date).format(this.format);
      this.$emit('dateChange', newDate);
    },

    getCalendarContainer() {
      return document.querySelector('.app-split-wrapper') || document.body;
    },
  },

  components: {
    'a-date-picker': DatePicker,
    'sum-icon': SumIcon,
  },
};
</script>

<style lang="scss">
$border-color-green: #039e86;
.sum-date-picker-container {
  //  日期选择样式
  .ant-calendar-picker {
    margin-left: 4px;
    width: 120px;
    &:hover {
      .ant-calendar-picker-input {
        border-color: $border-color-green;
        &:not(.ant-input-disabled) {
          border-color: $border-color-green;
        }
      }
    }
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ant-calendar-picker-input {
      height: 24px;
      line-height: 24px;
      padding: 0 5px;
      font-size: 12px;
      border-radius: 2px;
      &:hover {
        border-color: $border-color-green;
      }
    }
    .ant-calendar-picker-icon {
      right: 5px !important;
      margin-top: -6px;
      display: flex !important;
      align-items: center;
    }
  }
}
</style>

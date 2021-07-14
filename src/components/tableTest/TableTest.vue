<template>
  <div class="table-test">
    <div class="header">header</div>
    <div class="main">
      <sum-base-table
        rowKey="id"
        :fields="columns"
        :data-source="tableData"
        :height="tableHeight"
        :scale="1"
        :isDialogShow="isDialogShow"
        :isDragging="isDragging"
        :cancelClear="cancelClear"
        :selectedRowKeys="selectedRowKeys"
        @selectedRows="handleSelectedRows"
        @select-range="handleSelectRange"
        @cancel-select="removeSelected"
      >
        <template #ageTitle>
          <sum-resizeable-title
            @onResize="handleTitleResize"
            @onDragHandler="handleDragHandler"
            @onDropHander="handleDropHandler"
            @resizeCol="handleDbClick"
            @onDragStart="handleDragStart"
            @onMouseUpToDrop="handleTitleMouseUpToDrop"
            :column="columnsMap['年龄']"
          >
            <div class="header-title">年龄</div>
          </sum-resizeable-title>
        </template>
        <template #age="{ age }">
          <div class="table-cell">
            {{ age }}
          </div>
        </template>
      </sum-base-table>
    </div>
  </div>
</template>

<script>
import SumBaseTable from '../../common/base/sumBaseTable/SumBaseTable';
import SumResizeableTitle from '../../common/base/sumResizeableTitle';
import { TABLE_DATA } from '../../../mock/tableData';
import { COLUMNS, COLUMNS_MAP } from './const';
// import { SumResizeableTitle } from '../../../dist/sum-comp';
// import { SumBaseTable, SumResizeableTitle } from '../../../lib/sum-comp.umd.min';
// console.log(`d`, d);
// const { SumBaseTable, SumResizeableTitle } = d;
export default {
  name: 'table-test',

  components: {
    'sum-base-table': SumBaseTable,
    'sum-resizeable-title': SumResizeableTitle,
  },

  data() {
    return {
      columns: COLUMNS,
      columnsMap: COLUMNS_MAP,
      tableData: TABLE_DATA.list,
      isDialogShow: false,
      isDragging: false,
      cancelClear: false,
      selectedRowKeys: [],
    };
  },

  computed: {
    tableHeight() {
      const { height: bodyHeight } = document.body && document.body.getBoundingClientRect();
      if (bodyHeight) {
        return bodyHeight - 40 + 'px';
      }
      return 'auto';
    },
  },

  methods: {
    handleSelectedRows(selectedRows) {
      console.log(`selectedRows`, selectedRows);
    },

    handleSelectRange(range = []) {
      console.log(`range`, range);
    },

    removeSelected(key) {
      console.log(`remove ----  key`, key);
    },

    handleTitleResize(resize) {
      console.log(`resize`, resize);
    },

    handleDragHandler(x, clientX) {
      console.log(`x`, x);
      console.log(`clientX`, clientX);
    },

    handleDropHandler() {},

    handleDbClick() {
      console.log('db click');
    },

    handleDragStart(clientX) {
      console.log(`clientX`, clientX);
    },

    handleTitleMouseUpToDrop() {
      console.log('drop');
    },
  },
};
</script>

<style></style>

<template>
  <div
    class="sum-base-table"
    ref="tableWrapper"
    tabindex="0"
    @keyup="handleKeyUp"
    @mousedown="handleBaseTableMouseDown"
    @mousemove="handleBaseTableMouseMove"
    @mouseup="handleBaseTableMouseUp"
    @blur.stop="handleBaseTableBlur"
  >
    <vxe-table
      ref="baseTable"
      border="none"
      show-overflow
      stripe
      highlight-hover-row
      highlight-current-row
      :row-id="rowKey"
      column-key
      :auto-resize="true"
      :sync-resize="true"
      :show-header="showHeader"
      :checkbox-config="checkboxConfig"
      :header-cell-class-name="setHeaderCellClass"
      @checkbox-change="handleRowSelect"
      @checkbox-all="selectAll"
      @header-cell-click="handleHeaderCellClick"
      :height="height"
      :sort-config="{ showIcon: false }"
      :data="dataSource"
      :row-class-name="setRowClassName"
      :empty-text="emptyText"
      @cell-click="handleCellClick"
      @keydown="onKeyDown"
      @cell-mouseenter="onCellMouseEnter"
      @cell-mouseleave="onCellMouseLeave"
    >
      <!-- <vxe-table-column type="checkbox" width="40px"></vxe-table-column> -->
      <template v-for="field in fields">
        <vxe-table-column v-bind="field" :key="field.field">
          <template
            v-if="(field.slots && field.slots.title) || ['single', 'double'].includes(field.sort)"
            #header
          >
            <slot v-if="field.slots && field.slots.title" :name="field.slots.title">
              <span>{{ field.title }}</span>
            </slot>
            <span v-else>
              <span>{{ field.title }}</span>
              <span>
                <s-icon
                  type="arrow-down"
                  v-if="sortMethod === 'desc' && sortField === field.field"
                ></s-icon>
                <s-icon type="arrow-up" v-else></s-icon>
              </span>
            </span>
          </template>
          <template
            v-if="field.scopedSlots && field.scopedSlots.customRender"
            #default="{ row, column }"
          >
            <slot
              :name="field.scopedSlots.customRender"
              :column="column"
              :[field.field]="row[field.field]"
              :row="row"
            ></slot>
          </template>
        </vxe-table-column>
      </template>
    </vxe-table>
    <div class="selected-range-area" ref="selectedArea"></div>
  </div>
</template>

<script>
export default {
  name: 'sum-base-table',

  props: {
    dataSource: Array,
    fields: Array,
    height: [Number, String],
    setRowClass: Function,
    rowKey: String,
    selectedRowKeys: {
      type: Array,
      default: () => [],
    },
    // dialog 关闭时 可取消
    isDialogShow: {
      type: Boolean,
      default: false,
    },
    isDragging: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    cancelClear: {
      type: Boolean,
      default: false,
    },

    tableConfig: {
      type: Object,
      default: () => {
        return {
          headerHeight: 24,
          rowHeight: 32,
        };
      },
    },
    scale: {
      type: Number,
      default: () => 1.25,
    },
  },
  data() {
    return {
      defaultSelecteRows: [],
      sortField: '',
      sortMethod: 'asc',
      isShift: false,
      isPressingCtrl: false,
      rowIndexRange: [], // 点击选择
      isRangeSelectedStart: false,
      firstPoint: [],
      secondPoint: [],
      // isRowMouseOver: false,
      rowAreaRange: [], // 拖拽选择
      rowIndexStack: [],
      selectedAreaTimer: null,
      isAreaSelecting: false,
      lastRowClientY: null,
      emptyText: '暂无数据',
    };
  },

  computed: {
    checkboxConfig() {
      return {
        checkRowKeys: this.defaultSelecteRows,
        highlight: true,
      };
    },

    fieldsMap() {
      const fieldsMap = {};
      this.fields.forEach((item) => {
        fieldsMap[item.field] = item;
      });
      return fieldsMap;
    },
  },

  watch: {
    selectedRowKeys: {
      handler() {
        this.setCheckedRows();
      },
      immediate: true,
    },
    dataSource: {
      handler() {
        this.setCheckedRows();
      },
      immediate: true,
    },
  },

  mounted() {
    this.$watch('fields', this.refreshColumn, {
      immediate: true,
    });
  },

  methods: {
    selectAll({ records }) {
      this.$emit('selectedRows', records);
      this.rowIndexRange = [];
    },
    handleRowSelect({ records }) {
      this.$emit('selectedRows', records);
      this.rowIndexRange = [];
    },

    setFields(newIndex, oldIndex) {
      const fields = JSON.parse(JSON.stringify(this.fields));
      [fields[newIndex], fields[oldIndex]] = [fields[oldIndex], fields[newIndex]];
      this.$emit('setFields', fields);
    },

    handleHeaderCellClick({ column, triggerResizable }) {
      if (column.property && column.sortable && !triggerResizable) {
        // 排序
        this.handleSort(column);
      }
    },

    handleSort(column) {
      const curField = this.fields.find((item) => item.field === column.property);
      if (curField.sort === 'single') {
        if (this.sortField === column.property) {
          this.sortField = '';
        } else {
          this.sortField = column.property;
        }
        this.sortMethod = 'asc';
        this.$emit('sort', this.sortField, this.sortMethod);
      }
      if (curField.sort === 'double') {
        this.sortMethod =
          this.sortMethod === 'asc' && this.sortField === column.property ? 'desc' : 'asc';
        this.sortField = column.property;

        this.$emit('sort', this.sortField, this.sortMethod);
      }
    },

    setHeaderCellClass({ column }) {
      if (column.property === this.sortField) {
        return 'sorting-field';
      }
      return '';
    },

    setRowClassName({ row }) {
      if (typeof this.setRowClass === 'function') {
        return this.setRowClass({ row });
      }
      return '';
    },

    refreshColumn() {
      const baseTableEle = this.$refs.baseTable;
      if (baseTableEle) {
        const columns = baseTableEle.getColumns();
        if (!columns.length) return;
        const colsMap = this.getColumnsMap(columns);
        const newCols = [];
        if (columns[0].type === 'checkbox') {
          newCols.push(columns[0]);
        }
        this.fields.forEach((item) => {
          const curCol = colsMap[item.field];
          newCols.push(curCol);
        });

        baseTableEle.loadColumn(newCols);
      }
    },

    getColumnsMap(columns = []) {
      const colsMap = {};
      columns.forEach((item) => {
        colsMap[item.property] = item;
      });
      return colsMap;
    },

    setCheckedRows() {
      const baseTableEle = this.$refs.baseTable;
      const selectedRowKeys = this.selectedRowKeys;
      if (!selectedRowKeys.length) return;
      if (baseTableEle) {
        const selectedRows = [];
        this.dataSource.forEach((item) => {
          if (selectedRowKeys.includes(item.id)) {
            selectedRows.push(item);
          }
        });
        baseTableEle.setCheckboxRow(selectedRows, true);
      }
    },

    handleCellClick({ row, rowIndex, triggerCheckbox }) {
      if (triggerCheckbox) return;
      if (this.isAreaSelecting) return;
      // console.log('点击选择, base table');
      const rowRangeLength = this.rowIndexRange.length;
      const isSelected = this.selectedRowKeys.includes(row.id);
      const baseTableEle = this.$refs.baseTable;
      if (isSelected && !this.isShift && !this.isDialogShow) {
        // 取消选中
        // 如果只有一个选中 再次点击时取消选中，如果有多个选中，则取消其他选中，当前选中不变
        if (this.selectedRowKeys.length === 1) {
          this.$emit('cancel-select', row.id);
          baseTableEle.setCheckboxRow(row, false);
          this.rowIndexRange = [];
        } else {
          this.rowIndexRange = [];
          this.rowIndexRange.push(rowIndex);
          this.$emit('select-range', this.rowIndexRange);
          this.removeOtherSelectedRows(rowIndex);
        }
      } else if (!rowRangeLength && !this.isDialogShow) {
        this.rowIndexRange.push(rowIndex);
        // 不管是否按住shift、ctrl都选中的第一个
        this.$emit('select-range', this.rowIndexRange);
        if (!this.isPressingCtrl) {
          this.removeOtherSelectedRows(rowIndex);
        }
      } else if (
        !this.isShift &&
        rowRangeLength === 1 &&
        !this.isDialogShow &&
        this.isPressingCtrl
      ) {
        // 一个一个点击选中, 按住ctrl 多选
        this.rowIndexRange.pop();
        this.rowIndexRange.push(rowIndex);
        this.$emit('select-range', this.rowIndexRange);
      } else if (
        !this.isShift &&
        rowRangeLength === 1 &&
        !this.isDialogShow &&
        !this.isPressingCtrl
      ) {
        // 没有按住shift、ctrl，点击，选中当前行，取消其他已选项
        this.rowIndexRange = [];
        this.rowIndexRange.push(rowIndex);
        this.$emit('select-range', this.rowIndexRange);
        this.removeOtherSelectedRows(rowIndex);
      } else if (this.isShift && rowRangeLength === 1 && this.rowIndexRange[0] !== rowIndex) {
        // 按住shift选择第二个位置
        this.rowIndexRange.push(rowIndex);
        this.$emit('select-range', this.rowIndexRange);
      } else if (this.isShift && rowRangeLength === 2) {
        // 按住shift重新选第二个位置
        const removedIndex = this.rowIndexRange.pop();
        this.handleRemoveChecked(removedIndex, rowIndex);
        this.rowIndexRange.push(rowIndex);
        if (this.rowIndexRange[0] !== rowIndex) {
          this.$emit('select-range', this.rowIndexRange);
        }
      }
    },

    handleRemoveChecked(removedIndex, curIndex) {
      if (removedIndex === curIndex) return;
      const baseTableEle = this.$refs.baseTable;
      const removeRows = [];
      this.dataSource.forEach((item, index) => {
        let condition =
          removedIndex > curIndex
            ? index > curIndex && index <= removedIndex
            : index >= removedIndex && index < curIndex;
        if (condition) {
          removeRows.push(item);
        }
      });
      removeRows.forEach((item) => {
        this.$emit('cancel-select', item.id);
        baseTableEle.setCheckboxRow(item, false);
      });
    },

    removeOtherSelectedRows(selectedIndex) {
      const selectedKey = this.dataSource[selectedIndex].id;
      const removedRowKeys = this.selectedRowKeys.filter((key) => key !== selectedKey);
      this.handleRemoveOthers(removedRowKeys);
    },

    handleRemoveOthers(removedRowKeys) {
      const baseTableEle = this.$refs.baseTable;
      const removedRows = [];
      this.dataSource.forEach((item) => {
        if (removedRowKeys.includes(item.id)) {
          removedRows.push(item);
        }
      });
      removedRows.forEach((item) => {
        this.$emit('cancel-select', item.id);
        baseTableEle.setCheckboxRow(item, false);
      });
    },

    onKeyDown({ $event }) {
      const keyCode = $event.keyCode;
      // shift
      if (keyCode === 16) {
        this.isShift = true;
      }

      // ctrl
      if (keyCode === 17) {
        this.isPressingCtrl = true;
      }
    },

    handleKeyUp(e) {
      // shift
      if (e.keyCode === 16) {
        this.isShift = false;
        this.rowIndexRange = [];
      }
      if (e.keyCode === 17) {
        this.isPressingCtrl = false;
        this.rowIndexRange = [];
      }
    },

    handleBaseTableMouseDown(e) {
      if (this.selectedAreaTimer) {
        clearTimeout(this.selectedAreaTimer);
        this.selectedAreaTimer = null;
      }
      const { clientX, clientY } = this.recalculateClient(e);
      this.isRangeSelectedStart = true;
      // this.firstPoint = [e.clientX, e.clientY];
      this.firstPoint = [clientX, clientY];
    },

    handleBaseTableMouseMove(e) {
      if (this.isDragging) return;
      if (!this.isRangeSelectedStart) return;
      let isMovingDown = false;
      const { clientX, clientY } = this.recalculateClient(e);
      if (this.secondPoint.length) {
        isMovingDown = clientY > this.secondPoint[1];
      }
      this.secondPoint = [clientX, clientY];
      this.drawSelectArea();
      if (this.rowAreaRange.length === 1) {
        this.$emit('select-range', this.rowAreaRange);
        this.removeOtherSelectedRows(this.rowAreaRange[0]);
        this.isAreaSelecting = true;
      }

      const minClientY = Math.min(this.firstPoint[1], this.secondPoint[1]);
      if (
        this.lastRowClientY &&
        minClientY > this.lastRowClientY + 5 &&
        this.rowAreaRange.length === 1 &&
        isMovingDown
      ) {
        this.removeAllSelectedRows();
        this.rowIndexStack = [];
        this.rowAreaRange = [];
      }
      isMovingDown = false;
    },

    handleBaseTableMouseUp(e) {
      const areaEle = this.$refs.selectedArea;
      areaEle.style.display = 'none';
      this.isRangeSelectedStart = false;
      const { clientY } = this.recalculateClient(e);
      this.hanldeOutofRange(clientY);
      this.firstPoint = [];
      this.secondPoint = [];
      this.selectedAreaTimer = setTimeout(() => {
        // 区别选择区域选择和点击选择
        this.isAreaSelecting = false;
      }, 50);
      this.rowAreaRange = [];
      this.rowIndexStack = [];
      this.lastRowClientY = null;
    },

    //  拖拽进行选中范围内的行
    onCellMouseEnter({ rowIndex }) {
      if (this.rowIndexStack[this.rowIndexStack.length - 1] === rowIndex) return;
      if (this.rowIndexStack.length === 1) {
        this.rowIndexStack.pop();
      }
      this.rowIndexStack.push(rowIndex);
      if (this.isDragging) return;
      if (!this.rowAreaRange.length || !this.isRangeSelectedStart) {
        // 为拖拽mousedown时添加一个选中的行（起始行）
        this.rowAreaRange.pop();
        this.rowAreaRange.push(rowIndex);
      } else if (this.rowAreaRange.length === 2 && this.rowAreaRange[0] === rowIndex) {
        // 当 终止行与起始行是同一行时只保留改行的选中状态
        const removedIndex = this.rowAreaRange.pop();
        this.$emit('select-range', this.rowAreaRange);
        this.handleRemoveChecked(removedIndex, rowIndex);
      } else if (this.isRangeSelectedStart && this.rowAreaRange[0] !== rowIndex) {
        // 拖拽选取范围，添加终止行并进行选择
        if (this.rowAreaRange.length === 1) {
          this.rowAreaRange.push(rowIndex);
          this.$emit('select-range', this.rowAreaRange);
        } else {
          const firstIndex = this.rowAreaRange[0];
          const removedIndex = this.rowAreaRange.pop();
          this.rowAreaRange.push(rowIndex);
          this.$emit('select-range', this.rowAreaRange);
          // 从下向上选择，当前行索引大于移除的索引和从上向下选择当前行的索引小于移除的索引时需要进行删除
          if (
            (rowIndex > firstIndex && removedIndex > rowIndex) ||
            (rowIndex < firstIndex && removedIndex < rowIndex)
          ) {
            this.handleRemoveChecked(removedIndex, rowIndex);
          }
        }
      }
    },

    onCellMouseLeave({ $event }) {
      if (!this.isRangeSelectedStart) {
        this.rowAreaRange.pop();
        this.rowIndexStack.pop();
      }
      const lastIndex = this.dataSource.length - 1;
      const { clientY } = this.recalculateClient($event);
      if (
        this.isRangeSelectedStart &&
        this.rowAreaRange.length === 1 &&
        this.rowAreaRange[0] === lastIndex
      ) {
        this.lastRowClientY = Math.max(clientY, this.lastRowClientY);
      }
    },

    drawSelectArea() {
      const areaEle = this.$refs.selectedArea;
      const tableEle = this.$refs.tableWrapper;
      const { top, left } = tableEle.getBoundingClientRect();
      const l = Math.min(this.firstPoint[0] - left, this.secondPoint[0] - left);
      const t = Math.min(this.firstPoint[1] - top, this.secondPoint[1] - top);
      const width = Math.abs(this.firstPoint[0] - this.secondPoint[0]);
      const height = Math.abs(this.firstPoint[1] - this.secondPoint[1]);
      areaEle.style.left = l + 'px';
      areaEle.style.top = t + 'px';
      areaEle.style.width = width + 'px';
      areaEle.style.height = height + 'px';
      areaEle.style.display = 'block';
    },

    handleBaseTableBlur() {
      this.isPressingCtrl = false;
      if (this.cancelClear) return;
      this.removeAllSelectedRows();
    },

    removeAllSelectedRows() {
      this.handleRemoveOthers(this.selectedRowKeys);
    },

    hanldeOutofRange(clientY) {
      const tableWrapperEle = this.$refs.tableWrapper;
      if (tableWrapperEle) {
        const { top } = tableWrapperEle.getBoundingClientRect();
        const distance = clientY - top;
        const { headerHeight, rowHeight } = this.tableConfig;
        const validateTableHeight = headerHeight + this.dataSource.length * rowHeight;
        const isClick = Math.abs(this.firstPoint[1] - clientY) < 2;
        const isAllOutOfRange = Math.min(this.firstPoint[1], clientY) > validateTableHeight;
        if (Math.ceil(distance) > validateTableHeight && (isClick || isAllOutOfRange)) {
          this.removeAllSelectedRows();
        }
      }
    },

    recalculateClient(e) {
      const scale = this.scale;
      const clientX = Math.floor(e.clientX / scale);
      const clientY = Math.floor(e.clientY / scale);
      return {
        clientX,
        clientY,
      };
    },
  },

  beforeDestroy() {
    if (this.sortable) {
      this.sortable.destroy();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.selectedAreaTimer) {
      clearTimeout(this.selectedAreaTimer);
      this.selectedAreaTimer = null;
    }
  },
};
</script>

<style lang="scss">
@import './index.scss';
</style>

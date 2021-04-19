# sum-comp

### 用法

##### 全局使用

在 main.js 中
先引入字体文件

```
import 'sum-comp/lib/sum-comp.css';
import SumComp from 'sum-comp'
Vue.use(SumComp)

// 全局组件名称
// sum-base-table
// sum-date-picker
// sum-icon
// sum-resizeable-title
// sum-resize-detecter
// sum-search-input
// sum-select
// sum-text-tooltip
```

##### 局部使用

```
import { SumIcon } from 'sum-comp'
```

##### 组件

```
import {
  SumBaseTable,
  SumDatePicker,
  SumIcon,
  SumResizeDetecter,
  SumResizeableTitle,
  SumSearchInput,
  SumSelect,
} from 'sum-comp'
```

**`SumBaseTable`**

| props           | 说明                                     |    类型 | 默认值                            |
| :-------------- | ---------------------------------------- | ------: | --------------------------------- |
| rowKey          | 唯一标识                                 |  string |                                   |
| fields          | 见 fields                                |   any[] |                                   |
| data-source     | 数据源                                   |   any[] |                                   |
| height          | 表格的 的高度, 设置高度可实现虚拟列表    |  number |                                   |
| scale           | 当前 body 的缩放比例                     |  number | 1                                 |
| isDialogShow    | 有弹框打开时阻止选择                     | boolean | false                             |
| isDragging      | 表头拖动时阻止选择                       | boolean | false                             |
| cancelClear     | 是否取消全部清除                         | boolean | false                             |
| selectedRowKeys | 选择的行的数据，保存的是行唯一标识的数组 |   any[] | []                                |
| showHeader      | 是否展示表头                             | boolean | false                             |
| tableConfigb    | 表格的头和行高的配置                     |  Object | {headerHeight: 24, rowHeight: 24} |

| methods       | 说明                         | 默认值/参数                              |
| ------------- | ---------------------------- | ---------------------------------------- |
| selectedRows  | 有 checkbox 时 选中行时触发  | 所有选中行的数据                         |
| select-range  | 点击或拖拽进行范围选择时触发 | [start[, end]], (start, end 均为 number) |
| cancel-select | 取消选择                     | (key)                                    |

| fields                                                                                        | 说明                                   | 类型        | 默认值/参数 |
| --------------------------------------------------------------------------------------------- | -------------------------------------- | ----------- | ----------- |
| title                                                                                         | 列标题                                 | string      |             |
| name                                                                                          | 同 title                               | string      |             |
| align                                                                                         | 列的对齐方式(left, center, right)      | string      | left        |
| field                                                                                         | 列字段名                               | string      |             |
| minWidth                                                                                      | 最小列宽度；会自动将剩余空间按比例分配 | number      |             |
| width                                                                                         | 列宽度                                 | string (px) |             |
| scopedSlots                                                                                   | 自定义显示内容插槽 {customRender: ''}  | Object      |             |
| slots                                                                                         | 自定义表格标题显示插槽 {title: ''}     | Object      |             |
| 其他字段 [vxe-table/column/api](https://xuliangzhan_admin.gitee.io/vxe-table/v3/#/column/api) |                                        |             |             |

**`SumDatePicker`**

| props             | 说明                                                          | 类型                         | 默认值     |
| ----------------- | ------------------------------------------------------------- | ---------------------------- | ---------- |
| selectedDate      | 当前选择的日期                                                | string\|number\|object\|date |            |
| format            | 日期格式                                                      | string                       | yyyy-MM-DD |
| size              | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | string                       | small      |
| dropdownClassName | 额外的弹出日历 className                                      | string                       |            |

| methods    | 说明               | 回调参数       |
| ---------- | ------------------ | -------------- |
| dateChange | 日期发生改变时触发 | function(date) |

**`SumIcon`**
| props | 说明 | 类型 | 默认值 |
| -------- | ---------- | ------- | ------ |
| type | icon 的类型 | string | |
| disabled | 是否禁用 | boolean | false |

| methods  | 说明          | 回调参数 |
| -------- | ------------- | -------- |
| on-click | icon 点击事件 |          |

**`SumResizeDetecter`**
| methods | 说明 | 回调参数 |
| ------- | ---------------------- | ------------------------- |
| notify | 窗口大小发生改变时触发 | function({width, height}) |

**`SumResizeableTitle`**
| props | 说明 | 类型 | 默认值 |
| ------ | ------ | ---- | ------ |
| column | 当前列 | | |

| methods         | 说明                 | 回调参数                                                             |
| --------------- | -------------------- | -------------------------------------------------------------------- |
| onResize        | dragStop 时触发      | function({...column, move: number})                                  |
| onDragHandler   | 拖拽过程中触发       | funtion(x, y, column), x-x 轴的位移， y- 起始位置，column-当前列数据 |
| onDropHander    | 拖拽停止的触发       |                                                                      |
| resizeCol       | 双击表头拖拽线时触发 | function(column), column-当前列数据                                  |
| onDragStart     | 开始拖拽时触发       | function(e.clientX), clientX-起始拖拽的位置                          |
| onMouseUpToDrop | mouse up 时 触发     |                                                                      |

**`SumSearchInput`**
| props | 说明 | 类型 | 默认值 |
| ----------- | -------- | ------ | ------ |
| placeholder | 提示内容 | string | |

| methods      | 说明                     | 回调参数       |
| ------------ | ------------------------ | -------------- |
| on-change    | 输入框内容发生改变时触发 | function(text) |
| search       | 回车时触发               |                |
| clear-search | 输入框清空时 触发        |                |

**`SumSelect`**
| props | 说明 | 类型 | 默认值 |
| ------------ | ------------------------------------------------- | ---------------------------------- | ------------------------------ |
| value | 当前选中的值 string | string\|string[]\|number\|number[] | |
| field | 选项所需修改的字段 | string | |
| align | 选项对齐方式 center:居中，between:两侧 | string | between |
| options | 所有选项数组 | any[] | |
| optionConfig | 配置选项的 label 和值，{label: '', val: ''} | Object | {label: 'label', val: 'value'} |
| defaultOpen | 是否默认打开 | boolean | false |
| disabled | 是否禁用 | Boolean | false |
| type | 配置选择框的类型，row-行内选择框，params-筛选条件 | string | params |

| method    | 说明               | 回调参数                                         |
| --------- | ------------------ | ------------------------------------------------ |
| on-select | 选项发生改变时触发 | function({type, field, val}), type-row 或 params |

**`SumTextToolTip`**
| props | 说明 | 类型 | 默认值 |
| ----- | ---- | ------ | ------ |
| text | 内容 | string | |

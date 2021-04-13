export const COLUMNS = [
  {
    title: '姓名',
    field: 'name',
  },
  {
    title: '年龄',
    field: 'age',
    width: 100,
    minWidth: 100,
    slots: { title: 'ageTitle' },
    scopedSlots: { customRender: 'age' },
  },
  {
    title: '城市',
    field: 'city',
  },
];

const COLUMNS_MAP = {};
COLUMNS.forEach((item) => {
  COLUMNS_MAP[item.title] = item;
});
export { COLUMNS_MAP };

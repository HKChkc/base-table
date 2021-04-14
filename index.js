import SumBaseTable from './src/common/base/sumBaseTable/SumBaseTable.vue';
import SumDatePicker from './src/common/base/sumDatePicker/index.vue';
import SumIcon from './src/common/base/sumIcon/index.vue';
import SumResizeDetecter from './src/common/base/sumResizeDetecter/index.vue';
import SumResizeableTitle from './src/common/base/sumResizeableTitle/index.vue';
import SumSearchInput from './src/common/base/sumSearchInput/index.vue';
import SumSelect from './src/common/base/sumSelect/index.vue';

const comps = [
  SumBaseTable,
  SumDatePicker,
  SumIcon,
  SumResizeDetecter,
  SumResizeableTitle,
  SumSearchInput,
  SumSelect,
];
const install = function (Vue) {
  if (install.installed) return;
  comps.forEach((comp) => Vue.component(comp.name, comp));
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  SumBaseTable,
  SumDatePicker,
  SumIcon,
  SumResizeDetecter,
  SumResizeableTitle,
  SumSearchInput,
  SumSelect,
};

export default install;

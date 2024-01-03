import loadable from "@loadable/component";

const DynamicComponent = (type: string) =>
  loadable(async () => await import(`antd/lib/${type}/index.js`));
export default DynamicComponent;

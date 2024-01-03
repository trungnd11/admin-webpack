import loadable from "@loadable/component";

const DynamicIcon = (type: string) =>
  loadable(async () => await import(`@ant-design/icons/es/icons/${type}.js`));
export default DynamicIcon;

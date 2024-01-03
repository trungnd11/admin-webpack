export interface RoutersModel {
  id: number | string
  path: string
  element: JSX.Element | any
  name: string
  icon?: JSX.Element | any
  children?: RoutersModel[]
};

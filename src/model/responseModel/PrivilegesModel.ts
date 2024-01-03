export interface PrivilegeModel {
  id: number | null
  code: string | null
  name: string | null
}

export interface PrivilegesModel {
  path: string
  privilege: PrivilegeModel[]
};

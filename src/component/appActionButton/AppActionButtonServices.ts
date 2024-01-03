import { NotPermissionMessageEnum } from "../../enum/RoleEnum";

const roleMessage: Record<string, string> = {
  update: NotPermissionMessageEnum.UPDATE,
  delete: NotPermissionMessageEnum.DELETE,
  create: NotPermissionMessageEnum.CREATE
};

export const showTitleNotRole = (type: keyof typeof roleMessage) => {
  return roleMessage[type];
};

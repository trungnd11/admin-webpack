import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHook";
import { getSitesMapStore } from "../../store/sitesMap/sitesMap";
import { PrivilegeModel, PrivilegesModel } from "../../model/responseModel/PrivilegesModel";
import { Privileges } from "../../enum/PrivilegesUser";

export default function usePrivileges() {
  const [access, setAccess] = useState(false);
  const [create, setCreate] = useState(false);
  const [exports, setExports] = useState(false);
  const [approve, setApprove] = useState(false);
  const [sendApprove, setSendApprove] = useState(false);
  const [compare, setCompare] = useState(false);
  const [close, setClose] = useState(false);
  const [insert, setInsert] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [insertTrans, setInsertTrans] = useState(false);
  const [template, setTemplate] = useState(false);
  const [imports, setImports] = useState(false);
  const [record, setRecord] = useState(false);
  const [deleteTrans, setDeleteTrans] = useState(false);
  const [execute, setExecute] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [reject, setReject] = useState(false);
  const [update, setUpdate] = useState(false);

  const { privileges } = useAppSelector(getSitesMapStore);
  const { pathname } = useLocation();

  const resetPermission = () => {
    setAccess(false);
    setCreate(false);
    setExports(false);
    setApprove(false);
    setSendApprove(false);
    setCompare(false);
    setClose(false);
    setInsert(false);
    setViewDetails(false);
    setDeletes(false);
    setInsertTrans(false);
    setTemplate(false);
    setImports(false);
    setRecord(false);
    setDeleteTrans(false);
    setExecute(false);
    setReject(false);
    setUpdate(false);
  };

  useEffect(() => {
    resetPermission();
    if (privileges?.length > 0) {
      const findRole: PrivilegesModel = privileges.find((item) => item.path === pathname);

      const privilegeAccess = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.ACCESS);
      privilegeAccess && setAccess(true);

      const privilegeCreate = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.CREATE);
      privilegeCreate && setCreate(true);

      const privilegeExport = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.EXPORT);
      privilegeExport && setExports(true);

      const privilegeApprove = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.APPROVE);
      privilegeApprove && setApprove(true);

      const privilegeSendApprove = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.SEND_APPROVE);
      privilegeSendApprove && setSendApprove(true);

      const privilegeCompare = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.COMPARE);
      privilegeCompare && setCompare(true);

      const privilegeClose = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.CLOSE);
      privilegeClose && setClose(true);

      const privilegeInsert = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.INSERT);
      privilegeInsert && setInsert(true);

      const privilegeViewDetails = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.VIEWDETAILS);
      privilegeViewDetails && setViewDetails(true);

      const privilegeDeletes = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.DELETE);
      privilegeDeletes && setDeletes(true);

      const privilegeInsertTrans = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.INSERTTRANS);
      privilegeInsertTrans && setInsertTrans(true);

      const privilegeTemplate = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.TEMPLATE);
      privilegeTemplate && setTemplate(true);

      const privilegeImports = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.IMPORT);
      privilegeImports && setImports(true);

      const privilegeRecord = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.RECORD);
      privilegeRecord && setRecord(true);

      const privilegeDeleteTrans = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.DELETETRANS);
      privilegeDeleteTrans && setDeleteTrans(true);

      const privilegeExecute = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.EXECUTE);
      privilegeExecute && setExecute(true);

      const privilegeCancel = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.CANCEL);
      privilegeCancel && setCancel(true);

      const privilegeReject = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.REJECT);
      privilegeReject && setReject(true);

      const privilegeUpdate = findRole?.privilege.find((item: PrivilegeModel) => item.code === Privileges.UPDATE);
      privilegeUpdate && setUpdate(true);
    }
  }, [privileges, pathname]);

  return (
    {
      access,
      create,
      exports,
      approve,
      compare,
      close,
      insert,
      viewDetails,
      deletes,
      insertTrans,
      template,
      imports,
      record,
      deleteTrans,
      sendApprove,
      execute,
      cancel,
      reject,
      update
    }
  );
};

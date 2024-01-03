import ReloadCacheApi from "../../api/reloadCache/ReloadCachesApi";
import { openNotification } from "../../component/alert/Alert";
import { ApParamsModel } from "../../model/apParamsManagementModel/ApParamsManagementModel";
import { ReloadCacheSearchParams } from "../../model/reloadCacheModel/ReloadCacheModel";
import { isJSON, parserJson } from "../../ulti/stringUlti";

export const fetchParamsListAppCache = async (params?: ReloadCacheSearchParams) => {
  if (!params) return;
  try {
    const { data } = await ReloadCacheApi.getList(params);
    return data;
  } catch (error) {

  }
};

export const fetchReloadAppCache = async (
  dataReload: ApParamsModel,
  setIsLoading: React.Dispatch<React.SetStateAction<string | undefined>>) => {
  if (!dataReload) return;
  const { parValue, parType } = dataReload;

  const fetchReload = async (config: any) => {
    try {
      const { data } = await ReloadCacheApi.reloadCache(url, parType, config);
      setIsLoading(undefined);
      return data;
    } catch (error) {
      setIsLoading(undefined);
    }
  };

  let url = parValue;
  let config;
  if (isJSON(parValue)) {
    url = parserJson(parValue)?.url;
    config = parserJson(parValue)?.config;
  }
  if (!url) return openNotification({ description: "Không tìm thấy địa chỉ tải lại cache" });
  const countFetch = 4;
  const listPromise = [];
  for (let i = 0; i < countFetch; i++) {
    listPromise.push(fetchReload(config));
  }
  Promise.all(listPromise).then(() => {
    openNotification({ description: "Tải lại cache thành công" });
  }).catch(err => console.log({ err }));
};

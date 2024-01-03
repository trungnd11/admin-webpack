export const toNumber = (data: string | null) => Number(data);

export const isJSON = (value: string) => {
  if (typeof value !== "string") { value = JSON.stringify(value); }
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
};

export const parserJson = (value: string) =>
  JSON.parse(value);

export const cutString = (value?: string | undefined, length?: number) =>
  value ? (value.length > 100 ? `${value?.slice(0, length ?? 100)}...` : value) : "";

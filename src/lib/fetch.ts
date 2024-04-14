export const fetchData = async (
  url: string,
  config: any
) => {
  let configBase = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const mergeConfig = {
    ...configBase,
    ...config,
  };

  const response = await fetch(url, mergeConfig);
  return response;
};

const getQueryParams = (url: string) => {
  const queryParamsUrl = url.split("?")[1];
  const params = new URLSearchParams(queryParamsUrl);

  return params;
};

export { getQueryParams };

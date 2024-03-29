import request from "@/utils/request";

/**
 * 获取搜索联想建议
 */
export const getSearchSuggestion = (q) => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};

export const getSearchResult = (params) => {
  return request({
    method: "get",
    url: "/v1_0/search",
    params,
  });
};

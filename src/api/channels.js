import request from "@/utils/request";

export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};

export const frechALlChannels = () => {
  return request({
    method: "get",
    url: "v1_0/channels",
  });
};

export const frechAddChannel = (channel) => {
  return request({
    method: "patch",
    url: "/v1_0/user/channels",
    data: {
      channels: [channel],
    },
  });
};

export const deleteUserChannel = (channelId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`,
  });
};

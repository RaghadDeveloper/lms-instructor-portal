import axiosInstance from "../../api/axiosInstance";

export const likeApi = ({ likeable_id, likeable_type }) =>
  axiosInstance.post(
    `/like?likeable_id=${likeable_id}&likeable_type=${likeable_type}`
  );

export const unLikeApi = ({ likeable_id, likeable_type }) =>
  axiosInstance.delete(
    `/unlike?likeable_id=${likeable_id}&likeable_type=${likeable_type}`
  );

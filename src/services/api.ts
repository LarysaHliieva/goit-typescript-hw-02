import axios from "axios";
import type { ImagesResponse } from "../types/type";

const instance = axios.create({
  baseURL: "https://pixabay.com/api",
  params: {
    key: "19043103-0cd62514f089da7e89200caeb",
    image_type: "photo",
    orientation: "horizontal",
  },
});

export const searchImages = async (
  search: string,
  page: number = 1,
  perPage: number = 4
): Promise<ImagesResponse> => {
  const response = await instance.get<ImagesResponse>("/", {
    params: {
      q: search,
      page,
      per_page: perPage,
    },
  });

  return response.data;
};

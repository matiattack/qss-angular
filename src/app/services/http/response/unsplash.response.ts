import {UnsplashEntity} from "../../../entities/unsplash.entity";

export interface UnsplashResponse {
  total: number;
  totalPages: number;
  data: UnsplashEntity[];
}

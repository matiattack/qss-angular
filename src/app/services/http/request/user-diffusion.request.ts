import {LinkRequest} from "./link.request";
import {ImageRequest} from "./image.request";
import {RequestBaseInterface} from "./request-base.interface";

export interface UserDiffusionRequest extends RequestBaseInterface{

  text: string;
  user: number;
  disciplines?: number[];
  link?: LinkRequest;
  image?: ImageRequest;

}

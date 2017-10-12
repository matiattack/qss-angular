import {RequestBaseInterface} from "./request-base.interface";
import {LocationRequest} from "./location.request";

export interface EventRequest  extends RequestBaseInterface{

  isPublic?: boolean;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?:string;
  name?: string;
  coverImage?: any;
  location?: LocationRequest;
  disciplines?: number[];
  description?: string;
}

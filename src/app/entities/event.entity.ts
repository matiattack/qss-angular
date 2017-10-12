import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {UnsplashEntity} from "./unsplash.entity";
import {StreetEntity} from "./street.entity";
import {DisciplineEntity} from "./discipline.entity";

export class EventEntity extends EntityBase<EventEntity> implements IEntityBase{

  isPublic: boolean;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime:string;
  name: string;
  disciplines: DisciplineEntity[];
  location: StreetEntity;
  coverImage: UnsplashEntity;
  description: string;

  constructor(isPublic?:boolean, startDate?: Date, endDate?: Date, startTime?: string, endTime?: string, name?: string, disciplines?: DisciplineEntity[], location?: StreetEntity, unsplashImage?: UnsplashEntity){
    super();
    this.isPublic = isPublic;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.name = name;
    this.disciplines = disciplines;
    this.location = location;
    this.coverImage = unsplashImage;
  }

  setAttributes(input: any): void {
  }

  getObject(): EventEntity {
    return this;
  }
}

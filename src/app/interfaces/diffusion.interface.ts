import {UserEntity} from "../entities/user.entity";
import {ScheduleEntity} from "../entities/schedule.entity";
import {DisciplineEntity} from "../entities/discipline.entity";

export interface DiffusionInterface {
  user?: UserEntity;
  schedule?: ScheduleEntity;
  disciplines?: DisciplineEntity[];
}

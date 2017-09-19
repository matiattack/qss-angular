import {UserDiffusionEntity} from "../entities/user-diffusion.entity";
import {UserEntity} from "../entities/user.entity";

export interface PostInterface {

  targetUser: UserEntity;
  comment: UserDiffusionEntity;

}

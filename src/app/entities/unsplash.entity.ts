import {IEntityBase, EntityBase} from "./base/entity-base.entity";

export interface UnsplashUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  biography: string;
  profileImage: string;
}

export interface UnsplashImage {
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export class UnsplashEntity extends EntityBase<UnsplashEntity> implements IEntityBase{

  id: string;
  description: string;
  user: UnsplashUser;
  image: UnsplashImage;
  height: number;
  width: number;
  status: boolean;

  setAttributes(input: any): void {

    this.status = false;
    this.id = input.id;
    this.description = input.description;

    this.user = <UnsplashUser> {
      id: input.user.id,
      username: input.user.username,
      firstName: input.user.first_name,
      lastName: input.user.last_name,
      biography: input.user.bio,
      profileImage: input.user.profile_image.medium
    };

    this.image = <UnsplashImage>{
      full: input.urls.full,
      regular: input.urls.regular,
      small: input.urls.small,
      thumb: input.urls.thumb
    };

    this.height = input.height;
    this.width = input.width;

  }

  getObject(): UnsplashEntity {
    return this;
  }

}

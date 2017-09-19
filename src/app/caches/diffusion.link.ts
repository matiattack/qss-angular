import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {PostInterface} from "../interfaces/post.interface";
import {UserEntity} from "../entities/user.entity";
import {AuthService} from "../services/auth.service";
import {NavigationStart, Router} from "@angular/router";
import {UserDiffusionEntity} from "../entities/user-diffusion.entity";
import {FooterControl} from "../controls/footer.control";
import {FooterSetting} from "../settings/footer.setting";
import {ScheduleEntity} from "../entities/schedule.entity";
import {DiffusionInterface} from "../interfaces/diffusion.interface";

@Injectable()
export class DiffusionLink {

  private diffusionData: DiffusionInterface = {user: null, schedule: null};
  private diffusionDetailCache: UserDiffusionEntity;

  private commentSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router) {}

  /*Prepare to add publications*/
  public addDiffusionLink(diffusion: DiffusionInterface): void {
    this.diffusionData = diffusion;
    this.router.navigate(['publication/add']);
  }

  public getDiffusionLinkData(): DiffusionInterface {
    if(this.diffusionData.user == null && this.diffusionData.disciplines == null){
      this.router.navigate(['/']);
    }
    return this.diffusionData;
  }
  /*End prepare to add publications*/

  /*Prepare to diffusion detail*/
  public diffusionDetailLink(diffusion: UserDiffusionEntity): void {
    this.diffusionDetailCache = diffusion;
    this.router.navigate(['publication/'.concat(this.diffusionDetailCache.id.toString())]);
  }

  public getDiffusionDetailData(): UserDiffusionEntity {
    return this.diffusionDetailCache;
  }
  /*End prepare to diffusion detail*/

  public commentableContent(): Subject<string> {
    return this.commentSubject;
  }

  public addComment(comment: string): void {
    this.commentSubject.next(comment);
  }

}

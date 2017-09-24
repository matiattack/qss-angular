import {Component} from "@angular/core";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {UserDiffusionService} from "../../../services/http/user-diffusion.service";
import {UserDiffusionEntity} from "../../../entities/user-diffusion.entity";
import {UserEntity} from "../../../entities/user.entity";
import {AuthService} from "../../../services/auth.service";
import {ToolbarService} from "../../../shared/services/toolbar.service";
import {ToolbarInterface} from "../../../interfaces/toolbar.interface";
import {DiffusionLink} from "../../../caches/diffusion.link";
import {FooterSetting} from "../../../settings/footer.setting";
import {FooterControl} from "../../../controls/footer.control";

@Component({
  selector: 'publication-detail',
  template: `
<div *ngIf="diffusion != null">
  <user-publication [publication]="diffusion"></user-publication>
</div>
<div *ngIf="comments != null && comments.length > 0">
  <div *ngFor="let comment of comments">
    <comment-detail [comment]="comment"></comment-detail>
  </div>
</div>
`
})
export class PublicationDetailComponent {

  diffusion: UserDiffusionEntity;
  comments: UserDiffusionEntity[] = [];

  authUser: UserEntity = AuthService.User;
  words: string = '';
  commentError: boolean = false;

  constructor(
    private userDiffusionService: UserDiffusionService,
    private route: ActivatedRoute,
    private toolbarService: ToolbarService,
    private location: Location,
    private publicationControl: DiffusionLink,
    private footerControl: FooterControl){}

  ngOnInit(): void {

    this.setUiPresentation();

    this.route.params.map(params => params['id']).subscribe((id) => {

      let diffusionCache = this.publicationControl.getDiffusionDetailData();

      if(diffusionCache == null || diffusionCache.id != id){
        this.userDiffusionService.byId(id).subscribe( diffusion => {
          this.diffusion = diffusion;
          this.loadComments();
        });
      }else{
        this.diffusion = diffusionCache;
        this.loadComments();
      }
    });

    this.publicationControl.commentableContent().subscribe(comment => {
      if(comment.trim() != ''){
        this.userDiffusionService.comment(this.diffusion.id, new UserDiffusionEntity(comment)).subscribe( commentResp => {
          this.comments.unshift(commentResp);
          this.commentError= false;
        });

      }else this.commentError = true;
    })
  }

  private loadComments(): void {
    this.userDiffusionService.diffusionComments(this.diffusion.id).subscribe( comments => {
      this.comments = comments;
    });
  }

  comment(): void {
    if(this.words.trim() != ''){
      this.userDiffusionService.comment(this.diffusion.id, new UserDiffusionEntity(this.words)).subscribe( comment => {
        this.comments.unshift(comment);
        this.commentError= false;
      });

    }else this.commentError = true;
  }

  setUiPresentation(): void {

    this.footerControl.toggleFooter(FooterSetting.getInstance().ADD_COMMENT);

    let toolbarOptions: ToolbarInterface = this.toolbarService.defaultOptions;
    toolbarOptions.leftButton = {text: '', icon: 'keyboard_backspace', click: ()=>{ this.location.back(); } };
    toolbarOptions.title = 'Comentarios';

    this.toolbarService.setToolbar(toolbarOptions);

  }

}

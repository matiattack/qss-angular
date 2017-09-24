import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DisciplineService} from "../../../services/http/discipline.service";
import {DisciplineEntity} from "../../../entities/discipline.entity";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'discipline-detail',
  template: `
<div *ngIf="discipline != null; else loading">
  <discipline-detail-tabs [discipline]="discipline"></discipline-detail-tabs>
</div>
<ng-template #loading>
  <md-progress-bar mode="indeterminate"></md-progress-bar>
</ng-template>
`
})
export class DisciplineDetailComponent {

  discipline: DisciplineEntity;
  isFollow: boolean = false;

  constructor(private route: ActivatedRoute, private disciplineService: DisciplineService, private authService: AuthService){}

  ngOnInit() {

    this.route.params.map(params => params['id']).subscribe((id) => {
        this.disciplineService.byId(id).subscribe( discipline => {
          this.discipline = discipline;
        });
      });
  }

}

import {Component, Input, SimpleChanges, OnChanges} from "@angular/core";
import {DisciplineService} from "../../../../services/http/discipline.service";
import {UserDiffusionEntity} from "../../../../entities/user-diffusion.entity";

@Component({
  selector: 'discipline-publications',
  template: `
<div *ngIf="publications.length > 0">
  <comment-list [publications]="publications"></comment-list>
</div>
`
})
export class DisciplinePublicationsComponent implements OnChanges{

  @Input() disciplineId: number;
  publications: UserDiffusionEntity[] = [];

  constructor(private disciplineService: DisciplineService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.disciplineService.publications(this.disciplineId).subscribe( resp =>{
      this.publications = resp;
    });
  }

}

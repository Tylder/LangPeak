import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {UtilsService} from '../../../../../../../../shared/services/utils.service';

@Component({
  selector: 'app-add-set-questions',
  templateUrl: './add-set-questions.component.html',
  styleUrls: ['./add-set-questions.component.scss']
})
export class AddSetQuestionsComponent implements OnInit {

  @Input() totalQuestionAmount: number;

  @Output() addQuestion = new EventEmitter<null>();
  @Output() setQuestionAmount = new EventEmitter<number>();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  questionRange: number[];

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.questionRange = this.utilsService.rangeArray(0, this.totalQuestionAmount);
    console.log(this.questionRange);
  }

  openSetQuestionAmountMenu() {
    this.trigger.openMenu();
  }

}

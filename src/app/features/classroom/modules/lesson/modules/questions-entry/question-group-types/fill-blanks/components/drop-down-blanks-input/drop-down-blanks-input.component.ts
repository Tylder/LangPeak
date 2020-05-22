import { Component, OnInit } from '@angular/core';
import {BaseFillBlankComponent} from '../base-fill-blank/base-fill-blank.component';
import {UtilsService} from '../../../../../../../../../../shared/services/utils.service';

@Component({
  selector: 'app-drop-down-blanks-input',
  templateUrl: './drop-down-blanks-input.component.html',
  styleUrls: ['./drop-down-blanks-input.component.scss']
})
export class DropDownBlanksInputComponent extends BaseFillBlankComponent implements OnInit {

  usedAlternatives: string[];
  alternativesMaxLength = 0;

  constructor(private utilsService: UtilsService) {
    super();
  }

  ngOnInit(): void {

    this.usedAlternatives = Object.assign([], this.question.data.alternatives); // clone array
    this.usedAlternatives.push(this.question.data.correctValue);
    this.usedAlternatives = this.utilsService.shuffleArray(this.usedAlternatives);

    this.usedAlternatives.forEach((alt) => {
      if (alt.length > this.alternativesMaxLength) { this.alternativesMaxLength = alt.length; }
    });
  }

}

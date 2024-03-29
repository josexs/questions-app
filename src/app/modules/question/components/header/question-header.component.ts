import { Component, Input } from '@angular/core';
import { ParticipantI } from '@interfaces';

@Component({
  selector: 'question-header',
  templateUrl: 'question-header.component.html',
  styleUrls: ['./question-header.component.scss'],
})
export class QuestionHeaderComponent {
  @Input() participant: ParticipantI;
}

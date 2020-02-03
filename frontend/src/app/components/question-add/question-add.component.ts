import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

export interface TopicGroup {
  name: string;
  topics: string[];
}

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  questionForm: FormGroup;
  loading = false;
  submitted = false;
  // topicGroup: TopicGroup[] = [];
  topics: string[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    /*this.topicGroup = [{
      name: 'Транспорт',
      topics: ['Подкатегорий 1', 'Подкатегория 2']
    }];*/
    this.topics = ['Бизнес', 'Бытовая электронника', 'Дом и дача', 'Животные', 'Искусство', 
    'Личные вещи', 'Люди', 'Наука', 'Недвижимость', 'Образование', 'Работа', 'Транспорт', 'Услуги', 'Хобби и отдых', 'Другое'];
    this.questionForm = this.formBuilder.group({
      topic: ['', Validators.required],
      question: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
  }

  get f() { return this.questionForm.controls; }

  add() {
    this.submitted = true;

    if (this.questionForm.invalid) {
      return;
    }

    this.loading = true;
    // this.questionService.add(this.f.topic.value, this.f.question.value);
    this.questionService.add(this.f.topic.value, this.f.question.value)
    .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.alertService.error(error);
        });
  }
}

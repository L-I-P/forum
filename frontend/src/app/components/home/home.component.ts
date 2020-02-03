import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  questions: Question[] = [];
  topics: string[] = [];
  loading = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.topics = ['Все', 'Бизнес', 'Бытовая электронника', 'Дом и дача', 'Животные', 'Искусство',
      'Личные вещи', 'Люди', 'Наука', 'Недвижимость', 'Образование', 'Работа', 'Транспорт', 'Услуги', 'Хобби и отдых', 'Другое'];
    this.searchForm = this.formBuilder.group({
      topic: ['Все', Validators.required]
    });
    this.getQuestions();
  }

  private getQuestions() {
    this.loading = true;
    this.questionService.getQuestions()
      .pipe(first())
      .subscribe(
        data => {
          this.questions = data;
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  navigateTo(id: number) {
    this.router.navigate(['/question/' + id]);
  }

  questionAdd() {
    this.router.navigate(['question-add']);
  }

  get f() { return this.searchForm.controls; }

  search() {
    if (this.searchForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.f.topic.value !== 'Все') {
      this.questionService.getQuestionsByTopic(this.f.topic.value)
        .pipe(first())
        .subscribe(
          data => {
            this.questions = data;
            this.loading = false;
            console.log(data);
          },
          error => {
            this.alertService.error(error);
          });
    } else {
      this.getQuestions();
      this.loading = false;
      console.log(this.questions);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question';
import { CommentService } from '../../services/comment.service';
import { AlertService } from '../../services/alert.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question = null;
  comments: Comment[] = [];
  commentForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private commentService: CommentService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getQuestion();
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  private getQuestion() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      this.questionService.getQuestion(Number(+params.get('id')))
        .pipe(first())
        .subscribe(
          data => {
            this.question = data;
            this.getComments();
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    });
  }

  get isLoggedIn() {
    return localStorage.getItem('name') !== null && localStorage.getItem('token') !== null;
  }

  locationBack() {
    this.location.back();
  }

  get f() { return this.commentForm.controls; }

  addComment() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    this.loading = true;

    this.commentService.add(this.question.id, this.f.comment.value)
      .pipe(first())
      .subscribe(
        data => {
          this.getComments();
        },
        error => {
          this.alertService.error(error);
        });

    this.submitted = false;
    this.loading = false;
    this.f.comment.setValue(' ');
  }

  deleteQuestion(id: number) {
    if (this.comments.length === 0) {
    this.questionService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => {
          this.alertService.error(error);
        });
      } else {
        window.alert('Пожалуйста удалите все комментарии');
        console.log(this.comments);
      }
  }

  deleteComment(id: number) {
    this.commentService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.getComments();
        },
        error => {
          this.alertService.error(error);
        });
  }

  get userName() {
    if (this.isLoggedIn) {
      return localStorage.getItem('name');
    }
  }

  private getComments() {
    this.commentService.get(this.question.id)
    .pipe(first())
    .subscribe(
      comments => {
        this.comments = comments;
        this.loading = false;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}

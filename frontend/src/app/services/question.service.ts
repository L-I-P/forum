import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(
    private http: HttpClient) {
  }
  getQuestions() {
    return this.http.get<any>(`${environment.apiUrl}/questions`);
  }

  getQuestion(Id: number) {
    return this.http.get<any>(`${environment.apiUrl}/questions/${Id}`);
  }

  add(Topic: string, Description: string) {
    return this.http.post<any>(`${environment.apiUrl}/questions/create`, {
      user: localStorage.getItem('name'),
      topic: Topic,
      description: Description
     });
  }

  delete(Id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/questions/${Id}`);
  }

  getQuestionsByTopic(topic: string) {
    return this.http.get<any>(`${environment.apiUrl}/questions/Topic/${topic}`);
  }
}

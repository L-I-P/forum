import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(
    private http: HttpClient) {
  }

  get(questionId: number) {
    return this.http.get<any>(`${environment.apiUrl}/comments/${questionId}`);
  }

  add(QuestionId: number, Description: string) {
    return this.http.post<any>(`${environment.apiUrl}/comments/create`, {
      questionId: QuestionId,
      user: localStorage.getItem('name'),
      description: Description
     });
  }

  delete(Id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/comments/${Id}`);
  }
}

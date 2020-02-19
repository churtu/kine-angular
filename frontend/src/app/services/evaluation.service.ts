import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  URI='http://localhost:3000/api/';
  constructor(
    private http: HttpClient
  ) { }

  addEvaluation(evaluation){
    return this.http.post<any>(this.URI+'/evaluations', evaluation);
  }
}

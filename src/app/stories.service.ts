import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { IItem, StoriesComponent } from './stories/stories.component';
import { Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})

export class StoriesService {

  constructor(public http: HttpClient) { }

  GetData(): Observable<IItem[]> {
    return this.http.get<IItem[]>("http://localhost:5136/Stories");
  }

} 
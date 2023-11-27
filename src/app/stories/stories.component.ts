import { HttpClient } from '@angular/common/http';
import  { StoriesService } from '../stories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, map, merge, startWith, switchMap } from 'rxjs';

export interface IItem {
  id: string;
  deleted: boolean;
  type: string;
  by: string;
  time: string;
  text: string | null;
  dead: boolean;
  parent: string | null;
  poll: string | null;
  kids: number[]| null;
  url: string;
  score: string;
  title: string;
  parts: number[]| null;
  descendants: string;
}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})

export class StoriesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'link'];
  resultsLength: number=10;
  noUrlMessage: string="Url not found";
  stories: IItem[]=[];
  searchText: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(public storiesService: StoriesService) {
    
   }

  ngOnInit() {
    this.loadData();
  }

    loadData(){
      this.storiesService.GetData()
      .subscribe( result =>  this.stories = result as IItem[])
  }
  
  onEnter(searchText: string) {
    this.stories =  this.stories.filter(x => x.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}

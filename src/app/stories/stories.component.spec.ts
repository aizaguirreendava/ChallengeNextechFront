import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IItem, StoriesComponent } from './stories.component';
import { StoriesService } from '../stories.service';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';



describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let mockItemArray: IItem[];
  const fake = new StoriesService(jasmine.createSpyObj('HttpClient', ['post', 'get']))
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
  httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoriesComponent],
      imports: [MatPaginatorModule,
        MatTableModule, 
        HttpClientModule],
      providers: [{provide: HttpClient, useValue: httpClientSpy},
        {provide: StoriesService, useValue: fake} ]
    });
    
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    spyOn(component.storiesService, 'GetData').and.returnValue(of(mockItemArray));
    mockItemArray=[
      {
        id: "38406223",
        deleted: false,
        type: "story",
        by: "indus",
        time: "1700847265",
        text: null,
        dead: false,
        parent: null,
        poll: null,
        kids: null,
        url: "https://greatergood.berkeley.edu/article/item/why_were_unhappiest_in_our_late_40s",
        score: "1",
        title: "Why We're Unhappiest in Our Late 40s",
        parts: null,
        descendants: "0"
      },
      {
        id: "38406167",
        deleted: false,
        type: "story",
        by: "samizdis",
        time: "1700846879",
        text: null,
        dead: false,
        parent: null,
        poll: null,
        kids: [
          38406201
        ],
        url: "https://www.theatlantic.com/ideas/archive/2023/11/ai-safety-regulations-uncensored-models/676076/",
        score: "2",
        title: "AI's Spicy-Mayo Problem",
        parts: null,
        descendants: "1"
      }
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('#loadData should call news api', ()=>{
    component.loadData();
    expect(component.stories).toBe(mockItemArray);
})

});

import { Component, OnInit } from '@angular/core';
import { CategoryListService } from './categorylist.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  constructor(public serv: CategoryListService) {}

  ngOnInit(): void {
    this.serv.refreshCategoryList();
  }
}

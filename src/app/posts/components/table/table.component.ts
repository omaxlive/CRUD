/*
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource, TableItem } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<TableItem>;
  dataSource: TableDataSource;

  // Columns displayed in the table. Columns IDs can be added, removed, or reordered.
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
*/

import {Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Post } from '../../interfaces/post';
import { PostsService } from '../../services/posts.service';


const ELEMENT_DATA: Post[] = [
  {
    id: 1,
    title: 'Madrid',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    lat: '40.41678',
    long: '-3.70379',
    image_url: 'http://static.tvmaze.com/uploads/images/medium_portrait/60/151357.jpg'
  },
  {
    id: 2,
    title: 'Barcelona',
    content: 'Barcelona Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    lat: '40.41675',
    long: '-3.70376',
    image_url: 'http://static.tvmaze.com/uploads/images/medium_portrait/11/27896.jpg'
  },
  {
    id: 3,
    title: 'Granada',
    content: 'Granada Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    lat: '40.41671',
    long: '-3.70371',
    image_url: 'http://static.tvmaze.com/uploads/images/medium_portrait/4/11308.jpg'
  }
];

// export const COLUMNS: any = {ID: 'id', TITLE: 'title', CONTENT: 'content'};

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'content'];
  dataSource = new MatTableDataSource([]);

  constructor(public postsService: PostsService) { }

  openDetail(row: any) {
    console.log(row);
  }

  filterList(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  getPostsList() {
    this.postsService.getPosts()
      .subscribe((result) => {
        if (result) {
          this.dataSource.data = result;
        }
      }, (error) => {
        console.error('ERROR: ', error);
      }, () => {
        console.log('COMPLETED');
      });
  }

  ngOnInit(): void {
    this.getPostsList();
  }

}

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
import { PostsService } from '../../services/posts.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'image_url'];
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

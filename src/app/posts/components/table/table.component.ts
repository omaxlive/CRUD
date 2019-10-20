import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../../interfaces/post';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'image_url'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public postsService: PostsService, public router: Router) { }

  ngOnInit(): void {
    this.getPostsList();
  }

  getPostsList() {
    this.postsService.getPosts()
      .subscribe((result) => {
          this.refreshList(result);
      }, (error) => {
        console.error('ERROR: ', error);
      }, () => {
        console.log('COMPLETED');
      });
  }

  refreshList(data: Post[]): void {
    this.dataSource.data = data;
    this.dataSource.sort = this.sort;
  }

  filterList(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  openDetail(row: any) {
    this.router.navigateByUrl('/detail', { state: row });
  }

  createPost() {
    this.router.navigateByUrl('/detail', { state: {} });
  }
}

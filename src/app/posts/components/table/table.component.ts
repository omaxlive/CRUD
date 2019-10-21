import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../../interfaces/post';
import { SnackBarService } from '../../services/snack-bar.service';

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
  isMapActive = false;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public postsService: PostsService, public router: Router, public snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.getPostsList();
  }

  getPostsList(): void {
    this.postsService.getPosts()
      .subscribe((result) => {
        this.refreshList(result);
        this.snackBar.showSnackBar('Posts loaded successfully', 'Dismiss');
      }, (error) => {
        this.snackBar.showSnackBar('Something went wrong', 'Dismiss');
        console.error('ERROR: ', error);
      }, () => {
        console.log('COMPLETED');
      });
  }

  refreshList(data: Post[]): void {
    this.dataSource.data = data;
    this.dataSource.sort = this.sort;
  }

  filterList(filter: string): void {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  openDetail(row: any): void {
    this.router.navigateByUrl('/detail', { state: row });
  }

  createPost(): void {
    this.router.navigateByUrl('/detail', { state: {} });
  }

  tabClick(tab: string): void {
    this.isMapActive = true;
  }
}

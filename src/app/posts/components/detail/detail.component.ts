import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../interfaces/post';
import { PostsService } from '../../services/posts.service';
import { Location } from '@angular/common';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  state$: Observable<object>;
  myForm: FormGroup;
  isCreating = true;
  currentPost: Post = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public postsService: PostsService,
    private location: Location,
    public snackBar: SnackBarService,
  ) { }

  ngOnInit() {
    this.initReactiveForm();
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe((post: Post) => {
      if (Object.keys(post).length > 1) {
        this.fillFormWithData(post);
        this.isCreating = false;
      }
    });
  }

  initReactiveForm() {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      long: ['', [Validators.required]],
      image_url: ['', [Validators.required]]
    });
  }

  fillFormWithData(post: Post) {
    this.currentPost = post;
    this.myForm.patchValue(post);
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    if (this.isCreating) {
      this.postsService.createPost(this.myForm.value).subscribe((res) => {
        this.location.back();
        this.snackBar.showSnackBar('Created successfully', 'Dismiss');
      });
    } else {
      this.postsService.updatePost({ id: this.currentPost.id, ...this.myForm.value}).subscribe((res) => {
        this.location.back();
        this.snackBar.showSnackBar('Updated successfully', 'Dismiss');
      });
    }
  }

  deletePost() {
    this.postsService.deletePost(this.currentPost.id).subscribe(() => {
      this.location.back();
      this.snackBar.showSnackBar('Removed successfully', 'Dismiss');
    });
  }



}




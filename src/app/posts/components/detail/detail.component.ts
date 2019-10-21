import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../interfaces/post';
import { PostsService } from '../../services/posts.service';
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
    public snackBar: SnackBarService,
    public router: Router
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

  initReactiveForm(): void {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      lat: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,9})?$')]],
      long: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,9})?$')]],
      image_url: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    });
  }

  fillFormWithData(post: Post): void {
    this.currentPost = post;
    this.myForm.patchValue(post);
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm(): void {
    if (this.isCreating) {
      this.postsService.createPost(this.myForm.value).subscribe((res) => {
        this.router.navigateByUrl('/');
        this.snackBar.showSnackBar('Created successfully', 'Dismiss');
      }, (error) => {
        this.snackBar.showSnackBar('Something went wrong', 'Dismiss');
      });
    } else {
      this.postsService.updatePost({ id: this.currentPost.id, ...this.myForm.value}).subscribe(() => {
        this.router.navigateByUrl('/');
        this.snackBar.showSnackBar('Updated successfully', 'Dismiss');
      }, (error) => {
          this.snackBar.showSnackBar('Something went wrong', 'Dismiss');
      });
    }
  }

  deletePost(): void {
    this.postsService.deletePost(this.currentPost.id).subscribe(() => {
      this.router.navigateByUrl('/');
      this.snackBar.showSnackBar('Removed successfully', 'Dismiss');
    }, (error) => {
      this.snackBar.showSnackBar('Something went wrong', 'Dismiss');
    });
  }

  updateLocation(event: Event): void {
    this.myForm.patchValue(event);
  }
}




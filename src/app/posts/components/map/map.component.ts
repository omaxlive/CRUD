import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../interfaces/post';
import { Marker } from '../../interfaces/marker';
import { MouseEvent as AGMMouseEvent } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  private _posts: Post[];
  get posts(): Post[] {
    return this._posts;
  }
  @Input()
  set posts(posts: Post[]) {
    this._posts = posts;
    this.refreshMarkers();
  }

  @Output() postSelected = new EventEmitter<Post>();
  @Output() markerDragged = new EventEmitter<Post>();

  markers = [];

  constructor() {}

  refreshMarkers(): void {
    if (this.posts.length === 1 && this.posts[0].lat === '') {
      this.posts[0].lat = '41.3851';
      this.posts[0].long = '2.1734';
    }
    this.markers = this.getMarkers(this.posts);
  }

  getMarkers(posts: Post[]): Marker[] {
    const markersList: Marker[] = [];
    posts.forEach(post => {
      const m: Marker = {
        lat: Number(post.lat),
        lng: Number(post.long),
        alpha: 1,
        draggable: post.hasOwnProperty('draggable') ? true : false,
        id: post.id
      };
      markersList.push(m);
    });
    return markersList;
  }

  selectMarker(event) {
    this.postSelected.emit(this.posts.find(x => x.id === Number(event._id)));
  }

  dragFinished(event: AGMMouseEvent) {
    this.markerDragged.emit({
      lat: String(event.coords.lat.toFixed(4)),
      long: String(event.coords.lng.toFixed(4))
    });
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FavoritesComponent implements OnInit {
  bookmarks: any = [];

  ngOnInit(): void {
    const favorite = localStorage.getItem('bookmarks');
    if (favorite?.length) {
      this.bookmarks = JSON.parse(favorite);
    }
  }

  removeBookmark(image: any): void {
    this.bookmarks.forEach((item: any, index: number) => {
      if (item.url === image.url) {
        this.bookmarks.splice(index, 1);
        localStorage.removeItem('bookmarks');
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
      }
    });
  }

}

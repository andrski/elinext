import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainSearchComponent implements OnInit {
  inputValue = '';
  images: any = [];
  totalRecords = '';
  page = 1;
  bookmarks: any = [];
  errorValue = false;
  debounceGet = new Subject<string>();

  constructor(private flickrService: FlickrService) {
    this.debounceGet.pipe(
      debounceTime(700),
      // tslint:disable-next-line: deprecation
      distinctUntilChanged()).subscribe(() => {
        this.getImages();
        this.search();
      });
  }

  ngOnInit(): void {
    const favorite = localStorage.getItem('bookmarks');
    if (favorite?.length) {
      this.bookmarks = JSON.parse(favorite);
    }
  }

  clearInputValue(): void {
    this.inputValue = '';
  }

  addToBookmarks(image: any): void {
    let addValue = true;
    this.bookmarks.forEach((item: any) => {
      if (isEqual(image, item)) {
        this.errorValue = true;
        addValue = false;
        setTimeout(() => {
          this.errorValue = false;
        }, 2000);
      }
    });
    if (addValue) {
      this.bookmarks.push(image);
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }
  }

  search(): void {
    this.images = [];
    this.inputValue.toLowerCase();
    if (this.inputValue.length > 0) {
      // tslint:disable-next-line: deprecation
      this.flickrService.searchKeywords(this.inputValue).subscribe((data) => {
        // this.images = data;
        console.log(this.images);
      });
    }
  }

  getImages(someValue?: string | null): void {
    this.images = [];
    const value = parseInt(this.inputValue, 10) || Number(someValue);
    if (value) {
      // tslint:disable-next-line: deprecation
      this.flickrService.getImagesJsonPlaceHolder(value).subscribe((data) => {
        this.images = data;
        this.totalRecords = data.length;
      });
    }
  }
}

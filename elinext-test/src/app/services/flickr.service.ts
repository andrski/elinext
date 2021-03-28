import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BASE_API_URL, FAKE_API_URL } from '../baseUrl';
import { FlickrOutput } from '../models/flickerOutput';
import { FlickrImage } from '../models/flickrImage';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  constructor(private httpClient: HttpClient) { }

  searchKeywords(keyword: string): Observable<any> {
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=10`;

    return this.httpClient.get(BASE_API_URL + params).pipe(map(
      (res: any) => {
        const urlArr: any = [];
        console.log(res);
        res.photos.photo.forEach((photo: FlickrImage) => {
          const photoObj = {
            url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
            title: photo.title
          };
          urlArr.push(photoObj);
        });
        return urlArr;
      }
    ));
  }

  getImagesJsonPlaceHolder(numberOfImages: number): Observable<any> {
    return this.httpClient.get(FAKE_API_URL + `?_limit=${numberOfImages}`);
  }
}

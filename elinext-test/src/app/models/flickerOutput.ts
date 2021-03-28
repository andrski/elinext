import { FlickrImage } from './flickrImage';

export interface FlickrOutput {
    photos: {
        pthoto: Array<FlickrImage>;
    };
}

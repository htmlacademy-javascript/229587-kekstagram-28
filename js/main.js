import {renderPhoto} from './render-photo.js';
import {listPost} from './data.js';

const similarPhotos = listPost();
renderPhoto(similarPhotos);

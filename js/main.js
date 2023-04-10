import { renderPhoto } from './render-photo.js';
import { loadPhoto } from './photo-upload.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { initFilter } from './filter-content.js';

getData()
  .then((pictures) => {
    renderPhoto(pictures);
    initFilter(pictures);
  })
  .catch((err) => showAlert(err.message));

loadPhoto();

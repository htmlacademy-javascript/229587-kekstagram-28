import { showBigPictureModal } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPost = (post) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = post.url;
  pictureElement.querySelector('.picture__img').alt = post.description;
  pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = post.likes;

  pictureElement.addEventListener('click', () => showBigPictureModal(post));

  return pictureElement;
};

const renderPhoto = (similarPhotos) => {
  similarPhotos.forEach((item) => picturesContainer.append(createPost(item)));
};

export { renderPhoto };

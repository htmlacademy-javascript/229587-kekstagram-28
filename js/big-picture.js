import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const commentsLoaderBtn = document.querySelector('.comments-loader');
const socialCommentsList = document.querySelector('.social__comments');
const socialCommentTemplate = document.querySelector('.social__comment');

const fragment = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');
bigPictureCloseBtn.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
});

const onPictureClick = (post) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  socialCaption.textContent = post.description;
  commentsCount.textContent = post.comments.length;
  socialCommentCount.classList.add('hidden');
  commentsLoaderBtn.classList.add('hidden');
  body.classList.add('modal-open');
  socialCommentsList.innerHTML = '';

  post.comments.forEach((comment) => {
    const clone = socialCommentTemplate.cloneNode(true);
    clone.querySelector('.social__comment img').src = comment.avatar;
    clone.querySelector('.social__comment img').alt = comment.name;
    clone.querySelector('.social__comment p').textContent = comment.message;
    fragment.append(clone);
  });

  socialCommentsList.append(fragment);

  document.addEventListener('keydown', onDocumentKeydown);
};

export {onPictureClick};

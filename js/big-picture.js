import { isEscapeKey } from './util.js';

const QUANTITY_COMMENTS = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentsList = document.querySelector('.social__comments');
const socialCommentTemplate = document.querySelector('.social__comment');
const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const createCommentElement = (comment) => {
  const element = socialCommentTemplate.cloneNode(true);
  element.querySelector('.social__comment img').src = comment.avatar;
  element.querySelector('.social__comment img').alt = comment.name;
  element.querySelector('.social__comment p').textContent = comment.message;
  return element;
};

const renderCommentsToList = (fullComments, openComments) => {
  if (openComments >= fullComments.length) {
    commentsLoader.classList.add('hidden');
    openComments = fullComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  socialCommentsList.append(...fullComments.slice(0, openComments).map(createCommentElement));
  socialCommentCount.textContent = `${openComments} из ${fullComments.length} комментариев`;
  socialCommentCount.classList.remove('hidden');
  return socialCommentsList;
};

const createComments = (comments) => {
  let commentsOpen = QUANTITY_COMMENTS;
  renderCommentsToList(comments, commentsOpen);

  commentsLoader.addEventListener('click', () => {
    commentsOpen += QUANTITY_COMMENTS;
    socialCommentsList.innerHTML = '';
    renderCommentsToList(comments, commentsOpen);
  });
};

const showBigPictureModal = (post) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  socialCaption.textContent = post.description;
  commentsCount.textContent = post.comments.length;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  socialCommentsList.innerHTML = '';

  document.addEventListener('keydown', onDocumentKeydown);
  createComments(post.comments);
  bigPicture.classList.remove('hidden');
};

bigPictureCloseBtn.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
});

export {showBigPictureModal};

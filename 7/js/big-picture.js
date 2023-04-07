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

const renderCommentsToList = (fullComments, openComments) => {
  if (openComments >= fullComments.comments.length) {
    commentsLoader.classList.add('hidden');
    openComments = fullComments.comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  for (let i = 0; i < openComments; i++) {
    const clone = socialCommentTemplate.cloneNode(true);
    clone.querySelector('.social__comment img').src = fullComments.comments[i].avatar;
    clone.querySelector('.social__comment img').alt = fullComments.comments[i].name;
    clone.querySelector('.social__comment p').textContent = fullComments.comments[i].message;
    socialCommentsList.append(clone);
  }
  socialCommentCount.textContent = `${openComments} из ${fullComments.comments.length} комментариев`;
  socialCommentCount.classList.remove('hidden');
  return socialCommentsList;
};

const createCommentElement = (comment) => {
  let commentsOpen = QUANTITY_COMMENTS;
  renderCommentsToList(comment, commentsOpen);

  commentsLoader.addEventListener('click', () => {
    commentsOpen += QUANTITY_COMMENTS;
    socialCommentsList.innerHTML = '';
    renderCommentsToList(comment, commentsOpen);
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
  createCommentElement(post);
  socialCommentsList.append(...post.comments.map(createCommentElement));
  bigPicture.classList.remove('hidden');
};

bigPictureCloseBtn.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
});

export {showBigPictureModal};

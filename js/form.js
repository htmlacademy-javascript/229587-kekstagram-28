const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_AMOUNT = 5;
const MAX_COMMENTS_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

const createHashtagArray = (value) => value.trim().toLowerCase().split(' ').filter((item) => item);

const checkIsHashtagFirstSymbol = (value) => createHashtagArray(value).every((item) => /^#/.test(item));

const checkIsHashtagRegexp = (hashtags) => {
  if (!hashtags) {
    return true;
  }
  const hashtagArray = createHashtagArray(hashtags);
  return hashtagArray.every((hashtag) => HASHTAG_REGEXP.test(hashtag));
};

const checkHashtagSame = (hashtags) => {
  const hashtagArray = createHashtagArray(hashtags);
  return new Set(hashtagArray).size === hashtagArray.length;
};

const checkHashtagLength = (hashtags) => {
  const hashtagArray = createHashtagArray(hashtags);
  return hashtagArray.length <= MAX_HASHTAG_AMOUNT;
};

const isValidComment = (comment) => comment.length <= MAX_COMMENTS_LENGTH;

pristine.addValidator(hashtagField, checkIsHashtagFirstSymbol, 'Неверный хэштег! Хэштег должен содержать символ # в начале');
pristine.addValidator(hashtagField, checkIsHashtagRegexp, 'Хэштеги должны быть разделены пробелами');
pristine.addValidator(hashtagField, checkHashtagSame, 'Вы уже используете данный хештег. Хештеги не должны повторятся');
pristine.addValidator(hashtagField, checkHashtagLength, `Нельзя указать больше ${MAX_HASHTAG_AMOUNT} хэш-тегов`);
pristine.addValidator(textDescription, isValidComment, `Длинна комментария превышает допустимое количество символов - ${MAX_COMMENTS_LENGTH}`);

const validateForm = () => pristine.validate();
const resetPristine = () => pristine.reset();

export { validateForm, resetPristine };

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;

const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;

const COMMENT_COUNT = 25;

const DESCRIPTIONS = [
  'Котов много не бывает',
  'Кекстаграмный обед',
  'Фото с мого путешествия',
  'На концерте',
  'Выбрались на природу',
  'А чем вы занимаетесь в выходные?',
  'Спорт - это жизнь',
];

const NAMES = [
  'Дашуля',
  'Женя',
  'Света',
  'Иван',
  'Тёма',
  'Миша',
  'Наташа',
  'Витя',
  'Михаил',
  'Юля',
  'Маша',
  'Антон',
  'Алексей',
  'Дима',
  'Андрей',
  'Ульяна',
  'Костя',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// функция для генерации случайного числа. Взята из учебного проекта.
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

function getIdNumber() {
  let lastCountNumber = 0;
  return function () {
    lastCountNumber += 1;
    return lastCountNumber;
  };
}

const postId = getIdNumber();
const photoId = getIdNumber();
const commentsId = getIdNumber();

const createComments = () => ({
  id: commentsId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const createPost = () => ({
  id: postId(),
  url: `photos/${photoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
  comments: Array.from({length: getRandomInteger(1, COMMENT_COUNT)}, createComments),
});

const listPost = Array.from({length: PICTURE_COUNT}, createPost);

// console.log(listPost);
listPost();

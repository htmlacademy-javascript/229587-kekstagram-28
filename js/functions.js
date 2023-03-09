// Функция для проверки длины строки.

const isStringLess = (string, length) => string.length <= length;

isStringLess('Проверка', 10);


// Функция для проверки, является ли строка палиндромом

const isPalidrom = (word) => {
  const preparedWord = word.toLowerCase().replaceAll(' ', '');

  let rewersWord = '';
  for (let i = preparedWord.length - 1; i >= 0; i--) {
    rewersWord += preparedWord.at(i);
  }

  return preparedWord === rewersWord;

};

isPalidrom('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

const extractNumber = (string) => {
  let number = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (!Number.isNaN(parseFloat(string.at(i)))) {
      number += string.at(i);
    }
  }
  return parseFloat(number);
};

extractNumber('1 кефир, 0.5 батона');

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.

const completeString = (string, number, addition) => {
  if (string.length >= number) {
    return string;
  }

  let result = string;
  while (result.length < number) {
    const fullLength = result.length + addition.length;
    if (fullLength <= number) {
      result = addition + result;
    } else {
      result = addition.slice(0, number - fullLength) + result;
    }
  }
  return result;
};

completeString('1', 2, '0');

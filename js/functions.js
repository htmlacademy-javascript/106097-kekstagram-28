// Функция для проверки длины строки.

const checkLength = (string, length) => string.length <= length;

checkLength('проверяемая строка', 20);
checkLength('проверяемая строка', 18);
checkLength('проверяемая строка', 10);

// Функция для проверки, является ли строка палиндромом.
function isPalindrom (string) {
  string = string.toLowerCase();
  string = string.replace(/\s+/g, '');
  for (let i = 0; i < string.length; i++) {
    if (string.at(i) !== string.at(-i - 1)) {
      return false;
    }
  }
  return true;
}

isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
function extractNumbers (string) {
  string = string.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }

  return parseInt(result, 10);

}

extractNumbers('2023 год');
extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона');
extractNumbers('а я томат');
extractNumbers(2023);
extractNumbers(-1);
extractNumbers(1.5);

// Функция, которая возвращает исходную строку, дополненную указанными символами до заданной длины.
function addSymbols (string, minLength, symbols) {
  if (string.length >= minLength) {
    return string;
  }

  while (string.length < minLength) {
    if ((symbols + string).length > minLength) {
      const cut = minLength - string.length;
      symbols = symbols.slice(0, cut);
    }
    string = symbols + string;
  }

  return string;
}

addSymbols('1', 2, '0');
addSymbols('1', 4, '0');
addSymbols('q', 4, 'werty');
addSymbols('q', 4, 'we');
addSymbols('qwerty', 4, '0');

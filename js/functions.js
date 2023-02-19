// Функция для проверки длины строки.

function checkLength (string, length) {
  return string.length <= length;
}

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

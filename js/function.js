// Task 1

const checkStringLength = (string, length) => string.length <= length;

checkStringLength('Hello', 5);
checkStringLength('HelloKeks', 10);
checkStringLength('Hello', 7);

// Task 2

const isPalindrome = (string) => {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    newString += normalizeString.at(i);
  }

  return newString === normalizeString;

};

isPalindrome('Топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл');

// Task 3

const returnNumber = (input) => {
  let newString = '';

  if (!isNaN(input)) {
    input = input.toString();
  }

  for (let i = 0; i <= input.length - 1; i++) {
    const symbol = parseInt(input[i], 10);

    if (!isNaN(symbol)) {
      newString += symbol;
    }
  }
  return parseInt(newString, 10);
};

returnNumber('2023');


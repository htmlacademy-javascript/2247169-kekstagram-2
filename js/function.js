// Task 1

function checkStringLength(string, number) {
  if (string.length <= number) {
    return true;
  } else {
    return false;
  }
}

checkStringLength('Hello', 5);
checkStringLength('HelloKeks', 10);
checkStringLength('Hello', 7);

// Task 2

function isPalindrome(string) {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    newString += normalizeString.at(i);
  }

  if (newString === normalizeString) {
    return true;
  } else {
    return false;
  }
}

isPalindrome('Топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл');

// Task 3

function returnNumber(string) {
  let newString = '';

  if (!isNaN(string)) {
    string = string.toString();
  }

  for (let i = 0; i <= string.length - 1; i++) {
    const symbol = parseInt(string[i], 10);

    if (!isNaN(symbol)) {
      newString += symbol;
    }
  }
  return parseInt(newString, 10);
}

returnNumber('2023 год');


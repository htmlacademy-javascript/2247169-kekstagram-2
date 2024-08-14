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

const meetingDuration = (startWorkDay, endWorkDay, startMeeting, durationMeeting) => {
  const startWork = startWorkDay.split(':').map(Number);
  const startWorkMinutes = startWork[0] * 60 + startWork[1];
  const endWork = endWorkDay.split(':').map(Number);
  const endWorkMinutes = endWork[0] * 60 + endWork[1];
  const startMeet = startMeeting.split(':').map(Number);
  const startMeetMinutes = startMeet[0] * 60 + startMeet[1];

  const durationMeetingMinutes = startMeetMinutes + durationMeeting;

  return startMeetMinutes >= startWorkMinutes && durationMeetingMinutes <= endWorkMinutes;
};

meetingDuration('8:30', '17:30', '9:00', 90);

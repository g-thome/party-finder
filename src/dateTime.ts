import SimpleDate from './interfaces/SimpleDate';
import Time from './interfaces/Time';

function getDate(dateTime: string) {
  return dateTime.split('/')[0];
}

function getMonth(dateTime: string) {
  return dateTime.split('/')[1];
}

function getHours(dateTime: string) {
  return dateTime.split(/h|\:/)[0];
}

function getMinutes(dateTime: string) {
  return dateTime.split(/h|\:/)[1];
}

function isValidDay(day: number, month: number) {
  if (day === 0 || day > 31) {
    return false;
  }

  if (month === 1 && day > 29) {
    return false;
  }

  if ((month % 2 !== 0) && day === 31) {
    return false;
  }

  const now = new Date();

  if (month < now.getMonth()) {
    return false;
  }

  if (day < now.getDate() && month === now.getMonth()) {
    return false;
  }

  return true;
}

function isValidTime(hours: number, minutes: number): boolean {
  const now = new Date();
  if (hours < now.getHours()) {
    return false;
  }

  if (hours === now.getHours() && minutes < now.getMinutes()) {
    return false;
  }

  return true;
}

function getTimeFromString(s: string): Time | null {
  const timeRegex = /(\s|^)\d{1,2}(h|:)\d{0,2}(\s|$)/;
  const timeList = s.match(timeRegex);

  if (!timeList) {
    return null;
  }

  const time = timeList[0];
  const hours = parseInt(getHours(time.toString()), 10);
  const minutes = (parseInt(getMinutes(time.toString()), 10) || 0);

  return { hours, minutes };
}

function getDateFromString(s: string): SimpleDate | null {
  const dateRegex = /(\s|^)\d{0,2}\/\d{0,2}(\s|$)/;
  const date = s.match(dateRegex);

  if (!date) {
    return null;
  }

  const day = parseInt(getDate(date.toString()), 10);
  const month = parseInt(getMonth(date.toString()), 10) - 1;

  if (month > 11) {
    return null;
  }

  if (!isValidDay(day, month)) {
    return null;
  }

  return { day, month };
}

function isValidDate(d: Date): boolean {
  const now = new Date();
  return d > now;
}

function getFormatedDate(d: Date): string {
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');

  return `${day}/${month} - ${hours}:${minutes}`;
}

export { isValidDay, isValidTime, isValidDate, getTimeFromString, getDateFromString, getFormatedDate };


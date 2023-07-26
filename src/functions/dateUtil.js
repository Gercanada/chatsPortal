import moment from 'moment';
import 'moment/dist/locale/es';
import 'moment/dist/locale/fr';
import 'moment/dist/locale/en-gb';

const format = 'DD MMM YYYY, hh:mm A';
const format2 = 'ddd DD MMM YYYY, hh:mm A Z';

const getLocale = () => {
  const localeStorage = localStorage.getItem('i18nextLng');
  if (localeStorage === 'en') return 'en-gb';
  if (localeStorage === 'es') return 'es';
  if (localeStorage === 'fr') return 'fr';
  return 'en-gb';
};

moment.locale(getLocale());

export function mapDate(object) {
  try {
    return moment(object).format(format);
  } catch (error) {
    console.error('mapDate: ', error.message);
  }
  return '';
}

export function mapDatefromUtcToLocalTime(object) {
  try {
    return moment(object).format(format2);
  } catch (error) {
    console.error('mapDate: ', error.message);
  }
  return '';
}

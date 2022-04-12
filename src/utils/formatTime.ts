import { format, getTime, formatDistanceToNow } from 'date-fns';
import id from 'date-fns/locale/id';

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number) {
  return format(new Date(date), 'dd MMMM yyyy', { locale: id });
}

export function fDateTime(date: Date | string | number) {
  return format(new Date(date), 'dd MMM yyyy p', { locale: id });
}

export function fTimestamp(date: Date | string | number) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p', { locale: id });
}

export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

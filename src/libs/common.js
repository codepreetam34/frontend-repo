import { useLocation } from 'react-router';
import moment from 'moment';
import { downloadFile } from '../api/files';

export function deepCloneObject(object = {}) {
  const stringifiedobject = JSON.stringify(object);
  return JSON.parse(stringifiedobject);
}

export function redirectTo(history, location, query) {
  let redirect = location;
  if (query) {
    redirect = `${location}?${query}`;
  }
  history.push(redirect);
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function stringEllipisis(string = '', limit = 100) {
  if (string && string.length > limit) {
    return `${string.substr(0, limit)} ...`;
  }
  return string;
}

export function subscriptionDateFormat(
  date,
  checkKey,
  defaultKey = 'freeTrial',
  dateFormat = 'MM-DD-YYYY',
) {
  if (defaultKey === checkKey) {
    return moment(date).utcOffset(0).format(dateFormat);
  }
  return moment(date).format(dateFormat);
}

export const getByImagesByIds = async (ids) => {
  const request = [];
  const responses = [];
  ids.map((id) => request.push(
    downloadFile({ download: [id] }).then((res) => {
      const data = res.body.files;
      responses.push({ fileUrl: data[0].url, id });
    }),
  ));
  await Promise.all(request);
  return responses;
};

export function capitalizeFirstLetter(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
  deepCloneObject,
  redirectTo,
  useQuery,
  getByImagesByIds,
};

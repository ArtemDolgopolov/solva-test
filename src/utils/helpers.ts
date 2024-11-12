import { toast } from 'react-toastify';
import { RedirectProps } from '../types';

export function formatDisplayedName(email: string) {
  const slicedEmail = email.split('@');
  const [prefix, postfix] = slicedEmail as string[];
  let formattedPrefix;
  if (prefix.length > 6) {
    formattedPrefix = `${prefix.slice(0, 2)}`;
  } else {
    const asteriskRepeatTimes = prefix.length - 1;
    formattedPrefix = `${prefix.slice(0, 1)}${'*'.repeat(asteriskRepeatTimes)}`;
  }
  return `${formattedPrefix}***@${postfix}`;
}

export function isRedirectionRequired({
  isUserSignIn,
  isReversedDirection
}: RedirectProps) {
  const value =
    (isUserSignIn && !isReversedDirection) ||
    (!isUserSignIn && isReversedDirection);
  return value;
}

export function formatEndpointLink(value: string) {
  let url = 'not connected';
  try {
    const { hostname } = new URL(value);
    url = hostname;
  } catch {
    return false;
  } finally {
    return url;
  }
}

export function emitNotification(
  type: 'success' | 'warn' | 'error',
  message: string
) {
  return toast[type](message, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  });
}

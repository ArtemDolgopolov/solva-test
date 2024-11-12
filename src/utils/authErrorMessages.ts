import { FirebaseError } from 'firebase/app';

export function transformAuthErrorMessage(message: string) {
  const index = message.indexOf('/') + 1;
  const slicedMessage = message.slice(index);
  const uppercaseMessage = `${slicedMessage
    .slice(0, 1)
    .toUpperCase()}${slicedMessage.slice(1)}`;
  const formattedMessage = uppercaseMessage.split('-').join(' ');
  return formattedMessage;
}

export function isUserInputAuthError(error: FirebaseError, included: string) {
  return error.code.includes(included);
}
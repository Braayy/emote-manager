import { delay, getEmoteIds, getToken, getUserId } from './util.js';
import { ERROR, INFO, notify } from './notification.js'
import { updateProgressBar, clearProgressBar } from './progressbar.js';

const REQUEST_DELAY = 200;

const UPDATE_EMOTE_URL = 'https://api.betterttv.net/3/emotes/{emoteId}/shared/{userId}'
const LIST_EMOTES_URL = 'https://api.betterttv.net/3/users/{userId}?limited=false';

const ADD_EMOTE = 'PUT';
const REMOVE_EMOTE = 'DELETE';

async function update(action, emoteIds = getEmoteIds()) {
  const token = getToken();

  if (!token) {
    throw 'Empty token! Click the \'?\' button to get help';
  }

  if (emoteIds.some((emoteId) => !emoteId)) {
    throw 'Some emote urls are invalid!';
  }

  const userId = getUserId(token);

  const updateUrlWithUserId = UPDATE_EMOTE_URL.replace('{userId}', userId);

  let updatedEmotes = 0;

  for (const emoteId of emoteIds) {
    const updateUrlReady = updateUrlWithUserId.replace('{emoteId}', emoteId);

    const response = await fetch(updateUrlReady, {
      method: action,
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    });

    if (response.status !== 204) {
      throw new Error(`Wrong response received!\nExpected: 204 No Content\nReceived: ${response.status} ${response.statusText}`);
    }

    updatedEmotes++;

    updateProgressBar(updatedEmotes / emoteIds.length);

    await delay(REQUEST_DELAY);
  }

  clearProgressBar();
}

async function getUserEmotes() {
  const token = getToken();

  if (!token) {
    throw 'Empty token! Click the \'?\' button to get help';
  }

  const userId = getUserId(token);

  const listEmotesReady = LIST_EMOTES_URL.replace('{userId}', userId);

  const response = await fetch(listEmotesReady);
  const responseJson = await response.json();

  return responseJson.sharedEmotes;
}

export function addEmotes() {
  update(ADD_EMOTE)
    .then(() => {
      notify('All listed emotes were added!', INFO);
    })
    .catch((err) => {
      if (typeof err === 'string') {
        notify(err, ERROR);
      } else {
        notify('An error occurred while removing the emotes!', ERROR);
      }

      console.error(err);
    })
}

export function removeEmotes() {
  update(REMOVE_EMOTE)
    .then(() => {
      notify('All listed emotes were removed!', INFO);
    })
    .catch((err) => {
      if (typeof err === 'string') {
        notify(err, ERROR);
      } else {
        notify('An error occurred while removing the emotes!', ERROR);
      }

      console.error(err);
    })
}

export function resetEmotes() {
  async function reset() {
    const emotes = await getUserEmotes();
    const emoteIds = emotes.map((emote) => emote.id);

    await update(REMOVE_EMOTE, emoteIds);
  }

  reset()
    .then(() => {
      notify('All emotes were removed', INFO);
    })
    .catch((err) => {
      if (typeof err === 'string') {
        notify(err, ERROR);
      } else {
        notify('An error occurred while removing the emotes!', ERROR);
      }

      console.error(err);
    });
}

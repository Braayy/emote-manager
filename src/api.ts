import { delay, getUserId } from './util';

const UPDATE_EMOTE_URL = 'https://api.betterttv.net/3/emotes/{emoteId}/shared/{userId}'
const LIST_EMOTES_URL = 'https://api.betterttv.net/3/users/{userId}?limited=false';
const REQUEST_DELAY = 500;

export enum UpdateAction {
  ADD = 'PUT',
  REMOVE = 'DELETE'
}

export async function updateEmotes(action: UpdateAction, token: string, emoteIds: string[], onEach: () => void) {
  const userId = getUserId(token);
  const updateUrl = UPDATE_EMOTE_URL.replace('{userId}', userId);

  for (const emoteId of emoteIds) {
    const finalUrl = updateUrl.replace('{emoteId}', emoteId);

    const response = await fetch(finalUrl, {
      method: action,
      headers: new Headers({
        'Authorization': `Bearer ${ token }`
      })
    });

    if (response.status !== 204) {
      throw `Received status ${response.status} instead of 204`;
    }

    onEach();

    await delay(REQUEST_DELAY);
  }
}

export async function getUserEmotes(token: string): Promise<string[]> {
  const userId = getUserId(token);
  const listUrl = LIST_EMOTES_URL.replace('{userId}', userId);

  const response = await fetch(listUrl);
  const responseJson = await response.json();

  return responseJson.sharedEmotes.map((emote) => emote.id);
}

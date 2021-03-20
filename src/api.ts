import { delay, getUserId } from './util';
import { Level, notify } from './notification';

const UPDATE_EMOTE_URL = 'https://api.betterttv.net/3/emotes/{emoteId}/shared/{userId}'
const LIST_EMOTES_URL = 'https://api.betterttv.net/3/users/{userId}?limited=false';

export enum UpdateAction {
  ADD = 'PUT',
  REMOVE = 'DELETE'
}

export async function updateEmotes(action: UpdateAction, token: string, emoteIds: string[]) {
  const userId = getUserId(token);
  const updateUrl = UPDATE_EMOTE_URL.replace('{userId}', userId);

  for (const emoteId of emoteIds) {
    const finalUrl = updateUrl.replace('{emoteId}', emoteId);

    try {
      const response = await fetch(finalUrl, {
        method: action,
        headers: new Headers({
          'Authorization': `Bearer ${ token }`
        })
      });

      if (response.status !== 204) {
        notify('Something went wrong! See console', Level.ERROR);

        console.error(`Received status ${response.status} instead of 204`);

        return;
      }

      await delay(200);
    } catch (error) {
      notify('Something went wrong! See console', Level.ERROR);

      console.error(error);

      return;
    }
  }
}

export async function getUserEmotes(token: string): Promise<string[]> {
  const userId = getUserId(token);
  const listUrl = LIST_EMOTES_URL.replace('{userId}', userId);

  const response = await fetch(listUrl);
  const responseJson = await response.json();

  return responseJson.sharedEmotes;
}

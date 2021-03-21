import { setUpdating, store } from '../store';
import { UpdateAction, updateEmotes } from '../api';
import { getEmoteIds, validateToken } from '../util';
import { Level, notify } from '../notification';
import { clearProgressBar, updateProgressBar } from '../progressbar';

export async function add() {
  if (!validateToken(store.token)) {
    notify('Invalid Token', Level.ERROR);

    return;
  }

  const emoteIds = getEmoteIds();

  if (emoteIds.length === 0) {
    notify('Emote list is empty or everything is invalid', Level.ERROR);

    return;
  }

  if (emoteIds.some((emoteId) => !emoteId)) {
    notify('There are invalid emote ids', Level.ERROR);

    return;
  }

  setUpdating(true);

  let updatedEmotesCount = 0;

  await updateEmotes(UpdateAction.ADD, store.token, emoteIds, () => {
    updatedEmotesCount++;
    
    updateProgressBar(updatedEmotesCount / emoteIds.length);
  });

  notify('All listed emotes were added!', Level.INFO);

  setUpdating(false);

  clearProgressBar();
}

import { setUpdating, store } from '../store';
import { getUserEmotes, UpdateAction, updateEmotes } from '../api';
import { validateToken } from '../util';
import { Level, notify } from '../notification';
import { clearProgressBar, updateProgressBar } from '../progressbar';

export async function reset() {
  if (!validateToken(store.token)) {
    notify('Invalid Token', Level.ERROR);

    return;
  }

  const emoteIds = await getUserEmotes(store.token);

  setUpdating(true);

  let updatedEmotesCount = 0;

  await updateEmotes(UpdateAction.REMOVE, store.token, emoteIds, () => {
    updatedEmotesCount++;
    
    updateProgressBar(updatedEmotesCount / emoteIds.length);
  });

  notify('All YOUR emotes were removed!', Level.INFO);

  setUpdating(false);

  clearProgressBar();
}

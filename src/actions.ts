import { Level, notify } from './notification';
import { getEmoteIds, validateToken } from './util';
import { UpdateAction, updateEmotes, getUserEmotes } from './api';
import { updateProgressBar, clearProgressBar } from './progressbar';

function handleError(err: any) {
  notify('Something went wrong! See console', Level.ERROR);

  console.error(err);
}

function update(action: UpdateAction , token: string, options: { readyMessage: string, validate: boolean }) {
  const emoteIds = getEmoteIds();

  if (options.validate) {
    // Validate token
    if (!validateToken(token)) {
      notify('Invalid Token', Level.ERROR);

      return;
    }

    // Validate emote ids
    if (emoteIds.length > 0 && emoteIds.some((emoteId) => !emoteId)) {
      notify('There are invalid emote urls', Level.ERROR);

      return;
    }
  }

  let updatedEmotesCount = 0

  updateEmotes(action, token, emoteIds, () => {
    // Executed when each emote has been updated
    // Used to update the progress bar
    updatedEmotesCount++;
    
    updateProgressBar(updatedEmotesCount / emoteIds.length);
  }).then(() => {
    // Executed when all emotes have been updated

    notify(options.readyMessage, Level.INFO);
    clearProgressBar();
  }).catch(handleError);
}

export function add(token: string) {
  update(UpdateAction.ADD, token, {
    readyMessage: 'All listed emotes were added!',
    validate: true
  });
}

export function remove(token: string) {
  update(UpdateAction.REMOVE, token, {
    readyMessage: 'All listed emotes were removed!',
    validate: true
  });
}

export function reset(token: string) {
  if (!validateToken(token)) return;

  getUserEmotes(token).then((emoteIds) => {
      console.log({ emoteIds });

      update(UpdateAction.REMOVE, token, {
        readyMessage: 'All YOUR emotes were removed',
        validate: false
      });
    }).catch(handleError);
}


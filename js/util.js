const emoteUrlRegex = /https:\/\/betterttv.com\/emotes\/(.+)/;

export function getUserId(token) {
  const jwtParts = token.split('\.');
  const jwtPayloadEncoded = jwtParts[1];
  const jwtPayloadJsonString = atob(jwtPayloadEncoded);
  const jwtPayload = JSON.parse(jwtPayloadJsonString);

  return jwtPayload.id;
}

export function getEmoteIds() {
  const emoteUrlsElement = document.querySelector('.emote-list__textarea');
  const emoteUrls = emoteUrlsElement.value.split('\n');

  return emoteUrls.map((emoteUrl) => {
    const match = emoteUrl.match(emoteUrlRegex);

    return match ? match[1] : null;
  });
}

export async function delay(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

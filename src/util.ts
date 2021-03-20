const emoteUrlRegex = /https:\/\/betterttv.com\/emotes\/([a-z0-9]+)/;

export function getUserId(token: string): string {
  const jwtParts = token.split('\.');
  const jwtPayloadEncoded = jwtParts[1];
  const jwtPayloadJsonString = atob(jwtPayloadEncoded);
  const jwtPayload = JSON.parse(jwtPayloadJsonString);

  return jwtPayload.id;
}

export function getEmoteIds(): string[] {
  const emoteUrlsElement: HTMLTextAreaElement = document.querySelector('.manager-form__emote-list');
  const emoteUrls = emoteUrlsElement.value.split('\n');

  return emoteUrls.map((emoteUrl) => {
    const match = emoteUrl.match(emoteUrlRegex);

    return match ? match[1] : null;
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

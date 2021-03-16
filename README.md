# Emote Manager

A easy way to manage emotes in large scale.

Using vanilla javascript and the BetterTTV API this application can add or remove a bunch of emotes at once.

## Warning
Before using this app, make sure to **BE CAREFUL** with your token!!

BetterTTV does not provide a official way to interact with it!

So pasting your token here is necessary!

Your token means a authorization to make private things on your account(like adding or removing emotes).

**If you are not careful with it, it could lead to someone getting it and you can be HACKED!**

This app is safe to use because it is protected by Github's Certificate(no one between you and BetterTTV API can see anything) and everything happens on the Client Side!

After you pasted the token on the Token field, immediately copy something else to avoid wrong paste in other places!

**As soon as the BetterTTV makes someway of interacting with it officially i will update this**

## How to use
1. Go to [Better Twitch TV Official Website](https://betterttv.com/).
2. Log in if not already.
3. Open the devtools. `Generally Ctrl + Shift + I`.
4. Go to `Console`.
5. Type `localStorage.getItem('USER_TOKEN')` on it.
6. Copy the text below it. `It starts with "ey" and make sure to not copy the quotes around it`
7. Paste the text on the `Token` field.
8. Paste all emote links on the big box bellow the `Token` field separated.
9. Click on `Add` or `Remove`.

### To reset the emotes(remove all of them)
1. Put the token on the `Token` field.
2. Click `Reset`.

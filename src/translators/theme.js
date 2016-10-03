import SublimeTheme from './SublimeTheme';

function getThemeObject(text) {
  if (text.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    console.log("got a textmate/sublime theme");
    return new SublimeTheme(text);
  }
  // insert ATOM here!
  return null;
}

export default function theme(text) {
  return getThemeObject(text);
}
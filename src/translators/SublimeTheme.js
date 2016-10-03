import plist from 'plist';

export default class SublimeTheme {
  constructor(text) {
    this.skeleton = Object.freeze({
      name: null,
      uuid: null,
      semanticClass: null,
      colorSpaceName: null,
      author: null,
      settings: [],
      gutterSettings: {}
    });

    // translate it automatically
    this.originalText = text;
    this.content = {
      colors: [],
      meta: {}
    };
    this.unpack();
  }

  unpack() {
    const obj = plist.parse(this.originalText);
    
    const colors = [], meta = {
      name: obj.name,
      semanticClass: obj.semanticClass,
      uuid: obj.uuid,
      colorSpaceName: obj.colorSpaceName,
      author: obj.author
    };
    
    // gutter settings
    for (let _key in obj.gutterSettings) {
      let key = `gutterSettings.${_key}`;
      let color = {
        name: key,
        color: obj.gutterSettings[_key]
      };
      colors.push(color);
    }

    // color settings
    for (let c of obj.settings) {
      // general settings
      if (Object.keys(c).length === 1 && 'settings' in c) {
        for (let _key in c.settings) {
          const key = `generalSettings.${_key}`;
          const color = {
            name: key,
            color: c.settings[_key]
          };
          colors.push(color);
        }
        continue;
      }

      // normal color
      const color = {
        name: c.name,
        scope: c.scope,
        foreground: c.settings.foreground,
        background: c.settings.background,
        styles: {
          bold: false,
          italic: false,
          underline: false
        }
      };

      if ('fontStyle' in c.settings && c.settings.fontStyle) {
        let split = c.settings.fontStyle.trim().split(" ");
        console.log(split);
        if (split.includes("bold")) color.styles.bold = true;
        if (split.includes("italic")) color.styles.italic = true;
        if (split.includes("underline")) color.styles.underline = true;
      }

      colors.push(color);
    }

    this.obj = obj;
    this.content.meta = meta;
    this.content.colors = colors;
  }

  pack() {
    // pack meta
    const obj = Object.assign({}, this.skeleton, this.content.meta);
    const settings = [];
    const innerSettings = {};

    for (let c of this.content.colors) {
      // gutter settings
      if (c.name.starsWith("gutterSettings")) {
        const key = c.name.replace("gutterSettings.", "");
        obj.gutterSettings[key] = c.color;
      }
      // "general" settings
      else if (c.name.startsWith("settings.")) {
        const key = c.name.replace("settings.", "");
        innerSettings[key] = c.color;
      }
      // normal setting
      else {
        const setting = {};
        setting.settings = {};
        if (c.name) setting.name = c.name;
        if (c.scope) setting.scope = c.scope;
        for (let key in c) {
          const stng = c[key];
          if ((key === 'foreground' || key === 'background') && stng !== null) {
            setting[key] = stng;
          }
          else if (key === 'styles') {
            const fontStyle = Object.keys(stng).reduce((prev, style) => {
              if (stng[style] === true) {
                return prev + " " + style;
              }
              else {
                return prev;
              }
            }, "");
            setting.settings.fontStyles = fontStyle;
          }
        }
        settings.push(setting);
      }
    }

    // add settings obj to beginning of settings arr
    settings.unshift(innerSettings);
    obj.settings = settings;

    // finally, transform back into plist format
    const xml = plist.build(obj);
    return xml;
  }
}
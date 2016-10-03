import React, { Component } from 'react';

import theme from './ThemeTranslator';

export class LiveThemeEditor extends Component {
  constructor(props) {
    super(props);
    this.readFile = this.readFile.bind(this);
  }

  readFile(blob, event) {
    // FileReader is a browser API
    const reader = new FileReader();
    reader.onload = (text) => {
      const myTheme = theme(text);
      this.setState({
        theme: myTheme
      });
    };
    reader.readAsText(blob);
  }

  saveFile() {
    console.log('saving file...');
    this.state.theme.save();
  }

  componentWillUpdate(nextProps, nextState) {
    // save after 2 second timer
    this.saveTimer = setTimeout(() => {
      this.saveFile();
    }, 2000);
  }

  render() {
    return (
      <div>
        <FileSelector readFile={ this.props.readFile } />
        <ThemeEditor theme={ this.state.theme } />
      </div>
    )
  }
}
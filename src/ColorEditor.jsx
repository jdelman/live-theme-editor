import React, { Component } from 'react';

export class ColorEditor extends Component {
  constructor(props) {
    super(props);

    this.selectColor = this.selectColor.bind(this);
    this.setColorValue = this.setColorValue.bind(this);
    this.handleMetaChange = this.handleMetaChange.bind(this);

    this.propsToState(props);
    this.validColorTypes = ["foreground", "background", "color"];
  }

  componentWillMount() {
    let editingColor = null;
    const colorTypes = this.getColorTypes();
    if (colorTypes.length !== 0) {
      editingColor = colorTypes[0];
    }
    this.setState({
      editingColor: editingColor;
    });
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps);
  }

  propsToState(props) {
    this.setState(props);
  }

  getColorTypes() {
    return this.validColorTypes.filter(colorType => {
      return (colorType in this.state && this.state[colorType] !== null);
    });
  }

  selectColor(colorType) {
    this.setState({
      editingColor: colorType;
    });
  }

  setColorValue(value) {
    if (this.state.editingColor) {
      this.setState({
        [this.state.editingColor]: value
      });
    }
  }

  handleMetaChange(name, event) {
    this.setState({
      [name]: event.target.value
    });
  }

  renderColorBlocks() {
    return (
      <div className="coloreditor-blocks">
        {this.validColorTypes.map(key => {
          if (key in this.state) {
            let className = `coloreditor-${key}`;
            if (this.state.editingColor === key) className += " active";
            return (
              <div
                key={ key }
                className={ className }
                onClick={ this.selectColor.bind(null, key) }>
                { this.state[key] }
              </div>
            );
          }
        })}
      </div>
    )
  }

  renderColorMetas() {
    return (
      <div className="coloreditor-metas">
        <input type="text" defaultValue={ this.props.name } onChange={ this.handleMetaChange.bind(null, "name") } />
        <input type="text" defaultValue={ this.props.scope } onChange={ this.handleMetaChange.bind(null, "scope") } />
      </div>
    );
  }

  render() {
    return (
      <div className="coloreditor">
        { this.renderColorBlocks() }
        { this.renderColorMetas() }
        <ColorSliders
          value={ this.state[this.state.editingColor] }
          editingColor={ this.state.editingColor }
          setColorValue={ this.setColorValue }
        />
      </div>
    )
  }
}
var hexView = require('./hexView.js');

ReactDOM.render(
  <hexView.HexContainer articleArray={word_db}/>, document.getElementById('container')
);
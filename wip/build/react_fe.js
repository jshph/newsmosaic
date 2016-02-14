var MAX_HEX_IN_ROW = 7;
var FONT_MAXSIZE = 12;

var Hexagon = React.createClass({
  displayName: 'Hexagon',

  componentDidMount() {},
  renderWords($kw) {
    var wordlist = this.props.keywords;
    $kw = $($kw);

    wordlist.forEach(function (word, index) {
      var line = document.createElement('p');
      var fontSize = FONT_MAXSIZE - Math.abs(Math.floor(wordlist.length / 2) - index) * 3;

      $(line).text(word);
      $(line).css('font-size', fontSize + 'pt');
      $kw.append($(line));
    });

    function rotateWords() {
      var $pChildren = $kw.children('p');

      var first = $pChildren.first();
      var tmp = first.clone();

      var firstRemoved = false;
      $pChildren.each(function (index, word) {
        $(word).animate({
          marginTop: -FONT_MAXSIZE / 2.5 + 'pt',
          fontSize: FONT_MAXSIZE - Math.abs(Math.floor(wordlist.length / 2) - index + 1) * 3.5 + 'pt'
        }, 1000, function () {
          if (!firstRemoved) {
            first.remove();
            $kw.append(tmp);
            rotateWords();
            firstRemoved = true;
          }
          $(word).css({ 'margin-top': '0pt' });
        });
      });
    }
    rotateWords();
  },
  render() {
    var hexClasses = "hex" + (this.props.even ? " even" : "");
    return React.createElement(
      'div',
      { className: hexClasses },
      React.createElement('div', { className: 'left' }),
      React.createElement('div', { className: 'middle' }),
      React.createElement('div', { className: 'middle middle-shade' }),
      React.createElement('div', { className: 'right' }),
      React.createElement('div', { className: 'keywords', ref: this.renderWords })
    );
  }
});

var HexRow = React.createClass({
  displayName: 'HexRow',

  render() {
    var even = true;
    var row = this.props.articleRowAry.map(function (article) {
      if (even) {
        even = false;
        return React.createElement(Hexagon, { even: true, keywords: article.wordchoice });
      } else {
        even = true;
        return React.createElement(Hexagon, { even: false, keywords: article.wordchoice });
      }
    });
    return React.createElement(
      'div',
      null,
      row
    );
  }
});

var HexContainer = React.createClass({
  displayName: 'HexContainer',

  render() {
    var aAry = this.props.articleArray;
    var rowAry = [];
    for (var row = 0; row < Math.floor(aAry.length / MAX_HEX_IN_ROW); row++) {
      rowAry.push(React.createElement(HexRow, { articleRowAry: aAry.slice(0, MAX_HEX_IN_ROW) || aAry.slice(0) }));
      aAry.splice(0, MAX_HEX_IN_ROW);
    }
    console.log(rowAry);
    return React.createElement(
      'div',
      null,
      rowAry
    );
  }
});

console.log(word_db);

ReactDOM.render(React.createElement(HexContainer, { articleArray: word_db }), document.getElementById('container'));
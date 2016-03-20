(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MAX_HEX_IN_ROW = 7;

var Hexagon = React.createClass({displayName: "Hexagon",
  componentDidMount() {
    var $jqobj = $(React.findDOMNode(this));
    this.setState({
      x: $jqobj.offset().left,
      y: $jqobj.offset().top
    });
  },
  renderWords($kw) {
    var wordlist = (function fillWrap(array) {
      if (array.length < 5)
        array.push(array.slice(0, 5 - array.length))
      else if (array.length > 5)
        array.splice(5)
      return array;
    })(this.props.keywords)
    $kw = $($kw);
    wordlist.forEach(function(word, index) {
        var line = document.createElement('p');
        var wrapper = document.createElement('div');
        $(line).appendTo($(wrapper));
        wrapper.style.animationDelay = -0.6 * index + "s";
        $(line).text(word); 
        $kw.append($(wrapper));
    });
    return $kw

  },
  handleClick() {
    if (!this.state.zoomed) {
      console.log(this.state.x);
      $('#shifter').css({
        'transform':'scale(4) translate(-' + Number(this.state.x - 70) + 'px,-' + this.state.y + 'px)',
        'opacity':0
      });
      this.setState({zoomed: true});
    } else {
      $('#shifter').css({
        'transform':'',
        'opacity':1
      });
      this.setState({zoomed: false});
    }
  },
	render() {
    var hexClasses = "hex" + (this.props.even ? " even" : "");
    return (
      React.createElement("div", {className: hexClasses, ref: "hexEl", onClick: this.handleClick}, 
        React.createElement("div", {className: "left"}), 
        React.createElement("div", {className: "middle"}), 
        React.createElement("div", {className: "right"}), 
        React.createElement("div", {className: "keywords", ref: this.renderWords})
      )
    )
	}
})

var HexRow = React.createClass({displayName: "HexRow",
  render() {
    var even = true;
    var row = this.props.articleRowAry.map(function(article) {
      if (even) {
        even = false;
        return ( React.createElement(Hexagon, {even: true, keywords: article.wordchoice}))
      } else {
        even = true;
        return ( React.createElement(Hexagon, {even: false, keywords: article.wordchoice}))
      }
    })
    return (React.createElement("div", {className: "hex-row"}, row));
  }
})

var HexContainer = React.createClass({displayName: "HexContainer",
  render() {
    var aAry = this.props.articleArray;
    var rowAry = [] 
    for (var row = 0; row < 3; row++) {
      rowAry.push(React.createElement(HexRow, {articleRowAry:  aAry.slice(0, MAX_HEX_IN_ROW) || aAry.slice(0)}) );
      aAry.splice(0, MAX_HEX_IN_ROW);
    }
    console.log(rowAry);
    return (React.createElement("div", null, rowAry));
  }
})

module.exports.Hexagon = Hexagon;
module.exports.HexRow = HexRow;
module.exports.HexContainer = HexContainer;

},{}],2:[function(require,module,exports){
var hexView = require('./hexView.js');

ReactDOM.render(
  React.createElement(hexView.HexContainer, {articleArray: word_db}), document.getElementById('container')
);

},{"./hexView.js":1}]},{},[2]);

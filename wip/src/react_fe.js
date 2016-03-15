// absolute positioning function that moves some text element based on its vertical position.
// position is mapped to a parametric curve.
// timing function that interacts with the absolute positioning function to move in intervals
// scaling text element according to position on the absolute position
// does react take care of element removal efficiently, or should element wrap-around be manually moved rather than remove/append?

var MAX_HEX_IN_ROW = 7;
var FONT_MAXSIZE = 12;

var Hexagon = React.createClass({
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
  },
	render() {
    var hexClasses = "hex" + (this.props.even ? " even" : "");
		return (
      <div className={hexClasses}>
        <div className="left"></div>
        <div className="middle"></div>
        <div className="right"></div>
        <div className="keywords" ref={this.renderWords}></div>
      </div>
    )
	}
})

var HexRow = React.createClass({
  render() {
    var even = true;
    var row = this.props.articleRowAry.map(function(article) {
      if (even) {
        even = false;
        return ( <Hexagon even={true} keywords={article.wordchoice}/>)
      } else {
        even = true;
        return ( <Hexagon even={false} keywords={article.wordchoice}/>)
      }
    })
    return (<div>{row}</div>);
  }
})

var HexContainer = React.createClass({
  render() {
    var aAry = this.props.articleArray;
    var rowAry = [] 
    for (var row = 0; row < Math.floor(aAry.length / MAX_HEX_IN_ROW); row++) {
      rowAry.push(<HexRow articleRowAry={ aAry.slice(0, MAX_HEX_IN_ROW) || aAry.slice(0) } /> );
      aAry.splice(0, MAX_HEX_IN_ROW);
    }
    console.log(rowAry);
    return (<div>{rowAry}</div>);
  }
})

console.log(word_db);

ReactDOM.render(
  <HexContainer articleArray={word_db}/>, document.getElementById('container')
  );


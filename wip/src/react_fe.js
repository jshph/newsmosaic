var MAX_HEX_IN_ROW = 7;
var FONT_MAXSIZE = 12;

var Hexagon = React.createClass({
  componentDidMount() {
  },
  renderWords($kw) {
    var wordlist = this.props.keywords;
    $kw = $($kw);

    wordlist.forEach(function(word, index) {
        var line = document.createElement('p');
        var fontSize = FONT_MAXSIZE - Math.abs(Math.floor(wordlist.length/2) - index) * 3;

        $(line).text(word);
        $(line).css('font-size', fontSize + 'pt');
        $kw.append($(line));
    });

    function rotateWords() {
        var $pChildren = $kw.children('p');

        var first = $pChildren.first();
        var tmp = first.clone()

        var firstRemoved = false;
        $pChildren.each(function(index, word) {
            $(word).animate({
                marginTop: - FONT_MAXSIZE/2.5 + 'pt',
                fontSize: FONT_MAXSIZE - Math.abs(Math.floor(wordlist.length/2) - index + 1) * 3.5 + 'pt'
            }, 1000, function() {
                if (!firstRemoved) {
                    first.remove();
                    $kw.append(tmp);
                    rotateWords();
                    firstRemoved = true;
                }
                $(word).css({'margin-top': '0pt'});
            });
        });
    }
    rotateWords();
  },
	render() {
    var hexClasses = "hex" + (this.props.even ? " even" : "");
		return (
      <div className={hexClasses}>
        <div className="left"></div>
        <div className="middle"></div>
        <div className="middle middle-shade"></div>
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


MAX_HEX_IN_ROW = 7;

var Hexagon = React.createClass({
  componentWillMount() {
    this.renderWords();
  },
  renderWords: function() {
    var wordList = this.props.keywords;
    this.props.$kw = $(document.createElement('div'));
    $kw = this.props.$kw;
    $kw.addClass('keywords');

    wordlist.forEach(function(word, index) {
        var line = document.createElement('p');
        var fontSize = FONT_MAXSIZE - Math.abs(Math.floor(wordlist.length/2) - index) * 3;

        $(line).text(word);
        $(line).css('font-size', fontSize + 'pt');
        $kw.append($(line));
        this.setState();
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
                    this.setState();
                    rotateWords();
                    firstRemoved = true;
                }
                $(word).css({'margin-top': '0pt'});
            });
        });
    }
    rotateWords();
  },
	render: function() {
    this.props.$kw = $(document.createElement('div'));
    $kw.addClass('keywords');
		return (
      <div class="hex">
        <div class="left"></div>
        <div class="middle"></div>
        <div class="middle middle-shade"></div>
        <div class="right"></div>
        {{this.props.$kw}}
      </div>
    )
	}
})

var HexRow = React.createClass({
  render: function() {
    var row = this.props.articleRowAry.map(function(article) {
        return ( <Hexagon keywords=article.wordchoice/>)
    })
    return (row);
  }
})

var HexContainer = React.createClass({
  render: function() {
    var aAry = this.props.articleArray;
    var rowAry = []
    for (var row = 0; row < Math.floor(aAry / MAX_HEX_IN_ROW); row++) {
      rowAry.push(<HexRow articleRowAry=( aAry.slice(0, MAX_HEX_IN_ROW) || aAry.slice(0) ) /> );
      aAry.splice(0, MAX_HEX_IN_ROW);
    }
    return (rowAry);
  }
})


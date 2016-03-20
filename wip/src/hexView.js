var MAX_HEX_IN_ROW = 7;

var Hexagon = React.createClass({
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
        'transform':'scale(4) translate(' + Number(582 - this.state.x - 85) + 'px,' + Number(316 - this.state.y - 82) + 'px)',
        'opacity': 0
      });
      this.setState({zoomed: true});
    } else {
      $('#shifter').css({
        'transform':'',
        'opacity': 1
      });
      this.setState({zoomed: false});
    }
  },
	render() {
    var hexClasses = "hex" + (this.props.even ? " even" : "");
    return (
      <div className={hexClasses} ref="hexEl" onClick={this.handleClick}>
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
    return (<div className="hex-row">{row}</div>);
  }
})

var HexContainer = React.createClass({
  render() {
    var aAry = this.props.articleArray;
    var rowAry = [] 
    for (var row = 0; row < 3; row++) {
      rowAry.push(<HexRow articleRowAry={ aAry.slice(0, MAX_HEX_IN_ROW) || aAry.slice(0) } /> );
      aAry.splice(0, MAX_HEX_IN_ROW);
    }
    console.log(rowAry);
    return (<div>{rowAry}</div>);
  }
})

module.exports.Hexagon = Hexagon;
module.exports.HexRow = HexRow;
module.exports.HexContainer = HexContainer;
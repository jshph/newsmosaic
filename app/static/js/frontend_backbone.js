/** @jsx React.DOM */

// OTHER FRAMEWORK STUFF, NOT PART OF MVC //

/*var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}*/

var BackboneMixin = {
    componentDidMount: function () {
        // Whenever there may be a change in the Backbone data, trigger a
        // reconcile.
        this.getBackboneCollections().forEach(function (collection) {
            // explicitly bind `null` to `forceUpdate`, as it demands a callback and
            // React validates that it's a function. `collection` events passes
            // additional arguments that are not functions
            collection.on('add remove change', this.forceUpdate.bind(this, null));
        }, this);
    },

    componentWillUnmount: function () {
        // Ensure that we clean up any dangling references when the component is
        // destroyed.
        this.getBackboneCollections().forEach(function (collection) {
            collection.off(null, null, this);
        }, this);
    }
};

React.Backbone = {
  listenToProps: function(props) {
    _.each(this.updateOnProps, function(events, propName) {
      switch(events) {
      case 'collection': 
        events = 'add remove reset sort';
        break;
      case 'model':
        events = 'change';
      }
      this.listenTo(props['model'], events, function() { this.forceUpdate(); })
    }, this)
  },
 
  componentDidMount: function() {
    this.listenToProps(this.props);
  },
 
  componentWillReceiveProps: function(nextProps) {
    this.stopListening();
    this.listenToProps(nextProps);
  },
 
  componentWillUnmount: function() {
    this.stopListening();
  }
}
 
_.extend(React.Backbone, Backbone.Events);

// END FRAMEWORK //

var ContentContainer = Backbone.Model.extend({
    tagName: 'div',
    url: '/request',
    initialize: function() {
        this.fetch({
            success: function(data) {
                kwgCollection = new KWGCollection(
                    $.map(data.attributes, function(item){return item;}), // convert JSON to Array
                    {parse: true}
                );

                React.renderComponent(
                    <KWGCont model={kwgCollection}/>
                , document.getElementById('keywordCont'));
            },
            failed: function() {
                console.log('failed to fetch original data!');
            }
        })

    }
});


var KWGroup = Backbone.Model.extend({
    tagName: 'div',
    initialize: function() {
        this.rotateWords();
    },
    parse: function(data_quad) {
        data_quad.displayedWord = data_quad.wordchoice[0];
        return data_quad;
    },
    rotateWords: function() {
        var index = 0;
        window.setInterval(function() {
            this.set({displayedWord: this.get("wordchoice")[index]});
            index === 10 ? index = 0 : index++;
<<<<<<< HEAD
        }.bind(this), 400);
    },
    genKeywordString: function(wordchoice) {
        return _.reduce(wordchoice, function(keywordString, keyword) {
            console.log(keywordString);
            return keywordString += " " + keyword;
        });
=======
        }.bind(this), 200);
>>>>>>> parent of 3d9e52a... hover to expand list of keywords done (in backbone/react)
    }
});

var KWGCollection = Backbone.Collection.extend({
    model: KWGroup,
    initialize: function() {
    }
});

var ArticlePane = Backbone.Model.extend({

});

var KWGView = React.createClass({
    mixins: [React.Backbone],
    updateOnProps: { 'item': 'model' },
    render: function() {
        return (
<<<<<<< HEAD
        <div onMouseEnter={this.initRegisterHover} onMouseLeave={this.cancelHover} className={this.props.model.get('kwgClasses') || 'kwgContainer'} >
            <span className="kwgRotating">
                {this.props.model.get('displayedWord')}
            </span>
            <span className="kwgHover">
                {this.props.model.get('keywordCat') || 'null'}
            </span>
=======
        <div className="kwgview">
            {this.props.model.get('displayedWord')}
>>>>>>> parent of 3d9e52a... hover to expand list of keywords done (in backbone/react)
        </div>
        );
    }
});

var KWGCont = React.createClass({
    mixins: [React.Backbone],
    updateOnProps: { 'items': 'collection' },
    render: function() {
        var keynum = 0;
        var kwgCollection = this.props.model;
        var kwgc_view = kwgCollection.map(function(kwg) {
            keynum++;
            return (
                <KWGView key={keynum} model={kwg}/>
            );
        });
        return (
            <p>
            {kwgc_view}
            </p>
        );
    }
});
 
/*
var KWGColView = new Backbone.CollectionView({
    el: $('#keywordCont'),
    selectable: true,
    collection: KWGCollection
    modelView: KWGView

})*/

var contentContainer = new ContentContainer();
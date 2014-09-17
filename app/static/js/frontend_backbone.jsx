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
      this.listenTo(props[propName], events, function() { this.forceUpdate(); })
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
    },
    parse: function(data_quad) {
        wordchoice = data_quad.wordchoice;
        displayedWord = wordchoice[0]; // for test
        corpus = data_quad.corpus;
        return data_quad;
    },
});

var KWGCollection = Backbone.Collection.extend({
    model: KWGroup,
    initialize: function() {
    }
});

var ArticlePane = Backbone.Model.extend({

});

var KWGView = React.createClass({
    /*mixins: [BackboneMixin],
    getBackboneCollections: function () {
        return [this.props.kwgCollection]
    },*/
    /*componentDidMount: function() {
        this.props.model.on('change', function() {
            this.forceUpdate(callback);
        }).bind(this);
    },*/
    render: function() {
        return (
        <div className="kwgview">
            {this.props.model.get('corpus')}
        </div>
        );
    }
});

var KWGCont = React.createClass({
    render: function() {
        var kwgCollection = this.props.model;
        var kwgc_view = kwgCollection.map(function(kwg) {
            return (
                <KWGView model={kwg}/>
            );
        });
        return (
            {kwgc_view}
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
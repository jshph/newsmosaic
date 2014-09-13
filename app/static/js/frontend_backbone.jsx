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

// END FRAMEWORK //

var ContentContainer = Backbone.Model.extend({
    tagName: 'div',
    url: '/request',
    initialize: function() {
        this.fetch({
            success: function(data) {
                console.log('HttpClient');
                kwgCollection = new KWGCollection(
                    $.map(data.attributes, function(item){return item;}), // convert JSON to Array
                    {parse: true}
                );
                //NEED ASYNC; TO FIX
                React.renderComponent(
                    <p>hello</p>
                    <KWGView model={kwgCollection}/>
                , $('#keywordCont'));

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
        console.log(wordchoice)
        corpus = data_quad.corpus;
        return data_quad;
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
    mixins: [BackboneMixin],
    getBackboneCollections: function () {
        return [this.props.]
    }
    componentDidMount: function() {
        this.props.model.on('change', function() {
            this.forceUpdate(callback);
        }).bind(this);
    },
    render: function() {
        return (
        <div className="kwgview"><span>
            {this.props.model.get('displayedWord')}
        </span></div>
        );
    }
})
 
/*
var KWGColView = new Backbone.CollectionView({
    el: $('#keywordCont'),
    selectable: true,
    collection: KWGCollection
    modelView: KWGView

})*/

console.log('hi');
var contentContainer = new ContentContainer();
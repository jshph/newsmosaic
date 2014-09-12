var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

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
            },
            failed: function() {
                console.log('failed to fetch original data!');
            }
        })
    },
    render: function() {

    },
    defaults: {
    },
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

var contentContainer = new ContentContainer();
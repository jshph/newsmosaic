$(document).ready(function() {


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

var data

var request = new HttpClient();
request.get('/request', function(data) {
    append(JSON.parse(data));
});

function append(data) {
    var prev_active;
    var refreshfactor = 1;
    for (var i = 0; i < 10; i++) {
        data.forEach(function(data_quad) {
            var keywordGroup = document.createElement('span');
            console.log(data_quad);
            $(keywordGroup).addClass('keyword_group');



            var keywordGroupCont = document.createElement('div');
            $(keywordGroupCont).addClass('keyw_setWidth').append($(keywordGroup));
            $('#keywordCont').append($(keywordGroupCont));

            //$(keywordGroup).text(data_quad.wordchoice[0]);

            var articleBody = document.createElement('div');
            $(articleBody).addClass('bodyPane panel')
                        .html('<h4 style="text-align:center">' + data_quad.title + '</h4>' +
                            '<p>' + data_quad.corpus + '</p>');

            $(keywordGroupCont).click(function() {
                $(prev_active).removeClass('keywg_active');
                $('.bodyPane').remove();
                $(this).addClass('keywg_active');
                $(articleBody).insertAfter($(this));
                setTimeout(function(){$(articleBody).removeClass('hidden');}, 90)
                prev_active = this;
            });

            var index = 0;
            window.setInterval(function() {
                $(keywordGroup).text(data_quad.wordchoice[index]);
                if (index < 12) index++;
                else index = 0;
            }, (refreshfactor === 5 ? refreshfactor = 1 : refreshfactor += 1 )*600)
        });
    }

}


});
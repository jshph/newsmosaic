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

var data;

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
            $(keywordGroup).addClass('keyword_group');



            var keywordGroupCont = document.createElement('div');
            $(keywordGroupCont).addClass('keyw_setWidth').append($(keywordGroup));
            $('#keywordCont').append($(keywordGroupCont));

            //$(keywordGroup).text(data_quad.wordchoice[0]);

            var articleBody = document.createElement('div');
            $(articleBody).addClass('bodyPane panel panel-default')
                        .html('<div><h4 style="text-align:center">' + data_quad.title + '</h4>' +
                            '<p>' + data_quad.corpus + '</p></div>');

            $(keywordGroupCont).click(function() {
                $(prev_active).removeClass('keywg_active');
                $('.bodyPane').remove();

                $(this).addClass('keywg_active');
                $(articleBody).insertAfter($(this));

                slide($(articleBody).children('div'));
                function slide(content) {
                  var wrapper = content.parent();
                  var contentHeight = content.outerHeight(true);
                  var wrapperHeight = wrapper.height();
                 
                  wrapper.toggleClass('open');
                  if (wrapper.hasClass('open')) {
                    setTimeout(function() {
                      wrapper.addClass('transition').css('height', contentHeight);
                    }, 10);
                  }
                  else {
                    setTimeout(function() {
                      wrapper.css('height', wrapperHeight);
                      setTimeout(function() {
                        wrapper.addClass('transition').css('height', 0);
                      }, 10);
                    }, 10);
                  }
                 
                  wrapper.one('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function() {
                    if(wrapper.hasClass('open')) {
                      wrapper.removeClass('transition').css('height', 'auto');
                    }
                  });
                }

                
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
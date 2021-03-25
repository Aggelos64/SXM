$( document ).ready(function() {
    var winViewer = $('#windows');
    var shareWin = $('#socialWindow');
    var reportWindow = $('#reportWindow');
    var successWindow = $('#successWindow');
    var failWindow = $('#failWindow');
    //Did this so they won't apear if js is disabled
    $(winViewer).hide();
    $(shareWin).hide();
    $(reportWindow).hide();
    $(successWindow).hide();
    $(failWindow).hide();

    $(winViewer).removeClass('d-none');
    $(shareWin).removeClass('d-none');
    $(reportWindow).removeClass('d-none');
    $(successWindow).removeClass('d-none');
    $(failWindow).removeClass('d-none');

    setShareLinks();

    $('#addFav').on('click', function(){
        
    })
    $('#report').on('click', function(){
        
    })
    $('#hide').on('click', function(){
        
    })
    $('#print').on('click', function(){
        window.print();
    })
    $('#share').on('click', function(){
        $(winViewer).fadeIn(500);
        $(shareWin).fadeIn(500);
    })
    $('.closebtn').on('click', function(){
        $(winViewer).fadeOut(500);
        $(shareWin).fadeOut(500);
    })
});

function socialWindow(url) {
    var left = (screen.width - 570) / 2;
    var top = (screen.height - 570) / 2;
    var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
    window.open(url, "NewWindow", params);
}

function setShareLinks() {
    var pageUrl = encodeURIComponent(document.URL);
    var tweet = encodeURIComponent($("meta[property='og:description']").attr("content"));
    $("#fb").on("click", function() {
        url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
        socialWindow(url);
    });
    $("#tw").on("click", function() {
        url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + tweet;
        socialWindow(url);
    });
}
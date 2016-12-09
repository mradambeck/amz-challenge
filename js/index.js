console.log("index.js called");

$( document ).ready( function(){
  console.log("document ready");

  var noteStorage = {};

  var noteCount = 0;

  var title = "Test title";

  function Note(title){
    this.content = "";
    this.title = title;
  }

  // Note creation
  $('#new-note').on('click', function(){

    // Generate a new Note, push to
    noteStorage['note-' + noteCount] = new Note(title);

    var listNote = $("<div class='col-100 note-select' data-note-count=" + noteCount + ">" + noteStorage['note-' + noteCount].title + "</div>");
    $('#notes-list').append(listNote);
    noteCount++;

    $('#note-selection').addClass('mobile-hide');
    $('#note-content').removeClass('mobile-hide');
    $('#note-content').data("note-count", noteCount);
    $('#highlighted-note-title > h2').text(title);
  });

  $('#note-selection').on('click', '.note-select', function(){
    console.log("Boom shaka laka");
  });

});

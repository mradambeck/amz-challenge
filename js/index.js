console.log("index.js called");

$( document ).ready( function(){
  console.log("document ready");

  var noteStorage = {};

  var noteCount = 0;

  var title = "Test title";

  function Note(title, count){
    this.content = "";
    this.title = title;
    this.count = count;
  }

  // Note creation
  $('#new-note').on('click', function(){

    // Generate a new Note, push to
    noteStorage['note-' + noteCount] = new Note((title + ": " + noteCount), noteCount);
    var thisNote = noteStorage['note-' + noteCount];

    // ERASE ME LATER
    noteStorage['note-' + noteCount].content = ("Yo duuuuuude " + noteCount);


    var listNote = $("<div class='col-100 note-select' data-note-count=" + thisNote.count + ">" + thisNote.title + "</div>");
    $('#notes-list').append(listNote);
    noteCount++;

    $('#note-selection').addClass('mobile-hide');
    $('#note-content').removeClass('mobile-hide');
    $('#note-content').data("note-count", thisNote.count);
    $('#highlighted-note-title > h2').text(thisNote.title);
  });

  $('#note-selection').on('click', '.note-select', function(){
    var noteID = $(this).data('note-count');
    var thisNote = noteStorage['note-' + noteID];
    $('#highlighted-note-title > h2').text(thisNote.title);
    $('#note-body > textarea').text(thisNote.content);
  });

});

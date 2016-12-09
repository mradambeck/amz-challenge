console.log("index.js called");

$( document ).ready( function(){
  console.log("document ready");

  var noteCount = 0,
      noteId = 300;


  function Note(title, count){
    this.content = "";
    this.title = title;
    this.count = count;
  }
  var noteStorage = {};

  function setFieldsToDisabled(bool){
    $('#note-body > textarea').prop("disabled", bool);
    $('button#delete-note').prop("disabled", bool);
    if (bool){
      $('button#delete-note').css('cursor','not-allowed');
      $('#note-body > textarea').css('cursor','not-allowed');
    } else {
      $('button#delete-note').css('cursor','pointer');
      $('#note-body > textarea').css('cursor','default');
    }
  }

  function switchMobileToView(page){
    if (page === "notepad"){
      $('#note-selection').addClass('mobile-hide');
      $('#note-content').removeClass('mobile-hide');
    } else {
      $('#note-selection').removeClass('mobile-hide');
      $('#note-content').addClass('mobile-hide');
    }
  }

  setFieldsToDisabled(true);

  // Note creation
  $('button#new-note').on('click', function(){

    setFieldsToDisabled(false);

    function createNote(){
      var title = prompt("Please name your note:");
      if (title === null){
        return false;
      }

      // Generate a new Note, push to
      noteStorage['note-' + noteCount] = new Note(title, noteCount);
      var thisNote = noteStorage['note-' + noteCount];

      var noteHtml = $("<div class='col-100 note-select' data-note-count=" + thisNote.count + ">" + thisNote.title + "</div>");
      $('#notes-list').append(noteHtml);
      noteCount++;

      // Switch views on mobile
      switchMobileToView("notepad");


      // Update note content
      $('#note-content').attr("data-current-note", thisNote.count);
      $('#note-body > textarea').val(thisNote.content);
      $('#highlighted-note-title > h2').text(thisNote.title);
    }

    createNote();

  });



  // Select existing note
  $('#note-selection').on('click', '.note-select', function(){
    setFieldsToDisabled(false);

    noteID = $(this).data('note-count');
    var thisNote = noteStorage['note-' + noteID];

    // Switch views on mobile
    $('#note-selection').addClass('mobile-hide');
    $('#note-content').removeClass('mobile-hide');

    // Update content
    $('#note-content').attr("data-current-note", thisNote.count);
    $('#highlighted-note-title > h2').text(thisNote.title);
    $('#note-body > textarea').val(thisNote.content);

    switchMobileToView("notepad");
  });



  // Update note content upon change
  $('#note-body > textarea').keyup(function(){
    var thisNoteId = $('#note-content').attr('data-current-note');
    var thisNote = noteStorage['note-' + thisNoteId];

    var updatedContent = $(this).val();
    thisNote.content = updatedContent;
  });



  // Delete a note
  $('button#delete-note').on('click', function(){

    var thisNoteId = $('#note-content').attr('data-current-note');
    var noteSelector = $('.note-select[data-note-count="' + thisNoteId + '"]');
    $('#highlighted-note-title > h2').text("");
    $('#note-body > textarea').val('');
    $(noteSelector).remove();

    delete noteStorage['note-' + thisNoteId];
    setFieldsToDisabled(true);
    switchMobileToView("note-select");
  });

  // (mobile) return to notes list
  $('button#back-button').on('click', function(){
    switchMobileToView("note-select");
  });

});

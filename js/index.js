$( document ).ready( function(){

  var noteCount = 0,
      noteID = 0;

  // Note class:
  function Note(title, count){
    this.content = "";
    this.title = title;
    this.count = count;
    this.color = "#000000";
  }
  // Object to save notes in:
  var noteStorage = {};


  // Disable fields when not available.
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

  // Changes views on mobile
  function switchMobileToView(page){
    if (page === "notepad"){
      $('#note-selection').addClass('mobile-hide');
      $('#note-content').removeClass('mobile-hide');
    } else {
      $('#note-selection').removeClass('mobile-hide');
      $('#note-content').addClass('mobile-hide');
    }
  }

  // Initial setup
  setFieldsToDisabled(true);


  // Create new Note
  $('button#new-note').on('click', function(){

    setFieldsToDisabled(false);

    function createNote(){
      var title = prompt("Please name your note:");
      if (title === null){
        return false;
      }

      // Generate a new Note, push to storage object:
      noteStorage['note-' + noteCount] = new Note(title, noteCount);
      var thisNote = noteStorage['note-' + noteCount];

      // Update UI:
      var noteHtml = $("<div class='col-100 note-select' data-note-count=" + thisNote.count + ">" + thisNote.title + "</div>");
      $('#notes-list').append(noteHtml);

      $('#note-content').attr("data-current-note", thisNote.count);
      $('#note-body > textarea').val(thisNote.content);
      $('#highlighted-note-title > h2').text(thisNote.title).css('color', thisNote.color);

      $('.color-btn').css('border', '1px solid grey');
      $('#note-body > textarea').css('color', thisNote.color).css('border-color', thisNote.color);

      switchMobileToView("notepad");

      return noteCount++;
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
    $('#highlighted-note-title > h2').text(thisNote.title).css('color', thisNote.color);
    $('#note-body > textarea').val(thisNote.content);

    // Update colors
    $('.color-btn').css('border', '1px solid grey');
    $('#note-body > textarea').css('color', thisNote.color).css('border-color', thisNote.color);
    var colorBtn = $('.color-btn[data-hex-code="' + thisNote.color + '"]');
    console.log(colorBtn);
    if (thisNote.color !== "#000000") { $(colorBtn).css('border', '2px solid black'); }

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


  // (Mobile only): return to notes list
  $('button#back-button').on('click', function(){
    switchMobileToView("note-select");
  });


  // Select color
  $('.color-btn').on('click', function(){
    var noteID = $('#note-content').attr('data-current-note');
    var thisNote = noteStorage['note-' + noteID];
    var thisNoteListing = $('.note-select[data-note-count="'+ noteID +'"]');

    function setColor(scope){
      var thisColor = $(scope).data('hex-code');

      // Reset other borders
      $('.color-btn').css('border', '1px solid grey');

      if ( thisColor === thisNote.color ){
        thisNote.color = "#000000";
      } else {
        thisNote.color = thisColor;
        $(scope).css('border', '2px solid black');
      }

      return thisNote.color;
    }

    $(thisNoteListing).css('color', setColor(this));
    $('#highlighted-note-title > h2').css('color', thisNote.color);
    $('#note-body > textarea').css('color', thisNote.color).css('border-color', thisNote.color).css();
  });

});

$( document ).ready( function(){

  var noteCount = 0,
      noteID = 0;

  // Note parent:
  function Note(title, count){
    this.content = "";
    this.title = title;
    this.count = count;
    this.color = "#000000";
  }

  var noteStorage = {}; // Object to save notes in


  // FUNCTIONS
  // Disable fields when not available.
  function setFieldsToDisabled(bool) {
    $('#note-body > textarea').prop("disabled", bool);
    $('button#delete-note').prop("disabled", bool);
    if (bool){
      $('button#delete-note').css('cursor','not-allowed');
      $('#note-body > textarea').css('cursor','not-allowed');
      $('.color-btn').css('cursor', 'not-allowed');
    } else {
      $('button#delete-note').css('cursor','pointer');
      $('#note-body > textarea').css('cursor','default');
      $('.color-btn').css('cursor', 'pointer');
    }
  }

  // Changes views on mobile
  function switchMobileToView(page) {
    if (page === "notepad"){
      $('#note-selection').addClass('mobile-hide');
      $('#note-content').removeClass('mobile-hide');
    } else {
      $('#note-selection').removeClass('mobile-hide');
      $('#note-content').addClass('mobile-hide');
    }
  }

  function updateColors(newColor) {
    $('#highlighted-note-title > h2').css('color', newColor);
    $('#note-body > textarea').css('color', newColor).css('border-color', newColor);
    $('.color-btn').css('border', '1px solid grey');

    if (newColor !== "#000000"){
      var colorBtn = $('.color-btn[data-hex-code="' + newColor + '"]');
      $(colorBtn).css('border', '2px solid black');
    }
  }

  // Initial setup
  setFieldsToDisabled(true);


  // WATCHERS
  // Create new Note
  $('button#new-note').on('click', function(){
    setFieldsToDisabled(false);

    // This is enclosed in a function so that we can return early if there's no title
    function createNote(){
      var title = prompt("Please name your note:");
      if (title === null){
        return false;
      }

      // Generate a new Note, push to storage object:
      noteStorage['note-' + noteCount] = new Note(title, noteCount);
      var thisNote = noteStorage['note-' + noteCount];

      // Update HTML/CSS:
      var noteHtml = $("<div class='col-100 note-select' data-note-count=" + thisNote.count + ">" + thisNote.title + "</div>");
      $('#notes-list').append(noteHtml);
      $('#note-content').attr("data-current-note", thisNote.count);
      $('#note-body > textarea').val(thisNote.content);
      $('#highlighted-note-title > h2').text(thisNote.title);

      updateColors(thisNote.color);
      switchMobileToView("notepad");

      noteCount++;
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

    $('.note-select').removeClass('active');
    $(this).addClass('active');

    updateColors(thisNote.color);
    switchMobileToView("notepad");
  });


  // Update Note.content upon change
  $('#note-body > textarea').keyup(function(){
    var thisNoteId = $('#note-content').attr('data-current-note');
    var thisNote = noteStorage['note-' + thisNoteId];

    var updatedContent = $(this).val();
    thisNote.content = updatedContent;
  });


  // Delete a note
  $('button#delete-note').on('click', function(){
    var okToDelete = confirm("Are you sure you want to delete this note?");
    if (okToDelete){
      var thisNoteId = $('#note-content').attr('data-current-note');
      var noteSelector = $('.note-select[data-note-count="' + thisNoteId + '"]');

      // Clear out UI
      $('#highlighted-note-title > h2').text("");
      $('#note-body > textarea').val('');
      $(noteSelector).remove();

      delete noteStorage['note-' + thisNoteId]; // Remove from noteStorage

      setFieldsToDisabled(true);
      updateColors("#000000");
      switchMobileToView("note-select");
    }

  });


  // Color selector
  $('.color-btn').on('click', function(){
    // Check if there's a note to update first
    var isDisabled = $('#note-body > textarea').prop("disabled");

    if (!isDisabled) {
      var noteID = $('#note-content').attr('data-current-note');
      var thisNote = noteStorage['note-' + noteID];
      var thisNoteListing = $('.note-select[data-note-count="'+ noteID +'"]');
      var thisColor = $(this).data('hex-code');

      if ( thisColor === thisNote.color ){
        thisNote.color = "#000000";
      } else {
        thisNote.color = thisColor;
      }

      $(thisNoteListing).css('color', thisNote.color);
      updateColors(thisNote.color);
    }
  });


  // (Mobile only): return to notes list
  $('button#back-button').on('click', function(){
    switchMobileToView("note-select");
  });

});

$(document).ready(function() {

  $("#id-enumerate-books").on("mouseover", ".book-entry", function() {
    $(this).children(".to-hide").removeClass("hidden");
  });

  $("#id-enumerate-books").on("mouseleave", ".book-entry", function() {
    $(this).children(".to-hide").addClass("hidden");
  });

  $("#id-enumerate-books").on("click", ".delete-book", function() {
    var bookid = $(this).parents(".book-entry").attr("data-bookid");
    $.ajax({
      type: "POST",
      url: "/_delete_book",
      data: {bookid: bookid},
      success: function(response){ 
        $("#id-enumerate-books").html(response.books_markup);
        $("#id-enumerate-authors").html(response.authors_markup); 
      },
      error: function(response){
        alert("Ошбика во время удаления книги");
      }
      });
    });

  $("#id-enumerate-books").on("click", ".edit-book", function() {
    $("#id-book-form-messages").hide();
    $("#id-book-form").attr("data-action", "edit")
    $("#id-input-book-id").val($(this).parents(".book-entry").attr("data-bookid"));

    var booktitle = $(this).parents(".book-entry").attr("data-booktitle");
    $("#id-input-book-name").val(booktitle);
    $("#id-title-book-form").html("Редактировать книгу \"" + booktitle + "\"");

    $("#id-input-book-authors").multiselect("deselectAll", false);
    $("#id-input-book-authors").multiselect("updateButtonText");

    var author_ids = $(this).parents(".book-entry").attr("data-bookauthors").split(",");

    $("#id-input-book-authors option").each(function() {
      var current_id = $(this).attr("value");
      if (author_ids.indexOf(current_id) > -1) {
        $(this).prop("selected", true);
      }
    });

    $("#id-input-book-authors").multiselect("refresh");

  });

  $("#id-add-book").on("click", function() {
    $("#id-book-form-messages").hide();
    $("#id-book-form").attr("data-action", "add")
    $("#id-input-book-id").val("");

    $("#id-input-book-name").val("");
    $("#id-title-book-form").html("Добавить книгу");

    $("#id-input-book-authors").multiselect("deselectAll", false);
    $("#id-input-book-authors").multiselect("updateButtonText");
  });
});

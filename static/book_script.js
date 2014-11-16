$(document).ready(function() {
  $("#id-book-form").on("submit", function(e) {
    e.preventDefault();
    var url;
    if ($(this).attr("data-action") === "add"){
      url = "/_add_book";
    }
    else{
      url = "/_edit_book";
    }
    $.ajax({
      type: "POST",
      url: url,
      data: $("#id-book-form").serialize(),
      success: function(response) {
        if (response.message.length > 0){
          $("#id-book-form-messages").fadeIn().html(response.message).delay(5000).fadeOut();
        }
        else{
          $("#id-input-book-name").val("");
          $("#id-enumerate-books").html(response.books_markup);
          $("#id-enumerate-authors").html(response.authors_markup); 
          $("#id-modal-book").modal("hide");
          location.reload()
        }
        
      },
      error: function(response) {
        alert("Ошибка во время сохранения книги");
      }
    });
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

  $("#id-enumerate-books").on("mouseover", ".book-entry", function() {
    $(this).children(".to-hide").slideDown(150);
  });

  $("#id-enumerate-books").on("mouseleave", ".book-entry", function() {
    $(this).children(".to-hide").slideUp(150);
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

  $("#id-enumerate-books, .author-books").on("click", ".edit-book", function() {
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

});

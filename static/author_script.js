$(document).ready(function() {

  $("#id-author-form").on("submit", function(e) {
    e.preventDefault();
    var url;
    var data_action = $(this).attr("data-action");
    if (data_action === "add") {
      url = "/_add_author";
    } else if (data_action === "edit") {
      url = "/_edit_author";
    } else if (data_action === "add_to_book") {
      url = "/_add_author";
    }
    
    $.ajax({
      type: "POST",
      url: url,
      data: $("#id-author-form").serialize(),
      success: function(response) {
        if (response.message.length > 0){
          $("#id-author-form-messages").fadeIn().html(response.message).delay(5000).fadeOut();
        }
        else{
          $("#id-input-author-name").val("");
          $("#id-enumerate-books").html(response.books_markup);
          $("#id-enumerate-authors").html(response.authors_markup); 
          $("#id-input-book-authors-wrapper").html(response.book_authors_choices_markup);
          if ( ! $("#id-add-several-authors").prop("checked")) {
            $("#id-modal-author").modal("hide");
          }
        }
      },
      error: function(response) {
        alert("Ошибка во время сохранения автора");
      }
    });
  });

  $("#id-add-author").on("click", function() {
    $("#id-author-form").attr("data-booktitle", "");
    $("#id-add-several-wrapper").show();
    $("#id-add-several-authors").prop("checked", false);

    $("#id-author-form").attr("data-action", "add");
    $("#id-input-author-id").val("");
    $("#id-input-author-name").val("");
    $("#id-title-author-form").html("Добавить автора");
  });


  $("#id-enumerate-authors").on("mouseover", ".author-entry", function() {
    $(this).children(".to-hide").slideDown(150);
  });

  $("#id-enumerate-authors").on("mouseleave", ".author-entry", function() {
    $(this).children(".to-hide").slideUp(150);
  });

  $("#id-enumerate-authors").on("click", ".delete-author", function() {
    var authorid = $(this).parents(".author-entry").attr("data-authorid");
    $.ajax({
      type: "POST",
      url: "/_delete_author",
      data: {authorid: authorid},
      success: function(response){ 
        $("#id-enumerate-books").html(response.books_markup);
        $("#id-enumerate-authors").html(response.authors_markup); 
      },
      error: function(response){
        alert("Ошибка во время удаления автора");
      }
    });
  });

  $("#id-enumerate-authors, #id-enumerate-books").on("click", ".edit-author", function() {
    $("#id-author-form").attr("data-booktitle", "");
    $("#id-add-several-wrapper").hide();
    $("#id-add-several-authors").prop("checked", false);

    $("#id-author-form").attr("data-action", "edit");
    $("#id-input-author-id").val($(this).parents(".author-entry").attr("data-authorid"));

    var authorname = $(this).parents(".author-entry").attr("data-authorname");
    $("#id-input-author-name").val(authorname);
    $("#id-title-author-form").html("Редактировать автора \"" + authorname + "\"");
  });

  $("#id-modal-author").on("shown.bs.modal", function() {
    $("#id-author-form-messages").hide();
  });


});

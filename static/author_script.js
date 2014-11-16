$(document).ready(function() {
  $("#id-author-form").on("submit", function(e) {
    e.preventDefault();
    var url;
    if ($(this).attr("data-action") === "add"){
      url = "/_add_author";
    }
    else{
      url = "/_edit_author";
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
          if ( ! $("#id-add-several-authors").prop("checked")) {
            location.reload();
          }
        }
      },
      error: function(response) {
        alert("Ошибка во время сохранения автора");
      }
    });
  });

  $("#id-add-author").on("click", function() {
    $("#id-add-several-wrapper").show();
    $("#id-add-several-authors").prop("checked", false);

    $("#id-author-form-messages").hide();
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

  $("#id-enumerate-authors, .book-authors").on("click", ".edit-author", function() {
    $("#id-add-several-wrapper").hide();
    $("#id-add-several-authors").prop("checked", false);

    $("#id-author-form-messages").hide();
    $("#id-author-form").attr("data-action", "edit")
    $("#id-input-author-id").val($(this).parents(".author-entry").attr("data-authorid"));

    var authorname = $(this).parents(".author-entry").attr("data-authorname");
    $("#id-input-author-name").val(authorname);
    $("#id-title-author-form").html("Редактировать автора \"" + authorname + "\"");
  });


});

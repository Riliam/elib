$(document).ready(function() {

    $(".lib-header").on("mouseover", function() {
      $(this).children(".to-hide").removeClass("hidden");
    });

    $(".lib-header").on("mouseleave", function() {
      $(this).children(".to-hide").addClass("hidden");
    });

  $("#id-messages").show().delay(5000).fadeOut();

  $("#id-search").on("keyup", function() {
    var search_query = $(this).val();
    $.ajax({
      type: "GET",
      url: "/_search",
      data: {search_query: search_query},
      success: function(response){
        $("#id-enumerate-books").html(response.books_markup);
        $("#id-enumerate-authors").html(response.authors_markup); 
      },
      error: function(response){
        alert("Search error");
      }      
    });
  });

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
        }
        
      },
      error: function(response) {
        alert("Ошибка во время сохранения книги");
      }
    });
  });


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
          location.reload();
        }
      },
      error: function(response) {
        alert("Ошибка во время сохранения автора");
      }
    });
  });

  $("#id-add-author-from-book-form").on("click", function() {
    $("#id-modal-book").modal("hide");
    $("#id-modal-author").modal("show");
  });

  $("#id-input-book-authors").multiselect({enableFiltering: true, nonSelectedText: "Выберите авторов"});





  $("#id-toggle-books-entries").on("click", function() {  
    $("#id-list-books-entries").removeClass("hidden col-md-offset-3").addClass("col-md-offset-3");
    $("#id-list-authors-entries").removeClass("hidden col-md-offset-3").addClass("hidden");

    $("#id-toggle-all-entries").parent().removeClass("active");
    $("#id-toggle-authors-entries").parent().removeClass("active");
    $("#id-toggle-books-entries").parent().addClass("active");
  
  });

  $("#id-toggle-authors-entries").on("click", function() {  

    $("#id-list-authors-entries").removeClass("hidden col-md-offset-3").addClass("col-md-offset-3");
    $("#id-list-books-entries").removeClass("hidden col-md-offset-3").addClass("hidden");

    $("#id-toggle-all-entries").parent().removeClass("active");
    $("#id-toggle-authors-entries").parent().addClass("active");
    $("#id-toggle-books-entries").parent().removeClass("active");
  
  });

  $("#id-toggle-all-entries").on("click", function() {  

    $("#id-list-authors-entries").removeClass("hidden col-md-offset-3");
    $("#id-list-books-entries").removeClass("hidden col-md-offset-3");

    $("#id-toggle-all-entries").parent().addClass("active");
    $("#id-toggle-authors-entries").parent().removeClass("active");
    $("#id-toggle-books-entries").parent().removeClass("active");
  
  });
});

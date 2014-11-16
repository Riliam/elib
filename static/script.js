$(document).ready(function() {

  $(".to-hide").hide();

  $("#id-author-form-messages").hide();
  $("#id-add-several-wrapper").hide();
  $("#id-add-several-authors").prop("checked", false);

  $("#id-book-form-messages").hide();

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

  $("#id-modal-author").on("hidden.bs.modal", function() {
    $("#id-author-form").removeAttr("data-action");
    $("#id-input-author-book-title").val("");
    $("#id-author-form").removeAttr("data-booktitle");
  });

  $("#id-modal-book").on("hidden.bs.modal", function() {
    
  });


  $("#id-input-book-authors").multiselect({enableFiltering: true, nonSelectedText: "Выберите авторов"});
});

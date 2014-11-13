$(document).ready(function() {

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

var Category = {
  items: [],
}

var Purchase = {
  purchaseTotalCost : function () {
    this.totalCost = this.dollarAmount * this.quantity;
  }
};

var currentCategory;
var categoriesArr = [];

$(document).ready(function(){
  
  $("#category-input").submit(function(event){
    event.preventDefault();
    newCategory = Object.create(Category);
    newCategory.name = $("#category").val();
    console.log(newCategory);
    currentCategory = newCategory.name;
    categoriesArr.push(newCategory);
    $("#category-list ul").append("<li class='clickable'>" + newCategory.name + "</li>");
    $("span#name-category").text(currentCategory);
    $("div#purchase-list td").empty();
    $("#category").val("");
  });

  $("#item-input").submit(function(event){
    event.preventDefault();
    newPurchase = Object.create(Purchase);
    newPurchase.description = $("#description").val();
    newPurchase.dollarAmount = $("#amount").val();
    newPurchase.quantity = $("#quantity").val();
    newPurchase.purchaseTotalCost();

    //goal for the following block: search the categories array, find the correct category based on category.name,
    //and push the purchase into the correct category's "items" array
    categoriesArr.forEach(function(category) {
      if (category.name === currentCategory){
        category.items.push(newPurchase)
      }
    })
    console.log(categoriesArr);

    $(".table tbody").append("<tr><td>" + newPurchase.description + "</td><td>$" + newPurchase.dollarAmount + "</td><td>" + newPurchase.quantity + "</td><td>$" + newPurchase.totalCost + "</td></tr>");
    $("input#description").val("");
    $("input#amount").val("");
    $("input#quantity").val("");
  });

  //In progress: old categories click event behaviors:
    // --set the current category
    // --search categoriesarray and find the match
    // --update purchase header
    // --populate purchaselist field with stored data

  $("div#category-list li.clickable").click(function() {
    alert("Yo!"); //listener not working =/
    currentCategory = $(); //need text from click event ("this" or this.val()?!)
    $("span#name-category").text(currentCategory);
    
    categoriesArr.forEach(function(category) {
      if (category.name === currentCategory) {
        category.items.forEach(function(item) {
          $(".table tbody").append("<tr><td>" + item.description + "</td><td>$" + item.dollarAmount + "</td><td>" + item.quantity + "</td><td>$" + item.totalCost + "</td></tr>");
        })
      }
    })
  });
});


//Two main bugs:
 // -- on new category creation, even though new category is pushed into new spot in categoryArr, it is inheriting purchase items! (conditional flaw in forEach loop??)
 // -- on new purchase creation, purchases are being pushed into ALL categories, not just current

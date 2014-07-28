var Category = {
  initialize : function (name) {
    this.items = [];
    this.name = name;
  }
};

var Purchase = {
  initialize : function (description, amount, quantity) {
    this.description = description;
    this.dollarAmount = amount;
    this.quantity = quantity;
    this.purchaseTotalCost();
  },
  purchaseTotalCost : function () {
    this.totalCost = this.dollarAmount * this.quantity;
  }
};



$(document).ready(function(){
var currentCategory;

  //CREATE A NEW CATEGORY
  $("#category-input").submit(function(event){
    event.preventDefault();
    var newCategory = Object.create(Category);
    newCategory.initialize($("#category").val());
    currentCategory = newCategory;

    $("#category-list ul").append("<li class='clickable'>" + currentCategory.name + "</li>");
    $("span#name-category").text(newCategory.name);
    $("div#purchase-list tbody").empty();
    $("#category").val("");

    // RECALL AN OLD CATEGORY
    $(".clickable").last().click(function(){
      currentCategory = newCategory;
      $("span#name-category").text(currentCategory.name);
      $("div#purchase-list tbody").empty();

      currentCategory.items.forEach(function(purchase) {
        $(".table tbody").append("<tr><td>" + purchase.description
          + "</td><td>$" + purchase.dollarAmount
          + "</td><td>" + purchase.quantity
          + "</td><td>$" + purchase.totalCost
          + "</td></tr>");
      });
    });
  });

  //ADD NEW PURCHASES
  $("#item-input").submit(function(event){
    event.preventDefault();
    var newPurchase = Object.create(Purchase);
    newPurchase.initialize($("#description").val(), $("#amount").val(), $("#quantity").val());
    // newPurchase.purchaseTotalCost();
    currentCategory.items.push(newPurchase);


    $(".table tbody").append("<tr><td>" + newPurchase.description + "</td><td>$" + newPurchase.dollarAmount + "</td><td>" + newPurchase.quantity + "</td><td>$" + newPurchase.totalCost + "</td></tr>");
    $("input#description").val("");
    $("input#amount").val("");
    $("input#quantity").val("");
  });
});

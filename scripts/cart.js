
  // var Item = Backbone.Model.extend({
  //   defaults :{
  //     title: '',
  //     price: ''
  //   }
  // });

  // var ItemCollection = Backbone.Collection.extend({
  //   model: Item,
  //   url: "https://api.parse.com/1/classes/Item",
  //   parse: function (response) {
  //     return response.results;
  //   }
  // });

  // var Order = Backbone.Model.extend({
  //   defaults: function(ats){
  //     ats = ats || {};
  //     return _.defaults(ats, {
  //       items: []
  //     });
  //   },

    // addItem: function(item){
    //   // 1. use item.toJSON since we need to turn a model into an object
    //   // that looks like '{name: "Food", price: 25}'
    //   // 2. use set + concat bc, if you were to just modify items in place
    //   // (e.g. using .push) it wouldn't fire a change event. .concat takes an
    //   // array and returns a new array of the 2 combined, so it will wire a change event
    //   this.set('items', this.get('items').concat([item.toJSON()]));
    // },

  //   totalPrice: function(){
  //     return this.get('items').reduce(function(acum, item) {
  //       return acum + item.price;
  //     }, 0);
  //   }
  // });

  // var OrderCollection = Backbone.Model.extend({
  //   model: Order,
  //   url: "https://api.parse.com/1/classes/Order",
  //   parse: function(response){
  //     return response.results;
  //   }
  // });

  // var items = new ItemCollection([{name: "Cool Food", price: 10.5}]);
  // var order = new Order();
  // order.addItem(items.at(0));
  // console.log(order.totalPrice());

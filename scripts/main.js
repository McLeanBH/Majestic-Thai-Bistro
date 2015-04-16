(function(){
  'use strict';

////////////////////////////////////////////////////////////////////////////////
//Framework: Model, Collections, Views (Pres/Interaction), Router (App State) //
////////////////////////////////////////////////////////////////////////////////

  var Menu = Backbone.Model.extend({
    idAttribute: 'objectId',
    defaults: function(opts){
      opts = opts || {};
      return _.defaults({
        item_title: 'default',
        item_description: 'default',
        item_price: 'default',
        item_type: 'default',
      });
    }
  });

  var Menus = Backbone.Collection.extend({
    model: Menu,
    url: "https://api.parse.com/1/classes/Menu_Items",
    parse: function(food) { return food.results; }
  });

  var MenuListView = Backbone.View.extend({
    el: '.menu',
    template: _.template($('[data-template-name="post-li"]').text()),
    events: {
      'click .post-li': 'showMenu'
    },

    render: function() {
      var that = this;
      this.collection.each(function(menu) {
        that.$el.append( that.template( menu.toJSON() ) );
      });
      return this;
    }
 });

 var MenuNewView = Backbone.View.extend({
   el: '#item-info',
   events: {
     'submit' : 'itemInfo'
   },

   itemInfo: function(e) {
     e.preventDefault();
     var itemTitle = this.$('.itemTitleInput').val();
     var itemDescription = this.$('.itemDescriptionInput').val();
     var itemPrice = this.$('.itemPriceInput').val();
     var itemCategory = this.$('.itemCategoryInput').val();

     this.collection.create({item_title: itemTitle, item_description: itemDescription, item_price: itemPrice, item_category: itemCategory});
     this.$('.itemTitleInput').val('');
     this.$('.itemDescriptionInput').val('');
     this.$('.itemPriceInput').val('');
     this.$('.itemCategoryInput').val('');
   }
 });

////////////////////////////////////////////////////////////////////////////////
/// CART/ORDER/ITEM (model, collection, instatiated) ///////////////////////////
////////////////////////////////////////////////////////////////////////////////

  //  var Item = Backbone.Model.extend({
  //    defaults: {
  //      title: '',
  //      price: ''
  //    }
  //  });
  //
  //  var ItemCollection = Backbone.Collection.extend({
  //    model: Item,
  //    url: "https://api.parse.com/1/classes/Item",
  //    parse: function (response) {
  //      return response.results;
  //    }
  //  });
  //
  //  var Order = Backbone.Model.extend({
  //    defaults: function(ats){
  //      ats = ats || {};
  //      return _.defaults(ats, {
  //        items: [ ]
  //      });
  //    },
   //
  //    addItem: function(item){
  //      this.set('items', this.get('items').concat([item.toJSON()]));
  //    },
   //
  //    totalPrice: function(){
  //      return this.get('items').reduce(function(acum, item) {
  //        return acum + item.price;
  //      }, 0);
  //    }
  //  });
   //
  //  var OrderCollection = Backbone.Model.extend({
  //    model: Order,
  //    url: "https://api.parse.com/1/classes/Order",
  //    parse: function(response){
  //      return response.results;
  //    }
  //  });
  //
  //  var items = new ItemCollection([{name: "Cool Food", price: 10.5}]);
  //  var order = new Order();
  //  // order.addItems(items.at(0));
  //  console.log(order.totalPrice());

////////////////////////////////////////////////////////////////////////////////
/// ROUTER (APP STATE) /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var AppRouter = Backbone.Router.extend ({
  routes: {
    '': 'index'
  },

  initialize: function() {
    this.menus = new Menus();
    this.menusList = new MenuListView({collection: this.menus});
  },

  index: function(){
    var that = this;
    this.menus.fetch().done(function() {
      that.menusList.render();
    });
  },
});

////////////////////////////////////////////////////////////////////////////////
/// CONFIGURATION //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

$.ajaxSetup ({
  headers: {
    "X-Parse-Application-Id": "3sSDwBGBkqjPYHuD6sv7RlG7B0hUPaDgqJzFVAmb",
    "X-Parse-REST-API-Key": "KGBI3JFmgSKKe0Z1SCU2X50OiuRGZ74xmMUzteqT"
  }
});

////////////////////////////////////////////////////////////////////////////////
/// GLUE CODE //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  $(document).ready(function(){
    window.router = new AppRouter();
    Backbone.history.start();
  });

})();


//////////////////////////////////////////////////////////////////////////////////////////////////////
/// BELOR IS THE NECESSARY (CORRECTED) BACKBONE FRAMEWORK FOR MAJESTIC THAI BISTRO////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//  (function(){
//   "use strict";

//   var Item = Backbone.Model.extend({
//     defaults: {
//       name: '',
//       category: '',
//       price: 0
//     }
//   });

//   var ItemCollection = Backbone.Collection.extend({
//     model: Item,
//     url: "https://api.parse.com/1/classes/Item",
//     parse: function(response){
//       return response.results;
//     },

//     getCategories: function(){
//       return _.uniq(this.pluck('category')).map(function(cat){
//         return {name: cat, slug: encodeURI(cat)};
//       });
//     }
//   });

//   var Order = Backbone.Model.extend({
//     defaults: function(attributes){
//       attributes = attributes || {};
//       return _.defaults(attributes, {
//         items: []
//       });
//     },

//     addItem: function(itemModel){
//       this.set('items', this.get('items').concat([itemModel.toJSON()]));
//     },

//     removeItem: function(item){
//       var matching = _.where(this.get('items'), item);
//       this.set('items', _.difference(this.get('items'), matching) );
//     },

//     totalPrice: function(){
//       return this.get('items').reduce(function(acum, item) {
//         return acum + item.price;
//       }, 0);
//     },

//     toJSON: function(){
//       return _.extend({
//         totalPrice: this.totalPrice()
//     }, this.attributes);
//   }
// });

//   var OrderCollection = Backbone.Model.extend({
//     model: Order,
//     url: "https://api.parse.com/1/classes/Order",
//     parse: function(response){
//       return response.results;
//     }
//   });

//   var CategoryView = Backbone.View.extend({
//     template: _.template($('#category-template').text()),

//     initialize: function(options){
//       options = options || {};
//       this.order = options.order;

//       this.listenTo(this.collection, 'reset', this.render);
//     },

//     render: function(){
//       // remove children to avoid zombie views
//       _.invoke(this.children, 'remove');

//       var category = this.collection.pluck('category')[0];

//       this.$el.html(this.template({category: category}));

//       var self = this;
//       this.children = this.collection.map(function(item){
//         var view = new ItemView({
//           model: item,
//           order: self.order
//         });
//         self.$('ul').append(view.render().el);
//         return view;
//       });

//       return this;
//     }
//   });

//   var ItemView = Backbone.View.extend({
//     tagName: 'li',
//     template: _.template($('#item-template').text()),

//     initialize: function(options){
//       options = options || {};
//       this.order = options.order;
//     },

//     events: {
//       'click .js-add': 'addItem'
//     },

//     addItem: function(){
//       this.order.addItem(this.model);
//     },

//     render: function(){
//       this.$el.html(this.template(this.model.toJSON()));
//       return this;
//     }
//   });

//   var OrderView = Backbone.View.extend({
//     template: _.template($('#order-template').text()),

//     initialize: function(){
//       this.listenTo(this.model, 'change', this.render);
//     },

//     render: function(){
//       // remove children to avoid zombie views
//       _.invoke(this.children, 'remove');

//       this.$el.html(this.template(this.model.toJSON()));

//       var self = this;
//       this.children = this.model.get('items').map(function(item){
//         var view = new OrderItemView({
//           order: self.model,
//           model: item
//         });
//         self.$('ul').append(view.render().el);
//         return view;
//       });

//       return this;
//     }
//   });

//   var OrderItemView = Backbone.View.extend({
//     tagName: 'li',
//     template: _.template($('#order-item-template').text()),

//     events: {
//       'click .js-remove': 'removeItem'
//     },

//     initialize: function(options){
//       options = options || {};
//       this.order = options.order;
//     },

//     removeItem: function(){
//       this.order.removeItem(this.model);
//     },

//     render: function(){
//       this.$el.html(this.template(this.model));
//       return this;
//     }
//   });

//   var NavView = Backbone.View.extend({
//     render: function(){
//       // remove children to avoid zombie views
//       _.invoke(this.children, 'remove');

//       var self = this;
//       this.children = this.collection.getCategories().map(function(category){
//         var view = new NavItemView({model: category});
//         self.$('ul').append(view.render().el);
//         return view;
//       });

//       return this;
//     }
//   });

//   var NavItemView = Backbone.View.extend({
//     tagName: 'li',
//     template: _.template($('#nav-item-template').text()),

//     render: function(){
//       this.$el.html(this.template(this.model));
//       return this;
//     }
//   });

//   var AppRouter = Backbone.Router.extend({
//     routes: {
//       '': 'index',
//       'category/:name': 'showCategory'
//     },

//     initialize: function(){
//       this.appModel = new Backbone.Model();

//       var self = this;
//       this.listenTo(this.appModel, 'change:selectedCategory', function(m, val){
//         self.selectedItems.reset( self.items.where({category: val}) );
//       });

//       this.order = new Order();

//       this.items = new ItemCollection([
//         {name: "Soup", price: 1, category: "Appetizers"},
//         {name: "Real Food", price: 20, category: "Entree Items"}
//       ]);

//       this.selectedItems = new ItemCollection();

//       this.categoryView = new CategoryView({
//         el: '.js-category-view',
//         collection: this.selectedItems,
//         order: this.order
//       });

//       this.orderView = new OrderView({
//         el: '.js-order-view',
//         model: this.order
//       });

//       this.navView = new NavView({
//         el: '.js-primary-nav',
//         collection: this.items
//       });

//       this.categoryView.render();
//       this.orderView.render();
//       this.navView.render();
//     },

//     index: function(){
//     },

//     showCategory: function(name){
//       this.appModel.set('selectedCategory', decodeURI(name));
//     }
//   });

//   $.ajaxSetup({
//     headers: {
//       "X-Parse-Application-Id": "3sSDwBGBkqjPYHuD6sv7RlG7B0hUPaDgqJzFVAmb",
//     "X-Parse-REST-API-Key": "KGBI3JFmgSKKe0Z1SCU2X50OiuRGZ74xmMUzteqT"
//     }
//   });

//   $(document).ready(function(){
//     window.router = new AppRouter();
//     Backbone.history.start();
//   });

//  })();
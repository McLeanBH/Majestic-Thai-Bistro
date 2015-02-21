(function(){
  'use strict';
  
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

    showMenu: function() {
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


 var MenuFullView = Backbone.View.extend({
   tagName: 'div',
   className: 'showMenu',
   template: _.template($('[data-template-name="showMenu"]').text()),
   render: function() {
     this.$el.append(this.template(this.model.toJSON()));
     return this;
   }
 });

var AppRouter = Backbone.Router.extend ({
  routes: {
    '': 'index',
    'showMenu/:id': 'showMenu'
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

$.ajaxSetup ({
  headers: {
    "X-Parse-Application-Id": "3sSDwBGBkqjPYHuD6sv7RlG7B0hUPaDgqJzFVAmb",
    "X-Parse-REST-API-Key": "KGBI3JFmgSKKe0Z1SCU2X50OiuRGZ74xmMUzteqT"
  }
});

  $(document).ready(function(){
    window.router = new AppRouter();
    Backbone.history.start();
  });

})();

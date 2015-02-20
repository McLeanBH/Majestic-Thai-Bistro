(function(){
  'use strict';

//------------------------
// MODELS & COLLECTIONS //
//------------------------

  var Menu = Backbone.Model.extend({
    idAttribute: 'objectId',
    defaults: function(attributes){
      attributes = attributes || {};
      return _.defaults(attributes, {
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

//------------------------
// VIEWS //
//------------------------

  var MenuListView = Backbone.View.extend({
    el: '.sidebar',
    template: _.template($('[data-template-name="post-li"]').text()),


    events: {
      'click .post-li': 'showFullPost'
    },

    showFullPost: function() {
    },

    render: function() {
      var that = this;
      this.collection.each(function(menu) {
        that.$el.append( that.template( post.toJSON() ) );
      });
      return this;
    }
 });


 var PostFullView = Backbone.View.extend({
   tagName: 'div',
   className: 'showPost',
   template: _.template($('[data-template-name="showPost"]').text()),
   render: function() {
     this.$el.append(this.template(this.model.toJSON()));
     return this;
   }
 });

//------------------------
// ROUTER //
//------------------------

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


  showMenu: function(id){
    var that = this;
    this.menus.fetch().done(function() {
      foundModel = that.menus.get(id);
      var menuFull = new MenuFullView({model: foundModel});
      menuFull.render();
      $('.full-post').html(menuFull.el);
    });
  }
});

//------------------------
// CONFIGURATION //
//------------------------

$.ajaxSetup ({
  headers: {
    "X-Parse-Application-Id": "YIAK0okVUTwf5uylx6nxDATgoA5mdAclhUfycbRe",
    "X-Parse-REST-API-Key": "3JVELiFs5rCa9TXmmPHE8jQrWKG4Sg2440UYxoMw"
  }
});

//------------------------
// GLUE CODE //
//------------------------

  $(document).ready(function(){
    window.router = new AppRouter();
    Backbone.history.start();
  });

})();



// //------------------------
// // VIEWS //
// //------------------------
//
//   var MenuListView = Backbone.View.extend({
//     el: '#item-info',
//     events: {
//       'submit': 'itemInfo'
//     },
//     itemInfo: function(e){
//       e.preventDefault();
//       var itemTitle = this.$('.itemTitleInput').val();
//       var itemDescription = this.$('.itemDescriptionInput').val();
//       var itemPrice = this.$('.itemPriceInput').val();
//       var itemType = this.$('.itemTypeInput').val();
//
//       this.collection.create({item_title: itemTitle, item_description: itemDescription, item_price: itemPrice, item_type: itemType});
//       this.$('.itemTitleInput').val('');
//       this.$('.itemDescriptionInput').val('');
//       this.$('.itemPriceInput').val('');
//       this.$('.itemTypeInput').val('');
//     }
//   });
//

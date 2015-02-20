(function(){
  'use strict';

//------------------------
// MODELS & COLLECTIONS //
//------------------------

  var Menu = Backbone.Model.extend({
    idAttribute: 'menuId',

    defaults: function(attributes){
      attributes = attributes || {};
      return _.defaults(attributes, {
        starters: '',
        entrees: '',
        curry: '',
        other: ''
      });
    }
  });

  var MenusCollection = Backbone.Collection.extend({
    model: Menu,
    url: "https://api.parse.com/1/classes/..",
    parse: function(food){
      return food.results;
    }
  });

//------------------------
// VIEWS //
//------------------------

  var MenuListView = Backbone.View.extend({
    template: _.template($('[data-template-name=index]').text()),

    render: function(){
      this.$el.html(this.template());
      return this;
    },

    events: {
      '': 'displayMenu'
    },

    diaplayMenu: function(e){
      e.preventDefault();
      var foodItem = this.$('.food-item').val();
      this.collection.create({});
    }
  });

  var MenuItemView = Backbone.View.extend({

  });

//------------------------
// ROUTER //
//------------------------

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
    },

    index: function(){
      var template = _.template($('[data-template-name=index]').text());
      $('.app-wrapper').html(template());
      console.log('index');
      // this.listView.render();
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

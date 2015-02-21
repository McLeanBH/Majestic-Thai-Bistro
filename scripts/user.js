(function(){
    'use strict';

  window.App = window.App || {};

  var User = Backbone.Model.extend({
    idAttribute: 'objectId',
    urlRoot: "https://api.parse.com/1/users",

    defaults: {
      name: ''
    }
  });

  var Session = Backbone.Model.extend({
    defaults: {
      token: ''
    },

    isLoggedIn: function(){
      return !!this.get('token');
    },

    initialize: function(){
      this.listenTo(this, 'change:token', this.setHeader);
      this.listenTo(App.vent, 'logout', this.logout);
      // this.listenTo(App.event, 'logout', this.logout); // --> is this supposed to be: 'App.vent' OR 'App.event'??
      // will stick with 'vent', because matches that of line 72 in logout fxn, as well as what I set in my router w/in glue code
    },

    login: function(email, password){
      var that = this;
      return $.ajax({
        url: "https://api.parse.com/1/login",
        data: {
          username: email,
          password: password
        }
      }).then(function(data){
        var userData = _.omit(data, 'sessionToken');
        that.set('currentUser', new User(userData));
        that.set('token', data.sessionToken);
        return data;
      }, function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.reponseJSON.error);
        return jqXHR;
      });
    },

    setHeader: function(){
      var token = this.get('token');
      $.ajaxSetup({
        headers: {
          "X-Parse-Session-Token": token
        }
      });
    },

    logout: function(){
      this.set('token', '');
    }
  });

    var IndexView = Backbone.View.extend({
      template: _.template($('#index-template').text()),

      events: {
        'click .js-logout': 'logout'
      },

      logout: function(){
        App.vent.trigger('logout');
      },

      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      }
    });

      var SignupView = Backbone.View.extend({
        tagName: 'form',
        template: _.template($('#signup-template').text()),
        render: function(){
          this.$el.html(this.template());
          return this;
        }
      });

      var LoginView = Backbone.View.extend({
        tagName: 'form',
        template: _.template($('#login-template').text()),

        events: {
          'submit': 'login'
        },

        login: function(e){
          e.preventDefault();
          var email = this.$('.js-email').val();
          var password = this.$('.js-password').val();
          this.model.login(email, password);
        },

        render: function(){
          this.$el.html(this.template());
          return this;
        }
      });

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',
      'signup': 'signup'
    },

    initialize: function(){
      this.session = new Session();
      this.listenTo(this.session, 'change:token', this.maybeIndex);
    },

    index: function(){
      if(this.session.isLoggedIn()){
        var user = this.session.get('currentUser');
        this.currentView = new IndexView({model: user});
        this.currentView.render();
        $('.app-container').html(this.currentView.el);
      } else {
        this.navigate('login', {trigger: true});
      }
    },

    login: function(){
      this.currentView = new LoginView({model: this.session});
      this.currentView.render();
      $('.app-container').html(this.currentView.el);
    },

    signup: function(){
      this.currentView = new SignupView();
      this.currentView.render();
      $('.app-container').html(this.currentView.el);
    },

    maybeIndex: function(){
      if(this.session.isLoggedIn()){
        this.navigate('', {trigger: true});
      } else {
        this.navigate('login', {trigger: true});
      }
    }
  });

  $.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "YIAK0okVUTwf5uylx6nxDATgoA5mdAclhUfycbRe",
      "X-Parse-REST-API-Key": "3JVELiFs5rCa9TXmmPHE8jQrWKG4Sg2440UYxoMw"
    }
  });

  $(document).ready(function(){
    App.vent = _.extend({}, Backbone.Events);
    App.router = new AppRouter();
    Backbone.history.start();
  });

})();

(function(){
    'use strict';

  window.App = window.App || {};

  var User = Backbone.Model.extend({
    idAttributes: 'userOrdering',
    defaults: function(attributes) {
      attributes = attributes || {};
      return _.defaults(attributes, {
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        username: '',
        password: '',
        emailAddress: '',
      });
    }
  });

  var UsersCollection = Backbone.Collection.extend({
    model: User,
    url: "https://api.parse.com/1/classes/User",
    parse: function(response) { return response.results; }
    });

    var UserListView = Backbone.View.extend({
      template: _.template($('[data-template-name=user]').text()),

      render: function(){
        this.$el.html(this.template());
        return this;
      },

      events: {
        'submit': 'createUser'
      },

      createUser: function(e){
        e.preventDefault();
        var firstName = this.$('.first-name').val();
        var lastName = this.$('.last-name').val();
        var address = this.$('.address').val();
        var phoneNumber = this.$('.phone').val();
        var username = this.$('.username').val();
        var password = this.$('.password').val();
        var email = this.$('.email-address').val();
        this.collection.create({
          firstName: firstName,
          lastName: lastName,
          address: address,
          phoneNumber: phoneNumber,
          username: username,
          password: password,
          email: email,
          // emailVerified: false
          // createdAt: '2011-11-07T20:58:34.448Z',
          // objectId: objectId,
          // sessionToken: sessionToken
        });

        // clear input fields after submission**

        firstName = this.$('.first-name').val('');
        lastName = this.$('.last-name').val('');
        address = this.$('.address').val('');
        phoneNumber = this.$('.phone').val('');
        username = this.$('.username').val('');
        password = this.$('.password').val('');
        email = this.$('.email-address').val('');
        }
    });

//   var User = Backbone.Model.extend({
//     idAttribute: 'objectId',
//     urlRoot: "https://api.parse.com/1/users",
//
//     defaults: {
//       name: ''
//     }
//   });
//
//   var Session = Backbone.Model.extend({
//     defaults: {
//       token: ''
//     },
//
//     isLoggedIn: function(){
//       return !!this.get('token');
//     },
//
//     initialize: function(){
//       this.listenTo(this, 'change:token', this.setHeader);
//       this.listenTo(App.vent, 'logout', this.logout);
//       // this.listenTo(App.event, 'logout', this.logout); // --> is this supposed to be: 'App.vent' OR 'App.event'??
//       // will stick with 'vent', because matches that of line 72 in logout fxn, as well as what I set in my router w/in glue code
//     },
//
//     login: function(email, password){
//       var that = this;
//       return $.ajax({
//         url: "https://api.parse.com/1/login",
//         data: {
//           username: email,
//           password: password
//         }
//       }).then(function(data){
//         var userData = _.omit(data, 'sessionToken');
//         that.set('currentUser', new User(userData));
//         that.set('token', data.sessionToken);
//         return data;
//       }, function(jqXHR, textStatus, errorThrown){
//         alert(jqXHR.reponseJSON.error);
//         return jqXHR;
//       });
//     },
//
//     setHeader: function(){
//       var token = this.get('token');
//       $.ajaxSetup({
//         headers: {
//           "X-Parse-Session-Token": token
//         }
//       });
//     },
//
//     logout: function(){
//       this.set('token', '');
//     }
//   });
//
//     var IndexView = Backbone.View.extend({
//       template: _.template($('#index-template').text()),
//
//       events: {
//         'click .js-logout': 'logout'
//       },
//
//       logout: function(){
//         App.vent.trigger('logout');
//       },
//
//       render: function(){
//         this.$el.html(this.template(this.model.toJSON()));
//         return this;
//       }
//     });
//
//       var SignupView = Backbone.View.extend({
//         tagName: 'form',
//         template: _.template($('#signup-template').text()),
//         render: function(){
//           this.$el.html(this.template());
//           return this;
//         }
//       });
//
//       var LoginView = Backbone.View.extend({
//         tagName: 'form',
//         template: _.template($('#login-template').text()),
//
//         events: {
//           'submit': 'login'
//         },
//
//         login: function(e){
//           e.preventDefault();
//           var email = this.$('.js-email').val();
//           var password = this.$('.js-password').val();
//           this.model.login(email, password);
//         },
//
//         render: function(){
//           this.$el.html(this.template());
//           return this;
//         }
//       });
//
//   var AppRouter = Backbone.Router.extend({
//     routes: {
//       '': 'index',
//       'login': 'login',
//       'signup': 'signup'
//     },
//
//     initialize: function(){
//       this.session = new Session();
//       this.listenTo(this.session, 'change:token', this.maybeIndex);
//     },
//
//     index: function(){
//       if(this.session.isLoggedIn()){
//         var user = this.session.get('currentUser');
//         this.currentView = new IndexView({model: user});
//         this.currentView.render();
//         $('.app-container').html(this.currentView.el);
//       } else {
//         this.navigate('login', {trigger: true});
//       }
//     },
//
//     login: function(){
//       this.currentView = new LoginView({model: this.session});
//       this.currentView.render();
//       $('.app-container').html(this.currentView.el);
//     },
//
//     signup: function(){
//       this.currentView = new SignupView();
//       this.currentView.render();
//       $('.app-container').html(this.currentView.el);
//     },
//
//     maybeIndex: function(){
//       if(this.session.isLoggedIn()){
//         this.navigate('', {trigger: true});
//       } else {
//         this.navigate('login', {trigger: true});
//       }
//     }
//   });
//
  $.ajaxSetup ({
    headers: {
      "X-Parse-Application-Id": "3sSDwBGBkqjPYHuD6sv7RlG7B0hUPaDgqJzFVAmb",
      "X-Parse-REST-API-Key": "KGBI3JFmgSKKe0Z1SCU2X50OiuRGZ74xmMUzteqT"
    }
  });

  $(document).ready(function(){
    // App.vent = _.extend({}, Backbone.Events);
    // App.router = new AppRouter();
    Backbone.history.start();
  });

})();

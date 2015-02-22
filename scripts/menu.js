$(function(){

  var MenuItemCollection = new AppCollections.MenuItemCollection();

  var orderModel = new AppModels.OrderModel();
  var selectedItemModel = new AppModels.SelectedItemModel();

  new AppViews.BaseView({
    model: orderModel,
    $container: $('body')
  });

  new AppViews.MenuItemTypeListView({
    collection: menuItemCollection,
    order: orderModel,
    selectedItem: selectedItemModel,
    $container: $('.master-container'),
  });

  new AppViews.MenuView({
    collection: menuItemCollection,
    order: orderModel,
    selectedItem: selectedItemModel,
    $container: (".master-container"),
  });

  new AppViews.CurrentOrderView({
    model: orderModel,
    $container: $('.menu-container'),
  });

})();

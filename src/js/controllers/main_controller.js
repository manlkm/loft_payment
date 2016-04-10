angular.module('LoftPayment.controllers.Main', [])

.controller('MainController', function($rootScope, $scope, SharedState, $route){
	var now = new Date();
    $scope.orderNo = ((now.getFullYear()) + ''+ ((now.getMonth()+1)<10?'0'+(now.getMonth()+1):((now.getMonth()+1)))+''+ now.getDate() + "" + now.getHours() + ''
                     + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + '' + ((now.getSeconds() < 10) ? ("0" + now
                     .getSeconds()) : (now.getSeconds())));
   
  var redirectPaymentUrl = '';
  $scope.generatePaymentLinks = function(){
  	console.log('orderNo:'+this.orderNo);
  	console.log('productName:'+this.productName);
  	console.log('quantity:'+this.quantity);
  	console.log('price:'+this.price);

  	redirectPaymentUrl = paypalUrl+'business='+paypalBusinessAcc+'&currency_code=HKD&amount='+this.price+'&item_name='+encodeURIComponent(this.productName)+'&invoice='+this.orderNo+'&quantity='+this.quantity+'&charset=utf-8';

  	console.log(redirectPaymentUrl);
  	SharedState.initialize($scope, 'event');
    SharedState.turnOn('event');
  };

  $scope.shareToWhatsapp = function(){
  	var whatsappUrl = "whatsapp://send?text=" + encodeURIComponent('Please pay through PayPal link below') + ' - ' + encodeURIComponent(redirectPaymentUrl);
  	console.log('Share to: ' + whatsappUrl);
  	window.location.href = whatsappUrl;
  };

  $scope.reloadRoute = function(){
  	SharedState.initialize($scope, 'event');
    SharedState.turnOff('event');
  	$route.reload();
  	var now = new Date();
    $scope.orderNo = ((now.getFullYear()) + ''+ ((now.getMonth()+1)<10?'0'+(now.getMonth()+1):((now.getMonth()+1)))+''+ now.getDate() + "" + now.getHours() + ''
                     + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + '' + ((now.getSeconds() < 10) ? ("0" + now
                     .getSeconds()) : (now.getSeconds())));
  };

});
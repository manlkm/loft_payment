angular.module('LoftPayment.controllers.Main', [])

.controller('MainController', function($rootScope, $scope, SharedState, $route)
{
	var now = new Date();
    $scope.orderNo = ((now.getFullYear()) + ''+ ((now.getMonth()+1)<10?'0'+(now.getMonth()+1):((now.getMonth()+1)))+''+ now.getDate() + "" + now.getHours() + ''
                     + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + '' + ((now.getSeconds() < 10) ? ("0" + now
                     .getSeconds()) : (now.getSeconds())));
   
  var redirectPaymentUrl = '';
  $scope.generatePaymentLinks = function(){
  	console.log('orderNo:'+this.orderNo);
  	console.log('productName:'+this.productName);
  	console.log('price:'+this.price);

    var totalPrice = this.price+this.handling;
  	redirectPaymentUrl = paypalUrl+'business='+paypalBusinessAcc+'&currency_code=HKD&amount='+totalPrice+'&item_name='+encodeURIComponent(this.productName)+'&invoice='+this.orderNo+'&quantity=1&charset=utf-8';

  	console.log(redirectPaymentUrl);
  	SharedState.initialize($scope, 'event');
    SharedState.turnOn('event');
    console.log('test2');
  };

  $scope.copyLink = function(){
  	var sharingUrl = redirectPaymentUrl;
    var clipboard = new Clipboard('.cpBtn', {
      text: function(trigger) {
          return sharingUrl;
      }
    });
    clipboard.on('success', function(e) {
        alert('copied');
        e.clearSelection();
    });
  };
  
  $scope.updateHandling = function(){
    this.handling = Math.ceil(this.price*0.03);
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
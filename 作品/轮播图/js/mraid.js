! function(e) {
	e.mraid = new function(){
		var scope = this;
		var t;
		scope.bSimulation = true;
		scope.state = 'resized';
		
		scope.trigger = function(str){
			$(document).trigger(str);
		};
		scope.close = function(){
			$("section[data-name='Scene 1 - landscape']").css('display','none');
		};
		
		scope.setAutoClose = function(num){
			scope.cancelAutoClose();
			t = setTimeout(scope.close,num);
		};
		scope.cancelAutoClose = function(){
			clearTimeout(t);
		};
		scope.useCustomClose = function(){

		};
		var timeId = setInterval(function(){
			if(UT_CM){
				$(document).trigger('adReady');
				clearInterval(timeId);
			}
		},50);
	}
	e.SPevent = function(eventIdentifier, value, redir, elementId){
		console.log('event:'+eventIdentifier,'params:'+elementId);
	}
	e.ad = new function(){
		var scope = this;
		scope.setLoading = function(){};
		scope.preload = function(){};
	}
}(window)

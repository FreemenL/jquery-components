/*
* @Author: Administrator
* @Date:   2016-02-23 20:36:09
* @Last Modified by:   Administrator
* @Last Modified time: 2016-12-26 22:37:30
*/
function $(id){
				return new Tq(id);
			}
			$.trim = function(str){
				var p1 = /^\s+|\s+$/g;
				return str.replace(p1,'');

			}
		   function Tq(select){

		   		   this.ele=[];
		   		if(typeof select=='object'){
		   			this.ele.push(select)
		   		}else{
			   		if('#'==select.charAt(0)){
			   			var t =document.getElementById(select.substr(1));
			   			this.ele.push(t);
			   		}else if('.'==select.charAt(0)){
			   			var t =document.getElementsByClassName(select.substr(1));
			   			for (var i = 0; i < t.length; i++) {
			   				this.ele.push(t[i]);
			   			}
			   		}else{
			   		    var t =document.getElementsByTagName(select);
						for (var i = 0; i < t.length; i++) {
			   				this.ele.push(t[i]);
			   			}
			   		}
				}	
		   	
		   }
		   Tq.prototype.attr = function(name,val){
		   		if(arguments.length==1 && arguments[0] instanceof Object){

		   			for (var j = 0; j < this.ele.length; j++) {
		   				for(var i in arguments[0]){
			   				this.ele[j].setAttribute(i,name[i]);
			   			}

		   			}
			   			
		   			return this;
		   		}else if(arguments.length==1){
		   			return this.ele[0].getAttribute(name);
		   		}else if(arguments.length==2){

		   			for (var i = 0; i < this.ele.length; i++) {
		   				this.ele[i].setAttribute(name,val);
		   			}
		   		
		   			return this;
		   		}
		   }
		   Tq.prototype.css = function(name,val){

			   	if(arguments.length==1 && typeof arguments[0]==='string'){
			   		if(window.getComputedStyle){
			   			return window.getComputedStyle(this.ele[0],false)[name];
			   		}else if(this.ele.currentStyle){
			   			return this.ele[0].currentStyle[name];
			   		}
			   	}else if(arguments.length==2){
			   		for(var i=0;i<this.ele.length;i++){
			   			this.ele[i].style[name]=val;
			   		}
			   		
			   		return this;
			   	}else if(arguments.length==1 && arguments[0] instanceof Object){
			   		for(var i=0;i<this.ele.length;i++){
			   			for(var j in arguments[0]){
			   				this.ele[i].style[j]=arguments[0][j];
			   			}
			   		}
			   		
			   		return this;
			   	}	
		   }
		   Tq.prototype.addClass = function(className){
		   		var oldClassName = this.attr('class');
		   		var newClassName = oldClassName+' '+className;
		   		this.attr('class',newClassName);


		   		return this;
		   }
		   Tq.prototype.removeClass = function(className){
		   		var oldClassName = this.attr('class');
		   		var p1 = new RegExp('\\b'+className+'\\b','g');
		   		var newClassName = oldClassName.replace(p1,'');
		   		this.attr('class',newClassName);

		   		return this;
		   }
		   Tq.prototype.on = function(eventName,funcName){
		   		for (var i = 0; i < this.ele.length; i++) {
		   			if(this.ele[i].addEventListener){
			   			this.ele[i].addEventListener(eventName,funcName);
			   		}else if(this.ele[i].attachEvent){
			   			this.ele[i].attachEvent('on'+eventName,funcName);
			   		}
		   		}
			   		
		   		return this;
		   };
		   Tq.prototype.html = function(newhtml){
		   		if(arguments.length==0){
		   			return this.ele[0].innerHTML;
		   		}else{
		   			for (var i = 0; i < this.ele.length; i++) {
		   				this.ele[i].innerHTML = newhtml;
		   			}
		   		
		   			return this;
		   		}
		   };
		   	Tq.prototype.animate = function(cssName,target){
		   		var that = this;
		   		var timer = null;
		 	 	timer = setInterval(function(){
		 	 		if('opacity'==cssName){
		 	 			var current = that.ele.style['opacity']*100;
		 	 		}else{
		 	 			var first = cssName.charAt(0).toUpperCase();
		 	 			var newCssName = first+cssName.substr(1);
		 	 			var current = that.ele['offset'+newCssName];
		 	 		}

		 	 		
		 	 		var dx = Math.ceil(Math.abs(target-current)/10);
		 	 		console.log(current,target);
		 	 		if(Math.abs(target-current)<dx){
		 	 			target = current;
		 	 		}
		 	 		if(current<target){
		 	 			dx = dx;
		 	 		}else if(current>target){
		 	 			dx = -1*dx;
		 	 		}else{
		 	 			clearInterval(timer);
		 	 			console.log('结束。。。。');
		 	 		}
		 	 		if('opacity'==cssName){
		 	 			that.ele.style['opacity'] = (current+dx)/100; 
		 	 		}else{
		 	 			that.ele.style[cssName] = current+dx+'px'; 
		 	 		}
		 	 		

		 	 	},50)

		 	 	return this;
		   	}


const _USERNAME = "ml2021login";
const _PASSWORD = "LoginTrain_21";
var num_train=0;
var x1=0,x2=0,x3=0,x4=0,x5=0,x6=0,y=0,predict=0;
var train_set=[];

var begin_login_time,end_login_time;

var begin_username_time,end_username_time;
var begin_password_time,end_password_time;
	
var password_tab_click;
var submit_enter_click; //enter = 0,click = 1

var trainDataDf;

$(document).ready(function(){
	
	
	//X2 = Key in username speed (total seconds)
	$("#floatingUsename").on("focusin keydown",function(){
		if(begin_username_time==0 || $(this).val().length==0 ){
			begin_username_time=Date.now();
			end_username_time=0;
		}
	});
	$("#floatingUsename").on("focusout",function(){
		if(end_username_time==0 && $(this).val().length>0)
			end_username_time=Date.now();
	});	
	//X3 = Key in password speed (total seconds)
	$("#floatingPassword").on("focusin keydown",function(){
		if(begin_password_time==0 || $(this).val().length==0){
			begin_password_time=Date.now();
			end_password_time=0;
		}
	});
	$("#floatingPassword").on("focusout",function(){
		if(end_password_time==0 && $(this).val().length>0)
			end_password_time=Date.now();
		
	});
	$("body").on("keydown", "input",function(e){
		if($("#floatingPassword").val().length==0 && $("#floatingUsename").val().length==0 )
			begin_login_time = Date.now();

			
	});
	//X5 = Count mouse click to switch input
	$("#floatingPassword").on("mousedown",function(e){
		password_tab_click=1;
	});
	
	//X6 = Press enter (0) to sumbit or mouse click (1)
	$("#submit_btn").on("mousedown",function(){
		submit_enter_click = 1;
	});
	
});

	function loadTrainingData(){
		var file = "train_data.txt";
		//check url file 
		if(location.href.match(/file:\/\//))
			file = "https://si62.github.io/mlLogin/train_data.txt";
		trainDataDf = $.Deferred();
		fetch(file+"?rand="+ (Math.floor(Math.random() * 89999) + 10000) ).then(function(response) {
		  response.text().then(function(text) {
			var f = text.split(/\r?\n/);
			$.each(f,function(){
				var fval = this.split(",");
				num_train ++;
				x1 = Number(fval[0]);
				x2 = Number(fval[1]);
				x3 = Number(fval[2]);
				x4 = Number(fval[3]);
				x5 = Number(fval[4]);
				x6 = Number(fval[5]);
				y = Number(fval[6]);
				train_set.push({input:{x1:x1,x2:x2,x3:x3,x4:x4,x5:x5,x6:x6},output:{y:y}});	
			});
			trainDataDf.resolve();
			
		  });
		});
		return trainDataDf.promise();
	}

	function countUsernameUpper(){
		var l = $("#floatingUsename").val().length;
		return (l - $("#floatingUsename").val().replace(/[A-Z]/g, '').length);
	}
	
	function checkLogin(){
		if($("#floatingUsename").val().toLowerCase() === _USERNAME 
			&& $("#floatingPassword").val() === _PASSWORD)
			return 1;
		return 0;
	}
	function countUsernameUpper(){
		var l = $("#floatingUsename").val().length;
		return (l - $("#floatingUsename").val().replace(/[A-Z]/g, '').length);
		
	}
	function resetForm(){
		$("input").val("");
		$("#floatingUsename").focus();
		begin_login_time = Date.now();
		x1=x2=x3=x4=x5=x6=y=0;
		begin_username_time=end_username_time=0;
		begin_password_time=end_password_time=0;
		password_tab_click=0;
		submit_enter_click=0;
		y=predict=0;
	}
	
	function calFeature(){
		//sumbit form
		if(end_username_time==0)
			end_username_time=Date.now();		
		if(end_password_time==0)
			end_password_time=Date.now();		
		end_login_time = Date.now();
		num_train++;
		begin_login_time = Math.min(begin_login_time, begin_username_time, begin_password_time);
		x1 = ((end_login_time - begin_login_time) /1000).toFixed(2);
		x2 = ((end_username_time - begin_username_time) /1000).toFixed(2);
		x3 = ((end_password_time - begin_password_time) /1000).toFixed(2);
		x4 = countUsernameUpper();
		x5 = password_tab_click;
		x6 = submit_enter_click;
		
	}

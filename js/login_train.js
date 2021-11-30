$(document).ready(function(){
	
	//reset values - login_core.js
	resetForm();
	//load training data - login_core.js
	$.when(loadTrainingData()).done(function(){
		num_train=0;
		$.each(train_set,function(){
			num_train++;
			x1=this.input.x1;
			x2=this.input.x2;
			x3=this.input.x3;
			x4=this.input.x4;
			x5=this.input.x5;
			x6=this.input.x6;
			y =this.output.y;
			training_output();
		});
	});
	

	//feature X1 = Login use time
	$("#loginForm").submit(function(e){
		if(checkLogin()){
			
			//calculate X value - login_core.js
			calFeature();
			y = $("#trainTrue").is(':checked')? 1: 0;
			
						
			bootbox.alert({
				message: "<h2><i class='fas fa-check-circle'></i> Login Success</h2><br/>",
				size: "large",
				closeButton: false,
				callback: function (result) {
					$("#floatingUsename").focus();
				}
			});
			//add training set
			train_set.push({input:{x1:x1,x2:x2,x3:x3,x4:x4,x5:x5,x6:x6},output:{y:y}});
			training_output();
		}
		else{
			bootbox.alert({
				message: "<h2><i class='far fa-times-circle'></i> Username/Password incorrect.</h2>",
				size: "large",
				closeButton: false
			});
		}
		resetForm();
		e.preventDefault();
		return false;
	});
	
	
	$("#copy_train").on("click",function(){
		  var copyText = "";
		  
		  $.each(train_set,function(){
			copyText += this.input.x1+","+this.input.x2+","+this.input.x3
					 +","+this.input.x4+","+this.input.x5+","+this.input.x6
					 +","+this.output.y+"\r\n";
		  });
		  copyText = copyText.replace(/\r?\n$/, "");
		   /* Copy the text inside the text field */
		  navigator.clipboard.writeText(copyText);

		  /* Alert the copied text */
		  	bootbox.alert({
				message: "Please paste the text to local 'train_data.txt' file.<br/>",
				size: "large",
				closeButton: false
			});
	});

	
	function training_output(){
		var col = $("<td>");
		var row = $("<tr>")
					.append(col.clone().html(num_train))
					.append(col.clone().html(x1))
					.append(col.clone().html(x2))
					.append(col.clone().html(x3))
					.append(col.clone().html(x4))
					.append(col.clone().html(x5))
					.append(col.clone().html(x6))
					.append(col.clone().html(y))
		$("#train_console").append(row);
	}

});
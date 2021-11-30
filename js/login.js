$(document).ready(function(){
	
	resetForm();
	
	const config = {
	  iterations: 500,
	  binaryThresh: 0.5,
	  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
	  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
	  //learningRate: 0.4, // scales with delta to effect training rate --> number between 0 and 1
	  //leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
	};
	const net = new brain.NeuralNetwork(config);
	
	
	$.when(loadTrainingData()).done(function(){
		num_train=0;
		var status = net.train(
			train_set
		);
		console.log(status);
	});
	
	
	
	
	//feature X1 = Login use time
	$("#loginForm").submit(function(e){
		
		if(checkLogin()){

			calFeature();
			test_data={x1:x1,x2:x2,x3:x3,x4:x4,x5:x5,x6:x6};
			var test_result= net.run(test_data); 

			predict = test_result.y;
			y = predict>config.binaryThresh? 1: 0;
			login_output();
			var result_value=$("<div>")
							  .append("<div>x1 = "+x1+"</div>")
							  .append("<div>x2 = "+x2+"</div>")
							  .append("<div>x3 = "+x3+"</div>")
							  .append("<div>x4 = "+x4+"</div>")
							  .append("<div>x5 = "+x5+"</div>")
							  .append("<div>x6 = "+x6+"</div>")
							  .append("<div>Result = " +y+"</div>")
							  .append("<div>Predict = " +predict+"</div>");
			var alertTxt="";
			if(y==0)
				alertTxt="<div class='alert alert-danger'>Predict the login is invalid</div>";
			else
				alertTxt="<div class='alert alert-success'>Predict the login is valid</div>";
			bootbox.alert({
				message: "<h2><i class='fas fa-check-circle'></i> Login Success</h2><br/>"+alertTxt + result_value.html(),
				size: "large",
				closeButton: false,
				callback: function (result) {
					$("#floatingUsename").focus();
				}
			});
			
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
	
	
	function login_output(){
		var row_color = "class='table-danger'";
		if(y==1)
			row_color = "class='table-success'";
		var col = $("<td>");
		var row = $("<tr "+row_color+">")
					.append(col.clone().html(num_train))
					.append(col.clone().html(x1))
					.append(col.clone().html(x2))
					.append(col.clone().html(x3))
					.append(col.clone().html(x4))
					.append(col.clone().html(x5))
					.append(col.clone().html(x6))
					.append(col.clone().html(y))
					.append(col.clone().html(predict))
		$("#login_console").append(row);
	}
	function readInputs(stream, data) {
	  for (let i = 0; i < data.length; i++) {
		stream.write(data[i]);
	  }
	  // let it know we've reached the end of the inputs
	  stream.endInputs();
	}

});
$(document ).ready( () =>{
    // handles the product saving by parsing the data from the admin table and sending an ajax request
	$("#saveProduct").click(e =>{
		e.preventDefault();
		const toSend = [];
		// parse the admin table and for each row
		$('#adminTable tr').each(function(){
			const id = $(this).attr("id");
			let row = {};
			// get the values
			$(this).find('input').each(function(i,l){
				if(l.className === "form-control"){
					row.productName= l.value;
				}else{
					row.price = parseFloat(l.value);
				}
			})
			row.category = $(this).find("select").children("option:selected").val();
			// add them to the data to send
			toSend.push({id,data :row});
		})
		console.log(toSend);
		// send the data.
		$.ajax({
			dataType: 'json',
			contentType: 'application/json',
			url: '/admin',
			type: 'PUT',
			data : JSON.stringify(toSend)
		});
	});
});
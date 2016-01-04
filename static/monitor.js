var jobs = [];

function f(source,data) {
	if ( source === "ajax" ) {
		jobs = data;
	};
		
	for (var i = 0; i < jobs.length; i++) {
		var components = JSON.stringify(jobs[i].objective.components);
		$('#main > tbody:first-child').after('<tr class="deployments '+jobs[i].deployment_id+'" id="'+jobs[i]._modifiedTime+'"><td class="'+jobs[i]._status+'">'+jobs[i]._status+'</td><td>'+jobs[i].deployment_id+'</td><td>'+jobs[i].objective.target+'</td><td>'+components+'</td><td>'+jobs[i].meta.requested.replace(/T/,' ')+'</td></tr>');
	};
};

function getNewDeployments(){
	setInterval(function(){
		var counter = $('.deployments').first().attr('id');
		$.get("/ssd/fetchAfter/" + counter,function(data){
			for (var i = 0; i < data.length; i++) {
				var components = JSON.stringify(data[i].objective.components);
				$('.'+data[i].deployment_id).remove();
				$('#main > tbody:first-child').after('<tr class="deployments '+data[i].deployment_id+'" id="'+data[i]._modifiedTime+'"><td class="'+data[i]._status+'">'+data[i]._status+'</td><td>'+data[i].deployment_id+'</td><td>'+data[i].objective.target+'</td><td>'+components+'</td><td>'+data[i].meta.requested.replace(/T/,' ')+'</td></tr>');
				$('.'+data[i].deployment_id).hide();
				$('.'+data[i].deployment_id).show('slow');
			};
		});
	},5000);
}

function getJSONObj(counter,callback){
	var url = '/ssd/fetchAfter/' + counter;
	$.getJSON(url, function(data){
		callback("ajax",data);
	});
};

function preload() {
	getJSONObj(0,f);
};

window.onpaint = getJSONObj(0,f);
$( window ).load(function() {
	getNewDeployments();
});

function toggleDisplay(jobName){
	$('.'+jobName).slideToggle("slow");
	$('.'+jobName+'-row').slideToggle("slow");
	//$('table').width($('#'+jobName).width());
}

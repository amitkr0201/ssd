function getNewDeployments(){
    $.getJSON('/ssd/fetchAfter/0' ,function(output){
      var op = {
        deployments: output
      };
      var template = Handlebars.templates['newDeploymentUpdate'],
        html = template(op);

      $('#container').prepend(html);
      setInterval(function(){
        var counter = $('#container>li').first().attr('id');
        $.getJSON("/ssd/fetchAfter/" + counter,function(data){
          for (var i = 0; i < data.length; i++){
            var tempDeployment = [data[i]];
            var newop = {
              deployments: tempDeployment
            };
            var newHtml = template(newop);
            $('.'+data[i].deployment_id).remove();
            $('#container').prepend(newHtml);
            $('.'+data[i].deployment_id).hide();
            $('.'+data[i].deployment_id).show('slow');
          }
        });
      },5000);
    });
}

Handlebars.registerHelper('reverse',function( collection, options ){
  var result = '';
  for( var i = collection.length - 1; i >= 0; i-- ){
    result += options.fn( collection[i] );
  }
  return result;
});

$( document ).ready(function() {
	getNewDeployments();
});

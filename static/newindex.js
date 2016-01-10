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
            console.log($('.'+data[i].deployment_id).length);
            var tempDeployment = [data[i]];
            var newop = {
              deployments: tempDeployment
            };
            if ( $('.'+data[i].deployment_id).length > 0 ){
              console.log("in if");
              var newHtml = template(newop);
              $('.'+data[i].deployment_id).addClass("removed").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
                $(this).remove();
                $('#container').prepend(newHtml);
              });
            }else{
              console.log("in else");
              var newHtml = template(newop);
              $('#container').prepend(newHtml);
            }
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

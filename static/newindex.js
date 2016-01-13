function getNewDeployments(){
    $.getJSON('/ssd/fetchAfter/0' ,function(output){
      for (var j = 0; j < output.length; j++){
        output[j]._modifiedTimeStamp = new Date(output[j]._modifiedTime).toLocaleFormat();
        output[j]._createdTimeStamp = new Date(output[j]._createdTime).toLocaleFormat();
        if ( output[j]._status.toLowerCase() != "running"){
          output[j]._endTimeStamp = new Date(output[j]._modifiedTime).toLocaleFormat();
        }else{
          output[j]._endTimeStamp = "N/A"
        }
      }
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
            data[i]._modifiedTimeStamp = new Date(data[i]._modifiedTime).toLocaleFormat();
            data[i]._createdTimeStamp = new Date(data[i]._createdTime).toLocaleFormat();
            if ( data[i]._status.toLowerCase() != "running"){
              data[i]._endTimeStamp = new Date(data[i]._modifiedTime).toLocaleFormat();
            }else{
              data[i]._endTimeStamp = "N/A"
            }
            var tempDeployment = [data[i]];
            var newop = {
              deployments: tempDeployment
            };
            if ( $('.'+data[i].deployment_id).length > 0 ){
              var newHtml = template(newop);
              $('.'+data[i].deployment_id).addClass("removed").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
                $(this).remove();
                $('#container').prepend(newHtml);
              });
            }else{
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

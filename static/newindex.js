function parseDate(d) {
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        d2 = monthNames[d.getMonth()] +' '+ d.getDate() +', '+d.getFullYear() +' '+(d.getHours()<10?'0':'') +d.getHours() +':'+(d.getMinutes()<10?'0':'') + d.getMinutes()+':'+(d.getSeconds()<10?'0':'') +d.getSeconds();
    return d2;
}

function getNewDeployments(){
    $.getJSON('/ssd/fetchAfter/0' ,function(output){
      for (var j = 0; j < output.length; j++){
        output[j]._modifiedTimeStamp = parseDate(new Date(output[j]._modifiedTime));
        output[j]._createdTimeStamp = parseDate(new Date(output[j]._createdTime));
        if ( output[j]._status.toLowerCase() != "running"){
          output[j]._endTimeStamp = parseDate(new Date(output[j]._modifiedTime));
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
            data[i]._modifiedTimeStamp = parseDate(new Date(data[i]._modifiedTime));
            data[i]._createdTimeStamp = parseDate(new Date(data[i]._createdTime));
            if ( data[i]._status.toLowerCase() != "running"){
              data[i]._endTimeStamp = parseDate(new Date(data[i]._modifiedTime));
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

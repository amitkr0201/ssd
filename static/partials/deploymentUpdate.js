(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['deploymentUpdate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "  <tr class=\"deployments "
    + alias2(alias1((depth0 != null ? depth0.deployment_id : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? depth0._modifiedTime : depth0), depth0))
    + "\">\r\n    <td class=\""
    + alias2(alias1((depth0 != null ? depth0._status : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0._status : depth0), depth0))
    + "</td>\r\n    <td>"
    + alias2(alias1((depth0 != null ? depth0.deployment_id : depth0), depth0))
    + "</td>\r\n    <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.objective : depth0)) != null ? stack1.components : stack1), depth0))
    + "</td>\r\n    <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.objective : depth0)) != null ? stack1.target : stack1), depth0))
    + "</td>\r\n    <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.objective : depth0)) != null ? stack1.time : stack1), depth0))
    + "</td>\r\n  </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.reverse || (depth0 && depth0.reverse) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.deployments : depth0),{"name":"reverse","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();
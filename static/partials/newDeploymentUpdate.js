(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newDeploymentUpdate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<li class=\"deployment "
    + alias2(alias1((depth0 != null ? depth0._status : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0.deployment_id : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? depth0._modifiedTime : depth0), depth0))
    + "\">\r\n  <div onclick=\"$('#"
    + alias2(alias1((depth0 != null ? depth0.deployment_id : depth0), depth0))
    + "').toggleClass('hidden');\">\r\n    <div class=\"environment\"><span class=\"title\">Environment:</span> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.objective : depth0)) != null ? stack1.target : stack1), depth0))
    + "</div>\r\n    <div class=\"lastUpdate\"><span class=\"title\">Last Updated:</span> "
    + alias2(alias1((depth0 != null ? depth0._modifiedTime : depth0), depth0))
    + "</div>\r\n    <div class=\"status\"><span class=\"title\">Status:</span> <span class=\"capitalize\">"
    + alias2(alias1((depth0 != null ? depth0._status : depth0), depth0))
    + "</span></div>\r\n    <ol class=\"components\">\r\n      <li class=\"component header\">\r\n        <div class=\"component paramName\">Parameter(s)</div>\r\n        <div class=\"component paramDesc\">Description</div>\r\n        <div class=\"component paramArtifact\">Artifact ID</div>\r\n      </li>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.objective : depth0)) != null ? stack1.components : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ol>\r\n  </div>\r\n  <div class=\"moreInfo hidden\" id=\""
    + alias2(alias1((depth0 != null ? depth0.deployment_id : depth0), depth0))
    + "\">\r\n    <div class=\"deployment_id\"><span class=\"title\">Deployment ID:</span> "
    + alias2(alias1((depth0 != null ? depth0.deployment_id : depth0), depth0))
    + "</div>\r\n    <div class=\"stackInfo\"><span class=\"title\">Stack #:</span>WIP</div>\r\n    <div class=\"startTime\"><span class=\"title\">Start time:</span> "
    + alias2(alias1((depth0 != null ? depth0._createdTime : depth0), depth0))
    + "</div>\r\n    <div class=\"endTime\"><span class=\"title\">End time:</span> "
    + alias2(alias1((depth0 != null ? depth0._modifiedTime : depth0), depth0))
    + "</div>\r\n  </div>\r\n</li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "      <li class=\"component\">\r\n        <div class=\"component paramName\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>\r\n        <div class=\"component paramDesc\">WIP</div>\r\n        <div class=\"component paramArtifact\">WIP</div>\r\n      </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.deployments : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();
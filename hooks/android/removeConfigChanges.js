
var fs = require('fs');
var path = require('path');

const constants={
    javaSrcPath : path.join("platforms","android","app","src","main","java"),
    kotlinSrcPath : path.join("platforms","android","app","src","main","kotlin"),
    manifestSrcPath : path.join("platforms","android","app","src","AndroidManifest.xml"),
    pluginID : path.join("com","outsystems","geofencing")
}

module.exports = function (context) {
   
    console.log("Start changing Files!");
    var Q = require("q");
    var deferral = new Q.defer();    

    var projectRoot = context.opts.cordova.project ? context.opts.cordova.project.root : context.opts.projectRoot;
    var manifestSrc = path.join(projectRoot,constants.manifestSrcPath)

    var pathArray = [manifestSrc]

    pathArray.forEach((value)=>{
        if (fs.existsSync(value)) {
            var content = fs.readFileSync(value, "utf8");
    
            content = content.replace("orientation|","");
            content = content.replace("|orientation","");
    
            
            fs.writeFileSync(value, content);
            console.log("Finished changing "+path.basename(value)+"!");
        }else{
            console.error("Error could not find "+path.basename(value)+"!");
        }
    })

    console.log("Finished changing Files!");
    
    deferral.resolve();

    return deferral.promise;
}
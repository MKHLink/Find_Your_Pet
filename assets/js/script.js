//api key: gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU
//secret: W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp

var apiKey = "gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU";
var secretKey = "W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp";

getToken();
function getToken()
{
   fetch('curl -d "grant_type=client_credentials&client_id=gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU&client_secret=W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp" https://api.petfinder.com/v2/oauth2/token')
   .then(function(response){
    response.json().then(function(data){
        console.log(data);
    });
   });
}


//curl -d "grant_type=client_credentials&client_id=gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU&client_secret=W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp" https://api.petfinder.com/v2/oauth2/token
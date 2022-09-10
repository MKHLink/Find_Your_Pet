//api key: gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU
//secret: W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp

var apiKey = "gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU";
var secretKey = "W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp";

console.log("Test");

function getToken()
{
    var accessToken;

    fetch('https://api.petfinder.com/v2/oauth2/token', 
    {
        method: 'POST',
        body: new URLSearchParams
    ({
        'grant_type': 'client_credentials',
        'client_id': 'gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU',
        'client_secret': 'W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp'
    })
    }).then(function(response){
        response.json().then(function(data){
        console.log(data);
        accessToken =  data.access_token;
        console.log(accessToken);

        fetch('https://api.petfinder.com/v2/animals?type=dog', {
            headers: {
            'Authorization': 'Bearer '+data.access_token
            }
        }).then(function(response){
            response.json().then(function(data){
                console.log(data);
            });
        });
    });
    
    
});
    
}

getToken();

//curl -d "grant_type=client_credentials&client_id=gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU&client_secret=W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp" https://api.petfinder.com/v2/oauth2/token

/*
.then(function(response){
    response.json().then(function(data){
        console.log(data);
    });
*/
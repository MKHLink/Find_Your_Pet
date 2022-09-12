//api key: gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU
//secret: W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp
var zipCodeEl = document.querySelector("#username");
var submissionFormEl = document.querySelector("#search-form");

var animalContainerEl = document.querySelector("#animal-container");
var animalFormEl = document.querySelector("#animal-form");
var animalAttrEl = document.querySelector("#animal-attr");


submissionFormEl.addEventListener("submit",submitHandler);

function submitHandler(event)
{
    event.preventDefault();
    var zipCode = zipCodeEl.value.trim();
    getToken(zipCode);
    zipCodeEl.value = "";
}


//function to get the first 20 animals in the given location
function getToken(location)
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

        fetch('https://api.petfinder.com/v2/animals?location='+location, {
            headers: {
            'Authorization': 'Bearer '+data.access_token
            }
        }).then(function(response){
            response.json().then(function(data){
                console.log(data);
                displayAnimal(data);
            });
        });
    });
    
    
});
    
}

//text-gray-900 text-xl font-medium mb-2

function displayAnimal(animals)
{
    var name = animals.animals[0].name;
    var titleName = document.createElement("h5");
    titleName.classList="text-gray-900 text-xl font-medium mb-2";
    titleName.textContent = "Name: "+name;

    var type = animals.animals[0].species;
    var typeName = document.createElement("h6");
    typeName.classList="text-gray-900 text-xl font-medium mb-2";
    typeName.textContent = "Species: "+type;

    var breed = animals.animals[0].breeds.primary;
    var breedType = document.createElement("h6");
    breedType.classList="text-gray-900 text-xl font-medium mb-2";
    breedType.textContent = "Breed: "+breed;

    var city = animals.animals[0].contact.address.city;
    var location = document.createElement("h6");
    location.classList="text-gray-900 text-xl font-medium mb-2";
    location.textContent = "City: "+city;


    animalAttrEl.appendChild(titleName);
    animalAttrEl.appendChild(typeName);
    animalAttrEl.appendChild(breedType);
    animalAttrEl.appendChild(location);
    animalContainerEl.appendChild(animalAttrEl);
    animalFormEl.appendChild(animalContainerEl);

}

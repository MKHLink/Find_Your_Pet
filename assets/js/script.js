//api key: gSzfuztB3Wmmxgv5n0Q6rR4ty7EtEc14eez9SiOYgZHameqeHU
//secret: W6jfFnFl2Jxqo2bUSnC6s90C1PzCF4Fv6K8SyHGp
var zipCodeEl = document.querySelector("#username");
var submissionFormEl = document.querySelector("#search-form");

//selector of the animal display container
var animalFormEl = document.querySelector("#animal-form");

var listZip = [];
var savedAnimals={animals: []};

loadAnimals();

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
                for(var i = 0;i<8;i++)
                {
                    listZip[i] = data.animals[i].contact.address.postcode;
                    var zipEl = distanceCalculator(location, listZip[i],i);
                }

                for(var i=0;i<8;i++)
                {
                    savedAnimals.animals.push(data.animals[i]);
                }

                console.log(listZip);
                saveAnimals(savedAnimals);
                displayAnimal(data);
            });
        });
    });
    
    
});
    
}

//Function that displays the data retrueved
function displayAnimal(animals)
{

    for(var i =0;i<8;i++)
    {
       
        //work in progress, may need to come up with easier image solution

        
        if(animals.animals[i].photos.length>0)
        {
            var imgUrl = animals.animals[i].photos[0].small;
            var img = document.getElementById("img"+i);
            img.classList = "rounded-t-lg";
            img.setAttribute("src",imgUrl);
        }
        else
        {
            var img = document.getElementById("img"+i);
            img.classList = "rounded-t-lg";
            img.setAttribute("src","./assets/photos/stock.jpg");
        }

        //Displays Names
        var name = animals.animals[i].name;
        var titleName = document.getElementById("name"+i);
        titleName.classList="text-gray-900 text-xl font-medium mb-2";
        titleName.textContent = "Name: "+name;
    
        //Displays Species
        var type = animals.animals[i].species;
        var typeName = document.getElementById("type"+i);
        typeName.classList="text-gray-900 text-xl font-medium mb-2";
        typeName.textContent = "Species: "+type;
    
        //Displays Breeds
        var breed = animals.animals[i].breeds.primary;
        var breedType = document.getElementById("breed"+i);
        breedType.classList="text-gray-900 text-xl font-medium mb-2";
        breedType.textContent = "Breed: "+breed;
    
        //Displays Locationn
        var city = animals.animals[i].contact.address.city;
        var location = document.getElementById("city"+i);
        location.classList="text-gray-900 text-xl font-medium mb-2";
        location.textContent = "City: "+city;
    
    }
    
}
    
    
   
    //function to call the zip code api and get the distance between two zip codes
    function distanceCalculator(userCode,dataCode,i)
    {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '350fbdca79msh63c7c48f0c42238p142045jsn08f19c2253ed',
                    'X-RapidAPI-Host': 'redline-redline-zipcode.p.rapidapi.com'
                }
            };
            
            fetch("https://redline-redline-zipcode.p.rapidapi.com/rest/distance.json/"+userCode+"/"+dataCode+"/mile", options)
            .then(function(response){
                response.json().then( function(data){    
                    console.log(data);
                    displayDistance(data,i)
                });
            });
    }
    
    
    function displayDistance(data,i)
    {
        var zip = document.getElementById("zip"+i);
        zip.classList="text-gray-900 text-xl font-medium mb-2";
        zip.textContent = "Distance: "+ data.distance+" Mi.";
    }


    
    //save search result
    function saveAnimals(data)
    {
        localStorage.setItem('animals',JSON.stringify(data));
    }
    //load saved search in local storage
    function loadAnimals()
    {
        var loadAnimals = (localStorage.getItem('animals'));
        console.log((JSON.parse(loadAnimals)));
        displayAnimal(JSON.parse(loadAnimals));
    }
    

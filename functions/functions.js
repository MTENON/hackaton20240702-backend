function checkBody(obj, array) {
    for (let i = 0; i < array.length; i++) {
        if (obj[array[i]] != null && obj[array[i]] != undefined) {
        } else {
            return false
        }
    }
    return true
}

//Vérifie si l'array est vide ou non
//On cherche à vérifier si une donnée existe ou non dans un db.find()
function checkArray(array) {
    if (array.length === 0) {
        return true
    } else {
        return false
    }
}

arrayTestToCompare = [
    {
        "_id": "6683b9cf7ba058ef4374cf00",
        "departure": "Lyon",
        "arrival": "Paris",
        "date": "2024-07-02T23:34:43.309Z",
        "price": 121
    },
    {
        "_id": "6683b9cf7ba058ef4374cea2",
        "departure": "Marseille",
        "arrival": "Lyon",
        "date": "2024-07-02T08:44:10.403Z",
        "price": 30
    },
    {
        "_id": "6683b9cf7ba058ef4374cea4",
        "departure": "Marseille",
        "arrival": "Lyon",
        "date": "2024-07-02T09:17:39.868Z",
        "price": 135
    },
    {
        "_id": "6683b9cf7ba058ef4374ceb4",
        "departure": "Marseille",
        "arrival": "Lyon",
        "date": "2024-07-02T11:27:40.092Z",
        "price": 104
    },
]

const arrayToFilter = [
    {
        "_id": "6684702285579a2110fe29c5",
        "departure": "Lyon",
        "arrival": "Paris",
        "date": "2024-07-02T23:34:43.309Z",
        "price": 121,
        "trip": "6683b9cf7ba058ef4374cf00",
        "booked": false,
        "__v": 0
    },
    {
        "_id": "6684704385579a2110fe29c9",
        "departure": "Bruxelles",
        "arrival": "Marseille",
        "date": "2024-07-02T23:41:40.853Z",
        "price": 139,
        "trip": "6683b9cf7ba058ef4374cf03",
        "booked": false,
        "__v": 0
    }
]

//filterObjectArray -> test deux array d'objets par id.
//searchToFilter -> Trip
//cartToCompare -> Cart
//Verifie si les objets dans searchToFilter (venant de Trip) sont déjà connus dans cartToCompare
//Renvoie un objet filtré de searchToFilter avec seulement les éléments non filtrés
function filterObjectArray(array, anotherOne) {

    let filteredArray = array.filter(function (array_el) {
        return anotherOne.filter(function (anotherOne_el) {
            return anotherOne_el.trip == array_el._id;
        }).length == 0
    });

    return filteredArray

}

// console.log(filterObjectArray(arrayTestToCompare, arrayToFilter));

module.exports = { checkBody, checkArray, filterObjectArray };
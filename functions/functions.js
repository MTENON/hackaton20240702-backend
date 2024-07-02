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

module.exports = { checkBody, checkArray };
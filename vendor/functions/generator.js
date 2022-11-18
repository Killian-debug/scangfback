/**
 * 
 * @param {Array} array 
 * @returns Number
 */
 exports.generateur = (array) => {
    let index =  Math.floor(Math.random() * array.length);
    return array[index];
}

/**
 * 
 * @returns String
 */
exports.generateRef = () => {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#€£$%&*(+-?)ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var refLength = 6;
    var ref = "";
    for(var i = 0; i < refLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        ref += chars.substring(randomNumber, randomNumber + 1);
    }
    return ref;
}
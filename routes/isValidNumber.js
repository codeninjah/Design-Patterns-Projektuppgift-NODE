//Följande måste lösas
function isValidNumber(num) {
    return typeof num === 'number' && !isNaN(num);
}

module.exports = {
    isValidNumber
}
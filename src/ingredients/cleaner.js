function cleaner(text) {
    let ingredientsList = text.split(',');

    ingredientsList= ingredientsList.map(x => x.trim().toLowerCase().replace(/[^0-9A-Za-z\s+()-]/g, ''));

    return ingredientsList;
}
module.exports = cleaner;
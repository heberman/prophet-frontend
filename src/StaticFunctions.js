
function formatPrice(val) {
    return "$" + (Math.round(val * 100) / 100).toFixed(2);
}

function convertShares(numShares) {
    if (numShares >= 0)
        return "BUY " + numShares;
    
    return "SELL " + numShares*-1;
}

function getDaysAgo(days) {
    const daysAgo = new Date(Math.round((new Date().getTime() - (days * 24 * 60 * 60 * 1000) - 30000) / 60000) * 60000);
    return daysAgo;
}

exports.formatPrice = formatPrice;
exports.convertShares = convertShares;
exports.getDaysAgo = getDaysAgo;

function formatPrice(val) {
    return "$" + (Math.round(val * 100) / 100).toFixed(2);
}

function convertShares(numShares) {
    if (numShares >= 0)
        return "BUY " + numShares;
    
    return "SELL " + numShares*-1;
}

exports.formatPrice = formatPrice;
exports.convertShares = convertShares;
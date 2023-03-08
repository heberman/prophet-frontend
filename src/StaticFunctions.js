
function formatPrice(val) {
    return "$" + (Math.round(val * 100) / 100).toFixed(2);
}

function convertShares(numShares) {
    if (numShares >= 0)
        return "BUY " + numShares;
    
    return "SELL " + numShares*-1;
}

function getDaysAgo(days) {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert timezone offset to milliseconds
    const easternTimezoneOffset = -5 * 60 * 60 * 1000; // Eastern Timezone is UTC-4
    
    const daysAgo = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000) + timezoneOffset + easternTimezoneOffset);
    
    return daysAgo;
}

exports.formatPrice = formatPrice;
exports.convertShares = convertShares;
exports.getDaysAgo = getDaysAgo;

export function formatPrice(val) {
    return Number(val).toLocaleString("en-US", { style: 'currency', currency: "USD", currencyDisplay: "narrowSymbol"});
}

export function convertShares(numShares) {
    if (numShares >= 0)
        return "BUY " + numShares;
    
    return "SELL " + numShares*-1;
}

export function getDaysAgo(days) {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert timezone offset to milliseconds
    const easternTimezoneOffset = -5 * 60 * 60 * 1000; // Eastern Timezone is UTC-4
    
    const daysAgo = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000) + timezoneOffset + easternTimezoneOffset);
    
    return daysAgo;
}

export function formatValueData(valueData) {
    let data = []
    valueData.forEach(entry => {
        const newEntry = {
            time: new Date(entry.date).toLocaleString(),
            Value: Math.round(entry.totalValue * 100) / 100
        }
        data = [newEntry, ...data];
    });
    return data;
}
const toCurrency = (amount, currency) => {
    return amount.toLocaleString("en-NG", { style: "currency", currency })
}

export default toCurrency;
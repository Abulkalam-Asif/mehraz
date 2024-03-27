const mapCurrencyCitiesWithNames = (currencies, cities) => {
  return currencies.map(currency => {
    const currencyCities = currency.cities.map(currencyCity => {
      const city = cities.find(city => city.id === currencyCity);
      return { id: city.id, name: city.name };
    });
    return { ...currency, cities: currencyCities };
  });
};

export default mapCurrencyCitiesWithNames;

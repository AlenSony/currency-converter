let apiKey = '48a2a6831552424bd07def7b'; // Your real API key
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const to_list = document.getElementById("to-inputs");
const from_list = document.getElementById("from-inputs");
let result = document.getElementById("result-box");

let allCurrencyCodes = [
  'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD',
  'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF',
  'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BTN', 'BWP',
  'BYN', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF',
  'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE',
  'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB',
  'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD',
  'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HTG', 'HUF', 'IDR',
  'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY',
  'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD',
  'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD',
  'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR',
  'MVR', 'MWK', 'MXN', 'MXV', 'USD'
];

// Populate the dropdowns
allCurrencyCodes.forEach((currency) => {
  let option1 = document.createElement("option");
  option1.value = currency;
  option1.text = currency;
  to_list.add(option1);

  let option2 = document.createElement("option");
  option2.value = currency;
  option2.text = currency;
  from_list.add(option2);
});

// Set default currencies
from_list.value = "USD";
to_list.value = "INR";

let convertCurrency = () => {
  const amount = document.querySelector("#input-container").value.trim();
  if (amount.length === 0 || isNaN(amount)) {
    result.style.visibility = "visible";
    result.value = "Please enter a valid amount.";
    result.style.color = "red";
    return;
  }

  result.style.color = "black"; // Reset color
  const fromCurrency = from_list.value;
  const toCurrency = to_list.value;

  fetch(api)
    .then((resp) => resp.json())
    .then((data) => {
      let fromExchangeRate = data.conversion_rates[fromCurrency];
      let toExchangeRate = data.conversion_rates[toCurrency];

      if (fromExchangeRate === undefined || toExchangeRate === undefined) {
        result.style.visibility = "visible";
        result.value = "Currency not supported.";
        result.style.color = "red";
        return;
      }

      const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
      result.style.visibility="visible";
      result.style.color = "rgb(0, 255, 0)";
      result.value = `${amount} ${fromCurrency} ~ ${convertedAmount.toFixed(2)} ${toCurrency}`;
    })
    .catch((error) => {
      result.style.visibility="visible";
      result.value = "Error fetching exchange rates.";
      result.style.color = "red";
      console.error(error);
    });
};
const swap = (to, from) => {
  let temp = to.value;
  to.value = from.value;
  from.value = temp;
};

// Event listener for swap button
document.querySelector(".toggle-button").addEventListener("click", () => swap(to_list, from_list));

// Listen for button click
document.querySelector("#convert-button").addEventListener("click", convertCurrency);

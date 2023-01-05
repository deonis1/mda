# mda

MDA JS API Library

A JavaScript library for accessing stock data from Alpha Vantage and Twelvedata APIs.
# Installation

To install the library, run the following command:

npm install mda

# Usage

In order to use the library, you will need to obtain API keys from Alpha Vantage and Twelvedata.

To use the library, require it in your project and create a new instance of the mda class:

const mda = require('mda-js-api');

const api =  mda();

You can then set the API keys and default symbol as follows:

api.alfav_key = 'your_alphavantage_key';
api.twelve_key = 'your_twelvedata_key';
api.symbol = 'your_default_symbol';

# Alpha Vantage

To fetch stock data from Alpha Vantage, use the getStockAPV method:

const data = await api.getStockAPV({
  symbol: 'your_symbol',
  range: 'TIME_SERIES_INTRADAY',
  interval: '60'
});

The getStockAPV method takes an optional object with the following properties:

    symbol: The symbol of the stock to fetch data for (defaults to the default symbol set on the mda instance).
    range: The range of data to fetch. Possible values are TIME_SERIES_INTRADAY, TIME_SERIES_DAILY, TIME_SERIES_DAILY_ADJUSTED, TIME_SERIES_WEEKLY, TIME_SERIES_WEEKLY_ADJUSTED, TIME_SERIES_MONTHLY, and TIME_SERIES_MONTHLY_ADJUSTED.
    interval: The interval of data to fetch. Possible values are 1min, 5min, 15min, 30min, 60min, daily, weekly, and monthly.

The method returns an object with the fetched data.
Twelvedata

To fetch stock data from Twelvedata, use the getStock12D method:

const data = await api.getStock12D({
  symbol: 'your_symbol',
  startdate: '2021-10-14',
  interval: '1h'
});

The getStock12D method takes an optional object with the following properties:

    symbol: The symbol of the stock to fetch data for (defaults to the default symbol set on the mda instance).
    startdate: The start date for the data to fetch, in the format YYYY-MM-DD.
    interval: The interval of data to fetch. Possible values are 1min, 5min, 15min, 30min, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 1w, and 1M.

The method returns an object with the fetched data.


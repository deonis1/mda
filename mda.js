/*jshint esversion: 8 */

var fetch = require("node-fetch");

function mda() {}

mda.symbol = "SPY";
mda.date = null;
mda.finhub_key = "";
mda.alfav_key = "";
mda.twelve_key = "";

mda.round_date = function (dateOBJ, minutes) {
    let ms = 1000 * 60 * minutes; // convert minutes to ms
    return new Date(Math.round(dateOBJ.getTime() / ms) * ms);
};

mda.getStockAPV = async function (
    opt = {
        symbol: "SPY",
        range: "TIME_SERIES_INTRADAY",
        interval: "60min"
    }
) { 
    const setting = {
        method: "GET",
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0",
            "Upgrade-Insecure-Requests": "1",
        }}
    var url =
        "https://www.alphavantage.co/query?function=" +
        opt.range +
        "&symbol=" +
        opt.symbol +
        "&interval=" +
        opt.interval +
        "&slice=year1month12&apikey=" +
        this.alfav_key;
        
    try {
        response = await fetch(url, setting);
        let data = await response.json();
        if (data) {
            var timeser = Object.keys(data).filter((k) => {
                return k.includes("Time");
            });
            return data[timeser];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

// Twelvedata: https://api.twelvedata.com/time_series?symbol=MSFT&interval=1h&format=json&start_date=2021-10-01&apikey=d715ff181d274a7093c9ee00e3e00487
mda.getStock12D = async function (
    opt = {
        symbol: "SPY",
        startdate: "2021-10-14",
        interval: "1h"
    }
) {
    var url = `https://api.twelvedata.com/time_series?symbol=${opt.symbol}&interval=${opt.interval}&format=json&start_date=${opt.startdate}&apikey=${this.twelve_key}`;
    const setting = {
        method: "GET",
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0",
            "Upgrade-Insecure-Requests": "1",
        },
    };
    try {
        response = await fetch(url, setting);
        let data = await response.json();
        if (data) {
            return data;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

mda.parsefinhub = async function (data, opt) {
    if (data.s != "no_data") {
        if (data) {
            var parsed = {
                raw: data
            };
            parsed.parsed = data.t.map((val, i) => {
                return {
                    date: mda.round_date(
                        new Date(val * 1000),
                        opt.interval.replace("m", "")
                    ),
                    stamp: val,
                    open: data.o[i],
                    close: data.c[i],
                    high: data.h[i],
                    low: data.l[i],
                    volume: data.v[i],
                };
            });
            return parsed;
        }
    } else {
        return false;
    }
};

// Finhub: https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=60&from=1631022248&to=1631627048&token=c5p0q7aad3idr38u1asg
mda.getStockFH = async function (
    opt = {
        symbol: "SPY",
        range: 1,
        interval: "60"
    }
) {
    var end = Math.round(new Date() / 1000);
    var start = end - 3600 * 24 * opt.range;
    var url = `https://finnhub.io/api/v1/stock/candle?symbol=${opt.symbol}&resolution=${opt.interval}&from=${start}&to=${end}&token=${this.finhub_key}`;
    const setting = {
        method: "GET",
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0",
            "Upgrade-Insecure-Requests": "1",
        },
    };
    try {
        response = await fetch(url, setting);
        let data = await response.json();

        if (data) {
            return await mda.parsefinhub(data, opt);
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

//test function
mda.test = async function () {
    mda.date = 1656633600;
    mda.symbol = "AAPL";
    mda.getStock12D().then((a) => {
        console.log(a);
    });
   
}

try {
    module.exports = exports = mda;
} catch (e) {}



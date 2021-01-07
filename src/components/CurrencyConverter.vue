<template>
  <div>
    <div class="container">
      <select v-model="fromCurrency">
        <option v-for="currency in currencyList.filter(currency => currency !== this.toCurrency)" v-bind:value="currency" v-bind:key="currency">{{ currency }}</option>
      </select>
      <input min="0" v-model="inputNumber" type="number" placeholder="Amount to convert">
    </div>
    <div class="container">
      <button v-on:click="swap">Swap</button>
      <button v-on:click="getConversion">Convert</button>
    </div>
    <div class="container">
      <select v-model="toCurrency">
        <option v-for="currency in currencyList.filter(currency => currency !== this.fromCurrency)" v-bind:value="currency" v-bind:key="currency">{{ currency }}</option>
      </select>
      <input min="0" v-model="result" type="number" placeholder="result">
    </div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    [
      {
        url: 'https://api.exchangeratesapi.io/latest',
        extractMethod: data => Object
          .keys(data.rates)
            .map(currency => ({
              currency,
              rate: data.rates[currency],
              exchangeCurrency: 'EUR'
            })).concat([{ currency: 'EUR', rate: 1, exchangeCurrency: 'EUR'}])
      },
      {
        url: 'https://api.binance.com/api/v3/ticker/price',
        extractMethod: data => data
          .map(o => ({
            currency: o.symbol,
            rate: 1 / o.price,
            exchangeCurrency: 'USD'
          }))
      }
    ].map(request => {
      this.$http
      .get(request.url)
      .then(response => {
        const extractedResponse = request.extractMethod(response.data);
        const newRateMap = {}
        extractedResponse.forEach(o => newRateMap[o.currency] = o);
        this.rateMap = Object.assign(this.rateMap, newRateMap);
        this.currencyList = this.currencyList.concat(extractedResponse.map(o => o.currency));
      })
    })
  },
  methods: {
    swap: function () {
      const oldToCurrency = this.toCurrency;
      this.toCurrency = this.fromCurrency;
      this.fromCurrency = oldToCurrency;
      this.inputNumber = this.result;
      this.getConversion()
    },
    getConversion: function () {
      const fromRate = this.rateMap[this.fromCurrency];
      let amountToConvert;
      const USDRate = this.rateMap['USD'];
      if (fromRate.exchangeCurrency === 'USD') {
        amountToConvert = (this.inputNumber / USDRate.rate) / fromRate.rate;
      } else {
        amountToConvert = this.inputNumber / fromRate.rate;
      }
      const toRate = this.rateMap[this.toCurrency]
      if (toRate.exchangeCurrency === 'USD') {
        amountToConvert = USDRate.rate * amountToConvert;
      }
      this.result = amountToConvert * toRate.rate
      this.result = this.result.toFixed(4)

      // I tried to make an algorithm that could convert any currency dynamically.
      // It was almost working, but I decided it was overkill so I went with a simpler implementation
      // let currentCurrency = this.fromCurrency;
      // let result = this.inputNumber;
      // while (currentCurrency !== this.toCurrency) {
      //   const nextRate = this.rateMap[currentCurrency];
      //   if (!nextRate) {
      //     const finalExchange = Object.values(this.rateMap).find(o => o.currency === this.toCurrency && o.exchangeCurrency === currentCurrency)
      //     if (finalExchange) {
      //       currentCurrency = finalExchange.currency;
      //       result = result * finalExchange.rate;
      //     } else {
      //       throw new Error('Not enought data to translate exchange');
      //     }
      //   } else if (nextRate.exchangeCurrency === this.toCurrency) {
      //     currentCurrency = nextRate.exchangeCurrency;
      //     result = result * nextRate.rate;
      //   } else {
      //     currentCurrency = nextRate.exchangeCurrency;
      //     result = result / nextRate.rate;
      //   }
      //   //eslint-disable-next-line no-debugger
      //   debugger;
      // }
      // this.result = result;
    }
  },
  data: function () {
    return {
      inputNumber: undefined,
      result: undefined,
      fromCurrency: 'USD',
      toCurrency: 'DKK',
      rateMap: [],
      currencyList: []
    }
  },
  name: 'CurrencyConverter'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select {
  width: 110px;
}

input,
select,
button {
  margin: 8px;
  padding: 8px;
  font-size: 1.4em;
  background-color: #3c3c3c;
  border-radius: 4px;
  border: none;
  color: white;
}

.container {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}
</style>

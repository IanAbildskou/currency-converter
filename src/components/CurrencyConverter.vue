<template>
  <div>
    <div>
      <div class="md-layout md-alignment-top-center md-gutter">
        <div class="md-layout-item md-small-size-90 md-medium-size-90 md-large-size-80 md-xlarge-size-70">
          <div class="md-layout md-gutter">
            <div style="max-width:150px;" class="md-layout-item">
              <md-autocomplete v-model="fromCurrency" name="fromCurrency" id="fromCurrency" :md-options="currencyList">
                <label>Currency</label>
              </md-autocomplete>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Input</label>
                <md-input v-model="inputNumber" type="number"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-alignment-top-center">
            <md-button v-on:click="getConversion" class="md-raised md-primary">Convert</md-button>
          </div>
          <div class="md-layout md-gutter">
            <div style="max-width:150px;" class="md-layout-item">
              <md-autocomplete v-model="toCurrency" name="toCurrency" id="toCurrency" :md-options="currencyList">
                <label>Currency</label>
              </md-autocomplete>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Result</label>
                <md-input v-model="result" type="number"></md-input>
              </md-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.rateMap = {};
    this.currencyList = [];
    [
      {
        url: 'https://api.exchangeratesapi.io/latest',
        extractMethod: data => Object
          .keys(data.rates)
            .map(currency => ({
              currency,
              rate: data.rates[currency],
              exchangeCurrency: 'EUR'
            }))
            .concat([{ currency: 'EUR', rate: 1, exchangeCurrency: 'EUR' }])
      },
      {
        url: 'https://api.binance.com/api/v3/ticker/price',
        extractMethod: data => data
          .map(o => ({
            currency: o.symbol,
            rate: o.price,
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
    getConversion: function () {
      let currenctCurrency = this.fromCurrency;
      let result = this.inputNumber;
      while (currenctCurrency !== this.toCurrency) {
        console.log(currenctCurrency);
        console.log(result);
        const nextRate = this.rateMap[currenctCurrency];
        console.log(nextRate);
        currenctCurrency = nextRate.exchangeCurrency;
        result = result * nextRate.rate;
      }
      this.result = result;
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

</style>

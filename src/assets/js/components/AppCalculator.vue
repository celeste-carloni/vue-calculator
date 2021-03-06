
<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="app-calculator relative" v-if="operatorsList">

      <div class="calculator-loading-state flex items-center justify-center absolute w-full h-full text-white font-bold" v-show="loading">
        calculating...
      </div>

      <!-- Results -->
      <div class="flex px-0.5">
        <div class="calculator-value bg-white border border-grey-light h-10 w-full px-3 flex items-center justify-end">
          <span> {{value}} </span>
        </div>
      </div>
      <!-- end: Results -->

      <!-- clear -->
      <div class="flex h-10 w-full">
        <!-- Top Operators -->
        <ul class="flex list-reset" v-if="topOperators">
          <li v-for="(operator,index) in topOperators" :key="index">
            <button 
              class="calculator-button bg-grey-dark"
              @click="calculate(operator.operation)"
              disabled
            > 
              {{operator.symbol}} 
            </button>
          </li>
        </ul>
        <button class="calculator-button bg-orange text-white text-sm flex-1" @click="clear"> Clear </button>
      </div>

      <div class="flex">
        <!-- Left Operators -->
        <div class="flex flex-col">
          <ul class="list-reset" v-if="leftOperators">
            <li v-for="(operator,index) in leftOperators" :key="index">
              <button 
                class="calculator-button bg-grey-dark"
                @click="calculate(operator.operation)"
                :disabled="isBtnDisabled(operator.operation)"
              > 
                {{operator.symbol}} 
              </button>
            </li>
          </ul>
        </div>
        <!-- end: Left Operators -->

        <!-- Numbers -->
        <div class="flex">
          <ul class="list-reset flex flex-wrap w-30" v-if="leftOperators">
            <li v-for="(n,index) in numbers" :key="index">
              <button 
                class="calculator-button bg-grey-light"
                @click="setValue(n)"
              > 
                {{n}} 
              </button>
            </li>
            <li>
              <button class="calculator-button bg-grey-light" @click="setValue('.')"> 
                .
              </button>
            </li>
            <li>
              <button class="calculator-button bg-blue text-white" @click="calculate('equal')"> 
                = 
              </button>
            </li>
          </ul>
        </div>
        <!-- end: Numbers -->

        <!-- Right Operators -->
        <div class="flex flex-col">
          <ul class="list-reset" v-if="rightOperators">
            <li v-for="operator in rightOperators" :key="operator.operation">
              <button class="calculator-button bg-grey-dark" @click="calculate(operator.operation)"> 
                {{operator.symbol}} 
              </button>
            </li>
          </ul>
        </div>
        <!-- end: Right Operators -->

      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'AppCalculator',
  computed:{
    ...mapGetters([
      "operatorsList",
      "result"
    ]),
    rightOperators(){
      if(this.operatorsList)
        return this.operatorsList.slice(0, 4);
    },
    leftOperators(){
      if(this.operatorsList){
        const lastIndex = this.operatorsList.length - 2;
        return this.operatorsList.slice(4, lastIndex);
      }
    },
    topOperators(){
       if(this.operatorsList){
        return this.operatorsList.slice( -2);
      }
    },
    showOp2(){
      return this.isSecondOperand && this.op2.length > 0;
    }
  },
  data(){
    return{
      numbers: [ '7', '8', '9', '4', '5', '6', '1', '2', '3', '0'],
      op1: '',
      op2: '',
      isSecondOperand: false,
      loading: false,
      operation: '',
      value: 0
    }
  },
  beforeCreate(){
    this.$store.dispatch('getOperators');
  },
  methods:{
    calculate(operation){

      this.isSecondOperand = true;

      if(operation !== 'equal')
        this.operation = operation;

      if(this.op1 ==='' || this.op2 === '')
        return false;

      let query = this.operation + '?op1=' + this.op1 + '&op2=' + this.op2;
      this.loading = true;
      this.$store.dispatch('getResult', query)
        .then(() => { 
          this.loading = false; 
        });
    },
    clear(){
      this.op1 = '';
      this.op2 = '';
      this.operation = '';
      this.isSecondOperand= false;
      this.value = 0;
    },
    isBtnDisabled(operation){
      return operation !== 'power'
    },
    setValue(n){
      if(this.isSecondOperand){
        this.op2 +=  n;
        this.value = this.op2;
      }
      else{
        this.op1 +=  n;
        this.value = this.op1;
      }
    }
  },
  watch: {
    result: function(val) {
        this.op1 = this.result;
        this.op2 = '';
        this.isSecondOperand = false;
        this.value = this.result;
    }
  }
}
</script>

<style scoped>
  .calculator-loading-state{
    background-color:rgba(0,0,0,0.6);
  }
</style>

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import jsx from './index'

var {div, p, span, input, textarea} = jsx

var TestBind = {
  render (h) {
    jsx.use(h)

    return span('test bind')
  }
}

var TestInput = {
  model: {
    prop: 'testValue',
    event: 'testInput',
  },
  props: {
    testValue: String,
  },
  render () {
    var me = this

    return input({
      dp_value: this.testValue,
      o_input (e) {
        me.$emit('testInput', e.target.value)
      }
    })
  }
}

var HelloWorld = {
  props: {
    msg: String
  },
  data () {
    return {
      inputVal: '123',
    }
  }, 
  components: {
    TestBind,
    TestInput,
  },
  render (h) {
    jsx.use(h)

    var test = jsx.bind('test-bind')
    var testInput = jsx.bind('test-input')

    var $pnode = p({
      s_color: 'red',
    }, this.msg)

    return jsx.create('div.hello + world', 
      this.msg, 
      $pnode,
      test(),
      input({
        vmodel: [this, 'inputVal'],
      }),
      textarea({
        vif: false,
        vmodel: [this, 'inputVal']
      }),
      testInput({
        vmodel: [this, 'inputVal', 'testValue', 'testInput']
      })
    )
  }
}

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.hello{
  font-size: 30px;
}
</style>

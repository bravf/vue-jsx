<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import jsx from './index'

const {p, span, input, textarea} = jsx

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
  render (h) {window._h1 = h
    console.log('test input render begin')
    
    jsx.use(h)
    const me = this

    const $node = input({
      domProps_value: this.testValue,
      on_input (e) {
        me.$emit('testInput', e.target.value)
        me.$emit('testEvent', e.target.value)
      }
    })

    console.log('test input render end')

    return $node
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
  render (h) {window._h2 = h
    console.log('hello world render begin')
    jsx.use(h)

    const Test = jsx.bind('test-bind')
    const TestInput = jsx.bind('test-input')

    const $pnode = p({
      style_color: 'red',
    }, this.msg)

    const $node = jsx.create('div', {classes: 'hello world'},
      this.msg, 
      $pnode,
      Test(),
      input({
        vmodel: [this, 'inputVal'],
      }),
      textarea({
        vif: false,
        vmodel: [this, 'inputVal']
      }),
      TestInput({
        vmodel: [this, 'inputVal', 'testValue', 'testInput'],
        'on_testEvent' (value) {
          console.log(value)
        }
      })
    )
    console.log('hello world render end')
    return $node
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

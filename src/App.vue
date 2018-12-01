<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import jsx from './index'

var {div, p, span} = jsx

var TestBind = {
  render (h) {
    jsx.use(h)

    return span('test bind')
  }
}

var HelloWorld = {
  props: {
    msg: String
  },
  components: {
    TestBind,
  },
  render (h) {
    jsx.use(h)

    var test = jsx.bind('test-bind')

    var $pnode = p({
      s_color: 'red',
    }, this.msg)

    return jsx.create('div.hello + world', 
      this.msg, 
      $pnode,
      test(),
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

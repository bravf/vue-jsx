# vue-jsx

## 目标
简化 vue createElement 写法，从而可以手写 render vnode。


## 安装

```
npm install --save vue-jsx
```

## 使用

```javascript
import jsx from 'vue-jsx'

var HelloWorld = {
  props: {
    msg: String,
  },
  render (h) {
    jsx.use(h)
    render jsx.create('div.hello', {s_color:'red'}, this.msg)
  }
}
```

## Api

``` javascript
1、jsx.use
  描述：指定依赖的 vue h
  用法：jsx.use(h)

2、jsx.create
  描述：创建 vnode 节点
  用法：
    jsx.create('div')
    jsx.create('div.hello')
    jsx.create('div.hello + world')
    jsx.create('div', {
      // c 表示 class
      c_hello: true,
      
      // s 表示 style 
      s_color: 'red',

      // a 表示 attrs
      a_id: 'my_id',

      // p 表示 props
      p_msg: 'hello, world',

      // dp 表示 domProps
      dp_value: 'input value',

      // o 表示 on
      o_click () {},

      // no 表示 nativeOn
      no_click () {},
    })
    jsx.create('div', {s_color:'red'}, 'nihao', 'nihao2')

3、jsx.bind
  描述：构建快捷方式
  用法：
    var div = jsx.bind('div')
    var helloWorld = jsx.bind('hello-world')

    var App = {
      render (h) {
        jsx.use(h)

        return div({s_color:'red'}, 
          helloWorld()
        )
      }
    }
  备注：实际上 jsx 内置 bind 了大部分常用 dom 元素，比如 a,b,button,dd,div,dl,dt,em,form,i,iframe,img,input,textarea,label,li,ol,optgroup,option,p,select,span,table,th,thead,tbody,tr,td,col,colgroup,ul,h1,h2,h3,h4,h5,h6
```

## 演示
``` javascript
import jsx from 'vue-jsx'

var {div, h2, p, span, img} = jsx

var HelloWord = {
  props: {
    data: Array,
  },
  render (h) {
    jsx.use(h)

    return div('.hello-world'
      h2('hello-world-title'),
      div('.hello-world-list'
        ...this.data.map(item => {
          return div('.hello-world-item',
            img({a_src: item.imgSrc}),
            p(item.content),
          )
        })
      )
    )
  }
}
```

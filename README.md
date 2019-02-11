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

const HelloWorld = {
  props: {
    msg: String,
  },
  render (h) {
    jsx.use(h)
    render jsx.create('div', {
      style_color:'red', 
      classes: 'hello world',
    }, this.msg)
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

    // class 的简写模式
    jsx.create('div.hello + world')
    
    jsx.create('div', {
      // vif，就是 v-if
      vif: false,

      // vmodel，就是 v-model
      // 最多支持4个参数，vmodel: [this, 'val' ,'modelProp', 'modelEvent']
      vmodel: [this, 'val'],

      classes: 'hello world',
      class_hello: true,
      style_color: 'red',
      attrs_id: 'my_id',
      props_msg: 'hello, world',
      domProps_value: 'input value',
      on_click () {},
      nativeOn_click () {},
    })

    jsx.create('div', {style_color:'red'}, 'nihao', 'nihao2')

3、jsx.bind
  描述：构建快捷方式
  用法：
    const div = jsx.bind('div')
    const HelloWorld = jsx.bind('hello-world')

    const App = {
      render (h) {
        jsx.use(h)

        return div({style_color:'red'}, 
          HelloWorld()
        )
      }
    }
  备注：实际上 jsx 内置 bind 了大部分常用 dom 元素，比如 a,b,button,dd,div,dl,dt,em,form,i,iframe,img,input,textarea,label,li,ol,optgroup,option,p,select,span,table,th,thead,tbody,tr,td,col,colgroup,ul,h1,h2,h3,h4,h5,h6
```

## 演示
``` javascript
import jsx from 'vue-jsx'

const {div, h2, p, span, img} = jsx

const HelloWord = {
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
            img({attrs_src: item.imgSrc}),
            p(item.content),
          )
        })
      )
    )
  }
}
```

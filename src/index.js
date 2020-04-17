var jsx = {
  h () {},

  getProp (context, prop) {
    var props = prop.split('.'), i
    while ( (i = props.shift()) ){
      context = context[i]
    }
    return context
  },
  setProp (context, prop, value) {
    var props = prop.split('.'), i
    while ( (i = props.shift()) ){
      if (!props.length){
        break
      }
      context = context[i]
    }
    context[i] = value
  },
  use (h) {
    jsx.h = h
  },
  create (...params) {
    var node = {
      tag: 'div', 
      props: {
        'class': {},
        style: {},
        attrs: {},
        props: {},
        domProps: {},
        on: {},
        nativeOn: {},
      }, 
      children: [],
    }
    var plen = params.length
    if (!plen){
      return node
    }

    if (plen > 1){
      var second = params[1]
      var i = 1
      var secondIsObjeect = Object.prototype.toString.call(second).slice(8, -1) === 'Object'

      // 如果第二个参数是 props
      if (secondIsObjeect && !('componentInstance' in second) ){
        // 如果有vif===false，直接返回null
        if (second['vif'] === false){
          return null
        }

        var table = {
          c: 'class',
          s: 'style', 
          a: 'attrs', 
          p: 'props', 
          dp: 'domProps',
          o: 'on',
          no: 'nativeOn',
        }

        for (var k in second){
          // 如果值是null，则过滤
          if (second[k] === null){
            continue
          }

          if (k.includes('_')){
            var [a, b] = k.split('_')
            var aa = table[a] || a

            node['props'][aa][b] = second[k]
          }
          else {
            node['props'][k] = second[k]
          }
        }
        
        i = 2
      }

      node.children.push(...params.slice(i))
    }

    var first = params[0]
    if (first.includes('.')){
      var [t, s] = first.split('.')
      node['tag'] = t
      
      s.split('+').forEach(i => {
        node['props']['class'][i.trim()] = true
      })
    }
    else {
      node['tag'] = first
    }

    //- 处理 classes
    if ('classes' in node.props){
      node.props.classes.split(' ').forEach(cls => {
        node.props['class'][cls] = true
      })

      delete node.props['classes']
    }

    //- 处理vmodel
    if ('vmodel' in node.props){
      var [context, model, modelProp, modelEvent] = node.props['vmodel']
      var tag = node.tag
      var props = node.props

      var inputType = props['attrs']['type'] || props['domProps']['type'] || 'text'
      var isInput = tag === 'input'
      var isText = (isInput && ['text', 'hidden', 'password', 'number'].includes(inputType)) || 
        (tag === 'textarea')
      var isRadio =  isInput && (inputType === 'radio')
      var isCheckbox = isInput && (inputType === 'checkbox')
      var isSelect = tag === 'select'

      if (isText){
        props['domProps']['value'] = jsx.getProp(context, model)
        props['on']['input'] = e => {
          jsx.setProp(context, model, e.target.value)
        }
      }
      else if (isRadio){
        props['domProps']['checked'] = props['attrs']['value'] === jsx.getProp(context, model) ? true : false
        props['on']['change'] = e => {
          jsx.setProp(context, model, e.target.value)
        }
      }
      else if (isCheckbox){
        //- 如果model是array
        if (Array.isArray(jsx.getProp(context, model))){
          var value = props['attrs']['value']
          var isChecked = props['domProps']['checked'] = jsx.getProp(context, model).includes(value)

          props['on']['change'] = () => {
            if (isChecked){
              jsx.getProp(context, model).splice(jsx.getProp(context, model).indexOf(value), 1)
            }
            else {
              jsx.getProp(context, model).push(value)
            }
          }
        }
        else {
          props['domProps']['checked'] = jsx.getProp(context, model) === true ? true : false
          props['on']['change'] = () => {
            jsx.setProp(context, model, !props['domProps']['checked'])
          }
        }
      }
      else if (isSelect){
        //- 如果model是array
        if (Array.isArray(jsx.getProp(context, model))){
          //- 好像有点麻烦，需要反推option children
        }
        else {
          props['domProps']['value'] = jsx.getProp(context, model)
          props['on']['change'] = e => {
            jsx.setProp(context, model, e.target.value)
          }
        }
      }
      //- 假设其他都是自定义组件
      else {
        modelProp = modelProp || 'value'
        modelEvent = modelEvent || 'input'

        props['props'][modelProp] = jsx.getProp(context, model)
        props['on'][modelEvent] = val => {
          jsx.setProp(context, model, val)
        }
      }

      delete node.props['vmodel']
    }

    // 清楚空的属性
    ['class', 'style', 'attrs', 'props', 'domProps', 'on', 'nativeOn'].forEach(key => {
      if (!Object.keys(node.props[key]).length){
        delete node.props[key]
      }
    })

    return jsx.h(node.tag, node.props, node.children)
  },
  bind (tag) {
    return (...params) => {
      if ( (typeof params[0] === 'string') && (params[0][0] === '.') ){
        params[0] = tag + params[0]
      }
      else {
        params.unshift(tag)
      }
      
      return jsx.create(...params)
    }
  }
}

'a,b,button,dd,div,dl,dt,em,form,i,iframe,img,input,textarea,label,li,ol,optgroup,option,p,select,span,table,th,thead,tbody,tr,td,col,colgroup,ul,h1,h2,h3,h4,h5,h6'.split(',').forEach(tag => {
  jsx[tag] = jsx.bind(tag)
})

export default jsx
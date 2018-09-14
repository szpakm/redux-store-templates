
## Docs & more examples

- [counter](#counter)
- [toggle](#toggle)
- [value](#value)
- [set-simple](#set-simple)
- [task-simple](#task-simple)
- [list](#list)

***

#### counter

```js
import { combineReducers } from 'redux';
import { createReducer } from 'redux-store-templates/counter';

/*
Given the following actions in application:

 { type: '[STEP] forward' }
 { type: '[STEP] backward' }
 { type: '[STEP] forward by', value: 10 }
 { type: '[STEP] backward by', value: 5 }
 { type: '[STEP] set' }
 { type: '[STEP] reset' }
*/

export default combineReducers({
  // ...
  step: createReducer({
    initial: 0,
    setOn: { type: '[STEP] set' },
    resetOn: { type: '[STEP] reset' },
    incrementByOn: { type: '[STEP] forward', payloadPath: 'value' },
    decrementByOn: { type: '[STEP] backward', payloadPath: 'value' },
    incrementOn: { type: '[STEP] forward' },
    decrementOn: { type: '[STEP] backward' }
  })
})

/*
Will produce the following store structure:

  ...,
  step: 0
*/
```

***

#### toggle

```js
import { combineReducers } from 'redux';
import { createReducer } from 'redux-store-templates/toggle';

/*
Given the following actions in application:

 { type: '[MENU] toggle' }
 { type: '[MENU] show }
 { type: '[MENU] hide' }
 { type: '[MENU] set', visible: true }
 { type: '[MENU] set default' }
*/

export default combineReducers({
  // ...
  isVisible: createReducer({
    initial: true,
    toggleOn: { type: '[MENU] toggle' },
    makeTrueOn: { type: '[MENU] show' },
    makeFalseOn: { type: '[MENU] hide' },
    setOn: { type: '[MENU] set', payloadPath: 'visible' },
    resetOn: { type: '[MENU] set default' }
  })
})

/*
Will produce the following store structure:

  ...,
  isVisible: true
*/
```

***

#### value

```js
import { combineReducers } from 'redux';
import { createReducer } from 'redux-store-templates/value';

/*
Given the following actions in application:

 { type: '[AUTH] set username', payload: 'user1' }
 { type: '[AUTH] cancel' }
 { type: '[AUTH] logout' }
*/

export default combineReducers({
  // ...
  username: createReducer({
    initial: '',
    setOn: { type: '[AUTH] set username' },
    resetOn: [
      { type:'[AUTH] cancel' },
      { type:'[AUTH] logout' }
    ]
  })
})

/*
Will produce the following store structure:

  ...,
  username: 'user1'
*/
```

***

#### set-simple

```js
import { combineReducers } from 'redux';
import { createReducer } from 'redux-store-templates/set-simple';

/*
Given the following actions in application:

 { type: '[PRODUCTS] set selection', payload: ['p1', 'p2', ...] }
 { type: '[PRODUCTS] select item', productId: 'p4' }
 { type: '[PRODUCTS] add selection', payload: ['p5', ...] }
 { type: '[PRODUCTS] remove selection', payload: ['p3']}
 { type: '[PRODUCTS] clear selection' }
*/

export default combineReducers({
  // ...
  selected: createReducer({
    initial: [],
    addOn: [
      { type: '[PRODUCTS] add selection' },
      { type: '[PRODUCTS] select item', payloadPath: 'productId' }
    ],
    setOn: { type: '[PRODUCTS] set selection' },
    removeOn: { type: '[PRODUCTS] remove selection' },
    emptyOn: { type: '[PRODUCTS] clear selection' }
  })
})

/*
Will produce the following store structure:

  ...,
  selected: ['p1', 'p2', ...]
*/
```

***

#### task-simple

```js
import { combineReducers } from 'redux';
import { createReducer } from 'redux-store-templates/task-simple';

/*
Given the following actions in application:
 { type: '[AUTH] login...' }
 { type: '[AUTH] login success' }
 { type: '[AUTH] login failed', 'message': 'incorrect password' }
*/

export default combineReducers({
  // ...
  loginRequest: createReducer({
    startOn: { type: '[AUTH] login...' },
    successOn: { type: '[AUTH] login success' },
    errorOn: { type: '[AUTH] login failed', paylaodPath: 'message' }
  })
})

/*
Will produce the following store structure:

  ...,
  loginRequest: {
    isPending: false,
    error: 'incorrect password'
  }
*/
```

***

#### list

got to main [README.md](../README.md#list)

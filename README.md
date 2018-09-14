# redux-store-templates

> **`redux-store-templates`** is a set of helpers that reduces boilerplate code needed to provide useful and commonly used patterns in designing store structure of redux based applicatons.

It's lightweight, dependency-free, can work with typescript and you can easily integrate it with your existing project as well as get rid of it.

***

### :heavy_exclamation_mark: :heavy_exclamation_mark: :heavy_exclamation_mark: This is unstable yet (heavy development in progress) :heavy_exclamation_mark: :heavy_exclamation_mark: :heavy_exclamation_mark:

***

## Example of usage

#### list

If you have the following action defined:

```js
{
  type: '[PRODUCTS] fetching success',
  payload: [
    { uuid: 'p1', name: 'product 1' },
    { uuid: 'p2', name: 'product 2' }
    // ...
  ]
}
```

Then you can use `list` helper to create reducers this way:

```js
// products/reducers.js
import { combineReducers } from 'redux';
import { createReducer } from 'redux-store-templates/list';


export default combineReducers({
  // ...
  products: createReducer({
    idName: 'uuid',
    setOn: { type: '[PRODUCTS] fetching success' }
  })
})
```

What will produce the following structure in the store:

```js
/*
  ...,
  products: {
    byId: {
      'p1': { uuid: 'p1', name: 'product 1' },
      'p2': { uuid: 'p2', name: 'product 2' }
      ...
    },
    ids: ['p1', 'p2', ...]
  }
*/
```

Then you can create selectors standard way:

```js
// products/selectors.js
import { createSelectorAll, createSelectorById } from 'redux-store-templates/list';


const selectProductsState = (state) => state.products;

/**
 * @returns {Array<ProductDefinition>}
 */
export const selectAllProducts = (state) => {
  const prouctsState = selectProductsState(state);

  return productsState.ids.map(id => productsState.byId[id]);
}

/**
 * @param {string} id - uuid of the product
 * 
 * @returns {ProductDefinition | undefined}
 */
export const selectProductById = (state, id) => {
  return selectProductsState(state).byId[id];
}
```

Or use provided helpers:

```js
// products/selectors.js
import { createSelectorAll, createSelectorById } from 'redux-store-templates/list';


const selectProductsState = (state) => state.products;

/**
 * @returns {Array<ProductDefinition>}
 */
export const selectAllProducts = createSelectorAll({
  selector: selectProductsState,
});

/**
 * @param {string} id - uuid of the product
 * 
 * @returns {ProductDefinition | undefined}
 */
export const selectProductById = createSelectorById({
  selector: selectProductsState
});
```

You can handle more actions, like:

- _adding_,
- _updating_,
- _removing_
- _clearing_

as well as define your own - what may end up in configuration like this (real example):

```js
// products/reducers.js
import { combineReducers } from 'redux';
import { createReducer } from 'redux-store-templates/list';


export default combineReducers({
  // ...
  products: createReducer({
    idName: 'uuid',
    initial: [],
    setOn: { type: '[PRODUCTS] fetching success' },
    addOn: [
      { type: '[PRODUCTS] add multiple' },
      { type: '[PRODUCTS] add one', payloadPath: 'product' }
    ],
    removeOn: { type: '[PRODUCTS] remove', payloadPath: 'ids' },
    updateOn: { type: '[PRODUCTS] update' },
    emptyOn: [
      { type: '[PRODUCTS] remove all' },
      { type: '[PRODUCTS] fetching started' },
      { type: '[PRODUCTS] fetching error' }
    ]
  })
})
```

which replaces 100+ lines reducer - this is where **`redux-store-templates`** shines. :sparkles:

***

## More examples

- [counter](docs/examples.md#counter)
- [toggle](docs/examples.md#toggle)
- [value](docs/examples.md#value)
- [set-simple](docs/examples.md#set-simple)
- [task-simple](docs/examples.md#task-simple)
- [list](#list)

***

## Documentation

todo

***

## Installation

`npm install redux-store-templates`

or

`yarn add redux-store-templates`

**Caution**

By default **`redux-store-templates`** is written in ECMAScript 2018 language standard and it is recommended that you transpile it inside your project by your own (using ex. [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)).

If you need older EcmaScript version, then import it from `es2015` directory:

```js
// import transpiled EcmaScript 2015 version
import { list } from 'redux-store-templates/es2015/list';
```


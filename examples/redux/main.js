import { compose, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import Socratic11 from '@Socratic11/core'
import ReduxStore from '@Socratic11/store-redux'
import * as Socratic11ReduxStore from '@Socratic11/store-redux'
import Dashboard from '@Socratic11/dashboard'
import Tus from '@Socratic11/tus'

import '@Socratic11/core/dist/style.css'
import '@Socratic11/dashboard/dist/style.css'

function counter (state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const reducer = combineReducers({
  counter,
  // You don't have to use the `Socratic11` key. But if you don't,
  // you need to provide a custom `selector` to the `Socratic11ReduxStore` call below.
  Socratic11: Socratic11ReduxStore.reducer,
})

let enhancer = applyMiddleware(
  Socratic11ReduxStore.middleware(),
  logger,
)
if (typeof __REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
  // eslint-disable-next-line no-undef
  enhancer = compose(enhancer, __REDUX_DEVTOOLS_EXTENSION__())
}

const store = configureStore({
  reducer,
  enhancers: [enhancer],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [Socratic11ReduxStore.STATE_UPDATE],
      ignoreState: true,
    },
  }),
})

// Counter example from https://github.com/reactjs/redux/blob/master/examples/counter-vanilla/index.html
const valueEl = document.querySelector('#value')

function getCounter () { return store.getState().counter }
function render () {
  valueEl.innerHTML = getCounter().toString()
}
render()
store.subscribe(render)

document.querySelector('#increment').onclick = () => {
  store.dispatch({ type: 'INCREMENT' })
}
document.querySelector('#decrement').onclick = () => {
  store.dispatch({ type: 'DECREMENT' })
}
document.querySelector('#incrementIfOdd').onclick = () => {
  if (getCounter() % 2 !== 0) {
    store.dispatch({ type: 'INCREMENT' })
  }
}
document.querySelector('#incrementAsync').onclick = () => {
  setTimeout(() => store.dispatch({ type: 'INCREMENT' }), 1000)
}

// Socratic11 using the same store
const Socratic11 = new Socratic11({
  id: 'redux',
  store: new ReduxStore({ store }),
  // If we had placed our `reducer` elsewhere in Redux, eg. under an `Socratic11` key in the state for a profile page,
  // we'd do something like:
  //
  // store: new ReduxStore({
  //   store: store,
  //   id: 'avatar',
  //   selector: state => state.pages.profile.Socratic11
  // }),
  debug: true,
})
Socratic11.use(Dashboard, {
  target: '#app',
  inline: true,
  width: 400,
})
Socratic11.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })

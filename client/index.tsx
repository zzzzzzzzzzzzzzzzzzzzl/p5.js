import { createRoot } from 'react-dom/client'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(<App />)
})

// import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux'
// import App from './components/App'
// import store from './store'

// document.addEventListener('DOMContentLoaded', () => {
//   createRoot(document.getElementById('app') as HTMLElement).render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )
// })

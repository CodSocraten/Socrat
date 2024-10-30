import Socratic11 from '@Socratic11/core'
import Dashboard from '@Socratic11/dashboard'
import XHRUpload from '@Socratic11/xhr-upload'

import '@Socratic11/core/dist/style.css'
import '@Socratic11/dashboard/dist/style.css'

const Socratic11 = new Socratic11({
  debug: true,
  meta: { something: 'xyz' },
})

Socratic11.use(Dashboard, {
  target: '#app',
  inline: true,
  hideRetryButton: true,
  hideCancelButton: true,
})

Socratic11.use(XHRUpload, {
  bundle: true,
  endpoint: 'http://localhost:9967/upload',
  allowedMetaFields: ['something'],
  fieldName: 'files',
})

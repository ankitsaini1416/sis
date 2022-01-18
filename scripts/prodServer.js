/* eslint-disable no-undef */
const express = require('express')
const path = require('path')
// const expressStaticGzip = require('express-static-gzip')
const app = express()
const buildRoot = path.join(__dirname, '../build')
const port = 9000
const baseRoute = process.env.CONTEXT || ''
const environment = process.env.ENVIRONMENT || ''
const formats = ['js', 'css']
const http = require('http')
let config = {}
const configPath = `http://root:Google9795!@config:8888/admin-frontend-${environment}.json`

const callConfig = () => {
  console.log(`==> 🌎  Faeching configuration from ${configPath}`)
  http
    .get(configPath, (resp) => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })
      resp.on('end', () => {
        console.log(`==> 🌎  config received ${data}`)
        data = JSON.parse(data)
        if (data) {
          config = data
          setupServer()
        }
      })
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message)
    })
  // setupServer()
}
const modifyFormat = (url) => {
  try {
    const format = url.substring(url.lastIndexOf('.') + 1, url.length)
    if (formats.includes(format)) {
      return url + '.gz'
    }
    return url
  } catch (err) {
    return url
  }
}

const renderHtml = (req, res) => {
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('X-UA-Compatible', 'IE=edge')
  res.render(
    'index.ejs',
    {
      initialState: {},
      rootConfig: {
        SERVICE_URL: config['api-server'],
        SERVICE_URL_SECURED: config['api-server-secured'],
        REDIRECT_BASE_SECURED: config['redirect-base-secured'],
        CHAT_URL: config['websocket-server'],
      },
    },
    (err, result) => {
      if (err) {
        console.log(err)
        throw new Error(err)
      }
      return res.end(result)
    }
  )
}
const setupServer = () => {
  app.get('*static/*', function (req, res, next) {
    const modifiedUrl = modifyFormat(req.url)
    if (modifiedUrl !== req.url) {
      req.url = modifiedUrl
      res.set('Content-Encoding', 'gzip')
      res.set('Content-Type', 'text/css')
    }
    next()
  })
  // app.use(`/${baseRoute}*`, expressStaticGzip(buildRoot))
  app.use(express.static(buildRoot))
  app.set('views', buildRoot)
  app.set('view engine', 'ejs')
  app.get(`${baseRoute}*`, renderHtml)
  app.listen(port, (err) => {
    if (err) {
      const message = '==> 😭 OMG!!! Unable to load App, please refer below error: '
      console.error(message, err)
      throw new Error(message)
    }
    console.log(`==> 🌎  Listening at http://localhost:${port}/`)
  })
}
callConfig()

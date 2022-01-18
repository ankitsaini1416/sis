import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// const ImageEditor = lazy(() => import('./components/temp/ImageEditor'))
// const DSignature = lazy(() => import('./components/temp/DSignature'))
// const Editor = lazy(() => import('./components/temp/Editor'))
// const Editor2 = lazy(() => import('./components/temp/Editor2'))
const LoginContainer = lazy(() => import('./containers/auth/Login'))
const ForgotPasswordContainer = lazy(() => import('./containers/auth/ForgotPassword'))
const PasswordResetContainer = lazy(() => import('./containers/auth/PasswordReset'))
const SIS = lazy(() => import('./containers/sis/SIS'))

export default function Routes() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path="/">
            <LoginContainer />
          </Route>
          <Route path="/:district?/:school?/login">
            <LoginContainer />
          </Route>
          <Route path="/:district?/:school?/forgotpassword">
            <ForgotPasswordContainer />
          </Route>
          <Route path="/:district?/:school?/passwordreset">
            <PasswordResetContainer />
          </Route>
          <Route path="/:district?/:school?/sis">
            <SIS />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

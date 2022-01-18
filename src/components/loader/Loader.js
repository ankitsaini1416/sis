import './Loader.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Lottie from 'react-lottie'

import animationLoader from '../../assets/lotties/loader'

export default function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLoader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  // if (isLoader) {
  return ReactDOM.createPortal(
    <div id="loaderConteiner" className="loader-container">
      <div className="loader-icon">
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
    </div>,
    document.getElementById('loader')
  )
  // } else {
  //   return <div>12345</div>;
  // }
}

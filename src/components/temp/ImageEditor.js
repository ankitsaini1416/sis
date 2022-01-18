import 'tui-image-editor/dist/tui-image-editor.css'

import ImageEditor from '@toast-ui/react-image-editor'
import download from 'downloadjs'
import React from 'react'

const IEditor = () => {
  const imageEditor = React.useRef()
  const myTheme = {
    'menu.backgroundColor': 'white',
    'common.backgroundColor': '#151515',
    'downloadButton.backgroundColor': 'white',
    'downloadButton.borderColor': 'white',
    'downloadButton.color': 'black',
    // 'menu.normalIcon.path': n,
    // 'menu.activeIcon.path': iconb,
    // 'menu.disabledIcon.path': icona,
    // 'menu.hoverIcon.path': iconc,
  }
  const saveImageToDisk = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst
    const data = imageEditorInst.toDataURL()
    if (data) {
      const mimeType = data.split(';')[0]
      const extension = data.split(';')[0].split('/')[1]
      download(data, `image.${extension}`, mimeType)
    }
  }
  return (
    <div className="App">
      <h2>Using tui-image-editor build in React</h2>
      <button className="button" onClick={saveImageToDisk}>
        Save Image to Disk
      </button>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: '',
            name: 'image',
          },
          theme: myTheme,
          //   menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'text', 'filter'],
          menu: ['crop', 'flip', 'rotate'],
          initMenu: '',
          uiSize: {
            height: `calc(100vh - 160px)`,
          },
          menuBarPosition: 'bottom',
        }}
        cssMaxHeight={window.innerHeight}
        cssMaxWidth={window.innerWidth}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
        ref={imageEditor}
      />
    </div>
  )
}

export default IEditor

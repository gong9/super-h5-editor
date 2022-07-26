import { FC, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from '@umijs/max'
import { StateType } from '@/types/dvaTypes/index'

// 错误处理
import '../../global/handleError'
import ErrorBoundary from '../../global/ErrorBoundary'
// @ts-ignore
import { schameMap } from 'lego-components-react'
import EditorLeft from './container/editorLeft'
import EditorTop from './container/editorTop'
import PreView from './container/preview'
import EditorConfigForm from './container/editorConfigForm'

import './index.less'

export type dispatch = (params: { type: string; payload: any }) => void;

const EditorContainer: FC = () => {
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null) // 画布中当前正选中的组件
  const [iframeScrollY, setIframeScrollY] = useState(0) // iframe中被卷去的部分
  const { currentCanvasSchema } = useSelector((state: StateType) => {
    const { h5_model_type } = state
    return { currentCanvasSchema: h5_model_type.currentCacheCopm }
  })
  const dispatch = useDispatch()

  // 监听iframe 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const { currentCacheCopm, compActiveIndex, scrollY } = data

      if (compActiveIndex) {
        setCompActiveIndex(compActiveIndex)
      } else if (currentCacheCopm && !('compActiveIndex' in data)) {
        // 注入实际高度
        dispatch({
          type: 'h5_model_type/setCurrentCacheCopm',
          payload: {
            currentCacheCopm
          }
        })
      } else if (scrollY === 0 || scrollY) {
        setIframeScrollY(scrollY)
      }
    })
  }, [])

  return (
    <div className='editor-container'>
      <div className='editor-top'>
        <EditorTop currentCacheCopm={currentCanvasSchema} />
      </div>
      <div className='editor-body'>
        <div className='editor-body-left'>
          <EditorLeft schameMap={schameMap || []} />
        </div>
        <div className='editor-body-center'>
          <PreView iframeScrollY={iframeScrollY} />
        </div>
        <div className='editor-body-right'>
          {compActiveIndex !== null && (
            <EditorConfigForm
              compSchema={currentCanvasSchema[compActiveIndex]}
              compActiveIndex={compActiveIndex}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const Main = () => {
  return (
    <div>
      <ErrorBoundary>
        <DndProvider backend={HTML5Backend}>
          <EditorContainer />
        </DndProvider>
      </ErrorBoundary>
    </div>
  )
}

export default Main

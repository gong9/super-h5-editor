import { FC, memo, useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import classnames from 'classnames'
import { useSelector } from '@umijs/max'
import { StateType } from '@/types/dvaTypes/index'
import Drop from './Drop'
import eventbus from '../../../../utils/eventbus'
import './index.less'

interface PreViewProps {
  iframeScrollY: number;
}

let compNum = 0 // 记录组件数量

const PreView: FC<PreViewProps> = ({ iframeScrollY }) => {
  const [showCloneViewState, changeShowCloneViewState] = useState(false)
  const { currentCanvasSchema } = useSelector((state: StateType) => {
    const { h5_model_type } = state
    return { currentCanvasSchema: h5_model_type.currentCacheCopm }
  })

  useEffect(() => {
    // 订阅[监听]是否开始拖拽，以便于判断是否展示iframe浮层
    eventbus.on('watchDragState', (dragState: boolean) => {
      changeShowCloneViewState(dragState)
    })
  }, [])

  useEffect(() => {
    // @ts-ignore
    document.querySelector('.clone-iframe').style.top = `${-iframeScrollY}px`
  }, [iframeScrollY])

  const [, drop] = useDrop({
    accept: 'comp'
  })

  return (
    <div className='preview' ref={drop}>
      <div
        className={classnames('clone-iframe', { hide: !showCloneViewState })}
      >
        {currentCanvasSchema.map((compInfo: any, index: number) => {
          return (
            // 因为会存在渲染相同组件的情况，故这里放弃diff优化
            <Drop key={++compNum} index={index} compInfo={compInfo} />
          )
        })}
      </div>

      <iframe
        src='https://lowcode-show-tjrg.vercel.app/#/view'
        width='100%'
        scrolling='yes'
        frameBorder='0'
        id='preview'
      />
    </div>
  )
}

export default memo(PreView)

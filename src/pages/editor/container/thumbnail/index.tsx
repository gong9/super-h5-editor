import { FC, useEffect, memo } from 'react'
import { DragSourceMonitor, useDrag } from 'react-dnd'
import { useDispatch, useSelector } from '@umijs/max'
import { StateType } from '@/types/dvaTypes/index'
import { ComJsonType } from '../editorLeft'
import eventbus from '../../../../utils/eventbus'
import './index.less'

interface ThumbnailProps {
  compInfo: ComJsonType;
}

/**
 * @file 组件缩略图
 */
const Thumbnail: FC<ThumbnailProps> = ({ compInfo }) => {
  const { currentCanvasSchema } = useSelector((state: StateType) => {
    const { h5_model_type } = state
    return { currentCanvasSchema: h5_model_type.currentCacheCopm }
  })
  const dispatch = useDispatch()
  const [{ isDragging }, drag] = useDrag(
    {
      item: compInfo,
      type: 'comp',
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor: DragSourceMonitor) => {
        const occupantsIndex = currentCanvasSchema.findIndex(
          (compItem:any) => compItem.name === 'occupants'
        )

        if (monitor.didDrop()) {
          // 如果成功放入目标容器，则以真正的comp替代占位元素
          currentCanvasSchema.splice(occupantsIndex, 1, item)
          // @ts-ignore 更新预览项目组件
          document.querySelector('#preview').contentWindow.postMessage({ currentCacheCopm: currentCanvasSchema }, '*')
        } else {
          // 没有放置目标容器中且拖拽结束，删除占位元素
          currentCanvasSchema.splice(occupantsIndex, 1)
        }
        // 关闭画布涂层
        eventbus.emit('watchDragState', false)
        dispatch({
          type: 'h5_model_type/setCurrentCacheCopm',
          payload: {
            currentCacheCopm: currentCanvasSchema
          }
        })
      }
    },
    [currentCanvasSchema]
  )

  useEffect(() => {
    if (isDragging) {
      // 开启画布涂层
      eventbus.emit('watchDragState', true)

      dispatch({
        type: 'h5_model_type/setCurrentCacheCopm',
        payload: {
          currentCacheCopm: [
            {
              name: 'occupants',
              description: '放到这里'
            },
            ...currentCanvasSchema
          ]
        }
      })
    }
  }, [isDragging])

  return (
    <div ref={drag} className='thumbnail'>
      {compInfo.description}
    </div>
  )
}
export default memo(Thumbnail)

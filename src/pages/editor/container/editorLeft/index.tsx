import { FC, memo } from 'react'
import Thumbnail from '../thumbnail'
import './index.less'

interface EditorLeftProps {
  schameMap: ComJsonType[];
}
export interface ComJsonType {
  name: string;
  description: string;
  config?: any;
  defaultConfig?: any;
  pic?: string;
  clientHeight?: number;
}

const EditorLeft: FC<EditorLeftProps> = ({
  schameMap
}) => {
  return (
    <div className='editor-left'>
      <h3>简单组件</h3>

      <div className='thumbnail-components'>
        {schameMap.map((item: any) => {
          return (
            <Thumbnail
              key={item.compId}
              compInfo={item}
            />
          )
        })}
      </div>

    </div>
  )
}

export default memo(EditorLeft)

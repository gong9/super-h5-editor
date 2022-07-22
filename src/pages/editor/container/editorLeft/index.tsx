import { FC, memo } from 'react'
import { Collapse } from 'antd'
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
const { Panel } = Collapse

const EditorLeft: FC<EditorLeftProps> = ({
  schameMap
}) => {
  return (
    <div className='editor-left'>
      <Collapse className='Collapse' ghost={true}>
        {schameMap.map((item: any) => {
          return (
            <Panel header={item.name} key={item.name}>
              <Thumbnail
                compInfo={item}
              />
            </Panel>
          )
        })}
      </Collapse>
    </div>
  )
}

export default memo(EditorLeft)

// @ts-nocheck
import { FC } from 'react'
import { Form, Button } from 'antd'
import { useSelector } from '@umijs/max'
import { StateType } from '@/types/dvaTypes/index'
import {
  SuperColor,
  SuperSeleter,
  SuperText,
  SuperUpload
} from '../../../../components/compConfigForm'
import { ComJsonType } from '../editorLeft'

interface EditorConfigFormProps {
  compSchema: ComJsonType;
  compActiveIndex: number;
}

const EditorConfigForm: FC<EditorConfigFormProps> = ({
  compSchema,
  compActiveIndex
}) => {
  const { config, defaultConfig } = compSchema
  const { currentCanvasSchema } = useSelector((state: StateType) => {
    const { h5_model_type } = state
    return { currentCanvasSchema: h5_model_type.currentCacheCopm }
  })
  const onFinish = (values) => {
    // 找到当前组件在所有组件中的索引&通知iframe更新组件信息
    currentCanvasSchema[compActiveIndex] = {
      ...compSchema,
      defaultConfig: values
    }
    document
      .querySelector('#preview')
      .contentWindow.postMessage({ currentCacheCopm: currentCanvasSchema }, '*')
  }
  return (
    Array.isArray(config) &&
    config.length > 0 && (
      <Form
        name='basic'
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete='off'
        // eslint-disable-next-line react/jsx-no-duplicate-props
        initialValues={defaultConfig}
        onFinish={onFinish}
      >
        {config.map(({ name, format, label }) => {
          let SuperFormItem: any
          switch (format) {
            case 'text':
              SuperFormItem = SuperText
              break
            case 'color':
              SuperFormItem = SuperColor
              break
            case 'seleter':
              SuperFormItem = SuperSeleter
              break
            case 'upload':
              SuperFormItem = SuperUpload
              break
            default:
              break
          }

          return (
            <Form.Item key={name} label={label} name={name}>
              <SuperFormItem defaultConfig={defaultConfig[name]} />
            </Form.Item>
          )
        })}
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type='primary' htmlType='submit'>
            保存
          </Button>
        </Form.Item>
      </Form>
    )
  )
}

export default EditorConfigForm

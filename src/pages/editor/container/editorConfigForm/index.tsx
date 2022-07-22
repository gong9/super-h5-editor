//@ts-nocheck
import { FC } from 'react';
import { Form, Button } from 'antd';
import { useSelector} from "@umijs/max";
import { StateType } from "@/types/dvaTypes/index";
import {
  SuperColor,
  SuperSeleter,
  SuperText,
  SuperUpload,
} from '../../../../components/compConfigForm';
import { ComJsonType } from '../editorLeft';

interface EditorConfigFormProps {
  compSchema: ComJsonType;
  compActiveIndex: number;
}

const EditorConfigForm: FC<EditorConfigFormProps> = ({
  compSchema,
  compActiveIndex,
}) => {
  const { config, defaultConfig, name } = compSchema;
  const { currentCanvasSchema } = useSelector((state: StateType) => {
    const { h5_model_type } = state;
    return { currentCanvasSchema: h5_model_type.currentCacheCopm };
  });
  const onFinish = (values) => {
    // 找到当前组件在所有组件中的索引&通知iframe更新组件信息
    currentCanvasSchema[compActiveIndex] = {
      ...compSchema,
      defaultConfig: values,
    };

    document
      .querySelector('#preview')
      .contentWindow.postMessage({ currentCanvasSchema }, '*');
  };
  return (
    Array.isArray(config) &&
    config.length > 0 && (
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        initialValues={defaultConfig}
        onFinish={onFinish}
      >
        {config.map(({ name, format, label }) => {
          let SuperFormItem: any;
          switch (format) {
            case 'text':
              SuperFormItem = SuperText;
              break;
            case 'color':
              SuperFormItem = SuperColor;
              break;
            case 'seleter':
              SuperFormItem = SuperSeleter;
              break;
            case 'upload':
              SuperFormItem = SuperUpload;
              break;
            default:
              break;
          }

          return (
            <Form.Item key={name} label={label} name={name}>
              {/* 这里antd的表单项会给自组件注入属性，下面函数式调用组件传参的方式不可使用 */}

              {/* {SuperFormItem({
                defaultConfig: defaultConfig[name],
                value,
              })} */}
              <SuperFormItem defaultConfig={defaultConfig[name]} />
            </Form.Item>
          );
        })}
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    )
  );
};

export default EditorConfigForm;

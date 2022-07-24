import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons'

export const SiderMenuData = [
  {
    label: 'h5编辑器',
    icon: LaptopOutlined,
    key: '/superH5',
    children: [
      {
        label: '编辑器',
        key: '/superH5/editor'
      }
    ]
  },
  {
    label: 'lego编辑器',
    icon: NotificationOutlined,
    key: '/lego',
    children: [
      {
        label: '编辑器',
        key: '/lego/editor'
      }
    ]
  }
]

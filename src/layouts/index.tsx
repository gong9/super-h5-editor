import React from 'react'
import { Outlet, useNavigate } from 'umi'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import { SiderMenuData } from '../constant/siderMenuData'

import 'antd/dist/antd.css'
import './index.less'
const { Header, Content, Sider } = Layout

const MenuDataProps: MenuProps['items'] = SiderMenuData.map((Menuitem) => {
  return {
    key: Menuitem.key,
    icon: React.createElement(Menuitem.icon),
    label: Menuitem.label,
    children: Menuitem?.children || []
  }
})

const App: React.FC = () => {
  const navigate = useNavigate()

  const handleRouter: MenuProps['onClick'] = e =>
    navigate(e.keyPath[0] || '')

  return (
    <Layout className='main'>
      <Header className='header'>
        <div className='logo' />
        <div className='header-title'>lowcode 2b2c 编辑器</div>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <Menu
            onClick={handleRouter}
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={MenuDataProps}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>h5编辑器</Breadcrumb.Item>
            <Breadcrumb.Item>编辑器</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className='site-layout-background content-main'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default App

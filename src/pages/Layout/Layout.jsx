import { Layout, Menu, Popconfirm } from 'antd';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './index.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, clearUserInfo } from '../../store/modules/user';


const { Header, Sider } = Layout

const items = [
  {
    label: '首頁',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '創建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },

]

const GeekLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMenuClick = (router) => {
    const path = router.key;
    navigate(path)
  } 
  // 獲取當前路徑
  const location = useLocation()
  const selectKey = location.pathname
  // 觸發個人用戶信息
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  const { userInfo } = useSelector(state => state.user)
  // 登出，清除信息
  const onConfirm = () => {
    dispatch(clearUserInfo())
    navigate('login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否確認退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectKey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 內容 */}
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
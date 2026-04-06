"use client";
import React, { useState } from 'react';
import { Layout, Menu, Select, Tag } from 'antd';
import { BarChartOutlined, UserOutlined, EditOutlined, CheckCircleOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { logoutAction } from '@/app/login/actions';

const { Header, Content, Sider } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // FAKE Auth Context - Để bạn dễ dàng test các Roles!
  const [currentRole, setCurrentRole] = useState('ADMIN'); 

  // Lọc Menu hiển thị theo Role hiện tại
  const allMenuItems = [
    { key: '/admin/dashboard', icon: <BarChartOutlined />, label: 'Thống kê (Admin)', roles: ['ADMIN'] },
    { key: '/admin/accounts', icon: <UserOutlined />, label: 'Quản lý Tài khoản (Admin)', roles: ['ADMIN'] },
    
    { key: '/admin/articles/review', icon: <CheckCircleOutlined />, label: 'Duyệt bài đăng', roles: ['EDITOR', 'ADMIN'] },
    
    { key: '/admin/articles', icon: <EditOutlined />, label: 'Kho bài của tôi', roles: ['WRITER', 'EDITOR', 'ADMIN'] },
    { key: '/admin/articles/create', icon: <FormOutlined />, label: 'Viết bài mới', roles: ['WRITER', 'EDITOR', 'ADMIN'] },
  ];

  const visibleMenuItems = allMenuItems.filter(item => item.roles.includes(currentRole));

  return (
    <Layout className="min-h-screen relative" hasSider>
      <Sider width={260} theme="dark" className="border-r" style={{ minHeight: '100vh', position: 'sticky', top: 0, left: 0 }}>
        <div className="h-16 flex items-center justify-center text-white text-2xl font-bold bg-red-700">
          INNOVATORS
        </div>
        
        {/* Bộ giả lập phân quyền */}
        <div className="p-4 border-b border-gray-700 text-center">
            <div className="text-xs text-gray-400 mb-2">Đang đăng nhập với tư cách:</div>
            <Select 
                value={currentRole} 
                onChange={setCurrentRole} 
                className="w-full"
                options={[
                  { value: 'ADMIN', label: 'Quản trị viên (Admin)' },
                  { value: 'EDITOR', label: 'Biên tập viên (Editor)' },
                  { value: 'WRITER', label: 'Người viết (Writer)' },
                ]}
            />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          onClick={(e) => router.push(e.key)}
          items={visibleMenuItems}
          className="mt-2"
        />
      </Sider>
      
      <Layout>
        <Header className="bg-white px-6 flex justify-between items-center border-b shadow-sm h-16">
          <div className="flex items-center gap-2 text-lg font-semibold">
            Khu vực Tòa Soạn 
            <Tag color={currentRole === 'ADMIN' ? 'red' : currentRole === 'EDITOR' ? 'blue' : 'purple'} className="ml-2">
              Role: {currentRole}
            </Tag>
          </div>
          <div className="flex items-center gap-6">
            <div className="cursor-pointer hover:text-red-500 font-semibold" onClick={() => router.push('/')}>
              Về Trang chủ Độc Giả
            </div>
            <form action={logoutAction}>
              <button type="submit" className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-red-500 bg-transparent border-none p-0 focus:outline-none">
                <LogoutOutlined />
                <span>Đăng xuất</span>
              </button>
            </form>
          </div>
        </Header>
        <Content className="m-6 p-6 bg-white min-h-[280px] rounded-lg shadow-sm">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

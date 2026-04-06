"use client";
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { loginUser } from './actions';
import { useTransition } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onFinish = (values: any) => {
    startTransition(async () => {
      const res = await loginUser(values.username);
      
      if (res.success) {
        message.success(`Đăng nhập thành công với quyền ${res.role}`);
        
        // Chuyển hướng theo từng Role cụ thể!
        if (res.role === 'ADMIN') {
          router.push('/admin/dashboard');
          
        } else if (res.role === 'EDITOR') {
          router.push('/admin/articles/review');
          
        } else if (res.role === 'WRITER') {
          router.push('/admin/articles/create');
          
        } else {
          // READER thì đưa về trang chủ
          router.push('/');
        }
      } else {
        message.error(res.error);
      }
    });
  };

  const testAccounts = [
    { u: 'admin_master', r: 'ADMIN' },
    { u: 'editor_pro', r: 'EDITOR' },
    { u: 'writer_active', r: 'WRITER' },
    { u: 'writer_req', r: 'WRITER (Chưa Duyệt)' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-400 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-500 rounded-full blur-[100px] opacity-20"></div>
      
      <div className="bg-white/70 backdrop-blur-xl p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 w-[420px] relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-rose-500 tracking-tighter mb-2">INNOVATORS</h1>
          <p className="text-gray-500 font-medium">Cổng Đăng Nhập Hệ Thống</p>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Tên đăng nhập" className="rounded-xl border-gray-200 shadow-sm" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            className="mb-8"
          >
            <Input
              prefix={<LockOutlined className="text-gray-400" />}
              type="password"
              placeholder="Mật khẩu"
              className="rounded-xl border-gray-200 shadow-sm"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending} className="w-full bg-red-600 hover:bg-red-700 border-none shadow-md rounded-xl h-12 text-base font-bold transition-all duration-300">
              Tiếp Tục
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-8 pt-6 border-t border-gray-200/50">
           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tài khoản test (Password điền bừa):</h4>
           <div className="flex flex-wrap gap-2">
              {testAccounts.map(a => (
                <div key={a.u} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md font-mono border border-gray-200">
                  {a.u} <span className="text-red-500 opacity-60">[{a.r}]</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

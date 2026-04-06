"use client";
import { Button, Form, Input, Radio, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

export default function RegisterPage() {
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log('Form values: ', values);
    if (values.role === 'WRITER') {
      alert("Đăng ký thành công! Yêu cầu cấp quyền 'Người Viết' của bạn đã được gửi tới Admin. Bạn cần chờ Admin phê duyệt.");
      router.push('/');
    } else {
      alert("Đăng ký Độc giả thành công!");
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="bg-white p-10 rounded-lg shadow-md w-[500px]">
        <div className="text-center mb-8">
          <Title level={2} className="text-red-700 m-0">Tạo Tài Khoản</Title>
          <Paragraph className="text-gray-500 mt-2">Tham gia hệ sinh thái Innovators</Paragraph>
        </div>

        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item label="Họ và Tên" name="name" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên thật" />
          </Form.Item>
          
          <Form.Item label="Tên Đăng Nhập" name="username" rules={[{ required: true }]}>
            <Input prefix={<MailOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>
          
          <Form.Item label="Mật Khẩu" name="password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Tạo mật khẩu" />
          </Form.Item>

          <Form.Item label="Mục đích đăng ký (Role)" name="role" initialValue="READER" rules={[{ required: true }]}>
            <Radio.Group className="w-full flex">
              <Radio value="READER" className="flex-1 p-3 border rounded border-gray-200">
                <div><strong>Độc giả</strong></div>
                <div className="text-xs text-gray-500">Đọc bài, Bình luận</div>
              </Radio>
              <Radio value="WRITER" className="flex-1 p-3 border rounded border-gray-200">
                <div><strong>Cộng tác viên</strong></div>
                <div className="text-xs text-gray-500">Chờ Admin duyệt cấp quyền viết bài</div>
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item className="mt-8">
            <Button type="primary" htmlType="submit" className="w-full bg-red-700 hover:bg-red-800" size="large">
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

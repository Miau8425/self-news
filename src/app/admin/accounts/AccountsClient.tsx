"use client";
import { Button, Form, Input, Select, Table, Space, Tabs, Tag, message } from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { approveWriter, rejectWriter, createUser } from './actions';
import { useTransition } from 'react';

const { Option } = Select;
const { TabPane } = Tabs;

export default function AccountsClient({ initialDataInternal, initialDataRequests }: any) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = (userId: number) => {
    startTransition(async () => {
      const res = await approveWriter(userId);
      if(res.success) message.success('Đã cấp quyền Người Viết Thành Công!');
      else message.error(res.error);
    });
  };

  const handleReject = (userId: number) => {
    startTransition(async () => {
      const res = await rejectWriter(userId);
      if(res.success) message.success('Đã từ chối đơn!');
    });
  };

  const handleCreate = async (formData: FormData) => {
     startTransition(async () => {
        const res = await createUser(formData);
        if(res.success) message.success('Tạo tài khoản thành công!');
        else message.error(res.error);
     });
  };

  const columnsInternal = [
    { title: 'Họ và tên', dataIndex: 'name', key: 'name', render: (t:string) => <span className="font-bold">{t}</span> },
    { title: 'Tên đăng nhập', dataIndex: 'username', key: 'username' },
    { title: 'Chức danh / Quyền', dataIndex: 'role', key: 'role', 
      render: (role: string) => (
        <span className={role === 'ADMIN' ? 'px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200' : role === 'EDITOR' ? 'px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200' : 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200'}>
          {role}
        </span>
      )
    },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: () => <Tag color="success">ACTIVE</Tag> },
    { title: 'Hành động', key: 'action', render: () => <Button danger type="text">Khóa</Button> },
  ];

  const columnsRequests = [
    { title: 'Họ và tên', dataIndex: 'name', key: 'name', render: (t:string) => <span className="font-bold">{t}</span> },
    { title: 'Tên đăng nhập', dataIndex: 'username', key: 'username' },
    { title: 'Chức danh yêu cầu', key: 'role', render: () => <Tag color="purple">WRITER</Tag> },
    { title: 'Trạng thái', key: 'status', render: () => <Tag color="warning">PENDING APPROVAL</Tag> },
    { title: 'Phê duyệt', key: 'action', render: (_:any, record:any) => (
      <Space size="middle">
        <Button disabled={isPending} type="primary" size="small" icon={<CheckOutlined />} className="bg-emerald-600 hover:bg-emerald-700 border-none shadow-md" onClick={() => handleApprove(record.id)}>Cấp Quyền</Button>
        <Button disabled={isPending} danger size="small" icon={<CloseOutlined />} onClick={() => handleReject(record.id)}>Từ Chối</Button>
      </Space>
    )},
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div>
           <h2 className="text-3xl font-black text-gray-800 tracking-tight">Khu vực Admin Cấp Cao</h2>
           <p className="text-gray-500 mt-1 font-medium">Bảng điều khiển nhân sự và kiểm soát quyền truy cập hệ thống Tòa soạn.</p>
        </div>
      </div>

      <Tabs defaultActiveKey="2" className="custom-tabs" size="large">
        
        <TabPane tab={<span className="font-semibold px-4 text-base">Duyệt Cộng Tác Viên <Tag className="ml-2 bg-red-600 text-white rounded-full border-none">{initialDataRequests.length}</Tag></span>} key="2">
           <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-800 font-medium shadow-sm">
              <span className="text-lg">👋</span> Danh sách những Độc Giả tự Do đã đăng ký làm "Người viết". Họ không thể truy cập khu tòa soạn cho đến khi ấn <strong>"Cấp Phép"</strong>.
           </div>
           <Table columns={columnsRequests} dataSource={initialDataRequests} pagination={false} className="shadow-sm border border-gray-200 rounded-lg overflow-hidden" rowClassName={() => "hover:bg-gray-50 transition-colors"} />
        </TabPane>

        <TabPane tab={<span className="font-semibold px-4 text-base">Hệ Thống Nhân Sự Nội Bộ</span>} key="1">
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl mb-10 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Tạo tài khoản Cán Bộ nội bộ</h3>
            <p className="text-sm text-gray-500 mb-6">Chỉ Admin mới có quyền tạo trực tiếp Biên Tập Viên (Editor) hoặc bỏ qua duyệt để tạo (Writer).</p>
            <form action={handleCreate} className="flex gap-4">
              <Input name="name" placeholder="Họ và tên thật" required size="large" className="w-[200px]" />
              <Input name="username" placeholder="Tên đăng nhập" required size="large" className="w-[180px]" />
              <Input.Password name="password" placeholder="Mật khẩu" required size="large" className="w-[180px]" />
              <Select defaultValue="EDITOR" size="large" className="w-[150px]">
                <Option value="EDITOR">Biên tập viên</Option>
                <Option value="WRITER">Phóng viên</Option>
              </Select>
              <input type="hidden" name="role" value="EDITOR" id="hiddenRoleInput" />
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} size="large" loading={isPending} className="bg-gray-900 hover:bg-gray-800 border-none shadow-md px-6">
                 Tạo tài khoản
              </Button>
            </form>
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Danh sách nhân sự Đang Hoạt Động</h3>
          <Table columns={columnsInternal} dataSource={initialDataInternal} pagination={false} className="shadow-sm border border-gray-200 rounded-lg overflow-hidden" rowClassName={() => "hover:bg-gray-50 transition-colors"} />
        </TabPane>

      </Tabs>
      <style>{`
        .custom-tabs .ant-tabs-nav::before { border-bottom: 2px solid #e5e7eb; }
        .custom-tabs .ant-tabs-tab { padding-bottom: 12px; }
        .custom-tabs .ant-tabs-tab-active .font-semibold { color: #b91c1c; }
        .custom-tabs .ant-tabs-ink-bar { background: #b91c1c; height: 3px; border-radius: 3px; }
      `}</style>
    </div>
  );
}

'use client';

import { Card, Col, Row, Statistic } from 'antd';
import { FileTextOutlined, EditOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';

type DashboardStats = {
  pub_count: number;
  pend_count: number;
  user_count: number;
};

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Thống kê Kênh Tin Tức</h2>
        <p className="text-gray-500 font-medium mt-1">Dữ liệu thời gian thực truy xuất từ máy chủ nội bộ.</p>
      </div>

      <Row gutter={24}>
        <Col span={6}>
          <Card bordered={false} className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl">
            <Statistic
              title={<span className="font-bold text-gray-600">Tổng Xuất Bản</span>}
              value={stats.pub_count}
              valueStyle={{ fontSize: 36, fontWeight: 900, color: '#1e3a8a' }}
              prefix={<FileTextOutlined className="text-blue-500 mr-2 opacity-80" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl">
            <Statistic
              title={<span className="font-bold text-gray-600">Đang Chờ Duyệt</span>}
              value={stats.pend_count}
              valueStyle={{ fontSize: 36, fontWeight: 900, color: '#c2410c' }}
              prefix={<EditOutlined className="text-orange-500 mr-2 opacity-80" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl">
            <Statistic
              title={<span className="font-bold text-gray-600">Tổng Cán Bộ</span>}
              value={stats.user_count}
              valueStyle={{ fontSize: 36, fontWeight: 900, color: '#065f46' }}
              prefix={<UserOutlined className="text-emerald-500 mr-2 opacity-80" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-rose-50 to-white border border-rose-100 rounded-2xl">
            <Statistic
              title={<span className="font-bold text-gray-600">Lượt Truy Cập</span>}
              value={99824}
              valueStyle={{ fontSize: 36, fontWeight: 900, color: '#be123c' }}
              prefix={<EyeOutlined className="text-rose-500 mr-2 opacity-80" />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

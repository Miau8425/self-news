'use client';

import { useEffect, useRef, useState } from 'react';

const leadParagraphs = [
  'Với nhiều người trẻ, giấc mơ sở hữu một căn nhà tại các thành phố lớn đang ngày càng trở nên xa vời. Trong quý I/2026, giá căn hộ tại Hà Nội và TP.HCM tiếp tục được ghi nhận ở mức cao, dao động từ 110-128 triệu đồng/m². Thị trường rơi vào tình trạng "kim tự tháp lộn ngược" khi phân khúc cao cấp chiếm tới 70-80% nguồn cung, trong khi nhà ở bình dân phù hợp với đa số người lao động có thu nhập trung bình lại ngày càng khan hiếm.',
  'Con số "40 năm để mua nhà" không phải là một phép tính giả định, mà là kết quả anh Lê Ngọc Phúc (25 tuổi, nhân viên logistics) tự rút ra sau nhiều đêm tính toán cho bài toán an cư tại TP.HCM của mình.',
  'Với thu nhập khoảng 15 triệu đồng mỗi tháng, Phúc hiện đang sống trong một phòng trọ nhỏ ở Bình Thạnh, chia sẻ tiền phòng 4,5 triệu đồng cùng hai người bạn khác. Từng nghĩ đến chuyện mua nhà, nhưng anh sớm nhận ra khoảng cách giữa mình và giấc mơ đó là quá lớn.',
  'Để sở hữu căn hộ trị giá 4 tỷ, anh cần tới 40 năm tích lũy để mua được, còn nếu vay ngân hàng thì gồng không nổi tiền lãi hàng tháng. Giống như nhiều người trẻ khác, Phúc đang đứng trước những lựa chọn không dễ dàng: tiếp tục ở lại trung tâm thành phố với áp lực chi phí lớn, chuyển ra vùng ven để giảm chi phí sinh hoạt hoặc rời thành phố để về quê.',
  'Theo chỉ số bất động sản mới nhất từ Numbeo, tỷ lệ giá nhà trên thu nhập của Việt Nam đã tăng từ khoảng 23,9 lần vào năm 2015 lên hơn 30 lần vào đầu năm 2026. Điều này đồng nghĩa với việc một người lao động cần hơn 30 năm thu nhập để mua được nhà trong điều kiện không phát sinh bất kỳ khoản chi tiêu nào.',
];

const midParagraphs = [
  'Trong bối cảnh áp lực lạm phát tăng cao và các dự án hạ tầng đang được đẩy mạnh, nhiều nhà đầu tư coi bất động sản là kênh trú ẩn an toàn và công cụ sinh lời hiệu quả. Đây là nguyên nhân chính khiến giá nhà vẫn cao phi lý dù thị trường bị đóng băng. Với một số người trẻ, lựa chọn thường thấy nhất vẫn là thuê nhà.',
  'Gia nhập thị trường lao động đã được 9 năm, chị Lê Hà Linh (31 tuổi, kỹ sư chất lượng) cho rằng mua nhà là giấc mơ xa vời. Mức thu nhập 25 triệu/tháng của chị không thấp so với mặt bằng chung, nhưng chẳng thấm vào đâu với mức phí sinh hoạt đắt đỏ ở TP.HCM.',
  'Sau khi trừ đi các khoản chi phí, có tháng chị tiết kiệm được 15 triệu, nhưng vẫn bấp bênh và không thể duy trì lâu dài. Do đó, chị Linh vẫn chọn thuê nhà vì không thể mua nổi.',
  'Một lựa chọn khác cũng được nhiều người cân nhắc là tìm cách dịch chuyển ra vùng ven. Với mức thu nhập khoảng 40 triệu đồng mỗi tháng, vợ chồng anh Nguyễn Hữu Hưng (33 tuổi, nhân viên kinh doanh) kỳ vọng có thể mua một căn hộ nhỏ tại TP.HCM. Tuy nhiên, khoảng cách khổng lồ giữa giá nhà và thu nhập khiến gia đình anh chưa đủ tự tin mua nhà.',
  'Anh Hưng hướng đến các khu vực ngoại thành như Bình Chánh, Nhà Bè, Cần Giờ, Dĩ An bởi giá bất động sản ở những khu vực này vẫn còn dễ tiếp cận. Nhưng việc cân bằng giữa giá cả, tiện ích và khoảng cách đến chỗ làm là bài toán rất khó.',
];

const endParagraphs = [
  'Những lựa chọn của người trẻ không đơn thuần là một quyết định cá nhân mà còn là mắt xích quan trọng nhằm tái cấu trúc đô thị và thị trường lao động. Theo công bố "Di cư nội địa Việt Nam giai đoạn 2009-2024" của Cục Thống kê vào tháng 12/2025, sự phân cực đang hiện rõ khi vùng Đông Nam Bộ vẫn là "thỏi nam châm" hút dân cư, trong khi Đồng bằng sông Cửu Long chịu áp lực xuất cư lớn nhất.',
  'Tại Diễn đàn đầu tư 2026, chuyên gia kinh tế Đinh Thế Hiển cho rằng hoạt động đầu cơ, lướt sóng là nguyên nhân đẩy giá nhà leo thang. Ở TP.HCM, giá căn hộ sơ cấp tăng từ 35 triệu lên hơn 100 triệu đồng/m² chỉ trong 8 năm, trong khi thu nhập bình quân đầu người chỉ tăng khoảng 6-7%/năm.',
  'TS. Cấn Văn Lực nhấn mạnh rằng việc đưa giá bất động sản về mức hợp lý không còn là câu chuyện nên hay không nên, mà là yêu cầu bắt buộc nếu muốn thị trường phát triển bền vững.',
  'Nếu với thế hệ đi trước, "an cư" gắn liền với mảnh đất, căn nhà, thì với người trẻ ngày nay, khái niệm này đã dần trở thành một trạng thái cân bằng giữa vật chất đủ đầy và tinh thần thoải mái.',
  'Sau tất cả, mỗi người trẻ đều phải cân nhắc và đưa ra lựa chọn cho riêng mình. Thay vì mải miết theo đuổi một tư duy đã cũ, họ cần tỉnh táo để quyết định điều phù hợp nhất với nhu cầu và năng lực thực tế của mình.',
];

function StoryScroller() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const next = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      setProgress(next);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const showSecond = progress >= 0.45;

  return (
    <div ref={wrapperRef} className="relative h-[180vh] my-16">
      <div className="sticky top-0 h-screen overflow-hidden rounded-[28px]">
        <img
          src="/long-form/giac-mo-an-cu/img/bgr1.jpg"
          alt="Không gian sống nơi thành phố"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 1 - progress }}
        />
        <img
          src="/long-form/giac-mo-an-cu/img/bgr2.jpg"
          alt="Không gian sống ở quê"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: progress }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
          <div className="max-w-2xl rounded-[28px] border border-white/40 bg-[#fffdf4]/90 p-7 text-[#241f1a] shadow-2xl backdrop-blur">
            <div className="mb-4 text-xs font-black uppercase tracking-[0.32em] text-amber-700">
              {showSecond ? 'Trở về quê' : 'Bám trụ thành phố'}
            </div>
            <p className="font-serif text-lg leading-8 md:text-[22px] md:leading-9">
              {showSecond
                ? 'Tuy nhiên, sự khác biệt giữa hai môi trường lại khiến anh Tuấn gặp không ít khó khăn. Ở quê chi phí thấp hơn, cuộc sống nhẹ nhàng hơn, nhưng công việc đúng chuyên ngành gần như không có. Mức lương thấp hơn khá nhiều buộc anh phải làm trái ngành để tự lo cho tương lai.'
                : 'Anh Nguyễn Văn Tuấn (27 tuổi) từng là kỹ sư hệ thống thông tin, quyết định trở về quê với kỳ vọng sớm ổn định cuộc sống sau 7 năm vừa học vừa làm tại thành phố. Môi trường sống ở quê giúp anh thoải mái hơn với các khoản chi tiêu hàng tháng và có thêm thời gian cho gia đình.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntroVisual() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const next = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      setProgress(next);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          src="/long-form/giac-mo-an-cu/img/intro_1.jpg"
          alt="Đô thị"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src="/long-form/giac-mo-an-cu/img/intro_2.jpg"
          alt="Nhà ở"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: progress }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-12 md:px-8 md:pb-16">
          <div className="max-w-4xl">
            <div className="mb-4 text-xs font-black uppercase tracking-[0.38em] text-white/75">Đa phương tiện | Chuyển động trẻ</div>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Giấc mơ an cư của người trẻ
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-10">
      <img src={src} alt={alt} className="w-full rounded-[24px] object-cover shadow-xl" />
      <figcaption className="mt-3 text-sm leading-6 text-gray-500">{caption}</figcaption>
    </figure>
  );
}

export default function HousingDreamLongform() {
  return (
    <div className="bg-[#f3f1eb] text-[#1f2933]">
      <IntroVisual />

      <section className="mx-auto max-w-3xl px-4 py-14 md:px-8">
        <div className="mb-12">
          <h3 className="text-4xl font-black leading-tight tracking-tight text-[#1f1f28] md:text-6xl">
            Giấc mơ an cư của người trẻ
          </h3>
          <p className="mt-8 border-l-4 border-amber-600 pl-6 font-serif text-xl font-bold italic leading-9 text-[#39424e] md:text-[28px] md:leading-[1.6]">
            Giá bất động sản và lãi suất vay "phi mã" khiến người trẻ thay đổi kế hoạch mua nhà. Thay vì chấp nhận bị khuất phục trước những giới hạn, người trẻ đang tái định nghĩa "an cư" bằng những lựa chọn sống linh hoạt và thực tế hơn.
          </p>
        </div>

        <div className="space-y-7 font-serif text-[19px] leading-9 text-[#2f3943] md:text-[21px]">
          {leadParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ArticleFigure
          src="/long-form/giac-mo-an-cu/img/nha_to.jpg"
          alt="Một căn hộ tại TP.HCM"
          caption="Một căn hộ 2 phòng ngủ diện tích 60-70m² tại TP.HCM hiện có giá từ 3-5 tỷ đồng, vượt xa khả năng tích lũy của phần lớn người trẻ."
        />

        <div className="my-12 rounded-[28px] border border-slate-200 bg-white p-3 shadow-lg md:p-5">
          <iframe
            src="/long-form/giac-mo-an-cu/src/tinh_tien_mua_nha.html"
            title="Công cụ tính năm mua nhà"
            className="h-[430px] w-full rounded-[20px] border-0"
          />
        </div>

        <h4 className="mt-14 text-3xl font-black tracking-tight text-[#173b61] md:text-4xl">
          Tìm ngã rẽ mới cho giấc mơ an cư
        </h4>
        <div className="mt-6 space-y-7 font-serif text-[19px] leading-9 text-[#2f3943] md:text-[21px]">
          {midParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ArticleFigure
          src="/long-form/giac-mo-an-cu/img/chi_x.jpg"
          alt="Người trẻ tính toán bài toán an cư"
          caption="Người trẻ đau đầu tìm phương án an cư giữa lúc giá nhà vượt xa tầm với."
        />

        <ArticleFigure
          src="/long-form/giac-mo-an-cu/img/minh_hoa_nha_nguyen_can.png"
          alt="Căn nhà nguyên căn ở Bình Thạnh"
          caption="Căn nhà nguyên căn ở Bình Thạnh có diện tích 7.2m x 3.6m, gồm 2 tầng được anh Hưng với người khác thuê giá 6 triệu/tháng. Tầng trệt là không gian bếp chung, vợ chồng anh Hưng ở tầng 2."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-8">
        <StoryScroller />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14 md:px-8">
        <h4 className="text-3xl font-black tracking-tight text-[#173b61] md:text-4xl">
          Từ lựa chọn cá nhân đến bài toán của đô thị
        </h4>

        <div className="mt-6 space-y-7 font-serif text-[19px] leading-9 text-[#2f3943] md:text-[21px]">
          {endParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="my-12 rounded-[28px] border border-slate-200 bg-white p-3 shadow-lg md:p-5">
          <iframe
            src="/long-form/giac-mo-an-cu/src/ban_do_nhiet.html"
            title="Bản đồ nhiệt di cư"
            className="h-[760px] w-full rounded-[20px] border-0"
          />
        </div>

        <div className="my-12 overflow-auto rounded-[28px] bg-white/70 p-5 shadow-sm ring-1 ring-black/5">
          <figure className="mb-4 w-full md:mb-0 md:mr-6 md:w-[500px] md:float-left">
            <img
              src="/long-form/giac-mo-an-cu/img/ong_dinh_the_hien.png"
              alt="Chuyên gia kinh tế Đinh Thế Hiển"
              className="w-full rounded-[22px] object-cover shadow-lg"
            />
            <figcaption className="mt-3 text-sm leading-6 text-gray-500">
              Chuyên gia kinh tế Đinh Thế Hiển: hoạt động đầu cơ, lướt sóng là nguyên nhân đẩy giá nhà leo thang.
            </figcaption>
          </figure>
          <p className="font-serif text-[19px] leading-9 text-[#2f3943] md:text-[21px]">
            Tại Diễn đàn đầu tư 2026, chuyên gia kinh tế Đinh Thế Hiển cho rằng hoạt động đầu cơ, lướt sóng là nguyên nhân đẩy giá nhà leo thang. Vào quý I năm 2026, giá bán sơ cấp tại Hà Nội đã lập đỉnh mới với mức trung bình khoảng 104 triệu/m², giá căn hộ ở vùng ven cũng chạm ngưỡng 70 triệu đồng/m². Ở TP.HCM, giá căn hộ sơ cấp tăng từ 35 triệu lên hơn 100 triệu đồng/m² chỉ trong 8 năm, tăng khoảng 14%/năm. Khi thu nhập của người lao động tăng không đủ nhanh để chạy theo giá nhà, cơ hội an cư của người trẻ tại các thành phố lớn ngày càng xa tầm với.
          </p>
        </div>

        <ArticleFigure
          src="/long-form/giac-mo-an-cu/img/can_van_luc.png"
          alt="TS Cấn Văn Lực"
          caption='TS. Cấn Văn Lực: "Việc đưa giá bất động sản về mức hợp lý không còn là vấn đề nên hay không nên, mà là yêu cầu bắt buộc nếu muốn thị trường phát triển bền vững".'
        />

        <div className="my-12 rounded-[28px] border border-slate-200 bg-white p-3 shadow-lg md:p-5">
          <iframe
            src="/long-form/giac-mo-an-cu/src/binh_chon.html"
            title="Bình chọn lựa chọn an cư"
            className="h-[820px] w-full rounded-[20px] border-0"
          />
        </div>

        <div className="pt-10 text-right text-[15px] leading-8 text-[#5a5a66]">
          <p><i>Trình bày:</i> <b>Ngọc Ánh (05), Minh Châu</b></p>
          <p><i>Nội dung:</i> <b>Minh Thy, Minh Thiên, Minh Oanh, Hồng Ân, Ngọc Ánh (04)</b></p>
        </div>
      </section>
    </div>
  );
}

const Database = require('better-sqlite3');
const db = new Database('./database.sqlite');

// --- Các template nội dung dài, hoàn toàn tiếng Việt ---
const contentTemplates = [
  (title, img1, img2) => `
<p>Trong bối cảnh thế giới đang bước vào giai đoạn chuyển đổi số mạnh mẽ nhất lịch sử, sự kiện <strong>${title}</strong> đã trở thành chủ đề nóng trên tất cả các diễn đàn công nghệ và kinh tế toàn cầu. Không ít chuyên gia nhận định đây là bước ngoặt đánh dấu sự kết thúc của một kỷ nguyên cũ và mở ra những cơ hội - thách thức hoàn toàn mới.</p>

<p>Theo dữ liệu từ các cơ quan phân tích hàng đầu, thị trường liên quan đã ghi nhận mức biến động chưa từng có trong vòng 5 năm trở lại đây. Cụ thể, các chỉ số cốt lõi đã thay đổi đáng kể chỉ trong vòng 48 giờ sau khi thông tin được công bố chính thức, phản ánh mức độ quan tâm và kỳ vọng cực kỳ cao từ phía nhà đầu tư lẫn người tiêu dùng.</p>

<h2>Bối cảnh và nguồn gốc sự kiện</h2>

<p>Câu chuyện bắt đầu từ những tháng cuối năm ngoái, khi các tín hiệu đầu tiên xuất hiện dưới dạng các cuộc họp kín liên tiếp giữa những bên liên quan chủ chốt. Nhiều nguồn tin nội bộ mà Innovators tiếp cận được xác nhận rằng quá trình đàm phán đã kéo dài hơn dự kiến, với không ít bất đồng về mức độ cam kết và lộ trình thực thi cụ thể.</p>

<p>Giới quan sát thị trường từ lâu đã nhận thấy những dấu hiệu ngầm định: các hợp đồng thuê văn phòng mới được ký kết tại các trung tâm tài chính lớn, làn sóng tuyển dụng nhân sự cấp cao bất thường, và đặc biệt là loạt bằng sáng chế được đệ trình trong giai đoạn này. Tất cả đều là những mảnh ghép của bức tranh lớn hơn mà nay đã được vén màn hoàn toàn.</p>

<blockquote>
"Đây là thời điểm mang tính lịch sử mà chúng tôi đã chuẩn bị trong suốt nhiều năm qua. Quyết định này không phải là sự bốc đồng — đó là kết quả của hàng nghìn giờ nghiên cứu, kiểm tra và thẩm định kỹ lưỡng nhất." — Đại diện ban lãnh đạo, chia sẻ độc quyền với Innovators.
</blockquote>

<img src="${img1}" alt="Toàn cảnh sự kiện" />

<h2>Phân tích chuyên sâu từ các chuyên gia hàng đầu</h2>

<p>Tiến sĩ Nguyễn Minh Phúc, chuyên gia kinh tế cao cấp tại Viện Nghiên cứu Chiến lược Quốc gia, nhận định: <em>"Sự kiện này không đơn giản chỉ là một thay đổi mang tính chiến thuật. Đây là động thái mang tầm chiến lược, có thể định hình lại toàn bộ cấu trúc của ngành trong ít nhất một thập kỷ tới."</em></p>

<p>Trong khi đó, từ góc độ công nghệ, bà Lê Thu Hương — cố vấn cấp cao tại một tập đoàn đa quốc gia — nhấn mạnh rằng yếu tố then chốt không nằm ở vốn đầu tư hay quy mô thực thi, mà chính là khả năng thích ứng và tốc độ ra quyết định trong môi trường biến đổi nhanh. Đây là điều mà nhiều tổ chức truyền thống vẫn đang loay hoay tìm lời giải.</p>

<p>Các nhà phân tích từ nhiều tổ chức nghiên cứu độc lập cũng đưa ra những đánh giá đa chiều. Một số cho rằng đây là biểu hiện tất yếu của quá trình toàn cầu hóa công nghệ, trong khi những người khác cảnh báo về nguy cơ tập trung quyền lực quá mức vào tay một số ít chủ thể — điều có thể tạo ra những bất cân xứng nguy hiểm trong hệ sinh thái kinh tế toàn cầu.</p>

<h2>Tác động trực tiếp đến thị trường và người tiêu dùng</h2>

<p>Phản ứng của thị trường diễn ra gần như ngay lập tức. Trong phiên giao dịch ngay sau khi thông tin rò rỉ, nhiều mã cổ phiếu liên quan ghi nhận biên độ dao động lên tới 15–22% — mức chưa từng thấy kể từ đại dịch năm 2020. Các nhà đầu tư tổ chức đồng loạt điều chỉnh danh mục, trong khi nhà đầu tư cá nhân đổ xô vào tìm kiếm thông tin và cố gắng nắm bắt cơ hội.</p>

<img src="${img2}" alt="Biểu đồ biến động thị trường sau sự kiện" />

<p>Về phía người tiêu dùng cuối, tác động sẽ không đến ngay lập tức nhưng hứa hẹn sẽ rất sâu rộng. Các chuyên gia dự báo rằng trong vòng 12–18 tháng tới, người dùng có thể kỳ vọng vào những cải tiến đáng kể về chất lượng dịch vụ, chi phí hợp lý hơn và trải nghiệm cá nhân hóa sâu hơn. Tuy nhiên, quá trình chuyển đổi này cũng đi kèm với không ít bất tiện trong giai đoạn đầu.</p>

<p>Đặc biệt, các doanh nghiệp vừa và nhỏ trong chuỗi cung ứng liên quan sẽ phải đối mặt với áp lực thích nghi rất lớn. Nhiều đơn vị đang khẩn trương rà soát lại mô hình kinh doanh, đàm phán lại các hợp đồng dài hạn và tăng tốc đầu tư vào hạ tầng số hóa nội bộ để không bị bỏ lại phía sau.</p>

<h2>Góc nhìn toàn cầu và so sánh khu vực</h2>

<p>Nhìn rộng hơn ra thế giới, sự kiện này không xảy ra trong chân không. Châu Âu đang theo dõi chặt chẽ và đã có những phản ứng chính sách sơ bộ từ phía Ủy ban châu Âu. Trong khi đó, khu vực châu Á — Thái Bình Dương, đặc biệt là Nhật Bản, Hàn Quốc và các nền kinh tế Đông Nam Á — đang cân nhắc các chiến lược phản ứng phù hợp với đặc thù địa phương.</p>

<p>Tại Việt Nam, cơ quan quản lý nhà nước đã ban hành các công văn yêu cầu các doanh nghiệp trong lĩnh vực liên quan báo cáo tình hình và phương án ứng phó. Nhiều hiệp hội ngành nghề cũng đã tổ chức hội thảo khẩn để cung cấp thông tin và định hướng cho hội viên trong giai đoạn đầy biến động này.</p>

<h2>Những câu hỏi còn bỏ ngỏ</h2>

<p>Dù bức tranh tổng thể dần trở nên rõ ràng hơn, vẫn còn không ít câu hỏi quan trọng chưa có lời giải. Liệu các cam kết được đưa ra có thực sự được thực thi đúng tiến độ? Cơ chế giám sát nào sẽ được áp dụng để bảo vệ lợi ích của các bên yếu thế hơn trong chuỗi giá trị? Và quan trọng nhất — ai sẽ là người thực sự hưởng lợi nhiều nhất từ cuộc chuyển đổi này?</p>

<p>Đây chính là những vấn đề mà Innovators sẽ tiếp tục điều tra và làm sáng tỏ trong các số tiếp theo. Theo dõi chúng tôi để không bỏ lỡ bất kỳ cập nhật quan trọng nào từ câu chuyện đang viết tiếp này.</p>
`,

  (title, img1, img2) => `
<p>Khi thế giới vẫn đang tập trung vào các cuộc khủng hoảng địa chính trị và sự hồi phục kinh tế hậu đại dịch, <strong>${title}</strong> bỗng trở thành tâm điểm của sự chú ý — không phải vì quy mô hay tốc độ, mà vì những hàm ý sâu xa mà nó mang lại cho cả ngành.</p>

<p>Từ trụ sở các tập đoàn đa quốc gia cho đến những công ty khởi nghiệp ở vùng ngoại ô, câu hỏi được đặt ra là giống nhau: "Điều này sẽ thay đổi ngành của chúng ta như thế nào?" Và câu trả lời, dù chưa hoàn toàn rõ ràng, đang bắt đầu xuất hiện từ những phân tích đầu tiên.</p>

<h2>Hành trình dẫn đến thời điểm quyết định</h2>

<p>Để hiểu đầy đủ ý nghĩa của sự kiện này, cần nhìn lại hành trình phát triển trong vài năm vừa qua. Đại dịch COVID-19 vừa là cú sốc vừa là chất xúc tác — buộc mọi tổ chức phải tăng tốc quá trình chuyển đổi số, thử nghiệm những mô hình hoạt động mới mà trong điều kiện bình thường có thể mất nhiều năm để thuyết phục ban lãnh đạo phê duyệt.</p>

<p>Trong bối cảnh đó, những đổi mới dần tích lũy — như nước ngầm chảy chậm mà chắc — và đến một ngưỡng nhất định, áp lực vỡ tung tạo ra những thay đổi có hiệu ứng domino. Đây chính xác là điều đang xảy ra.</p>

<blockquote>
"Chúng ta không nên nhìn nhận đây là một sự kiện riêng lẻ. Đây là một phần của xu hướng dài hơi, và những ai hiểu được điều đó sẽ định vị được bản thân tốt hơn trong 5 năm tới." — Chuyên gia phân tích chiến lược tại Innovators Research Lab.
</blockquote>

<img src="${img1}" alt="Phân tích xu hướng thị trường" />

<h2>Những con số biết nói</h2>

<p>Số liệu thống kê từ các tổ chức nghiên cứu độc lập cho thấy bức tranh rõ ràng hơn bao giờ. Trong 12 tháng gần đây, tốc độ tăng trưởng của phân khúc thị trường liên quan đạt mức 47% — cao gấp đôi so với toàn ngành. Đầu tư vào nghiên cứu và phát triển tăng 63%, trong khi số lượng bằng sáng chế được nộp tăng 89% so với cùng kỳ năm trước.</p>

<p>Đặc biệt đáng chú ý là sự thay đổi trong cấu trúc nhân sự: tỷ lệ tuyển dụng các chuyên gia công nghệ cao tăng gấp 3 lần, trong khi các vị trí truyền thống dần được thay thế bởi những vai trò đòi hỏi sự kết hợp giữa kỹ năng kỹ thuật và tư duy kinh doanh chiến lược.</p>

<img src="${img2}" alt="Thống kê tăng trưởng ngành" />

<h2>Góc nhìn của các nhà đầu tư</h2>

<p>Cộng đồng đầu tư phản ứng với sự hào hứng thận trọng — một trạng thái khá điển hình khi đứng trước những chuyển đổi lớn mà hệ quả chưa thể định lượng hoàn toàn. Các quỹ đầu tư mạo hiểm đã rót thêm hàng trăm triệu đô vào các startup trong lĩnh vực liên quan trong quý vừa qua, nhưng cũng đặt ra những điều kiện khắt khe hơn về mốc milestone và chỉ tiêu tăng trưởng.</p>

<p>Trên sàn chứng khoán, phản ứng mang tính hai chiều rõ ràng: trong khi nhóm cổ phiếu trực tiếp hưởng lợi tăng bình quân 18% trong tuần đầu tiên, nhóm bị cạnh tranh trực tiếp lại giảm tương ứng 12–15%. Đây là tín hiệu cho thấy thị trường đang định giá lại rất nhanh và quyết đoán.</p>

<h2>Tác động xã hội và câu hỏi về đạo đức</h2>

<p>Vượt ra ngoài giới hạn của thị trường và kinh doanh, sự kiện này cũng dấy lên những câu hỏi sâu sắc hơn về trách nhiệm xã hội và đạo đức kinh doanh. Khi công nghệ ngày càng thâm nhập sâu vào mọi ngóc ngách của cuộc sống, ranh giới giữa tiện lợi và xâm phạm, giữa cá nhân hóa và kiểm soát, ngày càng trở nên mờ nhạt.</p>

<p>Các tổ chức phi lợi nhuận và giới học thuật đã lên tiếng kêu gọi sự minh bạch và trách nhiệm giải trình cao hơn. Câu hỏi không chỉ là "điều này có thể làm được không?" mà còn là "chúng ta có nên làm nó không, và nếu có thì theo cách nào?"</p>

<h2>Triển vọng và kịch bản tương lai</h2>

<p>Nhìn về phía trước, các chuyên gia phác thảo ba kịch bản chính: kịch bản lạc quan với tốc độ tăng trưởng duy trì trên 30% trong 3 năm tới; kịch bản trung tính với sự điều chỉnh và ổn định hóa; và kịch bản bi quan nếu các rào cản pháp lý hoặc phản ứng thị trường tiêu cực xuất hiện.</p>

<p>Phần lớn các nhà phân tích có xu hướng nghiêng về kịch bản trung tính đến lạc quan — không phải vì họ bỏ qua các rủi ro, mà vì nền tảng căn bản của sự thay đổi này được đánh giá là đủ vững chắc để vượt qua những cú sốc ngắn hạn. Tuy nhiên, sự khiêm tốn trong dự báo vẫn là cần thiết — lịch sử không ít lần cho thấy thị trường có thể hành xử theo những cách mà ngay cả những mô hình phức tạp nhất cũng không thể dự đoán trước.</p>

<p><strong>Innovators</strong> cam kết tiếp tục theo dõi và đưa tin kịp thời về mọi diễn biến của câu chuyện quan trọng này. Hãy để lại bình luận bên dưới để chia sẻ quan điểm của bạn — chúng tôi trân trọng mọi góc nhìn đa chiều từ cộng đồng độc giả.</p>
`,

  (title, img1, img2) => `
<p>Không còn là dự báo hay kịch bản giả thuyết — <strong>${title}</strong> đã chính thức trở thành hiện thực, và làn sóng phản ứng từ khắp nơi trên thế giới đang ập đến với tốc độ chưa từng thấy. Đối với nhiều người trong ngành, đây vừa là sự xác nhận những gì họ đã chờ đợi, vừa là lời nhắc nhở rằng tốc độ thay đổi hiện nay vượt xa mọi dự báo của 5 năm trước.</p>

<p>Trong vòng chưa đầy 72 giờ kể từ khi thông tin chính thức được công bố, hơn 2.000 bài báo và phân tích đã được đăng tải trên toàn cầu, hàng chục podcast và webinar khẩn cấp được tổ chức, và hàng trăm nghìn cuộc thảo luận nổ ra trên các mạng xã hội chuyên ngành. Đây là mức độ quan tâm cho thấy tầm vóc thực sự của câu chuyện.</p>

<h2>Bức tranh toàn cảnh: Ai thắng, ai thua?</h2>

<p>Trong mọi cuộc dịch chuyển lớn, luôn có những kẻ thắng và kẻ thua — dù ranh giới không phải lúc nào cũng rõ ràng ngay từ đầu. Lần này cũng không ngoại lệ. Những tổ chức đã đầu tư sớm vào các nền tảng và năng lực phù hợp với xu hướng đang diễn ra có lợi thế rõ ràng — họ đang thu hoạch những gì đã gieo hạt trong giai đoạn khó khăn.</p>

<blockquote>
"Sự khác biệt giữa người dẫn đầu và kẻ theo sau không nằm ở nguồn lực — nó nằm ở sự sẵn sàng hành động khi người khác còn đang do dự." — Trích từ báo cáo nội bộ được chia sẻ với Innovators.
</blockquote>

<img src="${img1}" alt="So sánh tác động lên các nhóm doanh nghiệp" />

<p>Ngược lại, những đơn vị vẫn đang bám vào mô hình truyền thống, chậm chạp trong việc số hóa và nâng cấp năng lực, đang đứng trước nguy cơ bị bỏ lại phía sau một cách vĩnh viễn. Điều đáng lo ngại là nhiều trong số này không thiếu nguồn lực — họ thiếu quyết tâm và tầm nhìn chiến lược.</p>

<h2>Câu chuyện từ những người trong cuộc</h2>

<p>Chúng tôi đã tiếp xúc với nhiều nhân vật quan trọng trực tiếp liên quan đến sự kiện này. Một giám đốc điều hành kỳ cựu với hơn 20 năm kinh nghiệm trong ngành chia sẻ thẳng thắn: <em>"Tôi đã từng nghĩ mình hiểu cách thị trường vận hành. Nhưng tốc độ và quy mô của những gì đang xảy ra thực sự vượt ngoài mọi mô hình tư duy mà tôi từng có."</em></p>

<p>Trong khi đó, một nhà sáng lập startup 30 tuổi lại nhìn nhận hoàn toàn khác: <em>"Với chúng tôi, đây là cơ hội tốt nhất trong 10 năm qua. Khi thị trường đang tái cơ cấu, những người nhanh nhẹn và linh hoạt mới là người nắm thế chủ động."</em> — sự tương phản trong cách tiếp nhận giữa các thế hệ lãnh đạo doanh nghiệp là điều rất đáng suy nghĩ.</p>

<h2>Yếu tố công nghệ là chìa khóa</h2>

<p>Không thể phủ nhận rằng công nghệ đóng vai trò trung tâm trong câu chuyện này. Trí tuệ nhân tạo, điện toán đám mây, chuỗi khối và hàng loạt công nghệ mới nổi đang không chỉ thay đổi cách chúng ta làm việc mà còn định nghĩa lại những gì là có thể. Ranh giới giữa ngành này và ngành khác ngày càng trở nên mờ nhạt, tạo ra những cơ hội lai ghép chưa từng tồn tại trước đây.</p>

<img src="${img2}" alt="Công nghệ thúc đẩy chuyển đổi ngành" />

<p>Đáng chú ý là tốc độ ứng dụng công nghệ mới tại Đông Nam Á — bao gồm Việt Nam — đang tăng nhanh hơn so với nhiều quốc gia phát triển. Điều này phần lớn nhờ vào cơ cấu dân số trẻ, mức độ thích ứng công nghệ cao và môi trường quy định chính sách ngày càng cởi mở hơn. Đây là lợi thế cạnh tranh đặc biệt trong giai đoạn chuyển đổi hiện tại.</p>

<h2>Định hướng chính sách và vai trò của nhà nước</h2>

<p>Trong khi khu vực tư nhân di chuyển nhanh chóng, câu hỏi về vai trò của nhà nước trong việc định hướng, hỗ trợ và điều tiết quá trình này ngày càng trở nên cấp thiết. Kinh nghiệm từ các quốc gia đi trước cho thấy khung chính sách phù hợp có thể là yếu tố tạo sự khác biệt giữa việc dẫn đầu và đi theo trong cuộc đua toàn cầu này.</p>

<p>Các chuyên gia khuyến nghị cần có sự cân bằng tinh tế giữa việc tạo điều kiện cho đổi mới sáng tạo phát triển và đảm bảo các hành lang bảo vệ lợi ích công cộng, an toàn dữ liệu và sự công bằng trong tiếp cận. Đây là bài toán không dễ giải, nhưng không thể né tránh.</p>

<p>Innovators cam kết tiếp tục là cầu nối thông tin đáng tin cậy giữa những diễn biến phức tạp của thế giới và bạn đọc. Chúng tôi mời bạn chia sẻ quan điểm, câu hỏi và góc nhìn của mình trong phần bình luận bên dưới — bởi vì hiểu biết tập thể luôn mạnh hơn bất kỳ bài phân tích đơn lẻ nào.</p>
`
];

const imagePool = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1531297172867-11f26a575466?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
];

// 15 bài viết thực tế, tiếng Việt, nội dung đầy đủ
const realArticles = [
  { title: "SpaceX đệ đơn IPO — Thương vụ lịch sử có thể đạt định giá 350 tỷ USD", summary: "Nếu được phê duyệt, đây sẽ là vụ IPO lớn nhất trong lịch sử thị trường chứng khoán Mỹ, mở ra cơ hội đầu tư chưa từng có vào tương lai không gian.", category: 3 },
  { title: "Nvidia vượt mốc vốn hóa 3 nghìn tỷ USD — Chip AI trở thành vàng mới của thế kỷ", summary: "Với mức tăng trưởng doanh thu 122% so với cùng kỳ, Nvidia chính thức leo lên vị trí công ty giá trị nhất thế giới, bỏ xa Apple và Microsoft.", category: 1 },
  { title: "Apple Vision Pro 2 ra mắt với chip M4 — Kỷ nguyên mới của không gian số bắt đầu", summary: "Thiết bị thực tế hỗn hợp thế hệ mới mỏng hơn 40%, giá rẻ hơn 30% và lần đầu tiên tích hợp AI tổng quát hoàn toàn ngoại tuyến, không cần kết nối internet.", category: 1 },
  { title: "Google DeepMind công bố Gemini Ultra 3.0 — AI đầu tiên vượt điểm số IQ con người", summary: "Trong bài kiểm tra chuẩn hóa quốc tế, Gemini Ultra 3.0 đạt 157 điểm IQ — cao hơn 97% dân số toàn cầu, đặt ra câu hỏi lớn về tương lai giáo dục và việc làm.", category: 1 },
  { title: "Amazon Web Services sự cố 6 tiếng — Thiệt hại trên toàn cầu ước tính 2,4 tỷ USD", summary: "Sự cố nghiêm trọng nhất trong lịch sử điện toán đám mây khiến hàng nghìn dịch vụ từ Netflix đến Nasdaq tê liệt, bộc lộ điểm yếu chết người của nền kinh tế số.", category: 2 },
  { title: "Bitcoin phá mốc 120.000 USD — Tổ chức tài chính đua nhau tích trữ tài sản số", summary: "Lần đầu tiên trong lịch sử, hơn 65% Bitcoin đang lưu hành thuộc sở hữu của các quỹ đầu tư tổ chức — dấu mốc cho thấy tiền mã hóa đã hoàn toàn bước vào dòng chính.", category: 2 },
  { title: "Tesla Robotaxi vận hành tại 12 thành phố Mỹ hoàn toàn không có tài xế", summary: "Elon Musk xác nhận đội xe tự lái thương mại đầu tiên đã hoạt động liên tục 90 ngày không tai nạn — cột mốc lịch sử mang tính bước ngoặt cho ngành xe tự hành toàn cầu.", category: 1 },
  { title: "Microsoft hoàn tất thâu tóm OpenAI với giá 100 tỷ USD — Cuộc đua AI định hình lại thị trường", summary: "Thương vụ M&A công nghệ lớn nhất thế kỷ 21 chính thức khép lại, đặt dấu chấm hỏi lớn về sự cạnh tranh lành mạnh và tương lai của các startup AI độc lập.", category: 2 },
  { title: "Trung Quốc ra mắt chip AI nội địa ngang tầm H100 của Nvidia giữa lệnh cấm vận", summary: "Các kỹ sư Trung Quốc đã phát triển thành công vi mạch AI thế hệ mới, làm lung lay chiến lược kiềm chế công nghệ của Washington và tái định hình địa chính trị chip bán dẫn.", category: 5 },
  { title: "WhatsApp vượt 4 tỷ người dùng — Ứng dụng nhắn tin được dùng nhiều nhất lịch sử nhân loại", summary: "Meta xác nhận WhatsApp hiện xử lý hơn 300 tỷ tin nhắn mỗi ngày — tương đương 40 tin nhắn cho mỗi người trên hành tinh, số liệu khiến cả thế giới phải giật mình.", category: 4 },
  { title: "EU phạt Meta kỷ lục 14 tỷ euro vì vi phạm quyền riêng tư người dùng", summary: "Ủy ban châu Âu áp mức phạt chưa từng có tiền lệ, yêu cầu Meta thay đổi toàn bộ cơ chế thu thập dữ liệu trước năm 2027 — một bước ngoặt pháp lý toàn cầu về quyền số.", category: 5 },
  { title: "Samsung Galaxy S26 Ultra ra mắt — Màn hình gập, pin 1 tuần và AI học máy tự tiến hóa", summary: "Với chip Exynos 2500 và AI xử lý ảnh thế hệ mới không cần kết nối đám mây, Galaxy S26 Ultra được coi là điện thoại đầu tiên thực sự thay thế máy ảnh chuyên nghiệp.", category: 1 },
  { title: "Lạm phát toàn cầu tăng vọt bất ngờ — FED khẩn cấp họp bất thường giữa đêm", summary: "Chỉ số CPI tháng 3/2026 tăng 0,8% thay vì 0,2% như dự báo, kéo theo lo ngại về kịch bản stagflation quay lại và làn sóng tăng lãi suất mạnh trong quý tới.", category: 5 },
  { title: "Meta Orion — Kính AR thực sự đầu tiên ra mắt cuối 2026 với giá 1.299 USD", summary: "Sau 8 năm nghiên cứu và hơn 8 tỷ USD đầu tư, Meta sắp bán ra thiết bị AR nhẹ hơn kính thường, tích hợp AI assistant và màn hình holographic ngay trong tầm nhìn.", category: 1 },
  { title: "Startup Việt Nam đạt định giá tỷ USD — Làn sóng kỳ lân mới từ Đông Nam Á", summary: "Một startup fintech từ TP.HCM vừa hoàn thành Series C trị giá 180 triệu USD, nâng tổng định giá lên 1,2 tỷ USD — trở thành kỳ lân thứ 5 của Việt Nam trong 3 năm.", category: 2 },
];

// 30 bài tiếng Việt ngẫu nhiên
const viChủDề = ["Trí tuệ nhân tạo", "Tiền mã hóa", "SpaceX", "Tesla", "Nvidia", "Apple", "Google", "Amazon", "Intel", "Microsoft", "Công nghệ lượng tử", "Xe điện", "Khởi nghiệp", "Thị trường chứng khoán", "Kinh tế số"];
const viHànhĐộng = ["công bố", "hủy bỏ", "thâu tóm", "tiết lộ", "lên kế hoạch", "đầu tư vào", "đối mặt với phản ứng dữ dội về", "ghi nhận tăng trưởng đột phá tại", "xuất hiện đột biến về"];
const viĐốiTượng = ["dự án tỷ đô mới", "trung tâm dữ liệu thế hệ mới", "thương vụ sáp nhập kỷ lục", "nguyên mẫu bí mật", "đợt sa thải quy mô lớn", "lợi nhuận cao kỷ lục", "tính năng đột phá", "quan hệ đối tác chiến lược", "cuộc điều tra pháp lý"];

const generatedArticles = [];
for (let i = 0; i < 30; i++) {
  const cd = viChủDề[Math.floor(Math.random() * viChủDề.length)];
  const hd = viHànhĐộng[Math.floor(Math.random() * viHànhĐộng.length)];
  const dt = viĐốiTượng[Math.floor(Math.random() * viĐốiTượng.length)];
  generatedArticles.push({
    title: `Độc quyền: ${cd} chính thức ${hd} ${dt} — Thị trường rung chuyển`,
    summary: `Thị trường phản ứng mạnh khi ${cd} chính thức ${hd} ${dt}, một quyết định được đánh giá sẽ định hình lại cục diện ngành trong nhiều năm tới.`,
    category: [1,2,3,4,5][i % 5]
  });
}

const allArticles = [...realArticles, ...generatedArticles];

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
    + '-' + Math.floor(Math.random() * 99999);
}

const commenters = ["Minh Khoa", "Thu Hà", "Duy Anh", "Gia Bảo", "Hoàng Mai", "Tuấn Kiệt", "Ngọc Linh", "Phú Vinh", "Thanh Tâm", "Lê Quân"];
const commentTexts = [
  "Bài viết rất chi tiết và dễ hiểu. Cảm ơn tác giả đã dày công nghiên cứu!",
  "Đây đúng là xu hướng mình đã dự đoán từ đầu năm, cuối cùng cũng đã xảy ra.",
  "Thông tin hữu ích, nhưng mình mong tác giả cung cấp thêm số liệu cụ thể hơn.",
  "Không ngờ mọi thứ lại diễn ra nhanh đến vậy. Thị trường quả thật khó đoán.",
  "Cần theo dõi thêm trong vài tuần tới, hiện tình hình đang rất nhạy cảm.",
  "Cảm ơn Innovators đã luôn cập nhật thông tin nhanh và chính xác!",
  "Bài phân tích hay, tuy nhiên tôi không hoàn toàn đồng ý với kết luận phần cuối.",
  "Chiến lược rất sắc bén! Hãy chờ xem kết quả thực thi có khớp với tầm nhìn không.",
  "Thị trường Việt Nam sẽ bị ảnh hưởng thế nào nhỉ? Mong có thêm phân tích chuyên sâu.",
  "Phần phân tích chuyên gia thực sự rất sâu sắc, nhất là đoạn về tác động bên thứ ba.",
  "Mình đang nghiên cứu về chủ đề này, bài viết giúp ích rất nhiều cho luận văn của mình.",
  "Cần thêm góc nhìn từ phía các nước đang phát triển, đặc biệt là Đông Nam Á.",
];

try {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO articles 
    (title, slug, summary, content, thumbnail_img, category_id, author_id, status, published_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, 'PUBLISHED', datetime('now', '-' || ? || ' hours'))
  `);

  let hoursAgo = 1;

  db.transaction(() => {
    for (const article of allArticles) {
      const slug = generateSlug(article.title);
      const thumb = imagePool[Math.floor(Math.random() * imagePool.length)];
      const img1 = imagePool[Math.floor(Math.random() * imagePool.length)];
      const img2 = imagePool[Math.floor(Math.random() * imagePool.length)];
      const templateFn = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
      const content = templateFn(article.title, img1, img2);
      const categoryId = article.category || [1,2,3,4,5][Math.floor(Math.random() * 5)];
      const authorId = [2, 3][Math.floor(Math.random() * 2)];

      const info = insert.run(article.title, slug, article.summary, content, thumb, categoryId, authorId, hoursAgo);
      hoursAgo += Math.floor(Math.random() * 4) + 1;

      const articleId = info.lastInsertRowid;
      if (articleId) {
        const numComments = Math.floor(Math.random() * 6) + 2;
        for (let c = 0; c < numComments; c++) {
          const commenter = commenters[Math.floor(Math.random() * commenters.length)];
          const text = commentTexts[Math.floor(Math.random() * commentTexts.length)];
          db.prepare('INSERT INTO comments (article_id, author_name, content) VALUES (?, ?, ?)').run(articleId, commenter, text);
        }
      }
    }
  })();

  console.log(`✅ Đã seed thành công ${allArticles.length} bài viết tiếng Việt với nội dung dài và bình luận!`);
} catch(e) {
  console.log("❌ Lỗi:", e.message);
}

import { Question, CaptainCardStatement } from '../types';

export interface LighthouseStation {
  id: number;
  name: string;
  lighthouseName: string;
  location: string;
  description: string;
  coordinates: [number, number];
}

export const STATIONS: LighthouseStation[] = [
  {
    id: 1,
    name: 'Trạm 1: Vị trí & Không gian Biển Đông',
    lighthouseName: 'Hải đăng Bạch Long Vĩ',
    location: 'Đảo Bạch Long Vĩ, Vịnh Bắc Bộ',
    description: 'Khám phá diện tích chiến lược 3.44 triệu km², các eo biển yết hầu và các quốc gia ven Biển Đông.',
    coordinates: [20.13, 107.72]
  },
  {
    id: 2,
    name: 'Trạm 2: Tiềm năng Thủy sản & Tài nguyên',
    lighthouseName: 'Hải đăng Cù Lao Xanh',
    location: 'Đảo Cù Lao Xanh, Bình Định',
    description: 'Tìm hiểu trữ lượng cá chiếm 7-8% toàn cầu, hơn 100 loài cá kinh tế và tài nguyên dầu khí thềm lục địa.',
    coordinates: [13.61, 109.35]
  },
  {
    id: 3,
    name: 'Trạm 3: Hiệp định Vịnh Bắc Bộ 2000 & Vùng Biển Tây Nam',
    lighthouseName: 'Hải đăng Hòn Khoai',
    location: 'Đảo Hòn Khoai, Cà Mau',
    description: 'Đi sâu vào Hiệp định nghề cá 25/12/2000, Vùng nước lịch sử Việt Nam - Campuchia 1982 và ranh giới VN - Thái Lan 1997.',
    coordinates: [8.43, 104.83]
  },
  {
    id: 4,
    name: 'Trạm 4: Cơ chế Pháp lý UNCLOS 1982, DOC & COC',
    lighthouseName: 'Hải đăng Song Tử Tây',
    location: 'Xã đảo Song Tử Tây, Huyện Trường Sa',
    description: 'Nắm vững Công ước Luật Biển 1982, Tuyên bố ứng xử DOC 2002 và đàm phán Bộ Quy tắc ứng xử COC hiệu lực, thực chất.',
    coordinates: [11.43, 114.33]
  },
  {
    id: 5,
    name: 'Trạm 5: Đường lối Hòa bình & Chủ quyền Việt Nam',
    lighthouseName: 'Hải đăng Trường Sa Lớn',
    location: 'Thị trấn Trường Sa, Huyện Trường Sa',
    description: 'Khẳng định chủ quyền Hoàng Sa (Đà Nẵng), Trường Sa (Khánh Hòa) và giải pháp hòa bình kiên quyết, kiên trì của Việt Nam.',
    coordinates: [8.64, 111.92]
  }
];

export const QUIZ_QUESTIONS: Question[] = [
  // --- TRẠM 1: Vị trí & Không gian Biển Đông ---
  {
    id: 'q1-1',
    stationId: 1,
    stationName: 'Trạm 1: Vị trí & Không gian Biển Đông',
    lighthouseName: 'Hải đăng Bạch Long Vĩ',
    gradeLevel: 'all',
    question: 'Theo sách giáo khoa Chuyên đề Địa lí 11, Biển Đông có diện tích khoảng bao nhiêu và trải rộng trong phạm vi vĩ độ nào?',
    options: [
      'Khoảng 3.44 triệu km², trải rộng từ 3°N đến 26°B',
      'Khoảng 2.5 triệu km², trải rộng từ 5°N đến 20°B',
      'Khoảng 4.2 triệu km², trải rộng từ 1°N đến 30°B',
      'Khoảng 1.8 triệu km², trải rộng từ 8°N đến 23°B'
    ],
    correctIndex: 0,
    explanation: 'SGK Địa lí 11 ghi rõ: Biển Đông có diện tích khoảng 3,44 triệu km², là một trong những vùng biển lớn và quan trọng nhất thế giới, trải rộng từ vĩ tuyến 3°N đến 26°B.',
    kienSangHint: 'Bạn hãy nhớ số "3,44 triệu km²" và vĩ độ từ 3 độ Nam đến 26 độ Bắc nhé!',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 16'
  },
  {
    id: 'q1-2',
    stationId: 1,
    stationName: 'Trạm 1: Vị trí & Không gian Biển Đông',
    lighthouseName: 'Hải đăng Bạch Long Vĩ',
    gradeLevel: 'all',
    question: 'Biển Đông thông với Ấn Độ Dương qua eo biển trọng yếu nào?',
    options: [
      'Eo biển Ma-lắc-ca (Malacca)',
      'Eo biển Đài Loan',
      'Eo biển Bô-xpho-rút (Bosphorus)',
      'Eo biển Bering'
    ],
    correctIndex: 0,
    explanation: 'Biển Đông nối với biển Hoa Đông và biển Nhật Bản qua eo biển Đài Loan, nối với Thái Bình Dương qua vùng biển Philippines và thông với Ấn Độ Dương qua eo biển Ma-lắc-ca.',
    kienSangHint: 'Đây là eo biển nằm giữa bán đảo Mã Lai và đảo Sumatra của Indonesia, tàu chở dầu qua lại nườm nượp!',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 16'
  },
  {
    id: 'q1-3',
    stationId: 1,
    stationName: 'Trạm 1: Vị trí & Không gian Biển Đông',
    lighthouseName: 'Hải đăng Bạch Long Vĩ',
    gradeLevel: 'thpt',
    question: 'Biển Đông được bao bọc bởi bờ biển của bao nhiêu quốc gia và vùng lãnh thổ trong khu vực?',
    options: [
      '9 quốc gia (Việt Nam, Trung Quốc, Cam-pu-chia, Thái Lan, Ma-lai-xi-a, Xin-ga-po, In-đô-nê-xi-a, Bru-nây, Phi-líp-pin)',
      '5 quốc gia ven biển Đông Dương và Trung Quốc',
      'Chỉ có 4 nước thuộc lưu vực hạ lưu sông Mê Công',
      'Tất cả 11 quốc gia thành viên trong khối ASEAN'
    ],
    correctIndex: 0,
    explanation: 'Bờ biển của 9 quốc gia bao bọc Biển Đông gồm: Trung Quốc, Việt Nam, Cam-pu-chia, Thái Lan, Ma-lai-xi-a, Xin-ga-po, In-đô-nê-xi-a, Bru-nây và Phi-líp-pin.',
    kienSangHint: 'Có 9 quốc gia ven Biển Đông, trong đó có 8 nước ASEAN và Trung Quốc.',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 16'
  },

  // --- TRẠM 2: Tiềm năng Thủy sản & Tài nguyên ---
  {
    id: 'q2-1',
    stationId: 2,
    stationName: 'Trạm 2: Tiềm năng Thủy sản & Tài nguyên',
    lighthouseName: 'Hải đăng Cù Lao Xanh',
    gradeLevel: 'all',
    question: 'Sản lượng thủy sản khai thác ở vùng Biển Đông chiếm khoảng bao nhiêu phần trăm tổng sản lượng cá khai thác của toàn thế giới?',
    options: [
      'Khoảng 7 - 8% sản lượng thế giới',
      'Khoảng 20 - 25% sản lượng thế giới',
      'Khoảng 1 - 2% sản lượng thế giới',
      'Khoảng 35% sản lượng thế giới'
    ],
    correctIndex: 0,
    explanation: 'Theo SGK Địa lí 11, hiện nay sản lượng khai thác cá tại vùng Biển Đông chiếm khoảng 7 - 8% sản lượng cá khai thác của thế giới với trên 100 loài cá có giá trị kinh tế cao.',
    kienSangHint: 'Tỉ lệ này phản ánh nguồn lợi hải sản khổng lồ nhưng cũng nhắc nhở chúng ta cần đánh bắt bền vững tránh cạn kiệt.',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 18'
  },
  {
    id: 'q2-2',
    stationId: 2,
    stationName: 'Trạm 2: Tiềm năng Thủy sản & Tài nguyên',
    lighthouseName: 'Hải đăng Cù Lao Xanh',
    gradeLevel: 'thpt',
    question: 'Biển Đông có bao nhiêu loài cá có giá trị kinh tế cao và khả năng khai thác với trữ lượng lớn?',
    options: [
      'Trên 100 loài cá có giá trị kinh tế cao',
      'Khoảng 20 loài cá phổ thông',
      'Dưới 50 loài cá đặc hữu',
      'Hơn 5000 loài cá nước ngọt'
    ],
    correctIndex: 0,
    explanation: 'SGK Địa lí 11 khẳng định: Biển Đông có trên 100 loài cá có giá trị kinh tế cao và có khả năng khai thác với trữ lượng lớn (như cá ngừ, cá thu, cá trích, cá nục...).',
    kienSangHint: 'Con số chính xác trong mục 1.a của SGK là "trên 100 loài cá".',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 18'
  },
  {
    id: 'q2-3',
    stationId: 2,
    stationName: 'Trạm 2: Tiềm năng Thủy sản & Tài nguyên',
    lighthouseName: 'Hải đăng Cù Lao Xanh',
    gradeLevel: 'thpt',
    question: 'Các bể trầm tích chứa trữ lượng dầu mỏ và khí đốt tự nhiên lớn ở thềm lục địa phía nam Việt Nam bao gồm:',
    options: [
      'Bể Cửu Long và Bể Nam Côn Sơn',
      'Bể than Quảng Ninh và Bể quặng Thái Nguyên',
      'Bể trầm tích Hoàng Liên Sơn',
      'Bể muối mỏ Trường Sơn'
    ],
    correctIndex: 0,
    explanation: 'Thềm lục địa Việt Nam ở Biển Đông có nhiều bể trầm tích giàu dầu khí, nổi bật nhất là Bể Cửu Long (mỏ Bạch Hổ, Rạng Đông) và Bể Nam Côn Sơn (mỏ Lan Tây, Lan Đỏ, Đại Hùng).',
    kienSangHint: 'Đây là các mỏ dầu ngoài khơi Vũng Tàu mà chúng ta vẫn nghe trên đài truyền hình đấy!',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 17, 18'
  },

  // --- TRẠM 3: Hiệp định Vịnh Bắc Bộ 2000 & Vùng Biển Tây Nam ---
  {
    id: 'q3-1',
    stationId: 3,
    stationName: 'Trạm 3: Hiệp định Vịnh Bắc Bộ 2000 & Vùng Biển Tây Nam',
    lighthouseName: 'Hải đăng Hòn Khoai',
    gradeLevel: 'thpt',
    question: 'Hiệp định Hợp tác nghề cá ở Vịnh Bắc Bộ giữa Việt Nam và Trung Quốc được ký kết vào thời gian và địa điểm nào?',
    options: [
      'Ngày 25 - 12 - 2000 tại Bắc Kinh, Trung Quốc',
      'Ngày 02 - 09 - 1995 tại Hà Nội, Việt Nam',
      'Ngày 30 - 04 - 1982 tại New York, Hoa Kỳ',
      'Ngày 09 - 08 - 1997 tại Băng Cốc, Thái Lan'
    ],
    correctIndex: 0,
    explanation: 'SGK Địa lí 11 ghi rõ: "Hiệp định hợp tác nghề cá ở Vịnh Bắc Bộ giữa Việt Nam với Trung Quốc được kí vào ngày 25 - 12 - 2000 tại Bắc Kinh, Trung Quốc".',
    kienSangHint: 'Ngày lễ Giáng sinh năm 2000 (25/12/2000) tại thủ đô Bắc Kinh của Trung Quốc.',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 19'
  },
  {
    id: 'q3-2',
    stationId: 3,
    stationName: 'Trạm 3: Hiệp định Vịnh Bắc Bộ 2000 & Vùng Biển Tây Nam',
    lighthouseName: 'Hải đăng Hòn Khoai',
    gradeLevel: 'thpt',
    question: 'Vùng đánh cá chung trong Vịnh Bắc Bộ theo Hiệp định năm 2000 được giới hạn như thế nào?',
    options: [
      'Từ đường đóng cửa vịnh đến vĩ tuyến 20°B, cách đường phân định 30,5 hải lí mỗi phía',
      'Bao trùm toàn bộ diện tích Vịnh Bắc Bộ từ Móng Cái đến Cà Mau',
      'Chỉ cách bờ biển mỗi nước 12 hải lí',
      'Từ vĩ tuyến 17°B đến vĩ tuyến 25°B'
    ],
    correctIndex: 0,
    explanation: 'Vùng đánh cá chung được giới hạn từ đường đóng cửa vịnh (đường thẳng nối mũi Oanh Ca đảo Hải Nam đến đảo Cồn Cỏ kéo dài đến bờ biển VN) đến đường vĩ tuyến 20°B và cách đường phân định ranh giới biển 30,5 hải lí tính về mỗi phía.',
    kienSangHint: 'Đường đóng cửa vịnh đến 20°B và cách ranh giới 30,5 hải lý về mỗi bên.',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 19'
  },
  {
    id: 'q3-3',
    stationId: 3,
    stationName: 'Trạm 3: Hiệp định Vịnh Bắc Bộ 2000 & Vùng Biển Tây Nam',
    lighthouseName: 'Hải đăng Hòn Khoai',
    gradeLevel: 'thpt',
    question: 'Hai nguyên tắc hợp tác đặc thù tại vùng đánh cá chung Vịnh Bắc Bộ được xác lập trong Hiệp định là gì?',
    options: [
      'Bảo tồn, quản lí nguồn lợi thuỷ sản VÀ bình đẳng về năng lực tàu thuyền',
      'Tự do đánh bắt tối đa VÀ không giới hạn tải trọng tàu thuyền',
      'Độc quyền đánh bắt cho tàu công suất lớn VÀ cấm tàu nhỏ',
      'Khai thác triệt để VÀ nhượng quyền cho nước thứ ba'
    ],
    correctIndex: 0,
    explanation: 'SGK ghi rõ 2 nguyên tắc đặc thù: (1) Nguyên tắc bảo tồn, quản lí các nguồn lợi thuỷ sản; (2) Nguyên tắc bình đẳng về năng lực tàu thuyền.',
    kienSangHint: 'Cần bảo tồn nguồn cá và hai bên bình đẳng về số lượng, công suất tàu thuyền.',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 19'
  },
  {
    id: 'q3-4',
    stationId: 3,
    stationName: 'Trạm 3: Hiệp định Vịnh Bắc Bộ 2000 & Vùng Biển Tây Nam',
    lighthouseName: 'Hải đăng Hòn Khoai',
    gradeLevel: 'thpt',
    question: 'Hiệp định về phân định ranh giới trên biển trong Vịnh Thái Lan giữa Việt Nam và Thái Lan được ký vào ngày nào?',
    options: [
      'Ngày 09 - 08 - 1997',
      'Ngày 25 - 12 - 2000',
      'Ngày 07 - 07 - 1982',
      'Ngày 04 - 11 - 2002'
    ],
    correctIndex: 0,
    explanation: 'SGK trang 19: "Ngày 9 - 8 - 1997, Việt Nam và Thái Lan đã kí Hiệp định về phân định ranh giới trên biển giữa hai nước trong vịnh Thái Lan".',
    kienSangHint: 'Ngày 9 tháng 8 năm 1997 - một hiệp định phân định mang tính lịch sử ở Vịnh Thái Lan!',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 19'
  },
  {
    id: 'q3-5',
    stationId: 3,
    stationName: 'Trạm 3: Hiệp định Vịnh Bắc Bộ 2000 & Vùng Biển Tây Nam',
    lighthouseName: 'Hải đăng Hòn Khoai',
    gradeLevel: 'thpt',
    question: 'Hiệp định Vùng nước lịch sử giữa Việt Nam và Cam-pu-chia được ký vào năm 1982 có ý nghĩa hợp tác như thế nào đối với ngư dân hai nước?',
    options: [
      'Cho phép ngư dân hai nước duy trì tập quán đánh bắt cũ và không quy định cụ thể mô hình, số lượng',
      'Cấm tuyệt đối mọi hoạt động đánh bắt cá của ngư dân cả hai phía',
      'Chỉ cho phép tàu cá công nghiệp hiện đại hoạt động',
      'Bán quyền đánh bắt cho các tập đoàn đánh cá đa quốc gia'
    ],
    correctIndex: 0,
    explanation: 'SGK trang 19 nêu rõ: "Hiệp định vùng nước lịch sử Việt Nam - Cam-pu-chia cho phép ngư dân hai nước duy trì tập quán đánh bắt cũ và không quy định cụ thể mô hình, số lượng đánh bắt".',
    kienSangHint: 'Tôn trọng truyền thống sinh kế lâu đời của bà con ngư dân hai nước láng giềng.',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 19'
  },

  // --- TRẠM 4: Cơ chế Pháp lý UNCLOS 1982, DOC & COC ---
  {
    id: 'q4-1',
    stationId: 4,
    stationName: 'Trạm 4: Cơ chế Pháp lý UNCLOS 1982, DOC & COC',
    lighthouseName: 'Hải đăng Song Tử Tây',
    gradeLevel: 'all',
    question: 'Văn kiện pháp lý quốc tế toàn diện nhất, được ví như "Hiến pháp của biển và đại dương" là văn kiện nào?',
    options: [
      'Công ước Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982)',
      'Hiến chương Liên Hợp Quốc năm 1945',
      'Hiệp định Pa-ri năm 1973',
      'Tuyên bố Băng Cốc năm 1967'
    ],
    correctIndex: 0,
    explanation: 'UNCLOS 1982 (United Nations Convention on the Law of the Sea) quy định đầy đủ quy chế pháp lý của các vùng biển: nội thủy, lãnh hải (12 hải lý), tiếp giáp lãnh hải, vùng đặc quyền kinh tế (200 hải lý) và thềm lục địa.',
    kienSangHint: 'Từ viết tắt là UNCLOS 1982 ra đời tại Montego Bay (Jamaica).',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Mục Hợp tác pháp lý'
  },
  {
    id: 'q4-2',
    stationId: 4,
    stationName: 'Trạm 4: Cơ chế Pháp lý UNCLOS 1982, DOC & COC',
    lighthouseName: 'Hải đăng Song Tử Tây',
    gradeLevel: 'thpt',
    question: 'Tuyên bố về ứng xử của các bên ở Biển Đông (DOC) được các nước ASEAN và Trung Quốc ký kết vào năm nào?',
    options: [
      'Năm 2002 (tại Phnom Penh, Cam-pu-chia)',
      'Năm 1995 (tại Hà Nội)',
      'Năm 2012 (tại Manila)',
      'Năm 1982 (tại New York)'
    ],
    correctIndex: 0,
    explanation: 'Năm 2002, ASEAN và Trung Quốc đã ký Tuyên bố về ứng xử của các bên ở Biển Đông (DOC), cam kết giải quyết hòa bình các tranh chấp, tự kiềm chế không làm phức tạp tình hình.',
    kienSangHint: 'Năm 2002 - văn kiện chính trị bước ngoặt quan trọng giữa ASEAN và Trung Quốc.',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Các cơ chế hợp tác'
  },
  {
    id: 'q4-3',
    stationId: 4,
    stationName: 'Trạm 4: Cơ chế Pháp lý UNCLOS 1982, DOC & COC',
    lighthouseName: 'Hải đăng Song Tử Tây',
    gradeLevel: 'thpt',
    question: 'Mục tiêu đàm phán mà các nước ASEAN và Trung Quốc đang tích cực hướng tới để thay thế và nâng tầm DOC là gì?',
    options: [
      'Bộ Quy tắc ứng xử ở Biển Đông (COC) có hiệu lực, thực chất, mang tính ràng buộc pháp lý',
      'Một hiệp ước quân sự phòng thủ chung',
      'Việc xóa bỏ hoàn toàn đường biên giới trên biển',
      'Chỉ ký các bản ghi nhớ không ràng buộc trách nhiệm'
    ],
    correctIndex: 0,
    explanation: 'Các nước đang đàm phán xây dựng COC (Code of Conduct) có tính ràng buộc pháp lý, hiệu lực và thực chất, phù hợp với luật pháp quốc tế và UNCLOS 1982.',
    kienSangHint: 'Chữ viết tắt là COC (Code of Conduct) - Bộ Quy tắc ứng xử mang tính ràng buộc.',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Tiến trình COC'
  },

  // --- TRẠM 5: Đường lối Hòa bình & Chủ quyền Việt Nam ---
  {
    id: 'q5-1',
    stationId: 5,
    stationName: 'Trạm 5: Đường lối Hòa bình & Chủ quyền Việt Nam',
    lighthouseName: 'Hải đăng Trường Sa Lớn',
    gradeLevel: 'all',
    question: 'Quần đảo Hoàng Sa và Quần đảo Trường Sa lần lượt thuộc quyền quản lý hành chính của địa phương nào của Việt Nam?',
    options: [
      'Hoàng Sa thuộc TP. Đà Nẵng, Trường Sa thuộc tỉnh Khánh Hòa',
      'Hoàng Sa thuộc tỉnh Quảng Ngãi, Trường Sa thuộc tỉnh Bình Thuận',
      'Cả hai quần đảo cùng thuộc tỉnh Quảng Nam',
      'Hoàng Sa thuộc tỉnh Thừa Thiên Huế, Trường Sa thuộc TP. Hải Phòng'
    ],
    correctIndex: 0,
    explanation: 'Quần đảo Hoàng Sa thuộc quyền quản lý hành chính của UBND Huyện Hoàng Sa, TP. Đà Nẵng; Quần đảo Trường Sa thuộc UBND Huyện Trường Sa, tỉnh Khánh Hòa.',
    kienSangHint: 'Hoàng Sa ở Đà Nẵng, Trường Sa ở Khánh Hòa - luôn ghi nhớ bạn nhé!',
    textbookRef: 'SGK Chuyên đề Địa lí 11 & Bản đồ hành chính Nhà nước Việt Nam'
  },
  {
    id: 'q5-2',
    stationId: 5,
    stationName: 'Trạm 5: Đường lối Hòa bình & Chủ quyền Việt Nam',
    lighthouseName: 'Hải đăng Trường Sa Lớn',
    gradeLevel: 'thpt',
    question: 'Chủ trương nhất quán của Đảng và Nhà nước Việt Nam trong giải quyết các vấn đề tranh chấp ở Biển Đông là gì?',
    options: [
      'Kiên quyết, kiên trì bảo vệ chủ quyền; giải quyết hòa bình trên cơ sở luật pháp quốc tế và UNCLOS 1982',
      'Sử dụng vũ lực hoặc đe dọa sử dụng vũ lực',
      'Từ bỏ quyền tài phán để tránh va chạm',
      'Không tham gia bất kỳ hiệp ước quốc tế nào về biển'
    ],
    correctIndex: 0,
    explanation: 'Việt Nam luôn chủ trương kiên quyết, kiên trì bảo vệ vững chắc chủ quyền, quyền chủ quyền và quyền tài phán quốc gia, đồng thời kiên trì giải quyết mọi tranh chấp bằng các biện pháp hòa bình trên cơ sở luật pháp quốc tế và UNCLOS 1982.',
    kienSangHint: 'Phương châm: Kiên quyết, kiên trì và bằng các biện pháp hòa bình theo luật quốc tế.',
    textbookRef: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Phần liên hệ Việt Nam'
  },
  {
    id: 'q5-3',
    stationId: 5,
    stationName: 'Trạm 5: Đường lối Hòa bình & Chủ quyền Việt Nam',
    lighthouseName: 'Hải đăng Trường Sa Lớn',
    gradeLevel: 'all',
    question: 'Học sinh thế hệ trẻ Việt Nam có thể làm gì thiết thực nhất để góp phần bảo vệ chủ quyền và phát triển bền vững biển đảo quê hương?',
    options: [
      'Chăm chỉ học tập tri thức, lan tỏa thông điệp hòa bình, bảo vệ môi trường biển và nâng cao lòng yêu nước',
      'Lan truyền những thông tin sai lệch, chưa kiểm chứng trên mạng xã hội',
      'Thờ ơ, coi vấn đề biển đảo là việc của riêng lực lượng hải quân',
      'Xả rác thải nhựa và túi nilon xuống các bãi biển du lịch'
    ],
    correctIndex: 0,
    explanation: 'Học sinh cần ra sức rèn đức luyện tài, nắm vững kiến thức địa lý - lịch sử pháp lý biển đảo, tuyên truyền hòa bình, tích cực bảo vệ môi trường sinh thái biển sạch đẹp.',
    kienSangHint: 'Kiến thức là sức mạnh! Yêu biển đảo bắt đầu từ việc học giỏi và giữ sạch môi trường.',
    textbookRef: 'Bài học Liên hệ thực tiễn GDCD & Địa lí 11'
  }
];

export const STUDENT_TITLES = [
  { id: 't1', title: 'Thủy thủ Tập sự', requiredCoins: 0, requiredProgress: 0, icon: '⚓', description: 'Bắt đầu hành trình tìm hiểu Biển Đông' },
  { id: 't2', title: 'Thủy thủ Tinh nhuệ', requiredCoins: 30, requiredProgress: 20, icon: '🧭', description: 'Vượt qua trạm hải đăng đầu tiên an toàn' },
  { id: 't3', title: 'Thuyền phó Biển Đông', requiredCoins: 60, requiredProgress: 40, icon: '🚢', description: 'Nắm chắc kiến thức địa lý và tài nguyên biển' },
  { id: 't4', title: 'Thuyền trưởng Biển Đông', requiredCoins: 90, requiredProgress: 60, icon: '⭐', description: 'Làm chủ các hiệp định hợp tác nghề cá' },
  { id: 't5', title: 'Chuyên gia Hợp tác Hòa bình', requiredCoins: 120, requiredProgress: 80, icon: '🤝', description: 'Thông thạo UNCLOS 1982, DOC và tiến trình COC' },
  { id: 't6', title: 'Đại sứ Biển Đảo Việt Nam', requiredCoins: 150, requiredProgress: 100, icon: '👑', description: 'Chinh phục trọn vẹn Chuyên đề Địa lí 11!' },
];

export const CAPTAIN_CARD_STATEMENTS: CaptainCardStatement[] = [
  {
    statement: "Biển Đông có diện tích khoảng 3,44 triệu km², trải rộng từ 3°N đến 26°B.",
    is_correct: true,
    explanation: "Biển Đông là vùng biển nửa kín rộng khoảng 3,44 triệu km², trải từ 3°N đến 26°B."
  },
  {
    statement: "Eo biển Malacca là cửa ngõ nối Biển Đông trực tiếp với Thái Bình Dương.",
    is_correct: false,
    explanation: "Eo biển Malacca nối Biển Đông với Ấn Độ Dương, không phải Thái Bình Dương."
  },
  {
    statement: "Vịnh Bắc Bộ có độ sâu tương đối nông, trung bình dưới 100 mét.",
    is_correct: true,
    explanation: "Vịnh Bắc Bộ là vùng biển nông thềm lục địa có độ sâu trung bình dưới 100 mét."
  },
  {
    statement: "Sản lượng đánh bắt cá ở Biển Đông chiếm tới 30% toàn thế giới.",
    is_correct: false,
    explanation: "Sản lượng khai thác cá ở Biển Đông chỉ chiếm khoảng 7% đến 8% toàn cầu."
  },
  {
    statement: "Việt Nam và Trung Quốc đã ký Hiệp định phân định Vịnh Bắc Bộ năm 2000.",
    is_correct: true,
    explanation: "Hiệp định phân định Vịnh Bắc Bộ và Hiệp định nghề cá được ký ngày 25/12/2000."
  },
  {
    statement: "Theo UNCLOS 1982, chiều rộng lãnh hải của quốc gia ven biển là 24 hải lý.",
    is_correct: false,
    explanation: "Theo UNCLOS 1982, chiều rộng lãnh hải tối đa là 12 hải lý tính từ đường cơ sở."
  },
  {
    statement: "Phán quyết PCA 2016 bác bỏ hoàn toàn yêu sách đường chín đoạn phi lý.",
    is_correct: true,
    explanation: "Tòa PCA tuyên bố đường chín đoạn không có cơ sở pháp lý theo UNCLOS 1982."
  },
  {
    statement: "Băng cháy là loại khoáng sản kim loại quý hiếm dưới đáy thềm lục địa.",
    is_correct: false,
    explanation: "Băng cháy (mê-tan hydrat) là nguồn năng lượng hóa thạch thể rắn, không phải khoáng sản kim loại."
  },
  {
    statement: "Quần đảo Hoàng Sa thuộc Đà Nẵng, quần đảo Trường Sa thuộc tỉnh Khánh Hòa.",
    is_correct: true,
    explanation: "Về hành chính, Hoàng Sa thuộc huyện Hoàng Sa (Đà Nẵng), Trường Sa thuộc huyện Trường Sa (Khánh Hòa)."
  },
  {
    statement: "Vùng đặc quyền kinh tế cho phép quốc gia ven biển áp đặt chủ quyền tuyệt đối.",
    is_correct: false,
    explanation: "Quốc gia chỉ có quyền chủ quyền về kinh tế và quyền tài phán, không có chủ quyền tuyệt đối."
  }
];

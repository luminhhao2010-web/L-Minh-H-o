import { FlowchartStep } from '../types';

export const FLOWCHART_STEPS: FlowchartStep[] = [
  // --- CỘT 1: CƠ SỞ PHÁP LÝ & NGUYÊN TẮC QUỐC TẾ ---
  {
    id: 'col1-unclos',
    column: 1,
    stepNumber: 1,
    title: 'Công ước UNCLOS 1982',
    subtitle: 'Nền tảng pháp lý tối cao của đại dương',
    summary: 'Công ước Liên Hợp Quốc về Luật Biển 1982 xác lập quy chế toàn diện cho các vùng biển, quyền chủ quyền và nghĩa vụ hợp tác hòa bình.',
    details: 'Được thông qua ngày 10/12/1982 tại Montego Bay (Jamaica) và có hiệu lực từ 1994. UNCLOS 1982 phân định rõ các vùng biển: Nội thủy, Lãnh hải (12 hải lý), Vùng tiếp giáp lãnh hải (24 hải lý), Vùng đặc quyền kinh tế - EEZ (200 hải lý) và Thềm lục địa. Mọi hoạt động khai thác trên Biển Đông đều phải tuyệt đối tôn trọng các quy định của UNCLOS 1982.',
    legalBasisOrExample: 'Điều 123 UNCLOS: Các quốc gia ven biển kín hoặc nửa kín (như Biển Đông) có nghĩa vụ hợp tác trong việc quản lý tài nguyên sống, bảo vệ môi trường biển và nghiên cứu khoa học.',
    keyPoints: [
      'Xác lập phạm vi các vùng biển và quyền tài phán quốc gia',
      'Nền tảng giải quyết mọi tranh chấp chồng lấn một cách hòa bình',
      'Bảo đảm quyền tự do hàng hải và hàng không quốc tế hợp pháp'
    ],
    icon: 'Scale',
    tag: 'Hiến pháp Biển'
  },
  {
    id: 'col1-doc',
    column: 1,
    stepNumber: 2,
    title: 'Tuyên bố DOC (2002)',
    subtitle: 'Cam kết ứng xử chính trị giữa ASEAN và Trung Quốc',
    summary: 'Tuyên bố về ứng xử của các bên ở Biển Đông ký tại Phnom Penh ngày 04/11/2002, đặt nền móng cho việc duy trì ổn định và kiềm chế xung đột.',
    details: 'DOC là văn kiện chính trị đa phương đầu tiên giữa ASEAN và Trung Quốc về vấn đề Biển Đông. Các bên cam kết giải quyết hòa bình các tranh chấp lãnh thổ và quyền tài phán; tự kiềm chế không có các hành động làm phức tạp hoặc leo thang căng thẳng; thúc đẩy các biện pháp xây dựng lòng tin và ngoại giao phòng ngừa.',
    legalBasisOrExample: 'Khoản 4 & 5 của DOC quy định các bên không sử dụng vũ lực hoặc đe dọa sử dụng vũ lực, tôn trọng quyền tự do hàng hải và thúc đẩy hợp tác thiết thực.',
    keyPoints: [
      'Cam kết tự kiềm chế và không làm thay đổi nguyên trạng',
      'Thúc đẩy đối thoại đa phương thường niên ASEAN - Trung Quốc',
      'Bước đệm quan trọng hướng tới văn bản ràng buộc pháp lý'
    ],
    icon: 'FileText',
    tag: 'Tuyên bố Ứng xử'
  },
  {
    id: 'col1-coc',
    column: 1,
    stepNumber: 3,
    title: 'Tiến trình Xây dựng COC',
    subtitle: 'Bộ Quy tắc ứng xử hiệu lực, thực chất và ràng buộc',
    summary: 'Mục tiêu chiến lược nâng tầm từ tuyên bố chính trị DOC thành Bộ Quy tắc có hiệu lực pháp lý ràng buộc, ngăn ngừa nguy cơ xung đột.',
    details: 'ASEAN và Trung Quốc đang tích cực đàm phán văn bản dự thảo đàm phán duy nhất (SDNT). Việt Nam cùng các nước ASEAN nỗ lực thúc đẩy một Bộ Quy tắc ứng xử ở Biển Đông (COC) có hiệu lực, thực chất, mang tính ràng buộc pháp lý, phù hợp đầy đủ với luật pháp quốc tế và Công ước UNCLOS 1982.',
    legalBasisOrExample: 'Các vòng đàm phán quan chức cấp cao ASEAN - Trung Quốc (SOM-DOC) đang thống nhất các điều khoản kiểm soát khủng hoảng và bảo vệ quyền lợi chính đáng của các nước ven biển.',
    keyPoints: [
      'Có tính ràng buộc pháp lý mạnh mẽ hơn DOC',
      'Cơ chế giám sát tuân thủ và giải quyết sự cố trên biển',
      'Được cộng đồng quốc tế ủng hộ vì hòa bình khu vực'
    ],
    icon: 'ShieldCheck',
    tag: 'Mục tiêu Chiến lược'
  },

  // --- CỘT 2: LĨNH VỰC HỢP TÁC ƯU TIÊN TRÊN BIỂN ĐÔNG ---
  {
    id: 'col2-security',
    column: 2,
    stepNumber: 1,
    title: 'An ninh Hàng hải & Chống Cướp biển',
    subtitle: 'Giữ vững dòng chảy thương mại toàn cầu thông suốt',
    summary: 'Phối hợp tuần tra chung, chia sẻ thông tin radar và phòng chống cướp biển vũ trang trên các tuyến vận tải biển huyết mạch.',
    details: 'Biển Đông là tuyến vận tải biển tấp nập thứ hai thế giới, nối liền Ấn Độ Dương và Thái Bình Dương. Hợp tác bảo đảm an ninh hàng hải giúp bảo vệ các đoàn tàu buôn, ngăn chặn cướp biển, buôn lậu vũ khí, ma túy và buôn bán người trên biển.',
    legalBasisOrExample: 'Thỏa thuận ReCAAP (Hiệp định Hợp tác Khu vực về Chống cướp biển và Cướp vũ trang nhằm vào tàu thuyền tại châu Á) và các đợt diễn tập hải quân đa phương ADMM+.',
    keyPoints: [
      'Bảo đảm tự do, an toàn hàng hải và hàng không theo UNCLOS 1982',
      'Tuần tra chung thường niên trên vùng biển giáp ranh',
      'Thiết lập đường dây nóng quân sự - ngoại giao xử lý sự cố'
    ],
    icon: 'Ship',
    tag: 'An ninh Hàng hải'
  },
  {
    id: 'col2-ecology',
    column: 2,
    stepNumber: 2,
    title: 'Bảo vệ Môi trường & Sinh thái Biển',
    subtitle: 'Bảo tồn "lá phổi xanh" và rạn san hô nhiệt đới',
    summary: 'Hợp tác nghiên cứu hải dương học, bảo tồn các rạn san hô quý giá, rừng ngập mặn và ứng phó các sự cố ô nhiễm tràn dầu xuyên biên giới.',
    details: 'Biển Đông là một trong những trung tâm đa dạng sinh học biển của thế giới với hơn 3.000 loài cá và hàng trăm loài san hô. Tuy nhiên, tình trạng ô nhiễm rác thải nhựa đại dương, biến đổi khí hậu và tẩy trắng san hô đòi hỏi sự chung tay của tất cả các quốc gia ven biển.',
    legalBasisOrExample: 'Chương trình Môi trường Biển Đông của UNEP/GEF và các đợt khảo sát khoa học chung biển Việt Nam - Philippines (JOMSRE-SCS).',
    keyPoints: [
      'Giám sát chất lượng nước biển và mức độ axít hóa đại dương',
      'Thiết lập các khu bảo tồn biển liên quốc gia',
      'Quy chế chung ứng phó khẩn cấp sự cố tràn dầu trên biển'
    ],
    icon: 'Waves',
    tag: 'Sinh thái Bền vững'
  },
  {
    id: 'col2-economy',
    column: 2,
    stepNumber: 3,
    title: 'Khai thác Kinh tế & Ngư nghiệp Bền vững',
    subtitle: 'Bảo đảm sinh kế, an ninh lương thực và chống IUU',
    summary: 'Khai thác chung nguồn lợi thủy hải sản, quản lý công bằng hạn ngạch đánh bắt và hợp tác thăm dò khai thác năng lượng dầu khí.',
    details: 'Biển Đông cung cấp 7-8% sản lượng cá thế giới và sở hữu các bồn trũng dầu khí giàu tiềm năng. Hợp tác kinh tế giúp tối ưu hóa nguồn lực, bảo đảm quyền lợi của ngư dân truyền thống, áp dụng công nghệ nuôi biển xa bờ và tuân thủ các quy định chống khai thác bất hợp pháp (IUU).',
    legalBasisOrExample: 'Hiệp định Hợp tác nghề cá Vịnh Bắc Bộ năm 2000 thiết lập vùng đánh cá chung với 2 nguyên tắc bảo tồn sinh vật và bình đẳng năng lực tàu thuyền.',
    keyPoints: [
      'Quản lý mùa cấm đánh bắt cá hợp lý để tái tạo đàn cá',
      'Thúc đẩy gỡ "thẻ vàng" IUU, truy xuất nguồn gốc hải sản',
      'Hợp tác thăm dò dầu khí tại các vùng không tranh chấp'
    ],
    icon: 'Coins',
    tag: 'Kinh tế Biển'
  },
  {
    id: 'col2-sar',
    column: 2,
    stepNumber: 4,
    title: 'Tìm kiếm Cứu nạn Hàng hải (SAR)',
    subtitle: 'Hành động nhân đạo cao cả không phân biệt quốc tịch',
    summary: 'Chia sẻ thông tin bão lũ, tiếp tế nhiên liệu, nước ngọt và cấp cứu y tế khẩn cấp cho thuyền viên, ngư dân gặp tai nạn trên biển.',
    details: 'Biển Đông thường xuyên chịu ảnh hưởng của bão nhiệt đới dữ dội và áp thấp nhiệt đới. Hoạt động tìm kiếm cứu nạn (SAR) là nghĩa vụ quốc tế cao cả theo Công ước SAR 1979 và UNCLOS 1982. Việt Nam luôn mở rộng cửa âu tàu, đảo nổi, đảo chìm để che chắn cho mọi tàu cá gặp bão.',
    legalBasisOrExample: 'Trung tâm Phối hợp tìm kiếm, cứu nạn hàng hải Việt Nam (VMRCC) liên tục phối hợp với các lực lượng SAR quốc tế cứu sống hàng nghìn ngư dân nước ngoài.',
    keyPoints: [
      'Mở âu tàu tại Trường Sa cho tàu cá các nước trú bão an toàn',
      'Cấp cứu y tế nhân đạo miễn phí cho ngư dân gặp nạn',
      'Kết nối thông tin vệ tinh dự báo thời tiết hải văn 24/7'
    ],
    icon: 'LifeBuoy',
    tag: 'Cứu nạn Nhân đạo'
  },

  // --- CỘT 3: HÀNH ĐỘNG QUỐC GIA CỦA VIỆT NAM ---
  {
    id: 'col3-negotiate',
    column: 3,
    stepNumber: 1,
    title: 'Đàm phán Hòa bình Song phương & Đa phương',
    subtitle: 'Kiên trì đối thoại ngoại giao giải quyết mọi bất đồng',
    summary: 'Việt Nam luôn tiên phong đàm phán giải quyết các vùng biển chồng lấn, ký kết các hiệp định phân định ranh giới mẫu mực với các nước láng giềng.',
    details: 'Thực thi nhất quán đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển. Việt Nam đã phân định thành công ranh giới biển với Thái Lan (1997), Vịnh Bắc Bộ với Trung Quốc (2000), phân định thềm lục địa với Indonesia (2003) và đang tiếp tục đàm phán phân định vùng EEZ.',
    legalBasisOrExample: 'Nghị quyết Trung ương 8 khóa XII về "Chiến lược phát triển bền vững kinh tế biển Việt Nam đến năm 2030, tầm nhìn đến năm 2045".',
    keyPoints: [
      'Ký Hiệp định phân định biển với Thái Lan (1997)',
      'Ký Hiệp định phân định Vịnh Bắc Bộ với Trung Quốc (2000)',
      'Tham gia tích cực và trách nhiệm tại diễn đàn ASEAN'
    ],
    icon: 'MessageSquareText',
    tag: 'Ngoại giao Hòa bình'
  },
  {
    id: 'col3-sovereignty',
    column: 3,
    stepNumber: 2,
    title: 'Bảo vệ Chủ quyền Kiên quyết & Kiên trì',
    subtitle: 'Thực thi pháp luật nghiêm minh, đúng luật quốc tế',
    summary: 'Khẳng định vững chắc chủ quyền đối với Hoàng Sa và Trường Sa bằng biện pháp hòa bình, kết hợp sức mạnh tổng hợp của cả hệ thống chính trị.',
    details: 'Nhà nước Việt Nam khẳng định chủ quyền lịch sử và pháp lý liên tục, hòa bình từ nhiều thế kỷ đối với hai quần đảo Hoàng Sa và Trường Sa. Trên biển, các lực lượng Cảnh sát biển, Kiểm ngư và Hải quân kiên trì bám biển, bảo vệ quyền chủ quyền và quyền tài phán theo UNCLOS 1982, làm điểm tựa cho ngư dân vươn khơi bám biển.',
    legalBasisOrExample: 'Luật Biển Việt Nam năm 2012 có hiệu lực từ 01/01/2013 khẳng định rõ Hoàng Sa và Trường Sa là bộ phận không thể tách rời của lãnh thổ Việt Nam.',
    keyPoints: [
      'Hoàng Sa thuộc TP. Đà Nẵng, Trường Sa thuộc tỉnh Khánh Hòa',
      'Đấu tranh bằng các biện pháp pháp lý và ngoại giao hòa bình',
      'Đồng hành, bảo vệ an toàn cho ngư dân trên các ngư trường truyền thống'
    ],
    icon: 'Compass',
    tag: 'Bảo vệ Chủ quyền'
  },
  {
    id: 'col3-international',
    column: 3,
    stepNumber: 3,
    title: 'Hợp tác Quốc tế & Phát triển Kinh tế Biển Xanh',
    subtitle: 'Chung tay vì đại dương hòa bình, thịnh vượng',
    summary: 'Chủ động tham gia các cam kết quốc tế về kinh tế biển tuần hoàn, giảm phát thải, bảo tồn san hô và phát triển năng lượng tái tạo ngoài khơi.',
    details: 'Việt Nam coi biển là không gian sinh tồn và phát triển lâu dài của dân tộc. Việt Nam chuyển đổi mạnh mẽ mô hình kinh tế biển từ "nâu" sang "xanh", phát triển du lịch biển đảo sinh thái, năng lượng gió ngoài khơi, nuôi trồng hải sản công nghệ cao gắn với bảo tồn di sản biển.',
    legalBasisOrExample: 'Nghị quyết số 36-NQ/TW về Chiến lược biển Việt Nam và cam kết Net Zero vào năm 2050 tại Hội nghị COP26.',
    keyPoints: [
      'Xây dựng các công viên bảo tồn biển đảo hiện đại',
      'Phát triển điện gió ngoài khơi tại Nam Trung Bộ',
      'Giáo dục thế hệ trẻ về tình yêu biển đảo quê hương'
    ],
    icon: 'Globe',
    tag: 'Biển Xanh 2045'
  }
];

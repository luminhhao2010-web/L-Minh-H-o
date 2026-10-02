import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Anchor, 
  Fish, 
  Flame, 
  Compass, 
  Scale, 
  FileText, 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  BookOpen, 
  Ship, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Bot
} from 'lucide-react';
import { playClickSound, playTingTingSound } from '../utils/audio';

interface TabPeaceCooperationProps {
  onAskAI?: (question: string) => void;
}

interface PillarModule {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  gradient: string;
  summary: string;
  sections: {
    heading: string;
    subheading?: string;
    bullets: string[];
    keyTerms?: string[];
  }[];
  quickFigures: {
    value: string;
    label: string;
  }[];
  sampleQuestion: string;
}

const PILLARS_DATA: PillarModule[] = [
  {
    id: 'p1',
    number: 1,
    title: 'Vị trí và Vai trò của Biển Đông',
    shortTitle: '1. Vị trí & Vai trò',
    badge: 'Địa - Chính trị & Hàng hải',
    icon: Globe,
    accentColor: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    summary: 'Biển Đông có diện tích khoảng 3,5 triệu km² (lớn thứ 4 thế giới), là cầu nối hàng hải nhộn nhịp bậc nhất giữa Thái Bình Dương và Ấn Độ Dương với 4 eo biển huyết mạch.',
    quickFigures: [
      { value: '~3,5 triệu km²', label: 'Biển lớn thứ 4 thế giới' },
      { value: '3°N-26°B | 100°-121°Đ', label: 'Tọa độ địa lý' },
      { value: '1.212m / 5.559m', label: 'Độ sâu TB / Hố sâu Manila' },
      { value: '4 Eo biển', label: 'Malacca, Taiwan, Bashi, Sunda' }
    ],
    sampleQuestion: 'Hãy phân tích vị trí địa lý, các eo biển huyết mạch và địa chất hình thành của Biển Đông?',
    sections: [
      {
        heading: '1. Tên gọi, Vị trí địa lý & Phạm vi lãnh thổ',
        subheading: 'Biển lớn thứ 4 thế giới với tên gọi đa dạng',
        bullets: [
          'Tên gọi đa dạng: Việt Nam gọi là Biển Đông (cổ đại gọi là Đông Hải); bản đồ quốc tế gọi là South China Sea (Biển Nam Trung Hoa); Philippines gọi là Biển Tây Philippines (West Philippine Sea); Indonesia đặt tên vùng biển phía bắc là Biển Bắc Natuna (North Natuna Sea).',
          'Diện tích ước tính khoảng 3.500.000 km² (hoặc 3,44 - 3,5 triệu km²), trải rộng từ khoảng 3°N đến 26°B và từ 100°Đ đến 121°Đ, là vùng biển chung của 9 quốc gia Đông Nam Á và Trung Quốc.',
          'Độ sâu & Đáy biển: Độ sâu trung bình đạt 1.212 m. Vùng sâu nhất nằm tại Hố sâu Manila (Manila Trench) với độ sâu kỷ lục lên tới khoảng 5.559 m.',
          'Sở hữu hai vịnh lớn chính: Vịnh Bắc Bộ (phía tây bắc, giới hạn bởi bờ biển Việt Nam, đảo Hải Nam và bán đảo Lôi Châu, sâu nông dưới 100 m) và Vịnh Thái Lan (phía tây nam, bao bọc bởi Việt Nam, Campuchia, Thái Lan, Malaysia, độ sâu trung bình chỉ khoảng 45 m).'
        ],
        keyTerms: ['3.500.000 km²', 'Lớn thứ 4 thế giới', '3°N - 26°B & 100°Đ - 121°Đ', 'Độ sâu 1.212 m', 'Hố sâu Manila 5.559 m', 'Vịnh Bắc Bộ', 'Vịnh Thái Lan']
      },
      {
        heading: '2. Vị trí chiến lược & 4 Eo biển huyết mạch',
        subheading: 'Cầu nối hàng hải nhộn nhịp bậc nhất giữa hai đại dương',
        bullets: [
          'Biển Đông đóng vai trò là chiếc cầu nối thủy nội địa huyết mạch giữa Thái Bình Dương và Ấn Độ Dương.',
          'Eo Malacca (Biển Đông ↔ Ấn Độ Dương): Tuyến đường vận chuyển dầu mỏ lớn thứ 2 thế giới đưa dầu thô từ Trung Đông sang Đông Á.',
          'Eo Taiwan / Đài Loan (Biển Đông ↔ Biển Hoa Đông): Cửa ngõ hàng hải phía bắc kết nối thị trường Nhật Bản, Hàn Quốc và Đài Loan.',
          'Eo Bashi / Luzon (Biển Đông ↔ Thái Bình Dương): Tuyến hàng hải và hành lang không phận quốc tế trọng yếu ở Đông Nam Á.',
          'Eo Sunda & Lombok (Biển Đông ↔ Nam Ấn Độ Dương): Tuyến hàng hải thay thế chiến lược cho các tàu chở hàng cực lớn qua Indonesia.',
          'Hơn 1/3 tổng lượng hàng hóa vận chuyển đường biển toàn cầu đi qua Biển Đông mỗi ngày.'
        ],
        keyTerms: ['Eo Malacca', 'Eo Taiwan (Đài Loan)', 'Eo Bashi / Luzon', 'Eo Sunda & Lombok', '1/3 hàng hóa toàn cầu']
      },
      {
        heading: '3. Địa chất hình thành & Các quần đảo chính',
        subheading: 'Cấu tạo vỏ Trái Đất và hệ thống thực thể địa lý',
        bullets: [
          'Thời gian hình thành: Biển Đông được hình thành từ thế Oligocen muộn đến thế Miocen sớm (khoảng 32 – 17 triệu năm trước) thông qua cơ chế tách giãn đáy đại dương (sea-floor spreading).',
          'Quần đảo Hoàng Sa: Gồm hơn 30 đảo, đá, bãi san hô ở phía bắc với hai nhóm chính là nhóm Lưỡi Liềm (Crescent) và nhóm An Vĩnh (Amphitrite). Việt Nam khẳng định chủ quyền lịch sử lâu đời; hiện bị Trung Quốc chiếm đóng trái phép.',
          'Quần đảo Trường Sa: Rộng lớn với hàng trăm thực thể san hô rải rác ở phía nam; Việt Nam đang quản lý và bảo vệ thực tế số lượng thực thể lớn nhất (hơn 30 đảo, đá, bãi ngầm).',
          'Bãi cạn Scarborough (hình vòng atoll ở phía đông gần đảo Luzon, Philippines) và Bãi Macclesfield cùng Quần đảo Đông Sa (Pratas) do Đài Loan kiểm soát.'
        ],
        keyTerms: ['Oligocen - Miocen (32-17 triệu năm)', 'Tách giãn đáy đại dương', 'Nhóm Lưỡi Liềm & An Vĩnh', 'Trường Sa (>30 thực thể)', 'Bãi cạn Scarborough']
      }
    ]
  },
  {
    id: 'p2',
    number: 2,
    title: 'Các nguồn Tài nguyên và Hoạt động khai thác chủ yếu',
    shortTitle: '2. Tài nguyên & Khai thác',
    badge: 'Kinh tế biển toàn diện',
    icon: Fish,
    accentColor: 'text-amber-400',
    gradient: 'from-amber-500/20 to-orange-500/10',
    summary: 'Biển Đông sở hữu kho báu tài nguyên trù phú: thủy sản chiếm 7 - 8% thế giới, ước tính 7.500 km³ khí tự nhiên, hàng tỷ thùng dầu và hơn 1/3 hàng hóa toàn cầu.',
    quickFigures: [
      { value: '7 - 8%', label: 'Sản lượng cá thế giới' },
      { value: '7.500 km³', label: 'Trữ lượng khí tự nhiên' },
      { value: '> 1/3 toàn cầu', label: 'Hàng hóa đường biển' },
      { value: 'Băng cháy', label: 'Khí mê-tan hydrat' }
    ],
    sampleQuestion: 'Trình bày các nguồn tài nguyên thiên nhiên chủ yếu ở Biển Đông và các hoạt động khai thác?',
    sections: [
      {
        heading: '1. Tài nguyên thuỷ sản và nghề cá',
        subheading: 'Ngư trường rộng lớn, năng suất sinh học cao',
        bullets: [
          'Biển Đông có hơn 100 loài cá có giá trị kinh tế cao với trữ lượng phong phú (cá ngừ, cá thu, cá nục, cá hồng, cá trích,...).',
          'Sản lượng khai thác chiếm khoảng 7 - 8% tổng sản lượng cá đánh bắt của toàn thế giới.',
          'Nguồn hải sản quý khác dồi dào: tôm he, tôm hùm, mực nang, mực ống, hải sâm, bào ngư, rong biển.',
          'Hoạt động khai thác: Khai thác thuỷ sản xa bờ, tổ chức nghiệp đoàn nghề cá hiện đại; đồng thời phát triển mạnh nghề nuôi biển công nghệ cao ven bờ và trên đảo.'
        ],
        keyTerms: ['7 - 8% thế giới', '>100 loài cá kinh tế', 'Đánh bắt xa bờ', 'Nuôi trồng thủy sản']
      },
      {
        heading: '2. Tài nguyên khoáng sản và năng lượng biển',
        subheading: 'Nguồn vàng đen thềm lục địa & năng lượng tương lai',
        bullets: [
          'Dầu mỏ ước tính hàng tỷ thùng và khoảng 7.500 km³ khí tự nhiên phân bố tại các bể trầm tích trên thềm lục địa (như bể Cửu Long, Nam Côn Sơn, Sông Hồng,...).',
          'Tài nguyên băng cháy (khí mê-tan hydrat - Gas Hydrate) với tiềm năng năng lượng khổng lồ cho tương lai dưới đáy biển sâu.',
          'Các khoáng sản phi kim loại: cát thạch anh làm thủy tinh quang học, titan, muối biển công nghiệp từ nghề làm muối truyền thống và hiện đại.',
          'Hoạt động khai thác: Thăm dò, khoan hút dầu khí; sản xuất muối; phát triển mạnh mẽ nguồn năng lượng tái tạo mới (điện gió ngoài khơi, năng lượng sóng, điện mặt trời ven biển).'
        ],
        keyTerms: ['Hàng tỷ thùng dầu mỏ', '7.500 km³ khí tự nhiên', 'Băng cháy (Mê-tan hydrat)', 'Điện gió ngoài khơi', 'Bể trầm tích']
      },
      {
        heading: '3. Tài nguyên du lịch & Dịch vụ giao thông vận tải biển',
        subheading: 'Không gian du lịch biển đảo và chuỗi logistics hiện đại',
        bullets: [
          'Lưu thông hơn 1/3 tổng lượng hàng hóa vận chuyển bằng đường biển toàn cầu, kết nối chuỗi cung ứng quốc tế quan trọng nhất châu Á.',
          'Hàng ngàn đảo, quần đảo nhiệt đới, vịnh biển kín gió, bãi cát trắng mịn và hệ sinh thái rạn san hô kỳ thú phát triển du lịch sinh thái, lặn biển và nghỉ dưỡng cao cấp.',
          'Xây dựng hệ thống cảng biển nước sâu, cụm dịch vụ hàng hải quốc tế, trung tâm sửa chữa tàu biển và tiếp nhiên liệu xanh.'
        ],
        keyTerms: ['Hơn 1/3 hàng hóa toàn cầu', 'Du lịch sinh thái biển', 'Rạn san hô', 'Cảng nước sâu', 'Logistics quốc tế']
      }
    ]
  },
  {
    id: 'p3',
    number: 3,
    title: 'Hình thức Hợp tác hòa bình trong khai thác Biển Đông',
    shortTitle: '3. Hình thức Hợp tác',
    badge: 'Cơ chế & Hiệp định',
    icon: Scale,
    accentColor: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    summary: 'Thiết lập các mô hình hợp tác đa dạng từ nghề cá Vịnh Bắc Bộ, khai thác chung dầu khí vùng chồng lấn, cứu hộ cứu nạn đến tuân thủ UNCLOS 1982, DOC và COC.',
    quickFigures: [
      { value: '25/12/2000', label: 'Ký Hiệp định VB Bộ' },
      { value: '2 nguyên tắc', label: 'Vùng đánh cá chung' },
      { value: 'UNCLOS 1982', label: 'Hiến pháp đại dương' },
      { value: 'DOC & COC', label: 'Bộ quy tắc ứng xử' }
    ],
    sampleQuestion: 'Nêu các hình thức hợp tác hòa bình trong khai thác Biển Đông và các hiệp định tiêu biểu?',
    sections: [
      {
        heading: '1. Hợp tác trong khai thác thuỷ sản (nghề cá)',
        subheading: 'Hợp tác quản lý nguồn lợi và cấp phép tàu thuyền',
        bullets: [
          'Tại Vịnh Bắc Bộ: Hiệp định hợp tác nghề cá ở vịnh Bắc Bộ giữa Việt Nam và Trung Quốc (ký ngày 25/12/2000, có hiệu lực từ 30/6/2004).',
          'Xác lập "Vùng đánh cá chung" với 2 NGUYÊN TẮC ĐẶC THÙ: (1) Bảo tồn và quản lý bền vững nguồn lợi thuỷ sản; (2) Bình đẳng về năng lực tàu thuyền giữa hai bên.',
          'Tại Vịnh Thái Lan: Hợp tác giữa Việt Nam, Thái Lan và Cam-pu-chia; tiêu biểu là Hiệp định Vùng nước lịch sử Việt Nam - Cam-pu-chia (1982) và Hiệp định phân định ranh giới biển Việt Nam - Thái Lan (1997) tạo khung pháp lý ổn định an tâm vươn khơi.'
        ],
        keyTerms: ['Hiệp định nghề cá Vịnh Bắc Bộ (2000)', '2 nguyên tắc đặc thù', 'Vùng đánh cá chung', 'Vịnh Thái Lan', 'Vùng nước lịch sử 1982']
      },
      {
        heading: '2. Hợp tác thăm dò và khai thác dầu khí, khoáng sản',
        subheading: 'Mô hình khai thác chung tại các vùng thềm lục địa chồng lấn',
        bullets: [
          'Thiết lập các dự án liên doanh thăm dò và khai thác chung ở các khu vực biển có ranh giới chồng lấn trên nguyên tắc đôi bên cùng có lợi.',
          'Điển hình là mô hình hợp tác khai thác chung dầu khí giữa Ma-lai-xi-a và Thái Lan; thỏa thuận hợp tác thương mại dầu khí giữa Ma-lai-xi-a và Việt Nam trên vùng thềm lục địa chồng lấn năm 1992.'
        ],
        keyTerms: ['Khai thác chung dầu khí', 'Vùng chồng lấn', 'Việt Nam - Ma-lai-xi-a (1992)', 'Ma-lai-xi-a - Thái Lan']
      },
      {
        heading: '3. Bảo vệ môi trường biển, nghiên cứu khoa học & Cứu trợ nhân đạo',
        subheading: 'Tương trợ nhân đạo và bảo tồn hệ sinh thái biển',
        bullets: [
          'Tổ chức các hội thảo khoa học quốc tế về Biển Đông, hợp tác nghiên cứu hải dương học, khí tượng hải văn và khảo sát đa dạng sinh học đáy biển.',
          'Diễn tập phối hợp ứng phó sự cố tràn dầu trên biển; phối hợp tuần tra chung chống cướp biển, cướp có vũ trang và tội phạm xuyên quốc gia.',
          'Thực hiện hoạt động tìm kiếm cứu hộ cứu nạn (SAR), tạo điều kiện cho ngư dân các nước được cập cảng tránh trú bão an toàn.'
        ],
        keyTerms: ['Nghiên cứu hải dương học', 'Ứng phó sự cố tràn dầu', 'Tìm kiếm cứu hộ cứu nạn', 'Phòng chống cướp biển']
      },
      {
        heading: '4. Xây dựng khuôn khổ pháp lý và quy tắc ứng xử quốc tế',
        subheading: 'Thượng tôn luật pháp quốc tế trên biển & Phán quyết PCA 2016',
        bullets: [
          'Tôn trọng và thực thi đầy đủ Công ước Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982) - cơ sở pháp lý cao nhất điều chỉnh mọi hoạt động trên biển và đại dương.',
          'Chuẩn hóa 5 vùng biển theo UNCLOS 1982: Nội thủy (chế độ như đất liền); Lãnh hải 12 hải lý (1 hải lý = 1,852 km, chủ quyền trọn vẹn); Vùng tiếp giáp 12 hải lý (kiểm soát thuế quan, y tế, an ninh); Vùng đặc quyền kinh tế EEZ 200 hải lý (quyền chủ quyền tài nguyên); Thềm lục địa tối thiểu 200 đến 350 hải lý.',
          'Phán quyết Tòa Trọng tài (PCA) tháng 7/2016: Thành lập theo Phụ lục VII UNCLOS 1982, Tòa bác bỏ hoàn toàn yêu sách "Đường chín đoạn" (Đường lưỡi bò) của Trung Quốc vì không có cơ sở pháp lý; khẳng định không thực thể nào tại Trường Sa có vùng đặc quyền kinh tế 200 hải lý riêng biệt.',
          'Thực hiện nghiêm túc Tuyên bố về ứng xử của các bên ở Biển Đông (DOC ký năm 2002 giữa ASEAN và Trung Quốc).',
          'Nỗ lực đẩy nhanh tiến trình đàm phán hoàn thiện Bộ Quy tắc ứng xử ở Biển Đông (COC) có hiệu lực pháp lý ràng buộc, thực chất và khả thi.'
        ],
        keyTerms: ['UNCLOS 1982', '5 vùng biển (1 hải lý = 1,852 km)', 'Phán quyết PCA 2016', 'Bác bỏ đường 9 đoạn', 'DOC 2002', 'COC']
      }
    ]
  },
  {
    id: 'p4',
    number: 4,
    title: 'Ý nghĩa của Hợp tác đối với Phát triển Kinh tế và Môi trường',
    shortTitle: '4. Ý nghĩa Hợp tác',
    badge: 'Phát triển bền vững',
    icon: Anchor,
    accentColor: 'text-purple-400',
    gradient: 'from-purple-500/20 to-indigo-500/10',
    summary: 'Hợp tác hòa bình giúp hóa giải nguy cơ xung đột, tiết kiệm chi phí công nghệ, bảo tồn tính liên thông sinh thái và bảo vệ sinh kế bền vững cho tương lai.',
    quickFigures: [
      { value: 'Hòa bình', label: 'Ổn định đầu tư' },
      { value: 'Tối ưu', label: 'Chia sẻ chi phí & vốn' },
      { value: 'Bảo tồn', label: 'Rạn san hô, rừng đước' },
      { value: 'Liên thông', label: 'Môi trường xuyên biên giới' }
    ],
    sampleQuestion: 'Vì sao hợp tác hòa bình có ý nghĩa quyết định đối với kinh tế và môi trường sinh thái Biển Đông?',
    sections: [
      {
        heading: '1. Ý nghĩa đối với phát triển kinh tế',
        subheading: 'Kiến tạo môi trường đầu tư hòa bình, bền vững',
        bullets: [
          'Giúp giảm thiểu bất đồng và nguy cơ tranh chấp, xây dựng môi trường hòa bình, ổn định để thu hút vốn đầu tư trực tiếp nước ngoài (FDI) và du khách quốc tế.',
          'Tối ưu hóa nguồn lực tài chính, chia sẻ chi phí đầu tư đắt đỏ và chuyển giao công nghệ hiện đại trong thăm dò dầu khí nước sâu, đóng tàu viễn dương và logistics cảng biển.',
          'Thúc đẩy liên kết kinh tế vùng, mở rộng thị trường tiêu thụ hải sản, nâng cao mức sống và an sinh xã hội cho cộng đồng cư dân ven biển.'
        ],
        keyTerms: ['Thu hút FDI', 'Chia sẻ rủi ro tài chính', 'Chuyển giao công nghệ', 'An sinh cư dân ven biển']
      },
      {
        heading: '2. Ý nghĩa đối với bảo vệ môi trường biển',
        subheading: 'Bảo tồn biển nửa kín và ứng phó biến đổi khí hậu',
        bullets: [
          'Duy trì và phục hồi hệ sinh thái biển quan trọng (rạn san hô, thảm cỏ biển, rừng ngập mặn); ngăn ngừa triệt để tình trạng đánh bắt mang tính tận diệt hủy hoại nguồn lợi.',
          'Phối hợp kiểm soát ô nhiễm môi trường biển xuyên biên giới: do Biển Đông là vùng nước liên thông dòng hải lưu, rác thải nhựa đại dương hay vệt dầu loang đều ảnh hưởng tới toàn bộ khu vực.',
          'Nâng cao năng lực cảnh báo sớm thiên tai, bão nhiệt đới và tăng cường sức chống chịu trước tác động của biến đổi khí hậu, nước biển dâng.'
        ],
        keyTerms: ['Tính liên thông dòng biển', 'Bảo tồn rạn san hô', 'Kiểm soát rác thải nhựa', 'Cảnh báo bão & thiên tai']
      }
    ]
  },
  {
    id: 'p5',
    number: 5,
    title: 'Liên hệ Vai trò và Hoạt động của Việt Nam',
    shortTitle: '5. Vai trò Việt Nam',
    badge: 'Trách nhiệm & Chủ quyền',
    icon: ShieldCheck,
    accentColor: 'text-red-400',
    gradient: 'from-red-500/20 to-rose-500/10',
    summary: 'Việt Nam kiên quyết bảo vệ chủ quyền Hoàng Sa, Trường Sa, sở hữu bờ biển dài trên 3.260 km, gương mẫu thực thi UNCLOS 1982, Nghị quyết 36-NQ/TW và kiên quyết chống khai thác IUU.',
    quickFigures: [
      { value: '> 3.260 km', label: 'Chiều dài bờ biển' },
      { value: 'Hoàng Sa & TS', label: 'Chủ quyền thiêng liêng' },
      { value: 'Luật Biển 2012', label: 'Khung pháp lý quốc gia' },
      { value: 'NQ 36-NQ/TW', label: 'Chiến lược biển 2030-2045' }
    ],
    sampleQuestion: 'Trình bày vai trò, hoạt động và các cam kết của Việt Nam trong duy trì hòa bình ở Biển Đông?',
    sections: [
      {
        heading: '1. Chủ quyền thiêng liêng và Căn cứ pháp lý vững chắc',
        subheading: 'Bằng chứng lịch sử liên tục từ thế kỷ 17 và cơ sở pháp lý quốc tế',
        bullets: [
          'Việt Nam là quốc gia ven biển có đường bờ biển dài trên 3.260 km tiếp giáp Biển Đông.',
          'Việt Nam có đầy đủ căn cứ lịch sử xác thực (Châu bản triều Nguyễn, Đội Hoàng Sa, Đại Nam nhất thống toàn đồ 1838) và cơ sở pháp lý vững chắc khẳng định chủ quyền đối với hai quần đảo Hoàng Sa (thuộc thành phố Đà Nẵng) và Trường Sa (thuộc tỉnh Khánh Hòa).',
          'Khẳng định đầy đủ các quyền chủ quyền, quyền tài phán trên các vùng biển (nội thủy, lãnh hải 12 hải lý, tiếp giáp lãnh hải, vùng đặc quyền kinh tế 200 hải lý và thềm lục địa) hoàn toàn phù hợp với UNCLOS 1982.',
          'Ban hành Luật Biển Việt Nam năm 2012 và thực hiện Nghị quyết số 36-NQ/TW (năm 2018) về "Chiến lược phát triển bền vững kinh tế biển Việt Nam đến năm 2030, tầm nhìn đến năm 2045".'
        ],
        keyTerms: ['Bờ biển > 3.260 km', 'Hoàng Sa (Đà Nẵng)', 'Trường Sa (Khánh Hòa)', 'Châu bản triều Nguyễn', 'Luật Biển Việt Nam 2012', 'Nghị quyết 36-NQ/TW']
      },
      {
        heading: '2. Đóng góp gương mẫu trong hợp tác hòa bình',
        subheading: 'Kiên quyết, kiên trì giải quyết bất đồng bằng con đường ngoại giao',
        bullets: [
          'Tiên phong và chủ động đàm phán giải quyết các tranh chấp biển bằng các biện pháp hòa bình trên cơ sở luật pháp quốc tế, tuyệt đối không dùng vũ lực hay đe dọa dùng vũ lực.',
          'Tích cực tham gia và thực hiện đầy đủ, nghiêm túc Tuyên bố DOC 2002; đóng góp có trách nhiệm cao trong đàm phán COC thực chất, hiệu lực, hiệu quả.',
          'Đã thực hiện thành công nhiều thỏa thuận phân định biển mẫu mực: Hiệp định Vùng nước lịch sử với Cam-pu-chia (1982), Phân định ranh giới biển với Thái Lan (1997), Phân định Vịnh Bắc Bộ và Hiệp định Hợp tác nghề cá với Trung Quốc (2000), Phân định thềm lục địa và vùng đặc quyền kinh tế với In-đô-nê-xi-a.'
        ],
        keyTerms: ['Đàm phán hòa bình', 'Thực thi DOC', 'Thúc đẩy COC', 'Phân định biển mẫu mực']
      },
      {
        heading: '3. Khai thác bền vững & Bảo vệ môi trường biển',
        subheading: 'Kinh tế biển xanh gắn liền quốc phòng an ninh nhân dân',
        bullets: [
          'Đẩy mạnh chiến lược phát triển kinh tế biển xanh theo Nghị quyết 36-NQ/TW, mở rộng mạng lưới các khu bảo tồn biển cấp quốc gia.',
          'Tăng cường quản lý đội tàu, lắp đặt thiết bị giám sát hành trình (VMS), quyết liệt phòng chống khai thác hải sản bất hợp pháp, không báo cáo và không theo quy định (IUU) để sớm gỡ cảnh báo "Thẻ vàng" EC.',
          'Lực lượng Cảnh sát biển, Hải quân và Kiểm ngư Việt Nam luôn là chỗ dựa vững chắc, tích cực thực hiện tìm kiếm, cứu nạn nhân đạo cho mọi tàu thuyền trong và ngoài nước gặp nạn.'
        ],
        keyTerms: ['Kinh tế biển xanh', 'Chống khai thác IUU (Thẻ vàng EC)', 'Thiết bị VMS', 'Cứu hộ cứu nạn nhân đạo']
      }
    ]
  }
];

export const TabPeaceCooperation: React.FC<TabPeaceCooperationProps> = ({ onAskAI }) => {
  const [activePillarId, setActivePillarId] = useState<string>('p1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [speakingSection, setSpeakingSection] = useState<string | null>(null);

  const currentPillar = useMemo(() => {
    return PILLARS_DATA.find(p => p.id === activePillarId) || PILLARS_DATA[0];
  }, [activePillarId]);

  // Filtered pillars based on search
  const filteredPillars = useMemo(() => {
    if (!searchQuery.trim()) return PILLARS_DATA;
    const q = searchQuery.toLowerCase();
    return PILLARS_DATA.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
      const matchSections = p.sections.some(s => 
        s.heading.toLowerCase().includes(q) || 
        s.bullets.some(b => b.toLowerCase().includes(q)) ||
        (s.keyTerms && s.keyTerms.some(k => k.toLowerCase().includes(q)))
      );
      return matchTitle || matchSections;
    });
  }, [searchQuery]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speakingSection === id) {
      window.speechSynthesis.cancel();
      setSpeakingSection(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingSection(null);
    utterance.onerror = () => setSpeakingSection(null);
    setSpeakingSection(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#071F36] via-[#0A2D4D] to-[#061828] border border-cyan-500/30 p-5 sm:p-7 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Chuyên đề Học tập Địa lí 11
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-300 border border-white/10">
                NXB Giáo dục Việt Nam • Bộ sách Kết nối tri thức với cuộc sống
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Hợp tác Hòa bình Biển Đông</span>
              <span className="text-2xl select-none">⚓</span>
            </h1>

            <p className="text-sm sm:text-base text-cyan-200/85 max-w-3xl leading-relaxed">
              Hệ thống hóa toàn diện 5 trọng tâm kiến thức khoa học, pháp lý và thực tiễn về vị trí, tài nguyên, hình thức hợp tác hòa bình theo UNCLOS 1982 và vai trò chủ quyền của Việt Nam.
            </p>
          </div>

          {/* Quick Search in Lessons */}
          <div className="w-full md:w-72 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm: Vịnh Bắc Bộ, UNCLOS..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-cyan-500/40 rounded-xl text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Global Key Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
            <div className="text-xs text-slate-400">Diện tích Biển Đông</div>
            <div className="text-lg sm:text-xl font-black text-cyan-300">3,44 triệu km²</div>
            <div className="text-[11px] text-slate-400">Vùng biển chung 9 nước ĐNA & TQ</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
            <div className="text-xs text-slate-400">Tỷ trọng hải sản thế giới</div>
            <div className="text-lg sm:text-xl font-black text-amber-300">7 - 8%</div>
            <div className="text-[11px] text-slate-400">&gt; 100 loài cá kinh tế cao</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
            <div className="text-xs text-slate-400">Khung pháp lý quốc tế</div>
            <div className="text-lg sm:text-xl font-black text-emerald-300">UNCLOS 1982</div>
            <div className="text-[11px] text-slate-400">Hiến pháp đại dương & DOC, COC</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
            <div className="text-xs text-slate-400">Chủ quyền Việt Nam</div>
            <div className="text-lg sm:text-xl font-black text-red-300">Hoàng Sa & Trường Sa</div>
            <div className="text-[11px] text-slate-400">TP. Đà Nẵng & Tỉnh Khánh Hòa</div>
          </div>
        </div>
      </div>

      {/* 5 Pillars Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {PILLARS_DATA.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = activePillarId === pillar.id;

          return (
            <button
              key={pillar.id}
              onClick={() => {
                playClickSound();
                setActivePillarId(pillar.id);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                isActive
                  ? 'bg-[#0E345A] border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                  : 'bg-[#081F36]/80 border-white/10 text-slate-400 hover:border-cyan-400/40 hover:bg-[#0A2644] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${pillar.accentColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                  isActive ? 'bg-cyan-500 text-slate-950' : 'bg-white/10 text-slate-400'
                }`}>
                  MỤC {pillar.number}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-300 line-clamp-1 group-hover:text-white">
                  {pillar.shortTitle}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {pillar.badge}
                </div>
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Pillar Detailed Study Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Comprehensive Study Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#081F36]/90 border border-cyan-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl">
            {/* Pillar Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl bg-white/10 border border-white/10 ${currentPillar.accentColor}`}>
                  <currentPillar.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                      Trọng tâm số 0{currentPillar.number}
                    </span>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                      {currentPillar.badge}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    {currentPillar.title}
                  </h2>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak(currentPillar.id, currentPillar.summary + '. ' + currentPillar.sections.map(s => s.heading + ': ' + s.bullets.join('. ')).join('. '))}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    speakingSection === currentPillar.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 animate-pulse'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                  }`}
                  title="Nghe đọc bài học"
                >
                  {speakingSection === currentPillar.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">
                    {speakingSection === currentPillar.id ? 'Dừng đọc' : 'Nghe đọc'}
                  </span>
                </button>

                <button
                  onClick={() => handleCopyText(currentPillar.id, currentPillar.sections.map(s => `### ${s.heading}\n` + s.bullets.map(b => `- ${b}`).join('\n')).join('\n\n'))}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Sao chép đề cương ôn tập"
                >
                  {copiedSection === currentPillar.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span className="hidden sm:inline">Chép bài</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Pillar Executive Summary */}
            <div className="mt-5 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-100 text-sm leading-relaxed flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-300">Tóm tắt cốt lõi: </span>
                {currentPillar.summary}
              </div>
            </div>

            {/* Sections Detailed Content */}
            <div className="mt-6 space-y-6">
              {currentPillar.sections.map((sec, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      {sec.heading}
                    </h3>
                  </div>

                  {sec.subheading && (
                    <p className="text-xs text-cyan-200/70 font-medium mb-3 pl-4">
                      {sec.subheading}
                    </p>
                  )}

                  <ul className="space-y-2.5 pl-4 text-sm text-slate-200 leading-relaxed list-disc marker:text-cyan-400">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="pl-1">
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Key Terms Chips */}
                  {sec.keyTerms && sec.keyTerms.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5 pl-4">
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        Từ khóa:
                      </span>
                      {sec.keyTerms.map((term, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 font-medium"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Direct Ask AI Footer */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Bạn muốn hiểu sâu hơn về nội dung này?
                  </div>
                  <div className="text-[11px] text-cyan-200/80">
                    Câu hỏi mẫu: "{currentPillar.sampleQuestion}"
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  if (onAskAI) onAskAI(currentPillar.sampleQuestion);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 transition-all transform hover:scale-105 shrink-0 flex items-center gap-1.5"
              >
                <span>Hỏi Kiến Sáng Ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Facts, Exam Flashcard & All 5 Pillars Explorer */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Metrics for Active Pillar */}
          <div className="bg-[#081F36]/90 border border-cyan-500/30 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Số liệu & Điểm thi cần nhớ</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {currentPillar.quickFigures.map((fig, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-base sm:text-lg font-black text-yellow-400">
                    {fig.value}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {fig.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
              <span className="font-bold">Lưu ý khi làm bài:</span> Luôn khẳng định chủ quyền của Việt Nam đối với Hoàng Sa và Trường Sa, đồng thời nhấn mạnh nguyên tắc giải quyết tranh chấp bằng biện pháp hòa bình theo UNCLOS 1982.
            </div>
          </div>

          {/* Quick Pillars Outline Navigator */}
          <div className="bg-[#081F36]/90 border border-cyan-500/30 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-sm font-bold text-white mb-2">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Cây kiến thức 5 trọng tâm
              </span>
              <span className="text-xs text-cyan-300 font-medium">SGK Địa lí 11</span>
            </div>

            <div className="space-y-2">
              {PILLARS_DATA.map((p) => {
                const isSelected = p.id === activePillarId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      playClickSound();
                      setActivePillarId(p.id);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold ring-1 ring-cyan-400'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-slate-400'
                      }`}>
                        {p.number}
                      </span>
                      <span className="text-xs truncate">{p.title}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legal Framework Reference Box */}
          <div className="bg-gradient-to-b from-[#071F36] to-[#04111E] border border-cyan-500/20 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Văn bản Pháp lý Cốt lõi</span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-bold text-white">UNCLOS 1982</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Công ước Liên Hợp Quốc về Luật Biển - Hiến pháp đại dương.</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-bold text-white">Tuyên bố DOC 2002</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Tuyên bố ứng xử các bên tại Biển Đông giữa ASEAN & Trung Quốc.</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-bold text-white">Bộ Quy tắc COC</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Quy tắc ứng xử có hiệu lực pháp lý ràng buộc đang đàm phán.</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-bold text-white">Luật Biển Việt Nam 2012</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Khung pháp lý quốc gia về chủ quyền và kinh tế biển bền vững.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

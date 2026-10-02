import { MapMarkerItem } from '../types';

export const BIEN_DONG_CENTER = {
  lat: 15.5,
  lng: 112.5,
  zoom: 5.5,
};

export const MAP_MARKERS: MapMarkerItem[] = [
  // 1. Quần đảo Hoàng Sa
  {
    id: 'hoang-sa',
    name: 'Quần đảo Hoàng Sa',
    sovereigntyNotice: 'Thuộc thành phố Đà Nẵng, Việt Nam',
    category: 'sovereignty',
    lat: 16.5,
    lng: 112.0,
    subtitle: 'Huyện đảo Hoàng Sa, TP. Đà Nẵng, Việt Nam',
    description: 'Quần đảo san hô thiêng liêng gồm hơn 30 đảo, đá, bãi cạn trải rộng ở vùng biển phía bắc Biển Đông. Việt Nam có đầy đủ bằng chứng lịch sử và cơ sở pháp lý khẳng định chủ quyền không thể chối cãi.',
    badge: 'Chủ quyền thiêng liêng',
    iconType: 'island',
    details: {
      geography: 'Nằm cách bờ biển Đà Nẵng khoảng 170 hải lý về phía đông. Gồm hai nhóm đảo chính là nhóm An Vĩnh (phía đông) và nhóm Lưỡi Liềm (phía tây).',
      legalStatus: 'Thuộc quyền quản lý hành chính của UBND Huyện Hoàng Sa, thành phố Đà Nẵng, Việt Nam. Phù hợp với UNCLOS 1982 và các thư tịch cổ của Nhà nước phong kiến Việt Nam từ thế kỷ XVII.',
      economicPotential: 'Ngư trường khai thác hải sản truyền thống dồi dào, tiềm năng du lịch biển đảo cao cấp, nguồn năng lượng tái tạo gió và sóng biển vô tận.',
      peacefulCooperation: 'Việt Nam chủ trương giải quyết mọi tranh chấp, bất đồng trên cơ sở luật pháp quốc tế, đặc biệt là UNCLOS 1982, tuân thủ nghiêm túc DOC và thúc đẩy ký kết COC.',
      keyFacts: [
        'Huyện đảo Hoàng Sa thành lập trực thuộc TP. Đà Nẵng',
        'Được các Chúa Nguyễn tổ chức Đội Hoàng Sa kiêm quản Bắc Hải từ thế kỷ 17',
        'Vị trí kiểm soát tuyến vận tải hàng hải quốc tế trọng yếu'
      ]
    }
  },

  // 2. Quần đảo Trường Sa
  {
    id: 'truong-sa',
    name: 'Quần đảo Trường Sa',
    sovereigntyNotice: 'Thuộc tỉnh Khánh Hòa, Việt Nam',
    category: 'sovereignty',
    lat: 9.0,
    lng: 113.5,
    subtitle: 'Huyện đảo Trường Sa, Tỉnh Khánh Hòa, Việt Nam',
    description: 'Quần đảo gồm hơn 100 hòn đảo, bãi đá ngầm, rạn san hô và bãi cát ở trung tâm Biển Đông. Là tiền tiêu bảo vệ sườn đông của Tổ quốc, giàu tài nguyên sinh vật và khoáng sản.',
    badge: 'Chủ quyền thiêng liêng',
    iconType: 'island',
    details: {
      geography: 'Cách vịnh Cam Ranh khoảng 250 hải lý. Trải dài trên diện tích biển rộng lớn hơn 160.000 km², án ngữ tuyến hàng hải kết nối Thái Bình Dương và Ấn Độ Dương.',
      legalStatus: 'Thuộc quyền quản lý của UBND Huyện Trường Sa, tỉnh Khánh Hòa. Các điểm đảo có quân dân sinh sống, trường học, trạm y tế, trạm hải đăng và đài khí tượng.',
      economicPotential: 'Ngư trường xa bờ trù phú với hơn 100 loài cá kinh tế, đồi mồi, hải sâm; tiềm năng phát triển năng lượng mặt trời, điện gió và du lịch sinh thái biển đảo.',
      peacefulCooperation: 'Việt Nam tích cực cùng các quốc gia ASEAN xây dựng Trường Sa thành biểu tượng của hòa bình, cứu hộ cứu nạn quốc tế cho ngư dân mọi quốc tịch, nghiên cứu khí tượng hải văn.',
      keyFacts: [
        'Huyện đảo Trường Sa gồm Thị trấn Trường Sa và các xã đảo Song Tử Tây, Sinh Tồn',
        'Hệ thống hải đăng Trường Sa phát sáng dẫn đường an toàn cho tàu thuyền quốc tế',
        'Cung cấp nước ngọt, cứu hộ y tế nhân đạo cho ngư dân quốc tế gặp nạn'
      ]
    }
  },

  // 3. Vịnh Bắc Bộ - Hiệp định phân định & Hợp tác nghề cá
  {
    id: 'vinh-bac-bo',
    name: 'Khu vực Vịnh Bắc Bộ',
    category: 'cooperation',
    lat: 19.5,
    lng: 107.5,
    subtitle: 'Hiệp định phân định và Hợp tác nghề cá Việt Nam - Trung Quốc (2000)',
    description: 'Mô hình mẫu mực về giải quyết tranh chấp biển bằng đàm phán hòa bình. Ngày 25/12/2000, Việt Nam và Trung Quốc đã ký Hiệp định phân định Vịnh Bắc Bộ và Hiệp định Hợp tác nghề cá.',
    badge: 'Hợp tác Hòa bình SGK',
    iconType: 'handshake',
    details: {
      geography: 'Vịnh nửa kín nằm giữa bờ biển miền Bắc Việt Nam và bán đảo Lôi Châu, đảo Hải Nam (Trung Quốc), diện tích khoảng 126.250 km².',
      legalStatus: 'Đường phân định rõ ràng phân định lãnh hải, vùng đặc quyền kinh tế (EEZ) và thềm lục địa theo UNCLOS 1982. Hiệp định xác lập Vùng đánh cá chung.',
      economicPotential: 'Một trong những ngư trường truyền thống trọng điểm của hai nước, dồi dào cá chim, cá thu, tôm he, mực và tiềm năng dầu khí bể trầm tích Sông Hồng.',
      peacefulCooperation: 'Hiệp định xác lập 2 nguyên tắc hợp tác đặc thù: (1) Bảo tồn, quản lý các nguồn lợi thủy sản; (2) Bình đẳng về năng lực tàu thuyền của hai bên.',
      keyFacts: [
        'Ký ngày 25/12/2000 tại Bắc Kinh, có hiệu lực ngày 30/6/2004',
        'Vùng đánh cá chung từ đường đóng cửa vịnh đến vĩ tuyến 20°B, rộng 30,5 hải lý mỗi bên',
        'Bài học điển hình về kiên trì đàm phán dựa trên luật pháp quốc tế'
      ]
    }
  },

  // 4. Vùng nước lịch sử Việt Nam - Cam-pu-chia
  {
    id: 'vn-cambodia',
    name: 'Vùng nước lịch sử Việt Nam - Cam-pu-chia',
    category: 'cooperation',
    lat: 10.1,
    lng: 103.8,
    subtitle: 'Hiệp định về Vùng nước lịch sử (1982) & Hiệp ước biên giới (1985, 2005)',
    description: 'Thỏa thuận hợp tác trong khu vực biển Vịnh Thái Lan giữa Việt Nam và Cam-pu-chia, đảm bảo hài hòa lợi ích và tập quán đánh bắt lâu đời của ngư dân hai nước.',
    badge: 'Hợp tác Song phương',
    iconType: 'handshake',
    details: {
      geography: 'Khu vực tiếp giáp giữa bờ biển Tây Nam Việt Nam (Kiên Giang, Cà Mau) và bờ biển phía nam Cam-pu-chia.',
      legalStatus: 'Dựa trên Hiệp định về Vùng nước lịch sử ký ngày 07/07/1982 và các hiệp ước biên giới quốc gia 1983, 1985, 2005.',
      economicPotential: 'Ngư trường sinh vật ven biển phong phú, bảo đảm an ninh lương thực và sinh kế ổn định cho cư dân ven biển Tây Nam.',
      peacefulCooperation: 'Cho phép ngư dân hai nước duy trì tập quán đánh bắt truyền thống; hai nước tiếp tục phối hợp tuần tra chung và giữ gìn an ninh trật tự trên biển.',
      keyFacts: [
        'Duy trì tập quán đánh bắt truyền thống hòa bình',
        'Tuần tra chung thường niên giữa Hải quân hai nước',
        'Hình mẫu hợp tác láng giềng hữu nghị trên biển Tây Nam'
      ]
    }
  },

  // 5. Phân định ranh giới biển Việt Nam - Thái Lan
  {
    id: 'vn-thailand',
    name: 'Ranh giới biển Việt Nam - Thái Lan',
    category: 'cooperation',
    lat: 8.5,
    lng: 102.5,
    subtitle: 'Hiệp định phân định ranh giới trên biển ký ngày 09/08/1997',
    description: 'Hiệp định phân định biển đầu tiên trong khu vực Đông Nam Á sau khi UNCLOS 1982 có hiệu lực, giải quyết trọn vẹn vùng biển chồng lấn rộng khoảng 6.074 km².',
    badge: 'Phân định Biển Đột phá',
    iconType: 'handshake',
    details: {
      geography: 'Vùng biển chồng lấn nằm sâu trong Vịnh Thái Lan giữa bờ biển nam Việt Nam và đông nam Thái Lan.',
      legalStatus: 'Hiệp định ký ngày 09/08/1997 tại Băng Cốc, phân định ranh giới vùng đặc quyền kinh tế và thềm lục địa một cách công bằng.',
      economicPotential: 'Mở đường cho các hoạt động thăm dò dầu khí, an toàn vận tải và đánh bắt thủy hải sản hợp pháp của hai bên.',
      peacefulCooperation: 'Là minh chứng cho tinh thần đoàn kết ASEAN và thiện chí hòa bình, tuân thủ nguyên tắc công bằng của UNCLOS 1982.',
      keyFacts: [
        'Giải quyết dứt điểm 6.074 km² vùng biển chồng lấn',
        'Hiệp định đầu tiên tại Đông Nam Á áp dụng triệt để UNCLOS 1982',
        'Thúc đẩy hợp tác khai thác chung dầu khí và nghề cá'
      ]
    }
  },

  // 6. Cảng Hải Phòng
  {
    id: 'port-hai-phong',
    name: 'Cảng Hải Phòng',
    category: 'ports',
    lat: 20.86,
    lng: 106.68,
    subtitle: 'Cửa ngõ hàng hải quốc tế hàng đầu miền Bắc Việt Nam',
    description: 'Cảng biển loại đặc biệt của Việt Nam, kết nối trực tiếp với Vịnh Bắc Bộ và các tuyến hàng hải toàn cầu, phục vụ luân chuyển hàng hóa của vùng kinh tế trọng điểm Bắc Bộ.',
    badge: 'Cảng Biển Trọng Điểm',
    iconType: 'port',
    details: {
      geography: 'Nằm tại cửa sông Cấm và khu bến cảng nước sâu Lạch Huyện (Cát Hải, Hải Phòng).',
      legalStatus: 'Cảng biển quốc gia đặc biệt, tiếp nhận tàu container trọng tải lớn đi thẳng sang châu Âu và Mỹ.',
      economicPotential: 'Hàng triệu TEU container qua cảng mỗi năm, động lực tăng trưởng kinh tế công nghiệp và dịch vụ logistics.',
      peacefulCooperation: 'Tham gia mạng lưới cảng biển xanh ASEAN, thúc đẩy tự do hàng hải và thương mại quốc tế.',
      keyFacts: [
        'Cụm cảng nước sâu Lạch Huyện đón tàu siêu trọng tải đến 132.000 DWT',
        'Cửa ngõ ra biển của Hành lang kinh tế Côn Minh - Lào Cai - Hà Nội - Hải Phòng'
      ]
    }
  },

  // 7. Cảng Đà Nẵng
  {
    id: 'port-da-nang',
    name: 'Cảng Đà Nẵng',
    category: 'ports',
    lat: 16.08,
    lng: 108.22,
    subtitle: 'Cửa ngõ ra Biển Đông của Hành lang Kinh tế Đông - Tây (EWEC)',
    description: 'Cảng biển tổng hợp quốc gia loại I ở miền Trung, đóng vai trò kết nối Lào, Thái Lan, Myanmar ra Biển Đông qua tuyến Hành lang Kinh tế Đông - Tây.',
    badge: 'Cửa ngõ Hành lang EWEC',
    iconType: 'port',
    details: {
      geography: 'Nằm trong vịnh Đà Nẵng kín gió, gồm khu bến Tiên Sa và Thọ Quang, đang mở rộng bến cảng Liên Chiểu.',
      legalStatus: 'Cảng quốc tế phục vụ thương mại, du lịch tàu biển và an ninh quốc phòng vùng biển miền Trung.',
      economicPotential: 'Tiếp nhận tàu hàng rời, tàu container và tàu khách du lịch 5 sao quốc tế lớn nhất thế giới.',
      peacefulCooperation: 'Cầu nối liên kết kinh tế tiểu vùng sông Mê Công (GMS) và hợp tác hàng hải hữu nghị trong ASEAN.',
      keyFacts: [
        'Điểm cuối của Hành lang Kinh tế Đông - Tây (EWEC)',
        'Đang triển khai dự án Cảng Liên Chiểu tầm cỡ quốc tế'
      ]
    }
  },

  // 8. Cảng Quy Nhơn
  {
    id: 'port-quy-nhon',
    name: 'Cảng Quy Nhơn',
    category: 'ports',
    lat: 13.77,
    lng: 109.24,
    subtitle: 'Cửa ngõ biển chiến lược của vùng Tây Nguyên và Nam Lào',
    description: 'Cảng biển nằm ở vùng duyên hải Nam Trung Bộ, có độ sâu tự nhiên thuận lợi, kết nối trực tiếp với vùng nguyên liệu lâm nông sản Tây Nguyên và Campuchia.',
    badge: 'Cảng Biển Lược đồ SGK',
    iconType: 'port',
    details: {
      geography: 'Nằm trong đầm Thị Nại, thành phố Quy Nhơn, tỉnh Bình Định.',
      legalStatus: 'Cảng biển loại I của Việt Nam được ghi nhận rõ ràng trên Lược đồ SGK Địa lí 11.',
      economicPotential: 'Chuyên bốc xếp hàng gỗ dăm, nông sản, khoáng sản, liên kết tam giác phát triển Việt Nam - Lào - Campuchia.',
      peacefulCooperation: 'Tạo thuận lợi cho hàng hóa quá cảnh của các nước láng giềng không có biển ra thị trường quốc tế.',
      keyFacts: [
        'Nằm trên Lược đồ SGK Địa lí 11 Kết nối tri thức',
        'Năng suất bốc xếp hàng hóa đứng hàng đầu miền Trung'
      ]
    }
  },

  // 9. Cảng Sài Gòn & Cụm cảng TP. Hồ Chí Minh
  {
    id: 'port-hcm',
    name: 'Cảng TP. Hồ Chí Minh & Cái Mép',
    category: 'ports',
    lat: 10.77,
    lng: 106.70,
    subtitle: 'Trung tâm hàng hải và logistics lớn nhất Việt Nam',
    description: 'Cụm cảng biển sôi động nhất cả nước, kết nối với cụm cảng nước sâu quốc tế Cái Mép - Thị Vải, tạo mạng lưới logistics hàng hải vươn tầm thế giới.',
    badge: 'Trung Tâm Logistics',
    iconType: 'port',
    details: {
      geography: 'Nằm dọc sông Sài Gòn, sông Nhà Bè và cửa biển Vũng Tàu.',
      legalStatus: 'Đầu mối hàng hải loại đặc biệt của quốc gia, phục vụ toàn bộ Vùng kinh tế trọng điểm phía Nam.',
      economicPotential: 'Chiếm hơn 50% tổng lượng hàng hóa container xuất nhập khẩu của cả nước.',
      peacefulCooperation: 'Trung tâm giao lưu thương mại hàng hải quốc tế, ứng dụng công nghệ cảng thông minh và cảng biển xanh.',
      keyFacts: [
        'Cái Mép - Thị Vải nằm trong top cụm cảng nước sâu có tốc độ tăng trưởng nhanh nhất thế giới',
        'Có các tuyến tàu mẹ chạy thẳng tới bờ Tây nước Mỹ mà không cần trung chuyển'
      ]
    }
  },

  // 10. Tuyến Hàng hải Quốc tế & Eo biển Ma-lắc-ca
  {
    id: 'malacca-strait',
    name: 'Eo biển Ma-lắc-ca & Tuyến Hàng hải Biển Đông',
    category: 'cooperation',
    lat: 2.2,
    lng: 102.1,
    subtitle: 'Huyết mạch giao thông hàng hải quốc tế kết nối Ấn Độ Dương - Thái Bình Dương',
    description: 'Một trong những tuyến đường biển nhộn nhịp nhất hành tinh. Biển Đông là cầu nối trung chuyển hơn 1/3 lượng dầu mỏ và hàng hóa thương mại đường biển thế giới.',
    badge: 'Huyết Mạch Quốc Tế',
    iconType: 'lighthouse',
    details: {
      geography: 'Nối Ấn Độ Dương với Biển Đông qua các eo biển Ma-lắc-ca, Xin-ga-po và Sun-đa.',
      legalStatus: 'Được bảo đảm quyền tự do hàng hải và tự do hàng không theo Công ước UNCLOS 1982.',
      economicPotential: 'Mỗi ngày có hàng trăm tàu buôn, siêu tàu chở dầu lưu thông an toàn, huyết mạch cho các nền kinh tế lớn.',
      peacefulCooperation: 'Các nước ASEAN và cộng đồng quốc tế hợp tác chặt chẽ phòng chống cướp biển, an toàn hàng hải và ứng phó sự cố tràn dầu.',
      keyFacts: [
        'Hơn 50% lượng tàu chở dầu thế giới đi qua tuyến đường này',
        'Cần sự phối hợp đa phương để giữ gìn an ninh, an toàn hàng hải hòa bình'
      ]
    }
  },

  // 11. Bể trầm tích Dầu khí Cửu Long & Nam Côn Sơn
  {
    id: 'oil-gas-basin',
    name: 'Bể Dầu khí Thềm Lục Địa Nam Côn Sơn & Cửu Long',
    category: 'resources',
    lat: 8.2,
    lng: 108.5,
    subtitle: 'Mỏ Bạch Hổ, Rạng Đông, Đại Hùng, Lan Tây - Lan Đỏ',
    description: 'Khu vực thềm lục địa phía nam Việt Nam chứa trữ lượng dầu mỏ và khí đốt tự nhiên dồi dào, là trụ cột của ngành công nghiệp khai khoáng và năng lượng quốc gia.',
    badge: 'Tài Nguyên Năng Lượng',
    iconType: 'oil',
    details: {
      geography: 'Nằm hoàn toàn trong vùng đặc quyền kinh tế (EEZ) và thềm lục địa 200 hải lý của Việt Nam.',
      legalStatus: 'Việt Nam thực thi đầy đủ quyền chủ quyền và quyền tài phán theo đúng UNCLOS 1982.',
      economicPotential: 'Khai thác hàng chục triệu tấn dầu thô và hàng tỷ mét khối khí đốt phục vụ các nhà máy điện và phân đạm.',
      peacefulCooperation: 'Hợp tác quốc tế với các tập đoàn dầu khí lớn của Nga, Nhật Bản, Hoa Kỳ, châu Âu trên nguyên tắc tôn trọng độc lập, chủ quyền của Việt Nam.',
      keyFacts: [
        'Mỏ Bạch Hổ phát hiện dầu trong tầng đá móng nứt nẻ - kỳ tích ngành dầu khí Việt Nam',
        'Khí Nam Côn Sơn cung cấp cho cụm khí - điện - đạm Phú Mỹ và Nhơn Trạch'
      ]
    }
  },

  // 12. Ngư trường Sinh vật biển & Rạn san hô Biển Đông
  {
    id: 'marine-fisheries',
    name: 'Ngư trường Sinh vật Biển Đông',
    category: 'resources',
    lat: 12.5,
    lng: 114.0,
    subtitle: 'Chiếm 7 - 8% sản lượng khai thác thủy sản toàn thế giới',
    description: 'Biển Đông sở hữu hệ sinh thái biển nhiệt đới đa dạng phong phú với hơn 100 loài cá có giá trị kinh tế cao, hàng trăm loài san hô và sinh vật phù du quý hiếm.',
    badge: 'Kinh Tế Thủy Sản',
    iconType: 'oil',
    details: {
      geography: 'Trải rộng khắp các vùng nước từ ven bờ đến khơi xa của Biển Đông.',
      legalStatus: 'Yêu cầu các quốc gia hợp tác chống đánh bắt bất hợp pháp, không báo cáo và không theo quy định (IUU).',
      economicPotential: 'Cung cấp thực phẩm và sinh kế trực tiếp cho hàng triệu ngư dân Việt Nam và các nước Đông Nam Á.',
      peacefulCooperation: 'Hợp tác nghiên cứu sinh thái biển, bảo tồn rạn san hô, cấm đánh bắt trong mùa sinh sản để tái tạo tài nguyên.',
      keyFacts: [
        'Chiếm 7 - 8% sản lượng thủy sản khai thác của thế giới theo SGK Địa lí 11',
        'Có trên 100 loài cá có giá trị kinh tế cao (cá ngừ, cá thu, cá nục, mực...)'
      ]
    }
  }
];

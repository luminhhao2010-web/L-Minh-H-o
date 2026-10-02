export interface FAQItem {
  keywords: string[];
  questionPattern: RegExp;
  answer: string;
  reference: string;
  suggestedFollowUps: string[];
}

export const KNOWLEDGE_BASE: FAQItem[] = [
  {
    keywords: ['vị trí', 'vai trò', 'phạm vi', 'diện tích', 'tiếp giáp', 'bao nhiêu nước', 'hàng hải'],
    questionPattern: /(vị trí.*biển đông|vai trò.*biển đông|diện tích.*biển đông|phạm vi.*biển đông|tiếp giáp.*biển đông|tuyến đường hàng hải)/i,
    answer: `Kiến Sáng xin cung cấp thông tin khoa học, chuẩn xác về **Vị trí và Vai trò của Biển Đông** theo Chuyên đề Địa lí 11:

1. **Vị trí địa lý & Phạm vi:**
- **Diện tích:** Khoảng 3,44 triệu km², là vùng biển chung của 9 quốc gia Đông Nam Á (Việt Nam, Cam-pu-chia, Thái Lan, Ma-lai-xi-a, Xin-ga-po, In-đô-nê-xi-a, Bru-nây, Phi-líp-pin) và Trung Quốc.
- **Tọa độ:** Trải rộng từ khoảng 3°N đến 26°B.
- **Giới hạn bao bọc:** Được bao bọc bởi bờ biển của 9 nước Đông Nam Á và Trung Quốc.
- **Kết nối hải trình:** Thông với biển Hoa Đông và biển Nhật Bản (qua eo biển Đài Loan), thông với Thái Bình Dương (qua các biển của Phi-líp-pin), thông với Ấn Độ Dương (qua eo biển Ma-lắc-ca). Có nhiều vịnh biển trọng yếu (vịnh Bắc Bộ, vịnh Thái Lan, vịnh Xu-bích, vịnh Ma-ni-la) và nhiều cảng nước sâu quốc tế.

2. **Vai trò tuyến đường hàng hải quốc tế:**
- Là một trong những tuyến giao thông hàng hải huyết mạch và nhộn nhịp bậc nhất thế giới.
- Cầu nối giao thương hàng hải chiến lược giữa châu Á với châu Âu, châu Phi và châu Đại Dương.

3. **Ý nghĩa chiến lược địa - chính trị, an ninh quốc phòng & kinh tế:**
- Có vị thế chiến lược hàng đầu toàn cầu về quốc phòng, an ninh và chuỗi cung ứng thương mại biển.
- Là không gian sinh tồn, nguồn sống và địa bàn phát triển kinh tế biển trực tiếp cho hơn 500 triệu dân các nước ven bờ.`,
    reference: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Mục 1: Vị trí và vai trò của Biển Đông',
    suggestedFollowUps: [
      'Biển Đông có những nguồn tài nguyên và hoạt động khai thác nào?',
      'Các hình thức hợp tác hòa bình trên Biển Đông gồm những gì?',
      'Ý nghĩa của hợp tác đối với kinh tế và môi trường Biển Đông?'
    ]
  },
  {
    keywords: ['tài nguyên', 'thủy sản', 'khoáng sản', 'dầu khí', 'băng cháy', 'du lịch', 'khai thác'],
    questionPattern: /(tài nguyên.*biển đông|khai thác.*biển đông|thủy sản.*biển đông|dầu mỏ.*khí tự nhiên|băng cháy|du lịch.*biển đông)/i,
    answer: `Dưới đây là tổng hợp có hệ thống về **Các nguồn tài nguyên và hoạt động khai thác chủ yếu ở Biển Đông**:

1. **Tài nguyên thuỷ sản:**
- **Đặc điểm:** Hơn 100 loài cá có giá trị kinh tế cao với trữ lượng phong phú; sản lượng đánh bắt chiếm khoảng 7 - 8% tổng sản lượng cá khai thác của toàn thế giới. Ngoài ra còn có tôm, mực, hải sâm, rong biển quý giá.
- **Hoạt động khai thác:** Khai thác hải sản xa bờ gắn với bảo vệ chủ quyền; đẩy mạnh nuôi trồng thủy sản ven biển và công nghiệp nuôi biển hiện đại.

2. **Tài nguyên khoáng sản và năng lượng:**
- **Đặc điểm:** Bể trầm tích thềm lục địa chứa trữ lượng dầu mỏ và khí đốt tự nhiên rất lớn. Ngoài ra còn có nguồn năng lượng tương lai là băng cháy (mê-tan hydrat), cát thạch anh, muối biển,...
- **Hoạt động khai thác:** Thăm dò và khai thác dầu khí trên thềm lục địa; nghề làm muối công nghiệp; chuyển dịch mạnh mẽ sang năng lượng tái tạo (điện gió ngoài khơi, điện mặt trời ven biển).

3. **Tài nguyên du lịch & Giao thông vận tải biển:**
- **Du lịch biển:** Hệ sinh thái đảo nhiệt đới, rạn san hô, rừng ngập mặn và hàng ngàn bãi tắm biển tuyệt đẹp phát triển du lịch sinh thái, nghỉ dưỡng biển đẳng cấp.
- **Giao thông vận tải:** Xây dựng mạng lưới cảng nước sâu, phát triển các cụm logistics và dịch vụ hàng hải quốc tế.`,
    reference: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Mục 2: Các nguồn tài nguyên và khai thác',
    suggestedFollowUps: [
      'Các hình thức hợp tác hoà bình trong khai thác Biển Đông?',
      'Hiệp định hợp tác nghề cá Vịnh Bắc Bộ 2000 có nội dung gì?',
      'Băng cháy ở Biển Đông là gì?'
    ]
  },
  {
    keywords: ['hình thức hợp tác', 'hợp tác nghề cá', 'vùng đánh cá chung', 'khai thác dầu khí', 'cứu nạn', 'doc', 'coc', 'unclos'],
    questionPattern: /(hình thức hợp tác|hợp tác khai thác|hợp tác nghề cá|hợp tác dầu khí|khai thác chung|vùng chồng lấn|cứu hộ cứu nạn|doc|coc)/i,
    answer: `Kiến Sáng xin trình bày rõ ràng 4 **Hình thức hợp tác hoà bình trọng điểm trong khai thác Biển Đông**:

1. **Hợp tác trong khai thác thuỷ sản (nghề cá):**
- **Tại Vịnh Bắc Bộ:** Hiệp định hợp tác nghề cá giữa Việt Nam và Trung Quốc (ký ngày 25/12/2000), thiết lập Vùng đánh cá chung với 2 nguyên tắc đặc thù: (1) Bảo tồn và quản lý bền vững nguồn lợi thuỷ sản; (2) Bình đẳng về năng lực tàu thuyền.
- **Tại Vịnh Thái Lan:** Thỏa thuận hợp tác giữa Việt Nam, Thái Lan và Cam-pu-chia; tiêu biểu là Hiệp định Vùng nước lịch sử Việt Nam - Cam-pu-chia (1982) và Hiệp định phân định ranh giới trên biển Việt Nam - Thái Lan (1997).

2. **Hợp tác trong thăm dò và khai thác dầu khí, khoáng sản:**
- Thiết lập cơ chế hợp tác khai thác chung tại các vùng chồng lấn trên cơ sở đôi bên cùng có lợi (ví dụ: mô hình hợp tác khai thác chung dầu khí giữa Ma-lai-xi-a và Thái Lan; giữa Ma-lai-xi-a và Việt Nam).

3. **Hợp tác bảo vệ môi trường, nghiên cứu khoa học và cứu trợ nhân đạo:**
- Phối hợp khảo sát hải dương học, tổ chức các diễn đàn khoa học quốc tế về Biển Đông.
- Diễn tập ứng phó sự cố tràn dầu, cứu hộ cứu nạn tàu thuyền gặp sự cố thiên tai, cùng nhau đấu tranh phòng chống nạn cướp biển và buôn lậu trên biển.

4. **Xây dựng khuôn khổ pháp lý và quy tắc ứng xử quốc tế:**
- Thượng tôn Công ước Liên hợp quốc về Luật Biển năm 1982 (UNCLOS 1982) - bản "Hiến pháp của biển và đại dương".
- Thực thi nghiêm túc Tuyên bố về ứng xử của các bên ở Biển Đông (DOC 2002) và tích cực hoàn thiện Bộ Quy tắc ứng xử ở Biển Đông (COC) có tính ràng buộc pháp lý.`,
    reference: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Mục 3: Các hình thức hợp tác hòa bình',
    suggestedFollowUps: [
      'Ý nghĩa của hợp tác đối với phát triển kinh tế và bảo vệ môi trường?',
      'Việt Nam đã có những đóng góp và hành động gì trên Biển Đông?',
      'Hai nguyên tắc đặc thù trong Vùng đánh cá chung Vịnh Bắc Bộ là gì?'
    ]
  },
  {
    keywords: ['ý nghĩa', 'lợi ích', 'tại sao cần hợp tác', 'kinh tế', 'môi trường biển', 'bảo vệ sinh thái'],
    questionPattern: /(ý nghĩa của hợp tác|tại sao phải hợp tác|lợi ích của hợp tác|bảo vệ môi trường biển|phát triển kinh tế biển)/i,
    answer: `Dưới đây là câu trả lời chuẩn xác, có hệ thống về **Ý nghĩa của hợp tác hòa bình ở Biển Đông**:

1. **Đối với phát triển kinh tế:**
- **Ổn định môi trường vĩ mô:** Giảm thiểu tối đa nguy cơ xung đột, duy trì hòa bình để thu hút mạnh mẽ dòng vốn đầu tư quốc tế và phát triển du lịch biển.
- **Tối ưu hóa nguồn lực:** Chia sẻ công nghệ, san sẻ chi phí tài chính rủi ro cao trong thăm dò dầu khí nước sâu, đóng tàu cá hiện đại và phát triển cảng biển quốc tế.
- **Nâng cao chất lượng cuộc sống:** Thúc đẩy liên kết kinh tế vùng ven biển, tạo việc làm và gia tăng thu nhập bền vững cho cộng đồng cư dân ven biển.

2. **Đối với bảo vệ môi trường biển:**
- **Phục hồi hệ sinh thái liên kết:** Bảo tồn các rạn san hô, thảm cỏ biển, rừng ngập mặn; ngăn ngừa tình trạng đánh bắt bằng chất nổ, kích điện và các phương tiện hủy diệt.
- **Kiểm soát ô nhiễm xuyên biên giới:** Vì biển là môi trường nước liên thông, hợp tác giúp kiểm soát rác thải nhựa đại dương, ứng phó kịp thời các vụ tràn dầu và xử lý nước thải công nghiệp ven bờ.
- **Ứng phó biến đổi khí hậu:** Tăng cường chia sẻ dữ liệu khí tượng thủy văn, cảnh báo sớm siêu bão, nước dâng và sóng thần bảo vệ tính mạng nhân dân.`,
    reference: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Mục 4: Ý nghĩa của hợp tác',
    suggestedFollowUps: [
      'Liên hệ vai trò và hoạt động cụ thể của Việt Nam trên Biển Đông?',
      'Căn cứ pháp lý khẳng định chủ quyền Hoàng Sa, Trường Sa của Việt Nam?',
      'Việt Nam giải quyết vấn đề chống khai thác IUU như thế nào?'
    ]
  },
  {
    keywords: ['việt nam', 'vai trò', 'hoạt động', 'chủ quyền', 'hoàng sa', 'trường sa', 'iuu', 'luật biển 2012'],
    questionPattern: /(liên hệ việt nam|vai trò của việt nam|hoạt động của việt nam|chủ quyền việt nam|hoàng sa.*trường sa|luật biển việt nam|iuu)/i,
    answer: `Kiến Sáng xin trình bày chi tiết và khoa học về **Liên hệ vai trò và hoạt động của Việt Nam trên Biển Đông**:

1. **Chủ quyền bất khả xâm phạm & Căn cứ pháp lý vững chắc:**
- **Căn cứ lịch sử và pháp lý:** Việt Nam có đầy đủ bằng chứng lịch sử xác thực và cơ sở pháp lý quốc tế khẳng định chủ quyền lâu đời, liên tục đối với hai quần đảo Hoàng Sa (thuộc TP. Đà Nẵng) và Trường Sa (thuộc tỉnh Khánh Hòa), cũng như các quyền chủ quyền, quyền tài phán theo UNCLOS 1982.
- **Hệ thống luật pháp quốc gia:** Ban hành Luật Biển Việt Nam (2012) và Nghị quyết 36-NQ/TW của Ban Chấp hành Trung ương Đảng về Chiến lược phát triển bền vững kinh tế biển Việt Nam đến năm 2030, tầm nhìn đến năm 2045.

2. **Đóng góp tích cực trong hợp tác hòa bình:**
- **Chủ động đàm phán hòa bình:** Luôn kiên quyết, kiên trì giải quyết mọi bất đồng, tranh chấp biển bằng các biện pháp ngoại giao hòa bình, dựa trên luật pháp quốc tế.
- **Tiên phong thực thi cam kết:** Thực hiện nghiêm túc Tuyên bố DOC 2002; tích cực, trách nhiệm cùng các nước ASEAN đàm phán xây dựng Bộ Quy tắc COC thực chất, hiệu lực, hiệu quả.
- **Ký kết nhiều thỏa thuận mẫu mực:** Hiệp định Vùng nước lịch sử với Cam-pu-chia (1982), Phân định ranh giới biển với Thái Lan (1997), Hiệp định phân định Vịnh Bắc Bộ và Hiệp định Hợp tác nghề cá với Trung Quốc (2000), Phân định thềm lục địa và EEZ với In-đô-nê-xi-a.

3. **Khai thác bền vững & Bảo vệ môi trường:**
- Thực hiện chiến lược phát triển kinh tế biển xanh, bảo tồn khu bảo tồn biển.
- Quyết liệt quản lý đội tàu, gỡ bỏ "thẻ vàng", chống đánh bắt hải sản bất hợp pháp, không báo cáo và không theo quy định (IUU).
- Lực lượng cứu nạn, Cảnh sát biển, Hải quân Việt Nam luôn là điểm tựa vững chắc, kịp thời hỗ trợ nhân đạo cho cả ngư dân Việt Nam và thuyền buồm quốc tế gặp hiểm nguy trên biển.`,
    reference: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Mục 5: Liên hệ Việt Nam & Luật Biển 2012',
    suggestedFollowUps: [
      'Vị trí và vai trò chiến lược của Biển Đông là gì?',
      'Trách nhiệm của học sinh lớp 11 trong bảo vệ chủ quyền biển đảo?',
      'Nghị quyết số 36-NQ/TW có mục tiêu thế nào?'
    ]
  },
  {
    keywords: ['vì sao', 'tại sao', 'lý do', 'hợp tác hòa bình', 'cần hợp tác', 'ý nghĩa'],
    questionPattern: /(vì sao|tại sao|lý do|hợp tác hòa bình|cần hợp tác|mục đích hợp tác)/i,
    answer: `Chào bạn! Chú Kiến Sáng xin giải thích theo Chuyên đề Địa lí 11 nhé:
Các nước ven Biển Đông bắt buộc cần hợp tác hòa bình vì những lý do cốt lõi sau:
1. **Tính liên thông sinh thái & môi trường:** Biển Đông là một vùng biển nửa kín (diện tích 3.44 triệu km²). Ô nhiễm biển, sự cố tràn dầu hay suy thoái rạn san hô ở một khu vực sẽ nhanh chóng lan rộng ra toàn bộ các nước xung quanh.
2. **Khai thác kinh tế bền vững:** Biển Đông cung cấp tới 7 - 8% sản lượng cá thế giới và có trên 100 loài cá kinh tế cao. Nếu các nước đua nhau khai thác tận diệt mà không có hạn ngạch chung, nguồn hải sản sẽ cạn kiệt.
3. **An ninh và tự do hàng hải toàn cầu:** Biển Đông nằm trên tuyến đường biển huyết mạch thứ hai thế giới nối Ấn Độ Dương và Thái Bình Dương qua eo biển Ma-lắc-ca. Bất ổn xung đột sẽ làm tê liệt dòng chảy thương mại quốc tế.
4. **Phòng chống thiên tai và cứu hộ:** Biển Đông thường xuyên hứng chịu bão lũ dữ dội, đòi hỏi các nước phải tương trợ cứu nạn nhân đạo và dự báo khí tượng hải văn chung.
Hợp tác hòa bình chính là chìa khóa bảo đảm lợi ích lâu dài cho tất cả các bên!`,
    reference: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 16, 17, 18',
    suggestedFollowUps: [
      'Việt Nam đã làm gì để duy trì hòa bình trên biển?',
      'Hiệp định phân định Vịnh Bắc Bộ năm 2000 có nội dung gì?'
    ]
  },
  {
    keywords: ['việt nam', 'làm gì', 'chính sách', 'đường lối', 'hòa bình', 'duy trì'],
    questionPattern: /(việt nam đã làm gì|chính sách của việt nam|đường lối của việt nam|hành động của việt nam)/i,
    answer: `Kiến Sáng rất tự hào chia sẻ với bạn về chủ trương của Việt Nam nè:
Việt Nam luôn thực thi nhất quán chính sách hòa bình, hữu nghị và tôn trọng luật pháp quốc tế:
1. **Kiên quyết, kiên trì:** Bảo vệ vững chắc chủ quyền đối với quần đảo Hoàng Sa (thuộc TP. Đà Nẵng) và Trường Sa (thuộc tỉnh Khánh Hòa), cùng các quyền chủ quyền, quyền tài phán theo đúng UNCLOS 1982.
2. **Giải quyết bằng biện pháp hòa bình:** Tuyệt đối không sử dụng vũ lực hoặc đe dọa dùng vũ lực; kiên trì đàm phán giải quyết tranh chấp biển.
3. **Hình mẫu phân định biển mẫu mực:** 
   - Đã ký Hiệp định phân định ranh giới biển với Thái Lan (09/08/1997).
   - Đã ký Hiệp định phân định Vịnh Bắc Bộ và Hiệp định Hợp tác nghề cá với Trung Quốc (25/12/2000).
   - Đã ký Hiệp định vùng nước lịch sử với Cam-pu-chia (1982).
   - Đã phân định thềm lục địa với In-đô-nê-xi-a (2003).
4. **Tích cực xây dựng luật chơi khu vực:** Thực thi nghiêm túc Tuyên bố DOC 2002 và cùng ASEAN thúc đẩy sớm hoàn tất Bộ Quy tắc ứng xử COC thực chất, hiệu lực.`,
    reference: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 19 & Luật Biển Việt Nam 2012',
    suggestedFollowUps: [
      'Hiệp định phân định Vịnh Bắc Bộ năm 2000 có nội dung gì?',
      'Học sinh lớp 11 có thể làm gì để bảo vệ biển đảo quê hương?'
    ]
  },
  {
    keywords: ['vịnh bắc bộ', 'hiệp định', '2000', 'nghề cá', 'trung quốc', 'đánh cá chung'],
    questionPattern: /(vịnh bắc bộ|hiệp định năm 2000|nghề cá vịnh bắc bộ|vùng đánh cá chung)/i,
    answer: `Dưới đây là nội dung cốt lõi của Hiệp định Vịnh Bắc Bộ theo SGK Địa lí 11 mà bạn cần ghi nhớ trong bài kiểm tra nhé:
- **Thời gian & địa điểm ký:** Ngày 25 - 12 - 2000 tại Bắc Kinh giữa Việt Nam và Trung Quốc (có hiệu lực từ ngày 30/6/2004).
- **Phạm vi vùng đánh cá chung:** Giới hạn từ đường đóng cửa vịnh (nối mũi Oanh Ca thuộc đảo Hải Nam đến đảo Cồn Cỏ kéo dài đến bờ biển Việt Nam) đến vĩ tuyến 20°B, cách đường phân định 30,5 hải lí mỗi bên.
- **Hai nguyên tắc đặc thù trong vùng đánh cá chung:**
  1. Nguyên tắc bảo tồn, quản lý các nguồn lợi thủy sản.
  2. Nguyên tắc bình đẳng về năng lực tàu thuyền giữa hai nước.
Hiệp định này đã tạo cơ sở pháp lý vững chắc cho ngư dân hai nước hợp tác hòa bình và bảo vệ bền vững nguồn lợi cá tôm!`,
    reference: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức - Trang 19',
    suggestedFollowUps: [
      'Vùng nước lịch sử Việt Nam - Campuchia được quy định thế nào?',
      'Phân định ranh giới biển Việt Nam - Thái Lan 1997 diễn ra ra sao?'
    ]
  },
  {
    keywords: ['unclos', 'doc', 'coc', 'luật biển', '1982', 'pháp lý'],
    questionPattern: /(unclos|doc|coc|công ước luật biển|hiến pháp đại dương)/i,
    answer: `Bộ ba văn kiện pháp lý then chốt này rất hay xuất hiện trong đề thi Địa lí 11:
1. **UNCLOS 1982 (Công ước Luật Biển LHQ):**
   - Được coi là "Hiến pháp của biển và đại dương".
   - Xác định quy chế 5 vùng biển: Nội thủy, Lãnh hải (12 hải lý), Vùng tiếp giáp lãnh hải (24 hải lý), Vùng đặc quyền kinh tế (EEZ - 200 hải lý), Thềm lục địa.
2. **DOC 2002 (Tuyên bố về ứng xử của các bên ở Biển Đông):**
   - Ký năm 2002 giữa ASEAN và Trung Quốc.
   - Cam kết giải quyết tranh chấp bằng biện pháp hòa bình, tự kiềm chế, không sử dụng vũ lực và không làm phức tạp thêm tình hình.
3. **COC (Bộ Quy tắc ứng xử ở Biển Đông):**
   - Đang trong quá trình đàm phán giữa ASEAN và Trung Quốc.
   - Mục tiêu: Nâng tầm từ một tuyên bố chính trị thành một bộ quy tắc có hiệu lực thực chất và tính ràng buộc pháp lý.`,
    reference: 'Công ước UNCLOS 1982 & Tuyên bố DOC 2002',
    suggestedFollowUps: [
      'Vì sao các nước cần hợp tác hòa bình ở Biển Đông?',
      'Hoàng Sa và Trường Sa thuộc tỉnh thành nào?'
    ]
  },
  {
    keywords: ['hoàng sa', 'trường sa', 'chủ quyền', 'thuộc tỉnh nào', 'thành phố nào', 'huyện đảo'],
    questionPattern: /(hoàng sa|trường sa|thuộc tỉnh nào|thuộc thành phố nào|huyện đảo)/i,
    answer: `Đây là kiến thức thiêng liêng mà mọi công dân Việt Nam đều khắc ghi trong tim:
- **Quần đảo Hoàng Sa** thuộc quyền quản lý hành chính của **thành phố Đà Nẵng** (Huyện đảo Hoàng Sa thành lập từ năm 1997).
- **Quần đảo Trường Sa** thuộc quyền quản lý hành chính của **tỉnh Khánh Hòa** (Huyện đảo Trường Sa gồm Thị trấn Trường Sa và các xã đảo Song Tử Tây, Sinh Tồn).
Việt Nam có đầy đủ chứng cứ lịch sử và căn cứ pháp lý khẳng định chủ quyền đối với hai quần đảo này từ thời các Chúa Nguyễn (thế kỷ XVII) qua Đội Hoàng Sa kiêm quản Bắc Hải.`,
    reference: 'Bản đồ Hành chính Nước CHXHCN Việt Nam & SGK Địa lí 11',
    suggestedFollowUps: [
      'Học sinh chúng em có thể làm gì để góp phần bảo vệ chủ quyền biển đảo?',
      'Việt Nam đã làm gì để duy trì hòa bình trên biển?'
    ]
  },
  {
    keywords: ['học sinh', 'chúng em', 'làm gì', 'thế hệ trẻ', 'trách nhiệm', 'bảo vệ'],
    questionPattern: /(học sinh|chúng em|làm gì|thế hệ trẻ|trách nhiệm|tuổi trẻ)/i,
    answer: `Kiến Sáng rất vui khi các bạn học sinh quan tâm đến trách nhiệm của mình! Dưới đây là những hành động thiết thực nhất:
1. **Nắm vững tri thức:** Học thật tốt môn Địa lí, Lịch sử, hiểu rõ cơ sở pháp lý và lịch sử khẳng định Hoàng Sa, Trường Sa là của Việt Nam.
2. **Lan tỏa thông tin chính xác:** Tuyên truyền thông điệp hòa bình, không lan truyền các thông tin thất thiệt, xuyên tạc trên mạng xã hội.
3. **Bảo vệ môi trường biển:** Thực hiện phân loại rác, nói không với rác thải nhựa khi đi du lịch biển, tham gia các chiến dịch làm sạch bờ biển.
4. **Tri ân lực lượng biển đảo:** Viết thư, gửi lời động viên tới các chú hải quân, cảnh sát biển, kiểm ngư và bà con ngư dân đang ngày đêm kiên cường bám biển giữ vững chủ quyền Tổ quốc!`,
    reference: 'Giáo dục công dân & Chuyên đề Địa lí 11',
    suggestedFollowUps: [
      'Vì sao các nước cần hợp tác hòa bình ở Biển Đông?',
      'Các lĩnh vực hợp tác ưu tiên ở Biển Đông là gì?'
    ]
  },
  {
    keywords: ['nhà giàn', 'dk1', 'thềm lục địa', 'phía nam', 'tư chính', 'phúc tần', 'ba kè', 'huyền trân'],
    questionPattern: /(nhà giàn|dk1|thềm lục địa phía nam|bãi tư chính|bãi phúc tần|ba kè)/i,
    answer: `Kiến Sáng rất tự hào được chia sẻ với bạn về **Hệ thống Nhà giàn DK1** – Biểu tượng ý chí kiên cường giữ biển của Tổ quốc:

1. **Khái niệm & Lịch sử ra đời:**
- **DK1** là tên viết tắt của *Cụm Dịch vụ Kinh tế - Khoa học Kỹ thuật* được thành lập ngày **05/07/1989** theo Quyết định của Chủ tịch Hội đồng Bộ trưởng (nay là Thủ tướng Chính phủ).
- Hệ thống nhà giàn được dựng chân cắm sâu vào nền đá ngầm san hô trên các bãi ngầm ngập nước thuộc **thềm lục địa phía Nam** của Việt Nam (như bãi ngầm Phúc Tần, Ba Kè, Huyền Trân, Quế Đường, Tư Chính, Cà Mau,...).

2. **Vị trí địa lý & Cơ sở pháp lý quốc tế:**
- Khu vực đặt các nhà giàn DK1 hoàn toàn nằm trong **Vùng đặc quyền kinh tế (EEZ) 200 hải lý** và **Thềm lục địa** hoàn toàn hợp pháp của Việt Nam theo đúng quy định của Công ước Luật Biển Liên Hợp Quốc UNCLOS 1982.
- Đây không phải là tranh chấp đảo, mà là vùng đặc quyền kinh tế và thềm lục địa không thể tách rời của đất nước ta.

3. **Ý nghĩa chiến lược:**
- **"Cột mốc chủ quyền sống":** Khẳng định và bảo vệ quyền chủ quyền, quyền tài phán của Việt Nam trên thềm lục địa giàu tài nguyên dầu khí.
- **Nghiên cứu khoa học & Khí tượng:** Thu thập dữ liệu hải dương học, cảnh báo thiên tai sớm, quan trắc khí hậu biển.
- **Điểm tựa nhân đạo cho ngư dân:** Cung cấp nước ngọt, lương thực, cấp cứu y tế và là nơi trú bão an toàn cho tàu bè của bà con ngư dân vươn khơi bám biển.`,
    reference: 'Tư liệu Lịch sử Hải quân Nhân dân Việt Nam & Bộ Tư lệnh Vùng 2 Hải quân',
    suggestedFollowUps: [
      'Châu bản triều Nguyễn khẳng định chủ quyền Hoàng Sa, Trường Sa thế nào?',
      'Phán quyết PCA năm 2016 có ý nghĩa gì đối với Biển Đông?',
      'Hiện tượng nước trồi Ninh Thuận - Bình Thuận là gì?'
    ]
  },
  {
    keywords: ['châu bản', 'triều nguyễn', 'chúa nguyễn', 'đội hoàng sa', 'đội bắc hải', 'đại nam nhất thống', 'lịch sử chủ quyền'],
    questionPattern: /(châu bản|triều nguyễn|chúa nguyễn|đội hoàng sa|đội bắc hải|đại nam nhất thống toàn đồ|bằng chứng lịch sử)/i,
    answer: `Kiến Sáng xin cung cấp những **bằng chứng lịch sử vô giá và liên tục** khẳng định chủ quyền Việt Nam đối với Hoàng Sa và Trường Sa:

1. **Thời Chúa Nguyễn (thế kỷ XVII - XVIII):**
- Nhà nước phong kiến Việt Nam đã thành lập **Đội Hoàng Sa** (gồm 70 suất tráng đinh người làng An Vĩnh, Cù Lao Ré - nay là huyện đảo Lý Sơn, Quảng Ngãi) và **Đội Bắc Hải** kiêm quản.
- Hàng năm vào tháng 2 âm lịch, các đội đi bằng thuyền câu ra Hoàng Sa, Trường Sa thu lượm hải vật, đo vẽ luồng lạch, tuần tra biển và đến tháng 8 thì về kinh đô nộp sản vật.

2. **Châu bản triều Nguyễn (Di sản tư liệu thế giới UNESCO):**
- Châu bản là các văn bản hành chính chính thức của triều đình có bút tích phê bằng mực đỏ của các vị Hoàng đế (Gia Long, Minh Mạng, Thiệu Trị, Tự Đức).
- Rất nhiều tờ Châu bản ghi rõ việc Vua phái quan quân mang thuyền bè ra Hoàng Sa: đo đạc hải trình, vẽ bản đồ, dựng bia chủ quyền, cắm mốc mốc giới, lập miếu thờ và trồng cây xanh để người đi biển nhận diện tránh mắc cạn.

3. **Đỉnh cao bản đồ học - "Đại Nam nhất thống toàn đồ" (1838):**
- Do Quốc sử quán triều Nguyễn phát hành năm 1838 dưới thời vua Minh Mạng, thể hiện Hoàng Sa và Vạn Lý Trường Sa nằm trọn vẹn trong cương vực lãnh thổ Đại Nam.

4. **Thời kỳ cận - hiện đại:**
- **Thời Pháp thuộc:** Chính quyền Pháp đại diện cho Việt Nam tiếp tục dựng cột mốc chủ quyền (1938), trạm khí tượng quốc tế (mã 48-860), hải đăng trên đảo Hoàng Sa.
- **Hội nghị San Francisco (1951):** Thủ tướng Trần Văn Hữu đại diện phái đoàn Việt Nam long trọng tuyên bố khẳng định chủ quyền Hoàng Sa, Trường Sa trước 51 quốc gia mà không nước nào phản đối.`,
    reference: 'Hồ sơ Di sản tư liệu thế giới Châu bản triều Nguyễn & Viện Nghiên cứu Hán Nôm',
    suggestedFollowUps: [
      'Nhà giàn DK1 có ý nghĩa thế nào?',
      'Phán quyết PCA 2016 có nội dung then chốt gì?',
      'Các tuyến cáp quang biển ngầm đi qua Biển Đông?'
    ]
  },
  {
    keywords: ['pca', 'phán quyết', 'toà trọng tài', 'đường 9 đoạn', 'đường lưỡi bò', '2016', 'vụ kiện'],
    questionPattern: /(pca|phán quyết.*2016|toà trọng tài thường trực|đường 9 đoạn|đường lưỡi bò|vụ kiện biển đông)/i,
    answer: `Dưới đây là tóm tắt chuẩn xác về **Phán quyết lịch sử ngày 12/7/2016 của Tòa Trọng tài Thường trực (PCA)** tại La Haye (Hà Lan):

1. **Bác bỏ yêu sách "Đường chín đoạn" (đường lưỡi bò):**
- Tòa Trọng tài khẳng định yêu sách về "quyền lịch sử" đối với các vùng nước bên trong "đường chín đoạn" là hoàn toàn trái với Công ước UNCLOS 1982 và không có giá trị pháp lý.
- Khi các quốc gia tham gia UNCLOS 1982, mọi quyền lịch sử vượt quá phạm vi lãnh hải, EEZ và thềm lục địa theo quy định của Công ước đều không còn hiệu lực.

2. **Quy chế pháp lý của các thực thể tại quần đảo Trường Sa:**
- Tòa kết luận rằng **không có bất kỳ thực thể nào ở quần đảo Trường Sa** đáp ứng điều kiện là một "đảo" theo Điều 121 của UNCLOS (không thể duy trì đời sống con người hoặc đời sống kinh tế riêng).
- Do đó, tất cả các thực thể tại Trường Sa về mặt pháp lý chỉ là "đá" hoặc "bãi lúc nổi lúc chìm". Các thực thể này nhiều nhất chỉ có tối đa 12 hải lý lãnh hải, **hoàn toàn KHÔNG có Vùng đặc quyền kinh tế (EEZ) 200 hải lý hay Thềm lục địa riêng**.

3. **Ý nghĩa to lớn của phán quyết:**
- Thu hẹp đáng kể các vùng biển chồng lấn, khẳng định sự tối thượng của luật pháp quốc tế (UNCLOS 1982).
- Củng cố cơ sở pháp lý vững chắc bảo vệ Vùng đặc quyền kinh tế 200 hải lý và Thềm lục địa hợp pháp của Việt Nam cũng như các nước ven bờ Đông Nam Á.`,
    reference: 'Phán quyết của Tòa Trọng tài Thường trực PCA (La Haye) ngày 12/07/2016',
    suggestedFollowUps: [
      'Căn cứ pháp lý khẳng định chủ quyền Hoàng Sa, Trường Sa của Việt Nam?',
      'UNCLOS 1982 quy định về 5 vùng biển thế nào?',
      'Hiện tượng nước trồi Ninh Thuận - Bình Thuận là gì?'
    ]
  },
  {
    keywords: ['nước trồi', 'upwelling', 'ninh thuận', 'bình thuận', 'hải văn', 'địa chất', 'máng sâu manila'],
    questionPattern: /(nước trồi|upwelling|hiện tượng nước trồi|ninh thuận.*bình thuận|máng sâu manila|địa chất biển đông)/i,
    answer: `Kiến Sáng xin giải thích cho bạn về hiện tượng kỳ thú của hải dương học: **Hiện tượng Nước trồi (Upwelling) Ninh Thuận - Bình Thuận**:

1. **Hiện tượng nước trồi là gì?**
- Nước trồi là hiện tượng dòng nước biển lạnh ở tầng sâu mang theo lượng muối khoáng dinh dưỡng khổng lồ trồi ngược lên bề mặt biển.
- Vùng biển Ninh Thuận - Bình Thuận là 1 trong những khu vực nước trồi mạnh mẽ và đặc trưng bậc nhất trên thế giới.

2. **Nguyên nhân hình thành:**
- Xảy ra vào mùa hè (từ tháng 6 đến tháng 8), khi **gió mùa Tây Nam** thổi mạnh song song với bờ biển Nam Trung Bộ.
- Lực Coriolis và hiệu ứng vận chuyển Ekman đẩy lớp nước ấm trên bề mặt ra xa bờ, tạo ra khoảng trống áp suất buộc dòng nước lạnh sâu (từ 100 - 200m bên dưới) phải dâng trồi lên thay thế.

3. **Hệ quả kinh tế & sinh thái tuyệt vời:**
- Nước tầng sâu chứa hàm lượng phốt-phát, nit-rát, silicat cực cao, kích thích sự bùng nổ của sinh vật phù du (thức ăn của cá).
- Tạo nên **ngư trường trọng điểm trù phú bậc nhất Việt Nam**, quy tụ các đàn cá ngừ đại dương, cá thu, cá nục, mực nang, tôm hùm,... đem lại sản lượng đánh bắt khổng lồ cho ngư dân.

4. **Kiến thức địa chất mở rộng:**
- Biển Đông có độ sâu trung bình 1.149m, nơi sâu nhất là **Máng sâu Manila (Manila Trench)** đạt độ sâu kỷ lục lên tới hơn **5.000m**!`,
    reference: 'Viện Hải dương học Nha Trang & Giáo trình Hải dương học đại cương',
    suggestedFollowUps: [
      'Hệ sinh thái san hô và bò biển Dugong ở Biển Đông thế nào?',
      'Các tuyến cáp quang biển ngầm và cảng nước sâu của Việt Nam?',
      'Nhà giàn DK1 có ý nghĩa thế nào?'
    ]
  },
  {
    keywords: ['cáp quang', 'cáp quang biển', 'cảng nước sâu', 'cái mép', 'thị vải', 'cần giờ', 'aag', 'apg', 'logistics'],
    questionPattern: /(cáp quang biển|cảng nước sâu|cái mép thị vải|siêu cảng cần giờ|hạ tầng biển|kinh tế biển hiện đại)/i,
    answer: `Chào bạn! Cùng Kiến Sáng khám phá **Hạ tầng chiến lược biển 4.0** kết nối Việt Nam với toàn cầu nhé:

1. **Mạng lưới Cáp quang biển ngầm xuyên Biển Đông:**
- Đáy Biển Đông là hành lang thông tin liên lạc huyết mạch của thế giới. Hơn **95% lưu lượng internet quốc tế** của Việt Nam được truyền tải qua các tuyến cáp ngầm này.
- Các tuyến cáp quang lớn kết nối Việt Nam:
  - **AAG** (Asia-America Gateway): Kết nối Đông Nam Á thẳng sang Mỹ.
  - **APG** (Asia Pacific Gateway): Tuyến cáp dung lượng cao nối VN, Singapore, Nhật Bản, Hàn Quốc.
  - **SMW3**: Tuyến cáp xuyên lục địa từ Đông Nam Á sang Tây Á và châu Âu.
  - **ADC & SJC2**: Các tuyến cáp quang biển thế hệ mới tốc độ cực cao đang được khai thác và mở rộng.

2. **Hệ thống Cảng nước sâu & Siêu cảng trung chuyển quốc tế:**
- **Cụm cảng Cái Mép - Thị Vải (Bà Rịa - Vũng Tàu):** Tiếp nhận được những siêu tàu container lớn nhất thế giới (lên tới 250.000 tấn), tàu đi thẳng sang bờ Tây nước Mỹ và châu Âu mà không cần qua cảng trung chuyển trung gian; nằm trong top các cảng có hiệu suất cao nhất thế giới.
- **Dự án Siêu cảng trung chuyển quốc tế Cần Giờ (TP.HCM):** Quy mô dự kiến đón nhận tàu tải trọng đến 250.000 DWT, định hình Việt Nam thành trung tâm logistics hàng hải quốc tế của khu vực.
- **Cảng nước sâu Lạch Huyện (Hải Phòng):** Cảng cửa ngõ quốc tế hiện đại nhất miền Bắc.`,
    reference: 'Cục Hàng hải Việt Nam & Tập đoàn Bưu chính Viễn thông Việt Nam',
    suggestedFollowUps: [
      'Ý nghĩa của hợp tác đối với kinh tế và môi trường Biển Đông?',
      'Hiện tượng nước trồi Ninh Thuận - Bình Thuận là gì?',
      'Nhà giàn DK1 có ý nghĩa chiến lược thế nào?'
    ]
  },
  {
    keywords: ['dugong', 'bò biển', 'nàng tiên cá', 'san hô', 'đồi mồi', 'vích', 'cá ông', 'sinh thái', 'đa dạng sinh học'],
    questionPattern: /(dugong|bò biển|nàng tiên cá|rạn san hô|đồi mồi|vích|tục thờ cá ông|đa dạng sinh học biển đông)/i,
    answer: `Kiến Sáng rất hào hứng giới thiệu với bạn về **Kho tàng sinh thái và văn hóa biển độc đáo** ở Biển Đông:

1. **Bò biển (Dugong) - Huyền thoại "Nàng tiên cá" giữa đời thực:**
- Dugong là loài thú biển hiền lành, chỉ ăn các loại cỏ biển mọc ở vùng nước nông và được coi là nguồn gốc của huyền thoại người cá trong truyền thuyết.
- Tại Việt Nam, quần thể Bò biển quý hiếm và nguy cấp được bảo tồn nghiêm ngặt tại **thảm cỏ biển Vườn quốc gia Phú Quốc (Kiên Giang)** và **Côn Đảo (Bà Rịa - Vũng Tàu)**.

2. **Kỳ quan Rạn san hô Trường Sa và Hoàng Sa:**
- Biển Đông tiếp giáp trung tâm đa dạng sinh học toàn cầu (Tam giác San hô).
- Vùng biển Hoàng Sa và Trường Sa sở hữu hơn **300 loài san hô tạo rạn**, là "ngôi nhà nhiệt đới" cho hàng nghìn loài thủy sinh, rong biển và rùa biển quý hiếm (vích, đồi mồi).
- Đáy biển còn có loài **Trai tai tượng khổng lồ (Tridacna)** dài hơn 1 mét, có tuổi thọ hàng trăm năm.

3. **Tục thờ Cá Ông (Cá Voi) - Nét đẹp văn hóa tâm linh của ngư dân:**
- Đối với ngư dân ven biển miền Trung và Nam Bộ, Cá Voi (được tôn kính gọi là *Đức Ngư Ông*) là vị thần linh cứu giúp người đi biển mỗi khi gặp sóng to gió lớn.
- Khắp dọc bờ biển có hàng trăm lăng thờ Cá Ông (tiêu biểu như Lăng Tân ở đảo Lý Sơn, Dinh Vạn Thủy Tú ở Phan Thiết với bộ xương cá voi khổng lồ lớn nhất Đông Nam Á dài 22m).
- Hằng năm ngư dân tổ chức **Lễ hội Cầu ngư** trang trọng cầu mong mưa thuận gió hòa, sóng yên biển lặng, cá tôm đầy khoang!`,
    reference: 'Viện Tài nguyên và Môi trường biển & Di sản Văn hóa phi vật thể Quốc gia',
    suggestedFollowUps: [
      'Vì sao cần bảo tồn sinh thái Biển Đông?',
      'Nhà giàn DK1 có ý nghĩa thế nào?',
      'Hiện tượng nước trồi Ninh Thuận - Bình Thuận là gì?'
    ]
  },
  {
    keywords: ['tên gọi', 'đông hải', 'south china sea', 'biển tây philippines', 'west philippine sea', 'biển bắc natuna', 'north natuna', 'diện tích biển đông', 'tọa độ biển đông', 'quy mô', 'hố sâu manila', 'độ sâu'],
    questionPattern: /(tên gọi( của)? biển đông|đông hải|south china sea|biển tây philippines|west philippine sea|biển bắc natuna|north natuna|diện tích.*biển đông|tọa độ.*biển đông|quy mô.*biển đông|hố sâu manila|độ sâu.*biển đông|biển lớn thứ)/i,
    answer: `Kiến Sáng xin chia sẻ với bạn về **Tên gọi, Quy mô và Độ sâu của Biển Đông** theo Hồ sơ Tri thức Hải dương học:

1. **Tên gọi đa dạng trong lịch sử và các quốc gia ven biển:**
- **Việt Nam:** Gọi là **Biển Đông** (trong lịch sử cổ đại thời phong kiến còn được gọi là *Đông Hải*).
- **Quốc tế:** Tên phổ biến trên hải đồ quốc tế là **South China Sea** (Biển Nam Trung Hoa).
- **Philippines:** Đặt tên phần biển phía tây lãnh thổ là **Biển Tây Philippines** (*West Philippine Sea*).
- **Indonesia:** Đặt tên vùng ven biển phía bắc quần đảo Natuna là **Biển Bắc Natuna** (*North Natuna Sea*).
- Vùng biển được bao bọc bởi 9 quốc gia Đông Nam Á và Trung Quốc.

2. **Tọa độ & Diện tích khổng lồ:**
- Trải rộng từ khoảng **3°N đến 26°B** và từ **100°Đ đến 121°Đ**.
- Tổng diện tích ước tính khoảng **3.500.000 km²** (xấp xỉ 3,44 – 3,5 triệu km²), là **vùng biển lớn thứ 4 trên thế giới** (sau biển Philippines, biển San Hô và biển Ả Rập).

3. **Độ sâu & Cấu tạo đáy biển:**
- Độ sâu trung bình của Biển Đông đạt **1.212 m**.
- Điểm sâu nhất nằm tại **Hố sâu Manila (Manila Trench)** ở phía đông với độ sâu tối đa ghi nhận lên tới khoảng **5.559 m**!`,
    reference: 'Hồ sơ Tri thức Hải dương học, Wikipedia tiếng Việt & UNCLOS 1982',
    suggestedFollowUps: [
      'Các eo biển huyết mạch kết nối Biển Đông là gì?',
      'Địa chất hình thành Biển Đông thế nào?',
      'Các quần đảo và thực thể địa lý chính trên Biển Đông?'
    ]
  },
  {
    keywords: ['eo biển', 'eo malacca', 'eo đài loan', 'eo taiwan', 'eo bashi', 'eo luzon', 'eo sunda', 'eo lombok', 'eo biển huyết mạch', 'cầu nối hàng hải'],
    questionPattern: /(eo biển.*biển đông|eo malacca|eo đài loan|eo taiwan|eo bashi|eo luzon|eo sunda|eo lombok|các eo biển|huyết mạch hàng hải.*biển đông)/i,
    answer: `Kiến Sáng xin giải đáp về **Vị trí chiến lược & 4 Eo biển huyết mạch** kết nối Biển Đông với đại dương thế giới:

Biển Đông giữ vai trò là **chiếc cầu nối thủy nội địa huyết mạch** giữa Thái Bình Dương và Ấn Độ Dương. Các eo biển then chốt gồm:

1. **Eo Malacca (Biển Đông ↔ Ấn Độ Dương):**
- Nối liền Biển Đông với Ấn Độ Dương qua ngả Singapore, Malaysia và Indonesia.
- Là **tuyến đường vận chuyển dầu mỏ lớn thứ 2 thế giới** đưa dầu thô từ Trung Đông sang các nền kinh tế Đông Á (Trung Quốc, Nhật Bản, Hàn Quốc).

2. **Eo Taiwan / Đài Loan (Biển Đông ↔ Biển Hoa Đông):**
- Nằm giữa đảo Đài Loan và đại lục Trung Quốc, kết nối Biển Đông với biển Hoa Đông.
- Là **cửa ngõ hàng hải phía bắc** kết nối các thị trường kinh tế lớn như Nhật Bản, Hàn Quốc và Đài Loan.

3. **Eo Bashi / Luzon (Biển Đông ↔ Thái Bình Dương):**
- Nằm giữa Đài Loan và đảo Luzon (Philippines).
- Là tuyến hàng hải và hành lang không phận quốc tế đặc biệt quan trọng ở khu vực Đông Nam Á ra Thái Bình Dương.

4. **Eo Sunda & Eo Lombok (Biển Đông ↔ Nam Ấn Độ Dương):**
- Nằm giữa các đảo lớn của Indonesia (Java, Sumatra, Bali, Lombok).
- Là tuyến hàng hải thay thế chiến lược cho các tàu chở dầu và hàng hóa trọng tải cực lớn (siêu tàu VLCC/ULCC không thể qua eo Malacca do mớn nước sâu).`,
    reference: 'Hồ sơ Tri thức Địa chính trị & Báo cáo Hàng hải Quốc tế',
    suggestedFollowUps: [
      'Địa chất và hai vịnh lớn của Biển Đông?',
      'Khung pháp lý 5 vùng biển theo UNCLOS 1982?',
      'Phán quyết PCA 2016 có ý nghĩa gì?'
    ]
  },
  {
    keywords: ['địa chất', 'hình thành biển đông', 'oligocen', 'miocen', 'tách giãn đáy', 'vịnh bắc bộ', 'vịnh thái lan', 'cấu trúc địa hình'],
    questionPattern: /(địa chất.*biển đông|hình thành.*biển đông|oligocen|miocen|tách giãn đáy đại dương|hai vịnh lớn|vịnh bắc bộ.*vịnh thái lan|độ sâu vịnh)/i,
    answer: `Kiến Sáng giải thích chi tiết về **Lịch sử địa chất & Cấu trúc địa hình** Biển Đông:

1. **Thời gian & Cơ chế hình thành:**
- Biển Đông được hình thành từ **thế Oligocen muộn đến thế Miocen sớm (khoảng 32 – 17 triệu năm trước)** trong thời kỳ Kainozoi.
- Cơ chế hình thành chủ yếu thông qua **sự tách giãn đáy đại dương (sea-floor spreading)**, tạo nên bồn trũng sâu ở trung tâm và các thềm lục địa nông xung quanh.

2. **Hai vịnh biển lớn chiến lược:**
- **Vịnh Bắc Bộ (ở phía tây bắc):**
  - Được giới hạn bởi bờ biển phía đông bắc Việt Nam, đảo Hải Nam và bán đảo Lôi Châu (Trung Quốc).
  - Vịnh có độ sâu tương đối nông (trung bình dưới 50 m, nơi sâu nhất dưới 100 m), là ngư trường truyền thống của nhân dân hai nước.
- **Vịnh Thái Lan (ở phía tây nam):**
  - Bao bọc bởi bờ biển 4 nước: Việt Nam, Campuchia, Thái Lan và Malaysia.
  - Là vùng biển nửa kín rất nông với độ sâu trung bình chỉ khoảng **45 m** (nơi sâu nhất khoảng 80 m), giàu tài nguyên dầu khí và sinh vật biển.`,
    reference: 'Hồ sơ Tri thức Địa lý & Viện Hàn lâm Khoa học Địa chất',
    suggestedFollowUps: [
      'Các quần đảo và thực thể địa lý chính trên Biển Đông?',
      'Tên gọi và diện tích Biển Đông?',
      'Hiệp định phân định Vịnh Bắc Bộ 2000 có ý nghĩa gì?'
    ]
  },
  {
    keywords: ['thực thể địa lý', 'hoàng sa', 'trường sa', 'lưỡi liềm', 'an vĩnh', 'scarborough', 'macclesfield', 'đông sa', 'pratas', 'bãi cạn'],
    questionPattern: /(thực thể địa lý|quần đảo chính.*biển đông|nhóm lưỡi liềm|nhóm an vĩnh|scarborough|macclesfield|đông sa|pratas)/i,
    answer: `Kiến Sáng tổng hợp về **Các quần đảo & Thực thể địa lý chính** trên Biển Đông:

Biển Đông chứa hàng trăm đảo, rạn san hô, bãi ngầm và cồn cát, nổi bật gồm:

1. **Quần đảo Hoàng Sa:**
- Gồm hơn **30 đảo, đá, bãi san hô** nằm ở phía bắc Biển Đông.
- Chia thành hai nhóm đảo chính:
  - **Nhóm Lưỡi Liềm (Crescent Group):** Nằm ở phía tây (đảo Hoàng Sa, Pattle, Quang Hòa, Tri Tôn,...).
  - **Nhóm An Vĩnh (Amphitrite Group):** Nằm ở phía đông bắc (đảo Phú Lâm, Linh Côn, Cây,...).
- Việt Nam khẳng định chủ quyền lịch sử và pháp lý liên tục qua các triều đại; hiện bị Trung Quốc dùng vũ lực chiếm đóng trái phép.

2. **Quần đảo Trường Sa:**
- Vùng biển rộng lớn với hàng trăm thực thể san hô rải rác ở phía nam Biển Đông.
- **Việt Nam đang quản lý và bảo vệ thực tế số lượng thực thể lớn nhất (hơn 30 đảo, đá, bãi ngầm)**, trong đó có đảo Trường Sa Lớn, Nam Yết, Sinh Tồn, Song Tử Tây, Phan Vinh, Thuyền Chài, Trường Sa Đông,...

3. **Bãi cạn Scarborough (Hoàng Nham):**
- Là bãi san hô hình vòng (atoll) nằm ở phía đông Biển Đông, cách đảo Luzon (Philippines) khoảng 120 hải lý.
- Hiện là khu vực có tranh chấp quyền kiểm soát giữa Philippines và Trung Quốc.

4. **Bãi Macclesfield & Quần đảo Đông Sa (Pratas):**
- **Bãi Macclesfield:** Nhóm bãi ngầm hoàn toàn chìm dưới mặt nước nằm giữa Hoàng Sa và Luzon.
- **Quần đảo Đông Sa (Pratas):** Nhóm rạn san hô vòng nằm ở phía bắc Biển Đông, hiện do chính quyền Đài Loan kiểm soát thực tế.`,
    reference: 'Hồ sơ Tri thức Địa lý & Biển đảo & Báo cáo Địa danh học Quốc tế',
    suggestedFollowUps: [
      'Châu bản triều Nguyễn khẳng định chủ quyền Hoàng Sa, Trường Sa ra sao?',
      'Phán quyết PCA 2016 có ý nghĩa gì đối với các thực thể ở Biển Đông?',
      'Ý nghĩa của hệ thống Nhà giàn DK1?'
    ]
  },
  {
    keywords: ['tiềm năng tài nguyên', 'sản lượng đánh bắt', '7.500 km3', '7500 km3', 'khí tự nhiên', 'hàng hóa vận chuyển', '1/3 lượng hàng hóa', 'băng cháy', 'kinh tế biển đông'],
    questionPattern: /(tiềm năng tài nguyên.*biển đông|7\.500 km|7500 km|khí tự nhiên.*biển đông|sản lượng đánh bắt.*thế giới|1\/3 lượng hàng hóa|thống kê kinh tế biển đông)/i,
    answer: `Kiến Sáng xin trình bày về **Tiềm năng tài nguyên thiên nhiên & Thống kê kinh tế** vượt trội của Biển Đông:

Biển Đông là một trong những khu vực giàu có bậc nhất hành tinh về sinh học, khoáng sản và tiềm năng logistics:

1. **Tài nguyên Thủy hải sản:**
- Chiếm khoảng **7% – 8% tổng sản lượng đánh bắt cá của toàn thế giới**.
- Đa dạng sinh học phong phú với hơn 1.000 loài cá biển, hàng ngàn loài tôm, mực, cua và hệ sinh thái rạn san hô rộng lớn nuôi dưỡng trữ lượng sinh vật biển khổng lồ.

2. **Dầu khí & Năng lượng đại dương:**
- Trữ lượng dầu mỏ ước tính lên tới **hàng tỷ thùng dầu**.
- Ước tính có khoảng **7.500 km³ khí tự nhiên** tại các bể trầm tích sâu trên thềm lục địa.
- Đáy biển chứa tiềm năng cực lớn về **băng cháy (methane hydrate)** – nguồn năng lượng xanh thay thế chiến lược của thế kỷ 21.

3. **Hàng hải quốc tế & Du lịch biển:**
- Chiếm **hơn 1/3 tổng lượng hàng hóa vận chuyển bằng đường biển toàn cầu** lưu thông qua Biển Đông mỗi năm.
- Hàng nghìn km bờ biển nhiệt đới đẹp, vịnh biển kín gió, bãi cát trắng mịn thích hợp phát triển chuỗi đô thị cảng biển, logistics và du lịch nghỉ dưỡng quốc tế.`,
    reference: 'Hồ sơ Tri thức Tài nguyên & Báo cáo Năng lượng Quốc tế (EIA)',
    suggestedFollowUps: [
      'Hiện tượng nước trồi Ninh Thuận - Bình Thuận là gì?',
      'Hạ tầng cáp quang và cảng nước sâu của Việt Nam?',
      'Chiến lược kinh tế biển Nghị quyết 36-NQ/TW là gì?'
    ]
  },
  {
    keywords: ['5 vùng biển', 'năm vùng biển', 'unclos 1982', 'đường cơ sở', 'nội thủy', 'lãnh hải', 'tiếp giáp lãnh hải', 'vùng đặc quyền kinh tế', 'eez', 'thềm lục địa', '1 hải lý'],
    questionPattern: /(5 vùng biển|năm vùng biển|unclos 1982 quy định|chế độ pháp lý các vùng biển|nội thủy.*lãnh hải|vùng đặc quyền kinh tế.*thềm lục địa|1 hải lý|đường cơ sở.*phân định)/i,
    answer: `Kiến Sáng xin tóm lược chuẩn xác **5 Vùng biển của quốc gia ven biển theo UNCLOS 1982** (dựa trên đường cơ sở):

Theo Công ước Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982), các vùng biển được phân định rõ ràng:

1. **Đường cơ sở (Baseline):**
- Là đường ranh giới làm chuẩn để tính chiều rộng lãnh hải và các vùng biển khác.

2. **Nội thủy (Internal Waters):**
- Vùng nước nằm phía trong đường cơ sở.
- Có **chế độ pháp lý như lãnh thổ trên đất liền**, thuộc chủ quyền hoàn toàn và tuyệt đối của quốc gia ven biển.

3. **Lãnh hải (Territorial Sea):**
- Rộng **12 hải lý** tính từ đường cơ sở (*1 hải lý = 1,852 km*).
- Thuộc **chủ quyền hoàn toàn và đầy đủ** của quốc gia ven biển (bao gồm cả vùng trời phía trên, đáy biển và lòng đất dưới đáy biển). Tàu thuyền nước ngoài được quyền "đi qua không gây hại".

4. **Vùng tiếp giáp lãnh hải (Contiguous Zone):**
- Rộng **12 hải lý tiếp theo** ngoài lãnh hải (tối đa cách đường cơ sở 24 hải lý).
- Quốc gia có quyền kiểm soát, ngăn ngừa và trừng trị các vi phạm về **hải quan, thuế khóa, y tế và nhập cư**.

5. **Vùng đặc quyền kinh tế - EEZ (Exclusive Economic Zone):**
- Mở rộng đến **200 hải lý** tính từ đường cơ sở.
- Quốc gia có **quyền chủ quyền** về thăm dò, khai thác, bảo tồn và quản lý tài nguyên (sinh vật, dầu khí, năng lượng gió/sóng) và **quyền tài phán** đối với nghiên cứu khoa học biển, bảo vệ môi trường. Các nước khác có quyền tự do hàng hải và hàng không.

6. **Thềm lục địa (Continental Shelf):**
- Gồm đáy biển và lòng đất dưới đáy biển mở rộng tự nhiên ra ngoài lãnh hải, tối thiểu **200 hải lý** và có thể mở rộng tối đa lên tới **350 hải lý** (hoặc 100 hải lý tính từ đường đẳng sâu 2.500 m) nếu chứng minh được tính kéo dài tự nhiên của rìa lục địa.`,
    reference: 'Công ước Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982) & Luật Biển Việt Nam 2012',
    suggestedFollowUps: [
      'Phán quyết PCA 2016 có nội dung then chốt gì?',
      'Lập trường và chính sách biển của Việt Nam?',
      'Nhà giàn DK1 nằm ở vùng biển nào của nước ta?'
    ]
  },
  {
    keywords: ['pca 2016', 'phán quyết pca', 'tòa trọng tài', 'đường chín đoạn', 'đường lưỡi bò', 'vụ kiện philippines', 'phụ lục vii'],
    questionPattern: /(phán quyết pca|pca 2016|tòa trọng tài 2016|đường chín đoạn|đường lưỡi bò|vụ kiện philippines|phụ lục vii unclos)/i,
    answer: `Kiến Sáng xin cung cấp thông tin chuẩn xác về **Phán quyết PCA 2016** của Tòa Trọng tài Thường trực:

1. **Bối cảnh & Thẩm quyền Tòa án:**
- Vào tháng 7 năm 2016, Tòa Trọng tài được thành lập theo **Phụ lục VII của UNCLOS 1982** tại La Haye (Hà Lan) đã ra Phán quyết chung thẩm mang tính lịch sử trong vụ kiện giữa Philippines và Trung Quốc.

2. **Các kết luận then chốt của Phán quyết PCA 2016:**
- **Bác bỏ hoàn toàn "Đường chín đoạn" (Đường lưỡi bò):** Tòa tuyên bố yêu sách của Trung Quốc về "quyền lịch sử" đối với các vùng tài nguyên nằm trong đường chín đoạn là hoàn toàn **trái với UNCLOS 1982 và không có giá trị pháp lý**.
- **Quy chế pháp lý của các thực thể tại quần đảo Trường Sa:** Tòa xác định không có bất kỳ thực thể nào ở quần đảo Trường Sa có thể tự duy trì sự sống của con người hoặc đời sống kinh tế riêng để được coi là một "đảo" có vùng đặc quyền kinh tế (EEZ) 200 hải lý hoặc thềm lục địa riêng. Tất cả chỉ là "đá" (chỉ có lãnh hải 12 hải lý) hoặc "bãi cạn lúc nổi lúc chìm" (không có vùng biển riêng).
- **Lên án hành vi phá hủy môi trường biển:** Tòa chỉ trích các hoạt động cải tạo, xây dựng đảo nhân tạo quy mô lớn làm hủy hoại nghiêm trọng các rạn san hô nguyên sơ ở Biển Đông.

3. **Ý nghĩa quốc tế:**
- Phán quyết củng cố tối thượng nguyên tắc thượng tôn pháp luật quốc tế, bảo vệ quyền lợi hợp pháp của các quốc gia ven Biển Đông theo đúng UNCLOS 1982.`,
    reference: 'Phán quyết Tòa Trọng tài PCA ngày 12/7/2016 theo Phụ lục VII UNCLOS 1982',
    suggestedFollowUps: [
      'Khung pháp lý 5 vùng biển theo UNCLOS 1982?',
      'Lập trường và chiến lược biển của Việt Nam?',
      'Ý nghĩa của Tuyên bố DOC và Bộ Quy tắc COC?'
    ]
  },
  {
    keywords: ['lập trường việt nam', 'chiến lược kinh tế biển', '36-nq/tw', 'bờ biển việt nam', '3260 km', '3.260 km', 'iuu', 'doc', 'coc', 'nghị quyết 36'],
    questionPattern: /(lập trường.*việt nam|chiến lược kinh tế biển|nghị quyết 36|36-nq\/tw|bờ biển.*3\.260|bảo vệ chủ quyền biển đảo|chống khai thác iuu)/i,
    answer: `Kiến Sáng xin trình bày về **Lập trường & Chiến lược của Việt Nam** đối với Biển Đông:

Việt Nam là quốc gia ven biển có **đường bờ biển dài trên 3.260 km** tiếp giáp Biển Đông. Quan điểm và chính sách nhất quán của Đảng và Nhà nước ta được thực thi trên 3 trụ cột:

1. **Căn cứ Pháp lý & Lịch sử vững chắc:**
- Khẳng định chủ quyền không thể tranh cãi đối với hai quần đảo **Hoàng Sa và Trường Sa** thông qua các bằng chứng lịch sử liên tục, hòa bình từ thế kỷ 17:
  - Các chúa Nguyễn thành lập *Đội Hoàng Sa* và *Đội Bắc Hải*.
  - Các *Châu bản triều Nguyễn* (Di sản tư liệu thế giới UNESCO) ghi chép việc vua Gia Long, Minh Mạng cử thủy quân cắm mốc, vẽ bản đồ, lập miếu.
  - Tuyên bố chủ quyền tại Hội nghị San Francisco năm 1951 trước 51 quốc gia mà không có nước nào phản đối.

2. **Hòa bình & Thượng tôn Pháp luật quốc tế:**
- Kiên trì, kiên quyết giải quyết mọi tranh chấp, bất đồng bằng **biện pháp hòa bình trên cơ sở luật pháp quốc tế, đặc biệt là UNCLOS 1982**.
- Thực hiện nghiêm túc và đầy đủ **Tuyên bố về ứng xử của các bên ở Biển Đông (DOC 2002)**, đồng thời cùng ASEAN tích cực thúc đẩy sớm đạt được **Bộ Quy tắc ứng xử ở Biển Đông (COC)** hiệu lực, thực chất, phù hợp luật pháp quốc tế.

3. **Chiến lược Kinh tế biển bền vững (Nghị quyết 36-NQ/TW):**
- Triển khai **Nghị quyết số 36-NQ/TW** của Ban Chấp hành Trung ương Đảng về Chiến lược phát triển bền vững kinh tế biển Việt Nam đến năm 2030, tầm nhìn đến năm 2045.
- Đẩy mạnh phát triển kinh tế biển xanh (nuôi biển công nghệ cao, logistics cảng nước sâu, điện gió ngoài khơi).
- Quyết liệt thực hiện các giải pháp **chống khai thác hải sản bất hợp pháp, không báo cáo và không theo quy định (IUU)** nhằm sớm gỡ bỏ cảnh báo "Thẻ vàng" của Ủy ban châu Âu (EC) và bảo vệ hệ sinh thái đại dương.`,
    reference: 'Hồ sơ Tri thức Địa lý & Biển đảo & Nghị quyết số 36-NQ/TW của Ban Chấp hành Trung ương Đảng',
    suggestedFollowUps: [
      'Ý nghĩa chiến lược của hệ thống Nhà giàn DK1?',
      'Phán quyết PCA 2016 có nội dung gì?',
      'UNCLOS 1982 quy định 5 vùng biển như thế nào?'
    ]
  },
  {
    keywords: ['thuyền trưởng trổ tài', 'bộ phát câu hỏi', 'nhận định đúng sai', 'game lật thẻ', 'lật thẻ', 'nhận định ngắn', '10 nhận định', 'địa lý 11'],
    questionPattern: /(thuyền trưởng trổ tài|bộ phát câu hỏi|nhận định đúng sai|game lật thẻ|lật thẻ.*biển đông|10 nhận định.*địa 11|thử thách đúng sai)/i,
    answer: `Chào Thuyền Trưởng! Kiến Sáng đã kích hoạt **Bộ phát câu hỏi cho Game lật thẻ "Thuyền Trưởng Trổ Tài" (Chuyên đề Địa lí 11)** trong Hành trình Vươn Khơi!

Dưới đây là **10 nhận định ngắn chuẩn kiến thức Địa lý 11** (5 câu ĐÚNG và 5 câu SAI được xáo trộn) dưới dạng JSON chuẩn:

\`\`\`json
[
  {"statement": "Biển Đông có diện tích khoảng 3,44 triệu km², trải rộng từ 3°N đến 26°B.", "is_correct": true, "explanation": "Biển Đông là vùng biển nửa kín rộng khoảng 3,44 triệu km², trải từ 3°N đến 26°B."},
  {"statement": "Eo biển Malacca là cửa ngõ nối Biển Đông trực tiếp với Thái Bình Dương.", "is_correct": false, "explanation": "Eo biển Malacca nối Biển Đông với Ấn Độ Dương, không phải Thái Bình Dương."},
  {"statement": "Vịnh Bắc Bộ có độ sâu tương đối nông, trung bình dưới 100 mét.", "is_correct": true, "explanation": "Vịnh Bắc Bộ là vùng biển nông thềm lục địa có độ sâu trung bình dưới 100 mét."},
  {"statement": "Sản lượng đánh bắt cá ở Biển Đông chiếm tới 30% toàn thế giới.", "is_correct": false, "explanation": "Sản lượng khai thác cá ở Biển Đông chỉ chiếm khoảng 7% đến 8% toàn cầu."},
  {"statement": "Việt Nam và Trung Quốc đã ký Hiệp định phân định Vịnh Bắc Bộ năm 2000.", "is_correct": true, "explanation": "Hiệp định phân định Vịnh Bắc Bộ và Hiệp định nghề cá được ký ngày 25/12/2000."},
  {"statement": "Theo UNCLOS 1982, chiều rộng lãnh hải của quốc gia ven biển là 24 hải lý.", "is_correct": false, "explanation": "Theo UNCLOS 1982, chiều rộng lãnh hải tối đa là 12 hải lý tính từ đường cơ sở."},
  {"statement": "Phán quyết PCA 2016 bác bỏ hoàn toàn yêu sách đường chín đoạn phi lý.", "is_correct": true, "explanation": "Tòa PCA tuyên bố đường chín đoạn không có cơ sở pháp lý theo UNCLOS 1982."},
  {"statement": "Băng cháy là loại khoáng sản kim loại quý hiếm dưới đáy thềm lục địa.", "is_correct": false, "explanation": "Băng cháy (mê-tan hydrat) là nguồn năng lượng hóa thạch thể rắn, không phải khoáng sản kim loại."},
  {"statement": "Quần đảo Hoàng Sa thuộc Đà Nẵng, quần đảo Trường Sa thuộc tỉnh Khánh Hòa.", "is_correct": true, "explanation": "Về hành chính, Hoàng Sa thuộc huyện Hoàng Sa (Đà Nẵng), Trường Sa thuộc huyện Trường Sa (Khánh Hòa)."},
  {"statement": "Vùng đặc quyền kinh tế cho phép quốc gia ven biển áp đặt chủ quyền tuyệt đối.", "is_correct": false, "explanation": "Quốc gia chỉ có quyền chủ quyền về kinh tế và quyền tài phán, không có chủ quyền tuyệt đối."}
]
\`\`\`

Bạn có thể chuyển sang tab **"Hành Trình Vươn Khơi"** để trực tiếp chơi chế độ **"Lật thẻ: Thuyền Trưởng Trổ Tài"**, lật thẻ 3D, thử tài phản xạ và rinh thêm Xu thưởng nhé!`,
    reference: 'Chuyên đề Địa lí 11 & Bộ đề thi trắc nghiệm Đúng/Sai Biển Đông',
    suggestedFollowUps: [
      'Chơi game lật thẻ Thuyền Trưởng Trổ Tài ngay!',
      'Khung pháp lý 5 vùng biển theo UNCLOS 1982?',
      'Phán quyết PCA 2016 có nội dung then chốt gì?'
    ]
  }
];

export function getAnswerFromKnowledgeBase(userQuery: string): { text: string; reference?: string; suggestions?: string[] } {
  const query = userQuery.trim().toLowerCase();

  for (const item of KNOWLEDGE_BASE) {
    if (item.questionPattern.test(query)) {
      return {
        text: item.answer,
        reference: item.reference,
        suggestions: item.suggestedFollowUps
      };
    }
  }

  // Keyword match fallback
  for (const item of KNOWLEDGE_BASE) {
    const matchCount = item.keywords.filter(kw => query.includes(kw)).length;
    if (matchCount >= 2) {
      return {
        text: item.answer,
        reference: item.reference,
        suggestions: item.suggestedFollowUps
      };
    }
  }

  // Generic friendly fallback based on the textbook
  return {
    text: `Chào bạn! Kiến Sáng đã nhận được câu hỏi "${userQuery}".
Trong Chuyên đề Địa lí 11 "Hợp tác hòa bình trong khai thác Biển Đông và liên hệ Việt Nam", chúng ta chú trọng vào:
- Vị trí chiến lược (3.44 triệu km², từ 3°N đến 26°B).
- Nguồn lợi thủy sản (chiếm 7-8% sản lượng thế giới, >100 loài cá kinh tế).
- Các hiệp định hợp tác hòa bình mẫu mực (Hiệp định nghề cá Vịnh Bắc Bộ 2000, Vùng nước lịch sử VN - Campuchia 1982, Phân định ranh giới VN - Thái Lan 1997).
- Cơ sở pháp lý tối cao UNCLOS 1982, Tuyên bố DOC 2002 và đàm phán COC.
- Khẳng định chủ quyền thiêng liêng Hoàng Sa (TP. Đà Nẵng) và Trường Sa (tỉnh Khánh Hòa).

Bạn có thể bấm vào một trong các câu hỏi gợi ý bên dưới để Kiến Sáng giải thích chi tiết nhé!`,
    reference: 'SGK Chuyên đề Địa lí 11 Kết nối tri thức',
    suggestions: [
      'Vì sao các nước cần hợp tác hòa bình ở Biển Đông?',
      'Việt Nam đã làm gì để duy trì hòa bình trên biển?',
      'Hiệp định phân định Vịnh Bắc Bộ năm 2000 có nội dung gì?'
    ]
  };
}

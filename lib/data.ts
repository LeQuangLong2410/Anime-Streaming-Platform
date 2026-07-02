export interface Anime {
  id: string
  title: string // Vietnamese name
  engTitle?: string // English name
  jpTitle?: string // Japanese name
  slug: string
  poster?: string
  banner?: string
  rating: number
  episode: string
  description: string
  genre: string[]
  subtitle?: string
  year?: number | string
  studio?: string
  views?: string
  cast?: string[]
  quality?: string
  releaseDate?: string
  type?: 'bo' | 'le' | 'hh' | 'xuan'
}

export const trendingAnime: Anime[] = [
  {
    id: 't1', title: 'Jujutsu Kaisen Season 2', engTitle: 'Jujutsu Kaisen', slug: 'jujutsu-kaisen-season-2',
    banner: '/images/anime/banner/JujutsuKaisen.jpg', poster: '/images/anime/poster/JJK.jpg', rating: 4.9, episode: 'Ep 23', quality: 'FHD',
    year: 2023, studio: 'MAPPA', views: '189,432,100',
    cast: ['Yuji Itadori', 'Megumi Fushiguro', 'Nobara Kugisaki'],
    description: 'Yuji Itadori và những người bạn đối mặt với những nguy hiểm mới khi Sự Kiện Shibuya bắt đầu.',
    genre: ['Action', 'Supernatural', 'Shounen']
  },
  {
    id: 't2', title: 'Demon Slayer: Swordsmith Village Arc', engTitle: 'Demon Slayer', slug: 'demon-slayer-swordsmith',
    banner: '/images/anime/banner/DemonSlayer.jpg', poster: '/images/anime/poster/demonslayer.jpg', rating: 4.8, episode: 'Ep 11', quality: 'FHD',
    year: 2023, studio: 'ufotable', views: '201,543,200',
    cast: ['Tanjiro Kamado', 'Nezuko Kamado', 'Inosuke Hashibira'],
    description: 'Tanjiro hành trình đến làng thợ rèn và phải giải thích vì sao thanh kiếm của mình bị hỏng nặng.',
    genre: ['Action', 'Historical', 'Supernatural']
  },
  {
    id: 't3', title: 'Attack on Titan: The Final Chapters', engTitle: 'Attack on Titan', slug: 'aot-final-chapters',
    banner: '/images/anime/banner/AOTbanner.jpg', poster: '/images/anime/poster/AOT.jpg', rating: 5.0, episode: 'Special 2', quality: 'FHD',
    year: 2023, studio: 'MAPPA', views: '312,876,500',
    cast: ['Eren Yeager', 'Mikasa Ackerman', 'Armin Arlert'],
    description: 'Số phận của thế giới nằm trong tay khi Eren tung ra sức mạnh tối thượng của Titan Thủy Tổ.',
    genre: ['Action', 'Drama', 'Suspense']
  },
  {
    id: 't4', title: 'One Piece', engTitle: 'One Piece', slug: 'one-piece',
    banner: '/images/anime/banner/OPbanner.png', poster: '/images/anime/poster/OP.jpg', rating: 4.7, episode: 'Ep 1089', quality: 'FHD',
    year: 1999, studio: 'Toei Animation', views: '998,123,456',
    cast: ['Monkey D. Luffy', 'Roronoa Zoro', 'Nami'],
    description: 'Monkey D. Luffy không để bất cứ ai hay bất cứ điều gì cản trở hành trình trở thành Vua Hải Tặc.',
    genre: ['Action', 'Adventure', 'Fantasy']
  },
  {
    id: 't5', title: 'Bleach: Thousand-Year Blood War', engTitle: 'Bleach', slug: 'bleach-tybw',
    banner: '/images/anime/banner/Bleachbanner.jpeg', poster: '/images/anime/poster/Bleach.jpg', rating: 4.9, episode: 'Ep 26', quality: 'FHD',
    year: 2022, studio: 'Pierrot', views: '245,678,900',
    cast: ['Ichigo Kurosaki', 'Rukia Kuchiki', 'Renji Abarai'],
    description: 'Hòa bình bị phá vỡ khi còi báo động vang lên khắp Soul Society. Cư dân đang biến mất không dấu vết.',
    genre: ['Action', 'Supernatural']
  },
  {
    id: 't6', title: 'Chainsaw Man', engTitle: 'Chainsaw Man', slug: 'chainsaw-man',
    poster: '/images/anime/poster/Chainsawman.jpg', rating: 4.8, episode: 'Ep 12', quality: 'FHD',
    year: 2022, studio: 'MAPPA', views: '176,543,200',
    cast: ['Denji', 'Makima', 'Power'],
    description: 'Denji là chàng trai trẻ sống cùng Quỷ Cưa Pochita. Do món nợ cha để lại, anh phải sống cuộc đời tận đáy.',
    genre: ['Action', 'Supernatural', 'Gore']
  },
  {
    id: 't7', title: 'Spy x Family', engTitle: 'Spy x Family', slug: 'spy-x-family',
    poster: '/images/anime/poster/SpyxFamily.jpg', rating: 4.8, episode: 'Ep 37', quality: 'FHD',
    year: 2022, studio: 'Wit Studio', views: '154,321,000',
    cast: ['Loid Forger', 'Yor Forger', 'Anya Forger'],
    description: 'Một điệp viên, một sát thủ và một nhà ngoại cảm đóng giả làm gia đình, mỗi người vì lý do riêng.',
    genre: ['Comedy', 'Action', 'Slice of Life']
  },
  {
    id: 't8', title: 'My Hero Academia Season 6', engTitle: 'My Hero Academia', slug: 'mha-s6',
    poster: '/images/anime/poster/MyheroAcademia.jpg', rating: 4.6, episode: 'Ep 25', quality: 'FHD',
    year: 2022, studio: 'Bones', views: '198,765,400',
    cast: ['Izuku Midoriya', 'Katsuki Bakugo', 'Shoto Todoroki'],
    description: 'Các anh hùng phát động cuộc tấn công toàn diện vào phe phản diện, dẫn đến cuộc chiến thay đổi xã hội.',
    genre: ['Action', 'Superhero']
  },
  {
    id: 't9', title: 'Oshi no Ko', engTitle: 'Oshi no Ko', slug: 'oshi-no-ko',
    poster: '/images/anime/poster/OshiNoKo.jpg', rating: 4.9, episode: 'Ep 11', quality: 'FHD',
    year: 2023, studio: 'Doga Kobo', views: '167,890,300',
    cast: ['Aquamarine Hoshino', 'Ruby Hoshino', 'Ai Hoshino'],
    description: 'Một bác sĩ và bệnh nhân được đầu thai làm sinh đôi của thần tượng nổi tiếng Nhật Bản.',
    genre: ['Drama', 'Supernatural', 'Mystery']
  },
  {
    id: 't10', title: 'Solo Leveling', engTitle: 'Solo Leveling', slug: 'solo-leveling',
    poster: '/images/anime/poster/SoloLeveling.jpg', rating: 4.9, episode: 'Ep 12', quality: 'FHD',
    year: 2024, studio: 'A-1 Pictures', views: '223,456,789',
    cast: ['Sung Jin-Woo', 'Cha Hae-In', 'Go Gun-Hee'],
    description: 'Trong thế giới săn thủ chiến đấu với quái vật, kẻ yếu nhất phát hiện chương trình bí ẩn giúp anh trở nên mạnh nhất.',
    genre: ['Action', 'Fantasy', 'Adventure']
  }
]

export const popularAnime: Anime[] = [
  {
    id: 'p1', title: 'Naruto Shippuden', engTitle: 'Naruto Shippuden', slug: 'naruto-shippuden',
    poster: '/images/anime/poster/NarutoShippuden.png', rating: 4.8, episode: 'Ep 500', quality: 'FHD',
    year: 2007, studio: 'Pierrot', views: '876,543,210', releaseDate: '07-2026', type: 'bo',
    cast: ['Naruto Uzumaki', 'Sasuke Uchiha', 'Sakura Haruno'],
    description: 'Naruto Uzumaki trở lại sau hai năm rưỡi luyện tập trên đường cùng Jiraiya của Sannin.',
    genre: ['Action', 'Adventure', 'Martial Arts']
  },
  {
    id: 'p2', title: 'Hunter x Hunter', engTitle: 'Hunter x Hunter', slug: 'hunter-x-hunter',
    poster: '/images/anime/poster/HunterxHunter.jpg', rating: 4.9, episode: 'Ep 148', quality: 'FHD',
    year: 2011, studio: 'Madhouse', views: '432,109,876', releaseDate: '05-07-2026', type: 'bo',
    cast: ['Gon Freecss', 'Killua Zoldyck', 'Kurapika'],
    description: 'Gon Freecss khao khát trở thành Hunter để tìm người cha mất tích của mình.',
    genre: ['Action', 'Adventure', 'Fantasy']
  },
  {
    id: 'p3', title: 'Mushoku Tensei III: Isekai Ittara Honki Dasu', engTitle: 'Mushoku Tensei', slug: 'mushoku-tensei-iii',
    poster: '/images/anime/poster/Mushoku.jpg', rating: 4.9, episode: 'Ep 1', quality: 'FHD',
    year: 2026, studio: 'Studio Bind', views: '256,789,432', releaseDate: '05-07-2026', type: 'bo',
    cast: ['Rudeus Greyrat', 'Sylphiette', 'Roxy Migurdia'],
    description: 'Rudeus tiếp tục hành trình trưởng thành và đối mặt với những thử thách mới trong thế giới phép thuật.',
    genre: ['Fantasy', 'Adventure', 'Isekai']
  },
  {
    id: 'p4', title: 'Death Note', engTitle: 'Death Note', slug: 'death-note',
    poster: '/images/anime/poster/DeathNote.jpg', rating: 4.9, episode: 'Ep 37', quality: 'FHD',
    year: 2006, studio: 'Madhouse', views: '543,210,987', releaseDate: '05-07-2026', type: 'le',
    cast: ['Light Yagami', 'L Lawliet', 'Misa Amane'],
    description: 'Học sinh trung học thông minh dùng cuốn sổ thần chết để tiêu diệt tội phạm trên toàn thế giới.',
    genre: ['Supernatural', 'Thriller', 'Mystery']
  },
  {
    id: 'p5', title: 'Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san 2nd Season', engTitle: 'Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san', slug: 'alya-san-2nd-season',
    poster: '/images/anime/poster/Alya.png', rating: 4.7, episode: 'Ep 1', quality: 'FHD',
    year: 2025, studio: 'Doga Kobo', views: '145,234,567', releaseDate: '2027', type: 'bo',
    cast: ['Alya', 'Masachika Kuze', 'Yuki Suou'],
    description: 'Alya tiếp tục những lời thì thầm tiếng Nga đầy cảm xúc với Kuze khi mối quan hệ của cả hai ngày càng tiến triển.',
    genre: ['Romance', 'Comedy', 'School']
  },
  {
    id: 'p6', title: 'Sword Art Online', engTitle: 'Sword Art Online', slug: 'sao',
    poster: '/images/anime/poster/SwordArtOnline.jpg', rating: 4.5, episode: 'Ep 25', quality: 'FHD',
    year: 2012, studio: 'A-1 Pictures', views: '398,765,432', releaseDate: '03-07-2026', type: 'bo',
    cast: ['Kirito', 'Asuna', 'Sinon'],
    description: 'Người chơi MMORPG thực tế ảo bị mắc kẹt trong game và phải chiến đấu lên tầng 100 để thoát.',
    genre: ['Action', 'Adventure', 'Romance']
  },
  {
    id: 'p7', title: 'Tokyo Ghoul', engTitle: 'Tokyo Ghoul', slug: 'tokyo-ghoul',
    poster: '/images/anime/poster/TokyoGhoul.jpg', rating: 4.6, episode: 'Ep 12', quality: 'FHD',
    year: 2014, studio: 'Pierrot', views: '213,456,789', releaseDate: '07-2026', type: 'hh',
    cast: ['Ken Kaneki', 'Touka Kirishima', 'Rize Kamishiro'],
    description: 'Sinh viên đại học bị Ghoul tấn công, sống sót nhưng trở thành nửa Ghoul và trở thành kẻ bị truy đuổi.',
    genre: ['Action', 'Horror', 'Supernatural']
  },
  {
    id: 'p8', title: 'One Punch Man', engTitle: 'One Punch Man', slug: 'one-punch-man',
    poster: '/images/anime/poster/OnePunchMan.jpg', rating: 4.8, episode: 'Ep 24', quality: 'FHD',
    year: 2015, studio: 'Madhouse', views: '467,890,123', releaseDate: '07-2026', type: 'le',
    cast: ['Saitama', 'Genos', 'Tatsumaki'],
    description: 'Câu chuyện về Saitama, anh hùng làm vì sở thích và có thể đánh bại kẻ thù chỉ bằng một cú đấm.',
    genre: ['Action', 'Comedy', 'Sci-Fi']
  },
  {
    id: 'p9', title: 'Dragon Ball Super: Beerus Saga', engTitle: 'Dragon Ball Super', slug: 'dragon-ball-super-beerus',
    poster: '/images/anime/poster/DB.jpg', rating: 4.8, episode: 'Ep 14', quality: 'FHD',
    year: 2015, studio: 'Toei Animation', views: '245,678,901', releaseDate: '01-2026', type: 'bo',
    cast: ['Son Goku', 'Vegeta', 'Beerus'],
    description: 'Sau khi Majin Buu bị đánh bại, Thần Hủy Diệt Beerus thức tỉnh và bắt đầu tìm kiếm Super Saiyan God.',
    genre: ['Action', 'Adventure', 'Fantasy']
  },
  {
    id: 'p10', title: 'Tensei Shitara Slime Datta Ken Movie 2: Soukai no Namida-hen', engTitle: 'Tensei Shitara Slime Datta Ken', slug: 'tensei-shitara-slime-movie-2',
    poster: '/images/anime/poster/Slime.jpg', rating: 4.8, episode: 'Movie', quality: 'FHD',
    year: 2024, studio: '8bit', views: '198,765,432', releaseDate: '2026', type: 'le',
    cast: ['Rimuru Tempest', 'Benimaru', 'Shion'],
    description: 'Rimuru cùng các đồng minh đối mặt với âm mưu mới đe dọa hòa bình của Liên Bang Jura Tempest.',
    genre: ['Action', 'Fantasy', 'Adventure']
  },
]

export const latestAnime: Anime[] = [
  {
    id: 'l1', title: 'Kaiju No. 8', engTitle: 'Kaiju No. 8', slug: 'kaiju-no-8',
    poster: '/images/anime/poster/KaijuNo.8.jpg', rating: 4.8, episode: 'Ep 5', quality: 'FHD',
    year: 2024, studio: 'Production I.G', views: '98,765,432',
    cast: ['Kafka Hibino', 'Mina Ashiro', 'Reno Ichikawa'],
    description: 'Người đàn ông dọn dẹp sau trận chiến Kaiju mơ ước gia nhập lực lượng phòng thủ, cho đến khi bản thân trở thành Kaiju.',
    genre: ['Action', 'Sci-Fi', 'Shounen']
  },
  {
    id: 'l2', title: "Frieren: Beyond Journey's End", engTitle: "Frieren: Beyond Journey's End", slug: 'frieren',
    poster: '/images/anime/poster/Frieren.jpg', rating: 5.0, episode: 'Ep 28', quality: 'FHD',
    year: 2023, studio: 'Madhouse', views: '156,234,567',
    cast: ['Frieren', 'Fern', 'Stark'],
    description: 'Yêu tinh và bạn đồng hành đánh bại vua quỷ trong cuộc chiến vĩ đại. Nhưng năm tháng qua đi, cô phải đối mặt với thực tế sống lâu hơn bạn bè người thường.',
    genre: ['Adventure', 'Drama', 'Fantasy']
  },
  {
    id: 'l3', title: 'The Apothecary Diaries', engTitle: 'The Apothecary Diaries', slug: 'apothecary-diaries',
    poster: '/images/anime/poster/ApothecaryDiaries.jpg', rating: 4.9, episode: 'Ep 24', quality: 'FHD',
    year: 2023, studio: 'Toho Animation', views: '134,567,890',
    cast: ['Maomao', 'Jinshi', 'Gaoshun'],
    description: 'Cô gái am hiểu y học bị cuốn vào âm mưu cung đình và những bí ẩn trong đế chế cổ đại.',
    genre: ['Mystery', 'Historical', 'Drama']
  },
  {
    id: 'l4', title: 'Mashle: Magic and Muscles Season 2', engTitle: 'Mashle: Magic and Muscles', slug: 'mashle-s2',
    poster: '/images/anime/poster/Mash.jpg', rating: 4.7, episode: 'Ep 12', quality: 'FHD',
    year: 2024, studio: 'A-1 Pictures', views: '87,654,321',
    cast: ['Mash Burnedead', 'Lemon Irvine', 'Finn Ames'],
    description: 'Trong vương quốc ma thuật, Mash sinh ra không có phép thuật nhưng phải trở thành Divine Visionary để sống yên bình.',
    genre: ['Comedy', 'Action', 'Fantasy']
  },
  {
    id: 'l5', title: 'Classroom of the Elite Season 3', engTitle: 'Classroom of the Elite', slug: 'cote-s3',
    poster: '/images/anime/poster/ClassroomOfTheEliteSeason3.jpg', rating: 4.8, episode: 'Ep 13', quality: 'FHD',
    year: 2024, studio: 'Lerche', views: '112,345,678',
    cast: ['Kiyotaka Ayanokoji', 'Suzune Horikita', 'Kikyou Kushida'],
    description: 'Kiyotaka Ayanokoji tiếp tục các chiến dịch bí mật bảo vệ bạn cùng lớp trong khi giả vờ là học sinh bình thường.',
    genre: ['Drama', 'Psychological']
  },
  {
    id: 'l6', title: 'Tsukimichi: Moonlit Fantasy Season 2', engTitle: 'Tsukimichi: Moonlit Fantasy', slug: 'tsukimichi-s2',
    poster: '/images/anime/poster/Tsukimichi.jpg', rating: 4.6, episode: 'Ep 18', quality: 'FHD',
    year: 2024, studio: 'C2C', views: '76,543,210',
    cast: ['Makoto Misumi', 'Tomoe', 'Mio'],
    description: 'Makoto Misumi tiếp tục hành trình trong thế giới khác, quản lý lãnh địa ngày càng lớn và đối phó với con người và quỷ.',
    genre: ['Fantasy', 'Action', 'Isekai']
  },
  {
    id: 'l7', title: 'A Sign of Affection', engTitle: 'A Sign of Affection', slug: 'sign-of-affection',
    poster: '/images/anime/poster/ASignofAffection.jpg', rating: 4.8, episode: 'Ep 12', quality: 'FHD',
    year: 2024, studio: 'Brain\u2019s Base', views: '89,012,345',
    cast: ['Yuki Itose', 'Itsuomi Nagi', 'Oushi Kurashima'],
    description: 'Chuyện tình cảm ấm lòng giữa Yuki, sinh viên đại học khiếm thính, và Itsuomi, chàng đàn anh nói nhiều thứ tiếng.',
    genre: ['Romance', 'Slice of Life']
  },
  {
    id: 'l8', title: 'Ninja Kamui', engTitle: 'Ninja Kamui', slug: 'ninja-kamui',
    poster: '/images/anime/poster/NinjaKamui.jpg', rating: 4.7, episode: 'Ep 10', quality: 'FHD',
    year: 2024, studio: 'E&H Production', views: '65,432,109',
    cast: ['Joe Higan', 'Zai', 'Emma'],
    description: 'Ninja cũ thoát khỏi gia tộc để sống yên bình nhưng phải trả thù khi gia đình bị sát thủ tàn nhẫn giết hại.',
    genre: ['Action', 'Sci-Fi']
  },
  {
    id: 'l9', title: 'Metallic Rouge', engTitle: 'Metallic Rouge', slug: 'metallic-rouge',
    poster: '/images/anime/poster/Metallic Rouge.jpg', rating: 4.4, episode: 'Ep 13', quality: 'FHD',
    year: 2024, studio: 'Bones', views: '54,321,098',
    cast: ['Rouge', 'Naomi', 'Gene'],
    description: 'Trong thế giới người và android cùng tồn tại, cô gái android tên Rouge được giao nhiệm vụ tiêu diệt chín android nổi loạn.',
    genre: ['Sci-Fi', 'Action']
  },
  {
    id: 'l10', title: 'Shangri-La Frontier', engTitle: 'Shangri-La Frontier', slug: 'shangri-la-frontier',
    poster: '/images/anime/poster/Shangri-La Frontier.jpg', rating: 4.8, episode: 'Ep 25', quality: 'FHD',
    year: 2023, studio: 'C2C', views: '143,210,987',
    cast: ['Rakuro Hizutome', 'Emul', 'Arthur Pencilgon'],
    description: 'Học sinh yêu thích chơi "game rác" quyết định thử game VR đỉnh cao và dùng kỹ năng độc lạ để tiến về phía trước.',
    genre: ['Action', 'Adventure', 'Fantasy']
  }
]

// Helper function to generate more anime variations for pagination
function generateMoreAnime(): Anime[] {
  const baseAnime = [...trendingAnime, ...popularAnime, ...latestAnime]
  const moreAnime: Anime[] = []
  
  // Generate variations by modifying existing anime
  for (let i = 0; i < 200; i++) {
    const source = baseAnime[i % baseAnime.length]
    const variation: Anime = {
      ...source,
      id: `gen-${i}`,
      slug: `${source.slug}-${i}`,
      // Vary the data slightly
      rating: Math.max(3.5, Math.min(5.0, source.rating + (Math.random() - 0.5) * 0.5)),
      views: source.views ? `${Math.floor(Math.random() * 500000000)}` : undefined,
      year: 2020 + Math.floor(Math.random() * 7), // 2020-2026
    }
    moreAnime.push(variation)
  }
  
  return moreAnime
}

// Anime bắt đầu bằng số (0-9)
export const numericAnime: Anime[] = [
  {
    id: 'n1', title: '0-sagi Start Dash Monogatari', engTitle: '0-sagi Start Dash Monogatari', slug: '0-sagi-start-dash-monogatari',
    poster: '/images/anime/poster/SoloLeveling.jpg', rating: 5.0, episode: 'Full', quality: 'FHD',
    year: 2024, studio: 'MAPPA', views: '45,234,567', type: 'bo',
    cast: ['Protagonist A', 'Hero B', 'Heroine C'],
    description: 'Câu chuyện về một khởi đầu mới đầy kịch tính và cảm động.',
    genre: ['Fantasy', 'Adventure']
  },
  {
    id: 'n2', title: '0-sagi Start Dash Monogatari Season 2', engTitle: '0-sagi Start Dash Monogatari Season 2', slug: '0-sagi-start-dash-monogatari-season-2',
    poster: '/images/anime/poster/JJK.jpg', rating: 4.8, episode: 'Full', quality: 'FHD',
    year: 2025, studio: 'MAPPA', views: '38,765,432', type: 'bo',
    cast: ['Protagonist A', 'Hero B', 'Heroine C'],
    description: 'Phần tiếp theo của câu chuyện khởi đầu đầy kịch tính.',
    genre: ['Fantasy', 'Adventure']
  },
  {
    id: 'n3', title: '009 Re:Cyborg', engTitle: '009 Re:Cyborg', slug: '009-re-cyborg',
    poster: '/images/anime/poster/CodeGeass.jpg', rating: 4.6, episode: 'Full', quality: 'HD',
    year: 2012, studio: 'Production I.G', views: '28,543,210', type: 'le',
    cast: ['Joe Shimamura', 'Francoise Arnoul', 'Jet Link'],
    description: 'Chín chiến binh cyborg tái xuất để bảo vệ thế giới khỏi hiểm họa mới.',
    genre: ['Sci-Fi', 'Adventure', 'Mecha', 'Action']
  },
  {
    id: 'n4', title: '07-Ghost', engTitle: '07-Ghost', slug: '07-ghost',
    poster: '/images/anime/poster/Bleach.jpg', rating: 4.5, episode: 'Ep 25', quality: 'FHD',
    year: 2009, studio: 'Studio Deen', views: '32,109,876', type: 'bo',
    cast: ['Teito Klein', 'Mikage', 'Frau'],
    description: 'Một cậu bé nô lệ trốn thoát và khám phá bí mật về quá khứ của mình.',
    genre: ['Fantasy', 'Demons', 'Military', 'Magic', 'Josei', 'Action']
  },
  {
    id: 'n5', title: '10 Promises To My Dog', engTitle: '10 Promises To My Dog', slug: '10-promises-to-my-dog',
    poster: '/images/anime/poster/ASignofAffection.jpg', rating: 4.1, episode: 'Movie', quality: 'HD',
    year: 2008, studio: 'Shochiku', views: '15,432,890', type: 'le',
    cast: ['Akari Saito', 'Susumu Chiba'],
    description: 'Câu chuyện cảm động về tình bạn giữa một cô gái và chú chó của cô.',
    genre: ['Drama']
  },
  {
    id: 'n6', title: '100 Cô Bạn Gái Yêu Bạn Rất Rất Rất Rất Rất Nhiều', engTitle: '100 Girlfriends Who Really Love You', slug: '100-girlfriends',
    poster: '/images/anime/poster/SpyxFamily.jpg', rating: 4.3, episode: 'Full', quality: 'FHD',
    year: 2023, studio: 'Bibury Animation Studios', views: '42,567,890', type: 'bo',
    cast: ['Aijou Rentarou', 'Hanazono Hakari', 'Inda Karane'],
    description: 'Rentarou gặp 100 người bạn gái định mệnh và phải yêu tất cả để họ không chết.',
    genre: ['Slice of Life', 'Seinen', 'School', 'Romance', 'Harem', 'Comedy', 'Parody']
  },
  {
    id: 'n7', title: '100 Cô Bạn Gái Yêu Bạn Rất Rất Rất Rất Rất Nhiều Mùa 2', engTitle: '100 Girlfriends Season 2', slug: '100-girlfriends-season-2',
    poster: '/images/anime/poster/OshiNoKo.jpg', rating: 4.2, episode: 'Full', quality: 'FHD',
    year: 2025, studio: 'Bibury Animation Studios', views: '35,678,901', type: 'bo',
    cast: ['Aijou Rentarou', 'Hanazono Hakari', 'Inda Karane'],
    description: 'Tiếp tục cuộc phiêu lưu tình yêu với 100 cô bạn gái.',
    genre: ['Slice of Life', 'Seinen', 'School', 'Romance', 'Harem', 'Comedy', 'Parody']
  },
  {
    id: 'n8', title: '16bit Sensation: Another Layer', engTitle: '16bit Sensation', slug: '16bit-sensation',
    poster: '/images/anime/poster/SteinsGate.jpg', rating: 4.4, episode: 'Ep 13', quality: 'FHD',
    year: 2023, studio: 'Silver Link', views: '25,890,123', type: 'bo',
    cast: ['Konoha Akisato', 'Meiko Uehara', 'Mamoru Rokuda'],
    description: 'Một họa sĩ game hiện đại du hành về thời hoàng kim của game bishoujo.',
    genre: ['Comedy', 'Sci-Fi']
  },
  {
    id: 'n9', title: '3-gatsu no Lion', engTitle: 'March Comes in Like a Lion', slug: '3-gatsu-no-lion',
    poster: '/images/anime/poster/ReZero.jpg', rating: 4.9, episode: 'Ep 22', quality: 'FHD',
    year: 2016, studio: 'Shaft', views: '48,765,432', type: 'bo',
    cast: ['Rei Kiriyama', 'Akari Kawamoto', 'Hinata Kawamoto'],
    description: 'Câu chuyện về một기사 shogi trẻ tuổi và hành trình tìm kiếm ý nghĩa cuộc sống.',
    genre: ['Drama', 'Game', 'Seinen', 'Slice of Life']
  },
  {
    id: 'n10', title: '3-gatsu no Lion 2nd Season', engTitle: 'March Comes in Like a Lion 2', slug: '3-gatsu-no-lion-2',
    poster: '/images/anime/poster/Frieren.jpg', rating: 5.0, episode: 'Ep 22', quality: 'FHD',
    year: 2017, studio: 'Shaft', views: '52,345,678', type: 'bo',
    cast: ['Rei Kiriyama', 'Akari Kawamoto', 'Hinata Kawamoto'],
    description: 'Phần 2 tiếp tục hành trình trưởng thành của Rei Kiriyama.',
    genre: ['Drama', 'Game', 'Seinen', 'Slice of Life']
  },
  {
    id: 'n11', title: '3D Kanojo: Real Girl', engTitle: '3D Girlfriend', slug: '3d-kanojo',
    poster: '/images/anime/poster/Alya.png', rating: 3.8, episode: 'Ep 12', quality: 'FHD',
    year: 2018, studio: 'Hoods Entertainment', views: '22,456,789', type: 'bo',
    cast: ['Tsutsui Hikari', 'Igarashi Iroha'],
    description: 'Một otaku gặp gỡ và yêu một cô gái 3D trong đời thực.',
    genre: ['Romance', 'School', 'Shoujo']
  },
  {
    id: 'n12', title: '5-toubun no Hanayome', engTitle: 'The Quintessential Quintuplets', slug: '5-toubun-no-hanayome',
    poster: '/images/anime/poster/ClassroomoftheEliteSeason3.jpg', rating: 4.7, episode: 'Ep 12', quality: 'FHD',
    year: 2019, studio: 'Tezuka Productions', views: '65,432,109', type: 'bo',
    cast: ['Uesugi Fuutarou', 'Nakano Ichika', 'Nakano Nino'],
    description: 'Một gia sư nghèo phải dạy năm chị em sinh năm xinh đẹp nhưng kém học.',
    genre: ['Romance', 'Comedy', 'School', 'Harem', 'Shounen']
  },
  {
    id: 'n13', title: '5-toubun no Hanayome ∬', engTitle: 'Quintessential Quintuplets Season 2', slug: '5-toubun-no-hanayome-2',
    poster: '/images/anime/poster/ApothecaryDiaries.jpg', rating: 4.8, episode: 'Ep 12', quality: 'FHD',
    year: 2021, studio: 'Bibury Animation Studios', views: '72,345,678', type: 'bo',
    cast: ['Uesugi Fuutarou', 'Nakano Ichika', 'Nakano Nino'],
    description: 'Phần 2 với nhiều tình tiết lãng mạn và hài hước hơn.',
    genre: ['Romance', 'Comedy', 'School', 'Harem', 'Shounen']
  },
  {
    id: 'n14', title: '7 Seeds', engTitle: '7 Seeds', slug: '7-seeds',
    poster: '/images/anime/poster/AOT.jpg', rating: 3.9, episode: 'Ep 12', quality: 'FHD',
    year: 2019, studio: 'Gonzo', views: '18,765,432', type: 'bo',
    cast: ['Natsu Iwashimizu', 'Arashi Aota', 'Semimaru Asai'],
    description: 'Nhóm người được đông lạnh thức dậy trong tương lai để tái tạo loài người.',
    genre: ['Adventure', 'Drama', 'Mystery', 'Romance', 'Sci-Fi', 'Shoujo']
  },
  {
    id: 'n15', title: '86: Eighty-Six', engTitle: '86', slug: '86-eighty-six',
    poster: '/images/anime/poster/mash.jpg', rating: 4.9, episode: 'Ep 11', quality: 'FHD',
    year: 2021, studio: 'A-1 Pictures', views: '85,432,109', type: 'bo',
    cast: ['Shinei Nouzen', 'Vladilena Milizé', 'Raiden Shuga'],
    description: 'Cuộc chiến không người giữa cộng hòa và quân đội tự động.',
    genre: ['Action', 'Drama', 'Mecha', 'Military', 'Sci-Fi']
  },
  {
    id: 'n16', title: '86: Eighty-Six Part 2', engTitle: '86 Part 2', slug: '86-eighty-six-part-2',
    poster: '/images/anime/poster/DB.jpg', rating: 5.0, episode: 'Ep 12', quality: 'FHD',
    year: 2021, studio: 'A-1 Pictures', views: '92,345,678', type: 'bo',
    cast: ['Shinei Nouzen', 'Vladilena Milizé', 'Raiden Shuga'],
    description: 'Tiếp nối hành trình đầy cảm xúc của đơn vị 86.',
    genre: ['Action', 'Drama', 'Mecha', 'Military', 'Sci-Fi']
  },
  {
    id: 'n17', title: '91 Days', engTitle: '91 Days', slug: '91-days',
    poster: '/images/anime/poster/Mushoku.jpg', rating: 4.5, episode: 'Ep 13', quality: 'FHD',
    year: 2016, studio: 'Shuka', views: '34,567,890', type: 'bo',
    cast: ['Angelo Lagusa', 'Nero Vanetti', 'Corteo'],
    description: 'Câu chuyện báo thù trong thời kỳ cấm rượu ở Mỹ.',
    genre: ['Action', 'Drama', 'Historical']
  },
  {
    id: 'n18', title: '22/7', engTitle: 'Nanabun no Nijyuuni', slug: '22-7',
    poster: '/images/anime/poster/Slime.jpg', rating: 3.7, episode: 'Ep 12', quality: 'FHD',
    year: 2020, studio: 'A-1 Pictures', views: '16,789,012', type: 'bo',
    cast: ['Miu Takigawa', 'Sakura Fujima', 'Jun Toda'],
    description: 'Tám cô gái được chọn để trở thành thần tượng bởi một bức tường bí ẩn.',
    genre: ['Music', 'Slice of Life']
  },
  {
    id: 'n19', title: '2.43: Seiin Koukou Danshi Volley-bu', engTitle: '2.43: Seiin High School Boys Volleyball Team', slug: '2-43-seiin-koukou',
    poster: '/images/anime/poster/TokyoGhoul.jpg', rating: 4.0, episode: 'Ep 12', quality: 'FHD',
    year: 2021, studio: 'David Production', views: '21,234,567', type: 'bo',
    cast: ['Kimichika Haijima', 'Yuni Kuroba', 'Misao Aoki'],
    description: 'Đội bóng chuyền nam trung học Seiin hướng tới giải đấu quốc gia.',
    genre: ['Sports', 'Drama', 'School']
  },
  {
    id: 'n20', title: '1-nen A-gumi no Monster', engTitle: 'The Monster of Class 1-A', slug: '1-nen-a-gumi-no-monster',
    poster: '/images/anime/poster/OP.jpg', rating: 3.5, episode: 'Ep 10', quality: 'HD',
    year: 2024, studio: 'Unknown', views: '12,345,678', type: 'bo',
    cast: ['Main Character', 'Supporting Character A', 'Supporting Character B'],
    description: 'Bí ẩn về con quái vật trong lớp 1-A.',
    genre: ['Mystery', 'School', 'Thriller']
  }
]

export const animes: Anime[] = [
  ...trendingAnime,
  ...popularAnime,
  ...latestAnime,
  ...numericAnime,
  ...generateMoreAnime()
]
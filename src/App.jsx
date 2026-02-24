import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, User, Star, ChevronLeft, 
  Menu, X, Bookmark, Share2, Settings, Download,
  Heart, Facebook
} from 'lucide-react';

// --- CONSTANTS & MOCK DATA ---
const CATEGORIES = ["Tất cả", "Tiểu thuyết", "Kỹ năng sống", "Khoa học", "Lịch sử", "Thiếu nhi"];

// Ảnh dự phòng khi link ảnh bị lỗi (Nhúng trực tiếp Base64 để không phụ thuộc mạng ngoài)
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

const MOCK_BOOKS = [
  {
    id: 1,
    title: "CHIP WAR - Cuộc Chiến Vi Mạch",
    author: "Chris Miller",
    category: "Kinh tế",
    rating: 4.8,
    reviews: 12500,
    coverPrice: "300.000đ",
    publishDate: "18/12/2024",
    postDate: "2026-02-24",
    clicks: 1250,
    publisher: "NXB Thế Giới",
    distributor: "Nhã Nam",
    pages: 480,
    epubLink: "https://drive.google.com/open?id=1Tpz-Qhb29H6IFAdLnl6d8Ywwb45NTgRA&usp=drive_fs", 
    pdfLink: "https://drive.google.com/open?id=17EBuhml0L1HsAgoO0jRFT_8Y1xXvjyHt&usp=drive_fs", 
    pdfPreviewLink: "https://drive.google.com/open?id=17EBuhml0L1HsAgoO0jRFT_8Y1xXvjyHt&usp=drive_fs", 
    shopeeLink: "https://s.shopee.vn/60L7wsDqsh", 
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    synopsis: "Cuộc chiến vi mạch được xem là biên niên sử về cuộc chiến kéo dài hàng thập niên để kiểm soát thứ đang nổi lên là tài nguyên quan trọng nhất nhưng lại khan hiếm: công nghệ vi mạch.",
    content: "Ngày nay, sức mạnh quân sự, kinh tế và chính trị được xây dựng trên nền tảng chip máy tính. Hầu như mọi thứ đều chạy trên các con chip, từ tên lửa đến lò vi sóng, đến cả ô tô, điện thoại thông minh, thị trường chứng khoán, thậm chí cả lưới điện. \n\n Gần đây, nước Mỹ đã thiết kế những con chip nhanh nhất và duy trì vị thế số một thế giới, nhưng lợi thế đó đang có nguy cơ suy yếu khi các đối thủ ở Đài Loan, Hàn Quốc và châu Âu nổi lên nắm quyền kiểm soát. Mỹ đã để các thành phần quan trọng của quá trình sản xuất chip vuột khỏi tầm kiểm soát, dẫn đến tình trạng thiếu chip trên toàn thế giới và cuộc chiến vi mạch nổ ra với đối thủ là Trung Quốc đang mong muốn thu hẹp khoảng cách. \n\n Trung Quốc đang chi nhiều tiền cho chip hơn bất kỳ sản phẩm nào khác, rót hàng tỷ đô la vào việc xây dựng chip, đe dọa tới ưu thế quân sự và sự thịnh vượng của nền kinh tế Mỹ. \n\n Con chip của thế kỷ 21 giống như dầu mỏ của thế kỷ 20, và vì thế, lịch sử của chất bán dẫn chính là lịch sử của thế kỷ 21. Cuộc chiến vi mạch được xem là biên niên sử về cuộc chiến kéo dài hàng thập niên để kiểm soát thứ đang nổi lên là tài nguyên quan trọng nhất nhưng lại khan hiếm: công nghệ vi mạch."
  },
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    category: "Kỹ năng sống",
    rating: 4.9,
    reviews: 32000,
    coverPrice: "86.000đ",
    publishDate: "01/10/1936",
    postDate: "2026-02-22",
    clicks: 3400,
    publisher: "NXB Tổng hợp TP.HCM",
    distributor: "First News",
    pages: 320,
    epubLink: "https://drive.google.com/...",
    pdfLink: "https://drive.google.com/...",
    pdfPreviewLink: "https://drive.google.com/...",
    shopeeLink: "https://shopee.vn/...",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    synopsis: "Cuốn sách đưa ra các lời khuyên về cách cư xử, ứng xử và giao tiếp với mọi người để đạt được thành công trong cuộc sống.",
    content: "Chương 1: Nghệ thuật ứng xử căn bản...\n\nNguyên tắc 1: Không chỉ trích, oán trách hay than phiền. Những người hay chỉ trích thường nhận lại sự phản kháng và thù hận từ người khác..."
  },
  {
    id: 3,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    category: "Lịch sử",
    rating: 4.7,
    reviews: 8900,
    coverPrice: "250.000đ",
    publishDate: "04/09/2011",
    postDate: "2026-02-23",
    clicks: 850,
    publisher: "NXB Tri Thức",
    distributor: "Omega Plus",
    pages: 512,
    epubLink: "https://drive.google.com/...",
    pdfLink: "https://drive.google.com/...",
    pdfPreviewLink: "https://drive.google.com/...",
    shopeeLink: "https://shopee.vn/...",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
    synopsis: "Khám phá toàn bộ lịch sử loài người, từ những loài vượn người đầu tiên tiến hóa trên Trái đất cho đến những bước tiến mang tính cách mạng của thế kỷ 21.",
    content: "Khoảng 70.000 năm trước, các sinh vật thuộc loài Homo sapiens bắt đầu hình thành nên các cấu trúc phức tạp gọi là văn hóa. Sự phát triển tiếp theo của các nền văn hóa con người được gọi là lịch sử..."
  },
  {
    id: 4,
    title: "Vũ Trụ",
    author: "Carl Sagan",
    category: "Khoa học",
    rating: 4.8,
    reviews: 5400,
    coverPrice: "185.000đ",
    publishDate: "01/12/1980",
    postDate: "2026-02-15",
    clicks: 600,
    publisher: "NXB Thế Giới",
    distributor: "Nhã Nam",
    pages: 480,
    epubLink: "https://drive.google.com/...",
    pdfLink: "https://drive.google.com/...",
    pdfPreviewLink: "https://drive.google.com/...",
    shopeeLink: "https://shopee.vn/...",
    cover: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop",
    synopsis: "Một cuộc hành trình vĩ đại khám phá vũ trụ bao la, từ những vì sao xa xôi đến nguồn gốc của sự sống trên Trái đất.",
    content: "Vũ trụ là tất cả những gì đã, đang và sẽ tồn tại. Những suy ngẫm về vũ trụ thường làm chúng ta cảm thấy nhỏ bé, nhưng đồng thời cũng khơi dậy sự tò mò mãnh liệt..."
  },
  {
    id: 5,
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    category: "Thiếu nhi",
    rating: 4.9,
    reviews: 15000,
    coverPrice: "55.000đ",
    publishDate: "10/05/1941",
    postDate: "2026-02-18",
    clicks: 2100,
    publisher: "NXB Kim Đồng",
    distributor: "NXB Kim Đồng",
    pages: 148,
    epubLink: "https://drive.google.com/...",
    pdfLink: "https://drive.google.com/...",
    pdfPreviewLink: "https://drive.google.com/...",
    shopeeLink: "https://shopee.vn/...",
    cover: "https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?q=80&w=800&auto=format&fit=crop",
    synopsis: "Câu chuyện kể về cuộc phiêu lưu của chú Dế Mèn qua thế giới loài vật đầy màu sắc, qua đó rút ra nhiều bài học quý giá về tình bạn và lẽ sống.",
    content: "Tôi sống độc lập từ thuở bé. Ấy là tục lệ lâu đời trong họ dế chúng tôi. Vả lại, lúc bấy giờ tôi còn là một chàng dế thanh niên cường tráng..."
  },
  {
    id: 6,
    title: "Tư Duy Nhanh Và Chậm",
    author: "Daniel Kahneman",
    category: "Kỹ năng sống",
    rating: 4.6,
    reviews: 7200,
    coverPrice: "219.000đ",
    publishDate: "25/10/2011",
    postDate: "2026-02-10",
    clicks: 950,
    publisher: "NXB Thế Giới",
    distributor: "Alpha Books",
    pages: 612,
    epubLink: "https://drive.google.com/...",
    pdfLink: "https://drive.google.com/...",
    pdfPreviewLink: "https://drive.google.com/...",
    shopeeLink: "https://shopee.vn/...",
    cover: "https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=800&auto=format&fit=crop",
    synopsis: "Khám phá hai hệ thống tư duy chi phối cách chúng ta suy nghĩ: Hệ thống 1 nhanh, bản năng và cảm xúc; Hệ thống 2 chậm, có logic và tính toán hơn.",
    content: "Hệ thống 1 hoạt động tự động và nhanh chóng, với rất ít hoặc không có nỗ lực và không có cảm giác kiểm soát tự nguyện..."
  },
];

// --- COMPONENTS ---

const Header = ({ onSearch, searchQuery, navigateTo, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigateTo('home')}
          >
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">thuviennotion</span>
          </div>

          {/* Desktop Search & Nav */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            {(currentView === 'home' || currentView === 'detail' || currentView === 'library') && (
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
                  placeholder="Tìm kiếm sách, tác giả..."
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigateTo('library')}
              className={`font-medium transition-colors ${currentView === 'library' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
            >
              Thư viện của tôi
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 cursor-pointer hover:bg-indigo-200 transition-colors">
              <User className="h-5 w-5" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {(currentView === 'home' || currentView === 'detail' || currentView === 'library') && (
              <div className="p-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white sm:text-sm"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => onSearch(e.target.value)}
                  />
                </div>
              </div>
            )}
            <button 
              onClick={() => { navigateTo('library'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Thư viện của tôi
            </button>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Tài khoản</a>
          </div>
        </div>
      )}
    </header>
  );
};

const BookCard = ({ book, onClick, onToggleWishlist }) => (
  <div 
    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
    onClick={() => onClick(book)}
  >
    <div className="relative h-64 w-full overflow-hidden bg-gray-100">
      <img 
        src={book.cover} 
        alt={book.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = FALLBACK_IMAGE;
        }}
      />
      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
        {book.category}
      </div>
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{book.title}</h3>
      <p className="text-sm text-gray-500 mt-1">{book.author}</p>
      
      <div className="mt-auto pt-4 flex items-center justify-end">
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(book.id); }}
          className={`flex items-center justify-center p-2 rounded-full transition-colors ${book.isWishlisted ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
        >
          <Heart className={`h-5 w-5 ${book.isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  </div>
);

const HomeView = ({ books, onBookSelect, onToggleWishlist }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("popular");

  const featuredBook = useMemo(() => {
    if (!books || books.length === 0) return null;
    return [...books].sort((a, b) => b.clicks - a.clicks)[0];
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = books;
    if (activeCategory !== "Tất cả") {
      result = result.filter(book => book.category === activeCategory);
    }
    
    // Sort logic
    result = [...result].sort((a, b) => {
      if (sortBy === 'popular') return b.clicks - a.clicks;
      if (sortBy === 'newest') return new Date(b.postDate) - new Date(a.postDate);
      return 0;
    });

    return result;
  }, [books, activeCategory, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      {featuredBook && (
        <div 
          className="bg-gradient-to-r from-indigo-700 to-purple-800 rounded-3xl shadow-xl overflow-hidden mb-12 relative cursor-pointer group"
          onClick={() => onBookSelect(featuredBook)}
        >
          {/* Subtle background pattern/glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500 opacity-20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 py-12 md:py-16 md:px-14">
            
            {/* Content Left */}
            <div className="md:w-3/5 flex flex-col items-start text-left z-20">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-800 text-indigo-200 text-sm font-semibold tracking-wider">
                SÁCH MỚI NỔI BẬT
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-md line-clamp-2">
                {featuredBook.title}
              </h1>
              <p className="text-indigo-100/90 text-lg md:text-xl mb-8 max-w-xl line-clamp-3 leading-relaxed font-light">
                {featuredBook.synopsis}
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg">
                  Bắt đầu đọc
                </button>
              </div>
            </div>

            {/* Book Cover Right */}
            <div className="w-full md:w-2/5 flex justify-center items-center mt-12 md:mt-0 z-20 relative">
              <div className="relative">
                {/* Decorative background circle */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl transform scale-125 group-hover:bg-white/30 transition-all duration-700"></div>
                
                {/* The Book Image - Fixed aspect ratio to explicit heights to prevent collapsing */}
                <div className="relative w-48 h-72 sm:w-56 sm:h-80 lg:w-64 lg:h-96 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-105 group-hover:-rotate-3 group-hover:-translate-y-3 transition-all duration-500 overflow-hidden ring-1 ring-white/30 bg-gray-200">
                  <img 
                    src={featuredBook.cover} 
                    alt={featuredBook.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />
                  {/* Sheen effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-8 overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex space-x-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-indigo-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            {activeCategory === "Tất cả" ? "Thịnh hành nhất" : `Sách ${activeCategory}`}
            <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {filteredBooks.length} cuốn
            </span>
          </h2>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500 font-medium whitespace-nowrap">Sắp xếp:</label>
            <select 
              className="bg-white border border-gray-300 text-gray-700 py-1.5 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium transition-colors cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Độ phổ biến</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>
        </div>
        
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} onClick={onBookSelect} onToggleWishlist={onToggleWishlist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900">Không tìm thấy sách</h3>
            <p className="text-gray-500 mt-2">Vui lòng thử từ khóa hoặc danh mục khác.</p>
          </div>
        )}
      </div>
    </main>
  );
};

const LibraryView = ({ books, onBookSelect, onToggleWishlist }) => {
  const wishlistedBooks = books.filter(b => b.isWishlisted);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center mb-8">
        <Heart className="h-8 w-8 text-red-500 mr-3 fill-current" />
        <h2 className="text-3xl font-bold text-gray-900">Thư viện của tôi</h2>
      </div>

      {wishlistedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlistedBooks.map(book => (
            <BookCard key={book.id} book={book} onClick={onBookSelect} onToggleWishlist={onToggleWishlist} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900">Thư viện trống</h3>
          <p className="text-gray-500 mt-2">Bạn chưa thêm cuốn sách nào vào thư viện. Hãy khám phá và thêm những cuốn sách yêu thích nhé!</p>
        </div>
      )}
    </main>
  );
};

const BookDetailView = ({ book, onBack }) => {
  const [copied, setCopied] = useState(false);

  if (!book) return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-center text-gray-500">
      Đang tải dữ liệu sách...
    </div>
  );

  // Xử lý khi nhấn Đọc Thử (Mở shopee tab mới, mở thẳng link PDF Preview ở tab hiện tại)
  const handleReadClick = (e) => {
    e.stopPropagation();
    if (book.shopeeLink) {
      window.open(book.shopeeLink, '_blank');
    }
    
    const targetPdfLink = book.pdfPreviewLink || book.pdfLink;
    if (targetPdfLink) {
      window.open(targetPdfLink, '_self');
    }
  };

  // Xử lý khi nhấn tải EPUB / PDF (Mở shopee tab mới, tải về tab hiện tại)
  const handleDownloadClick = (e, type) => {
    e.stopPropagation();
    
    // 1. Mở link shopee ở tab mới
    if (book.shopeeLink) {
      window.open(book.shopeeLink, '_blank');
    }

    // 2. Mở file tải ở tab hiện tại
    const link = type === 'epub' ? book.epubLink : book.pdfLink;
    if (link) {
      window.open(link, '_self');
    }
  };

  const handleShare = () => {
    // Copy link hiện tại (đã bao gồm URL Hash) vào Clipboard
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Nút quay lại và Nút chia sẻ */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors group w-max"
        >
          <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Quay lại
        </button>
        
        <button 
          onClick={handleShare}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-bold transition-colors shadow-sm border ${copied ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50'}`}
        >
          <Share2 className="h-4 w-4 mr-2" />
          {copied ? 'Đã sao chép Link!' : 'Chia sẻ cuốn sách này'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="md:flex">
          {/* Cột bên trái: Ảnh bìa & Nút hành động nhanh */}
          <div className="md:w-1/3 p-8 bg-gray-50 flex flex-col items-center border-r border-gray-100">
            {/* Khung ảnh bìa - Đảm bảo w/h cố định để ảnh không bị thu thành 0px */}
            <div 
              className="relative w-48 h-72 sm:w-64 sm:h-96 flex-shrink-0 rounded-lg shadow-2xl overflow-hidden mb-8 group bg-gray-200 cursor-pointer"
              onClick={handleReadClick}
            >
              <img 
                src={book.cover} 
                alt={book.title} 
                className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
              {/* Overlay khi di chuột vào ảnh - Sửa lại CSS bg-black/30 thay vì bg-opacity để tránh lỗi thành nền đen thui */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                 <button 
                   onClick={handleReadClick}
                   className="bg-white text-gray-900 p-4 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl"
                 >
                   <BookOpen className="h-7 w-7 text-indigo-600" />
                 </button>
              </div>
            </div>
            
            {/* Nút Đọc thử */}
            <button 
              onClick={handleReadClick}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all shadow-md flex justify-center items-center mb-3 active:scale-95"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Đọc thử PDF
            </button>
            
            {/* Các nút Tải xuống */}
            <div className="flex w-full space-x-3">
              <button 
                onClick={(e) => handleDownloadClick(e, 'epub')}
                className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl hover:bg-gray-50 hover:border-indigo-200 transition-colors flex justify-center items-center"
              >
                <Download className="h-4 w-4 mr-1.5 text-indigo-500" />
                EPUB
              </button>
              <button 
                onClick={(e) => handleDownloadClick(e, 'pdf')}
                className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl hover:bg-gray-50 hover:border-indigo-200 transition-colors flex justify-center items-center"
              >
                <Download className="h-4 w-4 mr-1.5 text-red-500" />
                PDF
              </button>
            </div>
            {book.shopeeLink && (
              <p className="text-[10px] text-gray-400 mt-4 text-center italic leading-tight">
                * Nhấn vào định dạng để tải hoặc mua sách ủng hộ tác giả
              </p>
            )}
          </div>

          {/* Cột bên phải: Thông tin chi tiết */}
          <div className="md:w-2/3 p-8 lg:p-12">
            <div className="mb-2">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {book.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 font-medium mb-8">
              Tác giả: <span className="text-indigo-600 hover:underline cursor-pointer">{book.author}</span>
            </p>
            
            {/* Thông số chi tiết */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-100">
              <DetailItem label="Nhà xuất bản" value={book.publisher} />
              <DetailItem label="Nhà phát hành" value={book.distributor} />
              <DetailItem label="Ngày xuất bản" value={book.publishDate} />
              <DetailItem label="Số trang" value={book.pages} />
              <DetailItem label="Giá bìa" value={book.coverPrice} />
              <DetailItem label="Đánh giá" value={`${book.rating} ⭐`} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3"></div>
                Giới thiệu nội dung
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                {book.synopsis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component con hiển thị từng dòng thông số cho gọn code
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-400 mb-1">{label}</span>
    <span className="text-base font-bold text-gray-800">{value || '---'}</span>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'detail', 'library'
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [booksData, setBooksData] = useState(MOCK_BOOKS);

  // Cấu hình Routing bằng URL Hash để có thể copy & share link
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('/book/')) {
        const id = parseInt(hash.replace('/book/', ''), 10);
        setSelectedBookId(id);
        setCurrentView('detail');
      } else if (hash === '/library') {
        setCurrentView('library');
      } else {
        setCurrentView('home');
        setSelectedBookId(null);
      }
    };

    // Kích hoạt khi vừa load trang
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Lấy thông tin sách đang được chọn
  const selectedBook = useMemo(() => 
    booksData.find(b => b.id === selectedBookId) || null
  , [booksData, selectedBookId]);

  // Lọc sách theo từ khóa tìm kiếm
  const displayedBooks = useMemo(() => {
    if (!searchQuery.trim()) return booksData;
    const lowerQuery = searchQuery.toLowerCase();
    return booksData.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) || 
      book.author.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, booksData]);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    // Tự động chuyển về trang chủ nếu đang tìm kiếm trong màn hình khác
    if (currentView !== 'home' && currentView !== 'library' && query.trim() !== '') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleWishlist = (bookId) => {
    setBooksData(prev => prev.map(b => 
      b.id === bookId ? { ...b, isWishlisted: !b.isWishlisted } : b
    ));
  };

  const handleBookSelect = (book) => {
    // Tăng số lượt click để làm dữ liệu cho "Độ phổ biến"
    setBooksData(prev => prev.map(b => 
      b.id === book.id ? { ...b, clicks: b.clicks + 1 } : b
    ));
    // Đổi url thay vì set state trực tiếp
    window.location.hash = `/book/${book.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view) => {
    if (view === 'home') {
      setSearchQuery('');
      window.location.hash = '/';
    } else if (view === 'library') {
      window.location.hash = '/library';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 flex flex-col">
      <Header 
        onSearch={handleSearchSubmit} 
        searchQuery={searchQuery}
        navigateTo={navigateTo} 
        currentView={currentView}
      />

      {/* Main Content Area (flex-1 to push footer down) */}
      <div className="flex-1">
        {/* Routing cơ bản */}
        {currentView === 'home' && (
          <HomeView 
            books={displayedBooks} 
            onBookSelect={handleBookSelect} 
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentView === 'library' && (
          <LibraryView 
            books={booksData} 
            onBookSelect={handleBookSelect} 
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentView === 'detail' && (
          <BookDetailView 
            book={selectedBook} 
            onBack={() => { window.location.hash = '/'; }}
          />
        )}
      </div>

      {/* Footer đơn giản */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center mb-4 md:mb-0">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">thuviennotion</span>
            <p className="ml-2 text-gray-500 text-sm">
              &copy; 2026 thuviennotion. Mọi quyền được bảo lưu.
            </p>
          </div>
          <div className="flex items-center">
            <a href="https://facebook.com/thuviennotion" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-blue-600 transition-colors">
              <Facebook className="h-12 w-12 mr-2" />
              <span className="text-lg font-medium">Facebook</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

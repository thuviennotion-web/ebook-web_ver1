import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, User, Star, ChevronLeft, 
  Menu, X, Bookmark, Share2, Settings, Download,
  Heart, Facebook
} from 'lucide-react';

// --- MOCK DATA ---
const CATEGORIES = ["Tất cả", "Tiểu thuyết", "Kỹ năng sống", "Khoa học", "Lịch sử", "Thiếu nhi"];

const MOCK_BOOKS = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    category: "Tiểu thuyết",
    rating: 4.8,
    reviews: 12500,
    coverPrice: "79.000đ",
    publishDate: "15/04/1988",
    postDate: "2026-02-24",
    clicks: 1250,
    publisher: "NXB Văn Học",
    distributor: "Nhã Nam",
    pages: 227,
    epubLink: "https://drive.google.com/...", // Sửa link Google Drive của bạn ở đây
    pdfLink: "https://drive.google.com/...",  // Sửa link Google Drive của bạn ở đây
    shopeeLink: "https://shopee.vn/...", // Sửa link Shopee Affiliate của bạn ở đây
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    synopsis: "Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người. Nhà giả kim là một cuốn sách dành cho những ai đã đánh mất ước mơ hoặc chưa bao giờ có nó.",
    content: "Chàng chăn cừu Santiago có một giấc mơ kỳ lạ lặp đi lặp lại. Cậu mơ thấy một đứa trẻ chơi với bầy cừu của mình, rồi dẫn cậu đến Kim tự tháp Ai Cập và chỉ cho cậu một kho báu bị giấu kín...\n\n(Đây là nội dung mô phỏng cho trình đọc sách. Trong thực tế, nội dung này sẽ được tải từ database hoặc file epub/pdf.)\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nPhần tiếp theo của câu chuyện tiếp tục khám phá sa mạc mênh mông..."
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
            <img src="stamp.png" alt="thuviennotion logo" className="h-12 w-12 object-contain" />
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
      />
      <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
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
              <span className="inline-block py-1 px-4 rounded-full bg-white/20 text-indigo-50 text-xs font-bold tracking-widest mb-6 border border-white/20 backdrop-blur-md shadow-sm uppercase">
                Sách nổi bật nhất
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-md line-clamp-2">
                {featuredBook.title}
              </h1>
              <p className="text-indigo-100/90 text-lg md:text-xl mb-8 max-w-xl line-clamp-3 leading-relaxed font-light">
                {featuredBook.synopsis}
              </p>
              <button className="bg-white text-indigo-700 px-8 py-3.5 rounded-full font-bold hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center">
                <BookOpen className="h-5 w-5 mr-2.5" /> Khám phá ngay
              </button>
            </div>

            {/* Book Cover Right */}
            <div className="w-full md:w-2/5 flex justify-center items-center mt-12 md:mt-0 z-20 relative">
              <div className="relative">
                {/* Decorative background circle */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl transform scale-125 group-hover:bg-white/30 transition-all duration-700"></div>
                
                {/* The Book Image */}
                <div className="relative w-48 sm:w-56 lg:w-64 aspect-[2/3] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-105 group-hover:-rotate-3 group-hover:-translate-y-3 transition-all duration-500 overflow-hidden ring-1 ring-white/30">
                  <img 
                    src={featuredBook.cover} 
                    alt={featuredBook.title} 
                    className="w-full h-full object-cover"
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

const BookDetailView = ({ book, onBack, onRead }) => {
  if (!book) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors group w-max"
      >
        <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="md:flex">
          {/* Cover & Quick Actions */}
          <div className="md:w-1/3 p-8 bg-gray-50 flex flex-col items-center border-r border-gray-100">
            <div className="relative w-48 sm:w-64 aspect-[2/3] rounded-lg shadow-2xl overflow-hidden mb-8 group">
              <img 
                src={book.cover} 
                alt={book.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                 <button onClick={() => onRead(book)} className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 p-3 rounded-full transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                   <BookOpen className="h-6 w-6" />
                 </button>
              </div>
            </div>
            
            <button 
              onClick={() => onRead(book)}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-md flex justify-center items-center mb-3"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Đọc thử
            </button>
            
            <div className="flex w-full space-x-3">
              <a 
                href={book.epubLink || '#'} 
                onClick={() => {
                  if (book.shopeeLink) {
                    window.open(book.shopeeLink, '_blank');
                  }
                }}
                className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors flex justify-center items-center"
              >
                <Download className="h-5 w-5 mr-1.5" />
                EPUB
              </a>
              <a 
                href={book.pdfLink || '#'} 
                onClick={() => {
                  if (book.shopeeLink) {
                    window.open(book.shopeeLink, '_blank');
                  }
                }}
                className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors flex justify-center items-center"
              >
                <Download className="h-5 w-5 mr-1.5" />
                PDF
              </a>
            </div>
          </div>

          {/* Book Info */}
          <div className="md:w-2/3 p-8 lg:p-12">
            <div className="mb-2 flex items-center space-x-2">
              <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                {book.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 font-medium mb-6">bởi <span className="text-indigo-600 hover:underline cursor-pointer">{book.author}</span></p>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-gray-100">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">{book.publisher || 'N/A'}</span>
                <span className="text-sm text-gray-500 mt-1">Nhà xuất bản</span>
              </div>
              <div className="hidden sm:block h-10 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">{book.distributor || 'N/A'}</span>
                <span className="text-sm text-gray-500 mt-1">Nhà phát hành</span>
              </div>
              <div className="hidden sm:block h-10 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">{book.publishDate || 'N/A'}</span>
                <span className="text-sm text-gray-500 mt-1">Ngày xuất bản</span>
              </div>
              <div className="hidden sm:block h-10 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">{book.pages || 'N/A'}</span>
                <span className="text-sm text-gray-500 mt-1">Số trang</span>
              </div>
              <div className="hidden md:block h-10 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">{book.coverPrice || 'N/A'}</span>
                <span className="text-sm text-gray-500 mt-1">Giá bìa</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu sách</h3>
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

const ReaderView = ({ book, onBack }) => {
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState('light'); // light, sepia, dark
  const [showControls, setShowControls] = useState(true);

  if (!book) return null;

  const themes = {
    light: 'bg-white text-gray-900',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]',
    dark: 'bg-gray-900 text-gray-300'
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-300 ${themes[theme]}`}>
      {/* Reader Header (Auto-hides) */}
      <div className={`transform transition-transform duration-300 ${showControls ? 'translate-y-0' : '-translate-y-full'} bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between absolute top-0 left-0 right-0 z-10`}>
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors mr-2"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <h2 className="font-bold text-sm md:text-base text-gray-900 dark:text-white line-clamp-1">{book.title}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{book.author}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Theme controls */}
          <div className="hidden sm:flex items-center space-x-2 mr-4 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button onClick={() => setTheme('light')} className={`w-6 h-6 rounded-md bg-white border border-gray-300 ${theme==='light' ? 'ring-2 ring-indigo-500' : ''}`}></button>
            <button onClick={() => setTheme('sepia')} className={`w-6 h-6 rounded-md bg-[#f4ecd8] border border-[#d3c6a6] ${theme==='sepia' ? 'ring-2 ring-indigo-500' : ''}`}></button>
            <button onClick={() => setTheme('dark')} className={`w-6 h-6 rounded-md bg-gray-900 border border-gray-600 ${theme==='dark' ? 'ring-2 ring-indigo-500' : ''}`}></button>
          </div>

          {/* Font size controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button 
              onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
              className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize(prev => Math.min(28, prev + 2))}
              className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-lg"
            >
              A+
            </button>
          </div>
          
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Reader Content Area */}
      <div 
        className="flex-1 overflow-y-auto pt-20 pb-12 px-4 sm:px-8 md:px-16 lg:px-32 scroll-smooth cursor-pointer"
        onClick={() => setShowControls(!showControls)}
      >
        <div 
          className="max-w-3xl mx-auto font-serif leading-relaxed"
          style={{ fontSize: `${fontSize}px` }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center mt-10" style={{ fontSize: `${fontSize * 1.5}px` }}>
            {book.title}
          </h1>
          <div className="text-center text-gray-500 mb-16 italic">
            Tác giả: {book.author}
          </div>
          
          <div className="whitespace-pre-line text-justify">
            {book.content}
            <br/><br/><br/>
            <p className="text-center italic opacity-50">-- Hết phần xem thử --</p>
          </div>
        </div>
      </div>

      {/* Reader Footer (Progress) */}
      <div className={`transform transition-transform duration-300 ${showControls ? 'translate-y-0' : 'translate-y-full'} absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] dark:border-t dark:border-gray-700 p-3 flex items-center justify-center`}>
        <div className="w-full max-w-md flex items-center space-x-4 text-xs text-gray-500">
          <span>1%</span>
          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[1%]"></div>
          </div>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'detail', 'reader', 'library'
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [booksData, setBooksData] = useState(MOCK_BOOKS);

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
    setSelectedBookId(book.id);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadBook = (book) => {
    setSelectedBookId(book.id);
    setCurrentView('reader');
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'home') {
      setSearchQuery('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
      {/* Ẩn header khi đang ở chế độ đọc */}
      {currentView !== 'reader' && (
        <Header 
          onSearch={handleSearchSubmit} 
          searchQuery={searchQuery}
          navigateTo={navigateTo} 
          currentView={currentView}
        />
      )}

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
          onBack={() => navigateTo('home')}
          onRead={handleReadBook}
        />
      )}

      {currentView === 'reader' && (
        <ReaderView 
          book={selectedBook} 
          onBack={() => setCurrentView('detail')} 
        />
      )}

      {/* Footer đơn giản (ẩn trong Reader) */}
      {currentView !== 'reader' && (
        <footer className="bg-white border-t border-gray-200 mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="stamp.png" alt="thuviennotion logo" className="h-10 w-10 object-contain mr-3" />
              <p className="text-gray-500 text-sm">
                &copy; 2026 thuviennotion. Mọi quyền được bảo lưu.
              </p>
            </div>
            <div className="flex items-center">
              <a href="https://facebook.com/thuviennotion" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="h-6 w-6 mr-2" />
                <span className="text-sm font-medium">Facebook</span>
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

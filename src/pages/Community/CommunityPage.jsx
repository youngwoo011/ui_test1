import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Flame, Eye, MessageSquare, Search, PencilLine, } from "lucide-react";
import { Card, CardContent } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Badge } from "@/components/UI/badge";
import { cn } from "@/components/UI/utils";
export function CommunityPage() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const categories = [
        "전체",
        "잡담",
        "사진/영상",
        "정보",
        "이벤트",
        "공지",
    ];
    const [posts] = useState([
        {
            id: 1,
            type: "공지",
            category: "공지",
            title: "사내 커뮤니티 이용 안내",
            author: "관리자",
            date: "04.16",
            views: 312,
            comments: 4,
            isPinned: true,
        },
        {
            id: 2,
            type: "공지",
            category: "공지",
            title: "비방 및 욕설 게시글은 삭제됩니다",
            author: "관리자",
            date: "04.15",
            views: 221,
            comments: 1,
            isPinned: true,
        },
        {
            id: 3,
            type: "인기",
            category: "사진/영상",
            title: "점심시간 풍경 사진 올려봐요",
            author: "김민수",
            date: "04.16",
            views: 727,
            comments: 9,
            likes: 45,
        },
        {
            id: 4,
            type: "인기",
            category: "잡담",
            title: "오늘 야근할 사람 있나요",
            author: "박소영",
            date: "04.16",
            views: 3200,
            comments: 14,
            likes: 43,
        },
        {
            id: 5,
            type: "인기",
            category: "사진/영상",
            title: "우리 팀 간식 자랑",
            author: "이서윤",
            date: "04.16",
            views: 1800,
            comments: 1,
            likes: 41,
        },
        {
            id: 6,
            type: "일반",
            category: "잡담",
            title: "일하기 싫다",
            author: "백도빈",
            date: "1분 전",
            views: 0,
            comments: 0,
        },
        {
            id: 7,
            type: "일반",
            category: "사진/영상",
            title: "어제 팀 회식 사진 공유합니다",
            author: "aeKARINA",
            date: "1분 전",
            views: 26,
            comments: 1,
        },
        {
            id: 8,
            type: "일반",
            category: "잡담",
            title: "집가고 싶다",
            author: "월급루팡",
            date: "1분 전",
            views: 6,
            comments: 0,
        },
        {
            id: 9,
            type: "일반",
            category: "정보",
            title: "연차 신청 승인 시간 보통 얼마나 걸리나요?",
            author: "정하늘",
            date: "04.15",
            views: 93,
            comments: 3,
        },
        {
            id: 10,
            type: "일반",
            category: "이벤트",
            title: "사내 체육대회 참가자 모집",
            author: "최유진",
            date: "04.14",
            views: 148,
            comments: 7,
        },
    ]);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchKeyword]);
    const filteredPosts = useMemo(() => {
        const keyword = searchKeyword.trim().toLowerCase();
        return posts.filter((post) => {
            const matchesCategory = selectedCategory === "전체" ? true : post.category === selectedCategory;
            const matchesKeyword = keyword === ""
                ? true
                : post.title.toLowerCase().includes(keyword) ||
                    post.author.toLowerCase().includes(keyword);
            return matchesCategory && matchesKeyword;
        });
    }, [posts, selectedCategory, searchKeyword]);
    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
    const startIndex = (currentPage - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
    const getTypeBadge = (type) => {
        if (type === "공지") {
            return (<Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
          공지
        </Badge>);
        }
        if (type === "인기") {
            return (<Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          인기
        </Badge>);
        }
        return null;
    };
    const getCategoryColor = (category) => {
        const map = {
            잡담: "text-blue-600",
            "사진/영상": "text-teal-600",
            정보: "text-red-600",
            이벤트: "text-orange-500",
            공지: "text-red-500",
        };
        return map[category] || "text-gray-600";
    };
    return (<div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">커뮤니티</h2>
          <p className="text-gray-600 mt-1">
            사내 자유 게시판과 인기글을 확인하세요
          </p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.alert("글쓰기 기능은 다음 단계에서 연결됩니다.")}>
          <PencilLine className="size-4 mr-2"/>
          글쓰기
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="border-b border-gray-200 px-4 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"/>
                <Input value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="게시글 검색" className="pl-9"/>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (<button key={category} onClick={() => setSelectedCategory(category)} className={cn("px-3 py-2 rounded-md text-sm border transition-colors", selectedCategory === category
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50")}>
                    {category}
                  </button>))}
              </div>
            </div>
          </div>

          <div>
            {filteredPosts.length === 0 ? (<div className="py-16 text-center text-gray-500">
                조건에 맞는 게시글이 없습니다.
              </div>) : (<>
                <ul>
                  {paginatedPosts.map((post) => (<li key={post.id} className={cn("px-5 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors", post.type === "인기" && "bg-blue-50/40")} onClick={() => navigate(`/community/${post.id}`)}>
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 pt-0.5">{getTypeBadge(post.type)}</div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-medium text-gray-900 break-words">
                              {post.title}
                            </h3>
                            {post.comments > 0 && (<span className="text-blue-600 font-medium">
                                [{post.comments}]
                              </span>)}
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                            <span>{post.date}</span>
                            <span className={getCategoryColor(post.category)}>
                              {post.category}
                            </span>
                            <span>{post.author}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="size-3.5"/>
                              {post.views >= 10000
                    ? `${(post.views / 10000).toFixed(1)}만`
                    : post.views}
                            </span>
                            {typeof post.likes === "number" && (<span className="flex items-center gap-1">
                                <Flame className="size-3.5"/>
                                {post.likes}
                              </span>)}
                            <span className="flex items-center gap-1">
                              <MessageSquare className="size-3.5"/>
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>))}
                </ul>

                {totalPages > 1 && (<div className="flex items-center justify-center gap-2 px-5 py-4">
                    <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                      이전
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (<Button key={page} size="sm" variant={currentPage === page ? "default" : "outline"} onClick={() => setCurrentPage(page)} className="min-w-9">
                        {page}
                      </Button>))}

                    <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                      다음
                    </Button>
                  </div>)}
              </>)}
          </div>
        </CardContent>
      </Card>
    </div>);
}

import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Eye, MessageSquare, Flame, CalendarDays, User, } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
export function CommunityDetailPage() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const posts = [
        {
            id: 1,
            type: "공지",
            category: "공지",
            title: "사내 커뮤니티 이용 안내",
            author: "관리자",
            date: "04.16",
            views: 312,
            comments: 4,
            content: "사내 커뮤니티는 자유로운 소통을 위한 공간입니다.\n\n욕설, 비방, 개인정보 노출이 포함된 글은 삭제될 수 있습니다.\n모든 직원이 편하게 사용할 수 있도록 서로 배려해 주세요.",
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
            content: "비방, 욕설, 과도한 분쟁성 게시글은 운영 기준에 따라 삭제됩니다.\n반복 시 이용이 제한될 수 있습니다.",
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
            content: "오늘 날씨가 좋아서 점심시간에 찍은 사진 공유합니다.\n다들 점심시간에 뭐 하셨나요?",
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
            content: "오늘 배포 일정 때문에 늦게까지 남아야 할 것 같아요.\n같이 저녁 먹고 일할 분 있으면 댓글 주세요.",
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
            content: "오늘 팀 간식이 너무 좋아서 자랑합니다.\n다른 팀도 간식 자랑해 주세요.",
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
            content: "월요일도 아닌데 벌써 지치네요.\n다들 오늘 텐션 어떤가요?",
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
            content: "어제 팀 회식 때 찍은 사진 공유합니다.\n재밌었던 순간들이 많았어요.",
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
            content: "오늘따라 시간이 너무 안 가네요.\n퇴근까지 아직 한참 남았어요.",
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
            content: "연차 신청을 올렸는데 아직 승인 전이라 궁금합니다.\n보통 승인까지 얼마나 걸리는 편인가요?",
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
            content: "다음 달 사내 체육대회 참가자를 모집합니다.\n관심 있는 분들은 댓글이나 메신저로 연락 주세요.",
        },
    ];
    const post = useMemo(() => posts.find((item) => item.id === Number(postId)), [postId]);
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
        return (<Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
        일반
      </Badge>);
    };
    if (!post) {
        return (<div className="p-6 max-w-5xl mx-auto">
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-gray-500 mb-4">존재하지 않는 게시글입니다.</p>
            <Button variant="outline" onClick={() => navigate("/community")}>
              목록으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>);
    }
    return (<div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">게시글 상세</h2>
        <Button variant="outline" onClick={() => navigate("/community")}>
          <ArrowLeft className="size-4 mr-2"/>
          목록으로
        </Button>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {getTypeBadge(post.type)}
            <Badge className="bg-red-50 text-red-600 hover:bg-red-50">
              {post.category}
            </Badge>
          </div>

          <CardTitle className="text-2xl break-words">{post.title}</CardTitle>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User className="size-4"/>
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="size-4"/>
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-4"/>
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="size-4"/>
              {post.comments}
            </span>
            {typeof post.likes === "number" && (<span className="flex items-center gap-1">
                <Flame className="size-4"/>
                {post.likes}
              </span>)}
          </div>
        </CardHeader>

        <CardContent>
          <div className="min-h-[260px] rounded-lg border border-gray-200 bg-white p-5 whitespace-pre-line leading-7 text-gray-800">
            {post.content}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">댓글</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-10 text-center text-gray-500">
            댓글 기능은 다음 단계에서 연결됩니다.
          </div>
        </CardContent>
      </Card>
    </div>);
}

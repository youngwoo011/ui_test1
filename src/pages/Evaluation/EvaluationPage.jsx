import { useAppContext } from "@/store/AppProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Progress } from "@/components/UI/progress";
import { Badge } from "@/components/UI/badge";
import { Award, Star, TrendingUp } from "lucide-react";
export function EvaluationPage() {
    const { currentUser, employees } = useAppContext();
    // 우리팀(현재 사용자의 부서) 직원들
    const myTeam = employees.filter(emp => emp.department === currentUser.department);
    // 팀 평가 데이터
    const teamEvaluation = {
        period: "2026년 1분기",
        teamName: currentUser.department,
        averageScore: 4.3,
        maxScore: 5,
        rank: "A",
        totalMembers: myTeam.length,
        categories: [
            { name: "업무 성과", score: 4.5, maxScore: 5 },
            { name: "협업 능력", score: 4.2, maxScore: 5 },
            { name: "전문성", score: 4.4, maxScore: 5 },
            { name: "의사소통", score: 4.1, maxScore: 5 },
            { name: "목표 달성도", score: 4.3, maxScore: 5 },
        ],
    };
    // 팀원별 평가 점수
    const teamMemberScores = myTeam.map(emp => ({
        id: emp.id,
        name: emp.name,
        position: emp.position,
        score: (Math.random() * 1 + 3.5).toFixed(1), // 3.5 ~ 4.5 사이 랜덤 점수
        rank: ["A", "A-", "B+", "B"][Math.floor(Math.random() * 4)],
    }));
    return (<div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">우리팀 평가</h2>
        <p className="text-gray-600">{currentUser.department} 팀의 평가 결과를 확인하세요</p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">팀 평균 점수</div>
              <Award className="size-8 text-yellow-500"/>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {teamEvaluation.averageScore}
            </div>
            <div className="text-sm text-gray-600">/ {teamEvaluation.maxScore}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">팀 등급</div>
              <Star className="size-8 text-blue-500"/>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {teamEvaluation.rank}
            </div>
            <div className="text-sm text-gray-600">등급</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">평가 기간</div>
              <TrendingUp className="size-8 text-green-500"/>
            </div>
            <div className="text-xl font-bold text-gray-900 mb-1">
              {teamEvaluation.period}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">팀 인원</div>
              <Award className="size-8 text-purple-500"/>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {teamEvaluation.totalMembers}
            </div>
            <div className="text-sm text-gray-600">명</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Scores */}
        <Card>
          <CardHeader>
            <CardTitle>팀 평가 항목별 점수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamEvaluation.categories.map((category) => (<div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {category.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {category.score} / {category.maxScore}
                    </span>
                  </div>
                  <Progress value={(category.score / category.maxScore) * 100}/>
                </div>))}
            </div>
          </CardContent>
        </Card>

        {/* Team Member Scores */}
        <Card>
          <CardHeader>
            <CardTitle>팀원별 평가 점수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMemberScores.map((member) => (<div key={member.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{member.score}</div>
                      <div className="text-xs text-gray-600">/ 5.0</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {member.rank}
                    </Badge>
                  </div>
                </div>))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Feedback */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>팀 평가 총평</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">강점</h4>
              <p className="text-sm text-green-800">
                팀 전체적으로 높은 업무 성과와 전문성을 보여주었습니다. 특히 협업 능력이 우수하며, 
                프로젝트 완료율이 높아 목표 달성도가 뛰어납니다.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">개선 사항</h4>
              <p className="text-sm text-blue-800">
                의사소통 부분에서 추가적인 개선이 필요합니다. 정기적인 팀 미팅을 통해 
                더 원활한 커뮤니케이션을 구축하시길 권장합니다.
              </p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">다음 분기 목표</h4>
              <p className="text-sm text-purple-800">
                현재의 높은 성과를 유지하면서 팀 내 지식 공유와 멘토링을 강화하여 
                전체 팀원의 역량을 한 단계 더 끌어올리는 것을 목표로 합니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);
}

import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Users, Calendar as CalendarIcon, MessageSquare, ClipboardCheck, UsersRound, CheckSquare, Plane, Bell, UserPlus, LogOut, FileText, ChevronDown, HelpCircle, FileCheck, User } from "lucide-react";
import { cn } from "@/components/UI/utils";
import { useAppContext } from "@/store/AppProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/select";
import { Button } from "@/components/UI/button";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/UI/dropdown-menu";
import { ChatWidget } from "@/components/Chat/ChatWidget";
export function MainLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, updateEmployeeStatus, logout, notifications } = useAppContext();
    const isHrAdmin = currentUser?.department === "인사팀" && currentUser?.role === "팀장";
    const [searchQuery, setSearchQuery] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const handleStatusChange = (status) => {
        if (currentUser) {
            updateEmployeeStatus(currentUser.id, status);
        }
    };
    const handleLogout = () => {
        logout();
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "업무 중":
                return "bg-green-500";
            case "자리 비움":
                return "bg-yellow-500";
            case "집중 모드":
                return "bg-purple-500";
            case "휴가 중":
                return "bg-blue-500";
            case "오프라인":
                return "bg-gray-500";
            default:
                return "bg-gray-500";
        }
    };
    const navItems = [
        { path: "/", label: "대시보드", icon: LayoutDashboard, roles: ["최고관리자", "팀장", "일반직원"] },
        { path: "/notice", label: "공지사항", icon: FileText, roles: ["최고관리자", "팀장", "일반직원"] },
        { path: "/employees", label: "직원 조회", icon: Users, roles: ["최고관리자", "팀장", "일반직원"] },
        { path: "/vacation", label: isHrAdmin ? "휴가 신청현황" : "휴가 신청", icon: Plane, roles: ["최고관리자", "팀장", "일반직원"] },
        { path: "/calendar", label: "캘린더", icon: CalendarIcon, roles: ["최고관리자", "팀장", "일반직원"] },
        { path: "/chat", label: "채팅", icon: MessageSquare, roles: ["최고관리자", "팀장", "일반직원"] },
        { path: "/inquiry", label: isHrAdmin ? "문의 관리" : "문의", icon: HelpCircle, roles: ["최고관리자", "팀장", "일반직원"] },
        { path: "/community", label: "커뮤니티", icon: UsersRound, roles: ["최고관리자", "팀장", "일반직원"] },
        { path: "/approval-request", label: "결재신청", icon: FileCheck, roles: ["최고관리자", "팀장", "일반직원"] },
        { path: "/evaluation", label: "사내 평가", icon: ClipboardCheck, roles: ["최고관리자", "팀장"] },
        { path: "/approval", label: "결재", icon: CheckSquare, roles: ["최고관리자", "팀장"] },
        { path: "/registration-approval", label: "회원가입 승인", icon: UserPlus, roles: ["최고관리자"] },
    ];
    const filteredNavItems = navItems.filter(item => currentUser && item.roles.includes(currentUser.role));
    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };
    const unreadNotifications = notifications.filter(n => !n.read).length;
    return (<div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-8">
            <img src="/leandash-logo.png" alt="Leandash 로고" className="h-27 w-auto object-contain"/>
          </Link>

          {/* Navigation Items */}
          <nav className="flex items-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
            {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (<Link key={item.path} to={item.path} className={cn("flex shrink-0 items-center gap-1.5 whitespace-nowrap text-base font-medium transition-colors", active
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900")}>
                  <Icon className="size-4"/>
                  <span>{item.label}</span>
                </Link>);
        })}
          </nav>

          {/* Right Section */}
          <div className="ml-auto flex items-center gap-4">
            {/* My Page Button */}
            <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate('/mypage')}>
              <User className="size-4"/>
              <span>내 정보</span>
            </Button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell className="size-5 text-gray-600"/>
              {unreadNotifications > 0 && (<span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>)}
            </button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                  <div className="relative">
                    <div className="size-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-sm font-semibold">
                      {currentUser?.name.charAt(0) || "?"}
                    </div>
                    <div className={cn("absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white", getStatusColor(currentUser?.status || "오프라인"))}></div>
                  </div>
                  <ChevronDown className="size-4 text-gray-400"/>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">{currentUser?.email}</p>
                </div>
                
                <div className="p-2">
                  <div className="text-xs text-gray-500 mb-2 px-2">상태 변경</div>
                  <Select value={currentUser?.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <div className={cn("size-2 rounded-full", getStatusColor(currentUser?.status || "오프라인"))}></div>
                          <span>{currentUser?.status}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="업무 중">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-green-500"></div>
                          <span>업무 중</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="자리 비움">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-yellow-500"></div>
                          <span>자리 비움</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="집중 모드">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-purple-500"></div>
                          <span>집중 모드</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="휴가 중">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-blue-500"></div>
                          <span>휴가 중</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="오프라인">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-gray-500"></div>
                          <span>오프라인</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-gray-100">
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="size-4 mr-2"/>
                    로그아웃
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Chat Widget */}
      <ChatWidget />
    </div>);
}

import { createBrowserRouter } from "react-router";
import { MainLayout } from "@/components/Layout/MainLayout";
import { DashboardPage } from "@/pages/Dashboard/DashboardPage";
import { EmployeesPage } from "@/pages/Employees/EmployeesPage";
import { VacationPage } from "@/pages/Vacation/VacationPage";
import { CalendarPage } from "@/pages/Calendar/CalendarPage";
import { ChatPage } from "@/pages/Board/ChatPage";
import { EvaluationPage } from "@/pages/Evaluation/EvaluationPage";
import { HeartLetterPage } from "@/pages/SecretLetter/SecretLetterPage";
import { ApprovalPage } from "@/pages/Approval/ApprovalPage";
import { NoticePage } from "@/pages/Board/NoticePage";
import { RegistrationApprovalPage } from "@/pages/Registration/RegistrationApprovalPage";
import { SearchPage } from "@/pages/Search/SearchPage";
import { InquiryPage } from "@/pages/Board/InquiryPage";
import { ApprovalRequestPage } from "@/pages/Approval/ApprovalRequestPage";
import { MyPage } from "@/pages/MyPage/MyPage";
import { CommunityPage } from "@/pages/Community/CommunityPage";
import { CommunityDetailPage } from "@/pages/Community/CommunityDetailPage";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: DashboardPage },
            { path: "notice", Component: NoticePage },
            { path: "employees", Component: EmployeesPage },
            { path: "vacation", Component: VacationPage },
            { path: "calendar", Component: CalendarPage },
            { path: "chat", Component: ChatPage },
            { path: "inquiry", Component: InquiryPage },
            { path: "approval-request", Component: ApprovalRequestPage },
            { path: "evaluation", Component: EvaluationPage },
            { path: "approval", Component: ApprovalPage },
            { path: "heart-letter", Component: HeartLetterPage },
            { path: "community", Component: CommunityPage },
            { path: "community/:postId", Component: CommunityDetailPage },
            { path: "registration-approval", Component: RegistrationApprovalPage },
            { path: "search", Component: SearchPage },
            { path: "mypage", Component: MyPage },
        ],
    },
]);

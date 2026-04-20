import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/UI/card";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";
export function LoginPage({ onLogin, onToggleRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pt-0 pb-4">
          <div className="flex justify-center -mb-10 -mt-5">
            <img src="/leandash-logo.png" alt="Leandash 로고" className="h-50 w-auto object-contain"/>
          </div>
          <p className="text-gray-600">로그인하여 시작하세요</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="example@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              계정이 없으신가요?{" "}
              <button onClick={onToggleRegister} className="text-blue-600 hover:underline font-semibold">
                회원가입
              </button>
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>데모 계정:</strong>
              <br />
              일반 직원: kim@company.com
              <br />
              HR 관리자: park@company.com
              <br />
              비밀번호: 임의로 입력
            </p>
          </div>
        </CardContent>
      </Card>
    </div>);
}

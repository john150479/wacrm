"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const t = useTranslations("ForgotPasswordPage");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // The emailed link returns to /auth/callback, which exchanges it
    // for a recovery session and forwards to /reset-password (issue
    // #592). Supabase must allow this origin under Authentication →
    // URL Configuration → Redirect URLs, or it silently falls back to
    // its Site URL; see docs/auth-emails.md.
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/reset-password")}`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md border-border bg-card">
          <CardHeader className="items-center text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl text-foreground">
              {t("checkEmailTitle")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t.rich("checkEmailDesc", {
                email,
                strong: (chunks) => (
                  <span className="text-foreground">{chunks}</span>
                ),
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {t("backToSignIn")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <svg viewBox="0 0 1593 2321" className="h-6 w-6 text-primary" fill="currentColor"><path fillRule="evenodd" d="M913,1692 L759,1896 L398,2100 L322,2321 L821,1955ZM827,1574 L244,1778 L76,1983 L298,1869 L665,1717ZM977,1500 L671,1780 L294,1932 L0,2321 L398,2033 L743,1841 L895,1643ZM1251,1248 L1078,1420 L1026,1547 L930,1761 L1165,1506 L1285,1383ZM1279,1054 L906,1360 L764,1549 L901,1487 L1262,1173 L1357,1383 L1397,1290ZM268,1004 L384,1119 L529,1123 L612,1213 L825,1391 L563,1012ZM1593,716 L1571,696 L1539,684 L1460,694 L1415,680 L1388,680 L1278,716 L1070,817 L1141,823 L1254,778 L1168,866 L1145,943 L1370,741 L1457,721 L1384,786 L1354,848 L1399,951 L1417,854 L1463,782 L1516,735 L1556,719ZM68,632 L112,837 L218,933 L587,953 L864,1349 L869,1347 L897,1294 L617,870 L170,754ZM50,314 L50,531 L188,691 L645,819 L946,1261 L1288,979 L1437,1253 L1443,1126 L1305,862 L954,1172 L669,746 L248,572ZM50,0 L50,221 L288,525 L701,701 L915,1011 L817,676 L356,398Z"/></svg>
          </div>
          <CardTitle className="text-xl text-foreground">{t("title")}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("desc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-muted-foreground">
                {t("emailLabel")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border bg-muted text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-10 w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? t("sending") : t("sendLink")}
            </Button>
          </form>

          <Link
            href="/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToSignIn")}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

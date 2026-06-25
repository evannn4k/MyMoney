import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function VerifyAccount() {
    const redirect = useNavigate();
    const params = useParams("url");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState();

    const fetchOtp = async () => {
        try {
            const response = await api.get("/api/get-otp-data/" + params.url);
            setEmail(response.data.data.email);
            console.log(response.data.data);
        } catch (e) {
            redirect("/");
        }
    };
    
    useEffect(() => {
        fetchOtp();
    }, [params.url]);
    
    const handleClick = async () => {
        try {
            const formData = new FormData();
            formData.append("url", params.url);
            formData.append("otp", otp);
            
            const response = await api.post("/api/otp/", formData);
            
            redirect("/");
            toast.success(response.data.message)
        } catch (e) {
            toast.error(e.response.data.message)
            console.log(e.response);
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <Card className="mx-auto max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-xl py-2 font-semibold">
                            Verifikasi Akunmu
                        </CardTitle>
                        <CardDescription className="text-center">
                            Silahkan cek kode OTP di gmail mu{" "}
                            <span className="font-medium">{email}</span>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Field>
                            <div className="flex justify-center items-center flex-col w-full gap-2 py-4">
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="otp-verification">
                                        Verification code
                                    </FieldLabel>
                                </div>
                                <InputOTP
                                    value={otp}
                                    onChange={(value) => setOtp(value)}
                                    maxLength={6}
                                    id="otp-verification"
                                    required>
                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator className="mx-2" />
                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                        </Field>
                    </CardContent>
                    <CardFooter>
                        <Field>
                            <Button onClick={handleClick} className="w-full">
                                Verifikasi
                            </Button>
                        </Field>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

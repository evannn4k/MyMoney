import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EyeOffIcon } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import PrimaryLogo from "@/assets/images/logo/primary_logo.png";
import SecondaryLogo from "@/assets/images/logo/secondary_logo.png";
import Bg from "@/assets/images/bg.jpg";
import { Spinner } from "@/components/ui/spinner";
import api from "@/services/api";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function RegisterForm({ className, ...props }) {
    const [typePassword, setTypePassword] = useState("password");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const redirect = useNavigate();

    const initialData = {
        email: "",
        password: "",
    };
    const [data, setData] = useState(initialData);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post(`/api/verify`, data);

            const { name, email, token } = response.data.data;
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("token", token);

            redirect("/dashboard");
        } catch (e) {
            Swal.fire({
                title: "Login Gagal!",
                text: "Email atau password salah, silahkan coba lagi!",
                icon: "error",
            });
            console.log(e.response.data.errors);
            setErrors(e.response.data.errors);
        } finally {
            setIsLoading(false);
        }
    }

    function handleChange(e) {
        setData((item) => {
            return {
                ...item,
                [e.target.id]: e.target.value,
            };
        });
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 rounded-3xl">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex w-full justify-center p-2">
                                <img
                                    src={PrimaryLogo}
                                    alt="logo"
                                    className="h-16"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Selamat Datang Kembali
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    Silahkan masuk dengan menggunakan akun anda
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    value={data.email}
                                    onChange={handleChange}
                                    id="email"
                                    type="email"
                                    placeholder="emailmu@contoh.com"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        value={data.password}
                                        onChange={handleChange}
                                        id="password"
                                        type={typePassword}
                                        placeholder="Masukan password"
                                    />
                                    <InputGroupAddon
                                        align="inline-end"
                                        onClick={() => {
                                            setTypePassword(
                                                typePassword === "password"
                                                    ? "text"
                                                    : "password",
                                            );
                                        }}
                                        className="cursor-default">
                                        <EyeOffIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                            <Field>
                                <Button
                                    type="submit"
                                    className="bg-brand-600 hover:bg-brand-700"
                                    disabled={isLoading}>
                                    {isLoading && (
                                        <Spinner className="size-4" />
                                    )}
                                    Login
                                </Button>
                            </Field>
                            <FieldDescription className="text-center">
                                <span>Belum memiliki akun? silahkan </span>
                                <a href="/register">Daftar</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <div className="absolute inset-0 z-10 p-16">
                            <div className="h-full flex justify-center items-center flex-col gap-6">
                                <img src={SecondaryLogo} className="w-32"></img>
                                <div className="flex flex-col items-center">
                                    <p className="text-3xl font-bold text-white">
                                        MyMoney
                                    </p>
                                    <p className="text-sm text-white text-center px-12 mt-2">
                                        Aplikasi pencatatan keuangan pribadimu
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-brand-600/80 absolute inset-0"></div>
                        <img
                            src={Bg}
                            alt="Image"
                            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EyeOffIcon } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import SecondaryLogo from "@/assets/images/logo/secondary_logo.png";
import Bg from "@/assets/images/bg.jpg";
import { Spinner } from "@/components/ui/spinner";
import api from "@/services/api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function RegisterForm({ className, ...props }) {
    const [typePassword, setTypePassword] = useState("password");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const redirect = useNavigate();

    const initialData = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };
    const [data, setData] = useState(initialData);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post(`/api/register`, data);

            // console.log(response.data.data.url);

            if (response.status === "error") {
                throw new Error(response.message);
            }

            redirect("/verify-account/" + response.data.data.url);
        } catch (e) {
            const errorData = e.response.data;
            if (typeof errorData.errors === "object") {
                toast.error("Gagal, silahkan coba lagi!");
            } else {
                toast.error(errorData.errors);
            }

            setErrors(errorData.errors);
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
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Selamat Datang
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    Silahkan mendaftar untuk mengakses fitur
                                    kami
                                </p>
                            </div>
                            <Field data-invalid={Boolean(errors.name)}>
                                <FieldLabel htmlFor="name">Nama</FieldLabel>
                                <Input
                                    aria-invalid={Boolean(errors.name)}
                                    value={data.name}
                                    onChange={handleChange}
                                    id="name"
                                    type="name"
                                    placeholder="Masukan namamu"
                                />
                                {errors.name && (
                                    <FieldError>{errors.name[0]}</FieldError>
                                )}
                            </Field>
                            <Field data-invalid={Boolean(errors.email)}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    aria-invalid={Boolean(errors.email)}
                                    value={data.email}
                                    onChange={handleChange}
                                    id="email"
                                    type="email"
                                    placeholder="emailmu@contoh.com"
                                />
                                {errors.email ? (
                                    <FieldError>{errors.email[0]}</FieldError>
                                ) : (
                                    <FieldDescription>
                                        Masukan email valid mu
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field data-invalid={Boolean(errors.password)}>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        aria-invalid={Boolean(errors.password)}
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
                                {errors.password ? (
                                    <FieldError>
                                        {errors.password[0]}
                                    </FieldError>
                                ) : (
                                    <FieldDescription>
                                        Minimal 8 huruf
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password_confirmation">
                                    Password
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        value={data.password_confirmation}
                                        onChange={handleChange}
                                        id="password_confirmation"
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
                            <Field
                                data-invalid={Boolean(
                                    errors.password_confirmation,
                                )}>
                                <Button
                                    aria-invalid={Boolean(
                                        errors.password_confirmation,
                                    )}
                                    type="submit"
                                    className="bg-brand-600 hover:bg-brand-700"
                                    disabled={isLoading}>
                                    {isLoading && (
                                        <Spinner className="size-4" />
                                    )}
                                    Login
                                </Button>
                                {errors.password_confirmation && (
                                    <FieldError>
                                        {errors.password_confirmation[0]}
                                    </FieldError>
                                )}
                            </Field>
                            <FieldDescription className="text-center">
                                <span>Sudah memiliki akun? silahkan </span>
                                <a href="/">Masuk</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
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

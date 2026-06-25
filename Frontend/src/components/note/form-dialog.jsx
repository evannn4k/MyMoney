import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ChevronDownIcon, Component } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import FormatRupiah from "@/utils/idr-format";

export default function FormDialog({ dialog, setIsOpen, fetchNote }) {
    const initialData = {
        wallet_id: "",
        category_id: "",
        notes: "",
        date: null,
        amount: "",
        receipt_image: "",
    };

    const [formData, setFormData] = useState({
        wallets: [],
        categories: [],
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);

    useEffect(() => {
        if (dialog.edit === true) {
            setData({
                ...initialData,
                notes: dialog.data.notes ?? "",
                date: dialog.data.date ?? null,
            });
        } else {
            setData(initialData);
        }
        setErrors(initialData);
    }, [dialog.open]);

    // console.log(data);

    const fetchFormData = async () => {
        try {
            const response = await api.get("/api/get-form-data");

            setFormData(response.data.data);
            // console.log(response.data);
        } catch (e) {
            console.log(e.response.data);
        }
    };

    useEffect(() => {
        if (dialog.open) {
            fetchFormData();
        }
    }, [dialog.open]);

    const handleChange = (name, value) => {
        setData((item) => {
            return {
                ...item,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (dialog.edit) {
                const dataTransaction = new FormData();
                dataTransaction.append("_method", "PUT");
                dataTransaction.append("notes", data.notes);
                dataTransaction.append("date", data.date);
                if (data.receipt_image instanceof File) {
                    dataTransaction.append("receipt_image", data.receipt_image);
                } else {
                    dataTransaction.append("receipt_image", "");
                }
                const response = await api.post(
                    "/api/transaction/" + dialog.data.id,
                    dataTransaction,
                );
                console.log(response.data);
                toast.success(response.data.message, {
                    position: "top-right",
                });
            } else {
                const dataTransaction = new FormData();
                dataTransaction.append("wallet_id", data.wallet_id);
                dataTransaction.append("category_id", data.category_id);
                dataTransaction.append("notes", data.notes);
                dataTransaction.append("date", data.date);
                dataTransaction.append("amount", data.amount);
                dataTransaction.append("receipt_image", data.receipt_image);

                const response = await api.post(
                    "/api/transaction",
                    dataTransaction,
                );

                toast.success(response.data.message, {
                    position: "top-right",
                });
            }
            setIsOpen(false);
            setErrors(initialData);
            setData(initialData);
            fetchNote();
        } catch (e) {
            setErrors(e.response.data.errors);
            if (e.response.data.message == "Saldo tidak cukup") {
                toast.error("Saldo tidak cukup!", {
                    position: "top-right",
                });
                setErrors({ amount: ["Saldo tidak cukup"] });
            } else {
                toast.error("Gagal, silahkan coba lagi!", {
                    position: "top-right",
                });
            }
            console.log(e.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={dialog.open} onOpenChange={setIsOpen}>
            {/* {dialog.open && ( */}
            <form id="form" onSubmit={handleSubmit}>
                <DialogContent className="lg:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="pb-4">
                            {!dialog.data
                                ? "Catat Transaksi Baru"
                                : "Edit Transaksi"}
                        </DialogTitle>
                        <DialogDescription
                            aria-describedby={undefined}></DialogDescription>
                    </DialogHeader>
                    {!dialog.edit && (
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex flex-col gap-4 flex-1">
                                <Field data-invalid={Boolean(errors.wallet_id)}>
                                    <Label htmlFor="wallet_id">Dompet</Label>
                                    <Select
                                        value={data.wallet_id}
                                        id="wallet_id"
                                        modal={false}
                                        onValueChange={(value) =>
                                            handleChange("wallet_id", value)
                                        }>
                                        <SelectTrigger
                                            className="w-full"
                                            aria-invalid={Boolean(
                                                errors.wallet_id,
                                            )}>
                                            <SelectValue placeholder="Pilih Dompet" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Dompet
                                                </SelectLabel>
                                                {formData.wallets.map(
                                                    (wallet) => (
                                                        <SelectItem
                                                            key={wallet.id}
                                                            value={wallet.id}>
                                                            {wallet.name}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.wallet_id && (
                                        <FieldError>
                                            {errors.wallet_id[0]}
                                        </FieldError>
                                    )}
                                </Field>
                                <div className="text-sm leading-none font-medium">
                                    Saldo :{" "}
                                    <span>
                                        {data.wallet_id
                                            ? FormatRupiah(
                                                  formData.wallets.filter(
                                                      (item) =>
                                                          item.id ===
                                                          data.wallet_id,
                                                  )[0].balance,
                                              )
                                            : ""}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 flex-1">
                                <Field
                                    data-invalid={Boolean(errors.category_id)}>
                                    <Label htmlFor="category_id">
                                        Kategori Transaksi
                                    </Label>
                                    <Select
                                        id="category_id"
                                        modal={false}
                                        value={data.category_id}
                                        onValueChange={(value) =>
                                            handleChange("category_id", value)
                                        }>
                                        <SelectTrigger
                                            className="w-full"
                                            aria-invalid={Boolean(
                                                errors.category_id,
                                            )}>
                                            <SelectValue placeholder="Pilih Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Kategori
                                                </SelectLabel>
                                                {formData.categories.map(
                                                    (category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && (
                                        <FieldError>
                                            {errors.category_id[0]}
                                        </FieldError>
                                    )}
                                </Field>
                                <div className="text-sm leading-none font-medium">
                                    Type :{" "}
                                    <span>
                                        {data.category_id
                                            ? formData.categories.filter(
                                                  (item) =>
                                                      item.id ===
                                                      data.category_id,
                                              )[0].type == "expense"
                                                ? "Pengeluaran"
                                                : "Pendapatan"
                                            : ""}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    <Separator />
                    <Field data-invalid={Boolean(errors.date)}>
                        <Label htmlFor="date">Tanggal</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    aria-invalid={Boolean(errors.date)}
                                    variant="outline"
                                    data-empty={!data.date}
                                    className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground my-1">
                                    {data.date ? (
                                        format(data.date, "yyyy-MM-dd")
                                    ) : (
                                        <span>Pilih Tanggal</span>
                                    )}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start">
                                <Calendar
                                    mode="single"
                                    selected={
                                        data.date ? new Date(data.date) : null
                                    }
                                    onSelect={(date) => {
                                        if (date) {
                                            handleChange(
                                                "date",
                                                format(date, "yyyy-MM-dd"),
                                            );
                                        } else {
                                            handleChange("date", null);
                                        }
                                    }}
                                    defaultMonth={
                                        data.date ? new Date(data.date) : null
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.date && (
                            <FieldError>{errors.date[0]}</FieldError>
                        )}
                    </Field>
                    {!dialog.edit && (
                        <Field data-invalid={Boolean(errors.amount)}>
                            <FieldLabel htmlFor="amount">Total</FieldLabel>
                            <Input
                                aria-invalid={Boolean(errors.amount)}
                                id="amount"
                                type="number"
                                placeholder="0"
                                value={data.amount}
                                onChange={(e) =>
                                    handleChange("amount", e.target.value)
                                }
                            />
                            {errors.amount && (
                                <FieldError>{errors.amount[0]}</FieldError>
                            )}
                        </Field>
                    )}
                    <Field data-invalid={Boolean(errors.notes)}>
                        <FieldLabel htmlFor="notes">Catatan</FieldLabel>
                        <Textarea
                            aria-invalid={Boolean(errors.notes)}
                            id="notes"
                            placeholder="Catat transaksi mu."
                            value={data.notes}
                            onChange={(e) =>
                                handleChange("notes", e.target.value)
                            }
                        />
                        {errors.notes && (
                            <FieldError>{errors.notes[0]}</FieldError>
                        )}
                    </Field>
                    <Field data-invalid={Boolean(errors.receipt_image)}>
                        <FieldLabel htmlFor="receipt_image">
                            {dialog.edit && "Ganti "}Bukti Foto
                        </FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.receipt_image)}
                            type="file"
                            id="receipt_image"
                            // value={data.receipt_image}
                            onChange={(e) =>
                                handleChange("receipt_image", e.target.files[0])
                            }
                        />
                        {errors.receipt_image && (
                            <FieldError>{errors.receipt_image[0]}</FieldError>
                        )}
                    </Field>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                        </DialogClose>
                        <Button type="submit" form="form" disabled={loading}>
                            {loading && <Spinner />}
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

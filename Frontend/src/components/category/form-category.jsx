import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function FormDialog({ dialog, setIsOpen, fetchCategory }) {
    const initialData = {
        name: "",
        type: "",
    };

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);

    useEffect(() => {
        if (dialog.edit === true) {
            setData({
                name: dialog.data.name ?? "",
                type: dialog.data.type ?? "",
            });
        } else {
            setData(initialData);
        }
        setErrors(initialData);
    }, [dialog.open]);

    // console.log(data);

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
                const dataCategory = new FormData();
                dataCategory.append("_method", "PUT");
                dataCategory.append("name", data.name);
                dataCategory.append("type", data.type);

                const response = await api.post(
                    "/api/category/" + dialog.data.id,
                    dataCategory,
                );

                toast.success(response.data.message, {
                    position: "top-right",
                });
            } else {
                const dataCategory = new FormData();
                dataCategory.append("name", data.name);
                dataCategory.append("type", data.type);

                const response = await api.post("/api/category", dataCategory);

                toast.success(response.data.message, {
                    position: "top-right",
                });
            }
            setIsOpen(false);
            setErrors(initialData);
            setData(initialData);
            fetchCategory();
        } catch (e) {
            const errorData = e.response.data;
            if (typeof errorData.errors === "object") {
                toast.error("Gagal, silahkan coba lagi!");
            } else {
                toast.error(errorData.errors);
            }

            setErrors(errorData.errors);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={dialog.open} onOpenChange={setIsOpen}>
            {/* {dialog.open && ( */}
            <form id="form" onSubmit={handleSubmit}>
                <DialogContent className="md:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="pb-4">
                            {!dialog.data
                                ? "Catat Transaksi Baru"
                                : "Edit Transaksi"}
                        </DialogTitle>
                        <DialogDescription
                            aria-describedby={undefined}></DialogDescription>
                    </DialogHeader>

                    <Field data-invalid={Boolean(errors.name)}>
                        <FieldLabel htmlFor="name">Nama Kategori</FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.name)}
                            id="name"
                            type="text"
                            placeholder="Masukan nama kategori"
                            value={data.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />
                        {errors.name && (
                            <FieldError>{errors.name[0]}</FieldError>
                        )}
                    </Field>

                    <Field data-invalid={Boolean(errors.type)}>
                        <Label htmlFor="type">Tipe Kategori</Label>
                        <Select
                            id="type"
                            modal={false}
                            value={data.type}
                            onValueChange={(value) =>
                                handleChange("type", value)
                            }>
                            <SelectTrigger
                                className="w-full"
                                aria-invalid={Boolean(errors.type)}>
                                <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tipe</SelectLabel>
                                    <SelectItem value="income">
                                        Pendapatan
                                    </SelectItem>
                                    <SelectItem value="expense">
                                        Pengeluaran
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.type && (
                            <FieldError>{errors.type[0]}</FieldError>
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

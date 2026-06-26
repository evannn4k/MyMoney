import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { Spinner } from "@/components/ui/spinner";
import Swal from "sweetalert2";
import CardWallet from "@/components/wallet/card-wallet";
import { toast } from "sonner";

export default function Wallet() {
    const [wallets, setWallets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [id, setId] = useState(0);

    const initialWallet = {
        name: "",
        saldo: null,
    };

    const [errors, setErrors] = useState(initialWallet);
    const [wallet, setWallet] = useState(initialWallet);

    const fetchWallet = async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/api/wallet");
            setWallets(response.data.data);
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
    };

    useEffect(() => {
        fetchWallet();
    }, []);

    const handleChange = (e) => {
        setWallet((item) => {
            return {
                ...item,
                [e.target.id]: e.target.value,
            };
        });
    };

    const handeleSubmit = async (e) => {
        setIsWaiting(true);
        e.preventDefault();

        try {
            if (isEditing === true) {
                const response = await api.put("/api/wallet/" + id, wallet);

                Swal.fire({
                    title: "Berhasil!",
                    text: response.data.message,
                    icon: response.data.status,
                });
            } else {
                const response = await api.post("/api/wallet", wallet);

                Swal.fire({
                    title: "Berhasil!",
                    text: response.data.message,
                    icon: response.data.status,
                });
            }

            setOpen(false);
            setIsEditing(false);
            setWallet(initialWallet);
            fetchWallet();
        } catch (e) {
            const errorData = e.response.data;
            if (typeof errorData.errors === "object") {
                toast.error("Gagal, silahkan coba lagi!");
            } else {
                toast.error(errorData.errors);
            }

            setErrors(errorData.errors);
        } finally {
            setIsWaiting(false);
        }
    };

    const handleDelete = async (e) => {
        try {
            const response = await api.delete("/api/wallet/" + id);
            Swal.fire({
                title: "Berhasil!",
                text: response.data.message,
                icon: response.data.status,
            });
            fetchWallet();
        } catch (e) {
            const errorData = e.response.data;
            if (typeof errorData.errors === "object") {
                toast.error("Gagal, silahkan coba lagi!");
            } else {
                toast.error(errorData.errors);
            }

            setErrors(errorData.errors);
        }
    };

    return (
        <>
            <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <FontAwesomeIcon icon={faTrash} />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Hapus Dompet?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ini akan menghapus dompet ini secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={handleDelete}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handeleSubmit}>
                        <DialogHeader className="pb-6">
                            <DialogTitle className="font-semibold text-lg">
                                {isEditing ? "Edit dompet" : "Tambah dompet"}
                            </DialogTitle>
                            <DialogDescription
                                aria-describedby={
                                    undefined
                                }></DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="pb-4">
                            <Field data-invalid={Boolean(errors.name)}>
                                <Label htmlFor="name">Nama dompet</Label>
                                <Input
                                    aria-invalid={Boolean(errors.name)}
                                    id="name"
                                    onChange={handleChange}
                                    value={wallet.name ?? ""}
                                />
                                {errors.name && (
                                    <FieldDescription>
                                        {errors.name[0]}
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field data-invalid={Boolean(errors.balance)}>
                                <Label htmlFor="balance">Saldo</Label>
                                <Input
                                    aria-invalid={Boolean(errors.balance)}
                                    id="balance"
                                    value={wallet.balance ?? 0}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {errors.balance && (
                                    <FieldDescription>
                                        {errors.balance[0]}
                                    </FieldDescription>
                                )}
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    onClick={() => setOpen(false)}
                                    variant="outline">
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isWaiting}>
                                {isWaiting && <Spinner className="size-4" />}
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="flex flex-col gap-4">
                <div className="w-full flex justify-between">
                    <Field className="max-w-sm bg-white">
                        <InputGroup>
                            <InputGroupInput
                                id="search"
                                placeholder="Search..."
                            />
                            <InputGroupAddon align="inline-start">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Button
                        className="bg-brand-600 hover:bg-brand-700"
                        onClick={() => {
                            setOpen(true);
                            setErrors({});
                        }}>
                        <FontAwesomeIcon icon={faPlus} /> Tambah
                    </Button>
                </div>
                <Separator />
                {isLoading ? (
                    <div className="w-full py-12 flex justify-center">
                        <Spinner className="size-8" />
                    </div>
                ) : (
                    <CardWallet
                        wallets={wallets}
                        setOpenDelete={setOpenDelete}
                        setId={setId}
                        setIsEditing={setIsEditing}
                        setWallet={setWallet}
                        setOpen={setOpen}
                        setErrors={setErrors}
                    />
                )}
            </div>
        </>
    );
}

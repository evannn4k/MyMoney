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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontalIcon } from "lucide-react";
import FormatRupiah from "@/utils/idr-format";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";

export default function TableCategory({
    categories,
    setDialog,
    loading,
    fetchCategory,
}) {
    const [alert, setAlert] = useState({ open: false, id: null });

    const handleDelete = async () => {
        try {
            const response = await api.delete("/api/category/" + alert.id);

            toast.success(response.data.message, {
                position: "top-right",
            });
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
            setAlert({ open: false, id: null });
        }
    };

    return (
        <>
            <AlertDialog
                open={alert.open}
                onOpenChange={(open) => setAlert({ open: open })}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <FontAwesomeIcon icon={faTrash} />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Hapus Kategori?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ini akan menghapus data kategori secara permanen
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="text-center">No</TableHead>
                            <TableHead>Nama Kategori</TableHead>
                            <TableHead>Tipe</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <>
                                <TableRow>
                                    <TableCell colSpan="5">
                                        <div className="w-full flex justify-center p-4">
                                            <Spinner className="size-6" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </>
                        ) : (
                            categories.map((category, i) => {
                                return (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium text-center">
                                            {i + 1}.
                                        </TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            {category.type == "income" ? (
                                                <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                                    Pendapatan
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                                                    Pengeluaran
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8">
                                                        <MoreHorizontalIcon />
                                                        <span className="sr-only">
                                                            Open menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            setDialog({
                                                                open: true,
                                                                edit: true,
                                                                data: category,
                                                            })
                                                        }>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Detail
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() => {
                                                            setAlert({
                                                                open: true,
                                                                id: category.id,
                                                            });
                                                        }}>
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

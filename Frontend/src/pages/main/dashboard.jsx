import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import api from "@/services/api";
import FormatRupiah from "@/utils/idr-format";
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
import { Separator } from "@/components/ui/separator";

export default function dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        totalBalance: 0,
        monthlyExpenses: 0,
        monthlyIncome: 0,
        lastTenTransactions: [],
    });

    const fetchData = async () => {
        try {
            const response = await api.get("/api/dashboard");

            setData(response.data.data);
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-4 md:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Total Saldo</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {FormatRupiah(data.totalBalance)}
                            </CardTitle>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Total saldo seluruh dompet
                            </div>
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>
                                Pengeluaran Bulan Ini
                            </CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {FormatRupiah(data.monthlyExpenses)}
                            </CardTitle>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Diambil dari transaksi satu bulan terakhir
                            </div>
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>
                                Pendapatan Bulan Ini
                            </CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {FormatRupiah(data.monthlyIncome)}
                            </CardTitle>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Diambil dari transaksi satu bulan terakhir
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <Separator />
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg leading-none font-semibold">
                        10 transaksi terakhir anda
                    </h2>
                    <div className="w-full g-white rounded-xl border-2 border-gray-200 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="text-center">
                                        No
                                    </TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Catatan</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Dompet</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Tipe</TableHead>
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
                                    data.lastTenTransactions.map(
                                        (transaction, i) => {
                                            return (
                                                <TableRow key={transaction.id}>
                                                    <TableCell className="font-medium text-center">
                                                        {i + 1}.
                                                    </TableCell>
                                                    <TableCell className="font-semibold">
                                                        {FormatRupiah(
                                                            transaction.amount,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {transaction.notes}
                                                    </TableCell>
                                                    <TableCell>
                                                        {transaction.date}
                                                    </TableCell>
                                                    <TableCell>
                                                        {transaction.wallet}
                                                    </TableCell>
                                                    <TableCell>
                                                        {transaction.category}
                                                    </TableCell>
                                                    <TableCell>
                                                        {transaction.category_type ==
                                                        "income" ? (
                                                            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                                                Pendapatan
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                                                                Pengeluaran
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        },
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}

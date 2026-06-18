import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CardWallet({
    wallets,
    setOpenDelete,
    setId,
    setIsEditing,
    setWallet,
    setOpen,
    setErrors,
}) {
    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
                {wallets.map((wallet) => (
                    <div className="" key={wallet.id}>
                        <Card size="lg" className="mx-auto w-full max-w-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {wallet.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl  font-bold">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(wallet.balance)}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <div className="w-full flex gap-2">
                                    <Button
                                        size="sm"
                                        className="flex-1 bg-brand-600 hover:brand-700">
                                        Detail
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => {
                                                setErrors({});
                                                setOpen(true);
                                                setIsEditing(true);
                                                setId(wallet.id);
                                                setWallet({
                                                    name: wallet.name,
                                                    balance: wallet.balance,
                                                });
                                            }}
                                            variant="outline"
                                            size="sm">
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                            />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDelete(true);
                                                setId(wallet.id);
                                            }}
                                            size="sm"
                                            className="bg-red-600 hover:bg-red-700">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}

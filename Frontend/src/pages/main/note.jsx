import TableNote from "@/components/note/table-note";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/services/api";
import Search from "@/components/note/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormDialog from "@/components/note/form-dialog";

export default function Note() {
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [dialog, setDialog] = useState({
        open: false,
        edit: false,
        data: null,
    });

    const fetchNote = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/transaction/");
            setTransactions(response.data.data);
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
        fetchNote();
    }, []);

    const display = transactions.filter((item) => {
        const notes = item.notes ? item.notes.toLowerCase() : "";
        return notes.includes(searchQuery.toLowerCase());
    });
    // const display = transactions;

    return (
        <>
            <FormDialog
                fetchNote={fetchNote}
                dialog={dialog}
                setIsOpen={(e) => {
                    setDialog({ open: e, data: null });
                }}
            />
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                    <Search setSearchQuery={setSearchQuery} />
                    <Button
                        variant="outline"
                        onClick={() =>
                            setDialog({ open: true, edit: false, data: null })
                        }>
                        <FontAwesomeIcon icon={faPlus} />
                        Tambah Catatan
                    </Button>
                </div>
                <TableNote
                    fetchNote={fetchNote}
                    transactions={display}
                    setDialog={setDialog}
                    loading={loading}
                />
            </div>
        </>
    );
}

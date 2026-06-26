import TableCategory from "@/components/category/table-category";
import Search from "@/components/category/search";
import FormDialog from "@/components/category/form-category";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Category() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [dialog, setDialog] = useState({
        open: false,
        edit: false,
        data: null,
    });

    const fetchCategory = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/category/");
            setCategories(response.data.data);
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
        fetchCategory();
    }, []);

    const display = categories.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <>
            <FormDialog
                fetchCategory={fetchCategory}
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
                        Tambah Category
                    </Button>
                </div>

                <TableCategory
                    fetchCategory={fetchCategory}
                    categories={display}
                    setDialog={setDialog}
                    loading={loading}
                />
            </div>
        </>
    );
}

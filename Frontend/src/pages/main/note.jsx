import TableNote from "@/components/note/table-note";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
    InputGroupAddon,
    InputGroupInput,
    InputGroup,
} from "@/components/ui/input-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import api from "@/services/api";

export default function Note() {
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const fetchNote = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/transaction/");
            console.log(response.data.data);
            setTransactions(response.data.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNote();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
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
                    <Button variant="outline">Test aja inima</Button>
                </div>
                <TableNote transactions={transactions}/>
            </div>
        </>
    );
}

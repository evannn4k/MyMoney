import { useEffect, useState } from "react";
import { Field } from "@/components/ui/field";

import {
    InputGroupAddon,
    InputGroupInput,
    InputGroup,
} from "@/components/ui/input-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search({ setSearchQuery }) {
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Field className="max-w-sm bg-white">
            <InputGroup>
                <InputGroupInput
                    id="search"
                    onChange={handleChange}
                    placeholder="Search..."
                />
                <InputGroupAddon align="inline-start">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputGroupAddon>
            </InputGroup>
        </Field>
    );
}

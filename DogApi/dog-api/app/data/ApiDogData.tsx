import axios from "axios";
import { useState } from "react";

export function ApiDogData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    axios.get("https://dog.ceo/api/breeds/list/all")
        .then(response => {
            setData(response.data.message);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })
        .finally(() => {
            setLoading(false);
        });

    return { data, loading, error };
}
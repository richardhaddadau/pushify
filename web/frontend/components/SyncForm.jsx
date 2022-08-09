import { useState, useCallback } from "react";

const SyncForm = ({ Job: InitialJob }) => {
    // States
    const [job, setJob] = useState(InitialJob);

    // Temporary save function
    const onSubmit = (body) => console.log("submit", body);

    const {
        fields: {
            title,
            boardID,
            listID,
            fromOrder,
        },
        dirty,
        reset,
        submit,
        submitting,
        makeClean,
    }
};

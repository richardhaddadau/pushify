import { useState, useCallback } from "react";
import {
    Stack,
    Layout,
    Card,
    Form,
    FormLayout,
    TextField,
    Button,
    Select,
} from "@shopify/polaris";
import { notEmptyString, useField, useForm } from "@shopify/react-form";
import {
    ContextualSaveBar,
    ResourcePicker,
    useAppBridge,
    useNavigate,
} from "@shopify/app-bridge-react";

const SyncForm = ({ syncJob: InitialJob }) => {
    // States
    const [syncJob, setSyncJob] = useState(InitialJob);
    const [showResourcePicker, setShowResourcePicker] = useState(false);
    const [selectBoard, setSelectBoard] = useState(syncJob?.boardID);
    const [selectList, setSelectList] = useState(syncJob?.listId);
    const [selectOrder, setSelectOrder] = useState(syncJob?.fromOrder);
    const navigate = useNavigate();

    // Placeholder function. Will be replaced by the save function
    const onSubmit = (body) => console.log("submit", body);

    // Set up form state
    const {
        fields: { title, boardID, listID, fromOrder },
        dirty,
        reset,
        submit,
        submitting,
        makeClean,
    } = useForm({
        fields: {
            title: useField({
                value: syncJob?.title || "",
                validates: [notEmptyString("Please name your sync job")],
            }),
            boardID: useField(syncJob?.boardID || ""),
            listId: useField(syncJob?.listId || ""),
            fromOrder: useField(syncJob?.fromOrder),
        },
        onSubmit,
    });

    const handleBoardChange = useCallback((selection) => {
        setSelectBoard(selection);
        console.log(selection);
        // boardID.onChange(selection);
    }, []);

    const handleListChange = useCallback((selection) => {
        setSelectList(selection);
        console.log(selection);
        // boardID.onChange(selection);
    }, []);

    const handleOrderChange = useCallback((selection) => {
        setSelectOrder(selection);
        console.log(selection);
        // boardID.onChange(selection);
    }, []);

    const toggleResourcePicker = useCallback(
        ({ type }) => {
            setShowResourcePicker(!showResourcePicker);
            console.log(type);
        },
        [showResourcePicker]
    );

    // Placeholder processes for deleting a sync job
    const isDeleting = false;
    const deleteSyncJob = () => console.log("delete");

    // Form Layout using Polaris and App Bridge
    return (
        <Stack vertical>
            <Layout>
                <Layout.Section>
                    <Form>
                        <ContextualSaveBar
                            saveAction={{
                                label: "Save",
                                onAction: submit,
                                loading: submitting,
                                disabled: submitting,
                            }}
                            discardAction={{
                                label: "Discard",
                                onAction: reset,
                                loading: submitting,
                                disabled: submitting,
                            }}
                            visible={dirty}
                            fullWidth
                        />
                        <FormLayout>
                            <Card sectioned title="Job Title">
                                <TextField
                                    {...title}
                                    label="Title"
                                    helpText="Pick a unique title to differentiate from other jobs"
                                    labelHidden
                                />
                            </Card>
                            <Card
                                sectioned
                                title="Board"
                                actions={[
                                    {
                                        content: boardID
                                            ? "Change board"
                                            : "Select board",
                                        onAction: toggleResourcePicker("board"),
                                    },
                                ]}
                            >
                                <Card.Section></Card.Section>
                            </Card>
                        </FormLayout>
                    </Form>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned title="QR code">
                        <Stack vertical>
                            <Button fullWidth primary>
                                Run Sync
                            </Button>
                        </Stack>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Button
                        outline
                        destructive
                        onClick={deleteSyncJob}
                        loading={isDeleting}
                    >
                        Delete Job
                    </Button>
                </Layout.Section>
            </Layout>
        </Stack>
    );
};

export { SyncForm };

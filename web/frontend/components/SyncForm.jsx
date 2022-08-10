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
    TextStyle,
} from "@shopify/polaris";
import { notEmptyString, useField, useForm } from "@shopify/react-form";
import { ContextualSaveBar, useNavigate } from "@shopify/app-bridge-react";

const SyncForm = ({ syncJob: InitialJob }) => {
    // States
    const [syncJob, setSyncJob] = useState(InitialJob);
    const [showResourcePicker, setShowResourcePicker] = useState(false);
    const [selectBoard, setSelectBoard] = useState(syncJob?.trelloBoard);
    const [selectList, setSelectList] = useState(syncJob?.trelloList);
    const [selectOrder, setSelectOrder] = useState(syncJob?.trelloOrder);
    const navigate = useNavigate();

    // Placeholder function. Will be replaced by the save function
    const onSubmit = (body) => console.log("submit", body);

    // Set up form state
    const {
        fields: { title, boardId, listId, fromOrder },
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
            boardId: useField({ value: syncJob?.trelloBoard?.id || "" }),
            listId: useField({ value: syncJob?.trelloList?.id || "" }),
            fromOrder: useField({ value: syncJob?.trelloOrder?.id }),
        },
        onSubmit,
    });

    const handleBoardChange = useCallback(({ selection }) => {
        setSelectBoard(selection);
        console.log(selection);
        boardId.onChange(selection[0].id);
    }, []);

    const handleListChange = useCallback((selection) => {
        setSelectList(selection);
        console.log(selection);
        boardId.onChange(selection[0].id);
    }, []);

    const handleOrderChange = useCallback((selection) => {
        setSelectOrder(selection);
        console.log(selection);
        fromOrder.onChange(selection[0].id);
    }, []);

    const toggleResourcePicker = useCallback(
        (resourceType) => {
            setShowResourcePicker(!showResourcePicker);
            console.log(resourceType);
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
                                    labelHidden
                                    helpText="Pick a unique title to differentiate from other jobs"
                                />
                            </Card>
                            <Card
                                title="Board"
                                actions={[
                                    {
                                        content: boardId
                                            ? "Change board"
                                            : "Select board",
                                        onAction: () =>
                                            toggleResourcePicker("board"),
                                    },
                                ]}
                            >
                                <Card.Section>
                                    <TextStyle variation="strong">
                                        {selectBoard}
                                    </TextStyle>
                                </Card.Section>
                            </Card>

                            <Card
                                title="List"
                                actions={[
                                    {
                                        content: listId
                                            ? "Change list"
                                            : "Select list",
                                        onAction: () =>
                                            toggleResourcePicker("list"),
                                    },
                                ]}
                            >
                                <Card.Section>
                                    <TextStyle variation="strong">
                                        {selectList}
                                    </TextStyle>
                                </Card.Section>
                            </Card>

                            <Card
                                title="Order"
                                actions={[
                                    {
                                        content: fromOrder
                                            ? "Change order"
                                            : "Select order",
                                        onAction: () =>
                                            toggleResourcePicker("order"),
                                    },
                                ]}
                            >
                                <Card.Section>
                                    <TextStyle variation="strong">
                                        {selectOrder}
                                    </TextStyle>
                                </Card.Section>
                            </Card>
                        </FormLayout>
                    </Form>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned title="Manual Sync">
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

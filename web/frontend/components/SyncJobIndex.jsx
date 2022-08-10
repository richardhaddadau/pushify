import { useNavigate } from "@shopify/app-bridge-react";
import {
    Stack,
    Card,
    IndexTable,
    UnstyledLink,
    Icon,
    TextStyle,
} from "@shopify/polaris";
import { DiamondAlertMajor, ImageMajor } from "@shopify/polaris-icons";

// Add support for multiple screen sizes
import { useMedia } from "@shopify/react-hooks";

// Import dayjs
import dayjs from "dayjs";

// Markup for small screens (mobile)
const SmallScreenCard = ({ id, title, board, list, order, createdAt }) => {
    return (
        <UnstyledLink onClick={() => navigate(`/jobs/${id}`)}>
            <div
                style={{
                    padding: "0.75rem 1rem",
                    borderBottom: "1px solid #212121",
                }}
            >
                <Stack>
                    <Stack.Item fill>
                        <Stack vertical={true}>
                            <Stack.Item>
                                <p>
                                    <TextStyle variation="strong">
                                        {truncate(title, 35)}
                                    </TextStyle>
                                </p>
                                <p>{dayjs(createdAt).format("D MMMM, YYYY")}</p>
                            </Stack.Item>
                            <div style={{ display: "flex" }}>
                                <div style={{ flex: "3" }}>
                                    <TextStyle variation="subdued">
                                        Board
                                    </TextStyle>
                                    <p>{board}</p>
                                </div>

                                <div style={{ flex: "3" }}>
                                    <TextStyle variation="subdued">
                                        List
                                    </TextStyle>
                                    <p>{list}</p>
                                </div>

                                <div style={{ flex: "2" }}>
                                    <TextStyle variation="subdued">
                                        Order
                                    </TextStyle>
                                    <p>{board}</p>
                                </div>
                            </div>
                        </Stack>
                    </Stack.Item>
                </Stack>
            </div>
        </UnstyledLink>
    );
};

export const SyncJobIndex = ({ SyncJobs, loading }) => {
    const navigate = useNavigate();

    // Check screen size
    const isSmallScreen = useMedia("(max-width: 640px)");

    // Map over Sync Jobs for small screens
    const smallScreenMarkup = SyncJobs.map((SyncJob) => {
        <SmallScreenCard key={SyncJob.id} navigate={navigate} {...SyncJob} />;
    });

    const jobName = {
        singular: "Sync Job",
        plural: "Sync Jobs",
    };

    const rowMarkup = SyncJobs.map(
        ({ id, title, boardId, listId, fromOrder, createdAt }, index) => {
            return (
                <IndexTable.Row
                    id={id}
                    key={id}
                    position={index}
                    onClick={() => {
                        navigate(`/jobs/${id}`);
                    }}
                >
                    <IndexTable.Cell>
                        <UnstyledLink data-primary-link url={`/jobs/${id}`}>
                            {truncate(title, 25)}
                        </UnstyledLink>
                    </IndexTable.Cell>

                    <IndexTable.Cell>
                        <Stack>{boardId}</Stack>
                    </IndexTable.Cell>

                    <IndexTable.Cell>
                        <Stack>{listId}</Stack>
                    </IndexTable.Cell>

                    <IndexTable.Cell>
                        <Stack>{fromOrder}</Stack>
                    </IndexTable.Cell>

                    <IndexTable.Cell>
                        <Stack>{dayjs(createdAt).format("D MMMM, YYYY")}</Stack>
                    </IndexTable.Cell>
                </IndexTable.Row>
            );
        }
    );

    // Layout for Small Screens
    return (
        <Card>
            {isSmallScreen ? (
                smallScreenMarkup
            ) : (
                <IndexTable
                    resourceName={jobName}
                    itemCount={SyncJobs.length}
                    headings={[
                        { title: "Job Title" },
                        { title: "Board" },
                        { title: "List" },
                        { title: "Order" },
                        { title: "Date Created" },
                    ]}
                    selectable={false}
                    loading={loading}
                >
                    {rowMarkup}
                </IndexTable>
            )}
        </Card>
    );
};

const truncate = (value, n) => {
    return value.length > n ? value.substring(0, n - 1) + "..." : value;
};

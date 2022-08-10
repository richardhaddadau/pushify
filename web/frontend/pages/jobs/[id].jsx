import { Page, Layout, Card, SkeletonBodyText } from "@shopify/polaris";
import { Loading, TitleBar } from "@shopify/app-bridge-react";
import { SyncForm } from "../../components/index.js";

const SyncJobEdit = () => {
    const breadcrumbs = [{ content: "Sync Jobs", url: "/" }];

    // Loading and refreshing
    const isLoading = false;
    const isRefreshing = false;
    const syncJob = {
        title: "Typical",
        boardId: 0,
        listId: 0,
        fromOrder: 200,
    };

    // Markup while loading or refreshing
    if (isLoading || isRefreshing) {
        return (
            <Page>
                <TitleBar
                    title="Edit Sync Job"
                    breadcrumbs={breadcrumbs}
                    primaryAction={null}
                />
                <Loading />
                <Layout>
                    <Layout.Section>
                        <Card sectioned title="Job Title">
                            <SkeletonBodyText />
                        </Card>

                        <Card title="Trello Board">
                            <Card.Section>
                                <SkeletonBodyText lines={1} />
                            </Card.Section>
                        </Card>

                        <Card title="Trello Board">
                            <Card.Section>
                                <SkeletonBodyText lines={1} />
                            </Card.Section>
                        </Card>

                        <Card title="Order">
                            <Card.Section>
                                <SkeletonBodyText lines={1} />
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section secondary>
                        <Card sectioned title="Manual Sync" />
                    </Layout.Section>
                </Layout>
            </Page>
        );
    }

    return (
        <Page>
            <TitleBar
                title="Edit Sync Job"
                breadcrumbs={breadcrumbs}
                primaryAction={null}
            />
            <SyncForm syncJob={syncJob} />
        </Page>
    );
};

export default SyncJobEdit;

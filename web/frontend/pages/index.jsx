import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
    Card,
    EmptyState,
    Layout,
    Page,
    TextContainer,
    Image,
    Stack,
    Link,
    Heading,
    SkeletonBodyText,
} from "@shopify/polaris";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
    // Navigation Hook
    const navigate = useNavigate();

    // Mock Values
    const isLoading = false;
    const isReloading = false;
    const syncJobs = [];

    const loadingMarkup = isLoading ? (
        <Card sectioned>
            <Loading />
            <SkeletonBodyText />
        </Card>
    ) : null;

    const emptyStateMarkup =
        !isLoading && !syncJobs?.length ? (
            <Card sectioned>
                <EmptyState
                    heading="Set up new syncing jobs"
                    action={{
                        content: "Create new job",
                        onAction: () => navigate("/jobs/new"),
                    }}
                    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                    <p>
                        Save syncing jobs with preset settings for quicker
                        processing.
                    </p>
                </EmptyState>
            </Card>
        ) : null;

    return (
        <Page narrowWidth>
            <TitleBar
                title="Pushify"
                primaryAction={{
                    content: "Create new job",
                    onAction: () => navigate("/jobs/new"),
                }}
            />
            <Layout>
                <Layout.Section>
                    {loadingMarkup}
                    {emptyStateMarkup}
                </Layout.Section>
            </Layout>
        </Page>
    );
}

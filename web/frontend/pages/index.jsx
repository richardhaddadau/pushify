import { useEffect, useState } from "react";
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
    Button,
} from "@shopify/polaris";
import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { search } from "@shopify/app-bridge/actions/Picker/index.js";

export default function HomePage() {
    // States
    const [externalLogin, setExternalLogin] = useState(null);

    // Navigation Hooks
    const navigate = useNavigate();

    // Trello Login Popup
    const handleLogin = (e) => {
        const popupWidth = 700;
        const popupHeight = 700;
        const popupLeft = window.screenX + (window.outerWidth - popupWidth) / 2;
        const popupTop =
            window.screenY + (window, outerHeight - popupHeight) / 2.5;
        const popupTitle = "Trello Login";
        const popupUrl = "https://trello.com/1/authorize";
        const popup = window.open(
            popupUrl,
            popupTitle,
            `width=${popupWidth}, height=${popupHeight}, left=${popupLeft}, top=${popupTop}`
        );
        setExternalLogin(popup);
    };

    useEffect(() => {
        if (!externalLogin) return;

        const timer = setInterval(() => {
            if (!externalLogin) {
                timer && clearInterval(timer);
                return;
            }

            const currentUrl = externalLogin.location.href;
            if (!currentUrl) return;

            const searchParams = new URL(currentUrl).searchParams;
            const code = searchParams.get("code");

            if (code) {
                externalLogin.close();
                console.log(`The popup URL has URL code param = ${code}`);
                YourApi.endpoint(code)
                    .then(() => {
                        // accept code
                    })
                    .catch((err) => {
                        // API Error
                    })
                    .finally(() => {
                        // clear timer at the end
                        setExternalLogin(null);
                        timer && clearInterval(timer);
                    });
            }
        }, 500);
    }, [externalLogin]);

    // Mock Values
    const isLoading = false;
    const isReloading = false;
    const trelloToken = false;
    const syncJobs = [];

    const loadingMarkup = isLoading ? (
        <Card sectioned>
            <Loading />
            <SkeletonBodyText />
        </Card>
    ) : null;

    const trelloMarkup = (
        <Card sectioned>
            {trelloToken ? null : (
                <Button primary onClick={handleLogin}>
                    Connect Trello
                </Button>
            )}
        </Card>
    );

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
                    {trelloMarkup}
                    {emptyStateMarkup}
                </Layout.Section>
            </Layout>
        </Page>
    );
}

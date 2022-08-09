import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

const ManageJob = () => {
    const breadcrumbs = [{ content: "Jobs", url: "/" }];

    return (
        <Page>
            <TitleBar
                title="Create new sync job"
                breadcrumbs={breadcrumbs}
                primaryAction={null}
            />
        </Page>
    );
};

export default ManageJob;

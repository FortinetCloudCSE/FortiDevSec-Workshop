---
title: "JIRA Setup"
chapter: true
weight: 4
---

#### Set Up a JIRA Bug Tracking Project

For this task, you will create a project in JIRA and sync it with your FortiDevSec application.

* Navigate to the JIRA [website](https://id.atlassian.com/login) and log in to your JIRA account. Click the **Projects** dropdown, and click **Create project**.

    ![jira-main-page](/images/jira-main-page.png)

* Select the **Software development** project template.

    ![jira-bug-tracking](/images/jira-bug-tracking.png)

* Click **Bug tracking**.

    ![choose-bug-tracking](/images/choose-bug-tracking.png)

* Click **Use template**.

    ![jira-bug-tracking-2](/images/jira-bug-tracking-2.png)

* Create a name and key for your project, and click **Create project**.

    ![jira-add-proj-det](/images/jira-add-proj-det.png)

* In order to integrate FortiDevSec in future steps, we'll need to create an API key. Click the settings icon, and click **Atlassian account settings**.

    ![jira-settings-icon](/images/jira-settings-icon.png)

* Click **Security** on the left-hand sidebar, and click **Create and manage API tokens**.

    ![jira-create-tokens](/images/jira-create-tokens.png)

* Click **Create API token** at the top of the screen, and in the **Create an API token** modal that appears, enter a label for the token.

    ![jira-token-modal](/images/jira-token-modal.png)
    ![jira-token-copy](/images/jira-token-copy.png)

* ***BEFORE closing the modal***, click the 'eye' icon and copy the API token to a safe place so it can be retrieved during a future step for FortiDevSec integration.

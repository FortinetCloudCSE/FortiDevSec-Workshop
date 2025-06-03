---
title: "JIRA Setup"
chapter: false
weight: 40
---

### Set Up a JIRA Bug Tracking Project

This task will involve integrating JIRA with FortiDevSec.

First, in a web browser, navigate to [JIRA](https://id.atlassian.com/login) and log in to your account. Click the **Projects** dropdown, and click **Create project**.

![jira-main-page](jira-main-page.png)

Select the **Software development** project template.

![jira-bug-tracking](jira-bug-tracking.png)

Click **Bug tracking**.

![choose-bug-tracking](choose-bug-tracking.png)

Click **Use template**.

![jira-bug-tracking-2](jira-bug-tracking-2.png)

Create a name and key for your project, and click **Create project**.

![jira-add-proj-det](jira-add-proj-det.png)

Now, you'll need to create an API key which we'll later supply to FortiDevSec. Click the settings icon, and click **Atlassian account settings**.

![jira-settings-icon](jira-settings-icon.png)

Click **Security** on the left-hand sidebar, and click **Create and manage API tokens**.

![jira-create-tokens](jira-create-tokens.png)

Click **Create API token** at the top of the screen, and in the **Create an API token** modal that appears, enter a label for the token, and click **Create**.

![jira-token-modal](jira-token-modal.png)

***BEFORE closing the modal***, click the 'eye' icon and copy the API token to a safe place so it can be retrieved during a future step for FortiDevSec integration.

![jira-token-copy](jira-token-copy.png)



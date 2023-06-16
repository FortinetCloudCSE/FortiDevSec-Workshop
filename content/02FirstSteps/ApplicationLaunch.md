---
title: "Application Launch"
chapter: true
weight: 3
---

#### Application Launch

For this task, you will utilize the Github Actions runner created in a previous step to deploy a terraform stack. The stack will contain several resources as part of a vulnerable web application reachable from the public internet. The URL can then be supplied to FortiDevSec to run a DAST scan.

* Before Terraform can deploy resources in your AWS account, it will need credentials to do so. If you've indeed set up your AWS CLI, you can reference the AWS Access Key ID and AWS Secret Access Key for the relevant profile and add it to Github. First, navigate to your forked repo's main Github page, and click the **Settings** tab.

* On the left-hand sidebar, click the **Secrets and variables** dropdown, and click **Actions**.

    ![github-settings-secrets](/images/github-settings-secrets.png)

* Click the green **New repository secret** button.

    ![github-settings-actions-secrets](/images/github-settings-actions-secrets.png)

* Under the **Name** field, type AWS_ACCESS_KEY_ID, and past in the key to the **Secret** field. Ensure it appears exactly as it does in your local AWS credentials file. Click **Add secret**.

    ![access-key-enter](/images/access-key-enter.png)

* Repeat the process for another secret titled **AWS_SECRET_ACCESS_KEY**, and likewise paste in the secret key to the **Secret** field as it appears exactly in your local credentials file.

* Once complete, you should have two repository secrets as in the screenshot below:

    ![github-secrets-done](/images/github-secrets-done.png)

* Now click the **Actions** tab, and click the **Terraform Apply** actions on the left-hand sidebar.

    ![actions-terraform-apply](/images/actions-terraform-apply.png)

* Click the **Run workflow** dropdown on the right-hand side of the page, and ensure the **master** branch and **module-1** are selected in the first and second dropdowns respectively, and click the green **Run workflow** button.

    ![run-workflow-1](/images/run-workflow-1.png)

* You should see the **Terraform Apply** workflow running.

    ![run-workflow-running](/images/run-workflow-running.png)

* You can then click on the workflow run itself, then click on the job:

    ![workflow-job-complete](/images/workflow-job-complete.png)

* You will then see the job steps listed individually. Scroll down and click the **Application URL** dropdown to retrieve the deployed application URL and note it down for use in a later section.

    ![workflow-get-url](/images/workflow-get-url.png)

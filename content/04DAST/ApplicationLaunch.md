---
title: "Application Launch"
chapter: false
weight: 45
---

### Application Launch

For this task, you will deploy a live, web-exposed application via Terraform and GitHub Actions. Several resources will be deployed in your AWS account during launch. After launch completion, a URL will be provided which needs to be supplied to FortiDAST to run a DAST scan.

*As a reminder, to complete this part of the lab, you will need an AWS User Access Key with Administrative permissions Terraform will need to create resources in your account. For more information see the official AWS documentation [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)*.

***Also, please note that you may incur charges to your AWS account during deployment. Please remember to delete all resources after completion of the workshop.***

First, you will need to store your AWS Access Key ID and Secret Access Key as GitHub secrets accessible by your runner. 

In GitHub, navigate to your forked repo settings page.

![goat-fork-settings](goat-fork-settings.png)

On the left-hand sidebar, click the **Secrets and variables** dropdown, and click **Actions**.

![github-settings-secrets](github-settings-secrets.png)

Click the green **New repository secret** button.

![github-settings-actions-secrets](github-settings-actions-secrets.png)

Under the **Name** field, type AWS_ACCESS_KEY, and past in the key to the **Secret** field. Click **Add secret**.

![access-key-enter](access-key-enter.png)

Repeat the process for another secret titled **AWS_SECRET_ACCESS_KEY**, and likewise paste in the secret key to the **Secret** field.

Once complete, you should have two repository secrets as in the screenshot below:

![github-secrets-done](github-secrets-done.png)

Now click the **Actions** tab, and click **Terraform Apply** on the left-hand sidebar.

![actions-terraform-apply](actions-terraform-apply.png)

* Click the **Run workflow** dropdown on the right-hand side of the page, and ensure the **master** branch and **module-1** are selected in the first and second dropdowns respectively, and click the green **Run workflow** button.

    ![run-workflow-1](run-workflow-1.png)

* You should see the **Terraform Apply** workflow running.

    ![run-workflow-running](run-workflow-running.png)

* You can then click on the workflow run itself, then click on the job:

    ![workflow-job-complete](workflow-job-complete.png)

* You will then see the job steps listed individually. Scroll down and click the **Application URL** dropdown to retrieve the deployed application URL.

    ![workflow-get-url](workflow-get-url.png)

* If you paste the URL into a browser, you should see a webpage similar to the one below. Keep the URL handy for use in a later section.

![goat-module1-main](goat-module1-main.png)

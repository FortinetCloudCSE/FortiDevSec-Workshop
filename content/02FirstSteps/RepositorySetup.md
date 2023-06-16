---
title: "App Repository Setup" 
chapter: true
weight: 1
---

#### Set Up the Application Repository

* Navigate to the AWS Goat application [homepage](https://github.com/ine-labs/AWSGoat), and click 'Fork' near the top right of the page.

    ![goat-fork](/images/goat-fork.png)

* Enter a name for your forked version of the repo, make sure the **Copy the master branch only** box is checked, and click **Create fork**.

    ![goat-create-fork](/images/goat-create-fork.png)


* At the github repository homepage for your newly **forked** repository, click the green **Code** dropdown, click the 'HTTPS' tab, and copy the url to the clipboard.

    ![goat-clone-https](/images/goat-clone-https.png)

* From a command line, issue the following commands to clone the repo locally and navigate to the top-level directory:

```sh
git clone <url copied above>
cd AWSGoat
```

* Also, retrieve the needed Github Actions workflows from the tech recipe github-actions directory to your newly forked AWSGoat repository.

```sh
wget https://raw.githubusercontent.com/robreris/fortidevsec-recipe/main/github-actions/main.yml
wget https://raw.githubusercontent.com/robreris/fortidevsec-recipe/main/github-actions/tf-apply-main.yml
wget https://raw.githubusercontent.com/robreris/fortidevsec-recipe/main/github-actions/tf-destroy-main.yml
cp main.yml tf-apply-main.yml tf-destroy.yml .github/workflows
```

* Now, navigate to the local AWSGoat repository and sync the changes with the remote.

```sh
cd ~/AWSGoat
git add -A
git commit -m "adding workflows"
git push
```

* Navigate your browser to FortiDevSec [https://fortidevsec.forticloud.com/](https://fortidevsec.forticloud.com/)

    ![login-splash](/images/login-splash.png)

* Click the login button at the top right of the screen and enter your Fortinet Support login information

    ![login](/images/login.png)

* Once successfully logged in, you are taken to the main FortiDevSec dashboard

    ![login-dashboard](/images/login-dashboard.png)

* Click **New Application** at the top right of the dashboard screen, and the 'New Application' modal will appear.

    ![new-app-click](/images/new-app-click.png)

* Select a name for the application, and click **Next**.

    ![app-setup-name](/images/app-setup-appname.png)

* Specify the risk rating factors. For demo purposes, select **7 - Severe** and **9 - Internet** in the first and second dropdowns respectively, and click **Next**.

    ![app-setup-rr](/images/app-setup-rr.png)

* Ensure **Add Jira Plugin** is not enabled, as in the image below. Click **Next**.

    ![app-setup-jiraskip](/images/app-setup-jiraskip.png)

* Copy the downloaded scanner configuration file title **fdevsec.yaml** to the top level directory of the application that was cloned in an earlier step. The sample command below assumes the fdevsec.yaml file has been downloaded to the local downloads folder inside the home directory and also that the AWSGoat repo has been cloned to the local home directory.

```sh
cp ~/Downloads/fdevsec.yaml ~/AWSGoat
```

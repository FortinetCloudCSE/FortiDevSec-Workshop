---
title: "Github Actions Runner Setup (Optional)"
chapter: false
weight: 30
---

*Note: These instructions walk you through setting up a self-hosted GitHub Actions runner on an AWS EC2 instance in your account. If you'd prefer to use GitHub-hosted runners, which the default included workflow files are already configured to work with, you may skip this section altogether.*

#### GitHub Actions Runner Setup

For this task, you will need to deploy a CloudFormation template which will launch an EC2 instance as a self-hosted Github Actions runner. First, download the template and parameter file:

```sh
cd ~/AWSGoat
wget https://raw.githubusercontent.com/FortinetCloudCSE/FortiDevSec-Workshop/main/cloudformation/github-actions/launch-runner-ec2.yml
wget https://raw.githubusercontent.com/FortinetCloudCSE/FortiDevSec-Workshop/main/cloudformation/github-actions/launch-runner-params.json
```
*General instructions for setting up a runner with these CloudFormation templates may be found [here](https://github.com/rob-40net-test/cft-utility-templates/tree/main/GHA), or you may continue to follow along here.*

In order to deploy the runner, you'll need to fill in several pieces of information in the parameter file *launch-runner-params.json*.

On your forked application Github page, click the 'Settings' tab.

![goat-fork-settings](/images/goat-fork-settings.png)

Click the **Actions** dropdown on the left-hand sidebar, and click **Runners**.

![github-settings](/images/github-settings.png)

Click **New self-hosted runner**

![github-settings-runner](/images/github-settings-runner.png)

Click the **Linux** Runner image option.

![github-settings-runner-2](/images/github-settings-runner-2.png)

Note the **Download** and **Configure** sections beneath it:

![new-runner](/images/new-runner.png)

You will need to copy down several pieces of information in these sections/code blocks.

First, note the *version number* of the actions runner package. This can be found in the **curl** command that is part of the **Download** code block. For example, in the fllowing code block, the package version is **2.300.2**.

```sh
...
# Download the latest runner package
$ curl -o actions-runner-linux-x64-2.300.2.tar.gz -L
...
```

Now find the the *validation hash*. For example, the validation hash in the following code block is **ed5bf2799c1ef7b2dd607df66e6b676dff8c44fb359c6fedc9ebf7db53339f0c**.
```sh
...
# Optional: Validate the hash
$ echo "ed5bf2799c1ef7b2dd607df66e6b676dff8c44fb359c6fedc9ebf7db53339f0c  actions-runner-linux-x64-2.300.2.tar.gz" | shasum -a 256 -c
...
```

Now find the *runner token*. This can be found in the **Configure** block:
```sh
# Create the runner and start the configuration experience
$ ./config.sh --url https://github.com/robreris/AWSGoat --token A4H4MY4TN3TG1THU5ACT10NT0K3N
```
In this block, the token is A4H4MY4TN3TG1THU5ACT10NT0K3N.

The version number, validation hash, and runner token correspond to the "RunnerVersion", "HashCheck", and "GHAToken" parameters in the json below.

In addition to these parameters, you will also need to populate the following information:

* The logical ID of A VPC in your AWS account where the EC2 instance will be deployed (VPCtoUse).
* The name of an EC2 key pair in the same region as this VPC (KeyPair). If you need to create one, please see [here](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/create-key-pairs.html).
* The user/org name (OrgName) and repo name (RepoName) of your **forked** github repository. For example, if your repository is at:
```sh
https://github.com/MyOrg/AWSGoat
```
*The OrgName parameter would be 'MyOrg' and the AppName parameter would be 'AWSGoat'.*

A completed **launch-ec2-params.json** file would then look something like this:
```sh
[
        {
                "ParameterKey": "VPCtoUse",
                "ParameterValue": "vpc-01abcd234efgh"
        },
        {
                "ParameterKey": "GHAToken",
                "ParameterValue": "MY4TN3TG1THU5ACT10NT0K3N"
        },
        {
                "ParameterKey": "KeyPair",
                "ParameterValue": "my-key-pair"
        },
        {
                "ParameterKey": "HashCheck",
                "ParameterValue": "ed5bf2799c1ef7b2dd607df66e6b676dff8c44fb359c6fedc9ebf7db53339f0c"
        },
        {
                "ParameterKey": "OrgName",
                "ParameterValue": "MyOrg"
        },
        {
                "ParameterKey": "RepoName",
                "ParameterValue": "AWSGoat"
        },
        {
                "ParameterKey": "RunnerVersion",
                "ParameterValue": "2.300.2"
        }
]
```
Once you've filled in these values and your command line environment has been configured with AWS credentials (as detailed above), you can deploy the stack. First, ensure local environment variables are set for the AWS Region and your AWS Profile:

```sh
export AWS_DEFAULT_REGION=<your region>
export AWS_PROFILE=<your profile as configured in your local AWS credentials file>
```

Now, you can launch the stack with the following command:

```sh
aws cloudformation create-stack --stack-name <enter a name for your stack here> \
   --template-body file://./cloudformation/launch-ec2-template.yml --parameters file://./cloudformation/launch-ec2-params.json \
   --capabilities CAPABILITY_NAMED_IAM
```

Once the stack has finished deploying, you should see the new runner listed in Github. 

***Please note:** The EC2 instance deployed is configured for command line access via Session Manager. If troubleshooting runner deployment is necessary, [connect via Session Manager](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/session-manager-to-linux.html) and inspect the /var/log/cloud-init-output.log file for errors.*

![runner-deployed-idle](/images/runner-deployed-idle.png)

Once the runner is successfully deployed, you'll need to change the workflow files in your forked AWSGoat repository:

In **~/AWSGoat/.github/workflows/tf-apply-main.yml**, change line 20 from:

```
   ...
    runs-on: ubuntu-latest 
   ...
```

to:

```
   ...
    runs-on: self-hosted 
   ...
```

In **~/AWSGoat/.github/workflows/tf-destroy-main.yml**, make the same change to line 19.

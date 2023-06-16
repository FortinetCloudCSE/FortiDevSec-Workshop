---
title: "Github Actions Runner Setup"
chapter: true
weight: 2
---

#### GitHub Actions Runner Setup

For this task, you will need to deploy a cloudformation template which will launch an EC2 instance as a self-hosted github actions runner. Download the template and parameter file:

```sh
cd ~/AWSGoat
wget https://raw.githubusercontent.com/rob-40net-test/cft-utility-templates/main/launch-runner-ec2.yml
wget https://raw.githubusercontent.com/rob-40net-test/cft-utility-templates/main/launch-runner-params.json
```

* In order to deploy the runner, you'll need to fill in several pieces of information in the parameter file.

* On your forked application Github page, click the 'Settings' tab.

    ![goat-fork-settings](/images/goat-fork-settings.png)

* Click **Actions** dropdown on the left-hand sidebar, and click **Runners**.

    ![github-settings](/images/github-settings.png)

* Click **New self-hosted runner**

    ![github-settings-runner](/images/github-settings-runner.png)

* Click the **Linux** Runner image option.

    ![github-settings-runner-2](/images/github-settings-runner-2.png)

* Under the **Download** and **Configure** code blocks on this page, you will need to copy down several pieces of information:

    * The version number of the actions runner package. This can be found in the **curl** command in the **Download** code block. For example:
    ```sh
    ...
    # Download the latest runner package
    $ curl -o actions-runner-linux-x64-2.300.2.tar.gz -L
    ...
    ```
    In this code block, the package version is **2.300.2**.

    * The validation hash. For example:
    ```sh
    ...
    # Optional: Validate the hash
    $ echo "ed5bf2799c1ef7b2dd607df66e6b676dff8c44fb359c6fedc9ebf7db53339f0c  actions-runner-linux-x64-2.300.2.tar.gz" | shasum -a 256 -c
    ...
    ```
    The validation hash in the above block is **ed5bf2799c1ef7b2dd607df66e6b676dff8c44fb359c6fedc9ebf7db53339f0c**.

    * The runner token. This can be found in the **Configure** block. For example:
    ```sh
    # Create the runner and start the configuration experience
    $ ./config.sh --url https://github.com/robreris/AWSGoat --token A4H44W32NXYBTIH4722B3STDY4F5M
    ```
    In this block, the token is A4H44W32NXYBTIH4722B3STDY4F5M.

* In addition to these parameters, you will also need to populate the parameters file with the following information:

    * The logical ID of A VPC in your AWS account where the EC2 instance will be deployed.
    * The name of an EC2 key pair in the same region as this VPC. If you need to create one, please see [here](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/create-key-pairs.html).
    * The app name and repo name of your **forked** github repository. For example, if your repository is at:
    ```sh
    https://github.com/my-repo/AWSGoat
    ```
    The RepoName parameter would be 'my-repo' and the AppName parameter would be 'AWSGoat'.

* Once you've filled in the launch-ec2-params.json file with this information, it should look something like this:

```sh
[
        {
                "ParameterKey": "VPCtoUse",
                "ParameterValue": "vpc-01abcd234efgh"
        },
        {
                "ParameterKey": "GHAToken",
                "ParameterValue": "A4H44W32NXYBTIH4722B3STDY4F5M"
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
                "ParameterKey": "AppName",
                "ParameterValue": "AWSGoat"
        },
        {
                "ParameterKey": "RepoName",
                "ParameterValue": "my-repo"
        },
        {
                "ParameterKey": "RunnerVersion",
                "ParameterValue": "2.300.2"
        }
]
```


* Once this file is populated and your command line environment has been configured with AWS credentials (as detailed above), you can deploy the stack. First, ensure local environment variables are set for the AWS Region and your AWS Profile:

```sh
export AWS_DEFAULT_REGION=<your region>
export AWS_PROFILE=<your profile as configured in your local AWS credentials file>
```

* Now, you can launch the stack with the following command:

```sh
aws cloudformation create-stack --stack-name <enter a name for your stack here> \
   --template-body file://./cloudformation/launch-ec2-template.yml --parameters file://./cloudformation/launch-ec2-params.json \
   --capabilities CAPABILITY_NAMED_IAM
```

* Once the stack has finished deploying, you should see the new runner listed in Github. The EC2 instance deployed is configured for command line access via Session Manager. If troubleshooting runner deployment is necessary, connect via Session Manager and inspect the /var/log/cloud-init-output.log file for errors.

    ![runner-deployed-idle](/images/runner-deployed-idle.png)



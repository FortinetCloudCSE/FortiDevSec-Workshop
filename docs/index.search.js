var relearn_search_index=[{content:`Welcome! The realm of application security involves tools and techniques to protect applications from attacks and violations. Due to the huge advancement in hacking techniques and cyber-attack methodologies even modern complex applications contain unassessed security risks and vulnerabilities that may lead to substantial harm to your organization/business. Evaluating the security risks associated with applications and assessing the security weaknesses allows you to mitigate the potential risk to your organization with appropriate remedial measures.
FortiDevSec is a cloud-based automated application security tool that performs intensive and comprehensive scans for an accurate vulnerability assessment of your application.
The purpose of this TEChnical Recipe is to familiarize the learner with FortiDevSec, the various types of vulnerabilities it can help identify and remediate, and the ways in which it may be integrated into DevSecOps pipelines to enable such identification and remediation during and before deployment.
Learning Objectives Set up the Github repository and configure a FortiDevSec application Run a SAST scan locally on the vulnerable application Run a DAST scan locally on the vulnerable application Understand FortiDevSec integration with JIRA `,description:"",tags:null,title:"FortiDevSec Workshop",uri:"/index.html"},{content:`Prerequisites In order to complete this workshop, you will need the following:
Access to a Linux command line with docker as well as the AWS CLI installed and configured. If you are using MacOS, the MacOS Terminal should suffice. If you are using Windows, WSL (Windows Subsystem for Linux) is recommended. For more information including how to set up WSL in your Windows environment, please see here. To run Docker, you will need a Docker Engine installed in your OS. Rancher Desktop is recommended. An AWS account and an AWS Access Key with Administrative Privileges configured for programmatic access. For more information, please see the official AWS Docs. Once you have access to a command line and a valid user access key, you will also need to install and configure the AWS CLI. Please see the official AWS docs for information on doing so. A Fortinet Support account with a FortiDevSec license. For more information on licensing and registration, see here and here. Recommended licenses include:
FC1-10-DEVSC-513-01-12: 1 year FortiDevSec license (standard tier). Includes DAST scannning for 5 individual applications. FC1-10-DEVSC-216-02-12: FortiDAST add-on for FortiDevSec license. Adds capacity for 5 additional applications for FortiDAST scanning. An Attlassian account. For information on Attlassian accounts and how to create one, see here. If you do not have an existing license, you can request a free trial (see next step).
`,description:"",tags:null,title:"Prerequisites",uri:"/01prerequisites.html"},{content:`Obtaining an Atlassian Trial License If you don’t have an existing Atlassian account, head here to sign up for an account. You’ll have to provide an email address and perform a validation check. Once you’ve complete that, you’ll be taken to the following screen.
Scroll down and click New Trial License.
On the next screen, be sure to choose Jira Software from the dropdown. Select the Cloud option.
On the next screen, select any additional products you’d like to add to the trial, and then click Next.
On the next screen, choose a name for your site, and enter it in the box beneath Your site. You’ll use the fqdn shown in the box when you configure FortiDevSec to integrate with JIRA.
Click Agree.
The next screen will begin a series of questions Atlassian will ask to customize your environment according to certain preferences. You may skip this by clicking Skip.
For the purposes of the TEC Recipe, you’ll need to configure a bug-tracking project. Chapter 1 of the recipe will talk you through doing so.
`,description:"",tags:null,title:"Obtaining an Atlassian Trial License",uri:"/01prerequisites/triallicense.html"},{content:`Application Setup and Launch (45 minutes) In this chapter, you’ll fork a GitHub repository containing the code of a popular vulnerable application and clone it locally. You’ll then set up a self-hosted GitHub Actions runner on an EC2 instance in AWS to deploy the app with Terraform. Finally, you’ll configure a new application in the FortiDevSec console and set up a JIRA Bug-tracking project for FortiDevSec integration. This will all be in preparation for the following sections, where you’ll run actual SAST and DAST scans on the application from the command line and examine the results in the FortiDevSec and FortiDAST consoles and in Jira as well.
`,description:"",tags:null,title:"Application Setup and Launch",uri:"/02firststeps.html"},{content:`Set Up the Application Repository Navigate to the AWS Goat application homepage, and click ‘Fork’ near the top right of the page.
Enter a name for your forked version of the repo, make sure the Copy the master branch only box is checked, and click Create fork.
At the github repository homepage for your newly forked repository, click the green Code dropdown, click the ‘HTTPS’ tab, and copy the url to the clipboard.
From a command line, issue the following commands to clone the repo locally and navigate to the top-level directory:
git clone \u003curl copied above\u003e cd AWSGoat Navigate your browser to the FortiDevSec https://fortidevsec.forticloud.com/ console and click the login button at the top right of the screen.
Enter your Fortinet Support credentials.
Once successfully logged in, you are taken to the main FortiDevSec dashboard.
Click New Application at the top right of the dashboard screen, and the ‘New Application’ modal will appear.
Select a name for the application, and click Next.
Specify the risk rating factors. These are based on the OWASP Risk Rating Methodology and are used to adjust the weights on the risk scores for vulnerabilities found in your application based on its exposure and criticality. For our purposes, select 7 - Severe and 9 - Internet in the first and second dropdowns respectively, and click Next.
Ensure Add Jira Plugin is not enabled, as in the image below. Click Next.
Copy the downloaded scanner configuration file title fdevsec.yaml to the top level directory of the application that was cloned in an earlier step. The sample command below assumes the fdevsec.yaml file has been downloaded to the local downloads folder inside the home directory and also that the AWSGoat repo has been cloned to the local home directory.
cp ~/Downloads/fdevsec.yaml ~/AWSGoat `,description:"",tags:null,title:"App Repository Setup",uri:"/02firststeps/repositorysetup.html"},{content:`GitHub Actions Runner Setup For this task, you will need to deploy a CloudFormation template which will launch an EC2 instance as a self-hosted Github Actions runner. First, download the template and parameter file:
cd ~/AWSGoat wget https://raw.githubusercontent.com/FortinetCloudCSE/FortiDevSec-Workshop/main/cloudformation/github-actions/launch-runner-ec2.yml wget https://raw.githubusercontent.com/FortinetCloudCSE/FortiDevSec-Workshop/main/cloudformation/github-actions/launch-runner-params.json General instructions for setting up a runner with these CloudFormation templates may be found here, or you may continue to follow along here.
In order to deploy the runner, you’ll need to fill in several pieces of information in the parameter file launch-runner-params.json.
On your forked application Github page, click the ‘Settings’ tab.
Click the Actions dropdown on the left-hand sidebar, and click Runners.
Click New self-hosted runner
Click the Linux Runner image option.
Note the Download and Configure sections beneath it:
You will need to copy down several pieces of information in these sections/code blocks.
First, note the version number of the actions runner package. This can be found in the curl command that is part of the Download code block. For example, in the fllowing code block, the package version is 2.300.2.
... # Download the latest runner package $ curl -o actions-runner-linux-x64-2.300.2.tar.gz -L ... Now find the the validation hash. For example, the validation hash in the following code block is ed5bf2799c1ef7b2dd607df66e6b676dff8c44fb359c6fedc9ebf7db53339f0c.
... # Optional: Validate the hash $ echo "ed5bf2799c1ef7b2dd607df66e6b676dff8c44fb359c6fedc9ebf7db53339f0c actions-runner-linux-x64-2.300.2.tar.gz" | shasum -a 256 -c ... Now find the runner token. This can be found in the Configure block:
# Create the runner and start the configuration experience $ ./config.sh --url https://github.com/robreris/AWSGoat --token A4H4MY4TN3TG1THU5ACT10NT0K3N In this block, the token is A4H4MY4TN3TG1THU5ACT10NT0K3N.
The version number, validation hash, and runner token correspond to the “RunnerVersion”, “HashCheck”, and “GHAToken” parameters in the json below.
In addition to these parameters, you will also need to populate the following information:
The logical ID of A VPC in your AWS account where the EC2 instance will be deployed (VPCtoUse). The name of an EC2 key pair in the same region as this VPC (KeyPair). If you need to create one, please see here. The user/org name (OrgName) and repo name (RepoName) of your forked github repository. For example, if your repository is at: https://github.com/MyOrg/AWSGoat The OrgName parameter would be ‘MyOrg’ and the AppName parameter would be ‘AWSGoat’.
A completed launch-ec2-params.json file would then look something like this:
[ { "ParameterKey": "VPCtoUse", "ParameterValue": "vpc-01abcd234efgh" }, { "ParameterKey": "GHAToken", "ParameterValue": "MY4TN3TG1THU5ACT10NT0K3N" }, { "ParameterKey": "KeyPair", "ParameterValue": "my-key-pair" }, { "ParameterKey": "HashCheck", "ParameterValue": "ed5bf2799c1ef7b2dd607df66e6b676dff8c44fb359c6fedc9ebf7db53339f0c" }, { "ParameterKey": "OrgName", "ParameterValue": "MyOrg" }, { "ParameterKey": "RepoName", "ParameterValue": "AWSGoat" }, { "ParameterKey": "RunnerVersion", "ParameterValue": "2.300.2" } ] Once you’ve filled in these values and your command line environment has been configured with AWS credentials (as detailed above), you can deploy the stack. First, ensure local environment variables are set for the AWS Region and your AWS Profile:
export AWS_DEFAULT_REGION=\u003cyour region\u003e export AWS_PROFILE=\u003cyour profile as configured in your local AWS credentials file\u003e Now, you can launch the stack with the following command:
aws cloudformation create-stack --stack-name \u003center a name for your stack here\u003e \\ --template-body file://./cloudformation/launch-ec2-template.yml --parameters file://./cloudformation/launch-ec2-params.json \\ --capabilities CAPABILITY_NAMED_IAM Once the stack has finished deploying, you should see the new runner listed in Github.
Please note: The EC2 instance deployed is configured for command line access via Session Manager. If troubleshooting runner deployment is necessary, connect via Session Manager and inspect the /var/log/cloud-init-output.log file for errors.
`,description:"",tags:null,title:"Github Actions Runner Setup",uri:"/02firststeps/githubactions.html"},{content:`Application Launch For this task, you will utilize the Github Actions runner created in a previous step to deploy a Terraform stack. The stack will contain several resources as part of a vulnerable web application reachable from the public internet. The URL can then be supplied to FortiDevSec to run a DAST scan.
As a reminder, to complete this part of the lab, you will need an AWS User Access Key with Administrative permissions Terraform will need to create resources in your account. For more information see the official AWS documentation here.
First, you will need to store your AWS Access Key ID and Secret Access Key as GitHub secrets accessible by your runner.
In GitHub, navigate to your forked repo settings page.
On the left-hand sidebar, click the Secrets and variables dropdown, and click Actions.
Click the green New repository secret button.
Under the Name field, type AWS_ACCESS_KEY, and past in the key to the Secret field. Click Add secret.
Repeat the process for another secret titled AWS_SECRET_ACCESS_KEY, and likewise paste in the secret key to the Secret field.
Once complete, you should have two repository secrets as in the screenshot below:
Now click the Actions tab, and click Terraform Apply on the left-hand sidebar.
Click the Run workflow dropdown on the right-hand side of the page, and ensure the master branch and module-1 are selected in the first and second dropdowns respectively, and click the green Run workflow button.
You should see the Terraform Apply workflow running.
You can then click on the workflow run itself, then click on the job:
You will then see the job steps listed individually. Scroll down and click the Application URL dropdown to retrieve the deployed application URL.
If you paste the URL into a browser, you should see a webpage similar to the one below. Keep the URL handy for use in a later section.
`,description:"",tags:null,title:"Application Launch",uri:"/02firststeps/applicationlaunch.html"},{content:`Set Up a JIRA Bug Tracking Project This task will involve integrating JIRA with FortiDevSec.
First, in a web browser, navigate to JIRA and log in to your account. Click the Projects dropdown, and click Create project.
Select the Software development project template.
Click Bug tracking.
Click Use template.
Create a name and key for your project, and click Create project.
Now, you’ll need to create an API key which we’ll later supply to FortiDevSec. Click the settings icon, and click Atlassian account settings.
Click Security on the left-hand sidebar, and click Create and manage API tokens.
Click Create API token at the top of the screen, and in the Create an API token modal that appears, enter a label for the token, and click Create.
BEFORE closing the modal, click the ’eye’ icon and copy the API token to a safe place so it can be retrieved during a future step for FortiDevSec integration.
`,description:"",tags:null,title:"JIRA Setup",uri:"/02firststeps/setupjira.html"},{content:`Discussion FortiDevSec provides diverse scanning capabilities and can integrate with a broad swath of CI/CD tools, including Jenkins, AWS CodePipeline, and Github Actions, amongst others. It enables quick identification and ranking of vulnerabilities across a heterogenous codebase that may include application, infrastructure, and container code and third-party libraries. It provides insights in a consolodiated dashboard, and integrates seamlessly with JIRA issue-tracking software. Types of testing supported by FortiDevSec include SAST, SCA, Secrets, DAST, IaC, and container. All that is needed is a running Docker installation and the fdevsec.yaml configuration file copied to the top level of the codebase repository and configured as desired.
For more information, review the following:
FortiDevSec User Guide Atlassian DevSecOps and Tooling Summary Questions to consider: Has your organization formalized it’s DevOps processes, especially with regards to security? What types of security testing does your organization currently implement? Have you integrated automated security testing of any kind into your current CICD processes/pipelines? How often are application deployments conducted? Is there a need for rapid deployments with a focus on security? How does your organization currently track and remediate vulnerabilities associated with public Docker images and/or third-party libraries integrated into your software? `,description:"",tags:null,title:"Discussion",uri:"/02firststeps/discussion.html"},{content:`Running SAST Scans Locally (25 minutes) In this chapter, you’ll set up a FortiDevSec application in the console, integrate it with JIRA, and issue the Docker command to run a SAST scan manually at the command line. You’ll then view the results both in the console and in JIRA and observe how updates to your JIRA workflow propagate back to FortiDevSec.
`,description:"",tags:null,title:"Running SAST Scans Locally",uri:"/03sast.html"},{content:`SAST Scan This task will involve running a FortiDevSec scan locally from the command line and confirming the integration with JIRA by examining some findings there.
First, nagivate to your FortiDevSec app dashboard and click the JIRA plugin icon.
Click the Add Jira Plugin switch, and fill in the values as appropriate.
FortiDevSec Field Setting Jira Server Cloud URL Your Jira Domain (i.e. https://my-project.atlassian.net) Email ID The email associated with your Jira Account API Key The API key you set up in an earlier section Once you’ve entered in the information, click Fetch Details, and your project should appear next to Jira Projects.
Select it, and click OK. The modal will disappear, and you should now see the JIRA plugin is Configured.
There are two ways we can now run the scan locally. We can configure the fdevsec.yaml in more of a declarative approach, or we can use a more imperative approach and utilize command line arguments. Both will be demonstrated below.
First, ensure Docker is running in your command line environment.
docker --version \u003e Docker version 20.10.21, build baeda1f Declarative Approach: Configuring fdevsec.yaml Now, to run the SAST scan, the fdevsec.yaml file needs to be configured to tell FortiDevSec what kind of scan we want to run. If this is not specified, FortiDevSec will default to a SAST scan. We can also optionally specify the languages in the codebase that we want FortiDevSec to scan. If this parameter is left blank FortiDevSec will automatically detect the languages present. After adding the required details, the file should look like:
version: v1 id: org: \u003cOrg ID\u003e app: \u003cApp ID\u003e scanners: - sast - secret - sca - iac - container Run the following command to start the scan:
docker run --rm --mount type=bind,source="$PWD",target=/scan registry.fortidevsec.forticloud.com/fdevsec_sast:latest You should see the following output once the scan is complete:
Imperative Approach: Using Command Line Arguments Equivalently, we can run a scan strictly utilizing command line arguments without the fdevsec.yaml file. The following command runs a scan with a configuration equivalent to that in the previous section:
docker run --rm --mount type=bind,source="$PWD",target=/scan registry.fortidevsec.forticloud.com/fdevsec_sast:latest main s \\ --org-id \u003cOrg ID\u003e \\ --app-id \u003cApp ID\u003e \\ -S=false --scanner sast --scanner sca --scanner iac --scanner container --scanner secrets For a full list of arguments that may be supplied, see the FortiDevSec documentation here: command line arguments.
Now, open your browser and navigate to the FortiDevSec console and click on the application.
You’ll be taken to the application dashboard, which displays scan details such as type, languages, the Git commit the scan was done on, as well as vulnerability information.
Click VIEW ALL under the VULNERABILITIES heading on the main tab.
After a second or two, the filters sidebar on the left will populate. This lets you quickly get a high level overview of the scope of vulnerabilities that FortiDevSec has found in the application.
Now let’s head over to JIRA and observe how status updates sync back to FortiDevSec as updated. From the main project issue page, choose an issue, and click the Status dropdown, and click IN PROGRESS.
Now, switch back over to FortiDevSec and from the application’s vulnerability page, click Sync, and the syncing process will begin.
While the syncing process is happening, the button will appear as in this image:
Once that process is complete, we can see that the status of our issue in FortiDevSec has changed from New to Confirmed.
`,description:"",tags:null,title:"SAST Scan",uri:"/03sast/sastscan.html"},{content:`Discussion FortiDevSec can integrate with deployment workflows in various ways. A scan may be launched with a simple Docker command and this Docker command may be run as part of a CI/CD pipeline automatically as a build step within a particular tool, or manually to get a snapshot of the vulnerabilities present in a codebase.
Some Questions to Consider: Do your deployments consist of IaC templates or Containers? Have you run into issues with Secrets inadvertently turning up in published repositories or do you currently have steps in place to find and address leaks before deployment? What is your organization’s preferred toolset for running CI/CD pipelines? What is your organization’s preferred SDLC framework (Agile/Waterfall/etc.)? How do you currently track actions related to addressing security vulnerabilities found in your teams’ codebase? `,description:"",tags:null,title:"Discussion",uri:"/03sast/discussion.html"},{content:`Running FortiDAST Scans Locally (25 minutes) In this chapter, you’ll run a FortiDAST scan locally from the command line and view the results in the console, observing the types of vulnerabilities FortiDAST may uncover and how to quickly get more information on each from public cybersecurity resources.
`,description:"",tags:null,title:"Running FortiDAST Scans Locally",uri:"/04dast.html"},{content:`DAST Scan First, open up your command line interface and navigate to the application top-level directory.
cd ~/AWSGoat Open up the fdevsec.yaml file and modify it as below, removing previous configuration settings for the SAST, SCA, container, IaC, and Secrets scans, and adding settings for the DAST scan. You’ll need the application URL you noted down in Chapter 1.
version: v1 id: org: \u003cOrg ID\u003e app: \u003cApp ID\u003e scanners: - dast dast: url: \u003cyour app url, i.e. https://api-id.execute-api.us-east-1.amazonaws.com/prod/react\u003e full_scan: false Now, open up a web browser and navigate to the FortiDAST console: https://fortidast.forticloud.com.
In the dropdown, click the FortiDevSec license beginning with “FDEVSC” and select your active license.
Now, return to the command line, and ensure Docker is running.
docker --version \u003e Docker version 20.10.21, build baeda1f Run the following command to begin the DAST scan.
docker run --rm --mount type=bind,source="$PWD",target=/scan registry.fortidevsec.forticloud.com/fdevsec_dast:latest If the command runs successfully, you’ll see the following output:
Now, open up the FortiDAST console in your browser and click Scans Policy on the left hand sidebar.
You should see the application URL along with it’s current Authorization Status and Scan Status. Click the ellipsis box on the right hand side, and click Authorize.
You’ll see the Authorization status change to Authorizing, and once complete, it will change to Authorized. If you click Configure, you’ll see options for naming the scan, specifying an alternate port, scheduling the scan for a future date/time, and several other options for authentication, coverage, and other options.
Click the exit button (“x”) at the top right to exit the Configure modal.
Click Scan to begin the application scan.
Once the scan starts, it’s progress will be shown under Scan Status. The scan will take in upwards of thirty minutes to complete.
When the scan is complete (at 100%), click Scan Result.
This will take you to the Scans Overview page. The Summary tab displays scan details such as URI, scan date and time, scan status, CVSS score, and OWASP top 10 vulnerability scores.
The Vulnerabilities tab lists all of the links FortiDAST found in the application and the results of scanning each. Clicking on the main entrypoint URI opens a modal offering additional information on each vulnerability found.
On the Summary tab, hover over the Success portion of the Scan Status donut chart, and click the left mouse button.
This takes you to the vulnerabilities tab and creates a filter ‘Scan Status == Success’ and displays the URIs satisfying the filter’s criteria. Click on the URI indicating 11 vulnerabilities.
This opens a modal with detailed information on each vulnerability, including steps to take to remediate the vulnerability as well as CVSS score and metric information. Click on the CVSS score on the first vulnerability listed.
This displays information and links to more information about the vulnerability found in various resources such as the MITRE CWE list, recent OWASP top ten lists, CAPECID, and WASCID databases.
Click the exit button (“x”) at the top right of the modal to exit it.
`,description:"",tags:null,title:"DAST Scan",uri:"/04dast/31_dastscans.html"},{content:`Discussion Static code scans are a powerful tool to catch vulnerabilities and security issues in code at rest before it’s deployed. However, they may not always discover vulnerabilities that arise once the code has been deployed and the application is exposed to the internet. This is why static scans are often coupled with dynamic scans which probe a live, running application for vulnerabilities a malicious actor may seek to exploit in the wild during runtime.
FortiDAST is a powerful pentesting solution offered by Fortinet. It probes live endpoints using techniques such as crawling, fuzzing, and attack chaining to identify loopholes and vulnerabilities. The Common Vulnerability Scoring System (CVSS), Exploit Prediction Scoring System (EPSS), and Open Web Application Security Project (OWASP) Top 10 are employed to assess the severity of vulnerabilities and identify security risks to web applications.
For more information on FortiDAST, review the following:
FortiDAST Documentation Questions to consider: When giving this TEC Recipe as a demo, the following questions will provide a basis for next steps and future meetings:
Do you currently pentest your live endpoints or APIs and if so, do you have internal red teams or do you outsource it? Have you implemented pentesting for any internal applications or APIs running inside your organization’s networks? `,description:"",tags:null,title:"Discussion",uri:"/04dast/32_discussionpoints.html"},{content:"",description:"",tags:null,title:"Categories",uri:"/categories.html"},{content:"",description:"",tags:null,title:"Tags",uri:"/tags.html"}]
---
title: "Application Setup and Launch" # MODIFY THIS TITLE IF APPLICABLE
chapter: false
weight: 20
---

### Application Setup and Launch (45 minutes)

In this chapter, you’ll fork a GitHub repository containing the code of a popular vulnerable web application and clone it locally. You'll then (optionally) set up a self-hosted GitHub Actions runner on an EC2 instance in AWS to deploy the app with Terraform. If you'd prefer to use an alternate GitHub-hosted runner, such as 'ubuntu-latest', which the original workflow files are pre-configured to use, you may do that as well. Finally, you'll configure a new application in the FortiDevSec console and set up a JIRA Bug-tracking project for FortiDevSec integration. This will all be in preparation for the following sections, where you'll run actual SAST and DAST scans on the application from the command line and examine the results in the FortiDevSec and FortiDAST consoles and in Jira as well.

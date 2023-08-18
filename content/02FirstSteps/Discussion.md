---
title: "Discussion"
chapter: false
weight: 29
---

#### Discussion

FortiDevSec provides diverse scanning capabilities and can integrate with a broad swath of CI/CD tools, including Jenkins, AWS CodePipeline, and Github Actions, amongst others. It enables quick identification and ranking of vulnerabilities across a heterogenous codebase that may include application, infrastructure, and container code and third-party libraries. It provides insights in a consolodiated dashboard, and integrates seamlessly with JIRA issue-tracking software. Types of testing supported by FortiDevSec include SAST, SCA, Secrets, DAST, IaC, and container. All that is needed is a running Docker installation and the fdevsec.yaml configuration file copied to the top level of the codebase repository and configured as desired.

For more information, review the following:

*    [FortiDevSec User Guide](https://docs.fortinet.com/document/fortidevsec/23.1.0/user-guide/546812/introduction)
*    [Atlassian DevSecOps and Tooling Summary](https://www.atlassian.com/devops/devops-tools/devsecops-tools)

#### Questions to consider:

*    Has your organization formalized it's DevOps processes, especially with regards to security?
*    What types of security testing does your organization currently implement? Have you integrated automated security testing of any kind into your current CICD processes/pipelines?
*    How often are application deployments conducted? Is there a need for rapid deployments with a focus on security?
*    How does your organization currently track and remediate vulnerabilities associated with public Docker images and/or third-party libraries integrated into your software?

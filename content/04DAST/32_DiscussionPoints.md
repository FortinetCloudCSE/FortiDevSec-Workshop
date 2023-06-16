---
title: "Discussion" 
chapter: true
weight: 2
---

#### Discussion

Static code scans are a powerful tool to catch vulnerabilities and security issues in code at rest before it's deployed. However, they may not always discover vulnerabilities that arise once the code has been deployed and the application is exposed to the internet. This is why static scans are often coupled with dynamic scans which probe a live, running application for vulnerabilities a malicious actor may seek to exploit in the wild during runtime.

FortiDAST is a powerful pentesting solution offered by Fortinet. It probes live endpoints using techniques such as crawling, fuzzing, and attack chaining to identify loopholes and vulnerabilities. The Common Vulnerability Scoring System (CVSS), Exploit Prediction Scoring System (EPSS), and Open Web Application Security Project (OWASP) Top 10 are employed to assess the severity of vulnerabilities and identify security risks to web applications.

For more information on FortiDAST, review the following:

*    [FortiDAST Documentation](https://docs.fortinet.com/document/fortidast/23.1.0/user-guide/546812/introduction)

#### Questions to consider:

When giving this TEC Recipe as a demo, the following questions will provide a basis for next steps and future meetings:

* Do you currently pentest your live endpoints or APIs and if so, do you have internal red teams or do you outsource it?
* Have you implemented pentesting for any _internal_ applications or APIs running inside your organization's networks?

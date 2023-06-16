---
title: "Discussion"
chapter: true
weight: 2 
---

#### Discussion

FortiDevSec can integrate with deployment workflows in various ways. A scan may be launched with a simple Docker command and this Docker command may be run as part of a CI/CD pipeline automatically as a build step within a particular tool, or manually to get a snapshot of the vulnerabilities present in a codebase.

#### Some Questions to Consider:

* Do your deployments consist of IaC templates or Containers?
* Have you run into issues with Secrets inadvertently turning up in published repositories or do you currently have steps in place to find and address leaks before deployment?
* What is your organization's preferred toolset for running CI/CD pipelines?
* What is your organization's preferred SDLC framework (Agile/Waterfall/etc.)? How do you currently track actions related to addressing security vulnerabilities found in your teams' codebase?

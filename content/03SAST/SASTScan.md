---
title: "SAST Scan"
chapter: false
weight: 35
---

### SAST Scan 

This task will involve running a FortiDevSec scan locally from the command line and confirming the integration with JIRA by examining some findings there.

First, nagivate to your FortiDevSec app dashboard and click the JIRA plugin icon.

![fds-dash-click-plugin](/images/fds-dash-click-plugin.png)

Click the **Add Jira Plugin** switch, and fill in the values as appropriate.

![fds-dash-click-plugin-1](/images/fds-dash-switch-1.png)![fds-dash-click-plugin-2](/images/fds-dash-switch-2.png)

|FortiDevSec Field|Setting                                                 |
|-----------------|--------------------------------------------------------|
|Jira Server      |Cloud                                                   |
|URL              |Your Jira Domain (i.e. https://my-project.atlassian.net)|
|Email ID         |The email associated with your Jira Account             |
|API Key          |The API key you set up in an earlier section            |


Once you've entered in the information, click **Fetch Details**, and your project should appear next to **Jira Projects**.

![jira-plugin-modal](/images/jira-plugin-modal.png)

Select it, and click **OK**. The modal will disappear, and you should now see the JIRA plugin is **Configured**.

![jira-plugin-configured](/images/jira-plugin-configured.png)


There are two ways we can now run the scan locally. We can configure the fdevsec.yaml in more of a declarative approach, or we can use a more imperative approach and utilize command line arguments. Both will be demonstrated below. 

First, ensure Docker is running in your command line environment. 

```sh
docker --version
> Docker version 20.10.21, build baeda1f
```

### Declarative Approach: Configuring fdevsec.yaml

Now, to run the SAST scan, the fdevsec.yaml file needs to be configured to tell FortiDevSec what kind of scan we want to run. If this is not specified, FortiDevSec will default to a SAST scan. We can also optionally specify the languages in the codebase that we want FortiDevSec to scan. If this parameter is left blank FortiDevSec will automatically detect the languages present. After adding the required details, the file should look like:

```sh
version: v1

id:
  org: <Org ID>
  app: <App ID>

scanners:
  - sast
  - secret
  - sca
  - iac
  - container
```

Run the following command to start the scan:

```sh
docker run --rm --mount type=bind,source="$PWD",target=/scan registry.fortidevsec.forticloud.com/fdevsec_sast:latest
```

You should see the following output once the scan is complete:

![sast-run-done-output](/images/sast-run-done-output.png)


### Imperative Approach: Using Command Line Arguments

Equivalently, we can run a scan strictly utilizing command line arguments without the fdevsec.yaml file. The following command runs a scan with a configuration equivalent to that in the previous section:

```
docker run --rm --mount type=bind,source="$PWD",target=/scan registry.fortidevsec.forticloud.com/fdevsec_sast:latest main s \
  --org-id <Org ID> \
    --app-id <App ID> \
      -S=false --scanner sast --scanner sca --scanner iac --scanner container --scanner secrets
```

For a full list of arguments that may be supplied, see the FortiDevSec documentation here: [command line arguments](https://docs.fortinet.com/document/fortidevsec/23.3.0/user-guide/88163/command-line-arguments).

Now, open your browser and navigate to the FortiDevSec console and click on the application.

![fds-dashboard-check-scan-1](/images/fds-dashboard-check-scan-1.png)

You'll be taken to the application dashboard, which displays scan details such as type, languages, the Git commit the scan was done on, as well as vulnerability information.

![sast-run-done-app-dash](/images/sast-run-done-app-dash.png)

Click **VIEW ALL** under the VULNERABILITIES heading on the main tab.

![click-view-all](/images/click-view-all.png)

After a second or two, the filters sidebar on the left will populate. This lets you quickly get a high level overview of the scope of vulnerabilities that FortiDevSec has found in the application.

![click-view-all-none-confirmed](/images/click-view-all-none-confirmed.png)

Now let's head over to JIRA and observe how status updates sync back to FortiDevSec as updated. From the main project issue page, choose an issue, and click the Status dropdown, and click **IN PROGRESS**.

![jira-todo-dropdown](/images/jira-todo-dropdown.png)
![jira-in-progress](/images/jira-in-progress.png)

Now, switch back over to FortiDevSec and from the application's vulnerability page, click **Sync**, and the syncing process will begin.

![click-sync-sast](/images/click-sync-sast.png)

While the syncing process is happening, the button will appear as in this image:

![jira-syncing-sast](/images/jira-syncing-sast.png)

Once that process is complete, we can see that the status of our issue in FortiDevSec has changed from **New** to **Confirmed**.

![filter-confirmed-sast](/images/filter-confirmed-sast.png)
![confirmed-sast-tab](/images/confirmed-sast-tab.png)


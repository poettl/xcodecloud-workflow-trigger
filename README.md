# xcodecloud-workflow-trigger

This is a simple cli tool to trigger a workflow in Xcode Cloud.

## Usage

- Install
  - `npm install -g poettl/aws-secrets-manager-nodejs`
  - `yarn global add xcodecloud-workflow-trigger`
  - `npx xcodecloud-workflow-trigger`

- Run
  - `xcodecloud-workflow-trigger --help`
  - `xcodecloud-workflow-trigger --issuerId <issuerId> --apiKey <apiKey> --privateKey <privateKey> --workflowId <workflowId> --branchId <branchId>`

- Usage with GitHub Actions

```yaml
name: iOS CI Workflow

on:
  push:
    branches: [main]

jobs:
  trigger-xcodecloud-workflow:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Trigger Xcode Cloud Workflow
        run: |
          npx poettl/xcodecloud-workflow-trigger -i ${{ secrets.XCODE_ISSUER_ID }} -k ${{ secrets.XCODE_API_KEY }}  -w ${{ secrets.XCODE_WORKFLOW_ID_DEV }} -b ${{ secrets.XCODE_BRANCH_ID_DEV }} -p "${{ secrets.XCODE_PRIVATE_KEY }}"
```

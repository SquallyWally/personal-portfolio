#!/usr/bin/env node
import cdk = require("@aws-cdk/core");
import { ResumeFrontendStack } from "../stacks/resume-stack";

const app = new cdk.App();
const staticSite = new ResumeFrontendStack(app, "portfolio-stack", {
  env: {
    account: app.node.tryGetContext("account"),
    region: app.node.tryGetContext("region"),
  },
});

// example of adding a tag - please refer to AWS best practices for ideal usage
cdk.Tags.of(staticSite).add("Project", "My own personal resume website");

app.synth();

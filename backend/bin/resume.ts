#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ResumeBackEndStack } from "../stacks/resume-backend-stack";

const app = new cdk.App();
new ResumeBackEndStack(app, "ResumeBackEndStack");

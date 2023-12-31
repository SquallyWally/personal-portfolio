#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const resume_frontend_stack_1 = require("../stacks/resume-frontend-stack");
const app = new cdk.App();
const staticSite = new resume_frontend_stack_1.ResumeFrontendStack(app, "portfolio-stack", {
    env: {
        account: app.node.tryGetContext("account"),
        region: app.node.tryGetContext("region"),
    },
});
// example of adding a tag - please refer to AWS best practices for ideal usage
cdk.Tags.of(staticSite).add("Project", "My own personal resume website");
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUFzQztBQUN0QywyRUFBc0U7QUFFdEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxVQUFVLEdBQUcsSUFBSSwyQ0FBbUIsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLEVBQUU7SUFDakUsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUMxQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0tBQ3pDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsK0VBQStFO0FBQy9FLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztBQUV6RSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXHJcbmltcG9ydCBjZGsgPSByZXF1aXJlKFwiQGF3cy1jZGsvY29yZVwiKTtcclxuaW1wb3J0IHsgUmVzdW1lRnJvbnRlbmRTdGFjayB9IGZyb20gXCIuLi9zdGFja3MvcmVzdW1lLWZyb250ZW5kLXN0YWNrXCI7XHJcblxyXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xyXG5jb25zdCBzdGF0aWNTaXRlID0gbmV3IFJlc3VtZUZyb250ZW5kU3RhY2soYXBwLCBcInBvcnRmb2xpby1zdGFja1wiLCB7XHJcbiAgZW52OiB7XHJcbiAgICBhY2NvdW50OiBhcHAubm9kZS50cnlHZXRDb250ZXh0KFwiYWNjb3VudFwiKSxcclxuICAgIHJlZ2lvbjogYXBwLm5vZGUudHJ5R2V0Q29udGV4dChcInJlZ2lvblwiKSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIGV4YW1wbGUgb2YgYWRkaW5nIGEgdGFnIC0gcGxlYXNlIHJlZmVyIHRvIEFXUyBiZXN0IHByYWN0aWNlcyBmb3IgaWRlYWwgdXNhZ2VcclxuY2RrLlRhZ3Mub2Yoc3RhdGljU2l0ZSkuYWRkKFwiUHJvamVjdFwiLCBcIk15IG93biBwZXJzb25hbCByZXN1bWUgd2Vic2l0ZVwiKTtcclxuXHJcbmFwcC5zeW50aCgpO1xyXG4iXX0=
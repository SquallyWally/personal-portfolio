"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeFrontendStack = void 0;
const core_1 = require("@aws-cdk/core");
const cloudfront = require("@aws-cdk/aws-cloudfront");
const cloudfront_origins = require("@aws-cdk/aws-cloudfront-origins");
const acm = require("@aws-cdk/aws-certificatemanager");
const s3 = require("@aws-cdk/aws-s3");
const s3deploy = require("@aws-cdk/aws-s3-deployment");
const iam = require("@aws-cdk/aws-iam");
const cdk = require("@aws-cdk/core");
const path = require("path");
class ResumeFrontendStack extends cdk.Stack {
    constructor(scope, name, props) {
        super(scope, name, props);
        // Bucket
        const resumeBucket = new s3.Bucket(this, "personal-portfolio-milo", {
            publicReadAccess: true,
        });
        new cdk.CfnOutput(this, "Bucket", { value: resumeBucket.bucketName });
        const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "resume_OAI", {
            comment: "comment",
        });
        const certificate = acm.Certificate.fromCertificateArn(this, "Certificate", "arn:aws:acm:us-east-1:260598499832:certificate/8f454c2c-7f1c-4d9b-b112-8586989e1843");
        const distribution = new cloudfront.Distribution(this, "distribution", {
            defaultBehavior: {
                origin: new cloudfront_origins.S3Origin(resumeBucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            defaultRootObject: "index.html",
            domainNames: ["milokastablank.com", "www.milokastablank.com"],
            certificate: certificate,
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: "/index.html",
                    ttl: core_1.Duration.seconds(10),
                },
                {
                    httpStatus: 403,
                    responseHttpStatus: 200,
                    responsePagePath: "/index.html",
                    ttl: core_1.Duration.seconds(10),
                },
            ],
        });
        new cdk.CfnOutput(this, "DistributionId", {
            value: distribution.distributionId,
        });
        resumeBucket.addToResourcePolicy(new iam.PolicyStatement({
            actions: ["s3:GetObject"],
            resources: [resumeBucket.arnForObjects("*")],
            principals: [
                new iam.CanonicalUserPrincipal(originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId),
            ],
        }));
        // Deploy
        new s3deploy.BucketDeployment(this, "DeployWebsite", {
            sources: [s3deploy.Source.asset(path.join(__dirname, "../dist"))],
            destinationBucket: resumeBucket,
            distribution,
            distributionPaths: ["/*", "/assets/css/*"],
        });
    }
}
exports.ResumeFrontendStack = ResumeFrontendStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdW1lLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxRDtBQUNyRCxzREFBdUQ7QUFDdkQsc0VBQXVFO0FBQ3ZFLHVEQUF3RDtBQUN4RCxzQ0FBdUM7QUFDdkMsdURBQXdEO0FBQ3hELHdDQUF5QztBQUN6QyxxQ0FBc0M7QUFDdEMsNkJBQThCO0FBTzlCLE1BQWEsbUJBQW9CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDaEQsWUFBWSxLQUFjLEVBQUUsSUFBWSxFQUFFLEtBQXFCO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTFCLFNBQVM7UUFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQ2xFLGdCQUFnQixFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFdEUsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FDOUQsSUFBSSxFQUNKLFlBQVksRUFDWjtZQUNFLE9BQU8sRUFBRSxTQUFTO1NBQ25CLENBQ0YsQ0FBQztRQUVGLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQ3BELElBQUksRUFDSixhQUFhLEVBQ2IscUZBQXFGLENBQ3RGLENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNyRSxlQUFlLEVBQUU7Z0JBQ2YsTUFBTSxFQUFFLElBQUksa0JBQWtCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztnQkFDckQsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQjthQUN4RTtZQUNELGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsV0FBVyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsd0JBQXdCLENBQUM7WUFDN0QsV0FBVyxFQUFFLFdBQVc7WUFDeEIsY0FBYyxFQUFFO2dCQUNkO29CQUNFLFVBQVUsRUFBRSxHQUFHO29CQUNmLGtCQUFrQixFQUFFLEdBQUc7b0JBQ3ZCLGdCQUFnQixFQUFFLGFBQWE7b0JBQy9CLEdBQUcsRUFBRSxlQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztpQkFDMUI7Z0JBQ0Q7b0JBQ0UsVUFBVSxFQUFFLEdBQUc7b0JBQ2Ysa0JBQWtCLEVBQUUsR0FBRztvQkFDdkIsZ0JBQWdCLEVBQUUsYUFBYTtvQkFDL0IsR0FBRyxFQUFFLGVBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN4QyxLQUFLLEVBQUUsWUFBWSxDQUFDLGNBQWM7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLG1CQUFtQixDQUM5QixJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsVUFBVSxFQUFFO2dCQUNWLElBQUksR0FBRyxDQUFDLHNCQUFzQixDQUM1QixvQkFBb0IsQ0FBQywrQ0FBK0MsQ0FDckU7YUFDRjtTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsU0FBUztRQUVULElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbkQsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqRSxpQkFBaUIsRUFBRSxZQUFZO1lBQy9CLFlBQVk7WUFDWixpQkFBaUIsRUFBRSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUM7U0FDM0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBMUVELGtEQTBFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER1cmF0aW9uLCBTdGFja1Byb3BzIH0gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcclxuaW1wb3J0IGNsb3VkZnJvbnQgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnRcIik7XHJcbmltcG9ydCBjbG91ZGZyb250X29yaWdpbnMgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnQtb3JpZ2luc1wiKTtcclxuaW1wb3J0IGFjbSA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtY2VydGlmaWNhdGVtYW5hZ2VyXCIpO1xyXG5pbXBvcnQgczMgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLXMzXCIpO1xyXG5pbXBvcnQgczNkZXBsb3kgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLXMzLWRlcGxveW1lbnRcIik7XHJcbmltcG9ydCBpYW0gPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWlhbVwiKTtcclxuaW1wb3J0IGNkayA9IHJlcXVpcmUoXCJAYXdzLWNkay9jb3JlXCIpO1xyXG5pbXBvcnQgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNTaXRlUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcclxuICBkb21haW5OYW1lPzogc3RyaW5nO1xyXG4gIHNpdGVTdWJEb21haW4/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bWVGcm9udGVuZFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkFwcCwgbmFtZTogc3RyaW5nLCBwcm9wczogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBuYW1lLCBwcm9wcyk7XHJcblxyXG4gICAgLy8gQnVja2V0XHJcbiAgICBjb25zdCByZXN1bWVCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIFwicGVyc29uYWwtcG9ydGZvbGlvLW1pbG9cIiwge1xyXG4gICAgICBwdWJsaWNSZWFkQWNjZXNzOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJCdWNrZXRcIiwgeyB2YWx1ZTogcmVzdW1lQnVja2V0LmJ1Y2tldE5hbWUgfSk7XHJcblxyXG4gICAgY29uc3Qgb3JpZ2luQWNjZXNzSWRlbnRpdHkgPSBuZXcgY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eShcclxuICAgICAgdGhpcyxcclxuICAgICAgXCJyZXN1bWVfT0FJXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBjb21tZW50OiBcImNvbW1lbnRcIixcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjZXJ0aWZpY2F0ZSA9IGFjbS5DZXJ0aWZpY2F0ZS5mcm9tQ2VydGlmaWNhdGVBcm4oXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIFwiQ2VydGlmaWNhdGVcIixcclxuICAgICAgXCJhcm46YXdzOmFjbTp1cy1lYXN0LTE6MjYwNTk4NDk5ODMyOmNlcnRpZmljYXRlLzhmNDU0YzJjLTdmMWMtNGQ5Yi1iMTEyLTg1ODY5ODllMTg0M1wiXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBjbG91ZGZyb250LkRpc3RyaWJ1dGlvbih0aGlzLCBcImRpc3RyaWJ1dGlvblwiLCB7XHJcbiAgICAgIGRlZmF1bHRCZWhhdmlvcjoge1xyXG4gICAgICAgIG9yaWdpbjogbmV3IGNsb3VkZnJvbnRfb3JpZ2lucy5TM09yaWdpbihyZXN1bWVCdWNrZXQpLFxyXG4gICAgICAgIHZpZXdlclByb3RvY29sUG9saWN5OiBjbG91ZGZyb250LlZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTLFxyXG4gICAgICB9LFxyXG4gICAgICBkZWZhdWx0Um9vdE9iamVjdDogXCJpbmRleC5odG1sXCIsXHJcbiAgICAgIGRvbWFpbk5hbWVzOiBbXCJtaWxva2FzdGFibGFuay5jb21cIiwgXCJ3d3cubWlsb2thc3RhYmxhbmsuY29tXCJdLFxyXG4gICAgICBjZXJ0aWZpY2F0ZTogY2VydGlmaWNhdGUsXHJcbiAgICAgIGVycm9yUmVzcG9uc2VzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaHR0cFN0YXR1czogNDA0LFxyXG4gICAgICAgICAgcmVzcG9uc2VIdHRwU3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiBcIi9pbmRleC5odG1sXCIsXHJcbiAgICAgICAgICB0dGw6IER1cmF0aW9uLnNlY29uZHMoMTApLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaHR0cFN0YXR1czogNDAzLFxyXG4gICAgICAgICAgcmVzcG9uc2VIdHRwU3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiBcIi9pbmRleC5odG1sXCIsXHJcbiAgICAgICAgICB0dGw6IER1cmF0aW9uLnNlY29uZHMoMTApLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIkRpc3RyaWJ1dGlvbklkXCIsIHtcclxuICAgICAgdmFsdWU6IGRpc3RyaWJ1dGlvbi5kaXN0cmlidXRpb25JZCxcclxuICAgIH0pO1xyXG5cclxuICAgIHJlc3VtZUJ1Y2tldC5hZGRUb1Jlc291cmNlUG9saWN5KFxyXG4gICAgICBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgICAgYWN0aW9uczogW1wiczM6R2V0T2JqZWN0XCJdLFxyXG4gICAgICAgIHJlc291cmNlczogW3Jlc3VtZUJ1Y2tldC5hcm5Gb3JPYmplY3RzKFwiKlwiKV0sXHJcbiAgICAgICAgcHJpbmNpcGFsczogW1xyXG4gICAgICAgICAgbmV3IGlhbS5DYW5vbmljYWxVc2VyUHJpbmNpcGFsKFxyXG4gICAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eS5jbG91ZEZyb250T3JpZ2luQWNjZXNzSWRlbnRpdHlTM0Nhbm9uaWNhbFVzZXJJZFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBEZXBsb3lcclxuXHJcbiAgICBuZXcgczNkZXBsb3kuQnVja2V0RGVwbG95bWVudCh0aGlzLCBcIkRlcGxveVdlYnNpdGVcIiwge1xyXG4gICAgICBzb3VyY2VzOiBbczNkZXBsb3kuU291cmNlLmFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vZGlzdFwiKSldLFxyXG4gICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogcmVzdW1lQnVja2V0LFxyXG4gICAgICBkaXN0cmlidXRpb24sXHJcbiAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbXCIvKlwiLCBcIi9hc3NldHMvY3NzLypcIl0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
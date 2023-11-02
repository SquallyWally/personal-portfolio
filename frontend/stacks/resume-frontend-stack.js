"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
const secrets_json_1 = __importDefault(require("../secrets.json"));
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
        const certificate = acm.Certificate.fromCertificateArn(this, "Certificate", secrets_json_1.default.certificateArn);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLWZyb250ZW5kLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdW1lLWZyb250ZW5kLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdDQUFxRDtBQUNyRCxzREFBdUQ7QUFDdkQsc0VBQXVFO0FBQ3ZFLHVEQUF3RDtBQUN4RCxzQ0FBdUM7QUFDdkMsdURBQXdEO0FBQ3hELHdDQUF5QztBQUN6QyxxQ0FBc0M7QUFDdEMsNkJBQThCO0FBQzlCLG1FQUFzQztBQU90QyxNQUFhLG1CQUFvQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2hELFlBQVksS0FBYyxFQUFFLElBQVksRUFBRSxLQUFxQjtRQUM3RCxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUxQixTQUFTO1FBQ1QsTUFBTSxZQUFZLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUNsRSxnQkFBZ0IsRUFBRSxJQUFJO1NBQ3ZCLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxVQUFVLENBQUMsb0JBQW9CLENBQzlELElBQUksRUFDSixZQUFZLEVBQ1o7WUFDRSxPQUFPLEVBQUUsU0FBUztTQUNuQixDQUNGLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUNwRCxJQUFJLEVBQ0osYUFBYSxFQUNiLHNCQUFPLENBQUMsY0FBYyxDQUN2QixDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDckUsZUFBZSxFQUFFO2dCQUNmLE1BQU0sRUFBRSxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7Z0JBQ3JELG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUI7YUFDeEU7WUFDRCxpQkFBaUIsRUFBRSxZQUFZO1lBQy9CLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDO1lBQzdELFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGNBQWMsRUFBRTtnQkFDZDtvQkFDRSxVQUFVLEVBQUUsR0FBRztvQkFDZixrQkFBa0IsRUFBRSxHQUFHO29CQUN2QixnQkFBZ0IsRUFBRSxhQUFhO29CQUMvQixHQUFHLEVBQUUsZUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7aUJBQzFCO2dCQUNEO29CQUNFLFVBQVUsRUFBRSxHQUFHO29CQUNmLGtCQUFrQixFQUFFLEdBQUc7b0JBQ3ZCLGdCQUFnQixFQUFFLGFBQWE7b0JBQy9CLEdBQUcsRUFBRSxlQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztpQkFDMUI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDeEMsS0FBSyxFQUFFLFlBQVksQ0FBQyxjQUFjO1NBQ25DLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxtQkFBbUIsQ0FDOUIsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN6QixTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLFVBQVUsRUFBRTtnQkFDVixJQUFJLEdBQUcsQ0FBQyxzQkFBc0IsQ0FDNUIsb0JBQW9CLENBQUMsK0NBQStDLENBQ3JFO2FBQ0Y7U0FDRixDQUFDLENBQ0gsQ0FBQztRQUVGLFNBQVM7UUFFVCxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ25ELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakUsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixZQUFZO1lBQ1osaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDO1NBQzNDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTFFRCxrREEwRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEdXJhdGlvbiwgU3RhY2tQcm9wcyB9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XHJcbmltcG9ydCBjbG91ZGZyb250ID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1jbG91ZGZyb250XCIpO1xyXG5pbXBvcnQgY2xvdWRmcm9udF9vcmlnaW5zID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1jbG91ZGZyb250LW9yaWdpbnNcIik7XHJcbmltcG9ydCBhY20gPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWNlcnRpZmljYXRlbWFuYWdlclwiKTtcclxuaW1wb3J0IHMzID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1zM1wiKTtcclxuaW1wb3J0IHMzZGVwbG95ID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1zMy1kZXBsb3ltZW50XCIpO1xyXG5pbXBvcnQgaWFtID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1pYW1cIik7XHJcbmltcG9ydCBjZGsgPSByZXF1aXJlKFwiQGF3cy1jZGsvY29yZVwiKTtcclxuaW1wb3J0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuaW1wb3J0IHNlY3JldHMgZnJvbSBcIi4uL3NlY3JldHMuanNvblwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNTaXRlUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcclxuICBkb21haW5OYW1lPzogc3RyaW5nO1xyXG4gIHNpdGVTdWJEb21haW4/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bWVGcm9udGVuZFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkFwcCwgbmFtZTogc3RyaW5nLCBwcm9wczogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBuYW1lLCBwcm9wcyk7XHJcblxyXG4gICAgLy8gQnVja2V0XHJcbiAgICBjb25zdCByZXN1bWVCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIFwicGVyc29uYWwtcG9ydGZvbGlvLW1pbG9cIiwge1xyXG4gICAgICBwdWJsaWNSZWFkQWNjZXNzOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJCdWNrZXRcIiwgeyB2YWx1ZTogcmVzdW1lQnVja2V0LmJ1Y2tldE5hbWUgfSk7XHJcblxyXG4gICAgY29uc3Qgb3JpZ2luQWNjZXNzSWRlbnRpdHkgPSBuZXcgY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eShcclxuICAgICAgdGhpcyxcclxuICAgICAgXCJyZXN1bWVfT0FJXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBjb21tZW50OiBcImNvbW1lbnRcIixcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjZXJ0aWZpY2F0ZSA9IGFjbS5DZXJ0aWZpY2F0ZS5mcm9tQ2VydGlmaWNhdGVBcm4oXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIFwiQ2VydGlmaWNhdGVcIixcclxuICAgICAgc2VjcmV0cy5jZXJ0aWZpY2F0ZUFyblxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgY2xvdWRmcm9udC5EaXN0cmlidXRpb24odGhpcywgXCJkaXN0cmlidXRpb25cIiwge1xyXG4gICAgICBkZWZhdWx0QmVoYXZpb3I6IHtcclxuICAgICAgICBvcmlnaW46IG5ldyBjbG91ZGZyb250X29yaWdpbnMuUzNPcmlnaW4ocmVzdW1lQnVja2V0KSxcclxuICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTogY2xvdWRmcm9udC5WaWV3ZXJQcm90b2NvbFBvbGljeS5SRURJUkVDVF9UT19IVFRQUyxcclxuICAgICAgfSxcclxuICAgICAgZGVmYXVsdFJvb3RPYmplY3Q6IFwiaW5kZXguaHRtbFwiLFxyXG4gICAgICBkb21haW5OYW1lczogW1wibWlsb2thc3RhYmxhbmsuY29tXCIsIFwid3d3Lm1pbG9rYXN0YWJsYW5rLmNvbVwiXSxcclxuICAgICAgY2VydGlmaWNhdGU6IGNlcnRpZmljYXRlLFxyXG4gICAgICBlcnJvclJlc3BvbnNlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGh0dHBTdGF0dXM6IDQwNCxcclxuICAgICAgICAgIHJlc3BvbnNlSHR0cFN0YXR1czogMjAwLFxyXG4gICAgICAgICAgcmVzcG9uc2VQYWdlUGF0aDogXCIvaW5kZXguaHRtbFwiLFxyXG4gICAgICAgICAgdHRsOiBEdXJhdGlvbi5zZWNvbmRzKDEwKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGh0dHBTdGF0dXM6IDQwMyxcclxuICAgICAgICAgIHJlc3BvbnNlSHR0cFN0YXR1czogMjAwLFxyXG4gICAgICAgICAgcmVzcG9uc2VQYWdlUGF0aDogXCIvaW5kZXguaHRtbFwiLFxyXG4gICAgICAgICAgdHRsOiBEdXJhdGlvbi5zZWNvbmRzKDEwKSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJEaXN0cmlidXRpb25JZFwiLCB7XHJcbiAgICAgIHZhbHVlOiBkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uSWQsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXN1bWVCdWNrZXQuYWRkVG9SZXNvdXJjZVBvbGljeShcclxuICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xyXG4gICAgICAgIGFjdGlvbnM6IFtcInMzOkdldE9iamVjdFwiXSxcclxuICAgICAgICByZXNvdXJjZXM6IFtyZXN1bWVCdWNrZXQuYXJuRm9yT2JqZWN0cyhcIipcIildLFxyXG4gICAgICAgIHByaW5jaXBhbHM6IFtcclxuICAgICAgICAgIG5ldyBpYW0uQ2Fub25pY2FsVXNlclByaW5jaXBhbChcclxuICAgICAgICAgICAgb3JpZ2luQWNjZXNzSWRlbnRpdHkuY2xvdWRGcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5UzNDYW5vbmljYWxVc2VySWRcclxuICAgICAgICAgICksXHJcbiAgICAgICAgXSxcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gRGVwbG95XHJcblxyXG4gICAgbmV3IHMzZGVwbG95LkJ1Y2tldERlcGxveW1lbnQodGhpcywgXCJEZXBsb3lXZWJzaXRlXCIsIHtcclxuICAgICAgc291cmNlczogW3MzZGVwbG95LlNvdXJjZS5hc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL2Rpc3RcIikpXSxcclxuICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IHJlc3VtZUJ1Y2tldCxcclxuICAgICAgZGlzdHJpYnV0aW9uLFxyXG4gICAgICBkaXN0cmlidXRpb25QYXRoczogW1wiLypcIiwgXCIvYXNzZXRzL2Nzcy8qXCJdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
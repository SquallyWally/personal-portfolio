"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeFrontendStack = void 0;
const core_1 = require("@aws-cdk/core");
const cloudfront = require("@aws-cdk/aws-cloudfront");
const cloudfront_origins = require("@aws-cdk/aws-cloudfront-origins");
const s3 = require("@aws-cdk/aws-s3");
const s3deploy = require("@aws-cdk/aws-s3-deployment");
const iam = require("@aws-cdk/aws-iam");
const cdk = require("@aws-cdk/core");
const path = require("path");
class ResumeFrontendStack extends cdk.Stack {
    constructor(scope, name, props) {
        super(scope, name, props);
        //const siteDomain = props.siteSubDomain + "." + props.domainName;
        // new cdk.CfnOutput(this, "Site", { value: "https://" + siteDomain });
        // Bucket
        const resumeBucket = new s3.Bucket(this, "personal-portfolio-milo_new", {
            // bucketName: "personal-portfolio-milo_new",
            //  websiteIndexDocument: "index.html",
            publicReadAccess: false,
        });
        new cdk.CfnOutput(this, "Bucket", { value: resumeBucket.bucketName });
        const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "resume_OAI", {
            comment: "comment",
        });
        // const originRequestsPolicy = new cloudfront.OriginRequestPolicy
        const distribution = new cloudfront.Distribution(this, "distribution", {
            defaultBehavior: {
                origin: new cloudfront_origins.S3Origin(resumeBucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            defaultRootObject: "index.html",
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
            distributionPaths: ["/*"],
        });
    }
}
exports.ResumeFrontendStack = ResumeFrontendStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdW1lLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxRDtBQUNyRCxzREFBdUQ7QUFDdkQsc0VBQXVFO0FBQ3ZFLHNDQUF1QztBQUN2Qyx1REFBd0Q7QUFDeEQsd0NBQXlDO0FBQ3pDLHFDQUFzQztBQUN0Qyw2QkFBOEI7QUFPOUIsTUFBYSxtQkFBb0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNoRCxZQUFZLEtBQWMsRUFBRSxJQUFZLEVBQUUsS0FBcUI7UUFDN0QsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFMUIsa0VBQWtFO1FBQ2xFLHVFQUF1RTtRQUV2RSxTQUFTO1FBQ1QsTUFBTSxZQUFZLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSw2QkFBNkIsRUFBRTtZQUN0RSw2Q0FBNkM7WUFDN0MsdUNBQXVDO1lBQ3ZDLGdCQUFnQixFQUFFLEtBQUs7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFdEUsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FDOUQsSUFBSSxFQUNKLFlBQVksRUFDWjtZQUNFLE9BQU8sRUFBRSxTQUFTO1NBQ25CLENBQ0YsQ0FBQztRQUVGLGtFQUFrRTtRQUNsRSxNQUFNLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNyRSxlQUFlLEVBQUU7Z0JBQ2YsTUFBTSxFQUFFLElBQUksa0JBQWtCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztnQkFDckQsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQjthQUN4RTtZQUNELGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsY0FBYyxFQUFFO2dCQUNkO29CQUNFLFVBQVUsRUFBRSxHQUFHO29CQUNmLGtCQUFrQixFQUFFLEdBQUc7b0JBQ3ZCLGdCQUFnQixFQUFFLGFBQWE7b0JBQy9CLEdBQUcsRUFBRSxlQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztpQkFDMUI7Z0JBQ0Q7b0JBQ0UsVUFBVSxFQUFFLEdBQUc7b0JBQ2Ysa0JBQWtCLEVBQUUsR0FBRztvQkFDdkIsZ0JBQWdCLEVBQUUsYUFBYTtvQkFDL0IsR0FBRyxFQUFFLGVBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN4QyxLQUFLLEVBQUUsWUFBWSxDQUFDLGNBQWM7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLG1CQUFtQixDQUM5QixJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsVUFBVSxFQUFFO2dCQUNWLElBQUksR0FBRyxDQUFDLHNCQUFzQixDQUM1QixvQkFBb0IsQ0FBQywrQ0FBK0MsQ0FDckU7YUFDRjtTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsU0FBUztRQUVULElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbkQsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqRSxpQkFBaUIsRUFBRSxZQUFZO1lBQy9CLFlBQVk7WUFDWixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF2RUQsa0RBdUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHVyYXRpb24sIFN0YWNrUHJvcHMgfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xyXG5pbXBvcnQgY2xvdWRmcm9udCA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtY2xvdWRmcm9udFwiKTtcclxuaW1wb3J0IGNsb3VkZnJvbnRfb3JpZ2lucyA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtY2xvdWRmcm9udC1vcmlnaW5zXCIpO1xyXG5pbXBvcnQgczMgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLXMzXCIpO1xyXG5pbXBvcnQgczNkZXBsb3kgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLXMzLWRlcGxveW1lbnRcIik7XHJcbmltcG9ydCBpYW0gPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWlhbVwiKTtcclxuaW1wb3J0IGNkayA9IHJlcXVpcmUoXCJAYXdzLWNkay9jb3JlXCIpO1xyXG5pbXBvcnQgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNTaXRlUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcclxuICBkb21haW5OYW1lPzogc3RyaW5nO1xyXG4gIHNpdGVTdWJEb21haW4/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bWVGcm9udGVuZFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkFwcCwgbmFtZTogc3RyaW5nLCBwcm9wczogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBuYW1lLCBwcm9wcyk7XHJcblxyXG4gICAgLy9jb25zdCBzaXRlRG9tYWluID0gcHJvcHMuc2l0ZVN1YkRvbWFpbiArIFwiLlwiICsgcHJvcHMuZG9tYWluTmFtZTtcclxuICAgIC8vIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiU2l0ZVwiLCB7IHZhbHVlOiBcImh0dHBzOi8vXCIgKyBzaXRlRG9tYWluIH0pO1xyXG5cclxuICAgIC8vIEJ1Y2tldFxyXG4gICAgY29uc3QgcmVzdW1lQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCBcInBlcnNvbmFsLXBvcnRmb2xpby1taWxvX25ld1wiLCB7XHJcbiAgICAgIC8vIGJ1Y2tldE5hbWU6IFwicGVyc29uYWwtcG9ydGZvbGlvLW1pbG9fbmV3XCIsXHJcbiAgICAgIC8vICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogXCJpbmRleC5odG1sXCIsXHJcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIkJ1Y2tldFwiLCB7IHZhbHVlOiByZXN1bWVCdWNrZXQuYnVja2V0TmFtZSB9KTtcclxuXHJcbiAgICBjb25zdCBvcmlnaW5BY2Nlc3NJZGVudGl0eSA9IG5ldyBjbG91ZGZyb250Lk9yaWdpbkFjY2Vzc0lkZW50aXR5KFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBcInJlc3VtZV9PQUlcIixcclxuICAgICAge1xyXG4gICAgICAgIGNvbW1lbnQ6IFwiY29tbWVudFwiLFxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIGNvbnN0IG9yaWdpblJlcXVlc3RzUG9saWN5ID0gbmV3IGNsb3VkZnJvbnQuT3JpZ2luUmVxdWVzdFBvbGljeVxyXG4gICAgY29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IGNsb3VkZnJvbnQuRGlzdHJpYnV0aW9uKHRoaXMsIFwiZGlzdHJpYnV0aW9uXCIsIHtcclxuICAgICAgZGVmYXVsdEJlaGF2aW9yOiB7XHJcbiAgICAgICAgb3JpZ2luOiBuZXcgY2xvdWRmcm9udF9vcmlnaW5zLlMzT3JpZ2luKHJlc3VtZUJ1Y2tldCksXHJcbiAgICAgICAgdmlld2VyUHJvdG9jb2xQb2xpY3k6IGNsb3VkZnJvbnQuVmlld2VyUHJvdG9jb2xQb2xpY3kuUkVESVJFQ1RfVE9fSFRUUFMsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRlZmF1bHRSb290T2JqZWN0OiBcImluZGV4Lmh0bWxcIixcclxuICAgICAgZXJyb3JSZXNwb25zZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBodHRwU3RhdHVzOiA0MDQsXHJcbiAgICAgICAgICByZXNwb25zZUh0dHBTdGF0dXM6IDIwMCxcclxuICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6IFwiL2luZGV4Lmh0bWxcIixcclxuICAgICAgICAgIHR0bDogRHVyYXRpb24uc2Vjb25kcygxMCksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBodHRwU3RhdHVzOiA0MDMsXHJcbiAgICAgICAgICByZXNwb25zZUh0dHBTdGF0dXM6IDIwMCxcclxuICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6IFwiL2luZGV4Lmh0bWxcIixcclxuICAgICAgICAgIHR0bDogRHVyYXRpb24uc2Vjb25kcygxMCksXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0pO1xyXG5cclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiRGlzdHJpYnV0aW9uSWRcIiwge1xyXG4gICAgICB2YWx1ZTogZGlzdHJpYnV0aW9uLmRpc3RyaWJ1dGlvbklkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmVzdW1lQnVja2V0LmFkZFRvUmVzb3VyY2VQb2xpY3koXHJcbiAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcclxuICAgICAgICBhY3Rpb25zOiBbXCJzMzpHZXRPYmplY3RcIl0sXHJcbiAgICAgICAgcmVzb3VyY2VzOiBbcmVzdW1lQnVja2V0LmFybkZvck9iamVjdHMoXCIqXCIpXSxcclxuICAgICAgICBwcmluY2lwYWxzOiBbXHJcbiAgICAgICAgICBuZXcgaWFtLkNhbm9uaWNhbFVzZXJQcmluY2lwYWwoXHJcbiAgICAgICAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5LmNsb3VkRnJvbnRPcmlnaW5BY2Nlc3NJZGVudGl0eVMzQ2Fub25pY2FsVXNlcklkXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIERlcGxveVxyXG5cclxuICAgIG5ldyBzM2RlcGxveS5CdWNrZXREZXBsb3ltZW50KHRoaXMsIFwiRGVwbG95V2Vic2l0ZVwiLCB7XHJcbiAgICAgIHNvdXJjZXM6IFtzM2RlcGxveS5Tb3VyY2UuYXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9kaXN0XCIpKV0sXHJcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiByZXN1bWVCdWNrZXQsXHJcbiAgICAgIGRpc3RyaWJ1dGlvbixcclxuICAgICAgZGlzdHJpYnV0aW9uUGF0aHM6IFtcIi8qXCJdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
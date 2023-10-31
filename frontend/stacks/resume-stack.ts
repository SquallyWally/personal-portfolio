import { Duration, StackProps } from "@aws-cdk/core";
import cloudfront = require("@aws-cdk/aws-cloudfront");
import cloudfront_origins = require("@aws-cdk/aws-cloudfront-origins");
import s3 = require("@aws-cdk/aws-s3");
import s3deploy = require("@aws-cdk/aws-s3-deployment");
import iam = require("@aws-cdk/aws-iam");
import cdk = require("@aws-cdk/core");
import path = require("path");

export interface StaticSiteProps extends StackProps {
  domainName?: string;
  siteSubDomain?: string;
}

export class ResumeFrontendStack extends cdk.Stack {
  constructor(scope: cdk.App, name: string, props: cdk.StackProps) {
    super(scope, name, props);

    // Bucket
    const resumeBucket = new s3.Bucket(this, "personal-portfolio-milo_new", {
      publicReadAccess: false,
    });
    new cdk.CfnOutput(this, "Bucket", { value: resumeBucket.bucketName });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "resume_OAI",
      {
        comment: "comment",
      }
    );

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
          ttl: Duration.seconds(10),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: Duration.seconds(10),
        },
      ],
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });

    resumeBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [resumeBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    // Deploy

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset(path.join(__dirname, "../dist"))],
      destinationBucket: resumeBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}

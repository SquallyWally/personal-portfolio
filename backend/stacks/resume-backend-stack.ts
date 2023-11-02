import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import {
  LambdaToDynamoDBProps,
  LambdaToDynamoDB,
} from "@aws-solutions-constructs/aws-lambda-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class ResumeBackEndStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const constructProps: LambdaToDynamoDBProps = {
      lambdaFunctionProps: {
        code: lambda.Code.fromAsset(`lambda`),
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "updateVisitorCount.handler",
      },

      dynamoTableProps: {
        tableName: "visitorCount",
        partitionKey: {
          name: "count",
          type: dynamodb.AttributeType.STRING,
        },
      },
    };

    const lambdaToDynamoDB = new LambdaToDynamoDB(
      this,
      "visitorCount",
      constructProps
    );

    const api = new apigw.LambdaRestApi(this, "resume_api", {
      handler: lambdaToDynamoDB.lambdaFunction,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowHeaders: ["Content-Type"],
        allowMethods: ["OPTIONS", "POST"],
        allowOrigins: ["https://milokastablank.com"],
      },
    });

    api.root.addMethod("POST");

    api.addUsagePlan("UsagePlan", {
      throttle: {
        rateLimit: 50,
        burstLimit: 20,
      },
    });
  }
}

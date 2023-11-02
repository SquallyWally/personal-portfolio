"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeBackEndStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_dynamodb_1 = require("@aws-solutions-constructs/aws-lambda-dynamodb");
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const apigw = __importStar(require("aws-cdk-lib/aws-apigateway"));
const dynamodb = __importStar(require("aws-cdk-lib/aws-dynamodb"));
class ResumeBackEndStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const constructProps = {
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
        const lambdaToDynamoDB = new aws_lambda_dynamodb_1.LambdaToDynamoDB(this, "visitorCount", constructProps);
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
exports.ResumeBackEndStack = ResumeBackEndStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLWJhY2tlbmQtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXN1bWUtYmFja2VuZC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUFnRDtBQUNoRCx1RkFHdUQ7QUFDdkQsK0RBQWlEO0FBQ2pELGtFQUFvRDtBQUNwRCxtRUFBcUQ7QUFFckQsTUFBYSxrQkFBbUIsU0FBUSxtQkFBSztJQUMzQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sY0FBYyxHQUEwQjtZQUM1QyxtQkFBbUIsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztnQkFDckMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztnQkFDbkMsT0FBTyxFQUFFLDRCQUE0QjthQUN0QztZQUVELGdCQUFnQixFQUFFO2dCQUNoQixTQUFTLEVBQUUsY0FBYztnQkFDekIsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU07aUJBQ3BDO2FBQ0Y7U0FDRixDQUFDO1FBRUYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHNDQUFnQixDQUMzQyxJQUFJLEVBQ0osY0FBYyxFQUNkLGNBQWMsQ0FDZixDQUFDO1FBRUYsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDdEQsT0FBTyxFQUFFLGdCQUFnQixDQUFDLGNBQWM7WUFDeEMsS0FBSyxFQUFFLEtBQUs7WUFDWiwyQkFBMkIsRUFBRTtnQkFDM0IsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUM5QixZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDO2dCQUNqQyxZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQzthQUM3QztTQUNGLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNCLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzVCLFFBQVEsRUFBRTtnQkFDUixTQUFTLEVBQUUsRUFBRTtnQkFDYixVQUFVLEVBQUUsRUFBRTthQUNmO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBN0NELGdEQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XHJcbmltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XHJcbmltcG9ydCB7XHJcbiAgTGFtYmRhVG9EeW5hbW9EQlByb3BzLFxyXG4gIExhbWJkYVRvRHluYW1vREIsXHJcbn0gZnJvbSBcIkBhd3Mtc29sdXRpb25zLWNvbnN0cnVjdHMvYXdzLWxhbWJkYS1keW5hbW9kYlwiO1xyXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcclxuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XHJcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bWVCYWNrRW5kU3RhY2sgZXh0ZW5kcyBTdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zdCBjb25zdHJ1Y3RQcm9wczogTGFtYmRhVG9EeW5hbW9EQlByb3BzID0ge1xyXG4gICAgICBsYW1iZGFGdW5jdGlvblByb3BzOiB7XHJcbiAgICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KGBsYW1iZGFgKSxcclxuICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTZfWCxcclxuICAgICAgICBoYW5kbGVyOiBcInVwZGF0ZVZpc2l0b3JDb3VudC5oYW5kbGVyXCIsXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBkeW5hbW9UYWJsZVByb3BzOiB7XHJcbiAgICAgICAgdGFibGVOYW1lOiBcInZpc2l0b3JDb3VudFwiLFxyXG4gICAgICAgIHBhcnRpdGlvbktleToge1xyXG4gICAgICAgICAgbmFtZTogXCJjb3VudFwiLFxyXG4gICAgICAgICAgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbGFtYmRhVG9EeW5hbW9EQiA9IG5ldyBMYW1iZGFUb0R5bmFtb0RCKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBcInZpc2l0b3JDb3VudFwiLFxyXG4gICAgICBjb25zdHJ1Y3RQcm9wc1xyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCBcInJlc3VtZV9hcGlcIiwge1xyXG4gICAgICBoYW5kbGVyOiBsYW1iZGFUb0R5bmFtb0RCLmxhbWJkYUZ1bmN0aW9uLFxyXG4gICAgICBwcm94eTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xyXG4gICAgICAgIGFsbG93SGVhZGVyczogW1wiQ29udGVudC1UeXBlXCJdLFxyXG4gICAgICAgIGFsbG93TWV0aG9kczogW1wiT1BUSU9OU1wiLCBcIlBPU1RcIl0sXHJcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBbXCJodHRwczovL21pbG9rYXN0YWJsYW5rLmNvbVwiXSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGFwaS5yb290LmFkZE1ldGhvZChcIlBPU1RcIik7XHJcblxyXG4gICAgYXBpLmFkZFVzYWdlUGxhbihcIlVzYWdlUGxhblwiLCB7XHJcbiAgICAgIHRocm90dGxlOiB7XHJcbiAgICAgICAgcmF0ZUxpbWl0OiA1MCxcclxuICAgICAgICBidXJzdExpbWl0OiAyMCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient();
exports.handler = async () => {
    const params = {
        TableName: "visitorCount",
        Key: {
            count: "totalVisitors",
        },
        UpdateExpression: "SET visitors = if_not_exists(visitors, :initial) + :inc",
        ExpressionAttributeValues: {
            ":initial": 0,
            ":inc": 1,
        },
        ReturnValues: "UPDATED_NEW",
    };
    try {
        const data = await dynamoDb.update(params).promise();
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "https://milokastablank.com",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        };
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data),
        };
    }
    catch (error) {
        return {
            statusCode: 403,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "https://milokastablank.com",
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
            },
            body: `Unable to update Item ${error}`,
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlVmlzaXRvckNvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBkYXRlVmlzaXRvckNvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQTBCO0FBRTFCLE1BQU0sUUFBUSxHQUFHLElBQUksaUJBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFFbkQsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRTtJQUMzQixNQUFNLE1BQU0sR0FBRztRQUNiLFNBQVMsRUFBRSxjQUFjO1FBQ3pCLEdBQUcsRUFBRTtZQUNILEtBQUssRUFBRSxlQUFlO1NBQ3ZCO1FBQ0QsZ0JBQWdCLEVBQUUseURBQXlEO1FBQzNFLHlCQUF5QixFQUFFO1lBQ3pCLFVBQVUsRUFBRSxDQUFDO1lBQ2IsTUFBTSxFQUFFLENBQUM7U0FDVjtRQUNELFlBQVksRUFBRSxhQUFhO0tBQzVCLENBQUM7SUFFRixJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXJELE1BQU0sT0FBTyxHQUFHO1lBQ2QsOEJBQThCLEVBQUUsY0FBYztZQUM5Qyw2QkFBNkIsRUFBRSw0QkFBNEI7WUFDM0QsOEJBQThCLEVBQUUsb0JBQW9CO1NBQ3JELENBQUM7UUFFRixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPO1lBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQzNCLENBQUM7S0FDSDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLDhCQUE4QixFQUFFLGNBQWM7Z0JBQzlDLDZCQUE2QixFQUFFLDRCQUE0QjtnQkFDM0QsOEJBQThCLEVBQUUsb0JBQW9CO2FBQ3JEO1lBQ0QsSUFBSSxFQUFFLHlCQUF5QixLQUFLLEVBQUU7U0FDdkMsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFXUyBmcm9tIFwiYXdzLXNka1wiO1xyXG5cclxuY29uc3QgZHluYW1vRGIgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgVGFibGVOYW1lOiBcInZpc2l0b3JDb3VudFwiLFxyXG4gICAgS2V5OiB7XHJcbiAgICAgIGNvdW50OiBcInRvdGFsVmlzaXRvcnNcIixcclxuICAgIH0sXHJcbiAgICBVcGRhdGVFeHByZXNzaW9uOiBcIlNFVCB2aXNpdG9ycyA9IGlmX25vdF9leGlzdHModmlzaXRvcnMsIDppbml0aWFsKSArIDppbmNcIixcclxuICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcclxuICAgICAgXCI6aW5pdGlhbFwiOiAwLFxyXG4gICAgICBcIjppbmNcIjogMSxcclxuICAgIH0sXHJcbiAgICBSZXR1cm5WYWx1ZXM6IFwiVVBEQVRFRF9ORVdcIixcclxuICB9O1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGR5bmFtb0RiLnVwZGF0ZShwYXJhbXMpLnByb21pc2UoKTtcclxuXHJcbiAgICBjb25zdCBoZWFkZXJzID0ge1xyXG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIjogXCJDb250ZW50LVR5cGVcIixcclxuICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCJodHRwczovL21pbG9rYXN0YWJsYW5rLmNvbVwiLFxyXG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIjogXCJPUFRJT05TLCBQT1NULCBHRVRcIixcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICBoZWFkZXJzLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDQwMyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIkNvbnRlbnQtVHlwZVwiLFxyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiaHR0cHM6Ly9taWxva2FzdGFibGFuay5jb21cIixcclxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIjogXCJPUFRJT05TLCBQT1NULCBHRVRcIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogYFVuYWJsZSB0byB1cGRhdGUgSXRlbSAke2Vycm9yfWAsXHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuIl19
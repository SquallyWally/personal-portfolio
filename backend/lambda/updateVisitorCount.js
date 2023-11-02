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
            "Access-Control-Allow-Origin": "https://www.milokastablank.com",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        };
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data),
        };
    }
    catch (error) {
        console.log(`Unable to update Item ${error}`);
        return {
            statusCode: 403,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "https://www.milokastablank.com",
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
            },
            body: `Unable to update Item ${error}`,
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlVmlzaXRvckNvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBkYXRlVmlzaXRvckNvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQTBCO0FBRTFCLE1BQU0sUUFBUSxHQUFHLElBQUksaUJBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFFbkQsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRTtJQUMzQixNQUFNLE1BQU0sR0FBRztRQUNiLFNBQVMsRUFBRSxjQUFjO1FBQ3pCLEdBQUcsRUFBRTtZQUNILEtBQUssRUFBRSxlQUFlO1NBQ3ZCO1FBQ0QsZ0JBQWdCLEVBQUUseURBQXlEO1FBQzNFLHlCQUF5QixFQUFFO1lBQ3pCLFVBQVUsRUFBRSxDQUFDO1lBQ2IsTUFBTSxFQUFFLENBQUM7U0FDVjtRQUNELFlBQVksRUFBRSxhQUFhO0tBQzVCLENBQUM7SUFFRixJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXJELE1BQU0sT0FBTyxHQUFHO1lBQ2QsOEJBQThCLEVBQUUsY0FBYztZQUM5Qyw2QkFBNkIsRUFBRSxnQ0FBZ0M7WUFDL0QsOEJBQThCLEVBQUUsb0JBQW9CO1NBQ3JELENBQUM7UUFFRixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPO1lBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQzNCLENBQUM7S0FDSDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM5QyxPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsOEJBQThCLEVBQUUsY0FBYztnQkFDOUMsNkJBQTZCLEVBQUUsZ0NBQWdDO2dCQUMvRCw4QkFBOEIsRUFBRSxvQkFBb0I7YUFDckQ7WUFDRCxJQUFJLEVBQUUseUJBQXlCLEtBQUssRUFBRTtTQUN2QyxDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVdTIGZyb20gXCJhd3Mtc2RrXCI7XHJcblxyXG5jb25zdCBkeW5hbW9EYiA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICBUYWJsZU5hbWU6IFwidmlzaXRvckNvdW50XCIsXHJcbiAgICBLZXk6IHtcclxuICAgICAgY291bnQ6IFwidG90YWxWaXNpdG9yc1wiLFxyXG4gICAgfSxcclxuICAgIFVwZGF0ZUV4cHJlc3Npb246IFwiU0VUIHZpc2l0b3JzID0gaWZfbm90X2V4aXN0cyh2aXNpdG9ycywgOmluaXRpYWwpICsgOmluY1wiLFxyXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xyXG4gICAgICBcIjppbml0aWFsXCI6IDAsXHJcbiAgICAgIFwiOmluY1wiOiAxLFxyXG4gICAgfSxcclxuICAgIFJldHVyblZhbHVlczogXCJVUERBVEVEX05FV1wiLFxyXG4gIH07XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZHluYW1vRGIudXBkYXRlKHBhcmFtcykucHJvbWlzZSgpO1xyXG5cclxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIkNvbnRlbnQtVHlwZVwiLFxyXG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcImh0dHBzOi8vd3d3Lm1pbG9rYXN0YWJsYW5rLmNvbVwiLFxyXG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIjogXCJPUFRJT05TLCBQT1NULCBHRVRcIixcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICBoZWFkZXJzLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGBVbmFibGUgdG8gdXBkYXRlIEl0ZW0gJHtlcnJvcn1gKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDQwMyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIkNvbnRlbnQtVHlwZVwiLFxyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiaHR0cHM6Ly93d3cubWlsb2thc3RhYmxhbmsuY29tXCIsXHJcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCI6IFwiT1BUSU9OUywgUE9TVCwgR0VUXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IGBVbmFibGUgdG8gdXBkYXRlIEl0ZW0gJHtlcnJvcn1gLFxyXG4gICAgfTtcclxuICB9XHJcbn07XHJcbiJdfQ==
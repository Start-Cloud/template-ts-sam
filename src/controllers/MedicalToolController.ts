import { AwsUtil, LoggerUtil } from '@start-cloud/common-library-serverless/lib/helpers';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppValidator } from '@start-cloud/common-library-serverless/lib/validations';
import { MedicalToolValidator } from '../validators/MedicalToolValidator';
import MedicalToolService from '../services/MedicalToolService';
import { BusinessError } from '@start-cloud/common-library-serverless/lib/error';

export const bodyMassIndex = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        LoggerUtil.info('--- request bodyMassIndex ---');
        LoggerUtil.info(event);
        await AppValidator.validateRequest(event, MedicalToolValidator.bodyMassIndexValidator());
        const response = await MedicalToolService.calculateIMC(event);
        return AwsUtil.buildResponse(response);
    } catch (error) {
        LoggerUtil.error(error as object);
        return AwsUtil.buildErrorResponse(event, error as BusinessError);
    }
};

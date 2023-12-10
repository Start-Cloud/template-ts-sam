import { AwsUtil, LoggerUtil } from '@start-cloud/common-library-serverless/lib/helpers';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppValidator } from '@start-cloud/common-library-serverless/lib/validations';
import { MedicalToolValidator } from '../validators/MedicalToolValidator';
import MedicalToolService from '../services/MedicalToolService';

export const bodyMassIndex = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        LoggerUtil.info('--- request bodyMassIndex ---');
        LoggerUtil.info(event);
        await AppValidator.validateRequest(event, MedicalToolValidator.bodyMassIndexValidator());
        const response = await MedicalToolService.calculateIMC(event);
        return AwsUtil.buildResponse(response);
    } catch (error) {
        LoggerUtil.error(error);
        return AwsUtil.buildErrorResponse(event, error);
    }
};

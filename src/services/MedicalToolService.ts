import { AwsUtil, LoggerUtil } from '@start-cloud/common-library-serverless/lib/helpers';
import { APIGatewayProxyEvent } from 'aws-lambda';

type IMC_CATEGORY = {
    min: number;
    max: number;
};

const IMC_CATEGORIES: { [category: string]: IMC_CATEGORY } = {
    UNDERWEIGHT: { min: 0, max: 20 },
    NORMAL: { min: 20, max: 25 },
    OVERWEIGHT: { min: 25, max: 30 },
    OBESITY_CLASS_1: { min: 30, max: 35 },
    OBESITY_CLASS_2: { min: 35, max: 40 },
    OBESITY_CLASS_3: { min: 40, max: Number.POSITIVE_INFINITY },
};

export default class MedicalToolService {
    static async calculateIMC(event: APIGatewayProxyEvent) {
        const payload = AwsUtil.getRequest(event);
        const { height, weight, age } = payload;

        return this.getIMC(height, weight, age);
    }

    static async getIMC(height: number, weight: number, age: number) {
        const imc = Number((weight / (height * height)).toFixed(2));

        LoggerUtil.info(`El IMC es de ${imc}`);

        return {
            imc,
            category: this.getCategory(imc),
            age,
        };
    }

    static getCategory(imc: number) {
        for (const category in IMC_CATEGORIES) {
            if (IMC_CATEGORIES[category].min <= imc && imc < IMC_CATEGORIES[category].max) {
                return category;
            }
        }
        return null;
    }
}

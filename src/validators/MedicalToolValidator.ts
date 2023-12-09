import Joi from 'joi';

export class MedicalToolValidator {
    static bodyMassIndexValidator() {
        return Joi.object()
            .keys({
                height: Joi.number().positive().required(),
                weight: Joi.number().positive().required(),
            })
            .required();
    }
}

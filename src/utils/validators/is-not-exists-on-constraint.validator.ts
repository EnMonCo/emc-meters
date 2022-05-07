import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

type ValidationEntity =
  | {
      id?: number | string;
    }
  | undefined;

@ValidatorConstraint({ name: 'IsNotExistOnConstraint', async: true })
export class IsNotExistOnConstraint implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0] as string;
    const constraint = validationArguments.constraints[1] as string;
    const currentValue = validationArguments.object as ValidationEntity;
    const entity = (await getRepository(repository).findOne({
      [validationArguments.property]: value,
      [constraint]: currentValue[constraint],
    })) as ValidationEntity;

    if (entity?.id === currentValue?.id) {
      return true;
    }

    return !entity;
  }
}

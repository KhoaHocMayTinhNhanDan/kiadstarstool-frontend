// tests/units/03-adapters/Auth.controller.test.ts

import { AuthController } from '../../../src/03-interface-adapters/controllers/Auth.controller';
import { LoginInteractor } from '../../../src/02-usecases/usecases/authentication/Login.interactor';
import { AuthPresenter } from '../../../src/03-interface-adapters/presenters/auth/Auth.presenter';
import { MockAuthDriver } from '../../../src/04-frameworks-and-drivers/devices/auth/MockAuthDriver';
import { AuthRepository } from '../../../src/03-interface-adapters/gateways/repositories/AuthRepository';
import test, { beforeEach, describe } from 'node:test';
import { strict as assert } from 'node:assert';

describe('AuthController', () => {
  let authController: AuthController;
  let mockDriver: MockAuthDriver;
  let authPresenter: AuthPresenter;

  beforeEach(() => {
    mockDriver = new MockAuthDriver();
    const authRepository = new AuthRepository(mockDriver);
    authPresenter = new AuthPresenter();
    
    const loginInteractor = new LoginInteractor(authRepository, authPresenter);
    authController = new AuthController(loginInteractor);
  });

  test('should validate email correctly', () => {
    assert.equal(authController.validateEmail('test@example.com'), true);
    assert.equal(authController.validateEmail('invalid-email'), false);
    assert.equal(authController.validateEmail('test@'), false);
  });

  test('should validate password strength', () => {
    const weakResult = authController.validatePassword('weak');
    assert.equal(weakResult.isValid, false);
    assert(weakResult.errors.length > 0);

    const strongResult = authController.validatePassword('StrongPass123');
    assert.equal(strongResult.isValid, true);
    assert.equal(strongResult.errors.length, 0);
  });

  test('should handle login through controller', async () => {
    await authController.login({
      email: 'admin@example.com',
      password: 'password123'
    });
  });
});

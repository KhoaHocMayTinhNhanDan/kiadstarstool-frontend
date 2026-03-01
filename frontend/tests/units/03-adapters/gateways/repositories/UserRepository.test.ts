// src/03-interface-adapters/gateways/repositories/UserRepository.test.ts
import { UserRepository } from '../../../../../src/03-interface-adapters/gateways/repositories/UserRepository';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  describe('getById', () => {
    it('should return null (until DB is implemented)', async () => {
      const user = await repository.getById('unknown-id');

      expect(user).toBeNull();
    });
  });
});

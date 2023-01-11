import { ApiAuthClass } from './api-auth.class';
import { createMockedLocalStorage, expect, stub, stubClass } from '../../../test';
import { HttpClient } from '@angular/common/http';

describe('ApiAuthClass', () => {
  let cls: ApiAuthClass;
  let http: HttpClient;
  let mockedLocalStorage;

  beforeEach(() => {
    mockedLocalStorage = createMockedLocalStorage();

    cls = new ApiAuthClass(http = stubClass(HttpClient));
    stub(cls, 'getLocalStorage').callsFake(() => mockedLocalStorage);
  });

  it('should init the class', () => {
    return expect(cls).to.not.be.undefined;
  });

  describe('logout', () => {

    it('should purge storage and reset user data', () => {
      stub(cls, 'purgeStorage');
      cls.userData = {some: 'user data'} as any;

      cls.logout();

      return (expect(cls['purgeStorage']) as any).to.have.been.called &&
        expect(cls.userData).to.be.null;
    });
  });

  describe('getUserData', () => {
    it('should return one object key from user data if setted', () => {
      stub(cls, 'getStorage').callsFake(() => {
        return {someKey: 'some value'};
      });

      return expect(cls.getUserData('someKey')).to.be.deep.eq('some value');
    });

    it('should return the entire storage object', () => {
      stub(cls, 'getStorage').callsFake(() => {
        return {someKey: 'some value'};
      });

      return expect(cls.getUserData()).to.be.deep.eq({someKey: 'some value'});
    });
  });

  describe('isUserConnectedSameFrom', () => {
    it('should return true is user connected is same as param', () => {
      stub(cls, 'authenticated').callsFake(() => true);
      cls.userData = {id: 4};

      return expect(cls.isUserConnectedSameFrom(4)).to.be.true &&
        expect(cls.isUserConnectedSameFrom(1)).to.be.false;
    });

    it('should return false is user is not authenticated', () => {
      stub(cls, 'authenticated').callsFake(() => false);
      cls.userData = {id: 4};

      return expect(cls.isUserConnectedSameFrom(4)).to.be.false;
    });
  });

  describe('storeDataFromUserModel', () => {
    it('should store userdata into class and local storage', () => {
      stub(cls, 'setStorage');

      cls.storeDataFromUserModel({some: 'user data'} as any);

      return expect(cls.userData).to.be.deep.eq({some: 'user data'}) &&
        (expect(cls.setStorage) as any).to.have.been.calledWith(
          'userData', JSON.stringify(cls.userData)
        );
    });
  });

  describe('authenticated', () => {
    it('should return false if no jwt into localStorage', () => {
      stub(mockedLocalStorage, 'getItem').callsFake(() => false);

      return expect(cls.authenticated()).to.be.false;
    });

    it('should return false is token exists but expired', () => {
      stub(mockedLocalStorage, 'getItem').callsFake(() => 'a jwt');

      stub(cls.jwtHelper, 'isTokenExpired').callsFake(() => true);

      return expect(cls.authenticated()).to.be.false;
    });

    it('should return true is token exists and not expired', () => {
      stub(mockedLocalStorage, 'getItem').callsFake(() => 'a jwt');

      stub(cls.jwtHelper, 'isTokenExpired').callsFake(() => false);

      return expect(cls.authenticated()).to.be.true;
    });
  });

  describe('getUserData', () => {
    it('should return user data', () => {
      stub(mockedLocalStorage, 'getItem').callsFake(() => JSON.stringify({username: 'julien'}));

      return expect(cls.getParsedUserData()).to.be.deep.eq({username: 'julien'});

    });
  });

  describe('setStorage', () => {
    it('should set in local storage a keypair value', () => {
      stub(mockedLocalStorage, 'setItem');

      cls.setStorage('a key', 'a value');

      return (expect(mockedLocalStorage.setItem) as any).to.have.been.calledWith('a key', 'a value');
    });
  });

  describe('getStorageKey', () => {
    it('should get local storage item', () => {
      stub(mockedLocalStorage, 'getItem').callsFake(() => JSON.stringify({username: 'julien'}));

      const res = cls['getStorageKey']('a key');

      return expect(res).to.be.deep.eq(JSON.stringify({username: 'julien'}));
    });
  });

  describe('purgeStorage', () => {
    it('should purge jwt and userData from localStorage', () => {
      const storageStubClass = stub(mockedLocalStorage, 'removeItem');

      cls['purgeStorage']();

      return (expect(storageStubClass.getCall(0)) as any).to.have.been.calledWith('jwt') &&
        (expect(storageStubClass.getCall(1)) as any).to.have.been.calledWith('userData');
    });
  });
});

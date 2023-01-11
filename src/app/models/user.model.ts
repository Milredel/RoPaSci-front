export class UserModel {
  public id: number;
  public password: string;
  public username: string;

  constructor(id: number, username: string, password: string) {
    this.id = id;
    this.password = password;
    this.username = username;
  }

  public static fromAuthFormValue(formValues: any): UserModel {
    const userModel = new UserModel(
      null,
      formValues.username,
      formValues.password
    );

    return userModel;
  }

  public static fromAuthInfosResponse(response: any): UserModel {
    try {
      const userModel = new UserModel(
        response.id,
        response.username,
        null
      );
      return userModel;
    } catch (e) {
      throw new Error('Impossible d\'exploiter les informations du compte utilisateur récupérées.');
    }
  }
}

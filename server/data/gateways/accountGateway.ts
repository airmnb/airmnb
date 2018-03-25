import { DataGatewayBase } from "./DataGateway";

class AccountGateway extends DataGatewayBase<Account> {
  constructor(){
    super('users');
  }

  async find(name: string, password: string): Promise<Account> {
    const query = {name, password};
    const users = await this.repo().query(query, 1);
    if (users && users.length) {
      return users[0];
    }
    throw new Error(`Invalid sign in`);
  }
}

export const accountGateway = new AccountGateway();

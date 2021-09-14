import BaseService from "@core/class/BaseService";

class AuthService extends BaseService {

  public login = (body: Record<string, any>) => {
    return this.post("/admin/login", body);
  };

}

export default new AuthService("/api/auth", false);

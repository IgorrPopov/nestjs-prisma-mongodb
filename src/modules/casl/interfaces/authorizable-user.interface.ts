export interface AuthorizableUser<Roles = string, Id = string> {
  userId: Id;
  roles: Array<Roles>;
}

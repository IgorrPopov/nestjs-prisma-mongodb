import { InferSubjects } from '@casl/ability';

import { Actions, Permissions } from '@modules/casl';
import UserEntity from '@modules/user/entities/user.entity';
import { Roles } from '@modules/app/app.roles';

export type Subjects = InferSubjects<typeof UserEntity>;

export const permissions: Permissions<Roles, Subjects, Actions> = {
  everyone({ can }) {
    can(Actions.read, UserEntity);
    can(Actions.create, UserEntity);
  },

  CUSTOMER({ user: { userId }, cannot, can }) {
    // cannot(Actions.update, UserEntity);
    // can(Actions.update, UserEntity);

    can(Actions.update, UserEntity, { userId });
  },

  ADMIN({ can }) {
    can(Actions.update, UserEntity);
  },
};

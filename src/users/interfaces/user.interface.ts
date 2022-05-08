import { FileInterface } from './file.interface';
import { RoleInterface } from './role.interface';
import { StatusInterface } from './status.interface';

export interface UserInterface {
  id: number;
  email: string | null;
  provider: string;
  socialId: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: FileInterface | null;
  role?: RoleInterface | null;
  status?: StatusInterface;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

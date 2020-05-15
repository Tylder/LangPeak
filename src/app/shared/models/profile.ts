export enum ProfileType {
  TEACHER = 'teacher',
  STUDENT = 'student',
  ADMIN = 'admin',
}

export class Profile {
  id?: string;
  type: ProfileType[];
  userName: string;
  email: string;
  firstName: string;
  LastName: string;
}

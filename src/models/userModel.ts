import { Profile } from "./profile";

export interface UserModel {
    username: string;
    role: 'USER' | 'ADMIN';
    profile: Profile;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
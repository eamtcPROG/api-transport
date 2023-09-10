// import { UserSettingsDto } from "src/user/dto/usersettings.dto";

export type JwtPayload = {
  id: string;
  email: string;
  rolesid: string[];
  usersettings: any;
  // usersettings: UserSettingsDto;
  
};


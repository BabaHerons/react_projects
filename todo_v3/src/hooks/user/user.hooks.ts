import { hookFactory } from "../hookFactory";
import { userApi } from "../../api/user/user.api";
import type { User } from "../../api/user/user.types";

export const userHooks = hookFactory<User>(['users'], userApi)
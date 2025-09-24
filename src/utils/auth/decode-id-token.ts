import { failure, Result, success } from "@/types/result";
import { User, userSchema } from "@/types/user";

export default function decodeIdToken(
  idToken: string | null,
): Result<User | null> {
  try {
    if (idToken === null) {
      return success(null);
    }

    const idTokenPayload = idToken.split(".")[1];

    const jsonPayload = atob(idTokenPayload);
    const jsonBody = JSON.parse(jsonPayload);

    const user = userSchema.parse(jsonBody);

    return success(user);
  } catch (error) {
    return failure(error);
  }
}

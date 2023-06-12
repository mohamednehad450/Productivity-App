import React, { FC, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { routes } from ".";
import { useAuth } from "../API";
import { Button, TextInput } from "../components/common";

import type { UserError as ApiUserError } from "../API";

interface UserError extends ApiUserError {
  confirm?: string[];
}

const Register: FC = () => {
  useEffect(() => {
    document.title = "Register";
  }, []);

  let auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState<UserError | undefined>();

  if (auth.user) {
    return <Redirect to={routes.APP} />;
  }
  return (
    <div className="container-sm">
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <div className="col">
          <TextInput
            className="ver-margin stretch"
            placeholder="Username"
            onChange={(s) => {
              setUsername(s);
              error?.username && setError({ ...error, username: undefined });
            }}
            errors={error?.username}
            value={username}
            autoComplete="off"
          />
          <TextInput
            placeholder="Password"
            className="ver-margin stretch"
            onChange={(password) => {
              setPassword(password);
              error?.password && setError({ ...error, password: undefined });
            }}
            errors={error?.password}
            value={password}
            type="password"
            autoComplete="new-password"
          />
          <TextInput
            placeholder="Confirm Password"
            className="ver-margin stretch"
            onChange={(confirm) => {
              setConfirm(confirm);
              error?.confirm && setError({ ...error, confirm: undefined });
            }}
            value={confirm}
            type="password"
            errors={error?.confirm}
            autoComplete="new-password"
          />
        </div>
        <div className="col ver-margin">
          <Button
            type="primary"
            className="btn-row"
            onClick={() => {
              if (username && password && password === confirm) {
                auth
                  .register(username, password)
                  .then((err) => err && setError(err));
              } else {
                const err: UserError = {};
                if (password !== confirm) {
                  err.confirm = ["Confirmation must match password."];
                }
                if (!username) {
                  err.username = ["This field can't be blank"];
                }
                if (!password) {
                  err.password = ["This field can't be blank"];
                }
                setError(err);
              }
            }}
          >
            Register
          </Button>
          <Link to={routes.SIGININ}>
            Already have an Account? Sign in here.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

"use client";

import { Form, Formik } from "formik";
import Button, { ButtonColor } from "../global/Button";
import Card from "../global/Card";
import FormikInput from "../global/forms/formik/FormikInput";
import useLogin from "@/hooks/useLogin";
import { Credentials } from "@/types";
import * as Yup from "yup";

const LoginPage = () => {
  const { isLoading, authenticate } = useLogin();

  const onSubmit = (values: Credentials) => {
    authenticate(values);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-20">
      <Card customClassNames="max-w-lg">
        <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Login
        </h5>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={onSubmit}
        >
          {() => {
            return (
              <Form>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <FormikInput
                      label="Username"
                      name="username"
                      placeholder="Enter your username"
                    />
                    <FormikInput
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      label="Login"
                      color={ButtonColor.LIGHT}
                      customClassNames="w-full"
                      processing={isLoading}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};

export default LoginPage;

"use client";

import useUpload from "@/hooks/useUpload";
import { SetState, UploadPageView } from "@/types";
import {
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { Uploader } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import * as Yup from "yup";
import Button, { ButtonColor, ButtonSize } from "../global/Button";
import Card from "../global/Card";
import RenderIf from "../global/RenderIf";
import { InputSize } from "../global/forms/Input";
import FormikInput from "../global/forms/formik/FormikInput";
import MountTransition from "../global/transitions/MountTransition";
import { useRouter } from "next/navigation";
import Routes from "@/constants/routes.constants";

const fileInfoRenderer = (file: FileType) => {
  return (
    <div>
      <span>{file.name}</span>
      <p className="text-xs">{`${((file.blobFile?.size || 0) / 1024).toFixed(
        2
      )} KB`}</p>
    </div>
  );
};

const UploadForm = ({ setView }: { setView: SetState<UploadPageView> }) => {
  const [fileList, setFileList] = React.useState<FileType[]>([]);

  const fileUploadDisabled = fileList.length > 0;

  const { uploadFile, isLoading } = useUpload(() => {
    setView("success-message");
  });

  const formInitialValues: { emails: string[] } = { emails: [] };

  const validationSchema = Yup.object().shape({
    emails: Yup.array().of(
      Yup.string().email("Email is invalid").required("Required")
    ),
  });

  const handleSubmit = (values: typeof formInitialValues) => {
    const payload = new FormData();
    payload.set("file", fileList[0].blobFile || "");
    payload.set("emails", JSON.stringify(values.emails));
    uploadFile(payload);
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      validateOnMount={false}
      enableReinitialize={true}
    >
      {(formik) => {
        return (
          <Form>
            <Uploader
              fileList={fileList}
              listType="picture-text"
              autoUpload={false}
              //action={`${API_SERVER_URL}/upload`}
              action=""
              onChange={setFileList}
              disabled={fileUploadDisabled}
              withCredentials={false}
              renderFileInfo={fileInfoRenderer}
              draggable
            >
              {!fileUploadDisabled ? (
                <div
                  style={{
                    height: 200,
                  }}
                >
                  <div className="border-dashed border-2 border-slate-300 hover:border-blue-500 dark:border-slate-400 dark:hover:border-blue-600 w-full h-full flex items-center justify-center rounded-lg cursor-pointer">
                    Click or Drag files to this area to upload
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </Uploader>
            <FieldArray name="emails">
              {(helpers) => {
                return (
                  <div className="space-y-4 my-4">
                    {formik.values.emails.map((email, idx) => {
                      return (
                        <MountTransition
                          className="flex gap-x-4 items-center"
                          key={`${idx}`}
                        >
                          <FormikInput
                            //label={`Enter email ${idx + 1}`}
                            name={`emails.${idx}`}
                            placeholder={`Enter email ${idx + 1}`}
                            containerClassNames="grow"
                            size={InputSize.SMALL}
                          />
                          <TrashIcon
                            className="h-5 w-5 text-red-500 hover:animate-pulse cursor-pointer"
                            onClick={() => helpers.remove(idx)}
                          />
                        </MountTransition>
                      );
                    })}
                    {formik.values.emails.length < 5 && (
                      <Button
                        type="button"
                        label="Add an email"
                        color={ButtonColor.LIGHT}
                        Icon={PlusIcon}
                        size={ButtonSize.SMALL}
                        onClick={() => helpers.push("")}
                      />
                    )}
                  </div>
                );
              }}
            </FieldArray>
            <Button
              type="submit"
              label="Start Upload"
              customClassNames="w-full mt-10"
              disabled={!fileUploadDisabled}
              processing={isLoading}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

const SuccessMessage = ({ setView }: { setView: SetState<UploadPageView> }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-6 items-center">
      <div className="flex items-center justify-center gap-x-2">
        <CheckCircleIcon className="h-10 w-10 text-green-500" />
        <span className="text-2xl font-semibold dark:text-white">
          Upload Successful
        </span>
      </div>
      <div className="self-stretch flex flex-col gap-y-6">
        <Button label="Upload another file" onClick={() => setView("upload")} />
        <Button
          label="View uploaded attachments"
          onClick={() => router.push(Routes.attachments)}
        />
      </div>
    </div>
  );
};

const UploadPage = () => {
  const [view, setView] = React.useState<UploadPageView>("upload");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-20">
      <Card customClassNames="max-w-lg">
        <div className="space-y-10">
          <div>
            <RenderIf isTrue={view === "upload"}>
              <UploadForm setView={setView} />
            </RenderIf>
            <RenderIf isTrue={view === "success-message"}>
              <SuccessMessage setView={setView} />
            </RenderIf>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UploadPage;

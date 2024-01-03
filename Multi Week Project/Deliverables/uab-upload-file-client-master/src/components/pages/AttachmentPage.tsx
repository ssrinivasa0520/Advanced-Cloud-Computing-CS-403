"use client";

import useAttachments from "@/hooks/useAttachments";
import { Attachment } from "@/types";
import { Spinner } from "flowbite-react";
import React from "react";
import Card from "../global/Card";
import RenderIf from "../global/RenderIf";
import Table from "../global/Table";
import useGeneratePresignedLink from "@/hooks/useGeneratePresignedLink";
import { getFormattedLocalDateTime } from "@/utils";

const AttachmentLink = ({ attachmentId }: { attachmentId: number }) => {
  const [link, setLink] = React.useState<string>("");
  const { fetchStatus, generateLink, presignedLink } = useGeneratePresignedLink(
    attachmentId,
    (link) => setLink(link)
  );

  const isLoading = fetchStatus === "fetching";
  return (
    <div className="w-24">
      <RenderIf isTrue={link === ""}>
        <div className="flex gap-2 items-center">
          {!isLoading && (
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={generateLink}
            >
              Generate
            </span>
          )}
          {isLoading && (
            <>
              <Spinner className="h-3 w-3" />
              <span className="text-blue-500 hover:underline">Generating</span>
            </>
          )}
        </div>
      </RenderIf>
      <RenderIf isTrue={link !== ""}>
        <div className="flex gap-1 items-center">
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => {
              window.open(presignedLink, "_blank");
            }}
          >
            View
          </span>
        </div>
      </RenderIf>
    </div>
  );
};

const AttachmentPage = () => {
  const { isLoading, isError, isSuccess, data: attachments } = useAttachments();

  const columnConfig = [
    { title: "File Name", colName: "filename" },
    {
      title: "Created At",
      colName: "createdat",
      formatter: (value: string) => getFormattedLocalDateTime(value),
    },
    {
      title: "Link",
      colName: "link",
      formatter: (_value: string, row: Attachment) => (
        <AttachmentLink attachmentId={row.id} />
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-20">
      <Card customClassNames="max-w-4xl">
        <RenderIf isTrue={isLoading}>
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        </RenderIf>
        <RenderIf isTrue={isSuccess}>
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Attachments
          </h5>
          <Table columns={columnConfig} rows={attachments || []} />
        </RenderIf>
      </Card>
    </div>
  );
};

export default AttachmentPage;

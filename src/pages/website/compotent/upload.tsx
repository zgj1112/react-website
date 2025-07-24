// UploadComponent.tsx
import React, { useEffect, useState } from "react";
import { Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
// import { UploadType } from "./UploadType"; // 定义同 Vue 中的 UploadType
import { UploadApi } from "@api/home"; // 假设为封装的上传 API
// 定义上传类型枚举
enum UploadType {
  SingleImage = "single-image",
  MultipleImages = "multiple-images",
  SingleFile = "single-file",
  MultipleFiles = "multiple-files",
}

interface Props {
  type?: UploadType;
  value?: UploadFile[]; // ✅ 接收 Form 的值
  onChange?: (fileList: UploadFile[]) => void;
}

const UploadComponent: React.FC<Props> = ({
  type = UploadType.MultipleImages,
  value = [],
  onChange,
}) => {
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(value);

  useEffect(() => {
    console.log(value);

    setInternalFileList(value);
  }, [value]);

  const isImageType = [
    UploadType.SingleImage,
    UploadType.MultipleImages,
  ].includes(type);

  const uploadConfig: UploadProps = {
    listType: isImageType ? "picture-card" : "text",
    showUploadList: true,
    multiple: [UploadType.MultipleImages, UploadType.MultipleFiles].includes(
      type
    ),
    maxCount: [UploadType.SingleImage, UploadType.SingleFile].includes(type)
      ? 1
      : undefined,
    accept: type.includes("image") ? ".png,.jpg,.jpeg,.svg" : "",

    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;
      try {
        const res = await UploadApi(file as RcFile);
        if (res.code == 200) {
          const imageUrl =
            import.meta.env.MODE == "development"
              ? `http://192.168.0.7${res.data}`
              : res.data;

          const newFile: UploadFile = {
            uid: (file as RcFile).uid,
            name: (file as RcFile).name,
            status: "done",
            size: (file as RcFile).size,
            url: imageUrl,
            lastModified: (file as RcFile).lastModified,
            lastModifiedDate: new Date(),
          };
          console.log(111, newFile);

          // 处理重复问题
          const updatedList = [...internalFileList];
          const index = updatedList.findIndex(
            (item) => item.uid == newFile.uid
          );
          if (index > -1) {
            updatedList[index] = newFile;
          } else {
            updatedList.push(newFile);
          }

          setInternalFileList(updatedList);
          onChange?.(updatedList);
          message.success("上传成功！");
          // onSuccess && onSuccess({}, newFile as any);
        } else {
          message.error("上传失败！");
          onError?.(new Error("上传失败"));
        }
      } catch (error) {
        message.error("上传出错！");
        onError?.(error as Error);
      }
    },
    onChange(info) {
      const updatedList = info.fileList.filter(
        (file) => file.status !== "removed"
      );
      setInternalFileList(updatedList);
      onChange?.(updatedList); // ✅ 通知 Form 更新表单值
    },
  };

  return (
    <Upload {...uploadConfig} fileList={internalFileList}>
      {uploadConfig.listType == "picture-card" ? (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>上传</div>
        </div>
      ) : (
        <Button icon={<PlusOutlined />}>上传文件</Button>
      )}
    </Upload>
  );
};
export default UploadComponent;

/*
 * @Author: zgj888 2369394195@qq.com
 * @Date: 2025-07-21 17:18:41
 * @LastEditors: zgj888 2369394195@qq.com
 * @LastEditTime: 2025-07-22 17:07:19
 * @FilePath: \official_websited:\shwork\work\website-react\src\pages\website\product\modal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useImperativeHandle, forwardRef } from "react";
import type { ProductDataType } from "./table";

// type Props = {
//   onOk: (values: ProductDataType) => void;
//   onCancel: () => void;
// };

export type ProductModalRef = {
  openModal: (data?: ProductDataType) => void;
};

type Props = {
  title?: "";
};

const ProductModal = forwardRef<ProductModalRef, Props>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm<ProductDataType>();

  const openModal = (formData?: ProductDataType) => {
    if (formData) {
      form.setFieldsValue(formData);
    } else {
      form.resetFields();
    }
    setVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <Modal
      title="编辑产品"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="model"
          label="型号"
          rules={[{ required: true, message: "请输入型号" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="name" label="名称">
          <Input />
        </Form.Item>
        <Form.Item name="title" label="标题">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="image" label="上传展示图">
          <Upload beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>上传</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ProductModal;

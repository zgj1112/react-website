import ProductTable from "./table"; // 假设 table.tsx 在 src/components 文件夹中
import ProductModal, { ProductModalRef } from "./modal";
import { useRef } from "react";
import { Button } from "antd";
import type { ProductDataType } from "./table";

const ProductIndex = () => {
  const modalRef = useRef<ProductModalRef>(null); //dom获取
  // const timer = useRef<null|NodeJS.Timeout>(null)//还可以用于数据存储

  const handleAddNew = () => {
    // 调用子组件的 openModal 方法，不传入数据表示新增
    modalRef.current?.openModal();
  };

  const handleEdit = (record: ProductDataType) => {
    // 调用子组件的 openModal 方法，传入数据表示编辑
    modalRef.current?.openModal(record);
  };

  // function onOk(values: ProductDataType) {
  //   console.log("OK, received values:", values);
  //   // 在这里你可以处理表单提交后的逻辑，比如调用API保存数据，然后刷新列表等
  // }

  // function onCancel() {
  //   console.log("Cancel");
  // }

  return (
    <div>
      <h1>产品列表</h1>
      {/* <Button
        onClick={handleAddNew}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        新增产品
      </Button>
      <Button
      
        style={{ marginLeft: 8 }}
      >
        编辑示例产品
      </Button> */}

      <ProductTable onEdit={handleEdit} />
      <ProductModal ref={modalRef} />
    </div>
  );
};

export default ProductIndex;

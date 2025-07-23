/*
 * @Author: zgj888 2369394195@qq.com
 * @Date: 2025-07-21 16:59:00
 * @LastEditors: zgj888 2369394195@qq.com
 * @LastEditTime: 2025-07-22 17:06:36
 * @FilePath: \official_websited:\shwork\work\website-react\src\pages\website\product\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ProductTable from "./table"; // 假设 table.tsx 在 src/components 文件夹中
import ProductModal, { ProductModalRef } from "./modal";
import { useRef } from "react";
import { Button } from "antd";
import type { ProductDataType } from "./table";

const ProductIndex = () => {
  const modalRef = useRef<ProductModalRef>(null);

  const handleAddNew = () => {
    // 调用子组件的 openModal 方法，不传入数据表示新增
    modalRef.current?.openModal();
  };

  const handleEdit = (record: ProductDataType) => {
    // 调用子组件的 openModal 方法，传入数据表示编辑
    // console.log(1111,record);
    modalRef.current?.openModal(record);
  };

  function onOk(values: ProductDataType) {
    console.log("OK, received values:", values);
    // 在这里你可以处理表单提交后的逻辑，比如调用API保存数据，然后刷新列表等
  }

  function onCancel() {
    console.log("Cancel");
  }

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
      <ProductModal ref={modalRef}  />
    </div>
  );
};

export default ProductIndex;

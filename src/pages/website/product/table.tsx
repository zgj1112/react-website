import { Carousel, message, UploadFile, Button, Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GetCountent, CountentListType } from "@api/home";
// import "./product.scss";
import styles from "./product.module.scss";
import { useEffect, useState } from "react";

export interface ProductDataType {
  key?: string; // antd table 需要的key
  id: string; // 产品ID
  model?: string; //型号
  name: string; // 产品名称（此处先留空）
  title?: string; //中文标题名
  image?: UploadFile[]; // 产品展示页图片路径
  imageList?: UploadFile[]; // 产品详情页图片路径多张
  imgstyle?: string;
  description?: string; // 可选：产品描述
  text?: string; //详情描述
  type?: string;
  status?: number | null;
  priority?: number;
  detialcenter?: {
    title: string;
    text: string;
    file: UploadFile[];
  }[]; //详情页中间图片
  // specs?: ProductSpecItem[]; // 新增：产品参数
  // download?: ProductDownloadType[]; // 新增：下载信息
  createTime?: string;
  updateTime?: string;
  // 可扩展更多字段
}

// 初始化数据
type bodytype = {
  moduleId: string;
};

type PropsData = {
  onEdit: (data: ProductDataType) => void;
};

const ProductTable: React.FC<PropsData> = ({ onEdit }) => {
  const columns: ColumnsType<ProductDataType> = [
    {
      title: "产品ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "型号",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "展示图数量",
      dataIndex: "image",
      key: "image",
      render: (images) => images?.length || 0,
    },
    {
      title: "详情图数量",
      dataIndex: "imageList",
      key: "imageList",
      render: (images) => images?.length || 0,
    },
    {
      title: "样式",
      dataIndex: "imgstyle",
      key: "imgstyle",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "详情描述",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 160,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handelEdit?.(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => onDelete?.(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  function handelEdit(data: ProductDataType) {
    onEdit(data);
  }

  function onDelete(data: ProductDataType) {
    console.log(data);
    const newData = productData.filter((item) => item.id != data.id);
    setproductData(newData);
  }

  const [productData, setproductData] = useState<ProductDataType[]>([]);
  // const [messageApi, contextHolder] = message.useMessage();

  const initData = () => {
    const body: bodytype = {
      moduleId: "1939983926311292929",
    };
    GetCountent(body).then((res) => {
      if (res.code == 200) {
        // message.error("页面未进行配置，请联系管理员配置");
        if (res.data.length > 0) {
          let filterData: ProductDataType[] = [];
          res.data.forEach((item) => {
            let data: ProductDataType = JSON.parse(item.content);
            filterData.push(data);
          });
          console.log(111, filterData);
          // message.success("1111");
          setproductData(filterData);
        }
        // else {
        //   // message.error("页面未进行配置，请联系管理员配置");
        //   // Object.assign(productData, defaultData);
        // }
      }
    });
  };

  // ✅ 初始化调用
  useEffect(() => {
    initData(); // 组件挂载后自动调用
  }, []); // 依赖数组为空，确保只调用一次

  return (
    <>
      <div className={styles.tablebox}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={productData}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </>
  );
};

export default ProductTable;

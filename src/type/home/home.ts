import type { UploadFile } from "antd";

import firstbcc1 from "@assets/images/home/firstbcc1.png";
import firstbcc2 from "@assets/images/home/firstbcc2.png";
import firstbcc3 from "@assets/images/home/firstbcc3.png";
import centerbcc1 from "@assets/images/home/centerbcc1.png";
import centerpng1 from "@assets/images/home/centerpng1.png";
import centerpng2 from "@assets/images/home/centerpng2.png";
import centerpng3 from "@assets/images/home/centerpng3.png";
import centerpng4 from "@assets/images/home/centerpng4.png";
import lastbcc1 from "@assets/images/home/lastbcc1.png";

// 基本类型
interface ProductItem {
  img: UploadFile[];
  title: string;
  text: string;
}
interface titleType {
  cn: string;
  en: string;
}

export interface HomeType {
  id: string;
  bannerImgArr: UploadFile[];
  bannerVideo: UploadFile[];
  productCenter: {
    title: titleType;
    background: UploadFile[];
    productItem: ProductItem[];
  };
  profile: {
    background?: UploadFile[];
    title: titleType;
    imageData: {
      url: UploadFile[];
      style: string;
    };
    describe: string[];
  };
}

export const HomeList: HomeType = {
  id: "",
  bannerImgArr: [
    { uid: "", name: "", url: firstbcc1 },
    { uid: "", name: "", url: firstbcc2 },
    { uid: "", name: "", url: firstbcc3 },
  ],
  bannerVideo: [],
  productCenter: {
    background: [{ uid: "", name: "", url: centerbcc1 }],
    title: {
      cn: "我们的产品",
      en: "OUR PRODUCTS",
    },
    productItem: [
      {
        img: [{ uid: "", name: "", url: centerpng1 }],
        title: "无人驾驶航空器远程识别模块",
        text: "能快速、准确的向地面监管系统发送无人机相关信息，适用于所有无人机的特点",
      },
      {
        img: [{ uid: "", name: "", url: centerpng2 }],
        title: "远程识别地面接收站",
        text: "通过监管模块将飞行动态参数、注册信息、数字签名认证信息等进行广播",
      },
      {
        img: [{ uid: "", name: "", url: centerpng3 }],
        title: "低空无人驾驶航空器数据监管中心",
        text: "将无人机技术与云计算相结合，实现对监控任务的远程控制、数据存储和分析的系统",
      },
      {
        img: [{ uid: "", name: "", url: centerpng4 }],
        title: "远程识别产品管理软件",
        text: "提供实时的监控、追踪和报告等功能，以确保无人机的安全和合规性",
      },
    ],
  },
  profile: {
    title: {
      cn: "我们的产品",
      en: "OUR PRODUCTS",
    },
    describe: [
      "成都数航科技有限公司成立于2021年，是深圳市高巨创新科技开发有限公司在西南地区的子公司，是一家专注于低空领域的科技型企业。",
      "公司充分调研国内外低空监管技术手段和监管要求，结合国内实际低空运行需求，开展低空飞行安全保障技术研究和产品研发，现已形成重点区域低空监管解决方案、机载远程识别产品、远程识别地面接收站等系列产品，已获软著11项，申请专利15项。公司致力于成为低空监管解决方案及产品提供商，为低空经济的健康发展提供有力保障。",
    ],
    background: [{ uid: "", name: "", url: lastbcc1 }],
    imageData: {
      url: [{ uid: "", name: "", url: lastbcc1 }],
      style: "width: 600px; height: 350px",
    },
  },
};

// 重置数据
export function resetHomeData(): HomeType {
  return {
    id: "",
    bannerImgArr: [],
    bannerVideo: [],
    productCenter: {
      background: [],
      title: {
        cn: "",
        en: "",
      },
      productItem: [
        {
          img: [],
          title: "",
          text: "",
        },
      ],
    },
    profile: {
      title: {
        cn: "",
        en: "",
      },
      describe: [],
      background: [],
      imageData: {
        url: [],
        style: "",
      },
    },
  };
}
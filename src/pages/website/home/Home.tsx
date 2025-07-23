// import firstbcc1 from "@assets/images/home/firstbcc1.png";
// import firstbcc2 from "@assets/images/home/firstbcc2.png";
// import firstbcc3 from "@assets/images/home/firstbcc3.png";
import { Carousel, message, UploadFile } from "antd";
import { GetCountent, CountentListType } from "@api/home";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";

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

const onChange = (currentSlide: number) => {
  console.log(currentSlide);
};

// 初始化数据
type bodytype = {
  moduleId: string;
};

const Home = () => {
  const [homeData, setHomeData] = useState<HomeType | null>(null);
  // const [messageApi, contextHolder] = message.useMessage();

  const initData = () => {
    const body: bodytype = {
      moduleId: "1942780749354643457",
    };
    GetCountent(body).then((res) => {
      if (res.code == 200) {
        // message.error("页面未进行配置，请联系管理员配置");
        if (res.data.length > 0) {
          let data = JSON.parse(res.data[0].content);
          setHomeData(data);
        } else {
          // message.error("页面未进行配置，请联系管理员配置");
          // Object.assign(homeData, defaultData);
        }
      }
    });
  };

  // ✅ 初始化调用
  useEffect(() => {
    initData(); // 组件挂载后自动调用
  }, []); // 依赖数组为空，确保只调用一次

  return (
    <>
      <div className={styles.carousel}>
        <Carousel arrows afterChange={onChange}>
          {homeData?.bannerImgArr?.map((item) => (
            <div key={item.uid}>
              <img src={item.url} alt="图片描述" />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Home;

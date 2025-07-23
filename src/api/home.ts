import request from "@utils/request";
import { responseType } from "@utils/request";
import qs from "qs";

export const managerApi: { [key: string]: string } = {
  uploadimg: "/websiteServer/file/upload",
  addContent: "/websiteServer/systemModuleContent/add",
  getContent: "/websiteServer/systemModuleContent/list",
  deleteContent: "/websiteServer/systemModuleContent/delete",
  editContent: "/websiteServer/systemModuleContent/edit",

  addmodule: "/websiteServer/systemModule/add",
  editmodule: "/websiteServer/systemModule/edit",
  getmodule: "/websiteServer/systemModule/list",
  deletemodule: "/websiteServer/systemModule/delete",
};

// 上传图片接口
export async function UploadApi(file: File): Promise<responseType<string>> {
  const formData = new FormData();
  formData.append("file", file);
  const resp = await request.post(managerApi.uploadimg, formData);
  return resp.data;
}

// 新增模块内容
export async function AddContent(
  query: GetCountentType
): Promise<responseType<string>> {
  // const queryString = qs.stringify(data); // 转换为 query 字符串
  // const url = `${managerApi.addContent}?${queryString}`; // 拼接 URL
  // const resp = await request.post(url); // 不需要传 body
  const resp = await request.post(managerApi.addContent, query); // 不需要传 body
  return resp.data;

  // const resp = await request.post(managerApi.addContent, data);
  // return resp.data;
}

export interface CountentListType {
  id: string;
  moduleId: number;
  title: string;
  content: string;
  titleClass: string;
  ContentClass: string;
  status: number;
  sort: number;
  creatorId: number;
  updaterId: number;
  createTime: string;
  updateTime: string;
  deleted: number;
}

export interface GetCountentType {
  // id?: string;
  moduleId: string;
  content?: string;
  // moduleCode: string;
  // moduleName: string;
  // moduleClass: string;
  // status: number | undefined;
  // sort: number | null;
  // path: string;
}
// 获取模块接口
export async function GetCountent(
  data: GetCountentType
): Promise<responseType<CountentListType[]>> {
  const queryString = qs.stringify(data); // 转换为 query 字符串
  const url = `${managerApi.getContent}?${queryString}`; // 拼接 URL
  const resp = await request.get(url); // 不需要传 body

  return resp.data;
}

// 删除模块接口
export async function DeleteCountent(
  id: string
): Promise<responseType<string>> {
  let body = {
    ids: id,
  };
  const queryString = qs.stringify(body); // 转换为 query 字符串
  const url = `${managerApi.deleteContent}?${queryString}`; // 拼接 URL
  const resp = await request.post(url); // 不需要传 body
  return resp.data;
}

// 编辑模块接口
export interface EditCountentType {
  id: string;
  moduleId: string;
  content: string;
  // moduleCode: string;
  // moduleName: string;
  // moduleClass: string;
  // status: number;
  // sort: number;
  // path: string;
}
export async function EditCountent(
  query: EditCountentType
): Promise<responseType<string>> {
  // const queryString = qs.stringify(query); // 转换为 query 字符串
  // const url = `${managerApi.editContent}?${queryString}`; // 拼接 URL
  const resp = await request.post(managerApi.editContent, query); // 不需要传 body
  return resp.data;
}

// 新增模块接口
export interface AddModuleType {
  id?: string;
  parentId: number;
  moduleCode: string;
  moduleName: string;
  moduleClass: string;
  status: number | undefined;
  sort: number | null;
  path: string;
}
export async function AddModule(
  data: AddModuleType
): Promise<responseType<string>> {
  // console.log(data);
  const queryString = qs.stringify(data); // 转换为 query 字符串
  const url = `${managerApi.addmodule}?${queryString}`; // 拼接 URL
  const resp = await request.post(url); // 不需要传 body

  return resp.data;
}

// 获取模块接口
export async function GetModule(
  data: any
): Promise<responseType<ModuleListType[]>> {
  const resp = await request.get(managerApi.getmodule, data);
  return resp.data;
}

// 编辑模块
export async function EditModule(
  data: AddModuleType
): Promise<responseType<string>> {
  // console.log(data);
  const queryString = qs.stringify(data); // 转换为 query 字符串
  const url = `${managerApi.editmodule}?${queryString}`; // 拼接 URL
  const resp = await request.post(url); // 不需要传 body
  return resp.data;
}

// 删除模块接口
export async function DeleteModule(id: string): Promise<responseType<string>> {
  const body:any = {
    ids: id,
  };
  const queryString = qs.stringify(body); // 转换为 query 字符串
  const url = `${managerApi.deletemodule}?${queryString}`; // 拼接 URL
  const resp = await request.post(url); // 不需要传 body
  return resp.data;
}

export interface ModuleListType {
  id: string;
  parentId: number;
  moduleCode: string;
  moduleName: string;
  moduleClass: string;
  path: string;
  status: number;
  sort: number;
  creatorId: number;
  updaterId: number;
  createTime: string; // 可以改为 Date 类型，视后端返回而定
  updateTime: string; // 同上
  deleted: number;
}

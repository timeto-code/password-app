"use server";

import path from "path";
import dotenv from "dotenv";

export const loadEnv = () => {
  const usbDrivePath = "F:\\";
  const envFilePath = path.join(usbDrivePath, "密钥", ".env");

  // 使用dotenv读取.env文件
  const result = dotenv.config({ path: envFilePath });

  if (result.error) {
    console.error("读取.env文件时出错:", result.error);
    return { error: "密钥读取识别失败" };
  }

  return { sucess: "密钥读取识别成功" };
};

"use server";

import dotenv from "dotenv";

export const loadEnv = async () => {
  // 使用dotenv读取.env文件
  const result = dotenv.config({ path: process.env.KEY_PATH });

  if (result.error) {
    console.error("读取.env文件时出错:", result.error);
    return { error: "密钥读取识别失败" };
  }

  return { sucess: "密钥读取识别成功" };
};

import { cn } from "@/lib/utils";
import { CheckCircle, EyeIcon } from "lucide-react";
import React, { useEffect } from "react";

interface CredentialFieldProps {
  label: string; // 标签
  value: string; // 值
  isPassword?: boolean; // 是否为密码字段
}

const CredentialField = ({
  label,
  value,
  isPassword,
}: CredentialFieldProps) => {
  const [copy, setCopy] = React.useState(false); // 是否已复制到剪贴板
  const [hidePassword, setHidePassword] = React.useState(true); // 是否隐藏密码

  const palceholder = value.replace(/./g, "✽"); // 用✽替换值，用于密码字段的占位符

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(value); // 将值复制到剪贴板
    setCopy(true);
  };

  const toggleShowPassword = () => {
    setHidePassword(!hidePassword); // 切换显示/隐藏密码
  };

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false); // 3秒后取消复制状态
      }, 3000);
    }
  }, [copy]);

  useEffect(() => {
    if (!hidePassword) {
      setTimeout(() => {
        setHidePassword(true); // 5秒后隐藏密码
      }, 5000);
    }
  }, [hidePassword]);

  return (
    <>
      {value && (
        <div className="flex items-center group">
          <p className="text-nowrap font-semibold">{label}：</p>
          <p
            className={cn(
              "text-nowrap overflow-hidden overflow-ellipsis text-sm cursor-pointer",
              copy && "text-green-500"
            )}
            onClick={(event) => copyToClipboard(event)}
          >
            {isPassword && hidePassword ? palceholder : value}
          </p>
          <div className="flex items-center">
            {isPassword && (
              <EyeIcon
                className="w-5 h-5 ml-1 cursor-pointer group-hover:flex hidden"
                onClick={toggleShowPassword}
              />
            )}
            {copy && <CheckCircle className="w-4 h-4 ml-1 text-green-500" />}
          </div>
        </div>
      )}
    </>
  );
};

export default CredentialField;

import { cn } from "@/lib/utils";
import { CheckCircle, EyeIcon } from "lucide-react";
import React, { useEffect } from "react";

interface CredentialFieldProps {
  label: string;
  value: string;
  isPassword?: boolean;
}

const CredentialField = ({
  label,
  value,
  isPassword,
}: CredentialFieldProps) => {
  const [copy, setCopy] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);

  const palceholder = value.replace(/./g, "✽");

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopy(true);
  };

  const toggleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
  }, [copy]);

  useEffect(() => {
    if (!hidePassword) {
      setTimeout(() => {
        setHidePassword(true);
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
          {isPassword && (
            <EyeIcon
              className="w-4 h-4 ml-1 cursor-pointer group-hover:flex hidden"
              onClick={toggleShowPassword}
            />
          )}
          {copy && <CheckCircle className="w-4 h-4 ml-1 text-green-500" />}
        </div>
      )}
    </>
  );
};

export default CredentialField;

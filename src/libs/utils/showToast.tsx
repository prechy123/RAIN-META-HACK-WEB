import { toast, ToastOptions, Flip, Id } from "react-toastify";
import React from "react";

export const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 8000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Flip,
  theme: "dark",
  style: {
    background: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "14px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  icon: false,
  closeButton: false,
};

type ToastType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "loading"
  | "default";

const CustomToastContent = ({
  message,
}: {
  title?: string;
  message: string;
  type: ToastType;
}) => (
  <div className="flex justify-center items-center w-full">
      <p className="text-gray-200 text-sm leading-relaxed ">
        {message}
      </p>
  </div>
);

/**
 * Display toast with custom styling
 *
 * @param {ToastType} type
 * @param {string | { title?: string; message: string }} content
 * @param {ToastOptions} [options={}]
 * @return {Id}
 */
const showToast = (
  type: ToastType,
  content: string | { title?: string; message: string },
  options: Partial<ToastOptions> = {}
): Id => {
  const optionsToApply = {
    ...defaultToastOptions,
    ...options,
    className: `toast-${type} ${options.className || ""}`,
  };

  const message = typeof content === "string" ? content : content.message;
  const title = typeof content === "object" ? content.title : undefined;

  const toastContent = (
    <CustomToastContent title={title} message={message} type={type} />
  );

  switch (type) {
    case "success":
      return toast.success(toastContent, optionsToApply);
    case "error":
      return toast.error(toastContent, optionsToApply);
    case "info":
      return toast.info(toastContent, optionsToApply);
    case "warning":
      return toast.warn(toastContent, optionsToApply);
    case "loading":
      return toast.loading(toastContent, optionsToApply);
    case "default":
      return toast(toastContent, optionsToApply);
    default:
      return toast(toastContent, optionsToApply);
  }
};

export const showSuccessToast = (
  message: string,
  title: string = "Success",
  options?: Partial<ToastOptions>
) => showToast("success", { title, message }, options);

export const showErrorToast = (
  message: string,
  title: string = "Error",
  options?: Partial<ToastOptions>
) => showToast("error", { title, message }, options);

export const showWarningToast = (
  message: string,
  title: string = "Warning",
  options?: Partial<ToastOptions>
) => showToast("warning", { title, message }, options);

export const showInfoToast = (
  message: string,
  title: string = "Info",
  options?: Partial<ToastOptions>
) => showToast("info", { title, message }, options);

export const showLoadingToast = (
  message: string,
  title: string = "Loading",
  options?: Partial<ToastOptions>
) => showToast("loading", { title, message }, options);

export const updateLoadingToast = (
  toastId: Id,
  type: "success" | "error" | "warning" | "info",
  content: string | { title?: string; message: string },
  options?: Partial<ToastOptions>
) => {
  const message = typeof content === "string" ? content : content.message;
  const title = typeof content === "object" ? content.title : undefined;

  const toastContent = (
    <CustomToastContent title={title} message={message} type={type} />
  );

  const updateOptions = {
    ...defaultToastOptions,
    ...options,
    render: toastContent,
    type: type,
    isLoading: false,
    autoClose: 4000,
    // style: {
    //   ...defaultToastOptions.style,
    //   borderLeft: `3px solid ${
    //     type === "success"
    //       ? "#10B981"
    //       : type === "error"
    //       ? "#EF4444"
    //       : type === "warning"
    //       ? "#F59E0B"
    //       : "#3B82F6"
    //   }`,
    // },
  };

  toast.update(toastId, updateOptions);
};

export default showToast;

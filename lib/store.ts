import { Credential_Account_Category } from "@/components/credential/CredentialList";
import { create } from "zustand";

// 保存监听选中的目标记录
interface CredentialStore {
  credentialId: string;
  refreshId: (credentialId: string) => void;
}

export const useCredentialStore = create<CredentialStore>((set) => ({
  credentialId: "",
  refreshId: (credentialId: string) => set({ credentialId }),
}));

// 保存监听更新操作的事件
interface UpdateEventStore {
  actionId: string;
  refreshActionId: (credentialId: string) => void;
}

export const useUpdateEventStore = create<UpdateEventStore>((set) => ({
  actionId: "",
  refreshActionId: (credentialId: string) => set({ actionId: credentialId }),
}));

// 保存监听搜索关键字
interface SearchStore {
  keyword: string;
  refreshKeyword: (keyword: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  keyword: "",
  refreshKeyword: (keyword: string) => set({ keyword }),
}));

// 保存edit modal的状态
interface EditModalStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useEditModalStore = create<EditModalStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

// 保存edit modal credential的记录
interface EditModalCredentialStore {
  credential: Credential_Account_Category | null;
  setCredential: (credential: Credential_Account_Category) => void;
}

export const useEditModalCredentialStore = create<EditModalCredentialStore>(
  (set) => ({
    credential: null,
    setCredential: (credential: Credential_Account_Category) =>
      set({ credential }),
  })
);

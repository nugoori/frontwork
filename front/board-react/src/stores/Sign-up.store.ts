import { create } from "zustand";

interface ISignUpStore {
    email: string;
    password: string;
    nickname: string;
    profile: string;
    height: string;
    weight: string;
    gender: string;

    setEmail: (str: string) => void;
    setPassword: (str: string) => void;
    setNickname: (str: string) => void;
    setProfile: (str: string) => void;
    setHeight: (str: string) => void;
    setWeight: (str: string) => void;
    setGender: (str: string) => void;

    signUpError: boolean;
    setSignUpError: (signUpError: boolean) => void;
    emailValidate: boolean | null;
    setEmailValidate: (emailValidate: boolean) => void;
    nicknameValidate: boolean | null;
    setNicknameValidate: (emailValidate: boolean) => void;
}

const useStore = create<ISignUpStore>((set) =>({
    email: '',
    password: '',
    nickname: '',
    profile: '',
    height: '',
    weight: '',
    gender: '',

    setEmail: (email) => set((state) => ({...state, email})),
    setPassword: (password) => set((state) => ({...state, password})),
    setNickname: (nickname) => set((state) => ({...state, nickname})),
    setProfile: (profile) => set((state) => ({...state, profile})),
    setHeight: (height) => set((state) => ({...state, height})),
    setWeight: (weight) => set((state) => ({...state, weight})),
    setGender: (gender) => set((state) => ({...state, gender})),

    signUpError: false,
    setSignUpError: (signUpError: boolean) => set((state) => ({...state, signUpError})),
    emailValidate: null,
    setEmailValidate: (emailValidate: boolean) => set((state) => ({...state, emailValidate})),
    nicknameValidate: null,
    setNicknameValidate: (nicknameValidate: boolean) => set((state) => ({...state, nicknameValidate}))
}));

export default useStore;
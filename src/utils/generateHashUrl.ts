import md5 from "md5";

export const timestamp = new Date().getTime();

export const generateHash = md5(
  `${
    timestamp +
    import.meta.env.VITE_PRIVATE_KEY +
    import.meta.env.VITE_PUBLIC_KEY
  }`
);

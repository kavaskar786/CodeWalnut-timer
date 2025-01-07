export const getToastPosition = (): "top-right" | "bottom-center" => {
  return window.innerWidth >= 768 ? "top-right" : "bottom-center";
};

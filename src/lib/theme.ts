export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "nw-theme";

/**
 * Runs synchronously in <head> before first paint (see layout). It applies the
 * stored theme, or the OS preference when the visitor hasn't chosen one, so the
 * page never flashes the wrong colours. Kept dependency-free and tiny on purpose.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})();`;

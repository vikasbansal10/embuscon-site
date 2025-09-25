export const cn = (...cls: Array<string | false | undefined>) => cls.filter(Boolean).join(' ');

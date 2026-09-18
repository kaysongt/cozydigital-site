export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    const looksRelative = specifier.startsWith(".") || specifier.startsWith("/");
    const hasKnownExt = /\.[cm]?[jt]sx?$/.test(specifier);
    if (looksRelative && !hasKnownExt) {
      return nextResolve(`${specifier}.ts`, context);
    }
    throw error;
  }
}

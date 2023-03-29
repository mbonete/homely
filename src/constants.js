
export const BREAKPOINTS = {
  phone: 600,
  tablet: 950,
  laptop: 1300,
  desktopSmall: 1920,
}

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndSmaller: `(max-width: ${BREAKPOINTS.laptop / 16}rem)`,
  desktopAndSmaller: `(max-width: ${BREAKPOINTS.desktopSmall / 16}rem)`,
}
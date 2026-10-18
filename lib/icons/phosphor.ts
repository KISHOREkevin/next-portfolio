/**
 * KishoreOS icon language.
 *
 * One coherent icon family (Phosphor) is used for every application-identity
 * icon across the OS — desktop shortcuts, taskbar, launcher and the mobile
 * radial menu. Icon data is imported per-icon from `@iconify-icons/ph`, so the
 * bundle only ever contains the handful of glyphs listed below (no runtime
 * Iconify API calls, no full icon-set payload).
 */
import appWindowIcon from "@iconify-icons/ph/app-window";
import arrowRightIcon from "@iconify-icons/ph/arrow-right";
import arrowsClockwiseIcon from "@iconify-icons/ph/arrows-clockwise";
import briefcaseIcon from "@iconify-icons/ph/briefcase";
import cameraIcon from "@iconify-icons/ph/camera";
import caretLeftIcon from "@iconify-icons/ph/caret-left";
import caretRightIcon from "@iconify-icons/ph/caret-right";
import checkIcon from "@iconify-icons/ph/check";
import circleNotchIcon from "@iconify-icons/ph/circle-notch";
import codeIcon from "@iconify-icons/ph/code";
import compassIcon from "@iconify-icons/ph/compass";
import cornersInIcon from "@iconify-icons/ph/corners-in";
import cornersOutIcon from "@iconify-icons/ph/corners-out";
import desktopIcon from "@iconify-icons/ph/desktop";
import envelopeSimpleIcon from "@iconify-icons/ph/envelope-simple";
import fileTextIcon from "@iconify-icons/ph/file-text";
import folderOpenIcon from "@iconify-icons/ph/folder-open";
import gearSixIcon from "@iconify-icons/ph/gear-six";
import hardDriveIcon from "@iconify-icons/ph/hard-drive";
import imageIcon from "@iconify-icons/ph/image";
import infoIcon from "@iconify-icons/ph/info";
import linkSimpleIcon from "@iconify-icons/ph/link-simple";
import magnifyingGlassIcon from "@iconify-icons/ph/magnifying-glass";
import mapPinIcon from "@iconify-icons/ph/map-pin";
import minusIcon from "@iconify-icons/ph/minus";
import moonIcon from "@iconify-icons/ph/moon";
import paletteIcon from "@iconify-icons/ph/palette";
import squaresFourIcon from "@iconify-icons/ph/squares-four";
import stackIcon from "@iconify-icons/ph/stack";
import sunIcon from "@iconify-icons/ph/sun";
import terminalWindowIcon from "@iconify-icons/ph/terminal-window";
import userCircleIcon from "@iconify-icons/ph/user-circle";
import warningCircleIcon from "@iconify-icons/ph/warning-circle";
import xIcon from "@iconify-icons/ph/x";

export const phosphorIcons = {
  appWindow: appWindowIcon,
  arrowRight: arrowRightIcon,
  arrowsClockwise: arrowsClockwiseIcon,
  briefcase: briefcaseIcon,
  camera: cameraIcon,
  caretLeft: caretLeftIcon,
  caretRight: caretRightIcon,
  check: checkIcon,
  circleNotch: circleNotchIcon,
  code: codeIcon,
  compass: compassIcon,
  cornersIn: cornersInIcon,
  cornersOut: cornersOutIcon,
  desktop: desktopIcon,
  envelopeSimple: envelopeSimpleIcon,
  fileText: fileTextIcon,
  folderOpen: folderOpenIcon,
  gearSix: gearSixIcon,
  hardDrive: hardDriveIcon,
  image: imageIcon,
  info: infoIcon,
  linkSimple: linkSimpleIcon,
  magnifyingGlass: magnifyingGlassIcon,
  mapPin: mapPinIcon,
  minus: minusIcon,
  moon: moonIcon,
  palette: paletteIcon,
  squaresFour: squaresFourIcon,
  stack: stackIcon,
  sun: sunIcon,
  terminalWindow: terminalWindowIcon,
  userCircle: userCircleIcon,
  warningCircle: warningCircleIcon,
  x: xIcon
} as const;

export type PhosphorIconName = keyof typeof phosphorIcons;
export type PhosphorIconData = (typeof phosphorIcons)[PhosphorIconName];

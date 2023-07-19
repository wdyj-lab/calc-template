import React from "react";

export interface IconInterface {
  ARROW_DOWN: JSX.Element;
  ARROW_LEFT: JSX.Element;
  ARROW_RIGHT: JSX.Element;
  ARROW_UP: JSX.Element;
  CALENDAR: JSX.Element;
  CHECK_CIRCLE: JSX.Element;
  CLOCK: JSX.Element;
  CLOCK_LARGE: JSX.Element;
  CURRENT_LOCATION: JSX.Element;
  CUSTOM: null;
  DOWNLOAD: JSX.Element;
  EMPTY_FILE_LARGE: JSX.Element;
  ERROR: JSX.Element;
  ERROR_LARGE: JSX.Element;
  INFO_LARGE: JSX.Element;
  INFO_TAIL: JSX.Element;
  MINUS_LIGHT: JSX.Element;
  LOCATION: JSX.Element;
  PLUS_V2: JSX.Element;
  PLUS_LIGHT: JSX.Element;
  PLUS: JSX.Element;
  PLUS_LARGE: JSX.Element;
  REQUIRED: JSX.Element;
  RETURN: JSX.Element;
  SEARCH: JSX.Element;
  SETTING: JSX.Element;
  SPINNER: JSX.Element;
  SPINNER_LARGE: JSX.Element;
  STAR: JSX.Element;
  TIME: JSX.Element;
  UPLOAD_IMAGE: JSX.Element;
  UPLOAD_FILE: JSX.Element;
  UPLOAD_LARGE: JSX.Element;
  WARNING_LARGE: JSX.Element;
  X: JSX.Element;
  X_LARGE: JSX.Element;
  X_SMALL: JSX.Element;
  DOWNLOAD_FILE: JSX.Element;
  DELETE: JSX.Element;
  DELETE_V2: JSX.Element;
  HANDLE: JSX.Element;
  GRAPH: JSX.Element;
  EXCHANGE: JSX.Element;
  ARROW_DOWN2: JSX.Element;
  ARROW_UP2: JSX.Element;
  CHECK_CIRCLE_V2: JSX.Element;
  ERROR_CIRCLE_V2: JSX.Element;
  WARNING_CIRCLE_V2: JSX.Element;
  REFRESH: JSX.Element;
  EMPTY_FILE_V2: JSX.Element;
}

interface DedicatedSize {
  viewBoxWidth: number;
  viewBoxHeight: number;
}

export const getDedicatedSizeForIcon = (
  key: keyof IconInterface,
): DedicatedSize => {
  switch (key) {
    case "CLOCK_LARGE":
      return { viewBoxWidth: 116, viewBoxHeight: 136 };
    case "EMPTY_FILE_LARGE":
      return { viewBoxWidth: 72, viewBoxHeight: 72 };
    case "ERROR_LARGE":
      return { viewBoxWidth: 48, viewBoxHeight: 48 };
    case "INFO_LARGE":
      return { viewBoxWidth: 44, viewBoxHeight: 44 };
    case "SPINNER_LARGE":
      return { viewBoxWidth: 80, viewBoxHeight: 80 };
    case "STAR":
      return { viewBoxWidth: 16, viewBoxHeight: 16 };
    case "REQUIRED":
      return { viewBoxWidth: 10, viewBoxHeight: 10 };
    case "UPLOAD_LARGE":
      return { viewBoxWidth: 134, viewBoxHeight: 103 };
    case "WARNING_LARGE":
      return { viewBoxWidth: 50, viewBoxHeight: 44 };
    case "X_SMALL":
      return { viewBoxWidth: 10, viewBoxHeight: 10 };
    case "PLUS_V2":
      return { viewBoxWidth: 10, viewBoxHeight: 10 };
    case "DELETE_V2":
      return { viewBoxWidth: 14, viewBoxHeight: 14 };
    case "ARROW_DOWN2":
      return { viewBoxWidth: 16, viewBoxHeight: 16 };
    case "ARROW_UP2":
      return { viewBoxWidth: 16, viewBoxHeight: 16 };
    case "CHECK_CIRCLE_V2":
      return { viewBoxWidth: 20, viewBoxHeight: 20 };
    case "WARNING_CIRCLE_V2":
      return { viewBoxWidth: 20, viewBoxHeight: 20 };
    case "ERROR_CIRCLE_V2":
      return { viewBoxWidth: 20, viewBoxHeight: 20 };
    case "REFRESH":
      return { viewBoxWidth: 16, viewBoxHeight: 16 };
    case "EMPTY_FILE_V2":
      return { viewBoxWidth: 24, viewBoxHeight: 31 };
    default:
      return { viewBoxWidth: 24, viewBoxHeight: 24 };
  }
};

const Icons: IconInterface = {
  ARROW_DOWN: <path d="M7.41,8.59,12,13.17l4.59-4.58L18,10l-6,6L6,10Z" />,
  ARROW_LEFT: <path d="M15.41,7.41,10.83,12l4.58,4.59L14,18,8,12l6-6Z" />,
  ARROW_RIGHT: <path d="M8.59,16.59,13.17,12,8.59,7.41,10,6l6,6-6,6Z" />,
  ARROW_UP: (
    <polygon points="12 8.59 6 14.59 7.41 16 12 11.42 16.59 16 18 14.59 12 8.59" />
  ),
  CALENDAR: (
    <path d="M16.4,3.55h-.8V2H14V3.55H6V2H4.4V3.55H3.6A1.57,1.57,0,0,0,2,5.09V17.45A1.58,1.58,0,0,0,3.6,19H16.4A1.58,1.58,0,0,0,18,17.45V5.09a1.58,1.58,0,0,0-1.6-1.55Zm0,13.9H3.6v-10H16.4Z" />
  ),
  CHECK_CIRCLE: (
    <>
      <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,23A11,11,0,1,1,23,12,11,11,0,0,1,12,23Z" />
      <polygon points="10.25 14.39 7.41 11.55 6 12.97 10.24 17.21 10.27 17.18 10.28 17.19 18.06 9.41 16.64 8 10.25 14.39" />
    </>
  ),
  CLOCK: (
    <>
      <polygon
        fillRule="evenodd"
        points="12.75 6.75 11.75 6.75 11.75 12.07 11.38 12.73 16.63 15.64 17.12 14.77 12.75 12.35 12.75 6.75"
      />
      <path
        fillRule="evenodd"
        d="M12,2.75A9.25,9.25,0,1,0,21.25,12,9.26,9.26,0,0,0,12,2.75Zm0,17A7.75,7.75,0,1,1,19.75,12,7.76,7.76,0,0,1,12,19.75Z"
      />
    </>
  ),
  CLOCK_LARGE: (
    <>
      <path d="M59,20v-4.1a8,8,0,1,0-2,0V20a58,58,0,1,0,2,0ZM52,8a6,6,0,1,1,6,6A6,6,0,0,1,52,8Zm6,126a56,56,0,1,1,56-56A56.06,56.06,0,0,1,58,134Z" />
      <path d="M58,29a49,49,0,1,0,49,49A49,49,0,0,0,58,29Zm1,96v-9H57v9A47,47,0,0,1,11,79h9V77H11A47,47,0,0,1,57,31v9h2V31a47,47,0,0,1,46,46H96v2h9A47,47,0,0,1,59,125Z" />
      <path d="M66,78a8,8,0,0,0-8-8,7.9,7.9,0,0,0-4.9,1.69L32.3,50.88,30.88,52.3,51.69,73.1A7.9,7.9,0,0,0,50,78a8,8,0,0,0,8,8,7.9,7.9,0,0,0,4.9-1.69l20.8,20.81,1.42-1.42L64.31,82.9A7.9,7.9,0,0,0,66,78Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,58,84Z" />
    </>
  ),
  CURRENT_LOCATION: (
    <>
      <path
        d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Zm.5,17V16.5h-1V20A8,8,0,0,1,4,12.5H7.5v-1H4A8,8,0,0,1,11.5,4V7.5h1V4A8,8,0,0,1,20,11.5H16.5v1H20A8,8,0,0,1,12.5,20Z"
        fillRule="evenodd"
      />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  CUSTOM: null,
  DOWNLOAD: (
    <>
      <rect x="5" y="20" width="14" height="2" />
      <polygon points="12.88 16.54 13.41 16 18.54 10.88 17.12 9.46 13 13.59 13 3 11 3 11 13.59 6.88 9.46 5.46 10.88 12 17.41 12.88 16.54" />
    </>
  ),
  EMPTY_FILE_LARGE: (
    <>
      <polygon
        fillRule="evenodd"
        points="59.9 63.32 59.9 63.93 59.3 63.93 59.3 65.93 61.9 65.93 61.9 63.32 59.9 63.32"
      />
      <rect x="40.21" y="63.93" width="3.15" height="2" />
      <rect x="46.5" y="63.93" width="3.15" height="2" />
      <rect x="27.62" y="63.93" width="3.15" height="2" />
      <rect x="33.92" y="63.93" width="3.15" height="2" />
      <rect x="21.33" y="63.93" width="3.15" height="2" />
      <rect x="17.35" y="63.93" width="0.83" height="2" />
      <rect x="52.8" y="63.93" width="3.15" height="2" />
      <polygon
        fillRule="evenodd"
        points="15.07 63.32 13.07 63.32 13.07 65.93 15.67 65.93 15.67 63.93 15.07 63.93 15.07 63.32"
      />
      <rect x="13.07" y="51.03" width="2" height="3.02" />
      <rect x="13.07" y="57.07" width="2" height="3.02" />
      <rect x="13.07" y="9.95" width="2" height="1.84" />
      <rect x="13.07" y="44.99" width="2" height="3.02" />
      <rect x="13.07" y="14.8" width="2" height="3.02" />
      <rect x="13.07" y="26.88" width="2" height="3.02" />
      <rect x="13.07" y="32.92" width="2" height="3.02" />
      <rect x="13.07" y="38.95" width="2" height="3.02" />
      <rect x="13.07" y="20.84" width="2" height="3.02" />
      <polygon
        fillRule="evenodd"
        points="13.07 8.33 15.07 8.33 15.07 7.72 15.67 7.72 15.67 5.72 13.07 5.72 13.07 8.33"
      />
      <rect x="30.21" y="5.72" width="2.87" height="2" />
      <rect x="35.96" y="5.72" width="2.87" height="2" />
      <rect x="24.47" y="5.72" width="2.87" height="2" />
      <rect x="18.73" y="5.72" width="2.87" height="2" />
      <rect
        x="48.31"
        y="9.71"
        width="2"
        height="3.03"
        transform="translate(6.44 38.06) rotate(-44.87)"
      />
      <rect
        x="52.59"
        y="14.01"
        width="2"
        height="3.03"
        transform="translate(4.66 42.33) rotate(-44.87)"
      />
      <rect x="59.9" y="29.17" width="2" height="3.03" />
      <rect x="59.9" y="47.35" width="2" height="3.03" />
      <rect x="59.9" y="53.41" width="2" height="3.03" />
      <rect x="59.9" y="41.29" width="2" height="3.03" />
      <rect x="59.9" y="35.23" width="2" height="3.03" />
      <rect x="59.9" y="59.47" width="2" height="2.23" />
      <rect
        x="56.86"
        y="18.3"
        width="2"
        height="3.03"
        transform="translate(2.87 46.59) rotate(-44.86)"
      />
      <polygon
        fillRule="evenodd"
        points="43.43 8.33 45.02 8.33 45.25 8.56 46.67 7.15 45.24 5.72 43.23 5.72 43.23 7.72 43.43 7.72 43.43 8.33"
      />
      <rect x="43.5" y="11" width="2" height="2.4" />
      <rect x="43.5" y="15.79" width="2" height="2.4" />
      <polygon
        fillRule="evenodd"
        points="46.6 22.68 45.59 22.67 45.59 21.68 43.59 21.68 43.59 24.66 46.59 24.68 46.6 22.68"
      />
      <rect
        x="49.7"
        y="22.44"
        width="2"
        height="2.49"
        transform="translate(26.71 74.23) rotate(-89.65)"
      />
      <rect
        x="54.67"
        y="22.47"
        width="2"
        height="2.49"
        transform="translate(31.62 79.24) rotate(-89.65)"
      />
      <polygon
        fillRule="evenodd"
        points="59.41 22.73 59.4 24.73 59.9 24.74 59.9 26.14 61.9 26.14 61.9 23.11 60.91 23.11 60.91 22.74 59.41 22.73"
      />
      <ellipse cx="30.85" cy="38" rx="1.85" ry="2" />
      <ellipse cx="37" cy="38" rx="1.85" ry="2" />
      <ellipse cx="43.15" cy="38" rx="1.85" ry="2" />
    </>
  ),
  ERROR: (
    <>
      <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,23A11,11,0,1,1,23,12,11,11,0,0,1,12,23Z" />
      <circle cx="12" cy="18" r="1" />
      <polygon points="11.33 15 12.67 15 13 5 11 5 11.33 15" />
    </>
  ),
  // 48 * 48
  ERROR_LARGE: (
    <>
      <path d="M24,28.67a1.65,1.65,0,0,0,1.64-1.52L26.77,13c0-.07,0-.14,0-.21A2.78,2.78,0,0,0,24,10h-.22a2.77,2.77,0,0,0-2.54,3l1.14,14.16A1.66,1.66,0,0,0,24,28.67Z" />
      <circle cx="24" cy="34" r="3" />
      <path d="M24,0A24,24,0,1,0,48,24,24,24,0,0,0,24,0Zm0,46A22,22,0,1,1,46,24,22,22,0,0,1,24,46Z" />
    </>
  ),
  // 44 * 44
  INFO_LARGE: (
    <>
      <path
        fillRule="evenodd"
        d="M39,0H5A5,5,0,0,0,0,5V39a5,5,0,0,0,5,5H39a5,5,0,0,0,5-5V5A5,5,0,0,0,39,0Zm3,39a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H39a3,3,0,0,1,3,3Z"
      />
      <rect x="20" y="17" width="4" height="18" />
      <circle cx="22" cy="12" r="3" />
    </>
  ),
  INFO_TAIL: (
    <g fill="none" fillRule="evenodd">
      <g>
        <path fillRule="nonzero" d="M0 0H24V24H0z" />
        <g>
          <path
            stroke="#000"
            strokeWidth="1.5"
            d="M18 .75c.344 0 .656.141.882.368.227.226.368.538.368.882h0v12c0 .344-.141.656-.368.882-.226.227-.538.368-.882.368h0H3.69L.75 18.19V2c0-.344.141-.656.368-.882C1.344.89 1.656.75 2 .75h0z"
            transform="translate(2 3)"
          />
          <path
            fill="#000"
            d="M11 12H9v-2h2v2zm0-4H9V4h2v4z"
            transform="translate(2 3)"
          />
        </g>
      </g>
    </g>
  ),
  MINUS_LIGHT: <rect x="6" y="11.5" width="12" height="1" />,
  LOCATION: (
    <path
      fillRule="evenodd"
      d="M12,2a8,8,0,0,0-8,8,7.88,7.88,0,0,0,1.45,4.56h0l0,0q.18.26.39.51L12,23l6.14-7.95a6.41,6.41,0,0,0,.39-.52l0,0A7.88,7.88,0,0,0,20,10,8,8,0,0,0,12,2Zm0,12.6a4.73,4.73,0,1,1,4.8-4.72A4.77,4.77,0,0,1,12,14.6Z"
    />
  ),
  PLUS_V2: (
    <path
      d="M9.66665 5.66665H5.66665V9.66665H4.33331V5.66665H0.333313V4.33331H4.33331V0.333313H5.66665V4.33331H9.66665V5.66665Z"
      fill="#303540"
    />
  ),
  PLUS_LIGHT: (
    <polygon
      points="18 11.5 12.5 11.5 12.5 6 11.5 6 11.5 11.5 6 11.5 6 12.5 11.5 12.5 11.5 18 12.5 18 12.5 12.5 18 12.5 18 11.5"
      fillRule="evenodd"
    />
  ),
  PLUS: (
    <polygon
      className="cls-1"
      points="19 11 13 11 13 5 11 5 11 11 5 11 5 13 11 13 11 19 13 19 13 13 19 13 19 11"
    />
  ),
  PLUS_LARGE: (
    <path d="M22,10H14V2a2,2,0,0,0-4,0v8H2a2,2,0,0,0,0,4h8v8a2,2,0,0,0,4,0V14h8a2,2,0,0,0,0-4Z" />
  ),
  REQUIRED: <circle cx="2" cy="2" r="2" />,
  RETURN: (
    <g fill="none" fillRule="evenodd">
      <g>
        <path fillRule="nonzero" d="M0 0H24V24H0z" />
        <path
          fill="#000"
          d="M10 12.5l-5-4 5-4v3h2c3.314 0 6 2.686 6 6 0 3.238-2.566 5.878-5.775 5.996L12 19.5H6v-2h6c2.21 0 4-1.79 4-4 0-2.142-1.684-3.891-3.8-3.995L12 9.5h-2v3z"
          transform="rotate(-90 11.5 12)"
        />
      </g>
    </g>
  ),
  SEARCH: (
    <path d="M15.43,14h-.78l-.29-.27a6.4,6.4,0,1,0-.69.7l.27.28v.79l5,5L20.4,19Zm-6,0a4.5,4.5,0,1,1,4.48-4.5A4.48,4.48,0,0,1,9.46,14Z" />
  ),
  SETTING: (
    <>
      <path d="M19.43,13a7.79,7.79,0,0,0,.07-1,7.79,7.79,0,0,0-.07-1l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46A.5.5,0,0,0,19.22,5a.47.47,0,0,0-.17,0l-2.49,1a7.31,7.31,0,0,0-1.69-1l-.38-2.65A.49.49,0,0,0,14,2H10a.49.49,0,0,0-.49.42L9.13,5.07a7.68,7.68,0,0,0-1.69,1L5,5.05,4.77,5a.5.5,0,0,0-.43.25l-2,3.46a.49.49,0,0,0,.12.64L4.57,11a7.93,7.93,0,0,0-.07,1,7.93,7.93,0,0,0,.07,1L2.46,14.63a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.44.25A.47.47,0,0,0,5,19l2.49-1a7.31,7.31,0,0,0,1.69,1l.38,2.65A.49.49,0,0,0,10,22h4a.49.49,0,0,0,.49-.42l.38-2.65a7.68,7.68,0,0,0,1.69-1l2.49,1a.57.57,0,0,0,.18,0,.5.5,0,0,0,.43-.25l2-3.46a.5.5,0,0,0-.12-.64Zm-2-1.71a5.34,5.34,0,0,1,.05.73c0,.21,0,.43-.05.73l-.14,1.13.89.7,1.08.84-.7,1.21-1.27-.51-1-.42-.9.68a5.86,5.86,0,0,1-1.25.73l-1.06.43-.16,1.13L12.7,20H11.3l-.19-1.35L11,17.52l-1.06-.43a5.67,5.67,0,0,1-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21,1.08-.84.89-.7-.14-1.13c0-.31,0-.54,0-.74s0-.43,0-.73l.14-1.13-.89-.7L4.72,8.6l.7-1.21,1.27.51,1,.42.9-.68a5.86,5.86,0,0,1,1.25-.73l1.06-.43.16-1.13L11.3,4h1.39l.19,1.35L13,6.48l1.06.43a5.67,5.67,0,0,1,1.23.71l.91.7,1.06-.43,1.27-.51.7,1.21-1.07.85-.89.7ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
    </>
  ),
  SPINNER: (
    <>
      <path
        fill="#bdbdbd"
        className="cls-1"
        d="M12,5a7,7,0,1,1-7,7,7,7,0,0,1,7-7m0-3A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z"
      />
      <path fill="#5188f3" d="M12,2V5a7,7,0,0,1,7,7h3A10,10,0,0,0,12,2Z" />
    </>
  ),
  // 80 * 80
  SPINNER_LARGE: (
    <>
      <path fill="#5188f3" d="M40,0V4A36,36,0,0,1,76,40h4A40,40,0,0,0,40,0Z" />
      <path
        fill="#bdbdbd"
        d="M40,76A36,36,0,0,1,40,4V0A40,40,0,1,0,80,40H76A36,36,0,0,1,40,76Z"
      />
    </>
  ),
  STAR: (
    <path d="M8,12.33l4.64,2.79L11.4,9.85,15.5,6.3l-5.39-.45L8,.88l-2.11,5L.5,6.3,4.59,9.85,3.37,15.12Z" />
  ),
  TIME: (
    <>
      <path d="M12,4.5A7.5,7.5,0,1,1,4.5,12,7.5,7.5,0,0,1,12,4.5M12,3a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z" />
      <polygon
        className="cls-1"
        points="12.75 12.35 12.75 6.75 11.75 6.75 11.75 12.07 11.38 12.73 16.63 15.64 17.12 14.77 12.75 12.35"
      />
    </>
  ),
  UPLOAD_IMAGE: (
    <g fill="#000">
      <path d="M4 2v20h14.5v-1.501H5.499v-17h7.75V8.75H18.5V22h1.499V6.999L15 2H4zm8 7l4 4h-2.999v5H11v-5H8l4-4zm2.75-5.129l3.378 3.379H14.75V3.871z" />
    </g>
  ),
  UPLOAD_FILE: (
    <>
      <path d="M2.031 2v20H13.5l-1.469-1.501h-8.5v-17h7.75V8.75h5.25V13h1.5V6.999L13.03 2h-11zM19 15l4 4h-2.999v5H18v-5h-3l4-4zM9 10l1 1.75L11 10h2l-2 3.5 2 3.5h-2l-1-1.75L9 17H7l2-3.5L7 10h2zm3.781-6.129L16.16 7.25H12.78V3.871z" />
    </>
  ),
  DOWNLOAD_FILE: (
    <>
      <path d="M2.031 2v20H13.5l-1.469-1.5h-8.5v-17h7.75v5.25h5.25V13h1.5V7l-5-5h-11zm17.97 13v5H23l-4 4-4-4h3v-5h2.001zM9 10l1 1.75L11 10h2l-2 3.5 2 3.5h-2l-1-1.75L9 17H7l2-3.5L7 10h2zm3.781-6.129l3.379 3.38H12.78V3.87z" />
    </>
  ),
  // 134 * 103
  UPLOAD_LARGE: (
    <>
      <path d="M106.72,31.23A41.5,41.5,0,0,0,25,41a26,26,0,0,0,1,52c.34,0,.67,0,1,0v0H60V91H29v-.1L26.91,91,26,91a24,24,0,0,1-.91-48L27,43l0-1.9a39.5,39.5,0,0,1,77.77-9.33l.34,1.33,1.36.17A29,29,0,0,1,103,91H77v2h26a31,31,0,0,0,3.72-61.77Z" />
      <polygon points="86.46 72.29 68 53.84 49.54 72.29 50.96 73.71 67 57.66 67 103 69 103 69 57.66 85.04 73.71 86.46 72.29" />
    </>
  ),
  // 50 * 44
  WARNING_LARGE: (
    <>
      <path
        fillRule="evenodd"
        d="M25,11a2.78,2.78,0,0,1,2.78,2.78c0,.07,0,.14,0,.21l-1.1,14.16a1.65,1.65,0,0,1-3.29,0L22.24,14a2.77,2.77,0,0,1,2.54-3Z"
      />
      <circle cx="25" cy="35" r="3" />
      <path d="M49.24,36.49,28.35,2A3.93,3.93,0,0,0,25,0h0a3.93,3.93,0,0,0-3.35,2L.76,36.49a5.37,5.37,0,0,0-.08,5.36A4,4,0,0,0,4.1,44H45.9a4,4,0,0,0,3.42-2.15A5.37,5.37,0,0,0,49.24,36.49Zm-1.66,4.38A2,2,0,0,1,45.9,42H4.1a2,2,0,0,1-1.68-1.13,3.35,3.35,0,0,1,.05-3.34L23.36,3.06h0a1.8,1.8,0,0,1,3.28,0L47.53,37.53A3.35,3.35,0,0,1,47.58,40.87Z" />
    </>
  ),
  X: (
    <path
      fillRule="evenodd"
      d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
    />
  ),
  // 24 * 24
  X_LARGE: (
    <polygon points="22.61 2.81 21.19 1.39 12 10.59 2.81 1.39 1.39 2.81 10.59 12 1.39 21.19 2.81 22.61 12 13.41 21.19 22.61 22.61 21.19 13.41 12 22.61 2.81" />
  ),
  X_SMALL: (
    <polygon
      className="cls-1"
      points="9.77 1.85 8.71 0.89 5 4.26 1.29 0.89 0.23 1.85 3.94 5.23 0.23 8.6 1.29 9.57 5 6.19 8.71 9.57 9.77 8.6 6.06 5.23 9.77 1.85"
    />
  ),
  DELETE: (
    <>
      <path d="M6,19a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V7H6Z" />
      <polygon points="19 4 15.5 4 14.5 3 9.5 3 8.5 4 5 4 5 6 19 6 19 4" />
    </>
  ),
  DELETE_V2: (
    <path
      d="M6.99998 0.333313C3.31331 0.333313 0.333313 3.31331 0.333313 6.99998C0.333313 10.6866 3.31331 13.6666 6.99998 13.6666C10.6866 13.6666 13.6666 10.6866 13.6666 6.99998C13.6666 3.31331 10.6866 0.333313 6.99998 0.333313ZM10.3333 9.39331L9.39331 10.3333L6.99998 7.93998L4.60665 10.3333L3.66665 9.39331L6.05998 6.99998L3.66665 4.60665L4.60665 3.66665L6.99998 6.05998L9.39331 3.66665L10.3333 4.60665L7.93998 6.99998L10.3333 9.39331Z"
      fill="#303540"
    />
  ),
  HANDLE: (
    <g fill="none" fillRule="evenodd">
      <g fillRule="nonzero">
        <path d="M0 0H20V20H0z" />
        <path fill="#212121" d="M17 12v1H3v-1h14zm0-5v1H3V7h14z" />
      </g>
    </g>
  ),
  GRAPH: (
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g>
                <g transform="translate(-1134 -21) translate(940) translate(150) translate(44 21)">
                  <rect
                    width="16"
                    height="16.5"
                    x=".75"
                    y=".75"
                    stroke="#000"
                    strokeWidth="1.5"
                    rx="2"
                  />
                  <path
                    fill="#000"
                    d="M4 7H5.5V14H4zM12 9H13.5V14H12zM8 4H9.5V14H8z"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  ),
  EXCHANGE: (
    <g fill="none" fillRule="evenodd">
      <g>
        <path d="M0 0H24V24H0z" opacity=".2" />
        <g>
          <path fillRule="nonzero" d="M0 0H24V24H0z" />
          <g fill="#000">
            <g>
              <path
                d="M19.5 0c0 4.06-3.227 7.368-7.257 7.496L12 7.5H4.758L6.57 9.314l-1.414 1.414L.793 6.364 5.157 2 6.57 3.414 4.484 5.5H12c2.963 0 5.38-2.344 5.496-5.279L17.5 0h2z"
                transform="translate(2 1) translate(0 11)"
              />
            </g>
            <g>
              <path
                d="M19.5 0c0 4.06-3.227 7.368-7.257 7.496L12 7.5H4.486L6.57 9.586 5.157 11 .793 6.636l4.364-4.364L6.57 3.686 4.756 5.5H12c2.963 0 5.38-2.344 5.496-5.279L17.5 0h2z"
                transform="translate(2 1) rotate(180 10 5.5)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  ),
  ARROW_DOWN2: <path d="M3.833336 5.916667 h8.333328 L8 10.083333" />,
  ARROW_UP2: <path d="M3.833336 10.083333 h8.333328 l-4.166664 -4.166666Z" />,
  CHECK_CIRCLE_V2: (
    <path d="M10 1.66667C5.40002 1.66667 1.66669 5.40001 1.66669 10C1.66669 14.6 5.40002 18.3333 10 18.3333C14.6 18.3333 18.3334 14.6 18.3334 10C18.3334 5.40001 14.6 1.66667 10 1.66667ZM8.33335 14.1667L4.16669 10L5.34169 8.82501L8.33335 11.8083L14.3249 5.81665L15.4999 6.99998L8.33335 14.1667Z" />
  ),
  ERROR_CIRCLE_V2: (
    <path d="M9.99999 1.66666C5.39999 1.66666 1.66666 5.39999 1.66666 9.99999C1.66666 14.6 5.39999 18.3333 9.99999 18.3333C14.6 18.3333 18.3333 14.6 18.3333 9.99999C18.3333 5.39999 14.6 1.66666 9.99999 1.66666ZM10.8333 14.1667H9.16666V12.5H10.8333V14.1667ZM10.8333 10.8333H9.16666V5.83332H10.8333V10.8333Z" />
  ),
  WARNING_CIRCLE_V2: (
    <path d="M0.833344 17.5H19.1667L10 1.66666L0.833344 17.5ZM10.8333 15H9.16668V13.3333H10.8333V15ZM10.8333 11.6667H9.16668V8.33332H10.8333V11.6667Z" />
  ),
  REFRESH: (
    <path d="M11.7667 4.23329C10.8 3.26663 9.47334 2.66663 8.00001 2.66663C5.05334 2.66663 2.67334 5.05329 2.67334 7.99996C2.67334 10.9466 5.05334 13.3333 8.00001 13.3333C10.4867 13.3333 12.56 11.6333 13.1533 9.33329H11.7667C11.22 10.8866 9.74001 12 8.00001 12C5.79334 12 4.00001 10.2066 4.00001 7.99996C4.00001 5.79329 5.79334 3.99996 8.00001 3.99996C9.10667 3.99996 10.0933 4.45996 10.8133 5.18663L8.66667 7.33329H13.3333V2.66663L11.7667 4.23329Z" />
  ),
  EMPTY_FILE_V2: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 28.7708H22V11.4167H13V2.22917H2V28.7708ZM13 0.1875H0V30.8125H24V11.4167V9.375L15 0.1875H13ZM15 3.07485V9.375H21.1716L15 3.07485Z"
      />
      <ellipse cx="8" cy="17.5416" rx="1" ry="1.02083" />
      <ellipse cx="12" cy="17.5416" rx="1" ry="1.02083" />
      <ellipse cx="16" cy="17.5416" rx="1" ry="1.02083" />
    </>
  ),
};

export default Icons;

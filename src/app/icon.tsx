import { ImageResponse } from "next/og";

// Jeshureatech bird mark on brand blue. Traced from
// assets/images/logo.svg on jeshureatech.com. Next.js renders this at
// build time and auto-injects <link rel="icon"> into <head>.
//
// This route takes precedence over src/app/favicon.ico, which is the
// Next.js default and can stay on disk harmlessly (or be removed).

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e63d6",
          borderRadius: 6,
        }}
      >
        <svg width="15" height="22" viewBox="0 0 1593 2321" fill="none">
          <path
            fill="#ffffff"
            fillRule="evenodd"
            d="M913.0,1692.0 L759.0,1896.0 L398.0,2100.0 L322.0,2321.0 L821.0,1955.0ZM827.0,1574.0 L244.0,1778.0 L76.0,1983.0 L298.0,1869.0 L665.0,1717.0ZM977.0,1500.0 L671.0,1780.0 L294.0,1932.0 L0.0,2321.0 L398.0,2033.0 L743.0,1841.0 L895.0,1643.0ZM1251.0,1248.0 L1078.0,1420.0 L1026.0,1547.0 L930.0,1761.0 L1165.0,1506.0 L1285.0,1383.0ZM1279.0,1054.0 L906.0,1360.0 L764.0,1549.0 L901.0,1487.0 L1262.0,1173.0 L1357.0,1383.0 L1397.0,1290.0ZM268.0,1004.0 L384.0,1119.0 L529.0,1123.0 L612.0,1213.0 L825.0,1391.0 L563.0,1012.0ZM1593.0,716.0 L1571.0,696.0 L1539.0,684.0 L1460.0,694.0 L1415.0,680.0 L1388.0,680.0 L1278.0,716.0 L1070.0,817.0 L1141.0,823.0 L1254.0,778.0 L1168.0,866.0 L1145.0,943.0 L1370.0,741.0 L1457.0,721.0 L1384.0,786.0 L1354.0,848.0 L1399.0,951.0 L1417.0,854.0 L1463.0,782.0 L1516.0,735.0 L1556.0,719.0ZM68.0,632.0 L112.0,837.0 L218.0,933.0 L587.0,953.0 L864.0,1349.0 L869.0,1347.0 L897.0,1294.0 L617.0,870.0 L170.0,754.0ZM50.0,314.0 L50.0,531.0 L188.0,691.0 L645.0,819.0 L946.0,1261.0 L1288.0,979.0 L1437.0,1253.0 L1443.0,1126.0 L1305.0,862.0 L954.0,1172.0 L669.0,746.0 L248.0,572.0ZM50.0,0.0 L50.0,221.0 L288.0,525.0 L701.0,701.0 L915.0,1011.0 L817.0,676.0 L356.0,398.0Z"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}

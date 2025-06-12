import Svg, { Path } from "react-native-svg";

type Props = {};

const BottomTicket = (props: Props) => {
  const triangleSize = 35;
  const triangleCount = 15;
  const width = triangleSize * triangleCount;
  const height = triangleSize;

  let path = `M0 0 `;

  for (let i = 0; i < triangleCount; i++) {
    const x = i * triangleSize;
    const midX = x + triangleSize / 2;
    const nextX = x + triangleSize;
    path += `L${midX} ${height} L${nextX} 0 `;
  }

  path += `L${width} 0 Z`;

  return (
    <Svg height={height} width={width} style={{ marginTop: -1 }}>
      <Path d={path} fill="#fff" />
    </Svg>
  );
};

export default BottomTicket;

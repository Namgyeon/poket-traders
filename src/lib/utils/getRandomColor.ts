function getRandomColor(str: string) {
  const colors = [
    "#FF6B6B", // 빨강
    "#4ECDC4", // 청록
    "#45B7D1", // 파랑
    "#96CEB4", // 연두
    "#FFEAA7", // 노랑
    "#DDA0DD", // 연보라
    "#98D8C8", // 민트
    "#F7DC6F", // 골드
    "#BB8FCE", // 라벤더
    "#85C1E9", // 하늘색
    "#F8C471", // 주황
    "#82E0AA", // 연한 초록
    "#F1948A", // 살구색
    "#85C1E9", // 하늘색
    "#D7BDE2", // 연보라
  ];

  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }
  return colors[sum % colors.length];
}

export * from "./styles";
export * from "./regex";
export * from "./localstore";

// const example1 = [
//   [1, 2, 3],
//   [2, 3, 1],
//   [3, 1, 2],
// ];

// let example2 = [
//   [-1, -3, -3],
//   [-2, -3, -1],
//   [-3, -1, -2],
// ];

// const checkSudoku = (values: Array<Array<number>>) =>
//   !values.some((val, index) => {
//     const column = values.map((line) => line[index]);
//     const rowError =
//       val.length !== values.length || val.some((_, i) => !val.includes(i + 1));
//     const colError = column.some((_, i) => !val.includes(i + 1));

//     return colError || rowError;
//   });

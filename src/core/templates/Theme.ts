type Color = `#${string}`;

export default interface Theme {
    primary: Color,
    secondary: Color,
    danger: Color
};


let theme: Theme = {
    primary: "#3ba55c",
    secondary: "#3ba55c",
    danger: "#3ba55c"
}
